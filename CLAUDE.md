# CLAUDE.md — Amertarva Lord Admin Dashboard

Dokumen ini adalah sumber kebenaran tunggal untuk proyek ini.
Baca **seluruhnya** sebelum menulis satu baris kode pun.

---

## 1. Gambaran Proyek

**Lord Admin Dashboard** adalah panel kontrol tertinggi di ekosistem Amertarva.
Role ini berada **di atas Super Admin Sekolah** dan bertanggung jawab atas:

- Mendaftarkan sekolah baru ke dalam ekosistem Amertarva
- Memasukkan kredensial database setiap sekolah (Supabase × 4, AstraDB, MongoDB, Turso)
- Memverifikasi koneksi ke seluruh database sekolah
- Menginisialisasi/migrasi database kosong sekolah secara otomatis
- Membuat akun Super Admin untuk masing-masing sekolah
- Memantau status & health seluruh tenant

Tidak ada seed manual. Semua dilakukan via dashboard ini.

---

## 2. Stack Teknologi

### Monorepo Structure

```
amertarva-admin/
├── admin/          # SvelteKit 2 + TypeScript (frontend lord admin)
├── backend/        # Bun + Elysia (backend lord admin)
└── CLAUDE.md
```

### Frontend (`admin/`)

- **Framework**: SvelteKit 2 dengan TypeScript — WAJIB, bukan JavaScript
- **Runtime/Build**: Bun
- **Styling**: Tailwind CSS v4 — TIDAK BOLEH plain CSS, TIDAK BOLEH inline style kecuali nilai dinamis
- **HTTP Client**: `fetch` native atau `$lib/api.ts` wrapper
- **State**: Svelte stores (`$lib/stores/`)
- **Icons**: Lucide Svelte
- **Notifikasi**: Svelte Sonner (`svelte-sonner`)

### Backend (`backend/`)

- **Runtime**: Bun
- **Framework**: Elysia dengan plugin resmi (`@elysiajs/cors`, `@elysiajs/jwt`, `@elysiajs/swagger`)
- **Main Registry DB**: Supabase (PostgreSQL) — menyimpan `lord_admins`, `schools_registry`, dan data konfigurasi admin
- **Enkripsi**: AES-256-GCM via `node:crypto` (built-in Bun)
- **Validasi**: Elysia + TypeBox (sudah bundled di Elysia)
- **Password hashing**: `Bun.password` (bcrypt built-in)

---

## 3. Arsitektur Database

### 3.1 Main Registry (Supabase — milik Amertarva)

Database pusat Lord Admin. Menyimpan akun admin, konfigurasi, dan registry semua sekolah.
Gunakan **Supabase Dashboard** atau migration file untuk membuat tabel ini.

```sql
-- Akun lord admin
CREATE TABLE lord_admins (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email      TEXT UNIQUE NOT NULL,
  password   TEXT NOT NULL,
  name       TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Registry sekolah + semua kredensial
CREATE TABLE schools_registry (
  school_id        TEXT PRIMARY KEY,          -- prefix 'SCH_' + nanoid
  school_name      TEXT NOT NULL,
  subdomain_slug   TEXT UNIQUE NOT NULL,
  plan_type        TEXT DEFAULT 'CLASSIC',    -- CLASSIC | PREMIUM | CUSTOM
  status           TEXT DEFAULT 'PENDING',    -- PENDING | ACTIVE | SUSPENDED

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

  -- Metadata inisialisasi
  init_status        TEXT DEFAULT 'NOT_STARTED',
  init_error         TEXT,
  super_admin_email  TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER schools_registry_updated_at
  BEFORE UPDATE ON schools_registry
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
```

> **RLS**: Tabel ini tidak diakses langsung dari frontend. Backend menggunakan `service_role` key yang bypass RLS. Aktifkan RLS dan biarkan policy kosong (block all) sebagai lapisan keamanan tambahan.

### 3.2 Database per Sekolah (Tenant)

Setiap sekolah punya 6 database terpisah:

