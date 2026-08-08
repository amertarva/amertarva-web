<script setup lang="ts">
import { computed } from 'vue';
import { Target, CheckCircle2 } from 'lucide-vue-next';
import type { ServiceDetailSchema } from '~/data/serviceDetails';

const props = defineProps<{
  service: ServiceDetailSchema;
}>();

const { locale } = useI18n();

const sectionTitle = computed(() => {
  return locale.value === 'en' ? 'Overview & Target Audience' : 'Gambaran Umum & Target Pengguna';
});

const idealForTitle = computed(() => {
  return locale.value === 'en' ? 'Who Is This Solution Ideal For?' : 'Untuk Siapa Layanan Ini Dirancang?';
});
</script>

<template>
  <section class="py-20 lg:py-28 relative">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <Motion
        :initial="{ opacity: 0, y: 30 }"
        :whileInView="{ opacity: 1, y: 0 }"
        :inViewOptions="{ once: true, amount: 0.2 }"
        :transition="{ duration: 0.5, ease: 'easeOut' }"
        class="max-w-3xl mb-16"
      >
        <span class="text-xs font-mono font-bold uppercase tracking-widest text-accent mb-3 block">
          {{ sectionTitle }}
        </span>
        <h2 class="text-3xl sm:text-4xl font-extrabold text-heading tracking-tight leading-snug mb-6">
          {{ service.title }}
        </h2>
        <p class="text-base sm:text-lg text-body leading-relaxed font-normal">
          {{ service.description }}
        </p>
      </Motion>

      <!-- Target Audience Grid -->
      <div class="mt-12">
        <h3 class="text-xl sm:text-2xl font-bold text-heading mb-8 flex items-center gap-3">
          <Target class="w-6 h-6 text-accent shrink-0" />
          <span>{{ idealForTitle }}</span>
        </h3>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Motion
            v-for="(item, idx) in service.idealFor"
            :key="item.title"
            :initial="{ opacity: 0, y: 30 }"
            :whileInView="{ opacity: 1, y: 0 }"
            :inViewOptions="{ once: true, amount: 0.2 }"
            :transition="{ duration: 0.5, delay: idx * 0.1, ease: 'easeOut' }"
            class="group rounded-2xl border border-border/80 bg-base/80 p-6 sm:p-8 hover:border-accent/40 transition-all duration-300 relative overflow-hidden"
          >
            <!-- Ambient Accent Glow -->
            <div class="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/15 transition-all duration-300 pointer-events-none" />

            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:scale-105 group-hover:bg-accent group-hover:text-accent-contrast transition-all duration-300 shrink-0">
                <CheckCircle2 class="w-5 h-5" />
              </div>
              <h4 class="text-lg font-extrabold text-heading leading-snug group-hover:text-accent transition-colors duration-200">
                {{ item.title }}
              </h4>
            </div>

            <p class="text-sm text-body leading-relaxed font-normal">
              {{ item.description }}
            </p>
          </Motion>
        </div>
      </div>
    </div>
  </section>
</template>
