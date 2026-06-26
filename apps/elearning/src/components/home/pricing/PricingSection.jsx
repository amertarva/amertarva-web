import { useState } from 'preact/hooks';
import { Check, ChevronDown, Server, Database, Users, Info, Phone, ShieldCheck } from 'lucide-preact';

const plans = [
    {
      name: "Classic",
      users: 100,
      server: "Shared server",
      db: "1 GB",
      annual: 4500000,
      maint: 750000,
      pop: false,
      feats: [
        "AI Chatbot NLU & NLP (terbatas)",
        "E-raport hasil pembelajaran",
        "Ujian online anti-cheat",
        "Manajemen kelas",
      ],
    },
    {
      name: "Pro",
      users: 250,
      server: "Shared server",
      db: "5 GB",
      annual: 9000000,
      maint: 1500000,
      pop: false,
      feats: [
        "Semua fitur Classic",
        "To-do list siswa",
        "Reminder ujian otomatis",
      ],
    },
    {
      name: "Premium",
      users: 700,
      server: "Dedicated server",
      db: "10 GB cloud",
      annual: 20000000,
      maint: 3000000,
      pop: true,
      feats: [
        "Semua fitur Pro",
        "AI expanded (Gemma, Deepseek, Qwen)",
        "Dedicated server",
      ],
    },
    {
      name: "Ultra",
      users: 1200,
      server: "Dedicated server",
      db: "50 GB + NAS pribadi",
      annual: "Hubungi Kami",
      maint: "Custom",
      pop: false,
      isCustomPrice: true,
      feats: [
        "Semua fitur Premium",
        "+ Claude AI",
        "Custom domain & landing page",
      ],
    },
];

const formatRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number);
};

function PricingCard({ plan }) {
  // Toggle accordion state
  const [isOpen, setIsOpen] = useState(false);
  
  const perUser = plan.isCustomPrice ? null : Math.round(plan.annual / plan.users);
  const isPop = plan.pop;

  const whatsappMessage = `Halo Amertarva, saya tertarik dengan lisensi paket *${plan.name}*. Bolehkah saya mendapatkan informasi lebih lanjut atau menjadwalkan demo?`;
  const whatsappUrl = `https://wa.me/6280000000000?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className={`relative flex flex-col p-8 rounded-[2rem] transition-all duration-500 h-full ${
      isPop 
        ? 'bg-heading/5 border-2 border-primary shadow-2xl scale-100 xl:scale-105 z-10' 
        : 'bg-background border border-heading/10 hover:border-heading/30 shadow-lg hover:shadow-xl'
    }`}>
      {isPop && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-background text-xs font-bold px-5 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
          Paling Populer
        </div>
      )}
      
      {/* Header Info */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-heading mb-2 font-serif">{plan.name}</h3>
        <div className="flex items-baseline gap-1 mt-4">
          <span className={`${plan.isCustomPrice ? 'text-3xl' : 'text-4xl'} font-bold text-heading tracking-tight`}>
            {plan.isCustomPrice ? plan.annual : formatRupiah(plan.annual)}
          </span>
          {!plan.isCustomPrice && <span className="text-paragraph text-sm font-medium">/tahun</span>}
        </div>
        {!plan.isCustomPrice && (
          <div className="mt-3 text-xs font-semibold text-primary bg-primary/10 inline-flex items-center px-3 py-1.5 rounded-full">
            ≈ {formatRupiah(perUser)} / user / tahun
          </div>
        )}
      </div>

      {/* Main Specs */}
      <div className="space-y-4 mb-8 flex-grow">
        <div className="flex items-center gap-3 text-sm text-heading">
          <div className="w-9 h-9 rounded-full bg-heading/5 flex items-center justify-center shrink-0 border border-heading/5">
            <Users className="w-4 h-4 text-primary" />
          </div>
          <span>Hingga <strong className="font-bold">{plan.users.toLocaleString('id-ID')}</strong> user</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-heading">
          <div className="w-9 h-9 rounded-full bg-heading/5 flex items-center justify-center shrink-0 border border-heading/5">
            <Server className="w-4 h-4 text-primary" />
          </div>
          <span>{plan.server}</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-heading">
          <div className="w-9 h-9 rounded-full bg-heading/5 flex items-center justify-center shrink-0 border border-heading/5">
            <Database className="w-4 h-4 text-primary" />
          </div>
          <span>Penyimpanan {plan.db}</span>
        </div>
      </div>

      {/* Accordion for Features */}
      <div className="border-t border-heading/10 pt-5">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full text-left font-bold text-heading hover:text-primary transition-colors focus:outline-none"
        >
          <span>Fitur & Detail</span>
          <div className={`w-6 h-6 rounded-full bg-heading/5 flex items-center justify-center transition-transform duration-300 ${isOpen ? 'rotate-180 bg-primary/10 text-primary' : ''}`}>
            <ChevronDown className="w-4 h-4" />
          </div>
        </button>
        
        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100 mt-5' : 'max-h-0 opacity-0'}`}>
          <ul className="space-y-3 mb-5">
            {plan.feats.map((feat, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-paragraph">
                <div className="mt-0.5 w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5 text-primary" />
                </div>
                <span className="leading-snug">{feat}</span>
              </li>
            ))}
          </ul>
          
          <div className="p-4 rounded-xl bg-heading/5 border border-heading/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-secondary"></div>
            <p className="text-xs text-paragraph mb-1 font-medium">Biaya Maintenance Terpisah:</p>
            <p className="text-sm font-bold text-heading">
              {plan.isCustomPrice ? plan.maint : `${formatRupiah(plan.maint)} `}
              {!plan.isCustomPrice && <span className="text-xs font-normal text-paragraph">/tahun</span>}
            </p>
          </div>
        </div>
      </div>
      
      {/* CTA */}
      <a 
        href={whatsappUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className={`mt-8 block w-full py-4 px-6 rounded-full text-center font-bold transition-all duration-300 ${
        isPop 
          ? 'bg-primary text-background hover:bg-primary/90 shadow-[0_0_20px_rgba(120,157,142,0.3)] hover:shadow-[0_0_30px_rgba(120,157,142,0.5)] hover:-translate-y-1' 
          : 'bg-heading/5 text-heading hover:bg-heading/10 border border-heading/10 hover:-translate-y-1'
      }`}>
        {plan.isCustomPrice ? 'Hubungi Kami' : `Pilih ${plan.name}`}
      </a>
    </div>
  );
}

