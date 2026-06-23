import { getCloudinaryUrl } from "../config/cloudinary";
import { siteConfig, absoluteUrl } from "../config/site";
import type { Property } from "../types/property";
import { getPropertyPath } from "./propertySlug";

const MAX_DESCRIPTION_LENGTH = 160;

export function truncateDescription(text: string, maxLength = MAX_DESCRIPTION_LENGTH): string {
    const normalized = text.replace(/\s+/g, " ").trim();
    if (normalized.length <= maxLength) return normalized;
    return `${normalized.slice(0, maxLength - 1).trimEnd()}…`;
}

export function buildHomeTitle(): string {
    return `${siteConfig.name} | ${siteConfig.tagline}`;
}

export function buildHomeDescription(): string {
    return siteConfig.description;
}

export function buildPropertyTitle(property: Property): string {
    const cityLabel = formatCityLabel(property.city);
    return `${property.name} em ${cityLabel} | ${siteConfig.name}`;
}

export function buildPropertyDescription(property: Property): string {
    const parts = [
        property.description,
        property.location,
        property.price,
        property.bedrooms ? `${property.bedrooms} quartos` : undefined,
        property.area ? `${property.area} m²` : undefined,
        "Fale com a New Palace e simule seu financiamento.",
    ].filter(Boolean);

    return truncateDescription(parts.join(". "));
}

function formatCityLabel(city: string): string {
    const labels: Record<string, string> = {
        recife: "Recife",
        jaboatao: "Jaboatão dos Guararapes",
        olinda: "Olinda",
        igarassu: "Igarassu",
        paulista: "Paulista",
        camaragibe: "Camaragibe",
        "cabo-de-santo-agostinho": "Cabo de Santo Agostinho",
    };

    return labels[city] ?? city.charAt(0).toUpperCase() + city.slice(1);
}

function parsePriceBRL(price?: string): number | undefined {
    if (!price) return undefined;
    const digits = price.replace(/[^\d,]/g, "").replace(",", ".");
    const value = Number.parseFloat(digits);
    return Number.isFinite(value) ? value : undefined;
}

function parseAddress(location: string) {
    const parts = location.split(",").map((part) => part.trim()).filter(Boolean);
    return {
        streetAddress: parts[0] ?? location,
        addressLocality: parts.find((part) => /recife|olinda|jaboat|paulista|igarassu|camaragibe|cabo/i.test(part))
            ?? siteConfig.address.locality,
        addressRegion: "PE",
        addressCountry: "BR",
    };
}

export function buildOrganizationJsonLd() {
    return {
        "@context": "https://schema.org",
        "@type": "RealEstateAgent",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        legalName: siteConfig.legalName,
        url: siteConfig.url,
        logo: siteConfig.defaultOgImage,
        image: siteConfig.defaultOgImage,
        description: siteConfig.description,
        email: siteConfig.email,
        telephone: siteConfig.phone,
        address: {
            "@type": "PostalAddress",
            addressLocality: siteConfig.address.locality,
            addressRegion: siteConfig.address.region,
            addressCountry: siteConfig.address.country,
        },
        areaServed: {
            "@type": "AdministrativeArea",
            name: "Região Metropolitana do Recife",
        },
    };
}

export function buildWebsiteJsonLd() {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        inLanguage: "pt-BR",
        publisher: {
            "@id": `${siteConfig.url}/#organization`,
        },
    };
}

export function buildPropertyListingJsonLd(property: Property) {
    const path = getPropertyPath(property);
    const url = absoluteUrl(path);
    const price = parsePriceBRL(property.price);

    return {
        "@context": "https://schema.org",
        "@type": "RealEstateListing",
        "@id": `${url}#listing`,
        name: property.name,
        description: property.description ?? buildPropertyDescription(property),
        url,
        image: property.image || siteConfig.defaultOgImage,
        datePosted: new Date().toISOString().slice(0, 10),
        address: {
            "@type": "PostalAddress",
            ...parseAddress(property.location),
        },
        ...(price
            ? {
                  offers: {
                      "@type": "Offer",
                      price,
                      priceCurrency: "BRL",
                      availability: "https://schema.org/InStock",
                      url,
                  },
              }
            : {}),
        numberOfRooms: property.bedrooms,
        numberOfBathroomsTotal: property.bathrooms,
        floorSize: {
            "@type": "QuantitativeValue",
            value: property.area,
            unitCode: "MTK",
        },
    };
}

export function buildPropertyBreadcrumbJsonLd(property: Property) {
    const path = getPropertyPath(property);

    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Início",
                item: siteConfig.url,
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Empreendimentos",
                item: `${siteConfig.url}/#empreendimentos`,
            },
            {
                "@type": "ListItem",
                position: 3,
                name: property.name,
                item: absoluteUrl(path),
            },
        ],
    };
}

export function buildPropertyItemListJsonLd(properties: Property[]) {
    return {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Empreendimentos New Palace",
        itemListElement: properties.map((property, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: property.name,
            url: absoluteUrl(getPropertyPath(property)),
        })),
    };
}

export function getPropertyOgImage(property: Property): string {
    const carouselSrc = property.carouselImages?.[0]?.src;
    if (carouselSrc) {
        return getCloudinaryUrl(carouselSrc, { width: 1200, height: 675, crop: true });
    }
    if (property.image) return property.image;
    return siteConfig.defaultOgImage;
}

export function getPropertyCanonicalPath(property: Property): string {
    return getPropertyPath(property);
}

export function getPropertyKeywords(property: Property): string {
    const cityLabel = formatCityLabel(property.city);
    return [
        property.name,
        `apartamento ${property.name}`,
        `imóvel ${cityLabel}`,
        `apartamento ${cityLabel}`,
        siteConfig.name,
        "apartamento na planta",
        "financiamento imóvel",
    ].join(", ");
}
