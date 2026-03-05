import TitleSections from './TitleSections';
import '../style/components/_titleSection.scss';
import '../../src/style/components/_About.scss';
import { getCloudinaryVideoUrl } from "../config/cloudinary";

export default function About() {
    return (
        <section className="about" id="sobre">
            <div className="about-content">
                <div className="about-col about-col-text">
                    <TitleSections title="SOBRE NÓS" description="Realizamos sonhos e construímos legados desde 2023." />
                    <div className="about-text">
                        <p>Fundada pelos sócios <span>Alexssander França</span> e <span>Jonathas Luz</span>, a New Palace nasceu com um propósito simples: transformar o sonho da casa própria em realidade de forma transparente e humana.</p>

                        <br />

                        <p>Em pouco tempo, nos destacamos com parcerias sólidas junto às principais construtoras do país, incluindo reconhecimento de excelência no programa Minha Casa Minha Vida.</p>
                    </div>
                </div>
                <div className="about-col about-col-video">
                    <div className="about-video-container">
                        <video autoPlay muted loop playsInline controls>
                            <source src={getCloudinaryVideoUrl("v1770331993/videoApresentacao_baqcum.mp4") || "https://res.cloudinary.com/dkgjwrjpv/video/upload/v1770331993/videoApresentacao_baqcum.mp4"} type="video/mp4" />
                        </video>
                    </div>
                </div>
            </div>

            <hr className="about-hr" />

            <div className="about-stats">
                <p>
                    <span>700+</span>
                    Imóveis Vendidos
                </p>

                <p>
                    <span>1500+</span>
                    Clientes Satisfeitos
                </p>


                <p>
                    <span>10+</span>
                    Prêmios Recebidos
                </p>

                <p>
                    <span>96%</span>
                    Taxa de Satisfação de Clientes
                </p>
            </div>
        </section>
    )
}
