import Hero from '../components/Hero';
import About from '../components/About';
import Testimonials from '../components/Testimonials';
import Properties from '../components/Properties';
import Contacts from '../components/Contacts';
import Companies from '../components/Companies';
import Footer from '../components/Footer';
import Seo from '../components/Seo';
import { properties } from '../data/properties';
import {
  buildHomeDescription,
  buildHomeTitle,
  buildOrganizationJsonLd,
  buildPropertyItemListJsonLd,
  buildWebsiteJsonLd,
} from '../utils/seo';

export default function HomePage() {
  return (
    <>
      <Seo
        title={buildHomeTitle()}
        description={buildHomeDescription()}
        canonicalPath="/"
        ogImageAlt="New Palace - Imobiliária em Recife"
        keywords="imóveis em Recife, apartamentos na planta, empreendimentos Recife, imobiliária Recife, New Palace, apartamentos Pernambuco"
        jsonLd={[
          buildOrganizationJsonLd(),
          buildWebsiteJsonLd(),
          buildPropertyItemListJsonLd(properties),
        ]}
      />
      <Hero />
      <main id="conteudo-principal">
        <About />
        <Testimonials />
        <Properties />
        <Contacts />
        <Companies />
      </main>
      <Footer />
    </>
  );
}
