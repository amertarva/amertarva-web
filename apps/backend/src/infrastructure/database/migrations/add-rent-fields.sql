-- Migration: Tambah kolom durasi penyewaan per sekolah
-- Jalankan via Supabase SQL Editor

ALTER TABLE schools_registry
  ADD COLUMN IF NOT EXISTS rent_duration_months INT,
  ADD COLUMN IF NOT EXISTS rent_start_date       TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS rent_end_date         TIMESTAMPTZ;

-- Index untuk query sekolah yang akan/sudah expired (berguna untuk cron/notifikasi)
CREATE INDEX IF NOT EXISTS idx_schools_rent_end_date
  ON schools_registry (rent_end_date)
  WHERE rent_end_date IS NOT NULL;

COMMENT ON COLUMN schools_registry.rent_duration_months IS 'Durasi sewa dalam bulan';
COMMENT ON COLUMN schools_registry.rent_start_date      IS 'Tanggal mulai sewa (otomatis saat create)';
COMMENT ON COLUMN schools_registry.rent_end_date        IS 'Tanggal berakhir sewa';
