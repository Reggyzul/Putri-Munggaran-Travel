import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import { DEFAULT_SITE_CONTENT, mergeSiteContent, SiteContent } from './src/data/defaultSiteContent';
import {
  fetchSiteContentFromSupabase,
  supabase,
  SUPABASE_BASE_URL,
  SUPABASE_ANON_KEY
} from './src/lib/supabase';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.resolve(__dirname, 'data');
const CONTENT_CACHE_FILE = path.resolve(DATA_DIR, 'site-content-cache.json');
const KEEPALIVE_LOG_FILE = path.resolve(DATA_DIR, 'keep-alive-log.json');
const UPLOADS_DIR = path.resolve(__dirname, 'public', 'uploads');

// Ensure directories exist
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

// 1. Load initial content into RAM (initially _fromSupabase: false so SSR renders loading state until Supabase responds)
let memoryContent: SiteContent = structuredClone(DEFAULT_SITE_CONTENT);

// 2. Keep-Alive State (Anti-Pause 7 Days for Supabase Free Tier)
interface KeepAliveLogEntry {
  time: string;
  source: string;
  ok: boolean;
  detail: string;
}

interface KeepAliveState {
  lastPingAt: string;
  nextPingAt: string;
  totalPings: number;
  lastSource: string;
  message: string;
  logs: KeepAliveLogEntry[];
}

const SIX_HOURS_MS = 6 * 60 * 60 * 1000;

let keepAliveState: KeepAliveState = {
  lastPingAt: new Date().toISOString(),
  nextPingAt: new Date(Date.now() + SIX_HOURS_MS).toISOString(),
  totalPings: 0,
  lastSource: 'Server Startup',
  message: 'Sistem Keep-Alive aktif menjaga Supabase setiap 6 jam.',
  logs: []
};

if (fs.existsSync(KEEPALIVE_LOG_FILE)) {
  try {
    const savedKa = JSON.parse(fs.readFileSync(KEEPALIVE_LOG_FILE, 'utf-8'));
    keepAliveState = { ...keepAliveState, ...savedKa };
  } catch {
    // ignore
  }
}

function saveKeepAliveState() {
  try {
    fs.writeFileSync(KEEPALIVE_LOG_FILE, JSON.stringify(keepAliveState, null, 2), 'utf-8');
  } catch {
    // ignore
  }
}

async function syncContentFromSupabase() {
  try {
    const res = await fetchSiteContentFromSupabase();
    if (res.content) {
      memoryContent = res.content;
      fs.writeFileSync(CONTENT_CACHE_FILE, JSON.stringify(memoryContent, null, 2), 'utf-8');
    }
  } catch (err) {
    // keep serving from memoryContent
  }
}

async function executeSupabaseKeepAlive(source: string) {
  const nowIso = new Date().toISOString();
  let ok = true;
  const details: string[] = [];

  try {
    // A. Ping Supabase Auth endpoint
    const authRes = await fetch(`${SUPABASE_BASE_URL}/auth/v1/settings`, {
      headers: { apikey: SUPABASE_ANON_KEY }
    });
    if (authRes.ok) {
      details.push('Auth OK');
    }

    // B. Read from Supabase REST table
    const { error: readErr } = await supabase
      .from('site_content')
      .select('id, updated_at')
      .limit(1);

    if (!readErr) {
      details.push('DB Read OK');
    } else {
      details.push(`DB Ping (${readErr.code || 'REST Active'})`);
    }

    // C. Write / Upsert heartbeat row to record database write activity
    const { error: writeErr } = await supabase.from('site_content').upsert(
      {
        id: 'keep_alive_heartbeat',
        data: {
          pinged_at: nowIso,
          source,
          status: 'ACTIVE',
          total_pings: keepAliveState.totalPings + 1
        },
        updated_at: nowIso
      },
      { onConflict: 'id' }
    );

    if (!writeErr) {
      details.push('DB Write OK');
    }
  } catch (err: any) {
    ok = false;
    details.push(err?.message || 'Network error');
  }

  keepAliveState = {
    lastPingAt: nowIso,
    nextPingAt: new Date(Date.now() + SIX_HOURS_MS).toISOString(),
    totalPings: keepAliveState.totalPings + 1,
    lastSource: source,
    message: 'Supabase aktif & terjaga otomatis (Anti-Nonaktif 7 Hari).',
    logs: [
      {
        time: nowIso,
        source,
        ok,
        detail: details.join(' • ') || 'Ping terkirim'
      },
      ...keepAliveState.logs.slice(0, 19)
    ]
  };
  saveKeepAliveState();

  // Also refresh memoryContent from Supabase
  await syncContentFromSupabase();
  return keepAliveState;
}

