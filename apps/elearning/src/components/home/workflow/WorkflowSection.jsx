import { Settings, UploadCloud, Users, Rocket } from 'lucide-preact';
import { useState } from 'preact/hooks';

export default function WorkflowSection() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: "Konsultasi & Personalisasi",
      description: "Tim ahli kami akan menganalisis kebutuhan institusi Anda. Kami menyesuaikan warna, logo, dan domain platform agar 100% mencerminkan identitas sekolah atau bimbel Anda.",
      icon: <Settings className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Migrasi & Setup Sistem",
      description: "Pindahkan data siswa, guru, dan kurikulum yang ada ke dalam cloud cerdas kami. Proses ini dijamin aman, cepat, dan tanpa mengganggu kegiatan belajar berjalan.",
      icon: <UploadCloud className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Pelatihan & Onboarding",
      description: "Kami memberikan sesi pelatihan intensif bagi guru dan staf admin. Memastikan seluruh SDM institusi Anda mahir mengoperasikan ekosistem LMS Amertarva.",
      icon: <Users className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Go-Live & Dukungan Penuh",
      description: "Platform siap digunakan oleh institusi Anda! Kami menyediakan dukungan teknis 24/7 dan pembaruan sistem berkala agar aplikasi selalu dalam performa optimal.",
      icon: <Rocket className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
    }
  ];

  return (
    <section id="alur" className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-heading mb-6 font-serif leading-tight">
            Transformasi <span className="text-primary">Lancar & Cepat</span>
          </h2>
          <p className="text-lg text-paragraph leading-relaxed">
            Tidak perlu waktu berbulan-bulan. Kami telah merancang alur integrasi LMS yang sangat efisien agar institusi pendidikan Anda dapat segera memulai digitalisasi.
          </p>
        </div>

        {/* Desktop Layout: Split view, Mobile: Stacked */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 max-w-6xl mx-auto">
          
          {/* Timeline Left */}
          <div className="w-full lg:w-1/2 relative">
            {/* Vertical Line for timeline */}
            <div className="absolute left-[27px] top-4 bottom-8 w-0.5 bg-heading/10 z-0 hidden md:block"></div>

            <div className="flex flex-col gap-8 relative z-10">
              {steps.map((step, index) => (
                <div 
                  key={index}
                  className={`flex flex-col md:flex-row gap-4 md:gap-6 cursor-pointer group transition-all duration-300 ${activeStep === index ? 'opacity-100' : 'opacity-50 hover:opacity-100'}`}
                  onMouseEnter={() => setActiveStep(index)}
                  onClick={() => setActiveStep(index)}
                >
                  {/* Circle/Icon */}
                  <div className={`w-14 h-14 shrink-0 rounded-full flex items-center justify-center border-2 transition-all duration-500 bg-background relative z-10 ${
                    activeStep === index 
                      ? 'border-primary text-primary shadow-[0_0_15px_rgba(120,157,142,0.4)] scale-110' 
                      : 'border-heading/20 text-heading/40 group-hover:border-primary/50'
                  }`}>
                    {step.icon}
                  </div>
                  
                  {/* Text content */}
                  <div className="pt-2 md:pt-3">
                    <h3 className={`text-xl font-bold mb-2 transition-colors duration-300 ${activeStep === index ? 'text-heading' : 'text-heading/70 group-hover:text-heading'}`}>
                      {index + 1}. {step.title}
                    </h3>
                    <p className="text-paragraph leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Right */}
          <div className="w-full lg:w-1/2">
            <div className="sticky top-32 rounded-[2rem] overflow-hidden aspect-[4/3] bg-heading/5 border border-heading/10 shadow-2xl relative group">
              {/* Animated Corner Accents */}
              <div className="absolute top-0 left-0 w-24 h-24 bg-primary/20 blur-2xl z-20"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-secondary/20 blur-2xl z-20"></div>

              {steps.map((step, index) => (
                <div 
                  key={index} 
                  className={`absolute inset-0 transition-all duration-700 ease-in-out ${activeStep === index ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-105'}`}
                >
                  <img 
                    src={step.image} 
                    alt={step.title} 
                    className="w-full h-full object-cover"
                  />
                  {/* Gradient Overlay for aesthetic premium look */}
                  <div className="absolute inset-0 bg-linear-to-t from-background/60 via-transparent to-transparent"></div>
                  <div className="absolute inset-0 bg-primary/5 mix-blend-multiply"></div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
