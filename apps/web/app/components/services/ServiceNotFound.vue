<script setup lang="ts">
import { ArrowLeft, AlertCircle } from 'lucide-vue-next';

const { locale } = useI18n();
</script>

<template>
  <section class="min-h-[70vh] flex items-center justify-center py-24 px-4">
    <div class="max-w-md mx-auto text-center">
      <div class="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/25 flex items-center justify-center text-accent mx-auto mb-6">
        <AlertCircle class="w-8 h-8" />
      </div>

      <h1 class="text-2xl sm:text-3xl font-extrabold text-heading mb-3">
        {{ locale === 'en' ? 'Service Not Found' : 'Layanan Tidak Ditemukan' }}
      </h1>

      <p class="text-sm text-body leading-relaxed mb-8">
        {{ locale === 'en'
          ? 'The requested service details page could not be found or has been moved.'
          : 'Halaman detail layanan yang Anda cari tidak ditemukan atau telah dipindahkan.' }}
      </p>

      <NuxtLink
        to="/#services"
        class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent text-accent-contrast font-semibold text-xs uppercase tracking-wider hover:bg-accent/90 transition-all duration-200"
      >
        <ArrowLeft class="w-4 h-4" />
        <span>{{ locale === 'en' ? 'Back to Services' : 'Kembali ke Layanan' }}</span>
      </NuxtLink>
    </div>
  </section>
</template>
