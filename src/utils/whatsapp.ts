/**
 * Constrói URL do WhatsApp a partir de número ou link.
 * Remove caracteres não numéricos e garante prefixo 55 (Brasil) sem duplicar.
 */
export function buildWhatsAppUrl(input: string | undefined): string {
  if (!input || typeof input !== "string") return "";
  const trimmed = input.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  const cleaned = trimmed.replace(/\D/g, "");
  if (!cleaned) return "";
  const digits = cleaned.startsWith("55") ? cleaned : `55${cleaned}`;
  return `https://wa.me/${digits}`;
}
