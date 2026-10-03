# Panduan Deployment `apps/admin` ke Vercel

Dokumen ini berisi panduan lengkap untuk melakukan deployment aplikasi **Amertarva Master Admin** (`apps/admin`) ke Vercel.

---

## 1. Arsitektur & Adapter

`apps/admin` menggunakan:
- **Framework**: SvelteKit 2 (`@sveltejs/kit: ^2.50.2`) + Vite 7
- **Styling**: TailwindCSS v4
- **Adapter**: `@sveltejs/adapter-vercel@5.10.3` (kompatibel penuh dengan SvelteKit 2)
- **Runtime**: `nodejs22.x`

> **Catatan Teknis (Windows vs Vercel Linux):**
> Jika Anda menjalankan `bun run build` secara lokal di sistem operasi Windows tanpa Administrator/Developer Mode, Anda mungkin melihat error `EPERM: operation not permitted, symlink '![-]\catchall.func'`. Ini adalah batasan file system Windows terhadap symbolic link. **Di Vercel (Linux), symlink didukung secara native dan build akan sukses 100%.**

---

## 2. Pengaturan Project di Vercel Dashboard

Saat menambahkan project baru di [Vercel Dashboard](https://vercel.com/new):

### A. General Settings
1. **Repository**: Pilih repository GitHub `amertarva-web`.
2. **Project Name**: Beri nama, misalnya `amertarva-admin`.
3. **Framework Preset**: Pilih **SvelteKit** (akan terdeteksi secara otomatis).
4. **Root Directory**:
   - Klik tombol **Edit**.
   - Pilih / ketik: `apps/admin`.
   - Pastikan opsi *"Include source files outside of the Root Directory in the Build Step"* tetap **centang (aktif)** (diperlukan untuk Turborepo monorepo).

### B. Build and Output Settings
- **Build Command**: Biarkan default (`vite build` atau kosong).
- **Output Directory**: Biarkan default (dikelola otomatis oleh adapter Vercel).
- **Install Command**: `bun install`.

---

## 3. Environment Variables

Buka tab **Environment Variables** di project Vercel dan tambahkan variabel berikut:

| Key | Value (Contoh) | Keterangan | Target Environments |
| :--- | :--- | :--- | :--- |
| `PUBLIC_API_URL` | `https://amertarva-backend.vercel.app` | URL API backend yang sudah dideploy di Vercel (tanpa trailing slash) | Production, Preview, Development |

> **PENTING**:
> Variabel dengan prefix `PUBLIC_` diakses oleh SvelteKit (`$env/dynamic/public` dan `$env/static/public`). Pastikan URL backend sudah bisa diakses sebelum admin login.

---

## 4. Langkah Push & Deploy

Jalankan perintah berikut di terminal root proyek Anda untuk menyimpan perubahan dan men-trigger build di Vercel:

```bash
git add apps/admin bun.lock
git commit -m "feat(admin): configure @sveltejs/adapter-vercel for Vercel deployment"
git push origin main
```

---

## 5. Checklist Verifikasi Pasca Deploy

1. [ ] Buka URL deployment Vercel (misal `https://amertarva-admin.vercel.app`).
2. [ ] Halaman login `/login` terbuka dengan benar tanpa error 500 / 404.
3. [ ] Cek Console DevTools browser: pastikan request ke `PUBLIC_API_URL/auth/login` berhasil terhubung ke backend.
4. [ ] Coba navigasi ke sub-halaman seperti `/schools`, `/schools/new`, `/settings` dan lakukan *hard refresh* (F5) untuk memastikan routing SvelteKit di Vercel berfungsi sempurna.
