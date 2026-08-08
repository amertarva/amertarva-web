<script setup lang="ts">
import { ref, computed, nextTick, watch, onMounted, onUnmounted } from 'vue'
import { MessageSquareText, Sparkles, X, ShieldCheck, GraduationCap, ExternalLink, PhoneCall } from 'lucide-vue-next'
import { sanitizeInput } from '~/utils/sanitizer'

const { locale } = useI18n();

const isOpen = ref(false);
const showWidget = ref(false);
const input = ref('');
const isLoading = ref(false);
const messagesEndRef = ref<HTMLElement | null>(null);

const handleScroll = () => {
  const aboutSection = document.getElementById('about');
  const threshold = aboutSection ? aboutSection.offsetTop - 300 : (typeof window !== 'undefined' ? window.innerHeight * 0.4 : 300);

  if (window.scrollY > threshold) {
    showWidget.value = true;
  } else {
    showWidget.value = false;
    isOpen.value = false;
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

interface Message {
  role: 'user' | 'assistant';
  content: string;
  action?: string | null;
}

const getInitialMessages = (): Message[] => [
  {
    role: 'assistant',
    content: locale.value === 'en'
      ? 'Hello! I am Amerta Agent, the official AI assistant for Amertarva.'
      : 'Halo! Saya adalah asisten virtual resmi Amertarva yang terintegrasi dengan teknologi AI.',
  },
  {
    role: 'assistant',
    content: locale.value === 'en'
      ? 'How can I assist you today regarding web development, enterprise digital systems, or our E-Learning platform?'
      : 'Ada yang bisa saya bantu terkait pengembangan website, sistem digital enterprise, atau platform E-Learning Amertarva hari ini?',
  },
];

const messages = ref<Message[]>(getInitialMessages());

// Watch for locale changes: if chat contains only initial welcome messages, switch them to current locale
watch(locale, () => {
  if (messages.value.length <= 2 && messages.value.every(m => m.role === 'assistant')) {
    messages.value = getInitialMessages();
  }
});

const scrollToBottom = () => {
  if (messagesEndRef.value) {
    messagesEndRef.value.scrollIntoView({ behavior: 'smooth' });
  }
};

watch([messages, isOpen], () => {
  if (isOpen.value) {
    nextTick(() => scrollToBottom());
  }
}, { deep: true });

const handleActionExecution = (action?: string | null) => {
  if (!action) return;
  setTimeout(() => {
    if (action === 'SCROLL_PRICING' || action === 'SCROLL_SERVICES') {
      const servicesSection = document.getElementById('services');
      if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (action === 'OPEN_WA') {
      const message = locale.value === 'en'
        ? 'Hello Amertarva, I would like to consult about web & system development.'
        : 'Halo Amertarva, saya tertarik dan ingin konsultasi serta melihat demo sistem digital Anda.';
      const whatsappUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    } else if (action === 'OPEN_ELEARNING') {
      window.open('http://localhost:4321', '_blank');
    }
  }, 600);
};

const getFallbackResponse = (query: string): { content: string; action?: string | null } => {
  const q = query.toLowerCase();

  // Security / Anti-Injection Pre-check
  if (q.includes('ignore previous') || q.includes('system prompt') || q.includes('jailbreak') || q.includes('dan mode') || q.includes('eval(') || q.includes('abaikan instruksi')) {
    return {
      content: locale.value === 'en'
        ? 'Sorry, your request violates Amerta Agent security policies. I am dedicated solely to Amertarva business services and E-Learning platform inquiries.'
        : 'Maaf, permintaan Anda terdeteksi melanggar kebijakan keamanan sistem Amerta Agent. Saya hanya melayani informasi bisnis seputar layanan Amertarva dan E-Learning.',
    };
  }

  // Anti-Coding Guardrail
  const codingKeywords = ['kode', 'coding', 'koding', 'program', 'script', 'skrip', 'tugas', 'soal coding', 'javascript', 'python', 'html', 'css', 'php', 'java', 'sql', 'c++', 'algoritma'];
  const isAskingCode = codingKeywords.some(kw => q.includes(kw)) && (q.includes('buat') || q.includes('bikin') || q.includes('tulis') || q.includes('jawab') || q.includes('contoh') || q.includes('tugas') || q.includes('pr') || q.includes('soal') || q.includes('fungsi'));

  if (isAskingCode) {
    return {
      content: locale.value === 'en'
        ? 'Sorry, Amerta Agent strictly serves as a business assistant for Amertarva and cannot answer or generate programming code. Is there anything else about our services I can help you with?'
        : 'Maaf, Amerta Agent murni bertugas sebagai asisten bisnis & layanan Amertarva, dan tidak dapat menjawab, menyelesaikan, atau membuatkan kode pemrograman. Ada yang ingin Anda tanyakan seputar layanan kami?',
    };
  }

  // E-Learning & LMS Queries
  if (q.includes('elearning') || q.includes('e-learning') || q.includes('lms') || q.includes('belajar') || q.includes('kursus') || q.includes('kelas') || q.includes('sekolah') || q.includes('akademi') || q.includes('ujian') || q.includes('soal')) {
    return {
      content: locale.value === 'en'
        ? 'Amertarva E-Learning is a White-Label LMS SaaS platform designed for educational institutions, academies, and tutoring centers. Key features include Virtual Classrooms, Exam Banks, Digital Certificates, Structured Learning Paths, and Student Analytics. You can explore our live E-Learning platform using the button below!'
        : 'Amertarva E-Learning adalah platform White-Label LMS SaaS untuk sekolah, kampus, bimbel, dan lembaga pelatihan. Memiliki fitur unggulan Kelas Virtual, Bank Soal & Ujian Online, Sertifikat Digital, Learning Paths, serta Analytics Siswa. Anda dapat langsung membuka dan mencoba platform E-Learning kami melalui tombol di bawah!',
      action: 'OPEN_ELEARNING'
    };
  }

  // Pricing & Fees Queries
  if (q.includes('harga') || q.includes('biaya') || q.includes('price') || q.includes('cost') || q.includes('paket') || q.includes('lisensi') || q.includes('tarif')) {
    return {
      content: locale.value === 'en'
        ? 'Our pricing is transparent and tailored based on project scope without hidden fees. We offer Company Profiles, E-Commerce, LMS Platforms, Custom Web Apps, and Mobile Apps. Check our service catalog below!'
        : 'Biaya di Amertarva dirancang transparan sesuai skala proyek tanpa biaya tersembunyi. Layanan kami mencakup Landing Page, Toko Online, Platform LMS E-Learning, Web App Kustom, dan Aplikasi Mobile. Klik tombol di bawah untuk melihat pilihan layanan!',
      action: 'SCROLL_SERVICES'
    };
  }

  // Consultation & WA Queries
  if (q.includes('demo') || q.includes('konsultasi') || q.includes('kontak') || q.includes('wa') || q.includes('whatsapp') || q.includes('contact') || q.includes('consult') || q.includes('sales')) {
    return {
      content: locale.value === 'en'
        ? 'You can schedule a free 1-on-1 consultation and live platform demo directly via WhatsApp with our engineering team.'
        : 'Anda dapat melakukan konsultasi gratis 1-on-1 dan demonstrasi platform langsung bersama tim engineer kami via WhatsApp.',
      action: 'OPEN_WA'
    };
  }

  // Web Services & Mobile Apps
  if (q.includes('web') || q.includes('sistem') || q.includes('mobile') || q.includes('android') || q.includes('ios') || q.includes('app') || q.includes('buat')) {
    return {
      content: locale.value === 'en'
        ? 'Amertarva develops high-performance enterprise Web Applications, Mobile Apps (Android & iOS), and Custom Software Systems tailored to your business needs.'
        : 'Amertarva melayani pembuatan Web Application enterprise, Aplikasi Mobile (Android & iOS), serta Sistem Digital Kustom yang disesuaikan penuh dengan kebutuhan bisnis Anda.',
      action: 'SCROLL_SERVICES'
    };
  }

  return {
    content: locale.value === 'en'
      ? 'Amertarva specializes in enterprise web applications, white-label e-learning platforms, and custom software systems. How can we help bring your project to life?'
      : 'Amertarva adalah penyedia solusi sistem digital enterprise, White-label E-Learning LMS, dan Web App kustom. Ada yang ingin Anda diskusikan lebih lanjut?',
  };
};

const suggestedChips = computed(() => {
  if (locale.value === 'en') {
    return [
      { label: 'Explore E-Learning', query: 'Tell me about Amertarva E-Learning platform' },
      { label: 'Pricing & Services Info', query: 'What are your services and pricing structure?' },
      { label: 'Schedule Consultation', query: 'I want to schedule a project consultation' },
    ];
  }
  return [
    { label: 'Coba E-Learning', query: 'Bagaimana fitur E-Learning dan LMS Amertarva?' },
    { label: 'Info Harga & Layanan', query: 'Berapa estimasi biaya dan layanan yang tersedia?' },
    { label: 'Konsultasi Proyek', query: 'Saya ingin menjadwalkan konsultasi proyek' },
  ];
});

const handleSendMessage = async (textOverride?: string) => {
  const rawText = typeof textOverride === 'string' ? textOverride : input.value;
  const textToSend = sanitizeInput(rawText);
  if (!textToSend.trim() || isLoading.value) return;

  const userMessage: Message = { role: 'user', content: textToSend };
  messages.value.push(userMessage);
  input.value = '';
  isLoading.value = true;
  await nextTick();
  scrollToBottom();

  // Prepare payload with language instruction context for backend AI
  const langContext = locale.value === 'en'
    ? '[User Language Preference: English. Please respond strictly in English.]'
    : '[Bahasa Pengguna: Bahasa Indonesia. Jawablah dalam Bahasa Indonesia.]';

  const apiPayload = [
    { role: 'system', content: langContext },
    ...messages.value.map(m => ({ role: m.role, content: m.content }))
  ];

  try {
    const response = await fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: apiPayload }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.success && data.data) {
        const reply = data.data;
        const assistantMsg: Message = {
          role: 'assistant',
          content: typeof reply === 'string' ? reply : reply.content,
          action: typeof reply === 'object' ? reply.action : null,
        };
        messages.value.push(assistantMsg);
        handleActionExecution(assistantMsg.action);
        isLoading.value = false;
        await nextTick();
        scrollToBottom();
        return;
      }
    }
    throw new Error('Fallback trigger');
  } catch (err) {
    setTimeout(async () => {
      const fallback = getFallbackResponse(textToSend);
      const assistantMsg: Message = {
        role: 'assistant',
        content: fallback.content,
        action: fallback.action,
      };
      messages.value.push(assistantMsg);
      handleActionExecution(fallback.action);
      isLoading.value = false;
      await nextTick();
      scrollToBottom();
    }, 500);
  }
};

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    handleSendMessage();
  }
};

