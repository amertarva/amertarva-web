<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <section class="relative min-h-screen flex items-center overflow-hidden">
    <!-- Background decoration -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-40 -right-40 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] animate-float-slow" />
    </div>

    <div class="relative max-w-7xl mx-auto px-6 lg:px-8 pt-36 pb-20 w-full">
      <div class="max-w-3xl">
        <!-- Heading -->
        <Motion
          :initial="{ opacity: 0, y: 30 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6, ease: 'easeOut' }"
        >
          <h1 class="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6 text-heading">
            {{ t('hero.titleStart') }}
            <span class="text-accent">{{ t('hero.titleHighlight') }}</span>
            {{ t('hero.titleEnd') }}
          </h1>
        </Motion>

        <!-- Subheading -->
        <Motion
          :initial="{ opacity: 0, y: 30 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6, delay: 0.2, ease: 'easeOut' }"
        >
          <p class="text-lg sm:text-xl text-body max-w-xl mb-10 leading-relaxed">
            {{ t('hero.description') }}
          </p>
        </Motion>

        <!-- CTAs -->
        <Motion
          :initial="{ opacity: 0, y: 30 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6, delay: 0.4, ease: 'easeOut' }"
        >
          <div class="flex flex-wrap gap-4">
            <a
              href="#contact"
              class="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-accent-contrast font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/35 hover:-translate-y-0.5"
            >
              {{ t('hero.ctaPrimary') }}
            </a>
            <a
              href="#services"
              class="inline-flex items-center gap-2 border border-secondary bg-transparent hover:bg-secondary/10 text-heading font-semibold px-8 py-4 rounded-xl transition-all duration-300"
            >
              {{ t('hero.ctaSecondary') }}
            </a>
          </div>
        </Motion>
      </div>
    </div>
  </section>
</template>
