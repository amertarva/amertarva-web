# Amertarva E-Learning - Frontend

Dokumentasi ringkas repositori aplikasi E-Learning Amertarva (Frontend).

## 🚀 Spesifikasi Teknologi
* **Framework Utama:** [Astro v5](https://astro.build/)
* **UI Library:** [Preact](https://preactjs.com/) (Komponen interaktif/islands)
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
* **State Management:** [Nanostores](https://github.com/nanostores/nanostores)

## 📌 Fitur & Halaman Utama
1. **Landing Page (`index.astro`):**
   * **Navbar & Footer** (Navigasi & tautan)
   * **Hero Section** (Pengenalan platform Amertarva)
   * **About Section** (Penjelasan nilai & visi platform)
   * **Workflow Section** (Langkah pendaftaran & pembelajaran)
   * **Pricing Section** (Paket langganan)
   * **CTA Section** (Ajakan mendaftar)
2. **Chatbot Widget (`ChatbotWidget.jsx`):**
   * Widget chatbot interaktif terintegrasi untuk asisten AI.
3. **Dashboard (Struktur Awal):**
   * Folder siap pakai untuk modul `student` (siswa) dan `teacher` (pengajar).

## ⚙️ Integrasi API & Environment
* **Proxy Dev:** Request `/api/*` diteruskan ke `http://localhost:3000` secara otomatis pada mode development.
* **Variabel Lingkungan:** `PUBLIC_BACKEND_URL` untuk URL API backend pada mode production.

## 🛠️ Cara Menjalankan
* `bun install` - Instalasi dependensi
* `bun dev` - Menjalankan dev server di `localhost:4321`
* `bun build` - Build production ke folder `./dist/`

