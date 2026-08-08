<script setup lang="ts">
import { computed } from "vue";
import {
  MessageSquare,
  FileText,
  Layout,
  Code2,
  CheckCircle2,
  Rocket,
  LifeBuoy,
} from "lucide-vue-next";
import { translations, type TranslationSchema } from "~/data/translations";

const { locale } = useI18n();

const processData = computed(() => {
  return translations[locale.value]?.process ?? (translations["id"] as TranslationSchema).process;
});

const stepIcons = [
  MessageSquare,
  FileText,
  Layout,
  Code2,
  CheckCircle2,
  Rocket,
  LifeBuoy,
];
</script>

<template>
  <section id="process" class="py-24 lg:py-32 relative overflow-hidden bg-base">
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <Motion
        :initial="{ opacity: 0, y: 40 }"
        :whileInView="{ opacity: 1, y: 0 }"
        :inViewOptions="{ once: true, amount: 0.2 }"
        :transition="{ duration: 0.6, ease: 'easeOut' }"
      >
        <div class="max-w-2xl mb-16 lg:mb-20">

          <h2
            class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 text-heading"
          >
            {{ processData.titleStart }}
            <span class="text-accent">{{ processData.titleHighlight }}</span>
          </h2>
          <p class="text-base sm:text-lg text-body leading-relaxed font-normal">
            {{ processData.description }}
          </p>
        </div>
      </Motion>

      <!-- Timeline Structure -->
      <div class="relative max-w-5xl mx-auto px-4 md:px-0 mt-12 md:mt-20">
        <!-- Vertical timeline central line -->
        <div
          class="absolute left-6 md:left-1/2 transform -translate-x-1/2 top-4 bottom-4 w-[1px] bg-border"
        />

        <!-- Alternating Timeline Steps -->
        <div
          v-for="(step, idx) in processData.steps"
          :key="step.step"
          class="relative flex flex-col md:flex-row items-start md:items-center justify-between mb-12 md:mb-16 last:mb-0 group"
        >
          <!-- Left Side Card (Visible on desktop for EVEN indexes) -->
          <div
            class="hidden md:flex w-[calc(50%-3rem)] justify-end text-right"
            :class="idx % 2 === 0 ? 'pointer-events-auto' : 'pointer-events-none opacity-0 select-none'"
          >
            <Motion
              v-if="idx % 2 === 0"
              :initial="{ opacity: 0, x: -40 }"
              :whileInView="{ opacity: 1, x: 0 }"
              :inViewOptions="{ once: true, amount: 0.2 }"
              :transition="{ duration: 0.6, ease: 'easeOut' }"
              class="w-full"
            >
              <div
                class="bg-base border border-border rounded-xl p-6 sm:p-7 hover:border-accent/40 hover:-translate-y-1 transition-all duration-300 w-full text-right"
              >
                <div
                  class="text-[11px] font-mono font-bold uppercase tracking-widest text-accent mb-2"
                >
                  [ STEP 0{{ step.step }} ]
                </div>
                <h3
                  class="text-lg font-extrabold text-heading mb-2 group-hover:text-accent transition-colors duration-200"
                >
                  {{ step.title }}
                </h3>
                <p class="text-xs sm:text-sm text-body leading-relaxed font-normal">
                  {{ step.description }}
                </p>
              </div>
            </Motion>
          </div>

          <!-- Central Timeline Node -->
          <div
            class="absolute left-6 md:left-1/2 transform -translate-x-1/2 top-4 md:top-auto z-10 w-10 h-10"
          >
            <Motion
              :initial="{ scale: 0, opacity: 0 }"
              :whileInView="{ scale: 1, opacity: 1 }"
              :inViewOptions="{ once: true, amount: 0.5 }"
              :transition="{ duration: 0.5, ease: 'backOut' }"
              class="w-full h-full rounded-lg bg-base border border-border group-hover:border-accent text-secondary group-hover:text-accent flex items-center justify-center transition-all duration-300"
            >
              <component
                :is="stepIcons[idx]"
                class="w-4 h-4 transition-transform duration-300 group-hover:scale-110"
              />
            </Motion>
          </div>

          <!-- Right Side Card (Visible on desktop for ODD indexes / Always visible on mobile) -->
          <div class="w-full md:w-[calc(50%-3rem)] pl-14 md:pl-0 flex justify-start">
            <Motion
              :initial="{ opacity: 0, x: 40 }"
              :whileInView="{ opacity: 1, x: 0 }"
              :inViewOptions="{ once: true, amount: 0.2 }"
              :transition="{ duration: 0.6, ease: 'easeOut' }"
              class="w-full"
              :class="idx % 2 !== 0 ? 'block' : 'block md:hidden'"
            >
              <div
                class="bg-base border border-border rounded-xl p-6 sm:p-7 hover:border-accent/40 hover:-translate-y-1 transition-all duration-300 w-full"
              >
                <div
                  class="text-[11px] font-mono font-bold uppercase tracking-widest text-accent mb-2"
                >
                  [ STEP 0{{ step.step }} ]
                </div>
                <h3
                  class="text-lg font-extrabold text-heading mb-2 transition-colors duration-200 group-hover:text-accent"
                >
                  {{ step.title }}
                </h3>
                <p class="text-xs sm:text-sm text-body leading-relaxed font-normal">
                  {{ step.description }}
                </p>
              </div>
            </Motion>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