async function startServer() {
  const app = express();
  const isProd = process.env.NODE_ENV === 'production';
  const port = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '25mb' }));

  // Serve uploaded files immediately
  app.use('/uploads', express.static(UPLOADS_DIR));

  // API: Get current site content
  app.get('/api/content', (_req, res) => {
    res.json({ content: memoryContent });
  });

  // API: Update site content (updates SSR RAM cache + disk cache + Supabase)
  app.post('/api/content', async (req, res) => {
    try {
      const incoming = req.body?.content;
      if (!incoming || typeof incoming !== 'object') {
        res.status(400).json({ error: 'Invalid content payload' });
        return;
      }
      memoryContent = mergeSiteContent(incoming);
      fs.writeFileSync(CONTENT_CACHE_FILE, JSON.stringify(memoryContent, null, 2), 'utf-8');
      res.json({ ok: true, updatedAt: memoryContent.updatedAt });
    } catch (err: any) {
      res.status(500).json({ error: err?.message || 'Failed to save content' });
    }
  });

  // API: Upload image file to public/uploads/
  app.post('/api/upload', (req, res) => {
    try {
      const { fileName, dataUrl } = req.body || {};
      if (!fileName || !dataUrl || typeof dataUrl !== 'string') {
        res.status(400).json({ error: 'Missing fileName or dataUrl' });
        return;
      }
      const match = dataUrl.match(/^data:image\/([a-zA-Z0-9+.-]+);base64,(.+)$/);
      if (!match) {
        res.status(400).json({ error: 'Invalid image dataUrl' });
        return;
      }
      const buffer = Buffer.from(match[2], 'base64');
      const cleanName = path.basename(fileName).replace(/[^a-zA-Z0-9._-]/g, '_');
      const targetPath = path.resolve(UPLOADS_DIR, cleanName);
      fs.writeFileSync(targetPath, buffer);
      res.json({ ok: true, url: `/uploads/${cleanName}` });
    } catch (err: any) {
      res.status(500).json({ error: err?.message || 'Upload failed' });
    }
  });

  // API: Keep-Alive Status & Trigger
  app.get('/api/keep-alive-status', (_req, res) => {
    res.json(keepAliveState);
  });

  app.get('/api/keep-alive', async (req, res) => {
    const src = (req.query.source as string) || 'API-KeepAlive-Endpoint';
    const state = await executeSupabaseKeepAlive(src);
    res.json({ ok: true, ...state });
  });

  let vite: any;
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom'
    });
    app.use(vite.middlewares);
  } else {
    app.use(
      express.static(path.resolve(__dirname, 'dist'), {
        index: false
      })
    );
  }

  // SSR + Zero-Delay Hydration Catch-All Handler
  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;

    // Skip static asset requests
    if (
      url.startsWith('/api/') ||
      /\.(avif|jpg|jpeg|png|webp|gif|svg|ico|css|js|map|woff2?|ttf)$/i.test(url.split('?')[0])
    ) {
      next();
      return;
    }

    try {
      let template = fs.readFileSync(
        path.resolve(__dirname, isProd ? 'dist/index.html' : 'index.html'),
        'utf-8'
      );

      let renderFn: (content: SiteContent, urlPath: string) => string;

      if (!isProd && vite) {
        template = await vite.transformIndexHtml(url, template);
        const mod = await vite.ssrLoadModule('/src/entry-server.tsx');
        renderFn = mod.render;
      } else {
        const mod = await import('./src/entry-server.tsx');
        renderFn = mod.render;
      }

      // Render React tree synchronously from RAM (0ms delay!)
      const appHtml = renderFn(memoryContent, url);

      // Escape JSON for safe inline script injection
      const safeJson = JSON.stringify(memoryContent).replace(/</g, '\\u003c');
      const hydrationScript = `<script>window.__INITIAL_CONTENT__ = ${safeJson};</script>`;

      // Inject dynamic SEO title, description, favicon, hydration payload, and rendered HTML
      const seoTitle = memoryContent.translations.ID.seo_title || 'Putri Munggaran Tour & Travel';
      const seoDesc = memoryContent.translations.ID.seo_description || '';
      const favicon = memoryContent.brand.faviconUrl || 'data:,';

      const finalHtml = template
        .replace(/<title>.*?<\/title>/s, `<title>${seoTitle}</title>`)
        .replace(
          /<meta name="description" content=".*?"\s*\/>/,
          `<meta name="description" content="${seoDesc.replace(/"/g, '&quot;')}" />`
        )
        .replace(
          /<link rel="icon"[^>]*>/,
          `<link rel="icon" href="${favicon}" />`
        )
        .replace('</head>', `${hydrationScript}\n  </head>`)
        .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

      res.status(200).set({ 'Content-Type': 'text/html; charset=utf-8' }).end(finalHtml);
    } catch (e: any) {
      if (!isProd && vite) {
        vite.ssrFixStacktrace(e);
      }
      console.error('SSR Error:', e);
      next(e);
    }
  });

  app.listen(port, '0.0.0.0', () => {
    console.log(`✅ SSR Server Putri Munggaran Travel berjalan di http://localhost:${port}`);
    console.log(`🔑 Admin Dashboard tersedia di http://localhost:${port}/admin`);

    // Initial Supabase sync & Keep-Alive heartbeat on server start
    executeSupabaseKeepAlive('Server-Startup-Heartbeat').catch(() => {});

    // Run Keep-Alive every 6 hours automatically so Supabase never pauses after 7 days
    setInterval(() => {
      executeSupabaseKeepAlive('Auto-Cron-6Hours').catch(() => {});
    }, SIX_HOURS_MS);
  });
}

startServer();

