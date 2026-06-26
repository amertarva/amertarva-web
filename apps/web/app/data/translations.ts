export interface TranslationSchema {
  nav: {
    services: string;
    about: string;
    contact: string;
    getInTouch: string;
    platforms: string;
  };
  hero: {
    badge: string;
    titleStart: string;
    titleHighlight: string;
    titleEnd: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
    stats: {
      projects: string;
      clients: string;
      experience: string;
    };
  };
  services: {
    badge: string;
    titleStart: string;
    titleHighlight: string;
    description: string;
    webDev: {
      title: string;
      description: string;
    };
    mobileApps: {
      title: string;
      description: string;
    };
    uiux: {
      title: string;
      description: string;
    };
    devops: {
      title: string;
      description: string;
    };
    learnMore: string;
  };
  process: {
    badge: string;
    titleStart: string;
    titleHighlight: string;
    description: string;
    steps: {
      step: number;
      title: string;
      description: string;
    }[];
  };
  about: {
    badge: string;
    titleStart: string;
    titleHighlight: string;
    description: string;
    values: {
      title: string;
      description: string;
    }[];
    status: {
      build: string;
      deployed: string;
    };
  };
  portal: {
    title: string;
    description: string;
    services: {
      id: string;
      title: string;
      description: string;
    }[];
  };
  work: {
    title: string;
    description: string;
    comingSoon: string;
    items: {
      id: string;
      category: string;
      title: string;
      description: string;
      image: string;
      isPlaceholder: boolean;
    }[];
  };
  cta: {
    badge: string;
    titleStart: string;
    titleHighlight: string;
    description: string;
    whatsapp: string;
  };
  ecosystem: {
    badge: string;
    titleStart: string;
    titleHighlight: string;
    description: string;
    office: {
      tag: string;
      title: string;
      description: string;
      features: string[];
      cta: string;
    };
    learning: {
      tag: string;
      title: string;
      description: string;
      features: string[];
      cta: string;
    };
  };
  footer: {
    tagline: string;
    columns: {
      services: string;
      company: string;
      connect: string;
    };
    links: {
      services: {
        webDev: string;
        mobileApps: string;
        uiux: string;
        devops: string;
      };
      company: {
        about: string;
        work: string;
        blog: string;
        contact: string;
      };
    };
    rights: string;
  };
}

