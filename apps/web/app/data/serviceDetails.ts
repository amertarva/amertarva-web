export interface ServiceMetric {
  label: string;
  value: string;
  subtext: string;
}

export interface ServiceFeature {
  title: string;
  description: string;
  iconName: string;
}

export interface ServiceProcessStep {
  step: number;
  title: string;
  description: string;
  duration?: string;
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceDetailSchema {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  metrics: ServiceMetric[];
  idealFor: {
    title: string;
    description: string;
  }[];
  features: ServiceFeature[];
  techStack: string[];
  deliverables: string[];
  process: ServiceProcessStep[];
  faq: ServiceFaq[];
  ctaPrompt: string;
}

export const serviceDetailsData: Record<string, Record<string, ServiceDetailSchema>> = {
  id: {
    "landing-page": {
      id: "landing-page",
      badge: "Profil & Personal Branding",
      title: "Landing Page / Website Profil Perusahaan",
      subtitle: "Hadirkan reputasi bisnis profesional dan tarik calon klien secara efektif melalui website performa tinggi.",
      description: "Situs web profil perusahaan yang elegan, cepat, dan responsif di semua perangkat. Dirancang khusus untuk meningkatkan kredibilitas merek, menampilkan portofolio atau produk unggulan, dan mengubah pengunjung menjadi prospek bisnis potensial.",
      category: "Web Development",
      metrics: [
        { label: "Waktu Estimasi", value: "1 - 2 Minggu", subtext: "Proses cepat & terstruktur" },
        { label: "Skor Performa", value: "98+", subtext: "Google Lighthouse Green Score" },
        { label: "SEO Engine", value: "100% Ready", subtext: "Struktur meta & schema otomatis" },
        { label: "Dukungan", value: "30 Hari Free", subtext: "Pemeliharaan awal gratis" }
      ],
      idealFor: [
        { title: "UMKM & Perusahaan Baru", description: "Perusahaan yang memerlukan identitas digital resmi untuk meningkatkan kepercayaan klien dan investor." },
        { title: "Personal Branding & Profesional", description: "Konsultan, dokter, pengacara, atau kreator yang ingin memamerkan karya dan jasa profesionalnya." },
        { title: "Peluncuran Produk / Kampanye", description: "Landing page dedicated untuk promosi event, produk baru, atau lead generation khusus." }
      ],
      features: [
        { title: "Desain UI/UX Kustom Modern", description: "Layout eksklusif disesuaikan dengan warna dan identitas merek Anda, bukan template standar.", iconName: "Layout" },
        { title: "Kecepatan Akses Maksimal", description: "Dioptimalkan menggunakan Nuxt/Vue dengan performa loading instan untuk pengalaman pengguna terbaik.", iconName: "Zap" },
        { title: "Optimasi SEO Lengkap", description: "Meta tag, Open Graph social share, sitemap XML, dan struktur HTML SEO-friendly.", iconName: "Sparkles" },
        { title: "Formulir Kontak & Integrasi WA", description: "Memudahkan pengunjung menghubungi Anda langsung melalui WhatsApp atau form email otomatis.", iconName: "MessageSquare" },
        { title: "Interaktivitas & Animasi Halus", description: "Sentuhan animasi micro-interaction modern yang memberikan kesan futuristik dan mewah.", iconName: "Layers" },
        { title: "100% Responsive All Devices", description: "Tampilan sempurna di layar smartphone, tablet, laptop, hingga monitor 4K.", iconName: "Smartphone" }
      ],
      techStack: ["Nuxt 3 / Vue 3", "TailwindCSS", "TypeScript", "Motion Animation", "Vercel / Cloudflare"],
      deliverables: [
        "Source Code Lengkap & Akses Repository",
        "Pemasangan Domain Kustom & SSL (HTTPS)",
        "Integrasi Google Analytics & Search Console",
        "Halaman Utama, Portofolio, & Kontak",
        "Dokumentasi & Panduan Manajemen Situs"
      ],
      process: [
        { step: 1, title: "Briefing & Pengumpulan Aset", description: "Menganalisis profil perusahaan, target pasar, logo, dan materi konten dari Anda.", duration: "1-2 Hari" },
        { step: 2, title: "Wireframing & Desain UI", description: "Merancang antarmuka visual (Figma) untuk disetujui sebelum coding.", duration: "3-4 Hari" },
        { step: 3, title: "Development & Coding", description: "Membangun website dengan teknologi frontend modern yang responsif.", duration: "4-5 Hari" },
        { step: 4, title: "Pengujian & Peluncuran", description: "Pengujian performa, SEO, dan publikasi ke domain utama Anda.", duration: "1-2 Hari" }
      ],
      faq: [
        { question: "Apakah saya bisa memperbarui isi konten website nantinya?", answer: "Ya, kami menyediakan opsi integrasi Headless CMS atau bantuan pembaruan konten yang sangat fleksibel." },
        { question: "Apakah harga sudah termasuk hosting dan domain?", answer: "Kami menyediakan bantuan setup hosting dan domain, baik menggunakan infrastruktur Anda sendiri atau rekomendasi dari kami." },
        { question: "Berapa lama proses pembuatan landing page?", answer: "Rata-rata pengerjaan landing page profil perusahaan membutuhkan waktu 1 hingga 2 minggu kerja." }
      ],
      ctaPrompt: "Siap meningkatkan kredibilitas bisnis Anda dengan website profil profesional?"
    },

    "ecommerce": {
      id: "ecommerce",
      badge: "Toko Online & Penjualan",
      title: "Website E-commerce & Toko Online",
      subtitle: "Tingkatkan omset penjualan bisnis Anda dengan sistem toko online kustom yang siap menerima pembayaran otomatis.",
      description: "Platform e-commerce independen yang dirancang untuk memberikan pengalaman berbelanja terbaik bagi pelanggan Anda. Dilengkapi katalog produk interaktif, sistem keranjang belanja, kalkulasi ongkos kirim otomatis, serta integrasi payment gateway lokal.",
      category: "Web Development",
      metrics: [
        { label: "Estimasi Pengerjaan", value: "2 - 4 Minggu", subtext: "Skala kecil hingga menengah" },
        { label: "Payment Gateway", value: "Otomatis", subtext: "Midtrans, Xendit, QRIS, Transfer" },
        { label: "Integrasi Logistik", value: "RajaOngkir", subtext: "JNE, J&T, Sicepat, POS, dll" },
        { label: "Keamanan Data", value: "Encrypted", subtext: "SSL & standar keamanan industri" }
      ],
      idealFor: [
        { title: "Brand Fashion & Retail", description: "Bisnis yang ingin lepas dari ketergantungan marketplace dan memiliki database pelanggan sendiri." },
        { title: "Produsen & Distributor", description: "Menampilkan katalog lengkap beserta varian produk, harga grosir, dan fitur pesanan khusus." },
        { title: "UMKM Produk Fisik & Digital", description: "Toko yang ingin memproses pembayaran dan konfirmasi otomatis tanpa perlu rekap manual." }
      ],
      features: [
        { title: "Katalog Produk & Varian", description: "Kelola gambar, stok, ukuran, warna, dan diskon produk dengan mudah.", iconName: "ShoppingBag" },
        { title: "Payment Gateway & QRIS", description: "Mendukung pembayaran via QRIS, GoPay, OVO, Virtual Account, dan Kartu Kredit.", iconName: "CreditCard" },
        { title: "Kalkulasi Ongkir Otomatis", description: "Menghitung ongkos kirim otomatis berdasarkan lokasi tujuan dan berat barang.", iconName: "Truck" },
        { title: "Manajemen Pesanan & Resi", description: "Dashboard untuk melacak status pembayaran, memproses pesanan, dan menginput nomor resi.", iconName: "Package" },
        { title: "Dashboard Analitik Sales", description: "Melihat laporan grafik omset harian, produk terlaris, dan data riwayat pembeli.", iconName: "TrendingUp" },
        { title: "Notifikasi Otomatis WhatsApp/Email", description: "Pelanggan mendapatkan pesan konfirmasi otomatis setelah berhasil melakukan pembayaran.", iconName: "Bell" }
      ],
      techStack: ["Nuxt 3", "Node.js / Express", "PostgreSQL / Prisma", "Payment API", "Redis Cache"],
      deliverables: [
        "Sistem E-Commerce Lengkap Frontend & Backend",
        "Dashboard Admin Manajemen Produk & Pesanan",
        "Integrasi Akun Payment Gateway (Midtrans/Xendit)",
        "Pengujian Transaksi Sandbox & Live Production",
        "Panduan Pengoperasian Store Manager"
      ],
      process: [
        { step: 1, title: "Analisis Produk & Alur Belanja", description: "Mendiskusikan kategori produk, metode pembayaran, dan kurir yang akan digunakan.", duration: "2-3 Hari" },
        { step: 2, title: "Desain Layout Toko & Checkout", description: "Merancang alur katalog dan halaman checkout yang cepat tanpa hambatan.", duration: "4-6 Hari" },
        { step: 3, title: "Integrasi API & Backend", description: "Menghubungkan payment gateway, API ongkir, dan logika inventori produk.", duration: "7-10 Hari" },
        { step: 4, title: "Testing Transaksi & Launch", description: "Uji coba pembayaran nyata dan serah terima situs toko online Anda.", duration: "3-4 Hari" }
      ],
      faq: [
        { question: "Apakah ada potongan transaksi bulanan dari Amertarva?", answer: "Tidak ada. Semua keuntungan penjualan sepenuhnya milik Anda. Biaya transaksi hanya mengikuti potongan resmi dari provider Payment Gateway." },
        { question: "Apakah toko online bisa menerima pembayaran QRIS?", answer: "Sangat bisa. Kami mengintegrasikan QRIS langsung yang bisa di-scan dari aplikasi m-banking atau e-wallet apa pun." },
        { question: "Bisakah dimasukkan produk berjumlah ribuan?", answer: "Bisa, arsitektur database kami dirancang untuk mendukung skalabilitas ribuan produk." }
      ],
      ctaPrompt: "Mulai toko online independen milik Anda sendiri sekarang!"
    },

    "lms": {
      id: "lms",
      badge: "EdTech & Pembelajaran",
      title: "Learning Management System (LMS)",
      subtitle: "Platform e-learning terpadu untuk sekolah, bimbel, akademi, dan lembaga pelatihan digital.",
      description: "Solusi e-learning modern yang memungkinkan lembaga Anda mengelola materi kurikulum, membagikan video modul, menyelenggarakan ujian online dengan penilaian otomatis, dan memantau perkembangan siswa secara berkala.",
      category: "EdTech Platform",
      metrics: [
        { label: "Kapasitas Pengguna", value: "Multi-Tenant", subtext: "Dukungan ribuan siswa aktif" },
        { label: "Tipe Konten", value: "Multi-Format", subtext: "Video, PDF, Kuis, Tugas, Zoom" },
        { label: "Sistem Evaluasi", value: "Auto-Grading", subtext: "Kuis pilihan ganda & statistik" },
        { label: "Sertifikat", value: "Otomatis", subtext: "Generator sertifikat digital" }
      ],
      idealFor: [
        { title: "Institusi Sekolah & Kampus", description: "Mendigitalisasi proses belajar mengajar harian, pembagian tugas, dan ujian sekolah." },
        { title: "Lembaga Kursus & Bimbel", description: "Menjual paket kelas online secara berlangganan atau sekali bayar." },
        { title: "Pelatihan Karyawan Perusahaan", description: "Platform onboarding dan peningkatan keterampilan internal tim korporasi." }
      ],
      features: [
        { title: "Manajemen Kursus & Kurikulum", description: "Susun bab, modul, materi bacaan, dan video secara terstruktur.", iconName: "GraduationCap" },
        { title: "Bank Soal & Ujian Online", description: "Sistem ujian otomatis dengan batas waktu, acak soal, dan analisis nilai instan.", iconName: "FileCheck" },
        { title: "Progres Belajar Siswa", description: "Laporan statistik penyelesaian materi dan persentase kelulusan siswa.", iconName: "BarChart" },
        { title: "Forum Diskusi & Tanya Jawab", description: "Ruang interaksi antara instruktur dan murid untuk membahas topik pelajaran.", iconName: "MessageSquareText" },
        { title: "Sertifikat Digital Otomatis", description: "Sertifikat diterbitkan secara otomatis setelah murid menyelesaikan seluruh modul.", iconName: "Award" },
        { title: "Akses Multi-Role Pengguna", description: "Peran khusus untuk Admin Institusi, Pengajar / Guru, dan Siswa.", iconName: "Users" }
      ],
      techStack: ["Nuxt 3", "Node.js / Bun", "PostgreSQL", "Cloudflare R2 Storage", "Websocket"],
      deliverables: [
        "Platform LMS Terisolasi untuk Institusi Anda",
        "Portal Admin, Portal Pengajar, & Portal Siswa",
        "Integrasi Storage Video Pembelajaran",
        "Template Sertifikat Kustom Institusi",
        "Pelatihan Penggunaan untuk Staf Pengajar"
      ],
      process: [
        { step: 1, title: "Kebutuhan Kurikulum & Peran", description: "Menganalisis skema pembelajaran, kriteria ujian, dan kebutuhan kapasitas siswa.", duration: "3-4 Hari" },
        { step: 2, title: "Arsitektur Platform & UI", description: "Merancang tata letak ruang kelas virtual dan dashboard pemantauan.", duration: "5-7 Hari" },
        { step: 3, title: "Development Fitur LMS", description: "Membangun modul kuis, sistem upload materi, dan generator sertifikat.", duration: "10-14 Hari" },
        { step: 4, title: "Uji Coba & Onboarding", description: "Simulasi kelas dengan pengajar dan peluncuran resmi.", duration: "3-5 Hari" }
      ],
      faq: [
        { question: "Apakah video materi aman dari pengunduhan ilegal?", answer: "Kami menyediakan opsi streaming terlindungi yang mempersulit pengunduhan video secara mentah." },
        { question: "Apakah bisa digunakan untuk ujian sekolah bersamaan?", answer: "Bisa, infrastruktur dapat disesuaikan untuk menangani lonjakan trafik saat sesi ujian berlangsung." },
        { question: "Apakah ada batas jumlah pengajar dan kelas?", answer: "Tidak ada batasan buatan. Anda bebas menambah kelas dan instruktur sebanyak yang dibutuhkan." }
      ],
      ctaPrompt: "Digitalisasikan institusi pendidikan Anda bersama Amertarva LMS!"
    },

    "custom-web-app": {
      id: "custom-web-app",
      badge: "Sistem & Aplikasi Kustom",
      title: "Pengembangan Web Kustom (Custom Web App)",
      subtitle: "Solusi sistem perangkat lunak berbasis web yang dirancang khusus mengikuti workflow unik bisnis Anda.",
      description: "Aplikasi web kompleks untuk otomatisasi proses bisnis, manajemen internal, sistem ERP/CRM, portal pelanggan, atau aplikasi SaaS. Dibangun dengan standar arsitektur modern yang aman, cepat, dan siap berkembang seiring waktu.",
      category: "Software Engineering",
      metrics: [
        { label: "Fleksibilitas", value: "100% Kustom", subtext: "Disesuaikan persis kebutuhan Anda" },
        { label: "Keamanan", value: "Enterprise", subtext: "JWT, Sanitizer, RBAC protection" },
        { label: "Skalabilitas", value: "High-Load", subtext: "Siap menangani pertumbuhan data" },
        { label: "Garansi", value: "90 Hari", subtext: "Penanganan bug gratis pasca-launch" }
      ],
      idealFor: [
        { title: "Operasional Bisnis & Korporasi", description: "Perusahaan yang membutuhkan sistem manajemen internal, inventory, atau HRIS khusus." },
        { title: "Startup Tech & SaaS", description: "Pendiri startup yang ingin membuat MVP (Minimum Viable Product) berkualitas produksi tinggi." },
        { title: "Tugas & Proyek Akademis/Riset", description: "Kebutuhan aplikasi web kompleks untuk riset institusi atau tugas akhir tingkat lanjut." }
      ],
      features: [
        { title: "Arsitektur Modular Scalable", description: "Struktur kode yang rapi sehingga mudah ditambah fitur baru di kemudian hari.", iconName: "Code2" },
        { title: "Role-Based Access Control (RBAC)", description: "Pengaturan hak akses bertingkat untuk Superadmin, Manager, Staff, dan Klien.", iconName: "Shield" },
        { title: "Integrasi API Third-Party", description: "Menghubungkan aplikasi Anda dengan WhatsApp Gateway, Google API, Payment, atau AI.", iconName: "Cpu" },
        { title: "Dashboard & Visualisasi Data", description: "Grafik statistik interaktif dan ekspor laporan ke format PDF / Excel.", iconName: "PieChart" },
        { title: "Workflow & Automatization", description: "Otomatisasi alur kerja manual menjadi beberapa klik yang efisien.", iconName: "Workflow" },
        { title: "Auditing & Security Log", description: "Mencatat setiap riwayat perubahan data dan aktivitas pengguna demi keamanan.", iconName: "Lock" }
      ],
      techStack: ["Nuxt 3 / React", "Node.js / Express / NestJS", "PostgreSQL / MongoDB", "Docker / Redis", "REST / GraphQL"],
      deliverables: [
        "Aplikasi Web Fullstack Sesuai Spesifikasi",
        "Dokumentasi API & Arsitektur Sistem",
        "Skrip Deployment & Konfigurasi Server",
        "Source Code Utama (Git Repository)",
        "Dukungan Pemeliharaan & Bug Fixing"
      ],
      process: [
        { step: 1, title: "System Requirement Gathering", description: "Menganalisis kebutuhan bisnis, skema database, dan spesifikasi fitur secara rinci.", duration: "3-5 Hari" },
        { step: 2, title: "Perancangan UI/UX & Database Schema", description: "Membuat prototype interaktif dan struktur tabel database relational.", duration: "5-7 Hari" },
        { step: 3, title: "Sprint Development", description: "Pengembangan bertahap (agile) dengan pembaruan progress berkala kepada Anda.", duration: "2-4 Minggu" },
        { step: 4, title: "Uji Coba Sistem & Handover", description: "Pengujian beban, keamanan, dan migrasi sistem ke server produksi.", duration: "4-6 Hari" }
      ],
      faq: [
        { question: "Apakah hak cipta kode menjadi milik klien?", answer: "Ya, 100% kepemilikan source code dan hak cipta diserahkan penuh kepada Anda setelah proyek selesai." },
        { question: "Bagaimana jika ada fitur baru yang ingin ditambahkan di tengah jalan?", answer: "Kami menggunakan pendekatan modular, sehingga fitur baru dapat ditambahkan sebagai modul tambahan secara fleksibel." },
        { question: "Apakah disediakan jaminan keamanan data?", answer: "Ya, kami menerapkan enkripsi data, perlakuan sanitisasi input, dan opsi penandatanganan NDA." }
      ],
      ctaPrompt: "Diskusikan spesifikasi sistem kustom yang ingin Anda bangun!"
    },

    "custom-mobile-app": {
      id: "custom-mobile-app",
      badge: "Android & iOS Apps",
      title: "Pengembangan Aplikasi Mobile (Android & iOS)",
      subtitle: "Hadirkan aplikasi seluler berkualitas native di genggaman pengguna Android dan iOS.",
      description: "Aplikasi seluler berkinerja tinggi dengan antarmuka yang intuitif dan responsif. Cocok untuk aplikasi bisnis, layanan on-demand, marketplace mobile, maupun aplikasi operasional lapangan yang terhubung secara realtime.",
      category: "Mobile Engineering",
      metrics: [
        { label: "Platform", value: "Cross-Platform", subtext: "Satu codebase untuk Android & iOS" },
        { label: "Performa", value: "Native Speed", subtext: "Smooth 60 FPS animation" },
        { label: "Fitur Perangkat", value: "Hardware Integrated", subtext: "Kamera, GPS, Push Notification" },
        { label: "Publikasi", value: "Playstore & Appstore", subtext: "Bantuan rilis hingga approved" }
      ],
      idealFor: [
        { title: "Bisnis & Komunitas", description: "Perusahaan yang ingin berinteraksi lebih dekat dengan pelanggan melalui notifikasi genggaman." },
        { title: "Layanan On-Demand & Kurir", description: "Aplikasi berbasis pelacakan lokasi GPS realtime dan tugas transaksi lapangan." },
        { title: "Tugas Akhir & Riset Kuliah", description: "Aplikasi mobile kustom berkualitas tinggi untuk kebutuhan akademis dan riset inovasi." }
      ],
      features: [
        { title: "Satu Codebase untuk Android & iOS", description: "Efisiensi biaya dan waktu pengembangan tanpa mengorbankan performa native.", iconName: "Smartphone" },
        { title: "Push Notification Realtime", description: "Kirim pesan pengingat atau promosi langsung ke layar ponsel pengguna.", iconName: "BellRing" },
        { title: "Integrasi GPS & Peta", description: "Fitur pelacakan lokasi akurat, penentuan rute, dan geofencing.", iconName: "MapPin" },
        { title: "Mode Offline & Local Storage", description: "Aplikasi tetap dapat digunakan saat koneksi internet lemah atau terputus sementara.", iconName: "WifiOff" },
        { title: "Keamanan Autentikasi Biometrik", description: "Login cepat dan aman menggunakan Fingerprint atau Face ID.", iconName: "Fingerprint" },
        { title: "Kamera & Barcode Scanner", description: "Scan QR code, ambil foto dokumen, atau unggah gambar langsung dari aplikasi.", iconName: "Camera" }
      ],
      techStack: ["React Native / Flutter", "TypeScript", "Node.js API", "Firebase / OneSignal", "SQLite / AsyncStore"],
      deliverables: [
        "File APK / AAB (Android) & IPA / TestFlight (iOS)",
        "Bantuan Publikasi ke Google Play Store & Apple App Store",
        "Source Code Mobile Application & Backend API",
        "Dokumentasi Pengujian Perangkat",
        "Dukungan Pemeliharaan Versi Mobile"
      ],
      process: [
        { step: 1, title: "Spesifikasi Mobile & User Flow", description: "Menentukan target perangkat, versi OS minimum, dan alur penggunaan.", duration: "3-4 Hari" },
        { step: 2, title: "Desain Antarmuka Mobile (UI/UX)", description: "Merancang tampilan layar seluler yang ramah jempol (thumb-friendly).", duration: "5-7 Hari" },
        { step: 3, title: "Coding & Integrasi API", description: "Pengembangan fitur mobile dan sinkronisasi data dengan server backend.", duration: "2-3 Minggu" },
        { step: 4, title: "Pengujian Perangkat & Rilis", description: "Uji coba di berbagai jenis HP dan submission ke store.", duration: "4-6 Hari" }
      ],
      faq: [
        { question: "Apakah aplikasi dipublikasikan ke Play Store dan App Store?", answer: "Ya, tim kami akan mendampingi proses submission hingga aplikasi Anda resmi tayang di store." },
        { question: "Bisa berjalan di semua merk smartphone?", answer: "Ya, diuji kompatibilitasnya di berbagai merek seperti Samsung, Xiaomi, iPhone, OPPO, Vivo, dll." },
        { question: "Apakah bisa kirim notifikasi pesan?", answer: "Sangat bisa, kami mengintegrasikan layanan Push Notification bawaan." }
      ],
      ctaPrompt: "Wujudkan aplikasi mobile impian Anda bersama tim Amertarva!"
    },

    "maintenance": {
      id: "maintenance",
      badge: "Dukungan & Pemeliharaan",
      title: "Layanan Pemeliharaan & Pembaruan (Maintenance)",
      subtitle: "Jaga stabilitas, kecepatan, dan keamanan sistem digital Anda tanpa harus memiliki tim IT internal sendiri.",
      description: "Layanan bergaransi untuk perawatan rutin website atau aplikasi web Anda. Pemantauan uptime 24/7, perbaikan bug mendadak, pembaruan versi library keamanan, serta iterasi penambahan fitur minor secara berkala.",
      category: "DevOps & Managed Support",
      metrics: [
        { label: "Waktu Respon", value: "< 2 Jam", subtext: "Penanganan kendala kritis" },
        { label: "Uptime Monitoring", value: "99.9%", subtext: "Pemantauan server berkala" },
        { label: "Backup Data", value: "Rutin", subtext: "Cadangan data otomatis harian/mingguan" },
        { label: "Laporan", value: "Bulanan", subtext: "Rekap performa & aktivitas" }
      ],
      idealFor: [
        { title: "Pemilik Website & Toko Online", description: "Bisnis yang tidak ingin terganggu dengan kendala teknis, error server, atau hack." },
        { title: "Perusahaan Tanpa Tim Dev Dedicated", description: "Menghemat biaya gaji developer internal dengan memanfaatkan tim profesional kami." },
        { title: "Sistem Yang Membutuhkan Update Konten", description: "Bantuan rutin penggantian banner, artikel, dan perbaikan minor tiap bulan." }
      ],
      features: [
        { title: "Pemantauan Server 24/7", description: "Notifikasi otomatis jika ada gangguan koneksi server agar segera ditangani.", iconName: "Activity" },
        { title: "Backup Database & File Otomatis", description: "Cadangan data berkala tersimpan di cloud terpisah untuk keamanan maksimal.", iconName: "Database" },
        { title: "Pembaruan Patch Keamanan", description: "Menjaga framework dan library tetap bebas dari celah keamanan terbaru.", iconName: "ShieldCheck" },
        { title: "Perbaikan Bug & Error", description: "Penanganan kendala teknis yang muncul saat situs diakses oleh pengguna.", iconName: "Wrench" },
        { title: "Optimasi Kecepatan Berkala", description: "Pembersihan cache dan optimasi database secara rutin agar situs tetap ringan.", iconName: "Gauge" },
        { title: "Bantuan Update Konten Minor", description: "Bantuan mengunggah konten baru, pengisian data produk, atau ubah teks.", iconName: "FileEdit" }
      ],
      techStack: ["Linux Server", "Docker", "Uptime Kuma", "Sentry Error Log", "Git Management"],
      deliverables: [
        "Channel Layanan Bantuan (WhatsApp & Email Direct)",
        "Sistem Backup Terjadwal",
        "Laporan Kesehatan Sistem Bulanan",
        "Alokasi Jam Kerja untuk Pembaruan Minor",
        "Jaminan Response Time Penanganan Error"
      ],
      process: [
        { step: 1, title: "Audit & Serah Terima Akses", description: "Memeriksa kondisi awal situs dan mencatat kredensial server.", duration: "1 Hari" },
        { step: 2, title: "Pemasangan Tools Monitoring & Backup", description: "Menyiapkan skrip otomatisasi pemantauan dan backup data.", duration: "1 Hari" },
        { step: 3, title: "Pemeliharaan Aktif Berkala", description: "Monitoring harian, penanganan bug, dan optimasi performa.", duration: "Rutin Berkelanjutan" },
        { step: 4, title: "Pelaporan Bulanan", description: "Menyampaikan laporan status kesehatan situs dan ringkasan aktivitas.", duration: "Setiap Akhir Bulan" }
      ],
      faq: [
        { question: "Apakah layanan maintenance bisa dipesan bulanan?", answer: "Ya, kami menyediakan paket berlangganan bulanan maupun tahunan yang fleksibel." },
        { question: "Bagaimana jika website saya down di luar jam kerja?", answer: "Sistem monitoring kami bekerja 24/7 dan memberikan peringatan instan kepada teknisi piket kami." },
        { question: "Apakah termasuk penambahan fitur besar?", answer: "Fitur minor disertakan dalam alokasi jam rutin. Untuk penambahan modul besar dapat dibuatkan scope khusus." }
      ],
      ctaPrompt: "Pastikan sistem digital Anda selalu aman dan berkinerja tinggi bersama kami!"
    }
  },

  en: {
    "landing-page": {
      id: "landing-page",
      badge: "Profile & Personal Branding",
      title: "Landing Page / Corporate Website",
      subtitle: "Establish a professional corporate presence and effectively convert prospects with a high-performance website.",
      description: "An elegant, fast, and fully responsive corporate website tailored to boost brand credibility, showcase your portfolio or core products, and convert visitors into potential business leads.",
      category: "Web Development",
      metrics: [
        { label: "Delivery Time", value: "1 - 2 Weeks", subtext: "Structured & fast execution" },
        { label: "Performance Score", value: "98+", subtext: "Google Lighthouse Green Score" },
        { label: "SEO Engine", value: "100% Ready", subtext: "Automatic meta & schema structure" },
        { label: "Initial Support", value: "30 Days Free", subtext: "Complimentary initial maintenance" }
      ],
      idealFor: [
        { title: "SMEs & Startups", description: "Companies requiring an official digital identity to gain client and investor trust." },
        { title: "Personal Branding & Professionals", description: "Consultants, doctors, lawyers, or creators aiming to display their work and services." },
        { title: "Product Launch & Campaigns", description: "Dedicated landing pages for event promotions, new products, or lead generation." }
      ],
      features: [
        { title: "Modern Custom UI/UX Design", description: "Exclusive layout tailored to your brand identity rather than generic templates.", iconName: "Layout" },
        { title: "Maximum Speed Performance", description: "Optimized with Nuxt/Vue delivering instant load times for superior user experience.", iconName: "Zap" },
        { title: "Complete SEO Optimization", description: "Meta tags, Open Graph social share, XML sitemaps, and search-friendly HTML.", iconName: "Sparkles" },
        { title: "Contact Form & WhatsApp Integration", description: "Allow visitors to reach you instantly via WhatsApp or automated email forms.", iconName: "MessageSquare" },
        { title: "Smooth Micro-Animations", description: "Futuristic and polished micro-interactions that elevate visual appeal.", iconName: "Layers" },
        { title: "100% Responsive Across Devices", description: "Flawless viewing on smartphones, tablets, laptops, and 4K displays.", iconName: "Smartphone" }
      ],
      techStack: ["Nuxt 3 / Vue 3", "TailwindCSS", "TypeScript", "Motion Animation", "Vercel / Cloudflare"],
      deliverables: [
        "Full Source Code & Repository Access",
        "Custom Domain Setup & SSL (HTTPS)",
        "Google Analytics & Search Console Integration",
        "Homepage, Portfolio & Contact Sections",
        "Site Management Documentation & Guide"
      ],
      process: [
        { step: 1, title: "Briefing & Asset Collection", description: "Analyzing brand identity, target audience, logo, and content materials.", duration: "1-2 Days" },
        { step: 2, title: "Wireframing & UI Design", description: "Designing visual UI layouts in Figma for approval before coding.", duration: "3-4 Days" },
        { step: 3, title: "Development & Coding", description: "Building the website with modern responsive frontend frameworks.", duration: "4-5 Days" },
        { step: 4, title: "Testing & Deployment", description: "Performance testing, SEO verification, and publishing to main domain.", duration: "1-2 Days" }
      ],
      faq: [
        { question: "Can I update the website content myself later?", answer: "Yes, we offer Headless CMS integration or flexible content update support packages." },
        { question: "Does the price include hosting and domain?", answer: "We assist with domain and hosting setup on your own accounts or our recommended providers." },
        { question: "How long does it take to complete a landing page?", answer: "Average delivery time for a corporate landing page is 1 to 2 business weeks." }
      ],
      ctaPrompt: "Ready to elevate your business credibility with a professional profile website?"
    },

    "ecommerce": {
      id: "ecommerce",
      badge: "Online Store & Sales",
      title: "E-commerce Website & Online Store",
      subtitle: "Boost your sales revenue with a custom online store ready to accept automatic payments.",
      description: "An independent e-commerce platform designed to offer the best shopping experience for your customers. Features interactive product catalogs, shopping cart, automatic shipping fee calculation, and local payment gateway integration.",
      category: "Web Development",
      metrics: [
        { label: "Estimated Delivery", value: "2 - 4 Weeks", subtext: "Small to medium-scale store" },
        { label: "Payment Gateway", value: "Automated", subtext: "Credit Card, QRIS, Bank Transfer" },
        { label: "Logistics Integration", value: "Auto Shipping", subtext: "Realtime courier rates" },
        { label: "Data Security", value: "Encrypted", subtext: "SSL & industry security standards" }
      ],
      idealFor: [
        { title: "Retail & Fashion Brands", description: "Businesses wanting to reduce marketplace dependency and own their customer data." },
        { title: "Manufacturers & Wholesalers", description: "Displaying complete product catalogs, variants, wholesale pricing, and custom order options." },
        { title: "SMEs Selling Physical/Digital Products", description: "Stores needing automated payment processing without manual verification." }
      ],
      features: [
        { title: "Product Catalog & Variants", description: "Manage images, inventory, sizes, colors, and discount codes effortlessly.", iconName: "ShoppingBag" },
        { title: "Payment Gateway & QRIS", description: "Supports instant payment via QRIS, e-wallets, Virtual Accounts, and Cards.", iconName: "CreditCard" },
        { title: "Automated Shipping Calculation", description: "Realtime courier rates calculation based on customer address and product weight.", iconName: "Truck" },
        { title: "Order & Tracking Management", description: "Admin dashboard to track payment status, fulfill orders, and enter tracking numbers.", iconName: "Package" },
        { title: "Sales Analytics Dashboard", description: "View daily revenue charts, top-selling items, and buyer history reports.", iconName: "TrendingUp" },
        { title: "Automated WhatsApp / Email Alerts", description: "Customers receive instant order confirmation messages after successful checkout.", iconName: "Bell" }
      ],
      techStack: ["Nuxt 3", "Node.js / Express", "PostgreSQL / Prisma", "Payment API", "Redis Cache"],
      deliverables: [
        "Complete Frontend & Backend E-Commerce System",
        "Admin Dashboard for Products & Order Management",
        "Payment Gateway Account Integration",
        "Sandbox & Live Transaction Testing",
        "Store Manager Operations Manual"
      ],
      process: [
        { step: 1, title: "Product & Workflow Analysis", description: "Discussing product categories, payment channels, and shipping partners.", duration: "2-3 Days" },
        { step: 2, title: "Store Layout & Checkout Design", description: "Designing a seamless catalog browsing and checkout experience.", duration: "4-6 Days" },
        { step: 3, title: "API Integration & Backend", description: "Connecting payment gateway APIs, shipping rates, and inventory logic.", duration: "7-10 Days" },
        { step: 4, title: "Transaction Testing & Launch", description: "Testing live payments and handing over your active online store.", duration: "3-4 Days" }
      ],
      faq: [
        { question: "Are there any monthly transaction commissions from Amertarva?", answer: "No. 100% of your sales revenue belongs to you. Only official provider gateway fees apply." },
        { question: "Can the store accept instant QRIS payments?", answer: "Yes! We integrate direct QRIS payments compatible with all m-banking and e-wallet apps." },
        { question: "Can it handle thousands of products?", answer: "Yes, our database architecture is built to support thousands of inventory items effortlessly." }
      ],
      ctaPrompt: "Launch your independent online store with Amertarva today!"
    },

    "lms": {
      id: "lms",
      badge: "EdTech & Learning",
      title: "Learning Management System (LMS)",
      subtitle: "A unified e-learning platform for schools, academies, and digital training institutions.",
      description: "A modern e-learning solution allowing your institution to manage curriculum materials, distribute video modules, conduct timed online exams with auto-grading, and monitor student growth.",
      category: "EdTech Platform",
      metrics: [
        { label: "User Capacity", value: "Multi-Tenant", subtext: "Supports thousands of active students" },
        { label: "Content Types", value: "Multi-Format", subtext: "Video, PDF, Quizzes, Assignments" },
        { label: "Evaluation", value: "Auto-Grading", subtext: "Automated scoring & analytics" },
        { label: "Certificates", value: "Automated", subtext: "Digital certificate generator" }
      ],
      idealFor: [
        { title: "Schools & Higher Education", description: "Digitalizing daily teaching workflows, assignments, and school exams." },
        { title: "Training Academies & Course Providers", description: "Selling online course packages on a subscription or one-off basis." },
        { title: "Corporate Employee Training", description: "Internal onboarding and skill development platform for enterprise teams." }
      ],
      features: [
        { title: "Course & Curriculum Management", description: "Structure chapters, modules, reading materials, and video lessons easily.", iconName: "GraduationCap" },
        { title: "Question Bank & Online Exams", description: "Automated testing system with time limits, randomized questions, and instant grading.", iconName: "FileCheck" },
        { title: "Student Progress Tracking", description: "Detailed analytics reporting student module completion and pass rates.", iconName: "BarChart" },
        { title: "Discussion Forums & Q&A", description: "Interactive space for instructors and learners to discuss course topics.", iconName: "MessageSquareText" },
        { title: "Automated Digital Certificates", description: "Certificates issued automatically upon complete module completion.", iconName: "Award" },
        { title: "Multi-Role Access Control", description: "Dedicated permission roles for Institution Admin, Instructors, and Students.", iconName: "Users" }
      ],
      techStack: ["Nuxt 3", "Node.js / Bun", "PostgreSQL", "Cloudflare R2 Storage", "Websocket"],
      deliverables: [
        "Isolated LMS Platform tailored for your institution",
        "Admin Portal, Instructor Portal & Student Portal",
        "Video Streaming Storage Integration",
        "Custom Institution Certificate Templates",
        "Staff Training & Onboarding Session"
      ],
      process: [
        { step: 1, title: "Curriculum & Role Gathering", description: "Analyzing learning workflows, exam criteria, and user capacity requirements.", duration: "3-4 Days" },
        { step: 2, title: "Platform Architecture & UI", description: "Designing virtual classroom layouts and monitoring dashboards.", duration: "5-7 Days" },
        { step: 3, title: "LMS Feature Development", description: "Building quiz modules, content uploaders, and certificate engines.", duration: "10-14 Days" },
        { step: 4, title: "Testing & Instructor Onboarding", description: "Simulating live classes with instructors and official launch.", duration: "3-5 Days" }
      ],
      faq: [
        { question: "Are video lessons protected from unauthorized downloads?", answer: "We implement protected streaming options to minimize raw video downloads." },
        { question: "Can it handle concurrent school exams?", answer: "Yes, server infrastructure is calibrated to manage high traffic during simultaneous exam sessions." },
        { question: "Is there a limit on instructors or classes?", answer: "No artificial limits. You can add as many classes and instructors as needed." }
      ],
      ctaPrompt: "Digitalize your educational institution with Amertarva LMS!"
    },

    "custom-web-app": {
      id: "custom-web-app",
      badge: "Custom Systems & Apps",
      title: "Custom Web Application Development",
      subtitle: "Bespoke web software solutions engineered specifically around your business's unique workflow.",
      description: "Complex web applications for business automation, internal management, ERP/CRM portals, or SaaS products. Built with robust, secure, and scalable modern architecture ready to evolve as your business grows.",
      category: "Software Engineering",
      metrics: [
        { label: "Flexibility", value: "100% Custom", subtext: "Tailored exactly to specifications" },
        { label: "Security Level", value: "Enterprise", subtext: "JWT, Sanitizers, RBAC protection" },
        { label: "Scalability", value: "High-Load", subtext: "Engineered for massive data volume" },
        { label: "Warranty", value: "90 Days", subtext: "Free post-launch bug fixing" }
      ],
      idealFor: [
        { title: "Corporate Operations", description: "Enterprises needing internal management tools, inventory platforms, or custom HRIS." },
        { title: "Tech Startups & SaaS Founders", description: "Entrepreneurs seeking high production-grade Minimum Viable Products (MVPs)." },
        { title: "Academic Research & Complex Projects", description: "Advanced web software for institutional research or high-level coursework." }
      ],
      features: [
        { title: "Scalable Modular Architecture", description: "Clean code structure facilitating easy future feature expansions.", iconName: "Code2" },
        { title: "Role-Based Access Control (RBAC)", description: "Tiered access permissions for Superadmins, Managers, Staff, and Clients.", iconName: "Shield" },
        { title: "Third-Party API Integration", description: "Connect your software with WhatsApp Gateways, Google APIs, Payment, or AI.", iconName: "Cpu" },
        { title: "Dashboards & Data Visualization", description: "Interactive statistical charts with PDF/Excel report export features.", iconName: "PieChart" },
        { title: "Workflow Automation", description: "Transforming manual processes into efficient automated clicks.", iconName: "Workflow" },
        { title: "Security Logs & Audit Trails", description: "Recording data change history and user activity logs for security compliance.", iconName: "Lock" }
      ],
      techStack: ["Nuxt 3 / React", "Node.js / Express / NestJS", "PostgreSQL / MongoDB", "Docker / Redis", "REST / GraphQL"],
      deliverables: [
        "Fullstack Web Application per Specifications",
        "API Documentation & Architecture Schemas",
        "Deployment Scripts & Server Configuration",
        "Master Source Code Repository",
        "Post-Launch Maintenance Support"
      ],
      process: [
        { step: 1, title: "System Requirement Gathering", description: "Analyzing detailed business needs, database schemas, and specifications.", duration: "3-5 Days" },
        { step: 2, title: "UI/UX Prototyping & Database Schema", description: "Creating interactive prototypes and relational database designs.", duration: "5-7 Days" },
        { step: 3, title: "Agile Development Sprints", description: "Iterative development with regular progress updates and reviews.", duration: "2-4 Weeks" },
        { step: 4, title: "System Testing & Handover", description: "Load testing, security audits, and production server migration.", duration: "4-6 Days" }
      ],
      faq: [
        { question: "Who owns the code copyright?", answer: "You hold 100% full ownership of the source code and copyright upon project completion." },
        { question: "What if we want to add new features later on?", answer: "Our modular approach allows seamless addition of new modules whenever needed." },
        { question: "Is data security guaranteed?", answer: "Yes, we implement data encryption, input sanitization, and offer formal NDA agreements." }
      ],
      ctaPrompt: "Let's discuss the custom web system you wish to build!"
    },

    "custom-mobile-app": {
      id: "custom-mobile-app",
      badge: "Android & iOS Apps",
      title: "Custom Mobile Application (Android & iOS)",
      subtitle: "Deliver native-quality mobile experiences right into the hands of Android and iOS users.",
      description: "High-performance mobile applications with intuitive, responsive interfaces. Perfect for business utility, on-demand services, mobile marketplaces, or field operation apps connected in realtime.",
      category: "Mobile Engineering",
      metrics: [
        { label: "Platform", value: "Cross-Platform", subtext: "Single codebase for Android & iOS" },
        { label: "Performance", value: "Native Speed", subtext: "Smooth 60 FPS UI performance" },
        { label: "Hardware Features", value: "Integrated", subtext: "Camera, GPS, Push Notifications" },
        { label: "Publishing", value: "Stores Ready", subtext: "Release assistance until approved" }
      ],
      idealFor: [
        { title: "Businesses & Communities", description: "Companies aiming to engage users closely via push notifications." },
        { title: "On-Demand & Logistics Services", description: "Apps leveraging realtime GPS location tracking and mobile field workflows." },
        { title: "Academic & Coursework Projects", description: "High-quality custom mobile apps for institutional research and student final projects." }
      ],
      features: [
        { title: "Single Codebase for Android & iOS", description: "Cost and time efficiency without compromising native speed.", iconName: "Smartphone" },
        { title: "Realtime Push Notifications", description: "Send promotional alerts or reminders directly to users' lock screens.", iconName: "BellRing" },
        { title: "GPS & Map Integration", description: "Accurate location tracking, route mapping, and geofencing capabilities.", iconName: "MapPin" },
        { title: "Offline Mode & Local Storage", description: "App functions seamlessly even during weak or temporary offline states.", iconName: "WifiOff" },
        { title: "Biometric Authentication Security", description: "Quick and secure login utilizing Fingerprint or Face ID.", iconName: "Fingerprint" },
        { title: "Camera & Barcode Scanning", description: "Scan QR codes, capture document images, or upload media instantly.", iconName: "Camera" }
      ],
      techStack: ["React Native / Flutter", "TypeScript", "Node.js API", "Firebase / OneSignal", "SQLite / AsyncStore"],
      deliverables: [
        "APK / AAB Build Files (Android) & IPA / TestFlight (iOS)",
        "Assistance with Google Play Store & Apple App Store Publishing",
        "Mobile App & Backend API Source Code",
        "Device Compatibility Test Documentation",
        "App Store Maintenance Support"
      ],
      process: [
        { step: 1, title: "Mobile Spec & User Flow", description: "Defining target devices, OS versions, and core user flows.", duration: "3-4 Days" },
        { step: 2, title: "Thumb-Friendly UI/UX Design", description: "Crafting mobile layouts optimized for easy one-handed navigation.", duration: "5-7 Days" },
        { step: 3, title: "Coding & API Integration", description: "Developing mobile features and synchronizing data with backend servers.", duration: "2-3 Weeks" },
        { step: 4, title: "Device Testing & App Store Release", description: "Testing across multiple device models and submitting to store review.", duration: "4-6 Days" }
      ],
      faq: [
        { question: "Will the app be published on Play Store and App Store?", answer: "Yes, our team will assist throughout the submission process until approved live." },
        { question: "Is it compatible across all smartphone brands?", answer: "Yes, tested across Samsung, Apple, Xiaomi, OPPO, Vivo, and more." },
        { question: "Can we send push notifications to users?", answer: "Absolutely, we integrate native Push Notification services into the app." }
      ],
      ctaPrompt: "Bring your dream mobile application to life with Amertarva!"
    },

    "maintenance": {
      id: "maintenance",
      badge: "Support & Managed Care",
      title: "Maintenance & System Update Services",
      subtitle: "Keep your digital system secure, fast, and stable without maintaining an in-house IT team.",
      description: "Guaranteed upkeep and support for your existing web apps. 24/7 uptime monitoring, rapid bug fixes, security patch updates, and ongoing minor feature iterations.",
      category: "DevOps & Managed Support",
      metrics: [
        { label: "Response Time", value: "< 2 Hours", subtext: "Critical issue response SLA" },
        { label: "Uptime Monitoring", value: "99.9%", subtext: "Continuous server monitoring" },
        { label: "Data Backups", value: "Automated", subtext: "Daily / weekly cloud backups" },
        { label: "Reporting", value: "Monthly", subtext: "Performance & activity reports" }
      ],
      idealFor: [
        { title: "Website & E-Commerce Owners", description: "Businesses wanting hassle-free operations without server downtime or security threats." },
        { title: "Companies Without Dedicated Devs", description: "Save internal hiring costs by leveraging our team of senior engineers." },
        { title: "Sites Needing Frequent Updates", description: "Regular help updating banners, blog content, and minor layout tweaks." }
      ],
      features: [
        { title: "24/7 Server Monitoring", description: "Automated alerts for server interruptions for immediate technician response.", iconName: "Activity" },
        { title: "Automated Cloud Backups", description: "Routine encrypted database backups stored in isolated cloud storage.", iconName: "Database" },
        { title: "Security Patch Management", description: "Keeping frameworks and dependencies updated against security vulnerabilities.", iconName: "ShieldCheck" },
        { title: "Bug Fixing & Error Resolution", description: "Resolving unexpected technical issues encountered by users.", iconName: "Wrench" },
        { title: "Routine Performance Tuning", description: "Cache clearing and database optimization to maintain peak site speed.", iconName: "Gauge" },
        { title: "Minor Content & Design Updates", description: "Assistance publishing new content, product uploads, or copy updates.", iconName: "FileEdit" }
      ],
      techStack: ["Linux Server", "Docker", "Uptime Kuma", "Sentry Error Log", "Git Management"],
      deliverables: [
        "Dedicated Direct Help Desk (WhatsApp & Email)",
        "Automated Cloud Backup System",
        "Monthly Health & Performance Reports",
        "Allocated Working Hours for Minor Updates",
        "SLA Response Guarantee for Urgent Issues"
      ],
      process: [
        { step: 1, title: "Initial Audit & Handover", description: "Auditing current site health and securing server credentials.", duration: "1 Day" },
        { step: 2, title: "Monitoring & Backup Setup", description: "Installing automated monitoring scripts and cloud backup triggers.", duration: "1 Day" },
        { step: 3, title: "Active Maintenance Support", description: "Daily monitoring, issue resolution, and performance tuning.", duration: "Ongoing Support" },
        { step: 4, title: "Monthly Performance Report", description: "Delivering system health summaries and activity logs.", duration: "End of Month" }
      ],
      faq: [
        { question: "Is maintenance available on a monthly subscription basis?", answer: "Yes, we offer flexible monthly and annual support packages." },
        { question: "What happens if the website encounters issues after hours?", answer: "Our 24/7 automated monitoring triggers instant alerts to our engineers on call." },
        { question: "Does maintenance cover major new feature developments?", answer: "Minor tweaks are covered in regular hours; major feature additions can be scoped separately." }
      ],
      ctaPrompt: "Ensure your digital systems remain secure and fast with Amertarva support!"
    }
  }
};
