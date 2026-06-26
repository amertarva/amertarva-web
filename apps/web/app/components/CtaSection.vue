<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <section id="contact" class="py-24 lg:py-32 relative overflow-hidden">
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
      <Motion
        :initial="{ opacity: 0, scale: 0.95 }"
        :whileInView="{ opacity: 1, scale: 1 }"
        :inViewOptions="{ once: true, amount: 0.2 }"
        :transition="{ duration: 0.8, ease: 'easeOut' }"
        class="relative bg-secondary/5 border border-secondary/10 rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden backdrop-blur-sm shadow-xl block"
      >
        <!-- Background decoration glow -->
        <div class="absolute top-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
        <div class="absolute bottom-0 left-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

        <div class="relative max-w-2xl mx-auto text-center z-10">
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-6 text-heading">
            {{ t('cta.titleStart') }} <span class="text-accent">{{ t('cta.titleHighlight') }}</span>
          </h2>
          <p class="text-lg text-body leading-relaxed mb-10">
            {{ t('cta.description') }}
          </p>

          <a
            href="mailto:hello@amertarva.com"
            class="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-accent-contrast font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/35 hover:-translate-y-0.5"
          >
            {{ t('nav.getInTouch') }}
          </a>
        </div>
      </Motion>
    </div>
  </section>
</template>
