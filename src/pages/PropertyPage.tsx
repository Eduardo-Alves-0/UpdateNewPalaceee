import { useMemo } from "react";
import { useParams, Navigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import PropertiesLayout from "../components/PropertiesLayout";
import Seo from "../components/Seo";
import { properties } from "../data/properties";
import { findPropertyBySlug } from "../utils/propertySlug";
import {
  buildPropertyBreadcrumbJsonLd,
  buildPropertyDescription,
  buildPropertyListingJsonLd,
  buildPropertyTitle,
  getPropertyCanonicalPath,
  getPropertyKeywords,
  getPropertyOgImage,
} from "../utils/seo";
import { buildGoogleMapsSearchUrl, sanitizeExternalUrl } from "../utils/safeUrl";

interface PropertyPageProps {
  /** Quando a rota não tem :slug (ex: /patio-hori), passa o slug por prop */
  slug?: string;
}

export default function PropertyPage({ slug: slugProp }: PropertyPageProps = {}) {
  const { slug: slugParam } = useParams<{ slug?: string }>();
  const slug = slugProp ?? slugParam;

  const property = useMemo(() => {
    if (!slug) return undefined;
    return findPropertyBySlug(slug, properties);
  }, [slug]);

  if (!property) return <Navigate to="/" replace />;

  const locationUrl = sanitizeExternalUrl(property.locationUrl)
    || (property.location ? buildGoogleMapsSearchUrl(property.location) : undefined);

  const canonicalPath = getPropertyCanonicalPath(property);

  return (
    <>
      <Seo
        title={buildPropertyTitle(property)}
        description={buildPropertyDescription(property)}
        canonicalPath={canonicalPath}
        ogType="article"
        ogImage={getPropertyOgImage(property)}
        ogImageAlt={`${property.name} - ${property.location}`}
        keywords={getPropertyKeywords(property)}
        jsonLd={[
          buildPropertyListingJsonLd(property),
          buildPropertyBreadcrumbJsonLd(property),
        ]}
      />
      <Navbar />
      <PropertiesLayout
        title={property.name}
        location={property.location}
        locationUrl={locationUrl}
        description={property.description ?? ""}
        locationDescription={property.locationDescription ?? property.description ?? property.location ?? ""}
        locationHighlights={property.locationHighlights ?? (property.location ? [property.location] : [])}
        leisureAreas={property.leisureAreas ?? []}
        price={property.price ?? ""}
        deliveryDate={property.deliveryDate ?? ""}
        whatsapp={property.whatsapp}
        carouselImages={property.carouselImages ?? []}
        plantaData={property.plantaData ?? []}
      />
      <Footer />
    </>
  );
}