| Database          | Fungsi                  | Teknologi             |
| ----------------- | ----------------------- | --------------------- |
| Supabase Teachers | Akun & profil guru      | Supabase (PostgreSQL) |
| Supabase Students | Akun & profil siswa     | Supabase (PostgreSQL) |
| Supabase Classes  | Kelas, rombel, jadwal   | Supabase (PostgreSQL) |
| Supabase Grades   | Nilai, rapor, transkrip | Supabase (PostgreSQL) |
| AstraDB           | Materi + vektor chatbot | AstraDB (Cassandra)   |
| MongoDB           | Sesi ujian aktif        | MongoDB Atlas         |
| Turso             | Bank soal               | Turso (libSQL)        |

### 3.3 Alur Ujian (Exam Flow)

```
Bank Soal (Turso)
      ↓  guru pilih soal
Gagasan guru ditambahkan
      ↓
Sesi Ujian (MongoDB) ← disimpan saat ujian berlangsung
      ↓
Nilai akhir → Supabase Grades
```

---

## 4. Enkripsi Kredensial

**SEMUA** field API key/token/URI di `schools_registry` WAJIB dienkripsi sebelum disimpan.

### Implementasi (`backend/src/lib/crypto.ts`)

```typescript
import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";

const ALGORITHM = "aes-256-gcm";
const KEY = Buffer.from(process.env.ENCRYPTION_KEY!, "hex"); // 32 bytes = 64 hex chars

export function encrypt(plaintext: string): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv(ALGORITHM, KEY, iv);
  const encrypted = Buffer.concat([
    cipher.update(plaintext, "utf8"),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();
  // Format: iv(12B):tag(16B):ciphertext — semua base64
  return [
    iv.toString("base64"),
    tag.toString("base64"),
    encrypted.toString("base64"),
  ].join(":");
}

export function decrypt(ciphertext: string): string {
  const [ivB64, tagB64, dataB64] = ciphertext.split(":");
  const iv = Buffer.from(ivB64, "base64");
  const tag = Buffer.from(tagB64, "base64");
  const data = Buffer.from(dataB64, "base64");
  const decipher = createDecipheriv(ALGORITHM, KEY, iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(data), decipher.final()]).toString(
    "utf8",
  );
}
```

**JANGAN** pernah log atau return nilai yang sudah didekripsi ke frontend.
Frontend hanya boleh tahu bahwa field "sudah terisi" (`isConfigured: boolean`), bukan nilainya.

---

## 5. Struktur Folder (Clean Architecture)

Setiap layer hanya boleh bergantung ke layer di bawahnya.
`presentation → application → domain ← infrastructure`

### `backend/` — Clean Architecture

