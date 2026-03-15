import { getCloudinaryVideoUrl } from "../config/cloudinary";
import { env } from "../config/env";
import "../style/components/_Contacts.scss";
import { buildWhatsAppUrl } from "../utils/whatsapp";
import TitleSections from "./TitleSections";

export default function Contacts() {
  const whatsappUrl = buildWhatsAppUrl(env.VITE_WHATSAPP_NUMBER);

  return (
    <section className="contacts" id="contato">
      <div className="contacts-header">
        <TitleSections
          title="ENTRE EM CONTATO"
          description="Entre em contato pelo WhatsApp com um de nossos corretores."
        />

        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
          <button>Chamar pelo WhatsApp</button>
        </a>
      </div>

      <div className="contacts-bottom">
        <div className="contacts-video">
          <video autoPlay muted loop playsInline controls>
            <source
              src={
                getCloudinaryVideoUrl(
                  "v1773249617/videoLocalizacao_gmzo5c.mp4",
                ) ||
                "https://res.cloudinary.com/dkgjwrjpv/video/upload/v1773249617/videoLocalizacao_gmzo5c.mp4"
              }
              type="video/mp4"
            />
          </video>
        </div>

        <div className="contacts-map">
          <div className="mapa-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3950.665569306755!2d-34.95257365!3d-8.033374300000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ab1bd50f1c002b%3A0x80a547b6220fa34f!2sAv.%20Caxang%C3%A1%2C%205405%20-%20V%C3%A1rzea%2C%20Recife%20-%20PE%2C%2050740-000!5e0!3m2!1spt-BR!2sbr!4v1772721763766!5m2!1spt-BR!2sbr"
              width="100%"
              height="100%"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização Imobiliária New Palace"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
