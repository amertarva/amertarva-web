const DEFAULT_PHONE = "6281234567890";

/**
 * Generate localized WhatsApp URL for a specific service inquiry
 */
export function getServiceWhatsAppUrl(
  serviceTitle: string,
  locale: string = "id",
  phone: string = DEFAULT_PHONE
): string {
  const isEn = locale === "en";

  const message = isEn
    ? `Hello Amertarva! I am interested in your *${serviceTitle}* service. I would like to consult about project scope, timeline, and pricing details. Thank you!`
    : `Halo Amertarva! Saya tertarik dengan layanan *${serviceTitle}*. Saya ingin berkonsultasi mengenai estimasi pengerjaan, scope proyek, dan penawaran harganya. Terima kasih!`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
