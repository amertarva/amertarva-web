<script setup lang="ts">
import { computed } from 'vue'
import { Cpu, Mail, Github, Linkedin } from 'lucide-vue-next'

const { t } = useI18n();
const currentYear = new Date().getFullYear();

const links = computed(() => ({
  services: [
    { label: t('footer.links.services.webDev'), href: '#services' },
    { label: t('footer.links.services.mobileApps'), href: '#services' },
    { label: t('footer.links.services.uiux'), href: '#services' },
    { label: t('footer.links.services.devops'), href: '#services' },
  ],
  company: [
    { label: t('footer.links.company.about'), href: '#about' },
    { label: t('footer.links.company.work'), href: '#' },
    { label: t('footer.links.company.blog'), href: '#' },
    { label: t('footer.links.company.contact'), href: '#contact' },
  ],
}));
</script>

<template>
  <footer class="border-t border-secondary/15 py-16 lg:py-20 bg-secondary/5">
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
        <!-- Brand -->
        <div class="sm:col-span-2 lg:col-span-1">
          <a href="#" class="flex items-center gap-2.5 mb-4 group">
            <div
              class="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-heading font-bold text-sm transition-transform duration-300 group-hover:scale-105"
            >
              <Cpu class="w-4 h-4" />
            </div>
            <span class="text-heading font-bold text-lg tracking-tight transition-colors duration-200 group-hover:text-accent">
              Amertarva
            </span>
          </a>
          <p class="text-sm text-body leading-relaxed max-w-xs">
            {{ t('footer.tagline') }}
          </p>
        </div>

        <!-- Services -->
        <div>
          <h4 class="text-sm font-bold text-heading mb-5">{{ t('footer.columns.services') }}</h4>
          <ul class="space-y-3">
            <li v-for="link in links.services" :key="link.label">
              <a
                :href="link.href"
                class="text-sm text-body hover:text-accent transition-colors duration-200"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Company -->
        <div>
          <h4 class="text-sm font-bold text-heading mb-5">{{ t('footer.columns.company') }}</h4>
          <ul class="space-y-3">
            <li v-for="link in links.company" :key="link.label">
              <a
                :href="link.href"
                class="text-sm text-body hover:text-accent transition-colors duration-200"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Connect -->
        <div>
          <h4 class="text-sm font-bold text-heading mb-5">{{ t('footer.columns.connect') }}</h4>
          <ul class="space-y-3.5">
            <li>
              <a
                href="mailto:hello@amertarva.com"
                class="inline-flex items-center gap-2 text-sm text-body hover:text-accent transition-colors duration-200"
              >
                <Mail class="w-4 h-4" />
                hello@amertarva.com
              </a>
            </li>
            <li>
              <a
                href="https://github.com/amertarva"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 text-sm text-body hover:text-accent transition-colors duration-200"
              >
                <Github class="w-4 h-4" />
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com/company/amertarva"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 text-sm text-body hover:text-accent transition-colors duration-200"
              >
                <Linkedin class="w-4 h-4" />
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom -->
      <div class="border-t border-secondary/15 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-xs text-body">
          &copy; {{ currentYear }} Amertarva. {{ t('footer.rights') }}
        </p>
        <ThemeToggle />
      </div>
    </div>
  </footer>
</template>

