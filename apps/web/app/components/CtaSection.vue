<script setup lang="ts">
import { MessageSquare, Mail, ShieldCheck } from 'lucide-vue-next'

const { t, locale } = useI18n();

const guarantees = computed(() => {
  if (locale.value === 'en') {
    return ['No Hidden Fees', 'Transparent Proposal & Scope', 'Strict NDA & Data Security'];
  }
  return ['Tanpa Biaya Tersembunyi', 'Proposal & Scope Transparan', 'Perjanjian NDA & Keamanan Data'];
});
</script>

<template>
  <section id="contact" class="relative py-28 lg:py-40 overflow-hidden w-full border-y border-border">
    <!-- Ambient Lighting & Background Overlay -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <img
        :src="'/images/cta-bg.png'"
        alt="Amertarva Studio Collaboration Background"
        class="w-full h-full object-cover opacity-25 dark:opacity-30 mix-blend-multiply dark:mix-blend-luminosity filter blur-[0.5px] scale-105"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-base/95 via-base/80 to-base/95" />
    </div>

    <div class="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
      <Motion
        :initial="{ opacity: 0, y: 30 }"
        :whileInView="{ opacity: 1, y: 0 }"
        :inViewOptions="{ once: true, amount: 0.2 }"
        :transition="{ duration: 0.6, ease: 'easeOut' }"
      >
        <!-- Section Title -->
        <h2 class="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8 text-heading leading-[1.08]">
          {{ t('cta.titleStart') }}
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-accent via-secondary-dark to-accent">
            {{ t('cta.titleHighlight') }}
          </span>
        </h2>

        <!-- Description -->
        <p class="text-lg sm:text-2xl text-body leading-relaxed mb-12 font-normal max-w-3xl mx-auto">
          {{ t('cta.description') }}
        </p>

        <!-- High Impact Action Buttons -->
        <div class="flex flex-wrap items-center justify-center gap-4 mb-12">
          <!-- WhatsApp Primary Action -->
          <a
            href="https://wa.me/6281234567890?text=Halo%20Amertarva,%20saya%20ingin%20berdiskusi%20tentang%20proyek%20sistem/website"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center gap-3 bg-accent hover:bg-accent/90 text-accent-contrast font-sans text-sm sm:text-base font-semibold px-7 py-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5 group min-w-[220px]"
          >
            <MessageSquare class="w-5 h-5 shrink-0" />
            <span class="text-accent-contrast">{{ t('cta.whatsapp') }}</span>
          </a>

          <!-- Email Secondary Action -->
          <a
            href="mailto:hello@amertarva.com"
            class="inline-flex items-center justify-center gap-3 border border-border/80 hover:border-accent/40 bg-secondary/10 hover:bg-secondary/20 font-sans text-sm sm:text-base font-semibold px-7 py-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5 min-w-[220px]"
          >
            <Mail class="w-5 h-5 text-accent shrink-0" />
            <span class="text-heading">hello@amertarva.com</span>
          </a>
        </div>

        <!-- Trust & Guarantees Checklist -->
        <div class="pt-8 border-t border-border/80 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs sm:text-sm font-sans font-medium text-body/90">
          <div
            v-for="item in guarantees"
            :key="item"
            class="flex items-center gap-2.5"
          >
            <ShieldCheck class="w-4.5 h-4.5 text-accent shrink-0" />
            <span>{{ item }}</span>
          </div>
        </div>
      </Motion>
    </div>
  </section>
</template>
