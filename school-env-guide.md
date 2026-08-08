# 📋 Panduan Konfigurasi Sekolah Baru

Panduan ini menjelaskan langkah-langkah yang harus dilakukan setelah Lord Admin berhasil mendaftarkan sekolah baru melalui dashboard admin Amertarva.

---

## Alur Umum Pasca-Pendaftaran Sekolah

```
[Lord Admin] → Daftar Sekolah di Dashboard Admin
       ↓
[Backend] → Menyimpan kredensial terenkripsi ke Supabase Registry
       ↓
[Pengelola Sekolah] → Menyiapkan environment & deploy aplikasi sekolah
       ↓
[Sekolah] → Aplikasi E-Learning aktif dan dapat diakses siswa
```

---

## 1. Data yang Diterima Setelah Pendaftaran

Saat Lord Admin mendaftarkan sekolah baru, data berikut tersimpan di database registri Amertarva:

| Informasi | Keterangan |
|---|---|
| `schoolId` | ID unik sekolah, contoh: `SCH_aB3xYz1234` |
| `schoolName` | Nama lengkap sekolah |
| `subdomainSlug` | Slug subdomain, contoh: `sma-maju-jaya` |
| `planType` | Tipe paket: `CLASSIC`, `PRO`, `PREMIUM`, atau `CUSTOM` |
| Kredensial Supabase | URL + Anon Key untuk akses database sekolah (terenkripsi di registry) |
| `rentEndDate` | Tanggal berakhir masa sewa |

> [!IMPORTANT]
> Semua kredensial database yang dimasukkan Lord Admin (URL Supabase, Key, dll.) **disimpan dalam keadaan terenkripsi (AES-256-GCM)** di database registri. Pengelola sekolah perlu mendapatkan nilai aslinya secara terpisah langsung dari Lord Admin untuk dimasukkan ke dalam `.env` aplikasi sekolah.

---

## 2. Persiapan Supabase untuk Sekolah Baru

Setiap sekolah menggunakan **satu proyek Supabase tersendiri** (atau satu database yang sama namun digunakan bersama, sesuai konfigurasi yang dimasukkan saat pendaftaran).

### Langkah-langkah Inisialisasi Supabase Sekolah

