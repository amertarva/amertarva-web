import { useState, useEffect } from 'preact/hooks';
import { Sun, Moon, Languages, Menu, X } from 'lucide-preact';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  // Default to dark since we added class="dark" to html initially
  const [theme, setTheme] = useState('dark');
  const [lang, setLang] = useState('id');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const navLinks = [
    { name: 'Beranda', href: '#' },
    { name: 'Tentang Kami', href: '#tentang-kami' },
    { name: 'Alur', href: '#alur' },
    { name: 'Kerjasama', href: '#harga' },
  ];

  return (
    <header
      className={`fixed top-0 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-full md:w-[90%] max-w-[1200px] ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-md shadow-lg border border-t-0 border-heading/10 rounded-b-[2.5rem] py-4'
          : 'bg-transparent py-6 border border-transparent'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group z-50">
          <div className="relative flex items-center">
            <span className="text-2xl font-serif tracking-wide text-primary transition-colors">
              amertar
            </span>
            <div className="relative flex flex-col items-center justify-center">
              <Sun className="w-5 h-5 text-secondary absolute -top-3.5 opacity-90 group-hover:opacity-100 group-hover:rotate-45 transition-all duration-500" />
              <span className="text-2xl font-serif tracking-wide text-primary transition-colors">
                v
              </span>
            </div>
            <span className="text-2xl font-serif tracking-wide text-primary transition-colors">
              a
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[15px] font-medium text-paragraph hover:text-heading transition-colors relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Actions (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full bg-heading/5 hover:bg-heading/10 border border-heading/10 text-paragraph hover:text-heading transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          
          <button
            onClick={() => setLang(lang === 'id' ? 'en' : 'id')}
            className="p-2.5 rounded-full bg-heading/5 hover:bg-heading/10 border border-heading/10 text-paragraph hover:text-heading transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50 flex items-center justify-center"
            aria-label="Toggle Language"
            title="Switch Language"
          >
            <Languages className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-paragraph hover:text-heading transition-colors z-50"
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden fixed inset-0 bg-background/95 backdrop-blur-xl transition-all duration-500 flex flex-col items-center justify-center gap-8 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col items-center gap-6 text-center">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-medium text-paragraph hover:text-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>
        
        <div className="flex items-center gap-6 mt-4">
          <button
            onClick={toggleTheme}
            className="p-4 rounded-full bg-heading/10 text-heading transition-all hover:bg-heading/20"
          >
            {theme === 'dark' ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </button>
          
          <button
            onClick={() => setLang(lang === 'id' ? 'en' : 'id')}
            className="p-4 rounded-full bg-heading/10 text-heading transition-all hover:bg-heading/20 flex items-center gap-2"
          >
            <Languages className="w-6 h-6" />
            <span className="font-bold uppercase">{lang}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
