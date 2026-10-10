export const TENANT_TABLES_SQL = `
-- =============================================================================
-- AMERTARVA TENANT SCHEMA (SUPABASE POSTGRESQL)
-- =============================================================================

-- 1. Helper Function: Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 2. Tabel Pengguna (Users - super_admin, teacher, student)
CREATE TABLE IF NOT EXISTS users (
  id                  VARCHAR(64) PRIMARY KEY,
  email               TEXT UNIQUE NOT NULL,
  full_name           TEXT NOT NULL DEFAULT '',
  role                TEXT NOT NULL DEFAULT 'student',
  homeroom_class_id   VARCHAR(64),
  password_hash       TEXT,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Tabel Kredensial Siswa (Login berbasis NIS)
CREATE TABLE IF NOT EXISTS student_credentials (
  user_id             VARCHAR(64) PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  nis                 TEXT UNIQUE NOT NULL,
  must_reset_password BOOLEAN NOT NULL DEFAULT TRUE,
  generated_by        TEXT,
  generated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Tabel Kelas / Rombongan Belajar
CREATE TABLE IF NOT EXISTS classes (
  id                  VARCHAR(64) PRIMARY KEY,
  name                VARCHAR(100) NOT NULL,
  grade               VARCHAR(10) NOT NULL,
  homeroom_teacher_id VARCHAR(64) REFERENCES users(id) ON DELETE SET NULL,
  room                VARCHAR(100),
  start_time          VARCHAR(20),
  end_time            VARCHAR(20),
  academic_year       VARCHAR(20),
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

DROP TRIGGER IF EXISTS classes_updated_at ON classes;
CREATE TRIGGER classes_updated_at
  BEFORE UPDATE ON classes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- 5. Tabel Ruang Kelas Fisik
CREATE TABLE IF NOT EXISTS classrooms (
  id                  VARCHAR(64) PRIMARY KEY,
  class_id            VARCHAR(64) NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  name                VARCHAR(100) NOT NULL
);

-- 6. Tabel Anggota Kelas (Many-to-Many Siswa & Kelas)
CREATE TABLE IF NOT EXISTS class_members (
  class_id            VARCHAR(64) NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  user_id             VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role_in_class       VARCHAR(20) NOT NULL DEFAULT 'student',
  joined_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (class_id, user_id)
);

-- 7. Tabel Administrasi Sekolah (Super Admin & Guru Admin Mapel/Kelas)
CREATE TABLE IF NOT EXISTS school_admins (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email               TEXT NOT NULL,
  name                TEXT NOT NULL DEFAULT '',
  role                TEXT NOT NULL CHECK (role IN ('super_admin', 'guru_admin')),
  subject             TEXT,
  class_id            VARCHAR(64) REFERENCES classes(id) ON DELETE CASCADE,
  granted_by          UUID REFERENCES school_admins(id) ON DELETE SET NULL,
  source              TEXT NOT NULL DEFAULT 'manual',
  is_active           BOOLEAN NOT NULL DEFAULT TRUE,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT guru_admin_scope CHECK (
    role <> 'guru_admin'
    OR (subject IS NOT NULL AND class_id IS NOT NULL)
  )
);

CREATE UNIQUE INDEX IF NOT EXISTS uniq_super_admin
  ON school_admins (role)
  WHERE role = 'super_admin';

CREATE UNIQUE INDEX IF NOT EXISTS uniq_guru_admin_scope
  ON school_admins (email, subject, class_id)
  WHERE role = 'guru_admin';

DROP TRIGGER IF EXISTS school_admins_updated_at ON school_admins;
CREATE TRIGGER school_admins_updated_at
  BEFORE UPDATE ON school_admins
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- 8. Tabel Guru Pengampu Mata Pelajaran per Kelas
CREATE TABLE IF NOT EXISTS teacher_subjects (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id          VARCHAR(64) REFERENCES users(id) ON DELETE SET NULL,
  class_id            VARCHAR(64) NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  subject             TEXT NOT NULL,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS uniq_class_subject
  ON teacher_subjects (class_id, subject);

DROP TRIGGER IF EXISTS teacher_subjects_updated_at ON teacher_subjects;
CREATE TRIGGER teacher_subjects_updated_at
  BEFORE UPDATE ON teacher_subjects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- 9. Tabel Kelompok Belajar (Study Groups)
CREATE TABLE IF NOT EXISTS study_groups (
  id                  VARCHAR(64) PRIMARY KEY,
  class_id            VARCHAR(64) NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  subject             VARCHAR(100) NOT NULL,
  name                VARCHAR(100) NOT NULL,
  leader_id           VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  max_members         INT NOT NULL DEFAULT 5,
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);

DROP TRIGGER IF EXISTS study_groups_updated_at ON study_groups;
CREATE TRIGGER study_groups_updated_at
  BEFORE UPDATE ON study_groups
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- 10. Tabel Anggota Kelompok Belajar
CREATE TABLE IF NOT EXISTS study_group_members (
  id                  VARCHAR(64) PRIMARY KEY,
  group_id            VARCHAR(64) NOT NULL REFERENCES study_groups(id) ON DELETE CASCADE,
  class_id            VARCHAR(64) NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  subject             VARCHAR(100) NOT NULL,
  student_id          VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role                VARCHAR(20) NOT NULL DEFAULT 'member',
  joined_at           TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT uniq_study_group_member UNIQUE (class_id, subject, student_id)
);

-- 11. Tabel Rekapitulasi Nilai (Grades)
CREATE TABLE IF NOT EXISTS grades (
  id                  VARCHAR(64) PRIMARY KEY,
  student_id          VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  class_id            VARCHAR(64) NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  subject             VARCHAR(255) NOT NULL,
  component           VARCHAR(64) NOT NULL,
  source_type         VARCHAR(64) NOT NULL,
  source_id           VARCHAR(64) NOT NULL,
  score               DOUBLE PRECISION NOT NULL,
  max_score           DOUBLE PRECISION NOT NULL,
  graded_by           VARCHAR(64) NOT NULL,
  graded_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  note                TEXT,
  CONSTRAINT unique_source UNIQUE (source_type, source_id)
);

-- 12. Tabel Bobot Penilaian Nilai Akhir (Grade Weights)
CREATE TABLE IF NOT EXISTS grade_weights (
  id                  VARCHAR(64) PRIMARY KEY,
  class_id            VARCHAR(64) NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  subject             VARCHAR(255) NOT NULL,
  teacher_id          VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  weight_tugas        DOUBLE PRECISION NOT NULL DEFAULT 0.4,
  weight_quiz         DOUBLE PRECISION NOT NULL DEFAULT 0.2,
  weight_ujian        DOUBLE PRECISION NOT NULL DEFAULT 0.4,
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT unique_class_subject_weights UNIQUE (class_id, subject)
);

DROP TRIGGER IF EXISTS grade_weights_updated_at ON grade_weights;
CREATE TRIGGER grade_weights_updated_at
  BEFORE UPDATE ON grade_weights
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- 13. Tabel Transkrip E-Rapor Siswa (Reports)
CREATE TABLE IF NOT EXISTS reports (
  id                  VARCHAR(64) PRIMARY KEY,
  student_id          VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  class_id            VARCHAR(64) NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  period              VARCHAR(100) NOT NULL,
  data                TEXT NOT NULL,
  created_by          VARCHAR(64) NOT NULL,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT unique_student_period UNIQUE (student_id, period)
);

-- 14. Tabel Konfigurasi Logika Fuzzy Mamdani (Fuzzy Configs)
CREATE TABLE IF NOT EXISTS fuzzy_configs (
  id                  VARCHAR(64) PRIMARY KEY,
  scope               VARCHAR(20) NOT NULL,
  owner_id            VARCHAR(64),
  variables           TEXT NOT NULL,
  labels              TEXT NOT NULL,
  rules               TEXT NOT NULL,
  updated_by          VARCHAR(64) NOT NULL,
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed Konfigurasi Fuzzy Default
INSERT INTO fuzzy_configs (id, scope, owner_id, variables, labels, rules, updated_by, updated_at)
VALUES (
  'default',
  'global',
  'system',
  '{"nilai_tugas":{"name":"nilai_tugas","memberships":{"RENDAH":{"type":"trapezoidal","points":[0,0,45,60]},"SEDANG":{"type":"triangular","points":[50,70,85]},"TINGGI":{"type":"trapezoidal","points":[75,88,100,100]}}},"nilai_ujian":{"name":"nilai_ujian","memberships":{"RENDAH":{"type":"trapezoidal","points":[0,0,50,65]},"SEDANG":{"type":"triangular","points":[55,75,88]},"TINGGI":{"type":"trapezoidal","points":[80,90,100,100]}}}}',
  '{"KURANG":{"type":"trapezoidal","points":[0,0,40,55]},"CUKUP":{"type":"triangular","points":[50,65,75]},"BAIK":{"type":"triangular","points":[70,80,90]},"SANGAT_BAIK":{"type":"trapezoidal","points":[85,95,100,100]}}',
  '[{"antecedents":[{"variable":"nilai_ujian","label":"RENDAH"},{"variable":"nilai_tugas","label":"RENDAH"}],"operator":"AND","consequent":"KURANG"},{"antecedents":[{"variable":"nilai_ujian","label":"RENDAH"},{"variable":"nilai_tugas","label":"SEDANG"}],"operator":"AND","consequent":"CUKUP"},{"antecedents":[{"variable":"nilai_ujian","label":"RENDAH"},{"variable":"nilai_tugas","label":"TINGGI"}],"operator":"AND","consequent":"BAIK"},{"antecedents":[{"variable":"nilai_ujian","label":"SEDANG"},{"variable":"nilai_tugas","label":"RENDAH"}],"operator":"AND","consequent":"CUKUP"},{"antecedents":[{"variable":"nilai_ujian","label":"SEDANG"},{"variable":"nilai_tugas","label":"SEDANG"}],"operator":"AND","consequent":"BAIK"},{"antecedents":[{"variable":"nilai_ujian","label":"SEDANG"},{"variable":"nilai_tugas","label":"TINGGI"}],"operator":"AND","consequent":"BAIK"},{"antecedents":[{"variable":"nilai_ujian","label":"TINGGI"},{"variable":"nilai_tugas","label":"RENDAH"}],"operator":"AND","consequent":"BAIK"},{"antecedents":[{"variable":"nilai_ujian","label":"TINGGI"},{"variable":"nilai_tugas","label":"SEDANG"}],"operator":"AND","consequent":"SANGAT_BAIK"},{"antecedents":[{"variable":"nilai_ujian","label":"TINGGI"},{"variable":"nilai_tugas","label":"TINGGI"}],"operator":"AND","consequent":"SANGAT_BAIK"}]',
  'system',
  NOW()
)
ON CONFLICT (id) DO NOTHING;

-- 15. Tabel Feature Flags
CREATE TABLE IF NOT EXISTS feature_flags (
  key                 VARCHAR(100) NOT NULL,
  enabled             BOOLEAN NOT NULL DEFAULT FALSE,
  scope               VARCHAR(100) NOT NULL DEFAULT 'global',
  PRIMARY KEY (key, scope)
);

-- Seed Feature Flags Default
INSERT INTO feature_flags (key, enabled, scope) VALUES
  ('feature_ai_assistant', TRUE, 'global'),
  ('feature_anti_cheat', TRUE, 'global'),
  ('feature_video_learning', TRUE, 'global'),
  ('feature_reminders', TRUE, 'global')
ON CONFLICT (key, scope) DO NOTHING;

-- 16. Reload PostgREST Schema Cache
NOTIFY pgrst, 'reload schema';
`;

