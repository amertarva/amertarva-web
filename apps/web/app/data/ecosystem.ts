// data/ecosystem.ts — bagian header dan produk

export const ecosystemHeader = {
  label: "Ekosistem Produk",
  title: "Dua Solusi, Satu Ekosistem",
  subtitle:
    "Platform kami dirancang khusus untuk dua kebutuhan utama — bisnis yang ingin hadir secara digital, dan institusi pendidikan yang siap belajar tanpa batas ruang.",
};

export interface EcosystemProduct {
  id: string;
  tag: string; // teks badge kecil di atas judul kartu
  title: string;
  description: string;
  features: string[]; // daftar fitur, maksimal 4 item
  domain: string; // domain yang ditampilkan di bagian bawah kartu
  href: string; // link tujuan klik tombol
  colorVariant: "office" | "learning"; // pengatur warna kartu
}

export const ecosystemProducts: EcosystemProduct[] = [
  {
    id: "office",
    tag: "For Business",
    title: "Amertarva Office",
    description:
      "Solusi digital lengkap untuk bisnis dan korporat — dari company profile hingga sistem operasional.",
    features: [
      "Landing page & company profile",
      "Website corporate & profil bisnis",
      "Sistem point of sale (POS)",
      "Custom web app untuk operasional",
    ],
    domain: "office.amertarva.app",
    href: "https://office.amertarva.app",
    colorVariant: "office",
  },
  {
    id: "learning",
    tag: "For Education",
    title: "Amertarva Learning",
    description:
      "Platform e-learning modern untuk institusi pendidikan yang ingin mendigitalisasi proses pembelajaran.",
    features: [
      "Manajemen materi & kurikulum",
      "Kelas virtual & tugas online",
      "Monitoring progres siswa",
      "Multi-tenant per institusi",
    ],
    domain: "learning.amertarva.app",
    href: "https://learning.amertarva.app",
    colorVariant: "learning",
  },
];
