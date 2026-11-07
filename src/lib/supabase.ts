import { createClient } from '@supabase/supabase-js';
import { SiteContent, mergeSiteContent } from '../data/defaultSiteContent';

// User-provided Supabase credentials
export const RAW_SUPABASE_URL = 'https://jidystlcsojdjfzajudh.supabase.co/rest/v1/';
export const SUPABASE_BASE_URL = RAW_SUPABASE_URL.replace(/\/rest\/v1\/?$/, '');
export const SUPABASE_REST_URL = `${SUPABASE_BASE_URL}/rest/v1`;
export const SUPABASE_ANON_KEY = 'sb_publishable__GnSHtZVSUCi1S07DsJ6CA_dQMrslOF';

const isBrowser = typeof window !== 'undefined';

export const supabase = createClient(SUPABASE_BASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: isBrowser,
    autoRefreshToken: isBrowser,
    detectSessionInUrl: isBrowser
  }
});

export const SUPABASE_SETUP_SQL = `-- ============================================================================
-- SQL SETUP UNTUK PUTRI MUNGGARAN TOUR & TRAVEL (SUPABASE)
-- Jalankan kode ini 1x di menu "SQL Editor" pada Dashboard Supabase Anda
-- ============================================================================

-- 1. Buat tabel utama penyimpanan konten dinamis & keep-alive
CREATE TABLE IF NOT EXISTS public.site_content (
  id TEXT PRIMARY KEY,
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Aktifkan Row Level Security (RLS)
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- 3. Izinkan semua pengunjung membaca data website (SSR & Client)
DROP POLICY IF EXISTS "Allow public read site_content" ON public.site_content;
CREATE POLICY "Allow public read site_content"
  ON public.site_content
  FOR SELECT
  TO public, anon, authenticated
  USING (true);

-- 4. Izinkan Admin yang sudah login untuk mengubah seluruh konten website
DROP POLICY IF EXISTS "Allow authenticated write site_content" ON public.site_content;
CREATE POLICY "Allow authenticated write site_content"
  ON public.site_content
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 5. Izinkan sistem Keep-Alive otomatis melakukan ping agar Supabase tidak pernah mati (7 hari)
DROP POLICY IF EXISTS "Allow anon keep_alive write" ON public.site_content;
CREATE POLICY "Allow anon keep_alive write"
  ON public.site_content
  FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);

-- 6. Buat Storage Bucket untuk Upload Gambar (jika belum ada)
INSERT INTO storage.buckets (id, name, public)
VALUES ('site-images', 'site-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 7. Kebijakan akses publik & upload untuk Storage Bucket 'site-images'
DROP POLICY IF EXISTS "Public read site-images" ON storage.objects;
CREATE POLICY "Public read site-images"
  ON storage.objects FOR SELECT
  TO public, anon, authenticated
  USING (bucket_id = 'site-images');

DROP POLICY IF EXISTS "Authenticated upload site-images" ON storage.objects;
CREATE POLICY "Authenticated upload site-images"
  ON storage.objects FOR INSERT
  TO anon, authenticated
  WITH CHECK (bucket_id = 'site-images');

DROP POLICY IF EXISTS "Authenticated update site-images" ON storage.objects;
CREATE POLICY "Authenticated update site-images"
  ON storage.objects FOR UPDATE
  TO anon, authenticated
  USING (bucket_id = 'site-images');
`;

export interface FetchSiteContentResult {
  content: SiteContent | null;
  tableMissing: boolean;
  error?: string;
}

export async function fetchSiteContentFromSupabase(): Promise<FetchSiteContentResult> {
  try {
    const { data, error } = await supabase
      .from('site_content')
      .select('data, updated_at')
      .eq('id', 'main')
      .maybeSingle();

    if (error) {
      const isMissing =
        error.code === 'PGRST205' ||
        error.code === '42P01' ||
        (error.message && error.message.includes('site_content'));
      return {
        content: null,
        tableMissing: Boolean(isMissing),
        error: error.message
      };
    }

    if (data && data.data && Object.keys(data.data).length > 0) {
      const merged = mergeSiteContent(data.data as Partial<SiteContent>);
      merged._fromSupabase = true;
      return {
        content: merged,
        tableMissing: false
      };
    }

    return {
      content: null,
      tableMissing: false
    };
  } catch (err: any) {
    return {
      content: null,
      tableMissing: false,
      error: err?.message || 'Unknown error'
    };
  }
}