export const translations: Record<string, TranslationSchema> = {
  id: {
    nav: {
      services: "Layanan",
      about: "Tentang Kami",
      contact: "Kontak",
      getInTouch: "Hubungi Kami",
      platforms: "Platform",
    },
    hero: {
      badge: "Agensi Teknologi",
      titleStart: "Kami membangun",
      titleHighlight: "produk digital",
      titleEnd: "yang berdampak.",
      description:
        "Amertarva adalah agensi teknologi yang merancang aplikasi web modern, pengalaman seluler, dan platform terukur — dari ide hingga produksi, dengan presisi.",
      ctaPrimary: "Mulai Proyek Anda",
      ctaSecondary: "Lihat Karya Kami",
      stats: {
        projects: "Proyek Selesai",
        clients: "Klien Puas",
        experience: "Tahun Pengalaman",
      },
    },
    services: {
      badge: "Layanan Kami",
      titleStart: "Layanan yang dibuat untuk",
      titleHighlight: "pertumbuhan",
      description:
        "Kami bermitra dengan startup dan perusahaan untuk menghadirkan solusi digital ujung ke ujung — dari konsep hingga penerapan dan seterusnya.",
      webDev: {
        title: "Pengembangan Web",
        description:
          "Aplikasi web kustom yang dibangun dengan framework modern seperti Nuxt, Next.js, dan Vue — cepat, aksesibel, dan siap produksi.",
      },
      mobileApps: {
        title: "Aplikasi Seluler",
        description:
          "Pengalaman seluler berkualitas native menggunakan React Native dan Flutter — pengembangan lintas platform tanpa kompromi.",
      },
      uiux: {
        title: "Desain UI/UX",
        description:
          "Sistem desain dan antarmuka yang berpusat pada pengguna — dari wireframe hingga prototipe yang dipoles, dibuat untuk kejelasan dan kenyamanan.",
      },
      devops: {
        title: "Cloud & DevOps",
        description:
          "Infrastruktur terukur di AWS, GCP, atau Azure — jalur CI/CD, kontainerisasi, dan pemantauan yang berjalan lancar.",
      },
      learnMore: "Pelajari selengkapnya",
    },
    process: {
      badge: "Cara Kerja",
      titleStart: "Proses kerja",
      titleHighlight: "yang terstruktur",
      description:
        "Dari kickoff hingga peluncuran, setiap langkah dirancang agar hasilnya sesuai ekspektasi dan berjalan lancar.",
      steps: [
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
      ],
    },
    about: {
      badge: "Mengapa Amertarva",
      titleStart: "Tentang",
      titleHighlight: "Amertarva",
      description:
        'Kami adalah tim teknologi yang ramping dan fokus, berdedikasi untuk menciptakan produk digital berkualitas tinggi bagi perusahaan berkembang dan lembaga pendidikan. Mulai dari website profil perusahaan, platform e-commerce, hingga pengembangan sistem kustom, kami berkomitmen pada arsitektur teknologi modern dan proses komunikasi yang transparan untuk memastikan setiap proyek dikirimkan tepat waktu dan berjalan stabil.\n\nKami percaya bahwa teknologi yang baik tidak hanya sekadar "bisa digunakan", tetapi harus benar-benar menciptakan nilai bagi bisnis — dan inilah filosofi di balik nama Amertarva.',
      values: [
        {
          title: "Profesional & Andal",
          description:
            "Menggunakan tumpukan teknologi yang terbukti, standar kode yang rapi, dan dokumentasi yang lengkap.",
        },
        {
          title: "Komunikasi Transparan",
          description:
            "Penawaran harga yang jelas dan sinkronisasi kemajuan di seluruh proses proyek tanpa biaya tersembunyi.",
        },
        {
          title: "Pengiriman Tepat Waktu",
          description:
            "Proses pengembangan dan target waktu yang jelas untuk menghindari penundaan yang tidak terbatas.",
        },
        {
          title: "Dukungan Berkelanjutan",
          description:
            "Menyediakan layanan pemeliharaan dan pembaruan setelah peluncuran situs, bukan sekadar selesai dan pergi.",
        },
      ],
      status: {
        build: "Status Build",
        deployed: "Berhasil Dideploy",
      },
    },
    portal: {
      title: "Layanan yang Kami Sediakan",
      description:
        "Dari pengembangan website hingga pemeliharaan sistem, Amertarva menyediakan solusi digital lengkap untuk bisnis kecil, menengah, dan lembaga pendidikan.",
      services: [
        {
          id: "landing-page",
          title: "Landing Page / Website Profil Perusahaan",
          description:
            "Website satu halaman untuk menampilkan bisnis Anda, cocok untuk UMKM atau personal branding yang baru memulai.",
        },
        {
          id: "ecommerce",
          title: "Website E-commerce",
          description:
            "Toko online skala kecil hingga menengah dengan katalog produk dan integrasi pembayaran dasar.",
        },
        {
          id: "lms",
          title: "Learning Management System (LMS)",
          description:
            "Platform pembelajaran digital untuk lembaga kursus atau lembaga pendidikan.",
        },
        {
          id: "custom-web-app",
          title: "Aplikasi Web Kustom",
          description:
            "Dikembangkan sesuai kebutuhan spesifik Anda, seperti sistem reservasi, dashboard internal, atau alat verifikasi data.",
        },
        {
          id: "maintenance",
          title: "Layanan Pemeliharaan & Pembaruan",
          description:
            "Layanan berkelanjutan pasca-peluncuran, mencakup pembaruan konten, perbaikan bug, dan iterasi fitur minor.",
        },
      ],
    },
    work: {
      title: "Karya Kami",
      description:
        "Kami berdedikasi untuk memberikan produk digital berkualitas tinggi bagi klien kami. Berikut adalah beberapa portofolio kami.",
      comingSoon: "Segera Hadir",
      items: [
        {
          id: "placeholder-1",
          category: "Website Profil Perusahaan",
          title: "Detail Proyek Menyusul",
          description:
            "Deskripsi proyek sedang disiapkan — akan diperbarui setelah proyek resmi dirilis.",
          image: "/images/work/placeholder-1.jpg",
          isPlaceholder: true,
        },
        {
          id: "placeholder-2",
          category: "Sistem E-commerce",
          title: "Detail Proyek Menyusul",
          description:
            "Deskripsi proyek sedang disiapkan — akan diperbarui setelah proyek resmi dirilis.",
          image: "/images/work/placeholder-2.jpg",
          isPlaceholder: true,
        },
        {
          id: "placeholder-3",
          category: "Platform Teknologi Pendidikan",
          title: "Detail Proyek Menyusul",
          description:
            "Deskripsi proyek sedang disiapkan — akan diperbarui setelah proyek resmi dirilis.",
          image: "/images/work/placeholder-3.jpg",
          isPlaceholder: true,
        },
      ],
    },
    cta: {
      badge: "Mari Berdiskusi",
      titleStart: "Siap membangun",
      titleHighlight: "sesuatu yang luar biasa",
      description:
        "Baik Anda memiliki spesifikasi detail atau baru sekadar ide kasar, kami akan senang mendengarnya dari Anda. Mari cari tahu bagaimana kami bisa mewujudkan visi Anda.",
      whatsapp: "Chat di WhatsApp",
    },
    ecosystem: {
      badge: "Ekosistem Produk",
      titleStart: "Dua Solusi,",
      titleHighlight: "Satu Ekosistem",
      description:
        "Platform kami dirancang khusus untuk dua kebutuhan utama — bisnis yang ingin hadir secara digital, dan institusi pendidikan yang siap belajar tanpa batas ruang.",
      office: {
        tag: "Untuk Bisnis",
        title: "Amertarva Office",
        description:
          "Solusi digital lengkap untuk bisnis dan korporat — dari company profile hingga sistem operasional.",
        features: [
          "Landing page & company profile",
          "Website corporate & profil bisnis",
          "Sistem point of sale (POS)",
          "Custom web app untuk operasional",
        ],
        cta: "Jelajahi",
      },
      learning: {
        tag: "Untuk Pendidikan",
        title: "Amertarva Learning",
        description:
          "Platform e-learning modern untuk institusi pendidikan yang ingin mendigitalisasi proses pembelajaran.",
        features: [
          "Manajemen materi & kurikulum",
          "Kelas virtual & tugas online",
          "Monitoring progres siswa",
          "Multi-tenant per institusi",
        ],
        cta: "Jelajahi",
      },
    },
    footer: {
      tagline:
        "Agensi teknologi yang merancang produk digital yang berdampak. Dari ide hingga produksi, dengan presisi dan kepedulian.",
      columns: {
        services: "Layanan",
        company: "Perusahaan",
        connect: "Kontak",
      },
      links: {
        services: {
          webDev: "Pengembangan Web",
          mobileApps: "Aplikasi Seluler",
          uiux: "Desain UI/UX",
          devops: "Cloud & DevOps",
        },
        company: {
          about: "Tentang Kami",
          work: "Karya Kami",
          blog: "Blog",
          contact: "Kontak",
        },
      },
      rights: "Semua hak cipta dilindungi undang-undang.",
    },
  },
  en: {
    nav: {
      services: "Services",
      about: "About Us",
      contact: "Contact",
      getInTouch: "Get in Touch",
      platforms: "Platforms",
    },
    hero: {
      badge: "Tech Agency",
      titleStart: "We build",
      titleHighlight: "digital products",
      titleEnd: "that matter.",
      description:
        "Amertarva is a tech agency crafting modern web apps, mobile experiences, and scalable platforms — from idea to production, with precision.",
      ctaPrimary: "Start Your Project",
      ctaSecondary: "See Our Work",
      stats: {
        projects: "Projects Delivered",
        clients: "Happy Clients",
        experience: "Years Experience",
      },
    },
    services: {
      badge: "What We Do",
      titleStart: "Services built for",
      titleHighlight: "growth",
      description:
        "We partner with startups and enterprises to deliver end-to-end digital solutions — from concept through deployment and beyond.",
      webDev: {
        title: "Web Development",
        description:
          "Custom web applications built with modern frameworks like Nuxt, Next.js, and Vue — fast, accessible, and production-ready.",
      },
      mobileApps: {
        title: "Mobile Apps",
        description:
          "Native-quality mobile experiences using React Native and Flutter — cross-platform development that doesn't compromise.",
      },
      uiux: {
        title: "UI/UX Design",
        description:
          "User-centered design systems and interfaces — from wireframes to polished prototypes, built for clarity and delight.",
      },
      devops: {
        title: "Cloud & DevOps",
        description:
          "Scalable infrastructure on AWS, GCP, or Azure — CI/CD pipelines, containerization, and monitoring that just works.",
      },
      learnMore: "Learn more",
    },
    process: {
      badge: "Our Process",
      titleStart: "Structured",
      titleHighlight: "workflow",
      description:
        "From kickoff to deployment, every step is designed to ensure alignment and smooth execution.",
      steps: [
        {
          step: 1,
          title: "Discovery & briefing",
          description:
            "Gathering requirements, business goals, and design references from the client.",
        },
        {
          step: 2,
          title: "Proposal & quotation",
          description:
            "Defining scope of work, timeline, and cost estimates based on the chosen package.",
        },
        {
          step: 3,
          title: "Wireframe & UI Design",
          description:
            "Creating page structures and visual design for client approval before development starts.",
        },
        {
          step: 4,
          title: "Development",
          description:
            "Building interfaces and functionality matching the approved design.",
        },
        {
          step: 5,
          title: "Testing & Revision",
          description:
            "Ensuring site works across devices and addressing feedback and revisions from client.",
        },
        {
          step: 6,
          title: "Deployment & Handover",
          description:
            "Publishing the site and handing over access/documentation to the client.",
        },
        {
          step: 7,
          title: "Post-Launch Maintenance",
          description:
            "Optional paid services for technical support and updates after going live.",
        },
      ],
    },
    about: {
      badge: "Why Amertarva",
      titleStart: "About",
      titleHighlight: "Amertarva",
      description:
        'We are a lean and focused technology team, dedicated to building high-quality digital products for growing enterprises and educational institutions. From corporate websites and e-commerce platforms to custom system development, we commit to modern technology architectures and transparent communication processes to ensure every project is delivered on time and runs stably.\n\nWe believe that great technology is not just "usable", but must truly create value for the business — which is the philosophy behind the name Amertarva.',
      values: [
        {
          title: "Professional & Reliable",
          description:
            "Utilizing proven tech stacks, tidy code standards, and comprehensive documentation.",
        },
        {
          title: "Transparent Communication",
          description:
            "Clear project quotes and progress updates throughout the project without hidden fees.",
        },
        {
          title: "On-time Delivery",
          description:
            "Defined development workflows and milestones to prevent indefinite delays.",
        },
        {
          title: "Continuous Support",
          description:
            "Providing maintenance and update services post-launch to support your ongoing growth.",
        },
      ],
      status: {
        build: "Build Status",
        deployed: "Deployed Successfully",
      },
    },
    portal: {
      title: "Our Services",
      description:
        "From website development to system maintenance, Amertarva provides complete digital solutions for small-to-medium enterprises and educational institutions.",
      services: [
        {
          id: "landing-page",
          title: "Landing Page / Corporate Website",
          description:
            "Single-page website to showcase your business, ideal for startups, SMEs, or personal branding.",
        },
        {
          id: "ecommerce",
          title: "E-commerce Website",
          description:
            "Small-to-medium scale online store with product catalog and basic payment integration.",
        },
        {
          id: "lms",
          title: "Learning Management System (LMS)",
          description:
            "Digital learning platform tailored for training centers or educational institutions.",
        },
        {
          id: "custom-web-app",
          title: "Custom Web Application",
          description:
            "Developed based on your specific needs, such as booking systems, internal dashboards, or data verification tools.",
        },
        {
          id: "maintenance",
          title: "Maintenance & Update Services",
          description:
            "Ongoing post-launch services including content updates, bug fixes, and minor feature iterations.",
        },
      ],
    },
    work: {
      title: "Our Work",
      description:
        "We are dedicated to delivering high-quality digital products for our clients. Here is a showcase of our work.",
      comingSoon: "Coming Soon",
      items: [
        {
          id: "placeholder-1",
          category: "Corporate Website",
          title: "Project Details Pending",
          description:
            "Project description is being prepared — will be updated after the official release.",
          image: "/images/work/placeholder-1.jpg",
          isPlaceholder: true,
        },
        {
          id: "placeholder-2",
          category: "E-commerce System",
          title: "Project Details Pending",
          description:
            "Project description is being prepared — will be updated after the official release.",
          image: "/images/work/placeholder-2.jpg",
          isPlaceholder: true,
        },
        {
          id: "placeholder-3",
          category: "Educational Technology Platform",
          title: "Project Details Pending",
          description:
            "Project description is being prepared — will be updated after the official release.",
          image: "/images/work/placeholder-3.jpg",
          isPlaceholder: true,
        },
      ],
    },
    cta: {
      badge: "Let's Talk",
      titleStart: "Ready to build",
      titleHighlight: "something great",
      description:
        "Whether you have a detailed spec or just a rough idea, we'd love to hear from you. Let's explore how we can bring your vision to life.",
      whatsapp: "Chat on WhatsApp",
    },
    ecosystem: {
      badge: "Product Ecosystem",
      titleStart: "Two Solutions,",
      titleHighlight: "One Ecosystem",
      description:
        "Our platforms are designed specifically for two key needs — businesses looking to build a digital presence, and educational institutions ready to learn without boundaries.",
      office: {
        tag: "For Business",
        title: "Amertarva Office",
        description:
          "Complete digital solutions for business and corporate — from company profiles to operational systems.",
        features: [
          "Landing page & company profile",
          "Corporate website & business profile",
          "Point of sale (POS) system",
          "Custom web app for operations",
        ],
        cta: "Explore",
      },
      learning: {
        tag: "For Education",
        title: "Amertarva Learning",
        description:
          "Modern e-learning platform for educational institutions wanting to digitalize the learning process.",
        features: [
          "Course & curriculum management",
          "Virtual classrooms & online assignments",
          "Student progress monitoring",
          "Multi-tenant per institution",
        ],
        cta: "Explore",
      },
    },
    footer: {
      tagline:
        "Tech agency crafting digital products that matter. From idea to production, with precision and care.",
      columns: {
        services: "Services",
        company: "Company",
        connect: "Connect",
      },
      links: {
        services: {
          webDev: "Web Development",
          mobileApps: "Mobile Apps",
          uiux: "UI/UX Design",
          devops: "Cloud & DevOps",
        },
        company: {
          about: "About Us",
          work: "Our Work",
          blog: "Blog",
          contact: "Contact",
        },
      },
      rights: "All rights reserved.",
    },
  },
};
