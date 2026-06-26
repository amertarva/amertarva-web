import { ArrowRight, MessageCircle, ShieldCheck, Star, Users } from 'lucide-preact';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" 
          alt="Profesional E-Learning" 
          className="w-full h-full object-cover opacity-80"
        />
        {/* Complex gradient to give a premium, deep dark look */}
        <div className="absolute inset-0 bg-linear-to-r from-background via-background/80 to-transparent"></div>
        <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-background/30"></div>
      </div>

      <div className="container relative z-10 mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center pt-24 pb-12">
        {/* Main Text Content */}
        <div className="w-full lg:w-2/3 xl:w-3/5 text-left">

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-heading leading-tight mb-6 font-serif">
            Transformasi Digital <br className="hidden md:block" />
            <span className="text-primary">
              Sekolah Tanpa Batas
            </span>
          </h1>

          {/* Sub-headline / Tagline */}
          <p className="text-lg md:text-xl text-paragraph mb-10 max-w-2xl leading-relaxed">
            Amertarva menyewakan platform Learning Management System (LMS) berlabel putih (White-label) mutakhir untuk Sekolah, Bimbingan Belajar, dan Layanan Pendidikan guna mengakselerasi digitalisasi institusi Anda.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-14">
            <a 
              href="#program" 
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-primary hover:bg-primary/90 text-background font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(120,157,142,0.3)] hover:shadow-[0_0_30px_rgba(120,157,142,0.5)] hover:-translate-y-1"
            >
              Pelajari Selengkapnya
              <ArrowRight className="w-5 h-5" />
            </a>
            
            <a 
              href="#konsultasi" 
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-heading/5 hover:bg-heading/10 border border-heading/10 text-heading font-semibold transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-md hover:-translate-y-1"
            >
              Konsultasi Gratis
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>

          {/* Trust Indicators / Stats */}
          <div className="flex flex-wrap items-center gap-8 md:gap-16 pt-8 border-t border-heading/10">
            {/* Reviews */}
            <div>
              <div className="flex items-center gap-1 text-secondary mb-2">
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
              </div>
              <p className="text-paragraph text-sm"><strong className="text-heading text-base">4.9/5</strong> dari 5.000+ Ulasan</p>
            </div>
            
            {/* Alumni */}
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-heading font-bold text-xl leading-none mb-1">1 Juta+</p>
                <p className="text-paragraph text-sm">Siswa Terkelola Aktif</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
      
      
      {/* Seamless Transition Gradient to About Section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-background via-background/80 to-transparent pointer-events-none z-0"></div>
    </section>
  );
}
