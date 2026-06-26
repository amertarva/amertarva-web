<script setup lang="ts">
import { Globe } from 'lucide-vue-next'

const { locale, setLocale, initLocale } = useI18n();

onMounted(() => {
  initLocale();
});

const toggleLocale = () => {
  setLocale(locale.value === 'id' ? 'en' : 'id');
};
</script>

<template>
  <button
    type="button"
    class="relative inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-secondary/10 border border-secondary/15 hover:bg-secondary/20 hover:border-accent/40 transition-all duration-300 text-heading text-xs font-bold focus:outline-none"
    @click="toggleLocale"
    aria-label="Toggle Language"
  >
    <Globe class="w-3.5 h-3.5 text-secondary transition-transform duration-300 hover:rotate-12" />
    <span class="uppercase tracking-wider min-w-[16px] text-left">{{ locale }}</span>
  </button>
</template>