1. Buat proyek baru di [supabase.com](https://supabase.com) (atau gunakan proyek yang sudah ada).
2. Catat nilai berikut dari **Settings → API** pada dashboard Supabase sekolah:
   - **Project URL** → akan menjadi nilai `SUPABASE_URL` di env sekolah
   - **`anon` public key** → akan menjadi nilai `SUPABASE_ANON_KEY` di env sekolah
3. Buka **SQL Editor** pada Supabase sekolah tersebut.
4. Jalankan SQL inisialisasi tabel sekolah (lihat Lampiran A di bawah).

---

## 3. Konfigurasi Environment Variables Aplikasi Elearning

Aplikasi e-learning sekolah (`apps/elearning`) menggunakan file `.env` di root direktorinya.

### File `.env` Aplikasi Elearning

```env
# =====================================================
# KONFIGURASI APLIKASI E-LEARNING — [NAMA SEKOLAH]
# =====================================================

# Backend API Amertarva (untuk otentikasi & data registry)
# Dev  : Kosongkan — proxy Vite akan forward /api/* ke localhost:3000
# Prod : Isi URL backend produksi
PUBLIC_BACKEND_URL=https://backend.amertarva.com

# =====================================================
# KONEKSI SUPABASE SEKOLAH
# Dapatkan nilai ini dari Lord Admin atau dari
# Settings → API pada dashboard Supabase proyek sekolah.
# =====================================================

# URL Proyek Supabase (digunakan untuk seluruh modul)
SUPABASE_URL=https://<project-id>.supabase.co

# Anon Public Key Supabase (untuk akses dari frontend)
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...

# ID Sekolah (diberikan setelah pendaftaran oleh Lord Admin)
# Format: SCH_<nanoid>
SCHOOL_ID=SCH_aB3xYz1234
```

> [!NOTE]
> Karena pengguna mengonfirmasi bahwa seluruh data (Siswa, Guru, Kelas, Nilai) disimpan di **satu database Supabase yang sama** namun dengan **tabel berbeda**, maka satu pasang `SUPABASE_URL` + `SUPABASE_ANON_KEY` sudah cukup untuk seluruh aplikasi sekolah.

---

## 4. Tabel yang Dibutuhkan di Supabase Sekolah

> [!IMPORTANT]
> Jalankan SQL berikut di **SQL Editor** proyek Supabase sekolah (bukan di Supabase registri Amertarva pusat).

### Tabel Siswa (`students`)

```sql
CREATE TABLE IF NOT EXISTS students (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nis         TEXT UNIQUE NOT NULL,              -- Nomor Induk Siswa
  name        TEXT NOT NULL,
  class_id    UUID REFERENCES classes(id),
  email       TEXT,
  phone       TEXT,
  address     TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);
```

### Tabel Guru (`teachers`)

```sql
CREATE TABLE IF NOT EXISTS teachers (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nip         TEXT UNIQUE NOT NULL,              -- Nomor Induk Pegawai
  name        TEXT NOT NULL,
  email       TEXT UNIQUE,
  subject     TEXT,                              -- Mata pelajaran utama
  phone       TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);
```

### Tabel Kelas (`classes`)

```sql
CREATE TABLE IF NOT EXISTS classes (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,                     -- contoh: "XII IPA 1"
  grade       INT  NOT NULL,                     -- contoh: 10, 11, 12
  homeroom_teacher_id UUID REFERENCES teachers(id),
  academic_year TEXT NOT NULL,                   -- contoh: "2024/2025"
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
```

### Tabel Nilai (`grades`)

```sql
CREATE TABLE IF NOT EXISTS grades (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id  UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  teacher_id  UUID NOT NULL REFERENCES teachers(id),
  class_id    UUID NOT NULL REFERENCES classes(id),
  subject     TEXT NOT NULL,
  score       NUMERIC(5,2) NOT NULL,
  grade_type  TEXT NOT NULL,                    -- contoh: UH, UTS, UAS
  semester    INT  NOT NULL,                     -- 1 atau 2
  academic_year TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 5. Checklist Verifikasi Sebelum Go-Live

Pastikan semua item berikut sudah terpenuhi sebelum aplikasi diserahkan ke pihak sekolah:

- [ ] **Supabase sekolah sudah dibuat** dan URL/Key sudah dicatat
- [ ] **SQL tabel sudah dieksekusi** di Supabase sekolah (students, teachers, classes, grades)
- [ ] **File `.env`** sudah diisi dengan benar di `apps/elearning/`
- [ ] **`SCHOOL_ID`** sudah diisi dengan ID yang diberikan Lord Admin pasca-pendaftaran
- [ ] **`PUBLIC_BACKEND_URL`** sudah mengarah ke backend produksi (untuk deploy production)
- [ ] Aplikasi sudah dicoba dijalankan lokal (`bun run dev`) dan tidak ada error koneksi Supabase
- [ ] Login akun super admin sekolah berhasil dilakukan

---

## 6. Deployment ke Produksi (Opsional)

Untuk mendeploy aplikasi e-learning sekolah ke platform hosting (contoh: Vercel, Netlify):

### Environment Variables di Platform Hosting

Isi environment variables berikut di dashboard platform hosting Anda (Settings → Environment Variables):

| Key | Nilai |
|---|---|
| `PUBLIC_BACKEND_URL` | `https://backend.amertarva.com` |
| `SUPABASE_URL` | URL proyek Supabase sekolah |
| `SUPABASE_ANON_KEY` | Anon Key Supabase sekolah |
| `SCHOOL_ID` | ID sekolah dari registri Amertarva |

> [!WARNING]
> **Jangan** memasukkan `SUPABASE_SERVICE_ROLE_KEY` ke aplikasi frontend yang berjalan di browser. Gunakan hanya **Anon Key** (`SUPABASE_ANON_KEY`) dan atur Row Level Security (RLS) di Supabase untuk membatasi akses data.

---

## Lampiran A — Skrip SQL Lengkap Inisialisasi Sekolah

Untuk kemudahan, salin dan jalankan seluruh SQL berikut sekaligus di **SQL Editor Supabase sekolah**:

```sql
-- Trigger fungsi untuk auto-update kolom updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

-- 1. Tabel Kelas (harus dibuat lebih dulu karena direferensikan oleh students)
CREATE TABLE IF NOT EXISTS classes (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  grade       INT  NOT NULL,
  homeroom_teacher_id UUID,
  academic_year TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Tabel Guru
CREATE TABLE IF NOT EXISTS teachers (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nip         TEXT UNIQUE NOT NULL,
  name        TEXT NOT NULL,
  email       TEXT UNIQUE,
  subject     TEXT,
  phone       TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Tabel Siswa
CREATE TABLE IF NOT EXISTS students (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nis         TEXT UNIQUE NOT NULL,
  name        TEXT NOT NULL,
  class_id    UUID REFERENCES classes(id),
  email       TEXT,
  phone       TEXT,
  address     TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Tabel Nilai
CREATE TABLE IF NOT EXISTS grades (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id    UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  teacher_id    UUID NOT NULL REFERENCES teachers(id),
  class_id      UUID NOT NULL REFERENCES classes(id),
  subject       TEXT NOT NULL,
  score         NUMERIC(5,2) NOT NULL,
  grade_type    TEXT NOT NULL,
  semester      INT  NOT NULL,
  academic_year TEXT NOT NULL,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Trigger updated_at untuk teachers
DROP TRIGGER IF EXISTS teachers_updated_at ON teachers;
CREATE TRIGGER teachers_updated_at
  BEFORE UPDATE ON teachers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- 6. Trigger updated_at untuk students
DROP TRIGGER IF EXISTS students_updated_at ON students;
CREATE TRIGGER students_updated_at
  BEFORE UPDATE ON students
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
```