```
backend/
├── src/
│   ├── domain/                          # Inti bisnis — bebas framework, bebas DB
│   │   ├── entities/
│   │   │   ├── school.entity.ts         # School, InitStatus, PlanType types
│   │   │   └── lord-admin.entity.ts     # LordAdmin type
│   │   ├── repositories/
│   │   │   ├── school.repository.ts     # interface ISchoolRepository
│   │   │   └── lord-admin.repository.ts # interface ILordAdminRepository
│   │   └── services/
│   │       ├── encryption.service.ts    # interface IEncryptionService
│   │       └── connector.service.ts     # interface IConnectorService
│   │
│   ├── application/                     # Use cases — orkestrasi domain
│   │   ├── use-cases/
│   │   │   ├── auth/
│   │   │   │   └── login.usecase.ts
│   │   │   └── schools/
│   │   │       ├── create-school.usecase.ts
│   │   │       ├── list-schools.usecase.ts
│   │   │       ├── get-school.usecase.ts
│   │   │       ├── update-school.usecase.ts
│   │   │       ├── verify-connections.usecase.ts
│   │   │       ├── initialize-school.usecase.ts
│   │   │       └── create-super-admin.usecase.ts
│   │   └── dtos/
│   │       ├── school.dto.ts            # CreateSchoolDto, UpdateSchoolDto
│   │       └── auth.dto.ts              # LoginDto, TokenDto
│   │
│   ├── infrastructure/                  # Implementasi konkret (DB, crypto, HTTP)
│   │   ├── database/
│   │   │   ├── supabase/
│   │   │   │   ├── client.ts            # koneksi Supabase main registry (service_role)
│   │   │   │   ├── schema.sql           # DDL migration tabel lord_admins & schools_registry
│   │   │   │   └── school.repository.ts # impl ISchoolRepository
│   │   │   └── migrations/              # SQL/script migrasi per DB sekolah
│   │   │       ├── supabase-teachers.sql
│   │   │       ├── supabase-students.sql
│   │   │       ├── supabase-classes.sql
│   │   │       ├── supabase-grades.sql
│   │   │       ├── turso-questions.sql
│   │   │       └── mongodb-indexes.ts
│   │   ├── connectors/                  # Test ping per tipe DB
│   │   │   ├── supabase.connector.ts
│   │   │   ├── astradb.connector.ts
│   │   │   ├── mongodb.connector.ts
│   │   │   └── turso.connector.ts
│   │   ├── crypto/
│   │   │   └── aes-gcm.service.ts       # impl IEncryptionService (AES-256-GCM)
│   │   └── initializers/                # Inisialisasi schema per DB sekolah
│   │       ├── supabase-teachers.init.ts
│   │       ├── supabase-students.init.ts
│   │       ├── supabase-classes.init.ts
│   │       ├── supabase-grades.init.ts
│   │       ├── astradb.init.ts
│   │       ├── mongodb.init.ts
│   │       └── turso.init.ts
│   │
│   └── presentation/                    # Framework Elysia — hanya routing & middleware
│       ├── middleware/
│       │   └── auth.middleware.ts       # JWT guard
│       ├── routes/
│       │   ├── auth.route.ts            # POST /auth/login, /auth/refresh
│       │   ├── schools.route.ts         # registrasi semua route /schools
│       │   └── health.route.ts          # GET /health
│       └── index.ts                     # entry point, mount semua routes
│
├── scripts/
│   └── seed-lord-admin.ts               # CLI seed akun lord admin
├── package.json
├── bunfig.toml
└── .env
```

### `admin/` — Clean Architecture (SvelteKit)

SvelteKit mengharuskan `src/routes/` untuk file-based routing.
Layer Clean Architecture ditempatkan di `src/lib/`.

```
admin/
├── src/
│   ├── routes/                          # SvelteKit file-based routing (presentation)
│   │   ├── +layout.svelte               # root layout + auth guard
│   │   ├── +page.svelte                 # redirect → /schools
│   │   ├── login/
│   │   │   └── +page.svelte
│   │   └── schools/
│   │       ├── +page.svelte             # daftar sekolah
│   │       ├── new/
│   │       │   └── +page.svelte         # wizard tambah sekolah
│   │       └── [id]/
│   │           ├── +page.svelte         # detail & status sekolah
│   │           └── edit/
│   │               └── +page.svelte     # edit kredensial
│   │
│   └── lib/
│       ├── domain/                      # Types & interfaces (framework-agnostic)
│       │   ├── school.ts                # School, SchoolStatus, InitStep types
│       │   └── auth.ts                  # AuthToken, LordAdmin types
│       │
│       ├── application/                 # State management & orchestration
│       │   ├── stores/
│       │   │   ├── auth.store.ts        # JWT token, user info
│       │   │   └── schools.store.ts     # list sekolah, selected school
│       │   └── use-cases/
│       │       ├── auth.usecase.ts      # login, logout, refresh
│       │       └── schools.usecase.ts   # CRUD + verify + init
│       │
│       ├── infrastructure/              # Implementasi HTTP ke backend
│       │   └── api/
│       │       ├── client.ts            # fetch wrapper (base URL, token injection)
│       │       ├── auth.api.ts          # panggil /auth/*
│       │       └── schools.api.ts       # panggil /schools/*
│       │
│       └── presentation/
│           ├── shared/                  # Komponen UI generik — JANGAN buat manual di halaman
│           │   ├── Button.svelte        # variant: primary | secondary | ghost | danger
│           │   ├── Card.svelte
│           │   ├── Input.svelte
│           │   ├── Badge.svelte
│           │   ├── SearchBar.svelte     # dengan debounce
│           │   ├── Filter.svelte        # dropdown filter generic
│           │   ├── Modal.svelte
│           │   ├── Table.svelte
│           │   └── Spinner.svelte
│           └── components/             # Komponen spesifik fitur
│               ├── CredentialField.svelte
│               ├── StatusBadge.svelte
│               ├── InitProgress.svelte
│               └── ConnectionCard.svelte
│
├── package.json
└── svelte.config.js
```

