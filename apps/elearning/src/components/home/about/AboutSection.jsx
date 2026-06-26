import { Building2, ArrowRight, Shield, Users, LayoutDashboard, Award, Globe } from 'lucide-preact';

export default function AboutSection() {
  const waPresentationMsg = "Halo Amertarva, saya tertarik menjadi pionir pendidikan modern dan ingin menjadwalkan presentasi kerja sama kemitraan LMS White-Label.";
  const waPresentationUrl = `https://wa.me/6280000000000?text=${encodeURIComponent(waPresentationMsg)}`;

  return (
    <section id="tentang-kami" className="py-24 bg-background relative overflow-hidden">
      {/* Decorative Background removed per user request */}
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-heading mb-6 font-serif leading-tight">
            Standar Baru <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">Pendidikan Digital</span> Masa Depan
          </h2>
          <p className="text-lg text-paragraph leading-relaxed">
            Lebih dari sekadar platform e-learning, Amertarva adalah ekosistem komprehensif yang dirancang khusus untuk membantu institusi pendidikan bertransformasi dan mencetak lulusan berdaya saing global.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          
          {/* Main Large Card (Spans 2 columns & 2 rows) */}
          <div className="md:col-span-2 md:row-span-2 relative rounded-[2rem] overflow-hidden group bg-heading/5 border border-heading/5 min-h-[450px] shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop" 
              alt="Transformasi Sekolah" 
              className="w-full h-full object-cover opacity-40 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700"
            />
            {/* Gradient to darken the bottom for text readability */}
            <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent"></div>
            
            <div className="absolute bottom-0 left-0 p-8 md:p-10 w-full">
              <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/30 mb-6 backdrop-blur-md">
                <Building2 className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-2xl md:text-4xl font-bold text-heading mb-4 leading-tight">Platform LMS White-Label <br/> Siap Pakai</h3>
              <p className="text-paragraph text-lg leading-relaxed max-w-xl">
                Tingkatkan layanan pendidikan lembaga Anda tanpa beban infrastruktur server. Amertarva menyewakan platform e-learning kelas dunia yang siap disesuaikan sepenuhnya dengan identitas sekolah atau bimbel Anda.
              </p>
            </div>
          </div>

          {/* Top Right Card - Stats */}
          <div className="rounded-[2rem] bg-linear-to-br from-heading/5 to-heading/10 border border-heading/5 p-8 flex flex-col justify-center items-center text-center relative overflow-hidden group hover:border-primary/30 transition-colors shadow-lg">
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Users className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
            <h4 className="text-4xl lg:text-5xl font-bold text-heading mb-2">500+</h4>
            <p className="text-paragraph font-medium">Institusi Pendidikan Bermitra</p>
          </div>

          {/* Middle Right Card - Certification */}
          <div className="rounded-[2rem] bg-linear-to-br from-heading/5 to-heading/10 border border-heading/5 p-8 flex flex-col justify-center items-center text-center relative overflow-hidden group hover:border-secondary/30 transition-colors shadow-lg">
            <div className="absolute inset-0 bg-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Award className="w-10 h-10 text-secondary mb-4 group-hover:scale-110 transition-transform" />
            <h4 className="text-xl font-bold text-heading mb-2">Kustomisasi Identitas Penuh</h4>
            <p className="text-paragraph text-sm">Sesuaikan logo, warna, dan domain dengan merek institusi Anda sendiri.</p>
          </div>

          {/* Bottom Left Card - Features */}
          <div className="rounded-[2rem] bg-heading/5 border border-heading/5 p-8 relative overflow-hidden group shadow-lg">
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <LayoutDashboard className="w-32 h-32 text-primary transform rotate-12 group-hover:rotate-0 transition-transform duration-700" />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-heading/5 flex items-center justify-center border border-heading/10 mb-6 group-hover:bg-primary/20 transition-colors">
                <LayoutDashboard className="w-6 h-6 text-primary" />
              </div>
              <h4 className="text-xl font-bold text-heading mb-3">LMS & Analytics Cerdas</h4>
              <p className="text-paragraph text-sm leading-relaxed">Pantau performa akademik seluruh siswa Anda secara real-time melalui dashboard analitik yang komprehensif.</p>
            </div>
          </div>

          {/* Bottom Right Card - Call to Action (Spans 2 cols) */}
          <div className="md:col-span-2 rounded-[2rem] bg-linear-to-r from-primary/20 to-heading/5 border border-primary/20 p-8 md:p-10 relative overflow-hidden flex flex-col md:flex-row items-center gap-8 justify-between group hover:border-primary/40 transition-colors shadow-[0_0_30px_rgba(120,157,142,0.05)]">
            <div className="relative z-10 md:w-2/3">
              <div className="flex items-center gap-2 mb-3">
                <Globe className="w-5 h-5 text-primary" />
                <span className="text-primary font-bold uppercase tracking-wider text-sm">Mari Berkembang Bersama</span>
              </div>
              <h4 className="text-2xl md:text-3xl font-bold text-heading mb-4 leading-tight">Skalakan Bisnis Pendidikan & Reputasi Institusi Anda</h4>
              <p className="text-paragraph mb-8 leading-relaxed">
                Jadilah pionir pendidikan modern di wilayah Anda. Tim representatif kami siap mempresentasikan proposal integrasi tanpa biaya komitmen awal.
              </p>
              
              <a 
                href={waPresentationUrl}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary text-background font-bold hover:bg-primary/90 transition-all duration-300 shadow-[0_0_20px_rgba(120,157,142,0.2)] hover:shadow-[0_0_30px_rgba(120,157,142,0.4)] hover:-translate-y-1"
              >
                Jadwalkan Presentasi
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
            
            {/* Visual element on the right side of the CTA card */}
            <div className="hidden md:flex md:w-1/3 justify-center relative">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"></div>
              <Shield className="w-32 h-32 text-primary/80 relative z-10 transform group-hover:scale-110 transition-transform duration-500" />
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
