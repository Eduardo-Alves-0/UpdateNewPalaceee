import { useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import * as m from "motion/react-m";
import { AnimatePresence } from "motion/react";
import TitleSections from "./TitleSections";
import { testimonials } from "../data/testimonials";
import "../style/components/_Testimonials.scss";

const slideVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 60 : -60,
        opacity: 0,
    }),
    center: {
        x: 0,
        opacity: 1,
    },
    exit: (direction: number) => ({
        x: direction > 0 ? -60 : 60,
        opacity: 0,
    }),
};

export default function Testimonials() {
    const [active, setActive] = useState(0);
    const [direction, setDirection] = useState(0);

    const previous = useCallback(() => {
        setDirection(-1);
        setActive((i) => (i === 0 ? testimonials.length - 1 : i - 1));
    }, []);

    const next = useCallback(() => {
        setDirection(1);
        setActive((i) => (i === testimonials.length - 1 ? 0 : i + 1));
    }, []);

    const goTo = useCallback((index: number) => {
        setDirection(index > active ? 1 : -1);
        setActive(index);
    }, [active]);

    const testimonial = testimonials[active];

    return (
        <section className="testimonials" id="depoimentos">
            <div className="testimonials-content">
                <div className="testimonials-col testimonials-col-title">
                    <TitleSections
                        title="DEPOIMENTOS"
                        description="O que nossos clientes dizem sobre a New Palace."
                    />
                </div>
                <div className="testimonials-col testimonials-col-card">
                    <div className="testimonials-card">
                        <div className="testimonials-card-slider">
                            <AnimatePresence mode="wait" initial={false} custom={direction}>
                                <m.div
                                    key={active}
                                    custom={direction}
                                    variants={slideVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{
                                        x: { type: "tween", duration: 0.35, ease: "easeOut" },
                                        opacity: { duration: 0.25 },
                                    }}
                                    className="testimonials-card-inner"
                                >
                                    <div className="testimonials-card-quote-area">
                                        <p className="testimonials-card-text">"{testimonial.text}"</p>
                                        <Quote className="testimonials-card-icon-quote" size={80} aria-hidden />
                                    </div>
                                    <div className="testimonials-card-footer">
                                        <div className="testimonials-card-author">
                                            <strong className="testimonials-card-name">{testimonial.name}</strong>
                                            {testimonial.role && <span className="testimonials-card-role">{testimonial.role}</span>}
                                        </div>
                                        <div className="testimonials-card-nav">
                                            <button
                                                type="button"
                                                className="testimonials-card-btn"
                                                onClick={previous}
                                                aria-label="Depoimento anterior"
                                            >
                                                <ChevronLeft size={24} />
                                            </button>
                                            <button
                                                type="button"
                                                className="testimonials-card-btn"
                                                onClick={next}
                                                aria-label="Próximo depoimento"
                                            >
                                                <ChevronRight size={24} />
                                            </button>
                                        </div>
                                    </div>
                                </m.div>
                            </AnimatePresence>
                        </div>
                        <div className="testimonials-card-dots">
                            {testimonials.map((_, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    className={`testimonials-card-dot ${i === active ? "active" : ""}`}
                                    onClick={() => goTo(i)}
                                    aria-label={`Ir ao depoimento ${i + 1}`}
                                    aria-current={i === active ? "true" : undefined}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
