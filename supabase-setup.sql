-- ============================================================================
-- SQL SETUP UNTUK PUTRI MUNGGARAN TOUR & TRAVEL (SUPABASE)
-- Jalankan kode ini 1x di menu "SQL Editor" pada Dashboard Supabase Anda
-- ============================================================================

-- 1. Buat tabel utama penyimpanan konten dinamis & keep-alive
CREATE TABLE IF NOT EXISTS public.site_content (
  id TEXT PRIMARY KEY,
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Aktifkan Row Level Security (RLS) & berikan izin akses tabel
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
GRANT ALL ON TABLE public.site_content TO anon, authenticated, service_role;

-- 3. Izinkan pembacaan & penyimpanan konten dinamis serta Keep-Alive
DROP POLICY IF EXISTS "Allow public read site_content" ON public.site_content;
CREATE POLICY "Allow public read site_content"
  ON public.site_content
  FOR SELECT
  TO public, anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Allow authenticated write site_content" ON public.site_content;
CREATE POLICY "Allow authenticated write site_content"
  ON public.site_content
  FOR ALL
  TO public, anon, authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anon keep_alive write" ON public.site_content;
CREATE POLICY "Allow anon keep_alive write"
  ON public.site_content
  FOR ALL
  TO public, anon, authenticated
  USING (true)
  WITH CHECK (true);

-- 4. Buat Storage Bucket untuk Upload Gambar (jika belum ada)
INSERT INTO storage.buckets (id, name, public)
VALUES ('site-images', 'site-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 5. Kebijakan akses publik & upload untuk Storage Bucket 'site-images'
DROP POLICY IF EXISTS "Public read site-images" ON storage.objects;
CREATE POLICY "Public read site-images"
  ON storage.objects FOR SELECT
  TO public, anon, authenticated
  USING (bucket_id = 'site-images');

DROP POLICY IF EXISTS "Authenticated upload site-images" ON storage.objects;
CREATE POLICY "Authenticated upload site-images"
  ON storage.objects FOR INSERT
  TO public, anon, authenticated
  WITH CHECK (bucket_id = 'site-images');

DROP POLICY IF EXISTS "Authenticated update site-images" ON storage.objects;
CREATE POLICY "Authenticated update site-images"
  ON storage.objects FOR UPDATE
  TO public, anon, authenticated
  USING (bucket_id = 'site-images');

DROP POLICY IF EXISTS "Authenticated delete site-images" ON storage.objects;
CREATE POLICY "Authenticated delete site-images"
  ON storage.objects FOR DELETE
  TO public, anon, authenticated
  USING (bucket_id = 'site-images');

-- 6. Masukkan baris awal keep-alive & muat ulang schema cache PostgREST
INSERT INTO public.site_content (id, data, updated_at)
VALUES (
  'keep_alive_heartbeat',
  '{"status": "ACTIVE", "source": "SQL-Initial-Setup"}'::jsonb,
  now()
)
ON CONFLICT (id) DO UPDATE SET updated_at = now();

NOTIFY pgrst, 'reload schema';
