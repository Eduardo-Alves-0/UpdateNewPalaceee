import { Helmet } from "react-helmet-async";
import { siteConfig, absoluteUrl } from "../config/site";

interface SeoProps {
    title: string;
    description: string;
    canonicalPath?: string;
    ogType?: "website" | "article";
    ogImage?: string;
    ogImageAlt?: string;
    keywords?: string;
    noindex?: boolean;
    jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

export default function Seo({
    title,
    description,
    canonicalPath = "/",
    ogType = "website",
    ogImage = siteConfig.defaultOgImage,
    ogImageAlt = siteConfig.name,
    keywords,
    noindex = false,
    jsonLd,
}: SeoProps) {
    const canonicalUrl = absoluteUrl(canonicalPath);
    const jsonLdItems = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

    return (
        <Helmet prioritizeSeoTags>
            <html lang="pt-BR" />
            <title>{title}</title>
            <meta name="description" content={description} />
            {keywords ? <meta name="keywords" content={keywords} /> : null}
            <meta name="author" content={siteConfig.name} />
            <meta name="robots" content={noindex ? "noindex,nofollow" : "index,follow,max-image-preview:large"} />
            <link rel="canonical" href={canonicalUrl} />

            <meta property="og:site_name" content={siteConfig.name} />
            <meta property="og:locale" content={siteConfig.locale} />
            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            {ogImage ? <meta property="og:image" content={ogImage} /> : null}
            {ogImage ? <meta property="og:image:alt" content={ogImageAlt} /> : null}

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            {ogImage ? <meta name="twitter:image" content={ogImage} /> : null}
            {ogImageAlt ? <meta name="twitter:image:alt" content={ogImageAlt} /> : null}

            {jsonLdItems.map((item, index) => (
                <script key={index} type="application/ld+json">
                    {JSON.stringify(item)}
                </script>
            ))}
        </Helmet>
    );
}
