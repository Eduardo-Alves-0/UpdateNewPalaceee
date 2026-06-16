const ALLOWED_HOSTS = new Set([
  "wa.me",
  "api.whatsapp.com",
  "www.google.com",
  "google.com",
  "maps.google.com",
  "maps.app.goo.gl",
  "mail.google.com",
  "www.instagram.com",
  "instagram.com",
]);

function parseHttpsUrl(url: string): URL | null {
  try {
    const parsed = new URL(url.trim());
    if (parsed.protocol !== "https:") return null;
    return parsed;
  } catch {
    return null;
  }
}

/** Valida URLs externas permitidas (maps, WhatsApp, e-mail, Instagram). */
export function isSafeExternalUrl(url: string): boolean {
  const parsed = parseHttpsUrl(url);
  if (!parsed) return false;
  return ALLOWED_HOSTS.has(parsed.hostname);
}

/** Retorna a URL se for segura, ou string vazia. */
export function sanitizeExternalUrl(url: string | undefined): string {
  if (!url) return "";
  return isSafeExternalUrl(url) ? url.trim() : "";
}

/** Monta link seguro do Gmail compose a partir de e-mail validado. */
export function buildGmailComposeUrl(email: string, subject: string): string {
  const trimmed = email.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return "";
  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to: trimmed,
    su: subject,
  });
  return `https://mail.google.com/mail/u/0/?${params.toString()}`;
}

/** Monta URL segura de busca no Google Maps. */
export function buildGoogleMapsSearchUrl(query: string): string {
  const trimmed = query.trim();
  if (!trimmed) return "";
  const params = new URLSearchParams({ api: "1", query: trimmed });
  return `https://www.google.com/maps/search/?${params.toString()}`;
}
