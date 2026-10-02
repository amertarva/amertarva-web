-- add-custom-domain-and-status-fields.sql
-- Migration untuk menambahkan dukungan Custom Domain dan Suspended State pada schools_registry

ALTER TABLE schools_registry
  ADD COLUMN IF NOT EXISTS custom_domain             TEXT UNIQUE,
  ADD COLUMN IF NOT EXISTS custom_domain_status      TEXT DEFAULT 'NONE', -- 'NONE' | 'PENDING_DNS' | 'ACTIVE' | 'FAILED'
  ADD COLUMN IF NOT EXISTS custom_domain_token       TEXT,
  ADD COLUMN IF NOT EXISTS custom_domain_verified_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS suspension_reason         TEXT,                -- 'ADMIN_SUSPENDED' | 'SUBSCRIPTION_EXPIRED' | 'MAINTENANCE'
  ADD COLUMN IF NOT EXISTS suspension_notice         TEXT;                -- Pesan/catatan kustom penangguhan

-- Index untuk lookup custom domain yang cepat
CREATE INDEX IF NOT EXISTS idx_schools_custom_domain
  ON schools_registry (custom_domain)
  WHERE custom_domain IS NOT NULL;

COMMENT ON COLUMN schools_registry.custom_domain             IS 'Custom domain sekolah (contoh: lms.sman1.sch.id)';
COMMENT ON COLUMN schools_registry.custom_domain_status      IS 'Status verifikasi DNS custom domain: NONE, PENDING_DNS, ACTIVE, FAILED';
COMMENT ON COLUMN schools_registry.custom_domain_token       IS 'Token verifikasi DNS TXT challenge';
COMMENT ON COLUMN schools_registry.custom_domain_verified_at IS 'Waktu timestamp domain berhasil diverifikasi';
COMMENT ON COLUMN schools_registry.suspension_reason         IS 'Alasan suspensi (ADMIN_SUSPENDED, SUBSCRIPTION_EXPIRED, MAINTENANCE)';
COMMENT ON COLUMN schools_registry.suspension_notice         IS 'Catatan penjelasan resmi penangguhan';