### Aturan Dependency Antar Layer

```
❌ domain/   → TIDAK BOLEH import dari application, infrastructure, presentation
❌ application/ → TIDAK BOLEH import dari infrastructure atau presentation
✅ infrastructure/ → boleh import domain (implement interface-nya)
✅ presentation/ → boleh import application & domain
```

---

## 6. API Endpoints

### Auth

| Method | Path            | Deskripsi                    |
| ------ | --------------- | ---------------------------- |
| POST   | `/auth/login`   | Login lord admin, return JWT |
| POST   | `/auth/refresh` | Refresh token                |

### Schools

| Method | Path                              | Deskripsi                                                         |
| ------ | --------------------------------- | ----------------------------------------------------------------- |
| GET    | `/schools`                        | List semua sekolah (tanpa kredensial)                             |
| POST   | `/schools`                        | Daftarkan sekolah baru                                            |
| GET    | `/schools/:id`                    | Detail sekolah (tanpa kredensial, hanya `isConfigured` per field) |
| PUT    | `/schools/:id`                    | Update konfigurasi sekolah                                        |
| DELETE | `/schools/:id`                    | Nonaktifkan sekolah (soft delete, set status SUSPENDED)           |
| POST   | `/schools/:id/verify-connections` | Test ping ke semua 7 database                                     |
| POST   | `/schools/:id/initialize`         | Jalankan migrasi + inisialisasi semua DB                          |
| POST   | `/schools/:id/create-super-admin` | Buat akun super admin di Supabase Teachers                        |
| GET    | `/schools/:id/health`             | Health check real-time semua DB                                   |

### Response Shape

```typescript
// GET /schools
{
  data: SchoolSummary[],
  total: number
}

// POST /schools/:id/verify-connections
{
  results: {
    supabase_teachers: { ok: boolean, latencyMs: number, error?: string },
    supabase_students: { ok: boolean, latencyMs: number, error?: string },
    supabase_classes:  { ok: boolean, latencyMs: number, error?: string },
    supabase_grades:   { ok: boolean, latencyMs: number, error?: string },
    astradb:           { ok: boolean, latencyMs: number, error?: string },
    mongodb:           { ok: boolean, latencyMs: number, error?: string },
    turso:             { ok: boolean, latencyMs: number, error?: string },
  }
}

// POST /schools/:id/initialize (SSE atau polling)
{
  step: string,        // "Initializing Supabase Teachers..."
  stepIndex: number,   // 1-7
  totalSteps: number,  // 7
  status: 'running' | 'done' | 'error',
  error?: string
}
```

---

## 7. Alur Inisialisasi Sekolah (7 Langkah Berurutan)

Backend menjalankan ini secara sequential, bukan parallel, agar error terdeteksi per langkah.

```
Step 1: Verify semua koneksi (ping test)
Step 2: Init Supabase Teachers  → CREATE TABLE users, roles, dll
Step 3: Init Supabase Students  → CREATE TABLE users, profiles, dll
Step 4: Init Supabase Classes   → CREATE TABLE classes, enrollments, dll
Step 5: Init Supabase Grades    → CREATE TABLE grades, transcripts, dll
Step 6: Init AstraDB            → CREATE TABLE materi, chatbot_vectors (namespaced)
Step 7: Init MongoDB            → createCollection exam_sessions + indexes
Step 8: Init Turso (sekolah)    → CREATE TABLE questions, categories, dll
```

Jika satu langkah gagal, proses berhenti. `init_status` di registry diset `FAILED` beserta pesan error.
Proses dapat diulang (`retry`) — langkah yang sudah berhasil di-skip berdasarkan flag.

---

## 8. Wizard Tambah Sekolah (Frontend)

Step-by-step form, bukan satu form panjang:

