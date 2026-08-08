<script setup lang="ts">
import { computed } from 'vue'
import { Target, Handshake, Zap, Wrench } from 'lucide-vue-next'
import { translations, type TranslationSchema } from '~/data/translations'

const { locale } = useI18n();

const aboutData = computed(() => {
  return translations[locale.value]?.about ?? (translations['id'] as TranslationSchema).about;
});

const valueIcons = [Target, Handshake, Zap, Wrench];
</script>

<template>
  <section id="about" class="py-24 lg:py-32 relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <Motion
        :initial="{ opacity: 0, y: 40 }"
        :whileInView="{ opacity: 1, y: 0 }"
        :inViewOptions="{ once: true, amount: 0.2 }"
        :transition="{ duration: 0.6, ease: 'easeOut' }"
      >
        <div class="max-w-3xl mb-16">
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-6 text-heading">
            {{ aboutData.titleStart }} <span class="text-accent">{{ aboutData.titleHighlight }}</span>
          </h2>
          <div class="text-base sm:text-lg text-body leading-relaxed space-y-4 font-normal">
            <p v-for="(paragraph, idx) in aboutData.description.split('\n\n')" :key="idx">
              {{ paragraph }}
            </p>
          </div>
        </div>
      </Motion>

      <!-- Values Grid -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Motion
          v-for="(value, idx) in aboutData.values"
          :key="value.title"
          :initial="{ opacity: 0, y: 40 }"
          :whileInView="{ opacity: 1, y: 0 }"
          :inViewOptions="{ once: true, amount: 0.1 }"
          :transition="{ duration: 0.6, delay: idx * 0.15, ease: 'easeOut' }"
          class="group bg-base border border-border rounded-xl p-6 transition-all duration-300 hover:border-accent/40 hover:-translate-y-1"
        >
          <div>
            <div class="flex items-center justify-between mb-5">
              <div class="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:scale-105 group-hover:bg-accent group-hover:text-accent-contrast transition-all duration-300">
                <component :is="valueIcons[idx]" class="w-5 h-5" />
              </div>
              <span class="text-xs font-mono font-bold text-body/40">
                0{{ idx + 1 }}
              </span>
            </div>
            <h3 class="text-base font-extrabold text-heading mb-2 group-hover:text-accent transition-colors duration-200">
              {{ value.title }}
            </h3>
            <p class="text-xs sm:text-sm text-body leading-relaxed font-normal">{{ value.description }}</p>
          </div>
        </Motion>
      </div>
    </div>
  </section>
</template>
