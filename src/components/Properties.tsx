import { useState, useMemo, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { MapPin, BedDouble, Bath, Square } from "lucide-react";
import TitleSections from "./TitleSections";
import Filter, { type FilterValues } from "./Filter";
import { properties } from "../data/properties";
import type { Property } from "../data/properties";
import "../style/components/_Properties.scss";

/** Retorna lista única de cidades a partir do campo city dos imóveis (apenas cidades que existem nos dados) */
function getUniqueCitiesFromProperties(props: Property[]): string[] {
    const cities = [...new Set(props.map((p) => p.city))];
    return cities.filter(Boolean).sort();
}

export default function Properties() {
    const sectionRef = useRef<HTMLElement>(null);
    const location = useLocation();

    useEffect(() => {
        const state = location.state as { scrollToEmpreendimentos?: boolean } | null;
        if (state?.scrollToEmpreendimentos && sectionRef.current) {
            sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, [location.state]);

    const [filter, setFilter] = useState<FilterValues>({
        city: "",
        bedrooms: "",
    });

    const cities = useMemo(() => getUniqueCitiesFromProperties(properties), []);

    const filteredProperties = useMemo(() => {
        return properties.filter((item) => {
            const matchCity =
                !filter.city || item.city === filter.city;
            const matchBedrooms =
                !filter.bedrooms || item.bedrooms === Number(filter.bedrooms);
            return matchCity && matchBedrooms;
        });
    }, [filter]);

    return (
        <section ref={sectionRef} className="properties" id="empreendimentos">
            <TitleSections
                title="EMPREENDIMENTOS"
                description="Conheça nossos imóveis disponíveis."
            />
            <Filter
                values={filter}
                cities={cities}
                onChange={setFilter}
            />
            {filteredProperties.length > 0 ? (
                <div className="properties-grid">
                    {filteredProperties.map((item) => (
                        <article key={item.id} className="properties-card">
                            <div className="properties-card-image-wrap">
                                <img
                                    src={item.image}
                                    alt={`Fachada do empreendimento ${item.name} em ${item.location}`}
                                    className="properties-card-image"
                                    loading="lazy"
                                    decoding="async"
                                />
                            </div>
                            <div className="properties-card-body">
                                <h3 className="properties-card-name">{item.name}</h3>
                                <p className="properties-card-location">
                                    <MapPin size={16} aria-hidden />
                                    {item.location}
                                </p>
                                <div className="properties-card-features">
                                    <span className="properties-card-feature">
                                        <BedDouble size={18} aria-hidden />
                                        {item.bedrooms}
                                    </span>
                                    <span className="properties-card-feature">
                                        <Bath size={18} aria-hidden />
                                        {item.bathrooms}
                                    </span>
                                    <span className="properties-card-feature">
                                        <Square size={18} aria-hidden />
                                        {item.area} m²
                                    </span>
                                </div>
                                <Link
                                    to={item.link ?? "/"}
                                    className="properties-card-btn"
                                    aria-label={`Ver detalhes de ${item.name}`}
                                >
                                    Ver {item.name}
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            ) : (
                <div className="properties-empty" role="status">
                    <p className="properties-empty-title">Nenhum imóvel encontrado</p>
                    <p className="properties-empty-text">
                        Tente ajustar os filtros (cidade ou quantidade de quartos) para ver mais opções.
                    </p>
                </div>
            )}
        </section>
    );
}
