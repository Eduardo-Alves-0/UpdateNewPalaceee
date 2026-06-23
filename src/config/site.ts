import { getCloudinaryUrl } from "./cloudinary";

const rawSiteUrl = (import.meta.env.VITE_SITE_URL as string | undefined)?.trim();

export const siteConfig = {
    name: "New Palace",
    legalName: "New Palace Imobiliária",
    tagline: "Empreendimentos Imobiliários em Recife",
    description:
        "Imobiliária em Recife-PE especializada em apartamentos na planta e empreendimentos residenciais. Encontre seu imóvel com a New Palace.",
    url: (rawSiteUrl || "https://imobiliarianewpalace.com.br").replace(/\/$/, ""),
    locale: "pt_BR",
    defaultOgImage: getCloudinaryUrl(
        "v1770326692/empreendimentoBrisaDosNobres_kcaqav.jpg",
        { width: 1200, height: 675, crop: true }
    ),
    email: "contato@imobiliarianewpalace.com.br",
    phone: "+5581988680553",
    address: {
        locality: "Recife",
        region: "PE",
        country: "BR",
    },
    socialProfiles: [] as string[],
} as const;

export function absoluteUrl(path = "/"): string {
    if (/^https?:\/\//i.test(path)) return path;
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    return `${siteConfig.url}${normalizedPath}`;
}
