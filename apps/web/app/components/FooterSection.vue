<script setup lang="ts">
import { computed } from 'vue'
import { Cpu, Mail, Github, Linkedin } from 'lucide-vue-next'

const { t, locale } = useI18n();
const currentYear = new Date().getFullYear();

const serviceLinks = computed(() => {
  if (locale.value === 'en') {
    return [
      { label: 'Landing Page & Corporate', href: '/services/landing-page' },
      { label: 'E-commerce System', href: '/services/ecommerce' },
      { label: 'Learning Management System', href: '/services/lms' },
      { label: 'Custom Web Application', href: '/services/custom-web-app' },
      { label: 'Mobile Apps (Android & iOS)', href: '/services/custom-mobile-app' },
      { label: 'Maintenance & Updates', href: '/services/maintenance' },
    ];
  }
  return [
    { label: 'Landing Page & Perusahaan', href: '/services/landing-page' },
    { label: 'Sistem Toko E-commerce', href: '/services/ecommerce' },
    { label: 'Platform E-Learning LMS', href: '/services/lms' },
    { label: 'Aplikasi Web Kustom', href: '/services/custom-web-app' },
    { label: 'Aplikasi Mobile (Android & iOS)', href: '/services/custom-mobile-app' },
    { label: 'Pemeliharaan & Update', href: '/services/maintenance' },
  ];
});

const companyLinks = computed(() => [
  { label: t('footer.links.company.about'), href: '/#about' },
  { label: t('footer.links.company.work'), href: '/#work' },
  { label: t('footer.links.company.contact'), href: '/#contact' },
]);
</script>

<template>
  <footer class="border-t border-border py-16 lg:py-20 bg-base">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
        <!-- Brand -->
        <div class="sm:col-span-2 lg:col-span-1">
          <NuxtLink to="/" class="flex items-center gap-3 mb-4 group">
            <div
              class="w-8 h-8 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-accent-contrast"
            >
              <Cpu class="w-4 h-4" />
            </div>
            <div class="flex flex-col">
              <span class="text-heading font-extrabold text-base tracking-tight transition-colors duration-200 group-hover:text-accent">
                AMERTARVA
              </span>
              <span class="text-[9px] font-mono tracking-widest text-body/60 uppercase">Tech Agency</span>
            </div>
          </NuxtLink>
          <p class="text-xs sm:text-sm text-body leading-relaxed max-w-xs font-normal">
            {{ t('footer.tagline') }}
          </p>
        </div>

        <!-- Services -->
        <div>
          <h4 class="text-xs font-mono font-bold uppercase tracking-wider text-heading mb-5">// {{ t('footer.columns.services') }}</h4>
          <ul class="space-y-2.5">
            <li v-for="link in serviceLinks" :key="link.href">
              <NuxtLink
                :to="link.href"
                class="text-xs sm:text-sm text-body hover:text-accent transition-colors duration-200"
              >
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Company -->
        <div>
          <h4 class="text-xs font-mono font-bold uppercase tracking-wider text-heading mb-5">// {{ t('footer.columns.company') }}</h4>
          <ul class="space-y-3">
            <li v-for="link in companyLinks" :key="link.label">
              <a
                :href="link.href"
                class="text-xs sm:text-sm text-body hover:text-accent transition-colors duration-200"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Connect -->
        <div>
          <h4 class="text-xs font-mono font-bold uppercase tracking-wider text-heading mb-5">// {{ t('footer.columns.connect') }}</h4>
          <ul class="space-y-3.5">
            <li>
              <a
                href="mailto:hello@amertarva.com"
                class="inline-flex items-center gap-2 text-xs sm:text-sm text-body hover:text-accent transition-colors duration-200"
              >
                <Mail class="w-4 h-4 text-accent" />
                hello@amertarva.com
              </a>
            </li>
            <li>
              <a
                href="https://github.com/amertarva"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 text-xs sm:text-sm text-body hover:text-accent transition-colors duration-200"
              >
                <Github class="w-4 h-4 text-accent" />
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com/company/amertarva"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 text-xs sm:text-sm text-body hover:text-accent transition-colors duration-200"
              >
                <Linkedin class="w-4 h-4 text-accent" />
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-xs text-body font-mono">
          &copy; {{ currentYear }} Amertarva. {{ t('footer.rights') }}
        </p>

        <ThemeToggle />
      </div>
    </div>
  </footer>
</template>
