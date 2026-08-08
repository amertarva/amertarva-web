<script setup lang="ts">
import { computed } from 'vue';
import { MessageSquare, ArrowRight, ShieldCheck, Mail } from 'lucide-vue-next';
import type { ServiceDetailSchema } from '~/data/serviceDetails';
import { getServiceWhatsAppUrl } from '~/utils/whatsapp';

const props = defineProps<{
  service: ServiceDetailSchema;
}>();

const { locale } = useI18n();

const whatsAppUrl = computed(() => {
  return getServiceWhatsAppUrl(props.service.title, locale.value);
});

const guarantees = computed(() => {
  if (locale.value === 'en') {
    return ['No Hidden Fees', 'Transparent Proposal & Scope', 'Strict NDA & Data Security'];
  }
  return ['Tanpa Biaya Tersembunyi', 'Proposal & Scope Transparan', 'Perjanjian NDA & Keamanan Data'];
});
</script>

<template>
  <section class="relative py-24 lg:py-36 overflow-hidden w-full bg-grid-pattern border-t border-border">
    <div class="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
      <Motion
        :initial="{ opacity: 0, y: 30 }"
        :whileInView="{ opacity: 1, y: 0 }"
        :inViewOptions="{ once: true, amount: 0.2 }"
        :transition="{ duration: 0.6, ease: 'easeOut' }"
      >
        <span class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/25 text-accent text-xs font-mono font-semibold uppercase tracking-wider mb-6">
          <span class="w-2 h-2 rounded-full bg-accent animate-pulse" />
          {{ locale === 'en' ? 'Direct Consultation' : 'Konsultasi Langsung' }}
        </span>

        <!-- Section Title -->
        <h2 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 text-heading leading-[1.12]">
          {{ service.ctaPrompt }}
        </h2>

        <!-- Description -->
        <p class="text-base sm:text-xl text-body leading-relaxed mb-10 font-normal max-w-2xl mx-auto">
          {{ locale === 'en'
            ? 'Get a free consultation and project scope estimation directly with our senior engineering team via WhatsApp.'
            : 'Dapatkan konsultasi gratis dan estimasi pengerjaan proyek langsung bersama tim engineer Amertarva via WhatsApp.' }}
        </p>

        <!-- Action Buttons -->
        <div class="flex flex-wrap items-center justify-center gap-4 mb-12">
          <!-- WhatsApp Primary Action -->
          <a
            :href="whatsAppUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center gap-3 bg-accent hover:bg-accent/90 text-accent-contrast font-sans text-sm sm:text-base font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5 group min-w-[240px] shadow-lg shadow-accent/20"
          >
            <MessageSquare class="w-5 h-5 shrink-0" />
            <span>{{ locale === 'en' ? 'Consult via WhatsApp' : 'Konsultasi via WhatsApp' }}</span>
            <ArrowRight class="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
          </a>

          <!-- Email Secondary Action -->
          <a
            href="mailto:hello@amertarva.com"
            class="inline-flex items-center justify-center gap-3 border border-border/80 hover:border-accent/40 bg-base hover:bg-secondary/10 font-sans text-sm sm:text-base font-semibold px-7 py-4 rounded-xl transition-all duration-300 min-w-[220px]"
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