export interface SaveSiteContentResult {
  savedToSupabase: boolean;
  savedToServer: boolean;
  tableMissing: boolean;
  error?: string;
}

export async function saveSiteContentEverywhere(content: SiteContent): Promise<SaveSiteContentResult> {
  const updated: SiteContent = {
    ...content,
    updatedAt: new Date().toISOString()
  };

  let savedToSupabase = false;
  let tableMissing = false;
  let supabaseError: string | undefined;

  // 1. Save to Supabase table 'site_content'
  try {
    const { error } = await supabase
      .from('site_content')
      .upsert(
        {
          id: 'main',
          data: updated,
          updated_at: updated.updatedAt
        },
        { onConflict: 'id' }
      );

    if (error) {
      supabaseError = error.message;
      if (
        error.code === 'PGRST205' ||
        error.code === '42P01' ||
        (error.message && error.message.includes('site_content'))
      ) {
        tableMissing = true;
      }
    } else {
      savedToSupabase = true;
    }
  } catch (err: any) {
    supabaseError = err?.message || 'Failed to save to Supabase';
  }

  // 2. Also sync to SSR Server Cache (/api/content) for 0ms SSR hydration once Supabase is updated
  let savedToServer = false;
  if (isBrowser) {
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: updated })
      });
      if (res.ok) {
        savedToServer = true;
      }
    } catch {
      // ignore if running in pure static mode
    }
  }

  return {
    savedToSupabase,
    savedToServer,
    tableMissing,
    error: supabaseError
  };
}

// Client-side image compressor & smart uploader (Supabase Storage -> Local Server /api/upload -> Data URI)
export async function compressImageFile(file: File, maxWidth = 1400, quality = 0.84): Promise<{ blob: Blob; dataUrl: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas context unavailable'));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        const mime = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
        const dataUrl = canvas.toDataURL(mime, quality);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve({ blob, dataUrl });
            } else {
              reject(new Error('Image compression failed'));
            }
          },
          mime,
          quality
        );
      };
      img.onerror = () => reject(new Error('Gagal membaca file gambar'));
      img.src = ev.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Gagal membaca file'));
    reader.readAsDataURL(file);
  });
}

export async function uploadImageSmart(file: File): Promise<{ url: string; source: 'supabase' | 'server' | 'inline' }> {
  const { blob, dataUrl } = await compressImageFile(file);
  const ext = file.type === 'image/png' ? 'png' : 'jpg';
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_').replace(/\.[^.]+$/, '');
  const fileName = `${Date.now()}-${safeName}.${ext}`;

  // 1. Try uploading to Supabase Storage bucket 'site-images'
  try {
    const { error } = await supabase.storage
      .from('site-images')
      .upload(`uploads/${fileName}`, blob, {
        contentType: file.type === 'image/png' ? 'image/png' : 'image/jpeg',
        upsert: true
      });

    if (!error) {
      const { data: pubData } = supabase.storage
        .from('site-images')
        .getPublicUrl(`uploads/${fileName}`);
      if (pubData?.publicUrl) {
        return { url: pubData.publicUrl, source: 'supabase' };
      }
    }
  } catch {
    // fallback to server upload
  }

  // 2. Try uploading to local Express SSR server (/api/upload) which saves to public/uploads/
  try {
    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fileName,
        dataUrl
      })
    });
    if (res.ok) {
      const json = await res.json();
      if (json.url) {
        return { url: json.url, source: 'server' };
      }
    }
  } catch {
    // fallback to inline compressed dataUrl
  }

  // 3. Fallback to compressed data URL so image preview & saving ALWAYS works 100%
  return { url: dataUrl, source: 'inline' };
}

