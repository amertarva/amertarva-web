import { serviceDetailsData, type ServiceDetailSchema } from '~/data/serviceDetails';
import { getServiceWhatsAppUrl } from '~/utils/whatsapp';

export function useServiceDetail() {
  const { locale } = useI18n();

  // Get service detail schema by service ID/slug for current or specified locale
  const getServiceById = (id: string, customLocale?: string): ServiceDetailSchema | null => {
    const loc = customLocale || locale.value || 'id';
    const fallbackData = serviceDetailsData['id'] || {};
    const localizedData = serviceDetailsData[loc] || fallbackData;
    return localizedData[id] || fallbackData[id] || null;
  };

  // Get all service summaries for listing or navigation
  const getAllServices = (customLocale?: string): ServiceDetailSchema[] => {
    const loc = customLocale || locale.value || 'id';
    const fallbackData = serviceDetailsData['id'] || {};
    const localizedData = serviceDetailsData[loc] || fallbackData;
    return Object.values(localizedData);
  };

  /**
   * Get dynamic WhatsApp URL for a service
   */
  const getWhatsAppLink = (serviceTitle: string): string => {
    return getServiceWhatsAppUrl(serviceTitle, locale.value);
  };

  // Get adjacent services for navigation (prev/next)
  const getAdjacentServices = (currentId: string) => {
    const services = getAllServices();
    const index = services.findIndex((s) => s.id === currentId);

    if (index === -1) {
      return { prev: null, next: null };
    }

    const prevIndex = index === 0 ? services.length - 1 : index - 1;
    const nextIndex = index === services.length - 1 ? 0 : index + 1;

    return {
      prev: services[prevIndex],
      next: services[nextIndex],
    };
  };

  return {
    getServiceById,
    getAllServices,
    getWhatsAppLink,
    getAdjacentServices,
  };
}
