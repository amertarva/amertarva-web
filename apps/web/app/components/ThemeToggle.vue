<script setup lang="ts">
import { Sun, Moon } from 'lucide-vue-next'

const { theme, toggleTheme, initTheme } = useTheme();
onMounted(initTheme);
</script>

<template>
  <button
    type="button"
    class="relative inline-flex items-center justify-center p-2.5 rounded-xl bg-secondary/10 border border-secondary/15 hover:bg-secondary/20 hover:border-accent/40 transition-all duration-300 text-heading focus:outline-none"
    @click="toggleTheme"
    aria-label="Toggle Theme"
  >
    <Sun v-if="theme === 'amerta-night'" class="w-4 h-4 text-accent animate-spin-slow" />
    <Moon v-else class="w-4 h-4 text-heading" />
  </button>
</template>
