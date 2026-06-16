import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, MapPin, Square, BedDouble, Bath, Sun, X } from "lucide-react";
import * as m from "motion/react-m";
import { AnimatePresence } from "motion/react";
import { getCloudinaryUrl } from "../config/cloudinary";
import { buildWhatsAppUrl } from "../utils/whatsapp";
import { sanitizeExternalUrl } from "../utils/safeUrl";
import { env } from "../config/env";
import type { ImageItem, PlantaItem } from "../types/property";
import "../style/components/_PropertiesLayout.scss";
import TitleSections from "./TitleSections";

export interface PropertiesLayoutProps {
    title: string;
    location: string;
    locationUrl?: string;
    description: string;
    locationDescription: string;
    locationHighlights: string[];
    leisureAreas: string[];
    price: string;
    deliveryDate: string;
    whatsapp?: string;
    carouselImages: ImageItem[];
    plantaData: PlantaItem[];
    initialCarouselIndex?: number;
    initialPlantIndex?: number;
}

export default function PropertiesLayout({
    title,
    location,
    locationUrl,
    description,
    locationDescription,
    locationHighlights,
    leisureAreas,
    price,
    deliveryDate,
    whatsapp,
    carouselImages,
    plantaData,
    initialCarouselIndex = 0,
    initialPlantIndex = 0,
}: PropertiesLayoutProps) {
    const navigate = useNavigate();
    const carousel = carouselImages ?? [];
    const plantas = plantaData ?? [];
    const [currentIndex, setCurrentIndex] = useState(initialCarouselIndex);
    const [direction, setDirection] = useState<number>(0);
    const [plantIndex, setPlantIndex] = useState(initialPlantIndex);
    const [plantDirection, setPlantDirection] = useState<number>(0);
    const [plantaLightboxOpen, setPlantaLightboxOpen] = useState(false);
    const totalSlides = carousel.length;

    const goNext = useCallback(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % Math.max(1, totalSlides));
    }, [totalSlides]);

    const goPrev = useCallback(() => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + Math.max(1, totalSlides)) % Math.max(1, totalSlides));
    }, [totalSlides]);

    const goTo = useCallback(
        (index: number) => {
            setDirection(index > currentIndex ? 1 : -1);
            setCurrentIndex(index);
        },
        [currentIndex]
    );

    const goPlantNext = useCallback(() => {
        setPlantDirection(1);
        setPlantIndex((prev) => (prev + 1) % Math.max(1, plantas.length));
    }, [plantas.length]);

    const goPlantPrev = useCallback(() => {
        setPlantDirection(-1);
        setPlantIndex((prev) => (prev - 1 + Math.max(1, plantas.length)) % Math.max(1, plantas.length));
    }, [plantas.length]);

    const goToPlant = useCallback(
        (index: number) => {
            setPlantDirection(index > plantIndex ? 1 : -1);
            setPlantIndex(index);
        },
        [plantIndex]
    );

    useEffect(() => {
        if (totalSlides <= 1) return;
        const timer = setInterval(goNext, 5000);
        return () => clearInterval(timer);
    }, [goNext, totalSlides]);

    useEffect(() => {
        if (!plantaLightboxOpen) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setPlantaLightboxOpen(false);
        };
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", onKeyDown);
        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [plantaLightboxOpen]);

    const slideVariants = {
        enter: (dir: number) => ({
            x: dir > 0 ? 120 : -120,
            opacity: 0,
            scale: 0.97,
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
            transition: { type: "spring" as const, stiffness: 300, damping: 30 },
        },
        exit: (dir: number) => ({
            x: dir < 0 ? 120 : -120,
            opacity: 0,
            scale: 0.95,
            transition: { duration: 0.3 },
        }),
    };

    const envNumber = env.VITE_WHATSAPP_NUMBER;
    const whatsappHref = buildWhatsAppUrl(whatsapp || envNumber);
    const safeLocationUrl = sanitizeExternalUrl(locationUrl);

    return (
        <div className="properties-layout">
            {carousel.length > 0 && (
                <div className="properties-carousel">
                    <button
                        type="button"
                        className="properties-carousel__btn properties-carousel__btn--prev"
                        onClick={goPrev}
                        aria-label="Imagem anterior"
                    >
                        <ChevronLeft size={28} aria-hidden />
                    </button>
                    <div className="properties-carousel__viewport">
                        <AnimatePresence mode="wait" custom={direction} initial={false}>
                            <m.div
                                key={currentIndex}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="properties-carousel__slide"
                            >
                                <img
                                    src={getCloudinaryUrl(carousel[currentIndex % carousel.length].src, { width: 900, crop: true })}
                                    alt={carousel[currentIndex % carousel.length].alt}
                                    title={carousel[currentIndex % carousel.length].alt}
                                    draggable={false}
                                    sizes="(max-width: 640px) 100vw, 800px"
                                />
                            </m.div>
                        </AnimatePresence>

                        <div className="properties-carousel__footer">
                            <div className="properties-carousel__dots" role="group" aria-label="Navegação do carrossel">
                                {carousel.map((_, index) => (
                                    <button
                                        key={carousel[index].id}
                                        type="button"
                                        aria-label={`Ir para imagem ${index + 1}${index === currentIndex ? " (atual)" : ""}`}
                                        className={`properties-carousel__dot ${index === currentIndex ? "properties-carousel__dot--active" : ""}`}
                                        onClick={() => goTo(index)}
                                    />
                                ))}
                            </div>
                            <p className="properties-carousel__caption">
                                {carousel[currentIndex % Math.max(1, carousel.length)]?.alt}
                            </p>
                        </div>
                    </div>
                    <button
                        type="button"
                        className="properties-carousel__btn properties-carousel__btn--next"
                        onClick={goNext}
                        aria-label="Próxima imagem"
                    >
                        <ChevronRight size={28} aria-hidden />
                    </button>
                </div>
            )}

            <main className="properties-main">
                <div className="properties-main__grid">
                    <section className="properties-details">
                        <p className="properties-details__location">
                            <MapPin size={18} aria-hidden className="properties-details__icon" />
                            {safeLocationUrl ? (
                                <a href={safeLocationUrl} target="_blank" rel="noopener noreferrer" className="properties-details__location-link">
                                    {location}
                                </a>
                            ) : (
                                location
                            )}
                        </p>
                        <h2 className="properties-details__title">{title}</h2>
                        <p className="properties-details__description">{description}</p>
                        <div className="properties-details__features">
                            {plantas[plantIndex] && (
                                <>
                                    <div className="properties-details__card">
                                        <Square size={24} aria-hidden className="properties-details__card-icon" />
                                        <span className="properties-details__card-value">{plantas[plantIndex].area}</span>
                                        <span className="properties-details__card-label">Área privativa</span>
                                    </div>
                                    <div className="properties-details__card">
                                        <BedDouble size={24} aria-hidden className="properties-details__card-icon" />
                                        <span className="properties-details__card-value">{plantas[plantIndex].quartos}</span>
                                        <span className="properties-details__card-label">Quartos</span>
                                    </div>
                                    <div className="properties-details__card">
                                        <Bath size={24} aria-hidden className="properties-details__card-icon" />
                                        <span className="properties-details__card-value">{plantas[plantIndex].banheiros}</span>
                                        <span className="properties-details__card-label">Banheiro{plantas[plantIndex].banheiros > 1 ? "s" : ""}</span>
                                    </div>
                                </>
                            )}
                        </div>
                    </section>

                    <aside className="properties-sidebar">
                        <div className="properties-sidebar__card">
                            {price && <p className="properties-sidebar__price">{price}</p>}
                            {deliveryDate && <p className="properties-date">{deliveryDate}</p>}

                            <hr className="properties-hr" />

                            <p className="properties-sidebar__text">Fale com um especialista e simule seu financiamento sem compromisso.</p>
                            {whatsappHref && (
                                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="properties-sidebar__btn">
                                    Chamar pelo WhatsApp
                                </a>
                            )}
                        </div>
                    </aside>
                </div>

                <section className="properties-details__section">
                    <div className="properties-details__grid">
                        <div className="properties-details__block properties-details__block--location">
                            <h3 className="properties-details__block-title">LOCALIZAÇÃO</h3>
                            <p className="properties-details__location-desc">
                                {locationDescription ??
                                    ""}
                            </p>
                            <ul>
                                {(locationHighlights ??
                                    []
                                ).map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="properties-details__block properties-details__block--leisure">
                            <h3 className="properties-details__block-title">DIFERENCIAIS</h3>
                            <ul className="properties-details__leisure-list">
                                {(leisureAreas ?? []).map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {plantas.length > 0 && (
                    <section className="properties-main__content properties-planta-section">
                        <h3 className="properties-planta-section__title">Planta do Imóvel</h3>
                        <div className="properties-planta-section__grid">
                            <div className="properties-planta-info">
                                <h4 className="properties-planta-info__name">{plantas[plantIndex].name}</h4>
                                <div className="properties-planta-info__specs">
                                    <div className="properties-planta-info__item">
                                        <Square size={24} aria-hidden className="properties-planta-info__icon" />
                                        <div className="properties-planta-info__text">
                                            <span className="properties-planta-info__value">{plantas[plantIndex].area}</span>
                                            <span className="properties-planta-info__label">Área privativa</span>
                                        </div>
                                    </div>
                                    <div className="properties-planta-info__item">
                                        <BedDouble size={24} aria-hidden className="properties-planta-info__icon" />
                                        <div className="properties-planta-info__text">
                                            <span className="properties-planta-info__value">{plantas[plantIndex].quartos}</span>
                                            <span className="properties-planta-info__label">Quartos</span>
                                        </div>
                                    </div>
                                    <div className="properties-planta-info__item">
                                        <Bath size={24} aria-hidden className="properties-planta-info__icon" />
                                        <div className="properties-planta-info__text">
                                            <span className="properties-planta-info__value">{plantas[plantIndex].banheiros}</span>
                                            <span className="properties-planta-info__label">Banheiro{plantas[plantIndex].banheiros > 1 ? "s" : ""}</span>
                                        </div>
                                    </div>
                                    <div className="properties-planta-info__item">
                                        <Sun size={24} aria-hidden className="properties-planta-info__icon" />
                                        <div className="properties-planta-info__text">
                                            <span className="properties-planta-info__value">Varanda</span>
                                            <span className="properties-planta-info__label">{plantas[plantIndex].varanda ? "Sim" : "Não"}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="properties-planta">
                                <div className="properties-planta__row">
                                    <button
                                        type="button"
                                        className="properties-planta__btn properties-planta__btn--prev"
                                        onClick={goPlantPrev}
                                        aria-label="Planta anterior"
                                    >
                                        <ChevronLeft size={24} aria-hidden />
                                    </button>
                                    <div className="properties-planta__viewport">
                                        <AnimatePresence mode="wait" custom={plantDirection} initial={false}>
                                            <m.div
                                                key={plantIndex}
                                                custom={plantDirection}
                                                variants={slideVariants}
                                                initial="enter"
                                                animate="center"
                                                exit="exit"
                                                className="properties-planta__slide"
                                            >
                                                <button
                                                    type="button"
                                                    className="properties-planta__image-btn"
                                                    onClick={() => setPlantaLightboxOpen(true)}
                                                    aria-label={`Ampliar ${plantas[plantIndex].alt}`}
                                                >
                                                    <img
                                                        src={getCloudinaryUrl(plantas[plantIndex].src, { width: 900, crop: true })}
                                                        alt={plantas[plantIndex].alt}
                                                        title={plantas[plantIndex].alt}
                                                        draggable={false}
                                                        sizes="(max-width: 640px) 100vw, 800px"
                                                    />
                                                </button>
                                            </m.div>
                                        </AnimatePresence>
                                    </div>
                                    <button
                                        type="button"
                                        className="properties-planta__btn properties-planta__btn--next"
                                        onClick={goPlantNext}
                                        aria-label="Próxima planta"
                                    >
                                        <ChevronRight size={24} aria-hidden />
                                    </button>
                                </div>
                                <div className="properties-planta__dots" role="group" aria-label="Navegação plantas">
                                    {plantas.map((_, index) => (
                                        <button
                                            key={plantas[index].id}
                                            type="button"
                                            aria-label={`Ir para planta ${index + 1}${index === plantIndex ? " (atual)" : ""}`}
                                            className={`properties-planta__dot ${index === plantIndex ? "properties-planta__dot--active" : ""}`}
                                            onClick={() => goToPlant(index)}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                )}
            </main>

            <section className="properties-other properties-other--centered">
                <div className="properties-other__container">
                    <div className="properties-other__inner">
                        <TitleSections title="CONTINUE EXPLORANDO" description="Veja outros empreendimentos disponíveis" />
                        <div className="properties-other__cta">
                            <div className="properties-other__btn-wrap">
                                <m.span
                                    className="properties-other__btn-shadow"
                                    aria-hidden
                                    animate={{ x: [-8, 8, -8] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                />
                                <button
                                    type="button"
                                    className="properties-other__btn"
                                    onClick={() => navigate("/", { state: { scrollToEmpreendimentos: true } })}
                                >
                                    Ver todos os imóveis
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <AnimatePresence>
                {plantaLightboxOpen && plantas[plantIndex] && (
                    <m.div
                        key="planta-lightbox"
                        className="properties-planta-lightbox"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        role="dialog"
                        aria-modal="true"
                        aria-label={plantas[plantIndex].alt}
                    >
                        <button
                            type="button"
                            className="properties-planta-lightbox__backdrop"
                            onClick={() => setPlantaLightboxOpen(false)}
                            aria-label="Fechar visualização"
                        />
                        <button
                            type="button"
                            className="properties-planta-lightbox__close"
                            onClick={() => setPlantaLightboxOpen(false)}
                            aria-label="Fechar"
                        >
                            <X size={28} aria-hidden />
                        </button>
                        <m.img
                            key={plantIndex}
                            className="properties-planta-lightbox__image"
                            src={getCloudinaryUrl(plantas[plantIndex].src)}
                            alt={plantas[plantIndex].alt}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            draggable={false}
                        />
                    </m.div>
                )}
            </AnimatePresence>
        </div>
    );
}
