<script setup lang="ts">
import HeroSection from '~/components/HeroSection.vue';
import AboutSection from '~/components/AboutSection.vue';
import PortalSection from '~/components/PortalSection.vue';
import ProcessSection from '~/components/ProcessSection.vue';
import WorkSection from '~/components/WorkSection.vue';
import CtaSection from '~/components/CtaSection.vue';

const { t } = useI18n();

useHead({
  title: 'Amertarva - Tech Agency & Enterprise Solutions',
  meta: [
    { name: 'description', content: 'Amertarva is a tech agency crafting modern web apps, mobile experiences, and scalable platforms from idea to production with precision.' }
  ]
});
</script>

<template>
  <main>
    <HeroSection />
    <AboutSection />
    <PortalSection />
    <ProcessSection />
    <WorkSection />
    <CtaSection />
  </main>
</template>
