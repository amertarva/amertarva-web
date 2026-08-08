<script setup lang="ts">
import { computed } from 'vue'
import { translations, type TranslationSchema } from '~/data/translations'

const { locale } = useI18n();

const workData = computed(() => {
  return translations[locale.value]?.work ?? (translations['id'] as TranslationSchema).work;
});
</script>

<template>
  <section id="work" class="py-24 lg:py-32 relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <Motion
        :initial="{ opacity: 0, y: 40 }"
        :whileInView="{ opacity: 1, y: 0 }"
        :inViewOptions="{ once: true, amount: 0.2 }"
        :transition="{ duration: 0.6, ease: 'easeOut' }"
      >
        <div class="max-w-2xl mb-16">

          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 text-heading">
            {{ workData.title }}
          </h2>
          <p class="text-base sm:text-lg text-body leading-relaxed font-normal">
            {{ workData.description }}
          </p>
        </div>
      </Motion>

      <!-- Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        <Motion
          v-for="(item, idx) in workData.items"
          :key="item.id"
          :initial="{ opacity: 0, y: 40 }"
          :whileInView="{ opacity: 1, y: 0 }"
          :inViewOptions="{ once: true, amount: 0.1 }"
          :transition="{ duration: 0.6, delay: idx * 0.15, ease: 'easeOut' }"
          class="group bg-base border border-border rounded-xl overflow-hidden transition-all duration-300 hover:border-accent/40 hover:-translate-y-1 flex flex-col justify-between"
        >
          <!-- Image Container -->
          <div class="relative aspect-[16/10] bg-secondary/10 overflow-hidden border-b border-border">
            <div
              v-if="item.isPlaceholder"
              class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-secondary/10 to-accent/5 p-4"
            >
              <span class="text-xs font-mono font-bold tracking-widest uppercase px-3 py-1 rounded-md bg-base/80 border border-border text-heading">
                [ {{ workData.comingSoon }} ]
              </span>
            </div>
            <img
              v-else
              :src="item.image"
              :alt="item.title"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <!-- Content -->
          <div class="p-6 flex-1 flex flex-col justify-between">
            <div>
              <span class="text-[10px] font-mono font-bold tracking-wider uppercase text-accent mb-2 block">
                // {{ item.category }}
              </span>
              <h3 class="text-base font-extrabold text-heading mb-2 group-hover:text-accent transition-colors duration-200">
                {{ item.title }}
              </h3>
              <p class="text-xs sm:text-sm text-body leading-relaxed font-normal">{{ item.description }}</p>
            </div>
          </div>
        </Motion>
      </div>
    </div>
  </section>
</template>
