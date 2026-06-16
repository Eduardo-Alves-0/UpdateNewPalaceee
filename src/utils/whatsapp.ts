import { isSafeExternalUrl } from "./safeUrl";

/**
 * Constrói URL do WhatsApp a partir de número ou link wa.me/api.whatsapp.com.
 * Rejeita URLs de outros domínios para evitar redirecionamentos maliciosos.
 */
export function buildWhatsAppUrl(input: string | undefined): string {
  if (!input || typeof input !== "string") return "";
  const trimmed = input.trim();

  if (/^https?:\/\//i.test(trimmed)) {
    if (!isSafeExternalUrl(trimmed)) return "";
    try {
      const parsed = new URL(trimmed);
      if (parsed.hostname === "wa.me" || parsed.hostname === "api.whatsapp.com") {
        return trimmed;
      }
    } catch {
      return "";
    }
    return "";
  }

  const cleaned = trimmed.replace(/\D/g, "");
  if (!cleaned) return "";
  const digits = cleaned.startsWith("55") ? cleaned : `55${cleaned}`;
  return `https://wa.me/${digits}`;
}
