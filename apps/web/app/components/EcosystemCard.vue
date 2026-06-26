<script setup lang="ts">
import {
  Briefcase,
  GraduationCap,
  Globe,
  Building2,
  ShoppingCart,
  Settings,
  BookOpen,
  Laptop,
  BarChart3,
  Users
} from 'lucide-vue-next'

export interface LocalizedEcosystemProduct {
  id: string
  tag: string
  title: string
  description: string
  features: string[]
  domain: string
  href: string
  colorVariant: 'office' | 'learning'
  cta: string
}

interface Props {
  product: LocalizedEcosystemProduct
}

defineProps<Props>()

const officeIcons = [Globe, Building2, ShoppingCart, Settings]
const learningIcons = [BookOpen, Laptop, BarChart3, Users]

const getFeatureIcon = (colorVariant: 'office' | 'learning', index: number) => {
  return colorVariant === 'office'
    ? officeIcons[index % officeIcons.length]
    : learningIcons[index % learningIcons.length]
}
</script>

<template>
  <div
    class="group relative overflow-hidden rounded-2xl border p-7 lg:p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
    :class="[
      product.colorVariant === 'office'
        ? 'bg-accent/15 border-accent/50 hover:shadow-accent/10'
        : 'bg-secondary/10 border-secondary/35 hover:shadow-secondary/10',
    ]"
  >
    <!-- Decorative circle -->
    <div
      class="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-2xl opacity-40 pointer-events-none transition-transform duration-500 group-hover:scale-110"
      :class="product.colorVariant === 'office' ? 'bg-accent/30' : 'bg-secondary/30'"
    />

    <!-- Icon Box -->
    <div
      class="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
      :class="product.colorVariant === 'office' ? 'bg-accent/25' : 'bg-secondary/20'"
    >
      <component
        :is="product.colorVariant === 'office' ? Briefcase : GraduationCap"
        class="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
        :class="product.colorVariant === 'office' ? 'text-accent-dark' : 'text-secondary-dark'"
      />
    </div>

    <!-- Badge -->
    <span
      class="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full mb-3 inline-block"
      :class="product.colorVariant === 'office'
        ? 'bg-accent/15 text-accent-dark'
        : 'bg-secondary/15 text-secondary-dark'"
    >
      {{ product.tag }}
    </span>

    <!-- Title -->
    <h3 class="text-heading text-lg font-bold mb-2">
      {{ product.title }}
    </h3>

    <!-- Description -->
    <p class="text-body text-sm leading-relaxed mb-5">
      {{ product.description }}
    </p>

    <!-- Features List -->
    <ul class="space-y-3 mb-6">
      <li
        v-for="(feature, idx) in product.features"
        :key="feature"
        class="flex items-center gap-3 text-body text-xs border-b border-heading/5 pb-2.5 last:border-0 last:pb-0"
      >
        <component
          :is="getFeatureIcon(product.colorVariant, idx)"
          class="w-4 h-4 flex-shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
          :class="product.colorVariant === 'office' ? 'text-accent-dark' : 'text-secondary-dark'"
        />
        {{ feature }}
      </li>
    </ul>

    <!-- Divider -->
    <div class="border-t border-heading/5 mb-5" />

    <!-- Bottom Row (Domain & CTA) -->
    <div class="flex items-center justify-between pt-4 border-t border-heading/5">
      <span class="text-body text-[11px] font-mono opacity-70">
        {{ product.domain }}
      </span>
      <a
        :href="product.href"
        target="_blank"
        rel="noopener noreferrer"
        class="text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-1.5 transition-all duration-200 hover:opacity-90 active:scale-95"
        :class="product.colorVariant === 'office'
          ? 'bg-accent text-heading shadow-sm shadow-accent/20 hover:shadow-md'
          : 'bg-secondary text-white shadow-sm shadow-secondary/20 hover:shadow-md'"
      >
        {{ product.cta }} &rarr;
      </a>
    </div>
  </div>
</template>
