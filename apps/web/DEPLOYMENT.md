# Panduan Deployment `apps/web` ke Vercel

Dokumen ini berisi panduan untuk melakukan deployment aplikasi **Amertarva Main Website** (`apps/web`) ke Vercel.

---

## 1. Arsitektur & Nitro Preset

`apps/web` menggunakan:
- **Framework**: Nuxt 4 (`nuxt: ^4.4.8`) + Vue 3
- **Nitro Engine**: Nitro dengan preset `vercel` (`nuxt.config.ts`)
- **Output Build**: Menghasilkan struktur Vercel Build Output API v3 di direktori `.vercel/output/` (terdiri dari fungsi serverless dan static assets).
- **Catatan Penting**: Nuxt **TIDAK** menghasilkan direktori bernama `dist` untuk SSR deployment. Oleh karena itu, pengaturan **Output Directory** di Vercel harus dibiarkan default (kosong / tanpa override).

---

## 2. Pengaturan Project di Vercel Dashboard

Saat membuat atau mengonfigurasi project di [Vercel Dashboard](https://vercel.com):

### A. General Settings
1. **Repository**: Pilih repository GitHub `amertarva-web`.
2. **Project Name**: Beri nama, misalnya `amertarva-web`.
3. **Framework Preset**: Pilih **Nuxt.js** (jangan pilih *Vite* atau *Other*).
4. **Root Directory**:
   - Klik tombol **Edit**.
   - Masukkan: `apps/web`.
   - Pastikan opsi *"Include source files outside of the Root Directory in the Build Step"* tetap **centang (aktif)** (diperlukan untuk Turborepo monorepo).

### B. Build and Output Settings
- **Build Command**: Biarkan default (`nuxt build` atau `turbo run build`).
- **Output Directory**: **NONAKTIFKAN OVERRIDE (Matikan toggle Override)**.
  > ⚠️ **JANGAN ISI DENGAN `dist`!**  
  > Jika override diaktifkan dan diisi `dist`, Vercel akan mencari folder `dist` yang tidak dibuat oleh Nuxt, sehingga memunculkan error:  
  > `Error: No Output Directory named "dist" found after the Build completed.`
- **Install Command**: Biarkan default (`bun install` atau `npm install`).

---

## 3. Remote Cache / Turborepo

File `turbo.json` di root telah dikonfigurasi agar Turborepo mencatat output berikut saat caching:
```json
"outputs": [
  ".output/**",
  ".vercel/**",
  ".svelte-kit/**",
  "dist/**"
]
```

Jika sebelumnya Anda mengalami error akibat cache lama yang tersimpan di Turborepo / Vercel Remote Cache:
1. Buka halaman deployment yang gagal di Vercel.
2. Klik tombol **Redeploy**.
3. **PENTING**: Hapus centang pada opsi *"Use existing Build Cache"* (Redeploy without cache) agar Vercel menjalankan proses build secara penuh dari awal.

---

## 4. Environment Variables

Pastikan Environment Variables berikut diatur di tab **Settings > Environment Variables** di Vercel Dashboard (sesuaikan dengan environment Production / Preview):

| Key | Value (Contoh) | Keterangan |
| :--- | :--- | :--- |
| `NUXT_PUBLIC_API_URL` | `https://api.amertarva.app` | URL API backend |
| `NUXT_PUBLIC_ELEARNING_URL` | `https://learning.amertarva.app` | URL platform e-learning |
| `NUXT_PUBLIC_WHATSAPP_PHONE` | `6281234567890` | Nomor WhatsApp kontak |
