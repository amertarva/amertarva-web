<script setup lang="ts">
import { ref, computed } from 'vue';
import { HelpCircle, ChevronDown } from 'lucide-vue-next';
import type { ServiceDetailSchema } from '~/data/serviceDetails';

const props = defineProps<{
  service: ServiceDetailSchema;
}>();

const { locale } = useI18n();

const openIndex = ref<number | null>(0);

const toggleFaq = (index: number) => {
  openIndex.value = openIndex.value === index ? null : index;
};

const sectionTitle = computed(() => {
  return locale.value === 'en' ? 'Frequently Asked Questions' : 'Pertanyaan Umum (FAQ)';
});

const sectionDesc = computed(() => {
  return locale.value === 'en'
    ? 'Find answers to common questions about scope, delivery, and service details.'
    : 'Temukan jawaban lengkap atas pertanyaan umum mengenai cakupan kerja, pengerjaan, dan lisensi.';
});
</script>

<template>
  <section class="py-20 lg:py-28 relative">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <Motion
        :initial="{ opacity: 0, y: 30 }"
        :whileInView="{ opacity: 1, y: 0 }"
        :inViewOptions="{ once: true, amount: 0.2 }"
        :transition="{ duration: 0.5, ease: 'easeOut' }"
        class="text-center mb-16"
      >
        <div class="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-accent/10 border border-accent/25 text-accent mb-4">
          <HelpCircle class="w-6 h-6" />
        </div>
        <h2 class="text-3xl sm:text-4xl font-extrabold text-heading tracking-tight mb-4">
          {{ sectionTitle }}
        </h2>
        <p class="text-base text-body font-normal">
          {{ sectionDesc }}
        </p>
      </Motion>

      <!-- FAQ Accordion List -->
      <div class="space-y-4">
        <Motion
          v-for="(faq, idx) in service.faq"
          :key="faq.question"
          :initial="{ opacity: 0, y: 20 }"
          :whileInView="{ opacity: 1, y: 0 }"
          :inViewOptions="{ once: true, amount: 0.2 }"
          :transition="{ duration: 0.4, delay: idx * 0.08, ease: 'easeOut' }"
          class="rounded-2xl border border-border/80 bg-base overflow-hidden transition-all duration-200"
          :class="openIndex === idx ? 'border-accent/40 shadow-sm' : ''"
        >
          <button
            type="button"
            @click="toggleFaq(idx)"
            class="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer group"
          >
            <span class="text-base sm:text-lg font-bold text-heading group-hover:text-accent transition-colors duration-200">
              {{ faq.question }}
            </span>
            <div
              class="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0 transition-transform duration-300"
              :class="openIndex === idx ? 'rotate-180 bg-accent text-accent-contrast' : ''"
            >
              <ChevronDown class="w-4 h-4" />
            </div>
          </button>

          <Transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="max-h-0 opacity-0"
            enter-to-class="max-h-96 opacity-100"
            leave-active-class="transition-all duration-200 ease-in"
            leave-from-class="max-h-96 opacity-100"
            leave-to-class="max-h-0 opacity-0"
          >
            <div v-show="openIndex === idx" class="px-6 pb-6 pt-0 border-t border-border/40 text-sm text-body leading-relaxed">
              <p class="pt-4 font-normal">{{ faq.answer }}</p>
            </div>
          </Transition>
        </Motion>
      </div>
    </div>
  </section>
</template>
