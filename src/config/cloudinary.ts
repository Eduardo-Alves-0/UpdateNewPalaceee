import { env } from "./env";
const cloudName = env.VITE_CLOUDINARY_CLOUD_NAME || undefined;
const baseImageUrl = cloudName
    ? `https://res.cloudinary.com/${cloudName}/image/upload`
    : "";
const baseVideoUrl = cloudName
    ? `https://res.cloudinary.com/${cloudName}/video/upload`
    : "";

/**
 * Gera a URL pública de uma imagem no Cloudinary.
 * @param path - Caminho no Cloudinary (ex.: "newpalace/hero/empreendimentoBrisaDosNobres.jpg")
 * @param options - Opcional: width para redimensionar, f_auto e q_auto aplicados
 */
function sanitizeCloudinaryPath(path: string): string {
    return path.replace(/^\//, "").replace(/\.\./g, "").replace(/^https?:\/\//i, "");
}

export function getCloudinaryUrl(
    path: string,
    options?: { width?: number; height?: number; crop?: boolean }
): string {
    if (!baseImageUrl || !path) return "";
    const cleanPath = sanitizeCloudinaryPath(path);
    if (!cleanPath) return "";
    if (options?.width) {
        const transforms = options.crop
            ? `w_${options.width},h_${options.height ?? options.width},c_fill,g_auto,f_auto,q_auto`
            : `w_${options.width},f_auto,q_auto`;
        return `${baseImageUrl}/${transforms}/${cleanPath}`;
    }
    return `${baseImageUrl}/f_auto,q_auto/${cleanPath}`;
}

// Gera srcSet para imagens responsivas
export function getCloudinaryUrlSrcSet(
    path: string,
    widths: number[],
    crop?: boolean
): string {
    return widths
        .map((w) => `${getCloudinaryUrl(path, { width: w, crop })} ${w}w`)
        .join(", ");
}

/**
 * Gera a URL pública de um vídeo no Cloudinary.
 * @param path - Caminho no Cloudinary (ex.: "v1770331993/videoApresentacao_baqcum.mp4")
 */
export function getCloudinaryVideoUrl(path: string): string {
    if (!baseVideoUrl || !path) return "";
    const cleanPath = sanitizeCloudinaryPath(path);
    if (!cleanPath) return "";
    return `${baseVideoUrl}/${cleanPath}`;
}

/** Retorna true se o Cloudinary está configurado (para fallback local se necessário). */
export function isCloudinaryConfigured(): boolean {
    return Boolean(cloudName);
}
