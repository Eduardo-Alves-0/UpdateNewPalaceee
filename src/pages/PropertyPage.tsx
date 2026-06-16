import { useMemo } from "react";
import { useParams, Navigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import PropertiesLayout from "../components/PropertiesLayout";
import { properties } from "../data/properties";
import slugify from "../utils/slugify";
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
    return properties.find((p) => {
      const pSlug = p.link ? p.link.replace(/^\//, "") : slugify(p.name);
      return pSlug === slug;
    });
  }, [slug]);

  if (!property) return <Navigate to="/" replace />;

  const locationUrl = sanitizeExternalUrl(property.locationUrl)
    || (property.location ? buildGoogleMapsSearchUrl(property.location) : undefined);

  return (
    <>
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

