<script setup lang="ts">
import { computed } from 'vue'
import { translations, type TranslationSchema } from '~/data/translations'
import { ecosystemProducts } from '~/data/ecosystem'
import EcosystemCard from './EcosystemCard.vue'

const { locale } = useI18n()

const ecosystemData = computed(() => {
  return translations[locale.value]?.ecosystem ?? (translations['id'] as TranslationSchema).ecosystem
})

const localizedProducts = computed(() => {
  return ecosystemProducts.map((product) => {
    const trans = ecosystemData.value[product.colorVariant]
    return {
      ...product,
      tag: trans.tag,
      title: trans.title,
      description: trans.description,
      features: trans.features,
      cta: trans.cta,
    }
  })
})
</script>

<template>
  <section id="ecosystem" class="py-24 lg:py-32 relative">
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
      <!-- Header -->
      <Motion
        :initial="{ opacity: 0, y: 40 }"
        :whileInView="{ opacity: 1, y: 0 }"
        :inViewOptions="{ once: true, amount: 0.2 }"
        :transition="{ duration: 0.6, ease: 'easeOut' }"
      >
        <div class="max-w-2xl mb-16">
          <p class="text-secondary text-xs font-semibold uppercase tracking-widest mb-3">
            {{ ecosystemData.badge }}
          </p>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 text-heading">
            {{ ecosystemData.titleStart }}
            <span class="text-accent">{{ ecosystemData.titleHighlight }}</span>
          </h2>
          <p class="text-lg text-body leading-relaxed">
            {{ ecosystemData.description }}
          </p>
        </div>
      </Motion>

      <!-- Cards Grid -->
      <div class="grid md:grid-cols-2 gap-6 lg:gap-8">
        <Motion
          v-for="(product, idx) in localizedProducts"
          :key="product.id"
          :initial="{ opacity: 0, y: 40 }"
          :whileInView="{ opacity: 1, y: 0 }"
          :inViewOptions="{ once: true, amount: 0.1 }"
          :transition="{ duration: 0.6, delay: idx * 0.15, ease: 'easeOut' }"
        >
          <EcosystemCard :product="product" />
        </Motion>
      </div>
    </div>
  </section>
</template>
