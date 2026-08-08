-- setup-all-tables.sql — Jalankan via Supabase SQL Editor
-- Mengonsolidasikan lord_admins, schools_registry, rent fields, dan trigger updated_at

-- 1. Buat Tabel Lord Admins
CREATE TABLE IF NOT EXISTS lord_admins (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email      TEXT UNIQUE NOT NULL,
  password   TEXT NOT NULL,
  name       TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Buat Tabel Schools Registry
CREATE TABLE IF NOT EXISTS schools_registry (
  school_id          TEXT PRIMARY KEY,
  school_name        TEXT NOT NULL,
  subdomain_slug     TEXT UNIQUE NOT NULL,
  plan_type          TEXT DEFAULT 'CLASSIC',
  status             TEXT DEFAULT 'PENDING',
  max_storage_gb     INT DEFAULT 5,
  storage_allocation TEXT DEFAULT '[]',

  -- Supabase × 4 (dienkripsi AES-256-GCM)
  supa_teachers_url  TEXT NOT NULL,
  supa_teachers_key  TEXT NOT NULL,
  supa_students_url  TEXT NOT NULL,
  supa_students_key  TEXT NOT NULL,
  supa_classes_url   TEXT NOT NULL,
  supa_classes_key   TEXT NOT NULL,
  supa_grades_url    TEXT NOT NULL,
  supa_grades_key    TEXT NOT NULL,

  -- AstraDB
  astradb_endpoint   TEXT NOT NULL,
  astradb_token      TEXT NOT NULL,
  astradb_namespace  TEXT NOT NULL,

  -- MongoDB
  mongodb_uri        TEXT NOT NULL,
  mongodb_db_name    TEXT NOT NULL,

  -- Turso (bank soal)
  turso_url          TEXT NOT NULL,
  turso_auth_token   TEXT NOT NULL,

  -- NAS Storage
  nas_url            TEXT NOT NULL,
  nas_username       TEXT NOT NULL,
  nas_password       TEXT NOT NULL,

  -- Metadata inisialisasi
  init_status        TEXT DEFAULT 'NOT_STARTED',
  init_error         TEXT,
  super_admin_email  TEXT,

  -- Kolom durasi sewa (dari add-rent-fields.sql)
  rent_duration_months INT,
  rent_start_date      TIMESTAMPTZ,
  rent_end_date        TIMESTAMPTZ,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Trigger auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS schools_registry_updated_at ON schools_registry;
CREATE TRIGGER schools_registry_updated_at
  BEFORE UPDATE ON schools_registry
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- 4. Index sewa
CREATE INDEX IF NOT EXISTS idx_schools_rent_end_date
  ON schools_registry (rent_end_date)
  WHERE rent_end_date IS NOT NULL;
