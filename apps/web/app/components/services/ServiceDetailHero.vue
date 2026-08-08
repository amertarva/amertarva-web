<script setup lang="ts">
import { computed } from 'vue';
import { ArrowLeft, MessageSquare, ArrowRight, ShieldCheck, Zap, Clock, Code2 } from 'lucide-vue-next';
import type { ServiceDetailSchema } from '~/data/serviceDetails';
import { getServiceWhatsAppUrl } from '~/utils/whatsapp';

const props = defineProps<{
  service: ServiceDetailSchema;
}>();

const { locale } = useI18n();

const whatsAppUrl = computed(() => {
  return getServiceWhatsAppUrl(props.service.title, locale.value);
});

const metricIcons = [Clock, Zap, Code2, ShieldCheck];

const ctaText = computed(() => {
  return locale.value === 'en' ? 'Consult via WhatsApp' : 'Konsultasi via WhatsApp';
});

const exploreText = computed(() => {
  return locale.value === 'en' ? 'Explore Features' : 'Lihat Fitur Utama';
});

const backText = computed(() => {
  return locale.value === 'en' ? 'Back to Services' : 'Kembali ke Layanan';
});
</script>

<template>
  <section class="relative pt-12 pb-16 lg:pt-20 lg:pb-24 overflow-hidden border-b border-border bg-grid-pattern">
    <!-- Ambient Blur Lighting -->
    <div class="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/15 blur-[120px] rounded-full pointer-events-none" />

    <div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Top Navigation & Breadcrumbs -->
      <div class="flex flex-wrap items-center justify-between gap-4 mb-8">
        <NuxtLink
          to="/#services"
          class="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-body hover:text-accent transition-colors group"
        >
          <ArrowLeft class="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>{{ backText }}</span>
        </NuxtLink>

        <!-- Breadcrumb -->
        <div class="flex items-center gap-2 text-xs font-mono text-body/70">
          <NuxtLink to="/" class="hover:text-heading transition-colors">Home</NuxtLink>
          <span>/</span>
          <NuxtLink to="/#services" class="hover:text-heading transition-colors">Services</NuxtLink>
          <span>/</span>
          <span class="text-accent font-semibold truncate max-w-[160px] sm:max-w-none">{{ service.id }}</span>
        </div>
      </div>

      <!-- Main Hero Content -->
      <Motion
        :initial="{ opacity: 0, y: 25 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.5, ease: 'easeOut' }"
        class="max-w-4xl mx-auto text-center"
      >
        <!-- Badge -->
        <span class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/25 text-accent text-xs font-mono font-semibold uppercase tracking-wider mb-6">
          <span class="w-2 h-2 rounded-full bg-accent animate-pulse" />
          {{ service.badge }}
        </span>

        <!-- Title -->
        <h1 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-heading tracking-tight leading-[1.12] mb-6">
          {{ service.title }}
        </h1>

        <!-- Subtitle / Description -->
        <p class="text-base sm:text-xl text-body leading-relaxed max-w-3xl mx-auto mb-10 font-normal">
          {{ service.subtitle }}
        </p>

        <!-- Action Buttons -->
        <div class="flex flex-wrap items-center justify-center gap-4 mb-16">
          <a
            :href="whatsAppUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-xl bg-accent text-accent-contrast hover:bg-accent/90 text-sm sm:text-base font-semibold tracking-wide shadow-lg shadow-accent/20 transition-all duration-300 hover:-translate-y-0.5 group min-w-[220px]"
          >
            <MessageSquare class="w-5 h-5 shrink-0" />
            <span>{{ ctaText }}</span>
            <ArrowRight class="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
          </a>

          <a
            href="#features"
            class="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl border border-border/80 bg-base/80 hover:bg-secondary/10 hover:border-accent/40 text-heading text-sm sm:text-base font-semibold tracking-wide transition-all duration-300 min-w-[180px]"
          >
            <span>{{ exploreText }}</span>
          </a>
        </div>
      </Motion>

      <!-- Key Metrics Bar -->
      <Motion
        :initial="{ opacity: 0, y: 30 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.5, delay: 0.15, ease: 'easeOut' }"
        class="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-8 border-t border-border/70"
      >
        <div
          v-for="(metric, idx) in service.metrics"
          :key="metric.label"
          class="p-4 sm:p-5 rounded-2xl bg-base/60 backdrop-blur-md border border-border/80 hover:border-accent/30 transition-all duration-300"
        >
          <div class="flex items-center gap-2 text-accent mb-2">
            <component :is="metricIcons[idx % metricIcons.length]" class="w-4 h-4 shrink-0" />
            <span class="text-[11px] font-mono font-bold uppercase tracking-wider text-body/80 truncate">{{ metric.label }}</span>
          </div>
          <p class="text-xl sm:text-2xl font-extrabold text-heading mb-1">{{ metric.value }}</p>
          <p class="text-xs text-body/80 font-normal leading-tight">{{ metric.subtext }}</p>
        </div>
      </Motion>
    </div>
  </section>
</template>