const handleSuggestionClick = (query: string) => {
  handleSendMessage(query);
};
</script>

<template>
  <div
    class="fixed bottom-6 right-6 z-50 flex flex-col items-end transition-all duration-500"
    :class="
      showWidget
        ? 'opacity-100 translate-y-0'
        : 'opacity-0 translate-y-10 pointer-events-none'
    "
  >
    <!-- Chatbot Mockup Window -->
    <div
      class="mb-4 w-[340px] sm:w-[360px] bg-base border border-border shadow-2xl rounded-2xl overflow-hidden transition-all duration-500 origin-bottom-right flex flex-col"
      :class="
        isOpen
          ? 'opacity-100 scale-100 translate-y-0 h-[510px]'
          : 'opacity-0 scale-50 translate-y-10 pointer-events-none h-0'
      "
    >
      <!-- Chat Header -->
      <div class="bg-accent p-4 text-accent-contrast flex justify-between items-center relative overflow-hidden shrink-0">
        <div class="absolute -right-4 -top-4 w-20 h-20 bg-white/10 rounded-full blur-xl pointer-events-none" />
        <div class="flex items-center gap-3 relative z-10">
          <div class="w-10 h-10 bg-accent-contrast/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-accent-contrast/20">
            <Sparkles class="w-5 h-5 text-accent-contrast" />
          </div>
          <div>
            <div class="flex items-center gap-1">
              <h4 class="font-bold text-sm tracking-wide text-accent-contrast">Amerta Agent</h4>
              <ShieldCheck class="w-3.5 h-3.5 text-accent-contrast/90" />
            </div>
            <p class="text-[11px] opacity-90 flex items-center gap-1.5 mt-0.5 text-accent-contrast/90">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>{{ locale === 'en' ? 'Online • Instant AI responses' : 'Online • Balasan instan AI' }}</span>
            </p>
          </div>
        </div>

        <button
          type="button"
          @click="isOpen = false"
          class="hover:bg-black/10 p-1.5 rounded-md transition-colors relative z-10 focus:outline-none cursor-pointer text-accent-contrast"
          :aria-label="locale === 'en' ? 'Close Chat' : 'Tutup Chat'"
        >
          <X class="w-5 h-5" />
        </button>
      </div>

      <!-- Chat Body -->
      <div class="p-4 sm:p-5 flex-grow bg-body/5 overflow-y-auto flex flex-col gap-4 scroll-smooth">
        <p class="text-center text-[10px] text-body/70 uppercase tracking-widest font-bold mb-1">
          {{ locale === 'en' ? 'TODAY' : 'HARI INI' }}
        </p>

        <div class="flex flex-col gap-3.5">
          <div
            v-for="(msg, idx) in messages"
            :key="idx"
            class="flex flex-col"
            :class="msg.role === 'user' ? 'items-end' : 'items-start'"
          >
            <div
              class="p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed max-w-[88%] whitespace-pre-wrap flex flex-col gap-2"
              :class="
                msg.role === 'user'
                  ? 'bg-accent text-accent-contrast rounded-tr-sm font-medium'
                  : 'bg-base border border-border text-heading rounded-tl-sm font-normal'
              "
            >
              <div>{{ msg.content }}</div>

              <!-- Action Buttons rendered inside Assistant Message -->
              <div v-if="msg.role === 'assistant' && msg.action" class="mt-1 pt-2 border-t border-border/40 flex flex-col gap-1.5">
                <a
                  v-if="msg.action === 'OPEN_ELEARNING'"
                  href="http://localhost:4321"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-accent text-accent-contrast font-semibold text-xs shadow-sm hover:opacity-90 transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <GraduationCap class="w-4 h-4" />
                  <span>{{ locale === 'en' ? 'Open E-Learning Platform' : 'Buka E-Learning Platform' }}</span>
                  <ExternalLink class="w-3.5 h-3.5 opacity-80" />
                </a>

                <button
                  v-else-if="msg.action === 'OPEN_WA'"
                  type="button"
                  @click="handleActionExecution('OPEN_WA')"
                  class="inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600 text-white font-semibold text-xs shadow-sm hover:bg-emerald-500 transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <PhoneCall class="w-3.5 h-3.5" />
                  <span>{{ locale === 'en' ? 'Chat on WhatsApp' : 'Hubungi via WhatsApp' }}</span>
                </button>

                <button
                  v-else-if="msg.action === 'SCROLL_SERVICES' || msg.action === 'SCROLL_PRICING'"
                  type="button"
                  @click="handleActionExecution(msg.action)"
                  class="inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-accent/15 text-accent font-semibold text-xs border border-accent/30 hover:bg-accent hover:text-accent-contrast transition-all cursor-pointer"
                >
                  <span>{{ locale === 'en' ? 'View Services & Pricing' : 'Lihat Layanan & Harga' }}</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Typing Indicator -->
          <div v-if="isLoading" class="flex flex-col items-start">
            <div class="bg-base border border-border p-3.5 rounded-2xl rounded-tl-sm text-sm text-heading flex gap-1.5 items-center h-[42px]">
              <span class="w-2 h-2 bg-body/40 rounded-full animate-bounce" />
              <span class="w-2 h-2 bg-body/40 rounded-full animate-bounce [animation-delay:0.15s]" />
              <span class="w-2 h-2 bg-body/40 rounded-full animate-bounce [animation-delay:0.3s]" />
            </div>
          </div>
          <div ref="messagesEndRef" />
        </div>

        <!-- Quick Suggestions (only show if initial messages) -->
        <div v-if="messages.length <= 2 && !isLoading" class="flex flex-wrap gap-2 mt-2">
          <button
            v-for="chip in suggestedChips"
            :key="chip.label"
            type="button"
            @click="handleSuggestionClick(chip.query)"
            class="text-xs bg-accent/10 text-accent border border-accent/20 px-3 py-1.5 rounded-full hover:bg-accent hover:text-accent-contrast transition-colors text-left cursor-pointer font-medium"
          >
            {{ chip.label }}
          </button>
        </div>
      </div>

      <!-- Chat Input -->
      <div class="p-3 border-t border-border bg-base flex gap-2 items-center shrink-0">
        <input
          type="text"
          v-model="input"
          @keydown="handleKeyDown"
          :placeholder="locale === 'en' ? 'Type your message...' : 'Tulis pesan Anda...'"
          class="w-full bg-body/5 border border-border rounded-full px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-accent text-heading transition-colors"
        />
        <button
          type="button"
          @click="handleSendMessage()"
          :disabled="isLoading || !input.trim()"
          class="w-10 h-10 shrink-0 bg-accent rounded-full flex items-center justify-center text-accent-contrast hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            class="-ml-0.5"
          >
            <path d="m22 2-7 20-4-9-9-4Z" />
            <path d="M22 2 11 13" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Floating Toggle Button -->
    <button
      type="button"
      @click="isOpen = !isOpen"
      class="flex items-center justify-center rounded-full transition-all duration-300 relative focus:outline-none w-14 h-14 cursor-pointer shadow-lg"
      :class="
        isOpen
          ? 'bg-body/10 text-heading hover:bg-body/20'
          : 'bg-accent text-accent-contrast hover:-translate-y-1'
      "
      :aria-label="isOpen ? (locale === 'en' ? 'Close AI Assistant' : 'Tutup Asisten AI') : (locale === 'en' ? 'Open AI Assistant' : 'Buka Asisten AI')"
    >
      <X v-if="isOpen" class="w-6 h-6 text-heading" />
      <MessageSquareText v-else class="w-6 h-6 text-accent-contrast" />
    </button>
  </div>
</template>
