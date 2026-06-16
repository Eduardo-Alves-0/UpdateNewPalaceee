import Navbar from "./NavBar";
import { MapPin } from "lucide-react";
import * as m from "motion/react-m";
import { getCloudinaryUrl } from "../config/cloudinary";
import '../../src/style/components/_hero.scss';

const entranceDuration = 0.7;
const entranceEase = "easeOut" as const;
const staggerDelay = 0.1;

export default function Hero() {
    // Img 1: esquerda → direita
    const motionImg1 = {
        initial: { x: -50, opacity: 0.7 },
        animate: { x: 0, opacity: 1 },
        whileHover: { scale: 1.03 },
        transition: {
            x: { duration: entranceDuration, ease: entranceEase, delay: staggerDelay * 0 },
            opacity: { duration: 0.4, delay: staggerDelay * 0 },
            scale: { duration: 0.25 },
        },
    };

    // Img 2: cima → baixo
    const motionImg2 = {
        initial: { y: -40, opacity: 0.7 },
        animate: { y: 0, opacity: 1 },
        whileHover: { scale: 1.03 },
        transition: {
            y: { duration: entranceDuration, ease: entranceEase, delay: staggerDelay * 1 },
            opacity: { duration: 0.4, delay: staggerDelay * 1 },
            scale: { duration: 0.25 },
        },
    };

    // Img 3: baixo → cima
    const motionImg3 = {
        initial: { y: 40, opacity: 0.7 },
        animate: { y: 0, opacity: 1 },
        whileHover: { scale: 1.03 },
        transition: {
            y: { duration: entranceDuration, ease: entranceEase, delay: staggerDelay * 2 },
            opacity: { duration: 0.4, delay: staggerDelay * 2 },
            scale: { duration: 0.25 },
        },
    };

    // Img 4: direita → esquerda
    const motionImg4 = {
        initial: { x: 50, opacity: 0.7 },
        animate: { x: 0, opacity: 1 },
        whileHover: { scale: 1.03 },
        transition: {
            x: { duration: entranceDuration, ease: entranceEase, delay: staggerDelay * 3 },
            opacity: { duration: 0.4, delay: staggerDelay * 3 },
            scale: { duration: 0.25 },
        },
    };

    return (
        <header className="hero" id="inicio">
            <nav>
                <Navbar />
            </nav>

            <div className="hero-content">
                <div className="hero-text">
                    <span className="hero-pill">
                        <MapPin size={16} aria-hidden style={{ color: "var(--color-yellow)" }} />
                        Imobiliária em Recife-PE
                    </span>
                    <h1>Encontre o imóvel dos seus <span className="hero-highlight">sonhos</span></h1>
                    <p>A New Palace oferece os melhores imóveis em Recife-PE. Apartamentos com a qualidade e confiança que você merece</p>
                </div>

                <div className="hero-images">
                    <m.img
                        src={getCloudinaryUrl("v1770326692/empreendimentoBrisaDosNobres_kcaqav.jpg")}
                        alt="Brisas Dos Nobres"
                        title="Brisas Dos Nobres"
                        className="hero-img-1"
                        {...motionImg1}
                    />
                    <m.img
                        src={getCloudinaryUrl("v1770326804/StartCostaDouradaGuarita_psiyam.jpg")}
                        alt="Start Costa Dourada"
                        title="Start Costa Dourada"
                        className="hero-img-2"
                        {...motionImg2}
                    />
                    <m.img
                        src={getCloudinaryUrl("v1770326731/empreendimentoLikeBoaVista_bmd9f0.png")}
                        alt="Like Boa Vista"
                        title="Like Boa Vista"
                        className="hero-img-3"
                        {...motionImg3}
                    />
                    <m.img
                        src={getCloudinaryUrl("v1770326815/empreendimentoStartRecife_qfyekj.jpg")}
                        alt="Start Recife"
                        title="Start Recife"
                        className="hero-img-4"
                        {...motionImg4}
                    />
                </div>
            </div>

        </header>
    )
}