// Shared WhatsApp URL helper used by the floating button, hero secondary
// CTA, and the sticky mobile bar. The fallback phone keeps the .env.example
// in lockstep with the runtime guard — if either is unset or still matches
// FALLBACK_PHONE, callers should hide their WhatsApp affordance.

const FALLBACK_PHONE = "37100000000";
const DEFAULT_MESSAGE = "Sveiks! Gribu uzzināt vairāk par OpenOura.";

export function getWhatsAppUrl(message: string = DEFAULT_MESSAGE): string | null {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  if (!phone || phone === FALLBACK_PHONE) return null;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
