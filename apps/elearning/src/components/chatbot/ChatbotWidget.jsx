import { MessageSquareText, Sparkles, X, ShieldCheck } from 'lucide-preact';
import { useState, useRef, useEffect } from 'preact/hooks';

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showWidget, setShowWidget] = useState(false);
  const messagesEndRef = useRef(null);
  
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Halo! Saya adalah asisten virtual resmi Amertarva yang terintegrasi dengan teknologi AI.'
    },
    {
      role: 'assistant',
      content: 'Ada yang bisa saya bantu terkait integrasi platform LMS untuk institusi atau sekolah Anda hari ini?'
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.getElementById('tentang-kami');
      // If the section exists, show widget when user scrolls near it. 
      // If not, default to showing after scrolling down 500px.
      const threshold = aboutSection ? aboutSection.offsetTop - 300 : window.innerHeight * 0.5;
      
      if (window.scrollY > threshold) {
        setShowWidget(true);
      } else {
        setShowWidget(false);
        setIsOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textOverride = null) => {
    // Jika dipanggil dari tombol (mendapatkan Event object) atau tanpa argumen, gunakan input.
    // Jika dipanggil dari suggestion dengan string, gunakan string tersebut.
    const textToSend = typeof textOverride === 'string' ? textOverride : input;
    
    if (!textToSend.trim() || isLoading) return;

    const userMessage = { role: 'user', content: textToSend };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content
          }))
        })
      });

      const data = await response.json();
      
      if (data.success && data.data) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.data.content }]);
        
        // --- Agentic Orchestration Execution ---
        if (data.data.action) {
          setTimeout(() => {
            if (data.data.action === "SCROLL_PRICING") {
              const pricingSection = document.getElementById("harga");
              if (pricingSection) {
                pricingSection.scrollIntoView({ behavior: 'smooth' });
              }
            } else if (data.data.action === "OPEN_WA") {
              const message = "Halo Amertarva, saya tertarik dan ingin konsultasi serta melihat demo platform LMS Anda.";
              const whatsappUrl = `https://wa.me/6280000000000?text=${encodeURIComponent(message)}`;
              window.open(whatsappUrl, "_blank");
            }
          }, 600); // Jeda sejenak agar user sempat membaca balasan teksnya
        }
      } else {
        const errorMessage = data.error || "Maaf, terjadi kesalahan pada server. Silakan pastikan server backend berjalan dengan API Key yang valid.";
        setMessages(prev => [...prev, { role: 'assistant', content: errorMessage }]);
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Maaf, gagal terhubung ke Amerta Agent. Pastikan server backend Anda sudah berjalan di port 3000." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (text) => {
    // Auto-send suggestion directly
    handleSendMessage(text);
  };

  return (
    <div className={`fixed bottom-6 right-6 z-50 flex flex-col items-end transition-all duration-500 ${showWidget ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
      
      {/* Mockup Chat Window */}
      <div 
        className={`mb-4 w-[340px] bg-background border border-heading/10 shadow-2xl rounded-2xl overflow-hidden transition-all duration-500 origin-bottom-right flex flex-col ${
          isOpen ? 'opacity-100 scale-100 translate-y-0 h-[500px]' : 'opacity-0 scale-50 translate-y-10 pointer-events-none h-0'
        }`}
      >
        {/* Chat Header */}
        <div className="bg-primary p-4 text-background flex justify-between items-center relative overflow-hidden shrink-0">
          <div className="absolute -right-4 -top-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-10 h-10 bg-background/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-background/20">
              <Sparkles className="w-5 h-5 text-background" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <h4 className="font-bold text-sm tracking-wide">Amerta Agent</h4>
                <ShieldCheck className="w-3 h-3 text-secondary" />
              </div>
              <p className="text-[11px] opacity-90 flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                Online • Balasan instan AI
              </p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)} 
            className="hover:bg-black/10 p-1.5 rounded-md transition-colors relative z-10 focus:outline-none cursor-pointer"
            aria-label="Tutup Chat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Body */}
        <div className="p-5 flex-grow bg-heading/5 overflow-y-auto flex flex-col gap-4 scroll-smooth">
          <p className="text-center text-[10px] text-paragraph uppercase tracking-widest font-bold mb-2">Hari Ini</p>
          
          <div className="flex flex-col gap-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm max-w-[85%] whitespace-pre-wrap ${
                  msg.role === 'user' 
                    ? 'bg-primary text-background rounded-tr-sm' 
                    : 'bg-background border border-heading/10 text-heading rounded-tl-sm'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex flex-col items-start">
                <div className="bg-background border border-heading/10 p-3.5 rounded-2xl rounded-tl-sm text-sm text-heading shadow-sm flex gap-1.5 items-center h-[46px]">
                  <span className="w-2 h-2 bg-heading/40 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-heading/40 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></span>
                  <span className="w-2 h-2 bg-heading/40 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions (only show if few messages) */}
          {messages.length <= 2 && !isLoading && (
            <div className="flex flex-wrap gap-2 mt-2">
              <button onClick={() => handleSuggestionClick("Berapa harga lisensinya?")} className="text-xs bg-primary/10 text-primary border border-primary/20 px-3 py-1.5 rounded-full hover:bg-primary hover:text-background transition-colors text-left cursor-pointer">
                Info Harga
              </button>
              <button onClick={() => handleSuggestionClick("Saya ingin menjadwalkan demo")} className="text-xs bg-primary/10 text-primary border border-primary/20 px-3 py-1.5 rounded-full hover:bg-primary hover:text-background transition-colors text-left cursor-pointer">
                Jadwal Demo
              </button>
            </div>
          )}
        </div>

        {/* Chat Input */}
        <div className="p-3 border-t border-heading/10 bg-background flex gap-2 items-center shrink-0">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Tulis pesan Anda..." 
            className="w-full bg-heading/5 border border-heading/10 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-primary text-heading transition-colors" 
          />
          <button 
            onClick={handleSendMessage}
            disabled={isLoading || !input.trim()}
            className="w-10 h-10 shrink-0 bg-primary rounded-full flex items-center justify-center text-background hover:bg-primary/90 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {/* Dihilangkan class margin agar benar-benar berada di tengah */}
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="-ml-0.5">
              <path d="m22 2-7 20-4-9-9-4Z"/>
              <path d="M22 2 11 13"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center p-4 rounded-full shadow-[0_0_20px_rgba(120,157,142,0.4)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(120,157,142,0.6)] relative focus:outline-none w-14 h-14 cursor-pointer ${
          isOpen ? 'bg-heading/10 text-heading hover:bg-heading/20' : 'bg-primary text-background hover:-translate-y-1'
        }`}
        aria-label="Buka Asisten AI"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageSquareText className="w-6 h-6" />
        )}
      </button>

    </div>
  );
}
