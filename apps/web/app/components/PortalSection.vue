<script setup lang="ts">
import { computed } from 'vue'
import { translations, type TranslationSchema } from '~/data/translations'

const { locale } = useI18n();

const portalData = computed(() => {
  return translations[locale.value]?.portal ?? (translations['id'] as TranslationSchema).portal;
});
</script>

<template>
  <section id="services" class="py-24 lg:py-32 relative">
    <!-- Ambient backlights -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-secondary/5 rounded-full blur-[140px]" />
    </div>

    <div class="relative max-w-7xl mx-auto px-6 lg:px-8">
      <!-- Header -->
      <Motion
        :initial="{ opacity: 0, y: 40 }"
        :whileInView="{ opacity: 1, y: 0 }"
        :inViewOptions="{ once: true, amount: 0.2 }"
        :transition="{ duration: 0.6, ease: 'easeOut' }"
      >
        <div class="max-w-2xl mb-16">
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 text-heading">
            {{ portalData.title }}
          </h2>
          <p class="text-lg text-body leading-relaxed">
            {{ portalData.description }}
          </p>
        </div>
      </Motion>

      <!-- Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        <Motion
          v-for="(service, idx) in portalData.services"
          :key="service.id"
          :initial="{ opacity: 0, y: 40 }"
          :whileInView="{ opacity: 1, y: 0 }"
          :inViewOptions="{ once: true, amount: 0.1 }"
          :transition="{ duration: 0.6, delay: idx * 0.1, ease: 'easeOut' }"
          class="group bg-secondary/5 border border-secondary/10 rounded-2xl p-8 transition-all duration-300 hover:bg-secondary/10 hover:border-secondary/20 hover:shadow-xl hover:shadow-secondary/5 hover:-translate-y-1"
        >
          <div>
            <h3 class="text-xl font-bold text-heading mb-3 group-hover:text-accent transition-colors duration-200">
              {{ service.title }}
            </h3>
            <p class="text-body leading-relaxed">{{ service.description }}</p>
          </div>
        </Motion>
      </div>
    </div>
  </section>
</template>
