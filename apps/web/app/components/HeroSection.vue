<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <section class="relative min-h-screen flex items-center overflow-hidden pt-28 pb-20">
    <!-- Background Image Overlay with Gradient Fade -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <img
        :src="'/images/hero-bg.png'"
        alt="Amertarva Agency Workstation"
        class="w-full h-full object-cover opacity-20 dark:opacity-25 mix-blend-multiply dark:mix-blend-luminosity filter blur-[0.5px] scale-105"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-base/50 via-base/30 to-base" />
    </div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div class="max-w-4xl">
        <!-- Main Title -->
        <Motion
          :initial="{ opacity: 0, y: 30 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6, delay: 0.1, ease: 'easeOut' }"
        >
          <h1 class="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] mb-8 text-heading">
            {{ t('hero.titleStart') }}
            <span class="text-accent underline underline-offset-8 decoration-accent/30">{{ t('hero.titleHighlight') }}</span>
            {{ t('hero.titleEnd') }}
          </h1>
        </Motion>

        <!-- Subtitle -->
        <Motion
          :initial="{ opacity: 0, y: 30 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6, delay: 0.2, ease: 'easeOut' }"
        >
          <p class="text-lg sm:text-xl text-body max-w-2xl mb-10 leading-relaxed font-normal">
            {{ t('hero.description') }}
          </p>
        </Motion>

        <!-- Action CTAs -->
        <Motion
          :initial="{ opacity: 0, y: 30 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6, delay: 0.3, ease: 'easeOut' }"
        >
          <div class="flex flex-wrap items-center gap-4 mb-14">
            <a
              href="#contact"
              class="inline-flex items-center gap-2.5 bg-accent hover:bg-accent/90 text-accent-contrast font-sans text-sm font-semibold px-7 py-3.5 rounded-xl transition-all duration-300 hover:-translate-y-0.5"
            >
              {{ t('hero.ctaPrimary') }}
            </a>
            <a
              href="#services"
              class="inline-flex items-center gap-2.5 border border-border/80 hover:border-accent/40 bg-secondary/10 hover:bg-secondary/20 font-sans text-sm font-semibold px-7 py-3.5 rounded-xl transition-all duration-300"
            >
              <span class="text-heading">{{ t('hero.ctaSecondary') }}</span>
            </a>
          </div>
        </Motion>

        <!-- Metrics Stats Counter Grid -->
        <Motion
          :initial="{ opacity: 0, y: 30 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6, delay: 0.4, ease: 'easeOut' }"
        >
          <div class="grid grid-cols-3 gap-4 pt-8 border-t border-border/80 max-w-2xl">
            <div class="pr-4 border-r border-border/80">
              <div class="text-2xl sm:text-3xl font-mono font-extrabold text-heading">[DATA ASLI]</div>
              <div class="text-xs text-body font-medium uppercase tracking-wider mt-1">{{ t('hero.stats.projects') }}</div>
            </div>
            <div class="px-2 pr-4 border-r border-border/80">
              <div class="text-2xl sm:text-3xl font-mono font-extrabold text-heading">[DATA ASLI]</div>
              <div class="text-xs text-body font-medium uppercase tracking-wider mt-1">{{ t('hero.stats.clients') }}</div>
            </div>
            <div class="pl-2">
              <div class="text-2xl sm:text-3xl font-mono font-extrabold text-accent">[DATA ASLI]</div>
              <div class="text-xs text-body font-medium uppercase tracking-wider mt-1">{{ t('hero.stats.experience') }}</div>
            </div>
          </div>
        </Motion>
      </div>
    </div>
  </section>
</template>
