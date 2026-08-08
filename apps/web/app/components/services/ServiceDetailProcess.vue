<script setup lang="ts">
import { computed } from 'vue';
import { Clock } from 'lucide-vue-next';
import type { ServiceDetailSchema } from '~/data/serviceDetails';

const props = defineProps<{
  service: ServiceDetailSchema;
}>();

const { locale } = useI18n();

const sectionTitle = computed(() => {
  return locale.value === 'en' ? 'Development Workflow' : 'Tahapan Pengerjaan';
});

const sectionDesc = computed(() => {
  return locale.value === 'en'
    ? 'A structured and transparent process from initial discovery to final deployment.'
    : 'Alur kerja terstruktur dan transparan dari tahap analisis awal hingga peluncuran situs Anda.';
});
</script>

<template>
  <section class="py-20 lg:py-32 bg-body/5 border-y border-border relative">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <Motion
        :initial="{ opacity: 0, y: 30 }"
        :whileInView="{ opacity: 1, y: 0 }"
        :inViewOptions="{ once: true, amount: 0.2 }"
        :transition="{ duration: 0.5, ease: 'easeOut' }"
        class="text-center max-w-3xl mx-auto mb-16"
      >
        <span class="text-xs font-mono font-bold uppercase tracking-widest text-accent mb-3 block">
          Workflow
        </span>
        <h2 class="text-3xl sm:text-5xl font-extrabold text-heading tracking-tight mb-6">
          {{ sectionTitle }}
        </h2>
        <p class="text-base sm:text-lg text-body font-normal">
          {{ sectionDesc }}
        </p>
      </Motion>

      <!-- Step Timeline Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        <Motion
          v-for="(step, idx) in service.process"
          :key="step.step"
          :initial="{ opacity: 0, y: 30 }"
          :whileInView="{ opacity: 1, y: 0 }"
          :inViewOptions="{ once: true, amount: 0.1 }"
          :transition="{ duration: 0.5, delay: idx * 0.1, ease: 'easeOut' }"
          class="rounded-2xl border border-border/80 bg-base p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group hover:border-accent/40 transition-all duration-300"
        >
          <!-- Step Counter Badge -->
          <div>
            <div class="flex items-center justify-between gap-4 mb-6">
              <span class="text-2xl font-mono font-extrabold text-accent">
                0{{ step.step }}
              </span>
              <span
                v-if="step.duration"
                class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent/10 text-accent text-[11px] font-mono font-semibold"
              >
                <Clock class="w-3 h-3" />
                <span>{{ step.duration }}</span>
              </span>
            </div>

            <!-- Step Title -->
            <h3 class="text-lg font-extrabold text-heading mb-3 leading-snug group-hover:text-accent transition-colors duration-200">
              {{ step.title }}
            </h3>

            <!-- Step Description -->
            <p class="text-xs sm:text-sm text-body leading-relaxed font-normal">
              {{ step.description }}
            </p>
          </div>
        </Motion>
      </div>
    </div>
  </section>
</template>
