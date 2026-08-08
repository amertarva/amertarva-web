<script setup lang="ts">
import { computed } from 'vue';
import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-vue-next';
import { useServiceDetail } from '~/composables/useServiceDetail';

const props = defineProps<{
  currentId: string;
}>();

const { locale } = useI18n();
const { getAdjacentServices } = useServiceDetail();

const adjacent = computed(() => getAdjacentServices(props.currentId));

const prevText = computed(() => locale.value === 'en' ? 'Previous Service' : 'Layanan Sebelumnya');
const nextText = computed(() => locale.value === 'en' ? 'Next Service' : 'Layanan Selanjutnya');
const allText = computed(() => locale.value === 'en' ? 'All Services' : 'Semua Layanan');
</script>

<template>
  <section class="py-16 bg-body/5 border-t border-border">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <!-- Previous Service -->
        <NuxtLink
          v-if="adjacent.prev"
          :to="`/services/${adjacent.prev.id}`"
          class="group p-5 rounded-2xl border border-border/80 bg-base hover:border-accent/40 transition-all duration-300 flex items-center gap-4"
        >
          <div class="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:-translate-x-1 transition-transform shrink-0">
            <ArrowLeft class="w-5 h-5" />
          </div>
          <div class="overflow-hidden">
            <span class="block text-[11px] font-mono font-bold uppercase tracking-wider text-body/80 mb-0.5">
              {{ prevText }}
            </span>
            <span class="block text-sm font-bold text-heading truncate group-hover:text-accent transition-colors">
              {{ adjacent.prev.title }}
            </span>
          </div>
        </NuxtLink>
        <div v-else />

        <!-- All Services Link -->
        <div class="text-center">
          <NuxtLink
            to="/#services"
            class="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-border/80 bg-base hover:border-accent/40 text-heading text-xs font-semibold uppercase tracking-wider transition-all duration-200"
          >
            <LayoutGrid class="w-4 h-4 text-accent" />
            <span>{{ allText }}</span>
          </NuxtLink>
        </div>

        <!-- Next Service -->
        <NuxtLink
          v-if="adjacent.next"
          :to="`/services/${adjacent.next.id}`"
          class="group p-5 rounded-2xl border border-border/80 bg-base hover:border-accent/40 transition-all duration-300 flex items-center justify-between gap-4 text-right"
        >
          <div class="overflow-hidden flex-1">
            <span class="block text-[11px] font-mono font-bold uppercase tracking-wider text-body/80 mb-0.5">
              {{ nextText }}
            </span>
            <span class="block text-sm font-bold text-heading truncate group-hover:text-accent transition-colors">
              {{ adjacent.next.title }}
            </span>
          </div>
          <div class="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:translate-x-1 transition-transform shrink-0">
            <ArrowRight class="w-5 h-5" />
          </div>
        </NuxtLink>
        <div v-else />
      </div>
    </div>
  </section>
</template>
