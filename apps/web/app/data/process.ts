export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: "Discovery & briefing",
    description:
      "Mengumpulkan kebutuhan, tujuan bisnis, dan referensi desain dari klien.",
  },
  {
    step: 2,
    title: "Proposal & quotation",
    description:
      "Menyusun cakupan kerja, lini waktu, dan estimasi biaya berdasarkan paket yang dipilih.",
  },
  {
    step: 3,
    title: "Wireframe & desain UI",
    description:
      "Membuat struktur halaman dan tampilan visual untuk disetujui klien sebelum masuk ke development.",
  },
  {
    step: 4,
    title: "Development",
    description:
      "Membangun tampilan dan fungsi sesuai desain yang sudah disetujui.",
  },
  {
    step: 5,
    title: "Testing & revisi",
    description:
      "Memastikan situs berjalan baik di berbagai perangkat dan memperbaiki revisi dari klien.",
  },
  {
    step: 6,
    title: "Deployment & handover",
    description:
      "Mempublikasikan situs dan menyerahkan akses/dokumentasi penggunaan ke klien.",
  },
  {
    step: 7,
    title: "Maintenance pasca-launch",
    description:
      "Layanan opsional berbayar untuk dukungan teknis dan pembaruan setelah situs berjalan.",
  },
];
