export interface Service {
  id: string;
  title: string;
  description: string;
}

export const services: Service[] = [
  {
    id: "landing-page",
    title: "Landing page / company profile",
    description:
      "Situs satu halaman untuk presentasi bisnis, biasanya untuk UMKM atau personal brand yang baru mulai.",
  },
  {
    id: "ecommerce",
    title: "Website e-commerce",
    description:
      "Toko online skala kecil-menengah dengan katalog produk dan integrasi pembayaran dasar.",
  },
  {
    id: "lms",
    title: "Sistem manajemen pembelajaran (LMS)",
    description:
      "Platform sederhana untuk lembaga kursus atau institusi pendidikan yang ingin mendigitalisasi materi belajar mereka.",
  },
  {
    id: "custom-web-app",
    title: "Custom web app",
    description:
      "Aplikasi web sesuai kebutuhan spesifik klien, misalnya sistem booking, dashboard internal, atau alat verifikasi data.",
  },
  {
    id: "maintenance",
    title: "Maintenance & update",
    description:
      "Layanan berkelanjutan untuk update konten, perbaikan bug, dan penambahan fitur kecil pasca-peluncuran.",
  },
];
