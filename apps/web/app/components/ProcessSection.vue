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
    <!-- Background glow decoration -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px]"
      />
    </div>

    <div class="relative max-w-7xl mx-auto px-6 lg:px-8">
      <!-- Section Header -->
      <Motion
        :initial="{ opacity: 0, y: 40 }"
        :whileInView="{ opacity: 1, y: 0 }"
        :inViewOptions="{ once: true, amount: 0.2 }"
        :transition="{ duration: 0.6, ease: 'easeOut' }"
      >
        <div class="max-w-2xl mb-20">
          <span
            class="text-xs font-semibold tracking-widest uppercase text-accent mb-4 block animate-pulse"
          >
            {{ processData.badge }}
          </span>
          <h2
            class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 text-heading"
          >
            {{ processData.titleStart }}
            <span class="text-accent">{{ processData.titleHighlight }}</span>
          </h2>
          <p class="text-lg text-body leading-relaxed">
            {{ processData.description }}
          </p>
        </div>
      </Motion>

      <!-- Timeline Structure -->
      <div class="relative max-w-5xl mx-auto px-4 md:px-0 mt-12 md:mt-20">
        <!-- Vertical timeline central line -->
        <div
          class="absolute left-6 md:left-1/2 transform -translate-x-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-secondary/40 via-secondary/20 to-transparent"
        />

        <!-- Alternating Timeline Steps -->
        <div
          v-for="(step, idx) in processData.steps"
          :key="step.step"
          class="relative flex flex-col md:flex-row items-start md:items-center justify-between mb-16 md:mb-20 last:mb-0 group"
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
                class="bg-secondary/5 border border-secondary/10 rounded-2xl p-7 hover:bg-secondary/10 hover:border-secondary/20 hover:shadow-2xl hover:shadow-secondary/5 hover:-translate-y-1.5 transition-all duration-300 w-full text-right"
              >
                <div
                  class="text-xs font-extrabold uppercase tracking-widest text-accent mb-3"
                >
                  {{ locale === "id" ? "Langkah" : "Step" }} {{ step.step }}
                </div>
                <h3
                  class="text-xl font-bold text-heading mb-3 group-hover:text-accent transition-colors duration-200"
                >
                  {{ step.title }}
                </h3>
                <p class="text-sm text-body leading-relaxed">
                  {{ step.description }}
                </p>
              </div>
            </Motion>
          </div>

          <!-- Central Timeline Node -->
          <div
            class="absolute left-6 md:left-1/2 transform -translate-x-1/2 top-4 md:top-auto z-10 w-12 h-12"
          >
            <Motion
              :initial="{ scale: 0, opacity: 0 }"
              :whileInView="{ scale: 1, opacity: 1 }"
              :inViewOptions="{ once: true, amount: 0.5 }"
              :transition="{ duration: 0.5, ease: 'backOut' }"
              class="w-full h-full rounded-2xl bg-base border-2 border-secondary/20 group-hover:border-accent text-secondary group-hover:text-accent shadow-lg flex items-center justify-center transition-all duration-300 hover:rotate-12"
            >
              <component
                :is="stepIcons[idx]"
                class="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
              />
            </Motion>
          </div>

          <!-- Right Side Card (Visible on desktop for ODD indexes / Always visible on mobile) -->
          <div class="w-full md:w-[calc(50%-3rem)] pl-16 md:pl-0 flex justify-start">
            <Motion
              :initial="{ opacity: 0, x: 40 }"
              :whileInView="{ opacity: 1, x: 0 }"
              :inViewOptions="{ once: true, amount: 0.2 }"
              :transition="{ duration: 0.6, ease: 'easeOut' }"
              class="w-full"
              :class="idx % 2 !== 0 ? 'block' : 'block md:hidden'"
            >
              <div
                class="bg-secondary/5 border border-secondary/10 rounded-2xl p-7 hover:bg-secondary/10 hover:border-secondary/20 hover:shadow-2xl hover:shadow-secondary/5 hover:-translate-y-1.5 transition-all duration-300 w-full"
              >
                <div
                  class="text-xs font-extrabold uppercase tracking-widest text-accent mb-3"
                >
                  {{ locale === "id" ? "Langkah" : "Step" }} {{ step.step }}
                </div>
                <h3
                  class="text-xl font-bold text-heading mb-3 transition-colors duration-200 group-hover:text-accent"
                >
                  {{ step.title }}
                </h3>
                <p class="text-sm text-body leading-relaxed">
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
