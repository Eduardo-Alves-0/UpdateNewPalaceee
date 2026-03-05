import Hero from '../components/Hero';
import About from '../components/About';
import Testimonials from '../components/Testimonials';
import Properties from '../components/Properties';
import Contacts from '../components/Contacts';
import Companies from '../components/Companies';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Testimonials />
      <Properties />
      <Contacts />
      <Companies />
      <Footer />
    </>
  );
}
