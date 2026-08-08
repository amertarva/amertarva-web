<script setup lang="ts">
import ServiceDetailHero from '~/components/services/ServiceDetailHero.vue';
import ServiceDetailOverview from '~/components/services/ServiceDetailOverview.vue';
import ServiceDetailFeatures from '~/components/services/ServiceDetailFeatures.vue';
import ServiceDetailDeliverables from '~/components/services/ServiceDetailDeliverables.vue';
import ServiceDetailCta from '~/components/services/ServiceDetailCta.vue';
import ServiceDetailNav from '~/components/services/ServiceDetailNav.vue';
import ServiceNotFound from '~/components/services/ServiceNotFound.vue';
import { useServiceDetail } from '~/composables/useServiceDetail';

const route = useRoute();
const { getServiceById } = useServiceDetail();

const serviceId = computed(() => route.params.id as string);
const service = computed(() => getServiceById(serviceId.value));

useHead(() => ({
  title: service.value ? `${service.value.title} - Amertarva` : 'Layanan Tidak Ditemukan - Amertarva',
}));
</script>

<template>
  <div v-if="service" class="min-h-screen">
    <ServiceDetailHero :service="service" />
    <ServiceDetailOverview :service="service" />
    <ServiceDetailFeatures :service="service" />
    <ServiceDetailDeliverables :service="service" />
    <ServiceDetailCta :service="service" />
    <ServiceDetailNav :current-id="service.id" />
  </div>
  <ServiceNotFound v-else />
</template>
