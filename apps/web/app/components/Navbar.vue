<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { Menu, X, Cpu } from 'lucide-vue-next'

const { theme, toggleTheme, initTheme } = useTheme();
const { t, locale, initLocale } = useI18n();

onMounted(() => {
  initTheme();
  initLocale();
});

const isScrolled = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

const navLinks = computed(() => [
  { label: t('nav.about'), href: '/#about' },
  { label: t('nav.services'), href: '/#services' },
  { label: locale.value === 'en' ? 'Workflow' : 'Alur Kerja', href: '/#process' },
  { label: locale.value === 'en' ? 'Portfolio' : 'Portofolio', href: '/#work' },
  { label: t('nav.contact'), href: '/#contact' },
]);

const mobileMenuOpen = ref(false);
</script>

<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="
      isScrolled
        ? 'bg-base/85 backdrop-blur-xl border-b border-border shadow-sm'
        : 'bg-base/60 backdrop-blur-md border-b border-border/40'
    "
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 lg:h-20">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-3 group">
          <div
            class="w-9 h-9 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-accent-contrast"
          >
            <Cpu class="w-5 h-5" />
          </div>
          <div class="flex flex-col">
            <span class="text-heading font-extrabold text-base tracking-tight transition-colors duration-200 group-hover:text-accent">
              AMERTARVA
            </span>
            <span class="text-[9px] font-mono tracking-widest text-body/60 uppercase">Tech Agency</span>
          </div>
        </NuxtLink>

        <!-- Desktop Nav -->
        <div class="hidden md:flex items-center gap-1">
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            class="relative px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-body hover:text-heading transition-all duration-200 rounded-md hover:bg-secondary/10"
          >
            {{ link.label }}
          </a>
        </div>

        <!-- Desktop Actions -->
        <div class="hidden md:flex items-center gap-3">
          <LocaleToggle />
          <ThemeToggle />
          <a
            href="/#contact"
            class="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-accent-contrast font-sans text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded-xl transition-all duration-300 hover:-translate-y-0.5"
          >
            {{ t('nav.getInTouch') }}
          </a>
        </div>

        <!-- Mobile Menu Button -->
        <button
          type="button"
          class="md:hidden p-2 text-body hover:text-heading transition-colors"
          @click="mobileMenuOpen = !mobileMenuOpen"
          aria-label="Toggle Menu"
        >
          <X v-if="mobileMenuOpen" class="w-6 h-6" />
          <Menu v-else class="w-6 h-6" />
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="mobileMenuOpen"
        class="md:hidden bg-base/95 backdrop-blur-lg border-b border-secondary/10"
      >
        <div class="px-6 py-6 space-y-3">
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            class="block px-4 py-3 text-sm font-semibold text-body hover:text-heading hover:bg-secondary/10 rounded-xl transition-all duration-200"
            @click="mobileMenuOpen = false"
          >
            {{ link.label }}
          </a>

          <div class="flex items-center gap-4 pt-4 border-t border-secondary/10">
            <LocaleToggle />
            <ThemeToggle />
            <a
              href="/#contact"
              class="flex-1 inline-flex items-center justify-center gap-1.5 text-center bg-accent hover:bg-accent/90 text-accent-contrast font-semibold text-sm px-5 py-3 rounded-xl transition-all duration-300"
              @click="mobileMenuOpen = false"
            >
              {{ t('nav.getInTouch') }}
            </a>
          </div>
        </div>
      </div>
    </Transition>
  </nav>
</template>