export default function PricingSection() {
  return (
    <section id="harga" className="py-24 bg-background relative overflow-hidden">
      {/* Decorative Orbs removed per user request */}
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-heading mb-6 font-serif leading-tight">
            Investasi Terukur untuk <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">Skala Digital Anda</span>
          </h2>
          <p className="text-lg text-paragraph leading-relaxed">
            Pilih paket lisensi tahunan LMS White-label yang sesuai dengan kapasitas siswa dan kebutuhan operasional institusi pendidikan Anda.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 lg:gap-6 items-start max-w-[1400px] mx-auto">
          {plans.map((plan, idx) => (
            <PricingCard key={idx} plan={plan} />
          ))}
        </div>

        {/* Info Box */}
        <div className="mt-20 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start gap-4 p-6 rounded-2xl bg-heading/5 border border-heading/10 hover:border-heading/20 transition-colors">
            <ShieldCheck className="w-6 h-6 text-primary shrink-0" />
            <div>
              <h4 className="font-bold text-heading mb-2">Transparansi Penuh</h4>
              <p className="text-sm text-paragraph leading-relaxed">Seluruh harga lisensi kami ditagihkan secara tahunan. Tidak ada biaya tersembunyi. Biaya maintenance meliputi pemeliharaan server, keamanan data, dan pembaruan sistem.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-6 rounded-2xl bg-primary/5 border border-primary/20 hover:border-primary/40 transition-colors shadow-[0_0_15px_rgba(120,157,142,0.05)]">
            <Phone className="w-6 h-6 text-primary shrink-0" />
            <div>
              <h4 className="font-bold text-heading mb-2">Paket Enterprise Custom</h4>
              <p className="text-sm text-paragraph leading-relaxed">Butuh lebih dari 1.200 user atau integrasi NAS (Server) mandiri secara penuh? Hubungi representatif kami untuk merancang lisensi khusus.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
