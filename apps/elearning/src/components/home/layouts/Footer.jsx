import { Sun, Building2, Globe, Mail, MapPin } from 'lucide-preact';

export default function Footer() {
  return (
    <footer className="bg-background pt-24 pb-10 border-t border-heading/10 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Logo & About */}
          <div className="md:col-span-5 lg:col-span-4">
            <a href="#" className="flex items-center gap-2 group mb-6 inline-flex">
              <div className="relative flex items-center">
                <span className="text-3xl font-serif tracking-wide text-primary transition-colors">amertar</span>
                <div className="relative flex flex-col items-center justify-center">
                  <Sun className="w-6 h-6 text-secondary absolute -top-4 opacity-90 group-hover:opacity-100 group-hover:rotate-45 transition-all duration-500" />
                  <span className="text-3xl font-serif tracking-wide text-primary transition-colors">v</span>
                </div>
                <span className="text-3xl font-serif tracking-wide text-primary transition-colors">a</span>
              </div>
            </a>
            <p className="text-paragraph leading-relaxed mb-6">
              Platform B2B White-label LMS terdepan untuk institusi pendidikan yang ingin bertransformasi digital tanpa batas.
            </p>
            <div className="flex flex-col gap-3 text-sm text-paragraph">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span>Jakarta, Indonesia</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>kemitraan@amertarva.com</span>
              </div>
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-2"></div>

          {/* Ecosystem Links */}
          <div className="md:col-span-4 lg:col-span-3">
            <h4 className="text-heading font-bold mb-6 uppercase tracking-wider text-sm">Ekosistem Amertarva</h4>
            <ul className="space-y-4">
              <li>
                <a href="#" className="group flex items-center gap-3 text-paragraph hover:text-primary transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-heading/5 flex items-center justify-center border border-heading/10 group-hover:bg-primary/10 group-hover:border-primary/20 transition-all">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-bold text-heading group-hover:text-primary transition-colors">Amertarva Main Web</span>
                    <span className="text-xs opacity-70">Portal Publik & Utama</span>
                  </div>
                </a>
              </li>
              <li>
                <a href="#" className="group flex items-center gap-3 text-paragraph hover:text-secondary transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-heading/5 flex items-center justify-center border border-heading/10 group-hover:bg-secondary/10 group-hover:border-secondary/20 transition-all">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-bold text-heading group-hover:text-secondary transition-colors">Amertarva Office</span>
                    <span className="text-xs opacity-70">Operasional Internal Amertarva</span>
                  </div>
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 lg:col-span-3">
            <h4 className="text-heading font-bold mb-6 uppercase tracking-wider text-sm">Tautan Cepat</h4>
            <ul className="space-y-3 text-paragraph text-sm font-medium">
              <li><a href="#" className="hover:text-primary transition-colors block">Beranda</a></li>
              <li><a href="#tentang-kami" className="hover:text-primary transition-colors block">Tentang Kami</a></li>
              <li><a href="#alur" className="hover:text-primary transition-colors block">Alur Integrasi</a></li>
              <li><a href="#harga" className="hover:text-primary transition-colors block">Harga Lisensi</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-heading/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-paragraph font-medium">
            &copy; {new Date().getFullYear()} PT Amertarva Digital Edukasi. Hak cipta dilindungi.
          </p>
          <div className="flex items-center gap-6 text-sm text-paragraph font-medium">
            <a href="#" className="hover:text-heading transition-colors">Kebijakan Privasi</a>
            <a href="#" className="hover:text-heading transition-colors">Syarat & Ketentuan</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
