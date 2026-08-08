import { MessageCircle, Calendar } from 'lucide-preact';

export default function CtaSection() {
  const waContactMsg = "Halo Amertarva, saya ingin berkonsultasi mengenai kebutuhan transformasi digital institusi saya.";
  const waContactUrl = `https://wa.me/6280000000000?text=${encodeURIComponent(waContactMsg)}`;

  const waDemoMsg = "Halo Amertarva, saya tertarik dan ingin menjadwalkan presentasi/demo platform LMS Anda.";
  const waDemoUrl = `https://wa.me/6280000000000?text=${encodeURIComponent(waDemoMsg)}`;

  return (
    <section id="kontak" className="relative py-20 lg:py-28 overflow-hidden w-full border-y border-heading/10 bg-background">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          src="/images/cta-bg.png"
          alt="Amertarva CTA Background"
          className="w-full h-full object-cover opacity-20 dark:opacity-30 mix-blend-multiply dark:mix-blend-luminosity filter blur-[0.5px] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center">
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-heading mb-8 font-serif leading-tight">
          Beralih ke Ekosistem <br className="hidden md:block" />
          <span className="text-primary">LMS Terintegrasi</span>
        </h2>
        
        <p className="text-lg sm:text-2xl text-paragraph leading-relaxed mb-12 max-w-3xl mx-auto font-medium">
          Diskusikan kebutuhan spesifik sistem manajemen pembelajaran institusi Anda bersama representatif kami. Kami siap melakukan presentasi dan demo platform langsung sesuai dengan skala operasional yang Anda butuhkan.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <a 
            href={waContactUrl}
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-primary text-background font-bold transition-all duration-300 hover:bg-primary/90 hover:-translate-y-1 min-w-[220px]"
          >
            <MessageCircle className="w-5 h-5 fill-background/20 shrink-0" />
            <span>Konsultasi via WhatsApp</span>
          </a>
          
          <a 
            href={waDemoUrl}
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 border border-heading/20 hover:border-primary/40 bg-background/50 hover:bg-heading/5 text-heading font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:-translate-y-1 min-w-[220px]"
          >
            <Calendar className="w-5 h-5 shrink-0" />
            <span>Jadwalkan Presentasi Platform</span>
          </a>
        </div>
      </div>
    </section>
  );
}
