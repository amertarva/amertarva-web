<script setup lang="ts">
import { computed } from 'vue';
import { Check, Code, PackageCheck } from 'lucide-vue-next';
import type { ServiceDetailSchema } from '~/data/serviceDetails';

const props = defineProps<{
  service: ServiceDetailSchema;
}>();

const { locale } = useI18n();

const techTitle = computed(() => {
  return locale.value === 'en' ? 'Technology Stack' : 'Tumpukan Teknologi';
});

const deliverablesTitle = computed(() => {
  return locale.value === 'en' ? 'Project Deliverables' : 'Hasil Akhir & Deliverables';
});
</script>

<template>
  <section class="py-20 lg:py-28 relative">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <!-- Tech Stack Column -->
        <Motion
          :initial="{ opacity: 0, x: -30 }"
          :whileInView="{ opacity: 1, x: 0 }"
          :inViewOptions="{ once: true, amount: 0.2 }"
          :transition="{ duration: 0.5, ease: 'easeOut' }"
          class="rounded-3xl border border-border/80 bg-base p-8 sm:p-10 relative overflow-hidden"
        >
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
              <Code class="w-5 h-5" />
            </div>
            <h3 class="text-xl sm:text-2xl font-extrabold text-heading">
              {{ techTitle }}
            </h3>
          </div>

          <p class="text-sm text-body leading-relaxed mb-8">
            {{ locale === 'en'
              ? 'We utilize enterprise-grade modern frameworks and scalable tools to ensure maximum stability and maintainability.'
              : 'Kami menggunakan tumpukan teknologi modern berstandar industri untuk menjamin kecepatan, keamanan, dan skalabilitas jangka panjang.' }}
          </p>

          <div class="flex flex-wrap gap-3">
            <span
              v-for="tech in service.techStack"
              :key="tech"
              class="px-4 py-2 rounded-xl bg-accent/10 border border-accent/25 text-heading font-mono text-xs sm:text-sm font-semibold hover:border-accent hover:text-accent transition-all duration-200"
            >
              {{ tech }}
            </span>
          </div>
        </Motion>

        <!-- Deliverables Column -->
        <Motion
          :initial="{ opacity: 0, x: 30 }"
          :whileInView="{ opacity: 1, x: 0 }"
          :inViewOptions="{ once: true, amount: 0.2 }"
          :transition="{ duration: 0.5, ease: 'easeOut' }"
          class="rounded-3xl border border-border/80 bg-base p-8 sm:p-10 relative overflow-hidden"
        >
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
              <PackageCheck class="w-5 h-5" />
            </div>
            <h3 class="text-xl sm:text-2xl font-extrabold text-heading">
              {{ deliverablesTitle }}
            </h3>
          </div>

          <p class="text-sm text-body leading-relaxed mb-8">
            {{ locale === 'en'
              ? 'Everything you will receive upon successful project completion and official handover.'
              : 'Setiap komponen dan hak akses yang akan Anda terima penuh setelah serah terima proyek selesai.' }}
          </p>

          <ul class="space-y-4">
            <li
              v-for="item in service.deliverables"
              :key="item"
              class="flex items-start gap-3.5 text-sm sm:text-base font-medium text-heading"
            >
              <div class="w-6 h-6 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center text-accent shrink-0 mt-0.5">
                <Check class="w-3.5 h-3.5" stroke-width="3" />
              </div>
              <span>{{ item }}</span>
            </li>
          </ul>
        </Motion>
      </div>
    </div>
  </section>
</template>
