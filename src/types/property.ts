export type ImageItem = {
  id: number;
  src: string;
  alt: string;
  title?: string;
};

export type PlantaItem = {
  id: number;
  name: string;
  src: string;
  alt: string;
  title?: string;
  area: string;
  quartos: number;
  banheiros: number;
  varanda: boolean;
};

export interface Property {
  id: string;
  image: string;
  name: string;
  location: string;
  city: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  link?: string;
  description?: string;
  price?: string;
  deliveryDate?: string;
  whatsapp?: string;
  locationUrl?: string;
  locationDescription?: string;
  locationHighlights?: string[];
  leisureAreas?: string[];
  carouselImages?: ImageItem[];
  plantaData?: PlantaItem[];
}
