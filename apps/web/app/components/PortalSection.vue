<script setup lang="ts">
import { computed } from 'vue'
import { Layout, ShoppingBag, GraduationCap, Code2, Smartphone, Wrench, Check, ArrowRight, MessageSquare } from 'lucide-vue-next'
import { translations, type TranslationSchema } from '~/data/translations'
import { getServiceWhatsAppUrl } from '~/utils/whatsapp'

const { locale } = useI18n();

const portalData = computed(() => {
  return translations[locale.value]?.portal ?? (translations['id'] as TranslationSchema).portal;
});

const serviceIcons = [Layout, ShoppingBag, GraduationCap, Code2, Smartphone, Wrench];

const serviceUseCases = computed(() => {
  if (locale.value === 'en') {
    return [
      ['Company Profile', 'Personal Brand', 'SMEs & Startups'],
      ['Online Store', 'Product Catalog', 'Payment Gateway'],
      ['E-Learning', 'Schools & Academies', 'Virtual Classes'],
      ['Personal Use', 'Business Ops', 'Academic Projects & Tasks'],
      ['Android & iOS', 'Business & SMEs', 'Coursework & Tasks'],
      ['Bug Fixes', 'Content Updates', 'Ongoing Support'],
    ];
  }
  return [
    ['Company Profile', 'Personal Brand', 'UMKM & Startup'],
    ['Toko Online', 'Katalog Produk', 'Payment Gateway'],
    ['E-Learning', 'Institusi & Sekolah', 'Kelas Virtual'],
    ['Penggunaan Personal', 'Operasional Bisnis', 'Tugas & Proyek Akademis'],
    ['Android & iOS', 'Bisnis & UMKM', 'Tugas & Proyek Kuliah'],
    ['Perbaikan Bug', 'Pembaruan Konten', 'Dukungan Rutin'],
  ];
});

const detailText = computed(() => locale.value === 'en' ? 'View Details' : 'Lihat Detail Layanan');
const waConsultText = computed(() => locale.value === 'en' ? 'Consult via WA' : 'Konsultasi WA');

const getWaLink = (title: string) => {
  return getServiceWhatsAppUrl(title, locale.value);
};
</script>

<template>
  <section id="services" class="py-24 lg:py-36 relative">
    <div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <Motion
        :initial="{ opacity: 0, y: 35 }"
        :whileInView="{ opacity: 1, y: 0 }"
        :inViewOptions="{ once: true, amount: 0.2 }"
        :transition="{ duration: 0.6, ease: 'easeOut' }"
      >
        <div class="max-w-3xl mb-16 lg:mb-20 text-center mx-auto">
          <h2 class="text-3xl sm:text-5xl font-extrabold tracking-tight mb-6 text-heading leading-[1.15]">
            {{ portalData.titleStart }} <span class="text-accent">{{ portalData.titleHighlight }}</span>
          </h2>

          <p class="text-base sm:text-lg text-body leading-relaxed font-normal">
            {{ portalData.description }}
          </p>
        </div>
      </Motion>

      <!-- Sticky Stacked Cards Container -->
      <div class="relative flex flex-col gap-8 pb-32 max-w-5xl mx-auto">
        <Motion
          v-for="(service, idx) in portalData.services"
          :key="service.id"
          :initial="{ opacity: 0, y: 40 }"
          :whileInView="{ opacity: 1, y: 0 }"
          :inViewOptions="{ once: true, amount: 0.1 }"
          :transition="{ duration: 0.5, delay: idx * 0.08, ease: 'easeOut' }"
          class="sticky w-full will-change-transform"
          :style="{ top: `calc(6rem + ${idx * 2.2}rem)`, zIndex: 10 + idx }"
        >
          <div
            class="group rounded-[2rem] border border-border/80 bg-base/95 backdrop-blur-md p-7 sm:p-10 md:p-12 transition-all duration-500 hover:border-accent/40 overflow-hidden shadow-lg"
          >
            <!-- Hover Gradient -->
            <div class="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-secondary/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />

            <div class="relative z-10 flex flex-col md:flex-row gap-8 lg:gap-12 items-start md:items-center justify-between">
              <!-- Left Side: Icon, Number, Title & Description -->
              <div class="flex-1">
                <div class="flex items-center justify-between gap-4 mb-6">
                  <div class="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/25 flex items-center justify-center text-accent group-hover:scale-105 group-hover:bg-accent group-hover:text-accent-contrast transition-all duration-300">
                    <component :is="serviceIcons[idx % serviceIcons.length]" class="w-7 h-7" />
                  </div>
                  <span class="text-xs font-mono font-bold text-body/60">
                    0{{ idx + 1 }} / 0{{ portalData.services.length }}
                  </span>
                </div>

                <NuxtLink :to="`/services/${service.id}`" class="block group/title">
                  <h3 class="text-xl sm:text-2xl lg:text-3xl font-extrabold text-heading mb-3 group-hover/title:text-accent transition-colors duration-200 leading-snug">
                    {{ service.title }}
                  </h3>
                </NuxtLink>

                <p class="text-sm sm:text-base text-body leading-relaxed font-normal max-w-xl mb-6">
                  {{ service.description }}
                </p>

                <!-- Quick Detail Link Badge -->
                <NuxtLink
                  :to="`/services/${service.id}`"
                  class="inline-flex items-center gap-2 text-xs font-mono font-semibold text-accent hover:underline group/link"
                >
                  <span>{{ detailText }}</span>
                  <ArrowRight class="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                </NuxtLink>
              </div>

              <!-- Right Side: Target Use Cases & Action Buttons -->
              <div class="w-full md:w-80 shrink-0 md:border-l md:border-border/80 md:pl-8 lg:pl-10 flex flex-col justify-between h-full pt-4 md:pt-0 border-t border-border/80 md:border-t-0">
                <div class="mb-6">
                  <span class="block text-[11px] font-mono font-bold uppercase tracking-wider text-body/60 mb-3">
                    {{ locale === 'en' ? 'Ideal For' : 'Ideal Untuk' }}
                  </span>
                  <ul class="space-y-2.5">
                    <li
                      v-for="useCase in serviceUseCases[idx % serviceUseCases.length]"
                      :key="useCase"
                      class="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-heading"
                    >
                      <Check class="w-4 h-4 text-accent shrink-0" stroke-width="2.5" />
                      <span>{{ useCase }}</span>
                    </li>
                  </ul>
                </div>

                <!-- Action Button Group -->
                <div class="flex flex-col gap-2.5 w-full">
                  <NuxtLink
                    :to="`/services/${service.id}`"
                    class="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-accent text-accent-contrast hover:bg-accent/90 text-xs font-semibold tracking-wide transition-all duration-300 group/btn w-full shadow-md"
                  >
                    <span>{{ detailText }}</span>
                    <ArrowRight class="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </NuxtLink>

                  <a
                    :href="getWaLink(service.title)"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-border/80 bg-base/80 hover:bg-secondary/10 hover:border-accent/40 text-heading text-xs font-semibold tracking-wide transition-all duration-300 w-full"
                  >
                    <MessageSquare class="w-3.5 h-3.5 text-accent" />
                    <span>{{ waConsultText }}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Motion>
      </div>
    </div>
  </section>
</template>
