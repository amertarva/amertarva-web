import { MessageCircle, Calendar } from 'lucide-preact';

export default function CtaSection() {
  const waContactMsg = "Halo Amertarva, saya ingin berkonsultasi mengenai kebutuhan transformasi digital institusi saya.";
  const waContactUrl = `https://wa.me/6280000000000?text=${encodeURIComponent(waContactMsg)}`;

  const waDemoMsg = "Halo Amertarva, saya tertarik dan ingin menjadwalkan presentasi/demo platform LMS Anda.";
  const waDemoUrl = `https://wa.me/6280000000000?text=${encodeURIComponent(waDemoMsg)}`;

  return (
    <section id="kontak" className="py-24 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-5xl mx-auto bg-heading/5 border border-heading/10 rounded-[3rem] p-10 md:p-20 text-center relative overflow-hidden shadow-2xl">
          {/* Subtle Background Glow removed per ANTISLOP-ID R-01 */}
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-heading mb-6 font-serif leading-tight">
              Siap Memulai Transformasi <br className="hidden md:block" />
              <span className="text-primary">Pendidikan Digital?</span>
            </h2>
            <p className="text-lg text-paragraph max-w-2xl mx-auto mb-12 leading-relaxed">
              Tim representatif Amertarva siap membantu institusi Anda untuk beralih ke ekosistem LMS modern. Hubungi kami sekarang untuk mendiskusikan skala kebutuhan Anda atau menjadwalkan demonstrasi platform.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
              <a 
                href={waContactUrl}
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary text-background font-bold transition-all duration-300 hover:bg-primary/90 hover:-translate-y-1"
              >
                <MessageCircle className="w-5 h-5 fill-background/20" />
                Hubungi via WhatsApp
              </a>
              <a 
                href={waDemoUrl}
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-background border border-heading/20 text-heading font-bold transition-all duration-300 hover:bg-heading/5 hover:border-heading/30 hover:-translate-y-1"
              >
                <Calendar className="w-5 h-5" />
                Jadwalkan Demo
              </a>
            </div>
            
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-paragraph font-medium">
              <span className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                Tim konsultan online
              </span>
              <span className="hidden sm:block text-heading/20">•</span>
              <span>Tanpa Biaya Komitmen Awal</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
