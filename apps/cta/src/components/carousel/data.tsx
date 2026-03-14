import React from "react";
import {
  School,
  Smartphone,
  BarChart3,
  FileX,
  Globe2,
  CheckCircle2,
  GitCommit,
  Rocket,
  Check
} from "lucide-react";
import { SlideData } from "./types";

export const slides: SlideData[] = [
  {
    id: 1,
    icon: School,
    headline: "Mengapa Sekolah Harus Segera Go Digital?",
    subline: "73% siswa belajar lebih baik — tapi sebagian besar sekolah belum tahu caranya.",
    body: null,
  },
  {
    id: 2,
    icon: Smartphone,
    headline: "Cara Belajar Sudah Berubah. Tapi Sekolahnya Belum.",
    subline: "Generasi smartphone, masih diajar dengan cara tahun 90-an.",
    body: (
      <div className="space-y-4">
        <p className="text-gray-600 leading-relaxed text-lg">
          Anak-anak hari ini tumbuh bersama internet dan informasi instan. Namun di banyak sekolah Indonesia, proses belajar masih berjalan seperti 20–30 tahun lalu, papan tulis, buku cetak, absensi kertas.
        </p>
        <p className="text-gray-600 leading-relaxed text-lg">
          Bukan salah gurunya. Tapi jika cara mengajar tidak beradaptasi, ada satu risiko besar yang diam-diam terjadi: <span className="font-semibold text-[#789D8E]">siswa kehilangan minat belajar.</span>
        </p>
      </div>
    ),
  },
  {
    id: 3,
    icon: BarChart3,
    headline: "Ini Bukan Asumsi. Ini Data.",
    subline: "Angka-angka ini berbicara lebih keras dari opini mana pun.",
    body: (
      <div className="space-y-4">
        {[
          "68% guru kesulitan memantau perkembangan siswa secara individual (Kemendikbud, 2023)",
          "1 dari 3 siswa SMP merasa bosan karena metode mengajar yang monoton (UNICEF Indonesia, 2022)",
          "Sekolah yang adopsi teknologi mencatat peningkatan kehadiran siswa 34% dalam satu semester (OECD, 2023)",
          "Guru menghabiskan rata-rata 11 jam per minggu hanya untuk administrasi, yang seharusnya bisa diotomasi.",
        ].map((item, idx) => (
          <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-white shadow-sm border border-gray-100">
            <div className="mt-1">
              <BarChart3 className="w-5 h-5 text-[#E9C46A]" />
            </div>
            <p className="text-gray-700 font-medium">{item}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 4,
    icon: FileX,
    headline: "Yang Terjadi Setiap Hari di Ribuan Sekolah",
    subline: "Masalah ini familiar? Kamu tidak sendirian.",
    body: (
      <div className="space-y-6">
        <p className="text-gray-600 leading-relaxed text-lg">
          Absen manual. Rekap nilai di buku folio. Tugas kertas yang mudah hilang. Tidak ada data yang bisa dianalisis, tidak ada gambaran siapa yang tertinggal.
        </p>
        <div className="space-y-3">
          <p className="font-semibold text-gray-800">Akibatnya:</p>
          {[
            "Guru kelelahan bukan karena mengajar, tapi karena administrasi",
            "Siswa yang tertinggal baru terdeteksi saat sudah terlambat",
            "Orang tua tidak mendapat info perkembangan anak secara real-time"
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className="bg-red-50 p-1.5 rounded-full">
                <span className="text-red-500 font-bold">✕</span>
              </div>
              <p className="text-gray-700">{item}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 5,
    icon: Globe2,
    headline: "Dunia Sudah Bergerak. Indonesia Tidak Boleh Tertinggal.",
    subline: "Negara-negara ini sudah membuktikannya.",
    body: (
      <div className="space-y-6">
        <div className="grid gap-4">
          {[
            { country: "Finlandia", text: "Integrasi teknologi sejak 2016, literasi siswa naik 29% dalam 4 tahun." },
            { country: "Singapura", text: "91% sekolah sudah paperless setelah mewajibkan kompetensi digital guru." },
            { country: "India", text: "1,5 juta sekolah berhasil didigitalisasi dalam 3 tahun lewat program DIKSHA." }
          ].map((item, idx) => (
            <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-white shadow-sm border border-[#789D8E]/20">
              <div className="w-10 h-10 shrink-0 flex items-center justify-center rounded-full bg-[#789D8E]/10 text-[#789D8E] font-bold">
                🌏
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">{item.country}</h4>
                <p className="text-gray-600 text-sm">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-gray-600 font-medium leading-relaxed bg-[#E9C46A]/10 p-4 rounded-xl border border-[#E9C46A]/30">
          Indonesia punya lebih dari <span className="text-[#E9C46A] font-bold">216.000 sekolah</span>. Potensinya luar biasa — yang dibutuhkan hanyalah langkah pertama yang tepat.
        </p>
      </div>
    ),
  },
  {
    id: 6,
    icon: CheckCircle2,
    headline: "Digitalisasi Bukan Tentang Beli Gadget Baru",
    subline: "Banyak sekolah salah kaprah — dan akhirnya gagal di tengah jalan.",
    body: (
      <div className="space-y-6">
        <p className="text-gray-600 leading-relaxed text-lg">
          Digitalisasi sejati bukan soal laptop baru atau proyektor canggih. Yang terpenting adalah <span className="font-bold text-[#789D8E]">sistem</span> — bagaimana data dikelola, proses berjalan, dan semua pihak terhubung.
        </p>
        <div className="space-y-3">
          <p className="font-semibold text-gray-800">Sebuah sistem yang baik harus:</p>
          {[
            "Mudah digunakan guru dari berbagai latar belakang",
            "Menyimpan dan menganalisis data otomatis",
            "Menghubungkan guru, siswa, dan orang tua dalam satu platform"
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-white border border-gray-100 shadow-sm">
              <div className="bg-[#789D8E]/10 p-1.5 rounded-full text-[#789D8E]">
                <Check className="w-4 h-4" />
              </div>
              <p className="text-gray-700">{item}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 7,
    icon: GitCommit,
    headline: "Satu Langkah Kecil yang Tepat Sudah Cukup",
    subline: "Transformasi tidak harus terjadi sekaligus.",
    body: (
      <div className="space-y-5">
        <p className="text-gray-600 leading-relaxed text-lg">
          Mulai dari hal paling sederhana: ganti satu proses manual menjadi digital. Absensi. Pengumpulan tugas. Rekap nilai.
        </p>
        <div className="p-6 rounded-2xl bg-white border border-[#789D8E]/20 shadow-lg shadow-[#789D8E]/5 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#E9C46A]/10 rounded-full blur-2xl"></div>
          <p className="text-gray-700 leading-relaxed relative z-10 font-medium">
            Dari satu langkah itu, sistem mulai terbentuk. Data mulai terkumpul. Dan seluruh ekosistem sekolah perlahan berubah, tanpa terasa berat.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 8,
    icon: Rocket,
    headline: "Amertarva Dirancang untuk Langkah Pertama Itu",
    subline: "Tidak butuh keahlian IT, cukup semangat untuk berubah.",
    body: (
      <div className="space-y-6">
        <p className="text-gray-600 leading-relaxed text-lg">
          Data menunjukkan sekolah yang go digital meningkat <span className="font-bold text-[#789D8E]">34%</span> kehadiran siswanya. Amertarva hadir agar sekolahmu bisa menjadi bagian dari angka itu, mulai dari absensi, pengelolaan tugas, rekap nilai, hingga laporan ke orang tua.
        </p>
        <p className="text-gray-600 font-medium italic">
          Tidak perlu pelatihan berbulan-bulan. Tidak perlu infrastruktur mahal. Cukup mulai hari ini.
        </p>
        <div className="pt-4 flex flex-col sm:flex-row gap-4">
          <a href="https://amertarva.id" target="_blank" rel="noopener noreferrer" className="flex-1 text-center py-4 px-6 bg-[#789D8E] hover:bg-[#608073] text-white font-semibold rounded-xl transition-all shadow-lg shadow-[#789D8E]/30 hover:shadow-xl hover:-translate-y-1">
            Coba Amertarva Gratis
          </a>
          <a href="https://instagram.com/amertarva" target="_blank" rel="noopener noreferrer" className="flex-1 text-center py-4 px-6 bg-[#E9C46A] hover:bg-[#d4b059] text-gray-900 font-semibold rounded-xl transition-all shadow-lg shadow-[#E9C46A]/30 hover:shadow-xl hover:-translate-y-1">
            Hubungi Kami
          </a>
        </div>
      </div>
    ),
  },
];