export async function executeTenantSql(
  supabaseUrl: string,
  serviceKey: string,
  sqlQuery: string,
  customAccessToken?: string
): Promise<{ success: boolean; method: string; message?: string }> {
  const match = supabaseUrl.match(/https?:\/\/([^.]+)\.supabase\.co/i);
  const projectRef = match ? match[1] : null;
  const accessToken = customAccessToken || process.env.SUPABASE_ACCESS_TOKEN;
  let lastError = "";

  if (projectRef && accessToken) {
    try {
      const res = await fetch(`https://api.supabase.com/v1/projects/${projectRef}/database/query`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: sqlQuery }),
      });

      if (res.ok) {
        return {
          success: true,
          method: "SUPABASE_MANAGEMENT_API",
          message: "SQL berhasil dieksekusi via Supabase Management API.",
        };
      }
      const errText = await res.text();
      console.warn("Supabase Management API query failed:", errText);
      lastError = `Management API (${res.status}): ${errText}`;
    } catch (err: any) {
      console.warn("Error calling Supabase Management API:", err.message);
      lastError = `Management API: ${err.message}`;
    }
  }

  // Fallback via RPC jika ada
  try {
    const res = await fetch(`${supabaseUrl.replace(/\/$/, "")}/rest/v1/rpc/exec_sql`, {
      method: "POST",
      headers: {
        "apikey": serviceKey,
        "Authorization": `Bearer ${serviceKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: sqlQuery }),
    });
    if (res.ok) {
      return {
        success: true,
        method: "SUPABASE_RPC",
        message: "SQL berhasil dieksekusi via Supabase RPC.",
      };
    }
  } catch {
    // ignore
  }

  return {
    success: false,
    method: "NONE",
    message: lastError || "Gagal mengeksekusi SQL (SUPABASE_ACCESS_TOKEN belum diatur dan RPC exec_sql tidak tersedia).",
  };
}

export async function executeTenantSqlMigration(
  supabaseUrl: string,
  serviceKey: string,
  customAccessToken?: string
): Promise<{ success: boolean; method: string; message?: string }> {
  return executeTenantSql(supabaseUrl, serviceKey, TENANT_TABLES_SQL, customAccessToken);
}

