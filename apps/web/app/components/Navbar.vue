<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { Menu, X, Cpu, ArrowRight, ChevronDown, Briefcase, GraduationCap } from 'lucide-vue-next'

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
  { label: t('nav.services'), href: '#services' },
  { label: t('nav.about'), href: '#about' },
  { label: t('nav.contact'), href: '#contact' },
]);

const mobileMenuOpen = ref(false);
const platformsDropdownOpen = ref(false);
const mobilePlatformsOpen = ref(false);
</script>

<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="
      isScrolled
        ? 'bg-base/80 backdrop-blur-md shadow-lg shadow-secondary/5 border-b border-secondary/10'
        : 'bg-transparent'
    "
  >
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 lg:h-20">
        <!-- Logo -->
        <a href="#" class="flex items-center gap-2.5 group">
          <div
            class="w-9 h-9 rounded-xl bg-accent flex items-center justify-center text-heading transition-all duration-300 group-hover:scale-105 group-hover:rotate-6 shadow-md shadow-accent/15"
          >
            <Cpu class="w-5 h-5 text-heading" />
          </div>
          <span class="text-heading font-extrabold text-lg tracking-tight transition-colors duration-200 group-hover:text-accent">
            Amertarva
          </span>
        </a>

        <!-- Desktop Nav -->
        <div class="hidden md:flex items-center gap-1">
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            class="relative px-4 py-2 text-sm font-semibold text-body hover:text-heading transition-all duration-200 rounded-lg hover:bg-secondary/10"
          >
            {{ link.label }}
          </a>

          <!-- Platforms Dropdown -->
          <div
            class="relative"
            @mouseenter="platformsDropdownOpen = true"
            @mouseleave="platformsDropdownOpen = false"
          >
            <button
              type="button"
              class="relative px-4 py-2 text-sm font-semibold text-body hover:text-heading transition-all duration-200 rounded-lg hover:bg-secondary/10 flex items-center gap-1 focus:outline-none"
              @click="platformsDropdownOpen = !platformsDropdownOpen"
              aria-haspopup="true"
              :aria-expanded="platformsDropdownOpen"
            >
              {{ t('nav.platforms') }}
              <ChevronDown
                class="w-4 h-4 transition-transform duration-300"
                :class="{ 'rotate-180': platformsDropdownOpen }"
              />
            </button>

            <!-- Dropdown Menu -->
            <Transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="opacity-0 translate-y-1 scale-95"
              enter-to-class="opacity-100 translate-y-0 scale-100"
              leave-active-class="transition duration-150 ease-in"
              leave-from-class="opacity-100 translate-y-0 scale-100"
              leave-to-class="opacity-0 translate-y-1 scale-95"
            >
              <div
                v-if="platformsDropdownOpen"
                class="absolute left-1/2 transform -translate-x-1/2 mt-2 w-80 bg-base/95 backdrop-blur-xl border border-secondary/15 rounded-2xl shadow-xl p-3 z-50 flex flex-col gap-1.5"
              >
                <!-- Amerta Office -->
                <a
                  href="https://office.amertarva.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-start gap-3 p-3 rounded-xl hover:bg-secondary/15 transition-all duration-200 group/item"
                >
                  <div
                    class="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center text-accent group-hover/item:scale-105 transition-transform duration-200"
                  >
                    <Briefcase class="w-5 h-5" />
                  </div>
                  <div>
                    <div class="text-xs font-bold uppercase tracking-wider text-accent mb-0.5">Amertarva Office</div>
                    <div class="text-xs text-heading font-semibold mb-0.5">office.amertarva.app</div>
                    <p class="text-[10px] text-body leading-normal">
                      {{ locale === 'id' ? 'Web Korporat, POS, & Landing Page' : 'Corporate Web, POS, & Landing Page' }}
                    </p>
                  </div>
                </a>

                <!-- Amerta Learning -->
                <a
                  href="https://learning.amertarva.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-start gap-3 p-3 rounded-xl hover:bg-secondary/15 transition-all duration-200 group/item"
                >
                  <div
                    class="w-9 h-9 rounded-lg bg-secondary/15 flex items-center justify-center text-secondary group-hover/item:scale-105 transition-transform duration-200"
                  >
                    <GraduationCap class="w-5 h-5" />
                  </div>
                  <div>
                    <div class="text-xs font-bold uppercase tracking-wider text-secondary mb-0.5">Amertarva Learning</div>
                    <div class="text-xs text-heading font-semibold mb-0.5">learning.amertarva.app</div>
                    <p class="text-[10px] text-body leading-normal">
                      {{ locale === 'id' ? 'Sistem Pembelajaran & LMS Modern' : 'E-Learning & LMS Platform' }}
                    </p>
                  </div>
                </a>
              </div>
            </Transition>
          </div>
        </div>

        <!-- Desktop Actions -->
        <div class="hidden md:flex items-center gap-3.5">
          <LocaleToggle />
          <ThemeToggle />
          <a
            href="#contact"
            class="inline-flex items-center gap-1.5 bg-accent hover:bg-accent/90 text-accent-contrast font-semibold text-sm px-5 py-2.5 rounded-xl transition-all duration-300 shadow-md shadow-accent/20 hover:shadow-lg hover:shadow-accent/30 hover:-translate-y-0.5"
          >
            {{ t('nav.getInTouch') }}
            <ArrowRight class="w-4 h-4" />
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

          <!-- Mobile Platforms Accordion -->
          <div class="px-4 py-2">
            <button
              type="button"
              class="w-full flex items-center justify-between py-2 text-sm font-semibold text-body hover:text-heading transition-colors focus:outline-none"
              @click="mobilePlatformsOpen = !mobilePlatformsOpen"
            >
              <span>{{ t('nav.platforms') }}</span>
              <ChevronDown
                class="w-4 h-4 transition-transform duration-300"
                :class="{ 'rotate-180': mobilePlatformsOpen }"
              />
            </button>
            <div
              v-show="mobilePlatformsOpen"
              class="mt-2 pl-4 border-l border-secondary/15 flex flex-col gap-2"
            >
              <a
                href="https://office.amertarva.app"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-3 py-2 text-xs font-semibold text-body hover:text-heading transition-colors"
                @click="mobileMenuOpen = false"
              >
                <Briefcase class="w-4 h-4 text-accent" />
                <div>
                  <span class="font-bold text-heading">Amertarva Office</span>
                  <span class="text-[10px] text-body block">office.amertarva.app</span>
                </div>
              </a>
              <a
                href="https://learning.amertarva.app"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-3 py-2 text-xs font-semibold text-body hover:text-heading transition-colors"
                @click="mobileMenuOpen = false"
              >
                <GraduationCap class="w-4 h-4 text-secondary" />
                <div>
                  <span class="font-bold text-heading">Amertarva Learning</span>
                  <span class="text-[10px] text-body block">learning.amertarva.app</span>
                </div>
              </a>
            </div>
          </div>

          <div class="flex items-center gap-4 pt-4 border-t border-secondary/10">
            <LocaleToggle />
            <ThemeToggle />
            <a
              href="#contact"
              class="flex-1 inline-flex items-center justify-center gap-1.5 text-center bg-accent hover:bg-accent/90 text-accent-contrast font-semibold text-sm px-5 py-3 rounded-xl transition-all duration-300"
              @click="mobileMenuOpen = false"
            >
              {{ t('nav.getInTouch') }}
              <ArrowRight class="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </Transition>
  </nav>
</template>