```
Step 1: Info Sekolah
  - Nama sekolah
  - Subdomain slug (preview: {slug}.amertarva.com)
  - Plan type

Step 2: Supabase — Teachers
  - URL Supabase
  - Service Role Key
  [Test Koneksi ✓]

Step 3: Supabase — Students
  [sama]

Step 4: Supabase — Classes
  [sama]

Step 5: Supabase — Grades
  [sama]

Step 6: AstraDB
  - Endpoint
  - Token
  - Namespace (keyspace)
  [Test Koneksi ✓]

Step 7: MongoDB
  - URI
  - Database Name
  [Test Koneksi ✓]

Step 8: Turso (Bank Soal)
  - URL
  - Auth Token
  [Test Koneksi ✓]

Step 9: Review & Simpan
  - Summary semua koneksi
  - [Simpan Konfigurasi]

Step 10: Inisialisasi (opsional, bisa nanti)
  - Progress bar 8 langkah
  - [Inisialisasi Sekalian]

Step 11: Buat Super Admin
  - Email
  - Password
  - Nama lengkap
  [Buat Akun]
```

Setiap step validasi dulu sebelum bisa lanjut ke step berikutnya.
Data disimpan ke backend **hanya setelah** step 9 (Review & Simpan).

---

## 9. Komponen Frontend Wajib

### `CredentialField.svelte`

Input API key dengan:

- Password field default (tidak terlihat)
- Toggle show/hide
- Tombol "Test" yang ping backend `verify` untuk field tersebut
- Visual indicator: gray (belum test) → green (OK) → red (gagal)
- JANGAN tampilkan nilai yang sudah tersimpan. Placeholder: `••••••••••••` jika sudah ada isinya

### `InitProgress.svelte`

- Tampilkan 8 langkah sebagai list vertikal
- Status per langkah: pending (abu) → running (spinner biru) → done (✓ hijau) → failed (✗ merah)
- Pesan error inline jika satu langkah gagal
- Polling ke `GET /schools/:id/health` setiap 2 detik selama proses berlangsung

### `ConnectionCard.svelte`

- Card per database (7 total)
- Badge latency (hijau <200ms, kuning 200-500ms, merah >500ms)
- Tombol "Ping" individual

---

## 10. Autentikasi Lord Admin

- JWT dengan expiry 8 jam, refresh token 30 hari
- Token disimpan di `localStorage` (admin internal, bukan publik)
- Semua route `/schools/*` wajib middleware `auth.ts`
- Tidak ada registrasi publik — akun lord admin dibuat via seed script atau CLI tool terpisah

### Seed Lord Admin (CLI)

```
# backend/scripts/seed-lord-admin.ts
bun run scripts/seed-lord-admin.ts --email admin@amertarva.com --name "Super Lord"
# prompt password
```

---

## 11. Environment Variables

### `backend/.env`

```env
# Main Registry (Supabase Amertarva)
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=xxx   # service_role — JANGAN pakai anon key

# Enkripsi
ENCRYPTION_KEY=<64 char hex, generate: openssl rand -hex 32>

# JWT
JWT_SECRET=<panjang, random>
JWT_EXPIRY=8h

# Server
PORT=3000
CORS_ORIGIN=http://localhost:5173
```

### `admin/.env`

```env
PUBLIC_API_URL=http://localhost:3000
```

---

## 12. Konvensi Kode

### Batas Panjang File (WAJIB)

- **Maksimal 400 baris per file** — jika melebihi, pecah menjadi modul terpisah
- Contoh pemecahan: `schools.usecase.ts` → `create-school.usecase.ts` + `verify-school.usecase.ts`
- Route file yang panjang → pisahkan handler ke file terpisah, route hanya berisi registrasi path

### TypeScript (Wajib)

- Semua file `.ts` atau `.svelte` dengan `<script lang="ts">`
- Tidak ada `any` kecuali terpaksa dan diberi komentar alasan
- Interface/type selalu di-export dari `$lib/types.ts` (admin) atau `src/types/` (backend)

### Komentar

- Komentar dalam **Bahasa Indonesia**, singkat — cukup `// Nama Fitur` atau `// Aksi`
- Tidak perlu kalimat panjang. Contoh:

```typescript
// Login
export async function login(dto: LoginDto) { ... }

// Enkripsi kredensial
const encrypted = encrypt(dto.supabaseKey)

// Verifikasi koneksi
const results = await verifyAll(school)
```

- Fungsi yang sudah jelas dari namanya tidak perlu komentar sama sekali

### Naming

