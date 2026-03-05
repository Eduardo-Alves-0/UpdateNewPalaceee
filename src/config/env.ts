/**
 * Variáveis de ambiente validadas.
 * Em desenvolvimento, avisa no console quando estiverem ausentes ou inválidas.
 */

const isDev = import.meta.env.DEV;

function getEnv(key: string): string {
  const value = import.meta.env[key] as string | undefined;
  return (typeof value === "string" && value.trim()) ? value.trim() : "";
}

function warnMissing(key: string, purpose: string) {
  if (isDev) {
    console.warn(
      `[New Palace] Variável de ambiente ausente ou inválida: ${key}\n` +
      `Configure no .env. ${purpose}`
    );
  }
}

function validateWhatsApp(value: string): boolean {
  if (!value) return false;
  const digits = value.replace(/\D/g, "");
  return digits.length >= 10;
}

function validateEmail(value: string): boolean {
  if (!value) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

const rawWhatsApp = getEnv("VITE_WHATSAPP_NUMBER");
const rawEmail = getEnv("VITE_EMAIL");
const rawCloudinary = getEnv("VITE_CLOUDINARY_CLOUD_NAME");

if (isDev) {
  if (!rawWhatsApp) {
    warnMissing("VITE_WHATSAPP_NUMBER", "Usado nos links de contato (WhatsApp).");
  } else if (!validateWhatsApp(rawWhatsApp)) {
    console.warn(
      "[New Palace] VITE_WHATSAPP_NUMBER parece inválido. Use formato: 5581988680553 ou +55 81 98868-0553"
    );
  }
  if (!rawEmail) {
    warnMissing("VITE_EMAIL", "Usado nos links de e-mail de contato.");
  } else if (!validateEmail(rawEmail)) {
    console.warn("[New Palace] VITE_EMAIL parece inválido. Use um e-mail válido.");
  }
  if (!rawCloudinary) {
    warnMissing(
      "VITE_CLOUDINARY_CLOUD_NAME",
      "Imagens usam Cloudinary. Sem esta variável, imagens podem não carregar."
    );
  }
}

export const env = {
  /** Número de WhatsApp (ex: 5581988680553). Vazio se não configurado. */
  VITE_WHATSAPP_NUMBER: rawWhatsApp,
  /** E-mail de contato. Vazio se não configurado. */
  VITE_EMAIL: rawEmail,
  /** Nome da cloud no Cloudinary. Vazio se não configurado. */
  VITE_CLOUDINARY_CLOUD_NAME: rawCloudinary,
} as const;
