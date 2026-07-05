-- Jalankan via Supabase SQL Editor jika tabel belum ada

CREATE TABLE IF NOT EXISTS schools_registry (
  school_id        TEXT PRIMARY KEY,
  school_name      TEXT NOT NULL,
  subdomain_slug   TEXT UNIQUE NOT NULL,
  plan_type        TEXT DEFAULT 'CLASSIC',
  status           TEXT DEFAULT 'PENDING',

  max_storage_gb       INT DEFAULT 5,
  storage_allocation   TEXT DEFAULT '[]',

  supa_teachers_url  TEXT NOT NULL,
  supa_teachers_key  TEXT NOT NULL,
  supa_students_url  TEXT NOT NULL,
  supa_students_key  TEXT NOT NULL,
  supa_classes_url   TEXT NOT NULL,
  supa_classes_key   TEXT NOT NULL,
  supa_grades_url    TEXT NOT NULL,
  supa_grades_key    TEXT NOT NULL,

  astradb_endpoint   TEXT NOT NULL,
  astradb_token      TEXT NOT NULL,
  astradb_namespace  TEXT NOT NULL,

  mongodb_uri        TEXT NOT NULL,
  mongodb_db_name    TEXT NOT NULL,

  turso_url          TEXT NOT NULL,
  turso_auth_token   TEXT NOT NULL,

  nas_url            TEXT NOT NULL,
  nas_username       TEXT NOT NULL,
  nas_password       TEXT NOT NULL,

  init_status        TEXT DEFAULT 'NOT_STARTED',
  init_error         TEXT,
  super_admin_email  TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS schools_registry_updated_at ON schools_registry;
CREATE TRIGGER schools_registry_updated_at
  BEFORE UPDATE ON schools_registry
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();