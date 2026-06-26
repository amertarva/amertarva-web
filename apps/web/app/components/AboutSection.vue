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
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
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
          <div class="text-lg text-body leading-relaxed space-y-4">
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
          class="group bg-secondary/5 border border-secondary/10 rounded-2xl p-6 transition-all duration-300 hover:bg-secondary/10 hover:border-secondary/20 hover:shadow-lg hover:shadow-secondary/5 hover:-translate-y-1"
        >
          <div>
            <div class="mb-4">
              <component :is="valueIcons[idx]" class="w-8 h-8 text-accent group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 class="text-lg font-bold text-heading mb-2 group-hover:text-accent transition-colors duration-200">
              {{ value.title }}
            </h3>
            <p class="text-sm text-body leading-relaxed">{{ value.description }}</p>
          </div>
        </Motion>
      </div>
    </div>
  </section>
</template>
