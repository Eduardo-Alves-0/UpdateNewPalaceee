/**
 * URLs das imagens no Cloudinary.
 * Configure VITE_CLOUDINARY_CLOUD_NAME no .env (veja docs/CLOUDINARY.md).
 * Se não estiver configurado, retorna path vazio e o código deve usar fallback local.
 */
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
export function getCloudinaryUrl(
    path: string,
    options?: { width?: number }
): string {
    if (!baseImageUrl || !path) return "";
    const cleanPath = path.replace(/^\//, "");
    if (options?.width) {
        return `${baseImageUrl}/w_${options.width},f_auto,q_auto/${cleanPath}`;
    }
    return `${baseImageUrl}/f_auto,q_auto/${cleanPath}`;
}

/**
 * Gera a URL pública de um vídeo no Cloudinary.
 * @param path - Caminho no Cloudinary (ex.: "v1770331993/videoApresentacao_baqcum.mp4")
 */
export function getCloudinaryVideoUrl(path: string): string {
    if (!baseVideoUrl || !path) return "";
    const cleanPath = path.replace(/^\//, "");
    return `${baseVideoUrl}/${cleanPath}`;
}

/** Retorna true se o Cloudinary está configurado (para fallback local se necessário). */
export function isCloudinaryConfigured(): boolean {
    return Boolean(cloudName);
}
