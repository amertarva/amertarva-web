<script setup lang="ts">
import { computed } from 'vue';
import {
  Layout, Zap, Sparkles, MessageSquare, Layers, Smartphone,
  ShoppingBag, CreditCard, Truck, Package, TrendingUp, Bell,
  GraduationCap, FileCheck, BarChart, MessageSquareText, Award, Users,
  Code2, Shield, Cpu, PieChart, Workflow, Lock,
  BellRing, MapPin, WifiOff, Fingerprint, Camera,
  Activity, Database, ShieldCheck, Wrench, Gauge, FileEdit
} from 'lucide-vue-next';
import type { ServiceDetailSchema } from '~/data/serviceDetails';

const props = defineProps<{
  service: ServiceDetailSchema;
}>();

const { locale } = useI18n();

const iconMap: Record<string, any> = {
  Layout, Zap, Sparkles, MessageSquare, Layers, Smartphone,
  ShoppingBag, CreditCard, Truck, Package, TrendingUp, Bell,
  GraduationCap, FileCheck, BarChart, MessageSquareText, Award, Users,
  Code2, Shield, Cpu, PieChart, Workflow, Lock,
  BellRing, MapPin, WifiOff, Fingerprint, Camera,
  Activity, Database, ShieldCheck, Wrench, Gauge, FileEdit
};

const getIconComponent = (name: string) => {
  return iconMap[name] || Sparkles;
};

const sectionTitle = computed(() => {
  return locale.value === 'en' ? 'Core Features & Capabilities' : 'Fitur Utama & Kapabilitas Unggulan';
});

const sectionDesc = computed(() => {
  return locale.value === 'en'
    ? 'Every aspect is engineered for optimal performance, security, and exceptional user experience.'
    : 'Setiap komponen dirancang dengan presisi untuk memastikan performa tinggi, keamanan, dan kepuasan pengguna.';
});
</script>

<template>
  <section id="features" class="py-20 lg:py-32 bg-body/5 border-y border-border relative overflow-hidden">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <Motion
        :initial="{ opacity: 0, y: 30 }"
        :whileInView="{ opacity: 1, y: 0 }"
        :inViewOptions="{ once: true, amount: 0.2 }"
        :transition="{ duration: 0.5, ease: 'easeOut' }"
        class="text-center max-w-3xl mx-auto mb-16 lg:mb-20"
      >
        <span class="text-xs font-mono font-bold uppercase tracking-widest text-accent mb-3 block">
          Features & Modules
        </span>
        <h2 class="text-3xl sm:text-5xl font-extrabold text-heading tracking-tight mb-6">
          {{ sectionTitle }}
        </h2>
        <p class="text-base sm:text-lg text-body font-normal">
          {{ sectionDesc }}
        </p>
      </Motion>

      <!-- Features Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        <Motion
          v-for="(feature, idx) in service.features"
          :key="feature.title"
          :initial="{ opacity: 0, y: 30 }"
          :whileInView="{ opacity: 1, y: 0 }"
          :inViewOptions="{ once: true, amount: 0.1 }"
          :transition="{ duration: 0.5, delay: idx * 0.08, ease: 'easeOut' }"
          class="group relative rounded-2xl border border-border/80 bg-base p-7 sm:p-8 hover:border-accent/40 transition-all duration-500 hover:-translate-y-1 overflow-hidden"
        >
          <!-- Subtle Top Border Accent -->
          <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-secondary-dark to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <!-- Icon Box -->
          <div class="w-12 h-12 rounded-xl bg-accent/10 border border-accent/25 flex items-center justify-center text-accent mb-6 group-hover:bg-accent group-hover:text-accent-contrast transition-all duration-300">
            <component :is="getIconComponent(feature.iconName)" class="w-6 h-6" />
          </div>

          <!-- Feature Title -->
          <h3 class="text-lg font-bold text-heading mb-3 group-hover:text-accent transition-colors duration-200">
            {{ feature.title }}
          </h3>

          <!-- Feature Description -->
          <p class="text-sm text-body leading-relaxed font-normal">
            {{ feature.description }}
          </p>
        </Motion>
      </div>
    </div>
  </section>
</template>
