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
  Check,
  AlertTriangle,
  ArrowRight
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
      <div className="space-y-6">
        <div className="p-6 sm:p-8 bg-gray-50 rounded-2xl border border-gray-100 transition-all duration-300 overflow-hidden group">
          <p className="text-gray-700 leading-relaxed text-lg sm:text-xl font-medium font-sans">
            Anak-anak hari ini tumbuh bersama internet dan informasi instan. Namun di banyak sekolah Indonesia, proses belajar masih berjalan seperti <span className="text-gray-900 font-bold bg-[#E9C46A]/20 px-2 py-0.5 rounded-md">20–30 tahun lalu</span>: papan tulis, buku cetak, absensi kertas.
          </p>
        </div>
        <div className="flex items-start gap-4 p-5 rounded-2xl bg-red-50 border border-red-100 overflow-hidden">
          <AlertTriangle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
          <p className="text-gray-700 leading-relaxed text-lg font-medium">
            Bukan salah gurunya. Tapi jika cara mengajar tidak beradaptasi, ada satu risiko besar yang diam-diam terjadi: <span className="font-bold text-red-600 bg-red-100/50 px-2 py-0.5 rounded-md">siswa kehilangan minat belajar.</span>
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    icon: BarChart3,
    headline: "Ini Bukan Asumsi. Ini Data.",
    subline: "Angka-angka ini berbicara lebih keras dari opini mana pun.",
    body: (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { text: "68% guru kesulitan memantau perkembangan siswa secara individual", source: "Kemendikbud, 2023", color: "bg-[#789D8E]/10", border: "border-[#789D8E]/20", textC: "text-[#789D8E]" },
          { text: "1 dari 3 siswa SMP merasa bosan karena metode mengajar monoton", source: "UNICEF, 2022", color: "bg-[#E9C46A]/10", border: "border-[#E9C46A]/20", textC: "text-[#E9C46A]" },
          { text: "Kehadiran siswa naik 34% di sekolah yang adopsi teknologi", source: "OECD, 2023", color: "bg-blue-50", border: "border-blue-100", textC: "text-blue-500" },
          { text: "Guru menghabiskan 11 jam/minggu hanya untuk administrasi manual", source: "Riset Global", color: "bg-purple-50", border: "border-purple-100", textC: "text-purple-500" },
        ].map((item, idx) => (
          <div key={idx} className={`flex flex-col justify-between p-5 rounded-2xl ${item.color} border ${item.border} transition-transform duration-300`}>
            <p className="text-gray-800 font-semibold text-lg mb-3 leading-snug">{item.text}</p>
            <div className="flex items-center gap-2 mt-auto">
              <span className={`w-2 h-2 rounded-full ${item.textC.replace('text-', 'bg-')}`}></span>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{item.source}</span>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 4,
    icon: FileX,
    headline: "Realita di Ribuan Sekolah",
    subline: "Masalah ini familiar? Kamu tidak sendirian.",
    body: (
      <div className="space-y-6">
        <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar hide-scrollbar-on-mobile">
          {["Absen Manual", "Rekap Folio", "Tugas Kertas", "Data Hilang"].map((tag, i) => (
            <span key={i} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm font-bold whitespace-nowrap border border-gray-200 line-through decoration-red-400 decoration-2">
              {tag}
            </span>
          ))}
        </div>
        <div className="space-y-4">
          <p className="font-bold text-gray-800 text-xl flex items-center gap-2">
            <span className="w-6 h-1 bg-red-500 rounded-full"></span> 
            Dampak Buruknya:
          </p>
          <div className="grid gap-3">
            {[
              "Guru kelelahan mengurus tumpukan administrasi",
              "Siswa yang tertinggal terlambat dideteksi",
              "Orang tua terputus dari perkembangan anak"
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100 transition-all group">
                <div className="bg-red-100 p-2 rounded-lg group-hover:scale-110 group-hover:rotate-12 transition-transform">
                  <FileX className="w-5 h-5 text-red-500" />
                </div>
                <p className="text-gray-700 font-medium sm:text-lg">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 5,
    icon: Globe2,
    headline: "Dunia Bergerak. Kita Kapan?",
    subline: "Negara-negara ini sudah membuktikannya lebih dulu.",
    body: (
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { country: "Finlandia", text: "Literasi naik 29% dalam 4 tahun", flagCode: "fi" },
            { country: "Singapura", text: "91% sekolah paperless", flagCode: "sg" },
            { country: "India", text: "1.5 juta sekolah digital", flagCode: "in" }
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center p-5 rounded-2xl bg-white border border-gray-200 transition-transform duration-300">
              <span className={`fi fi-${item.flagCode} text-4xl mb-3 rounded-sm drop-shadow-sm`} style={{ fontSize: '3rem' }}></span>
              <h4 className="font-black text-gray-900 text-xl mb-2">{item.country}</h4>
              <p className="text-gray-600 font-medium text-sm sm:text-base">{item.text}</p>
            </div>
          ))}
        </div>
        <div className="p-6 rounded-2xl bg-[#789D8E] text-white mt-6 group transition-all">
          <p className="font-medium text-lg sm:text-xl leading-relaxed">
            Indonesia punya <span className="text-[#E9C46A] font-black text-2xl">216.000+</span> sekolah. 
            Potensinya luar biasa — hanya butuh <strong className="underline decoration-[#E9C46A] decoration-4 underline-offset-4">langkah pertama</strong>.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 6,
    icon: CheckCircle2,
    headline: "Bukan Sekadar Beli Gadget",
    subline: "Banyak yang gagal karena salah fokus.",
    body: (
      <div className="space-y-6">
        <p className="text-gray-700 leading-relaxed text-lg sm:text-xl bg-gray-50 p-5 rounded-xl border border-gray-100">
          Digitalisasi sejati bukan soal proyektor canggih. Fokusnya adalah pada <span className="font-black text-[#789D8E] tracking-wider uppercase text-xl inline-block px-1">Sistem Terintegrasi</span>.
        </p>
        <div className="space-y-3">
          <p className="font-bold text-gray-800 text-lg uppercase tracking-wide text-sm mb-4">Pilar Sistem Digital :</p>
          {[
            "Sangat mudah dipakai guru senior sekalipun",
            "Menganalisis data siswa secara otomatis",
            "Menghubungkan Guru, Siswa, dan Orang Tua"
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100 transition-colors group">
              <div className="bg-[#789D8E] p-1.5 rounded-full group-hover:scale-110 transition-transform">
                <Check className="w-5 h-5 text-white" strokeWidth={3} />
              </div>
              <p className="text-gray-800 font-semibold sm:text-lg">{item}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 7,
    icon: GitCommit,
    headline: "Satu Langkah Sudah Cukup",
    subline: "Transformasi besar dimulai dari kebiasaan kecil.",
    body: (
      <div className="space-y-8 max-w-2xl mx-auto py-2">
        <div className="flex items-start justify-between relative before:absolute before:left-0 before:right-0 before:h-1 before:bg-gray-200 before:top-6 before:-translate-y-1/2 before:z-0 px-2 sm:px-6">
          {[
            { label: "Mulai", icon: "1", color: "bg-[#F8FAF8] text-[#789D8E] border-[#789D8E]" },
            { label: "Otomasi", icon: "2", color: "bg-[#789D8E] text-white border-[#789D8E]" },
            { label: "Ekosistem", icon: "3", color: "bg-[#E9C46A] text-white border-[#E9C46A]" }
          ].map((step, i) => (
            <div key={i} className="relative z-10 flex flex-col items-center gap-3">
              <div className={`w-12 h-12 rounded-full border-4 flex items-center justify-center font-black text-xl ${step.color}`}>
                {step.icon}
              </div>
              <span className="font-bold text-gray-700 text-sm sm:text-base uppercase tracking-wider drop-shadow-sm">{step.label}</span>
            </div>
          ))}
        </div>
        
        <div className="p-8 rounded-3xl bg-gray-50 border border-gray-100 text-center group">
          <p className="text-gray-800 leading-relaxed font-medium text-lg sm:text-xl">
            Dari satu proses manual yang tergantikan (misal: <span className="font-bold text-[#789D8E]">Absensi</span>), data mulai hidup. Ekosistem sekolah berubah tanpa terasa berat.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 8,
    icon: Rocket,
    headline: "Amertarva Hadir Untuk Anda",
    subline: "Dirancang khusus mempercepat digitalisasi sekolahmu.",
    body: (
      <div className="space-y-8 flex flex-col items-center text-center">
        <div className="inline-block p-4 rounded-2xl bg-gray-50 border border-gray-100 transition-transform">
          <p className="text-gray-800 font-bold text-lg sm:text-xl flex flex-col gap-1">
            <span>Tingkatkan kehadiran siswa hingga</span>
            <span className="text-4xl font-black text-[#789D8E]">34%</span>
          </p>
        </div>
        
        <p className="text-gray-600 font-medium text-lg sm:text-xl max-w-xl">
          Tidak perlu infrastruktur mahal atau pelatihan IT berbulan-bulan. 
          <br className="hidden sm:block" /> 
          <span className="text-gray-900 font-bold border-b-2 border-[#E9C46A]">Cukup mulai hari ini.</span>
        </p>

        <div className="w-full max-w-md flex flex-col sm:flex-row gap-4 pt-4">
          <div className="flex-1 flex flex-col items-center justify-center gap-1 px-8 py-3 bg-gray-100 text-gray-500 font-bold rounded-2xl border border-gray-200 cursor-not-allowed">
            <span className="font-[600] text-lg tracking-wide uppercase text-orange-600/80">Under Maintenance</span>
            <span className="text-xs font-medium text-gray-400">Website sedang diperbarui</span>
          </div>
          
          <a href="https://instagram.com/amertarva" target="_blank" rel="noopener noreferrer" 
            className="flex-1 inline-flex items-center justify-center px-8 py-4 bg-white border border-gray-200 text-gray-900 font-bold rounded-2xl hover:bg-gray-50 transition-all">
            <span className="text-lg tracking-wide text-gray-700 group-hover:text-gray-900">Hubungi Kami</span>
          </a>
        </div>
      </div>
    ),
  },
];
