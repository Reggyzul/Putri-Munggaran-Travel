const SUPABASE_BASE_URL = 'https://jidystlcsojdjfzajudh.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable__GnSHtZVSUCi1S07DsJ6CA_dQMrslOF';

export const onRequest = async (context) => {
  const url = new URL(context.request.url);

  // Skip static assets and API routes
  if (
    url.pathname.startsWith('/api/') ||
    url.pathname.startsWith('/assets/') ||
    /\.(avif|jpg|jpeg|png|webp|gif|svg|ico|css|js|map|woff2?|ttf|json|txt)$/i.test(url.pathname)
  ) {
    return context.next();
  }

  // Non-blocking background Keep-Alive heartbeat on Cloudflare Edge
  if (typeof context.waitUntil === 'function') {
    context.waitUntil(
      fetch(`${SUPABASE_BASE_URL}/rest/v1/site_content?on_conflict=id`, {
        method: 'POST',
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
          Prefer: 'resolution=merge-duplicates,return=minimal'
        },
        body: JSON.stringify({
          id: 'keep_alive_heartbeat',
          data: {
            pinged_at: new Date().toISOString(),
            source: 'Cloudflare-Edge-Middleware',
            status: 'ACTIVE'
          },
          updated_at: new Date().toISOString()
        })
      }).catch(() => {})
    );
  }

  let response = await context.next();
  if (response.status === 404 && context.env && context.env.ASSETS) {
    response = await context.env.ASSETS.fetch(new URL('/index.html', context.request.url));
  }

  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('text/html')) {
    return response;
  }

  try {
    const supRes = await fetch(
      `${SUPABASE_BASE_URL}/rest/v1/site_content?id=eq.main&select=data,updated_at`,
      {
        cache: 'no-store',
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          'Cache-Control': 'no-cache, no-store, must-revalidate'
        }
      }
    );

    if (supRes.ok) {
      const rows = await supRes.json();
      if (Array.isArray(rows) && rows[0] && rows[0].data && Object.keys(rows[0].data).length > 0) {
        const siteData = {
          ...rows[0].data,
          _fromSupabase: true
        };
        const safeJson = JSON.stringify(siteData).replace(/</g, '\\u003c');
        const html = await response.text();
        const injectedHtml = html.replace(
          '</head>',
          `<script>window.__INITIAL_CONTENT__ = ${safeJson};</script>\n  </head>`
        );
        const newHeaders = new Headers(response.headers);
        newHeaders.set('Cache-Control', 'no-cache, no-store, must-revalidate');
        return new Response(injectedHtml, {
          status: response.status,
          headers: newHeaders
        });
      }
    }
  } catch {
    // Fallback to normal client fetch (which shows Loading State until Supabase finishes)
  }

  return response;
};