- File: `kebab-case.ts`
- Komponen Svelte: `PascalCase.svelte`
- Konstanta: `SCREAMING_SNAKE_CASE`
- Variabel/fungsi: `camelCase`

### Error Handling

- Backend: selalu return `{ error: string, code: string }` untuk error
- Frontend: semua `fetch` dibungkus try-catch, error ditampilkan via `toast.error()`
- Tidak ada `console.log` di production. Gunakan logger sederhana atau hapus.

---

## 13. Keamanan

- **JANGAN** pernah log nilai API key/token yang sudah didekripsi
- **JANGAN** return raw credential ke frontend, hanya `isConfigured: boolean`
- Rate limit endpoint `/auth/login`: max 5 req/menit per IP
- Semua input disanitasi via Elysia TypeBox (schema validation)
- `ENCRYPTION_KEY` wajib di-rotate berkala dan **tidak boleh** masuk version control
- Akses ke `schools_registry` hanya via backend, tidak ada direct DB access dari frontend

---

## 14. Yang DILARANG (FORBIDDEN)

```
❌ Plain CSS — gunakan Tailwind class
❌ JavaScript biasa — semua harus TypeScript
❌ Log credential yang sudah didekripsi
❌ Simpan plaintext credential ke DB (selalu enkripsi)
❌ Parallel inisialisasi database (harus sequential)
❌ Tampilkan nilai API key ke frontend setelah disimpan
❌ Registrasi lord admin via UI publik
❌ <form> element di Svelte (gunakan event handler biasa)
❌ any kecuali ada alasan jelas di komentar
❌ Buat tombol/card/input/modal secara manual di halaman — selalu pakai dari presentation/shared/
❌ Komentar panjang berbentuk kalimat — cukup // Nama Fitur
```

---

## 15. UI Aesthetic

**Tema**: Clean & earthy — terang, bersih, hangat. Bukan dark mode.

### Palet Warna

- Background: `#F8FAF8` — canvas utama, warm white
- Surface: `#FFFFFF` — card, panel, modal
- Border: `#E2EAE6` — garis pembatas ringan
- Primary: `#789D8E` — teal sage, warna brand utama (sidebar, heading, icon aktif)
- Secondary: `#F4D35E` — kuning hangat, digunakan untuk tombol CTA, badge highlight, aksi utama
- Success: `#5A9E7C`
- Warning: `#E8A838`
- Error: `#D95F5F`
- Text primary: `#1C2B26` — near-black dengan hint hijau
- Text muted: `#7A9590`

### Penggunaan Warna

```
Primary (#789D8E)  → sidebar bg, active nav, link, icon, border focus
Secondary (#F4D35E) → tombol primary (btn-primary), badge NEW, aksen highlight
Background (#F8FAF8) → body, halaman
Surface (#FFFFFF)  → card, tabel, dropdown, modal
```

### Contoh Class Tailwind

```svelte
<!-- Tombol primary → secondary color -->
<button class="bg-[#F4D35E] text-[#1C2B26] hover:bg-[#e8c94e] font-medium px-4 py-2 rounded-lg">
  Simpan
</button>

<!-- Teks primary color -->
<span class="text-[#789D8E] font-semibold">Amertarva</span>

<!-- Sidebar item aktif -->
<a class="bg-[#789D8E] text-white px-3 py-2 rounded-lg">Schools</a>

<!-- Card -->
<div class="bg-white border border-[#E2EAE6] rounded-xl p-4 shadow-sm">
```

Font: Inter (system fallback) — tidak perlu import Google Fonts untuk internal tool.

Sidebar kiri dengan navigasi, konten utama di kanan. Compact density — ini tool admin bukan marketing page.

---

## 16. Perintah Dev

```bash
# Install semua dependency
cd backend && bun install
cd admin && bun install

# Jalankan backend
cd backend && bun run dev   # port 3000

# Jalankan frontend
cd admin && bun run dev     # port 5173

# Seed lord admin pertama
cd backend && bun run scripts/seed-lord-admin.ts

# Generate ENCRYPTION_KEY
openssl rand -hex 32
```

---

_Dokumen ini adalah kontrak implementasi. Setiap deviasi dari spesifikasi ini harus didiskusikan terlebih dahulu._
