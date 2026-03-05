import "../style/components/_Filter.scss";

export interface FilterValues {
    city: string;
    bedrooms: string;
}

interface FilterProps {
    values: FilterValues;
    cities: string[];
    onChange: (values: FilterValues) => void;
}

function formatCityLabel(slug: string): string {
    return slug
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");
}

export default function Filter({ values, cities, onChange }: FilterProps) {
    return (
        <div className="filter">
            <span className="filter-title">Filtre os Empreendimentos:</span>
            <label className="filter-label">
                <select
                    id="filter-city"
                    name="city"
                    className="filter-select"
                    value={values.city}
                    onChange={(e) =>
                        onChange({ ...values, city: e.target.value })
                    }
                    aria-label="Filtrar por cidade"
                >
                    <option value="">Cidades</option>
                    {cities.map((city) => (
                        <option key={city} value={city}>
                            {formatCityLabel(city)}
                        </option>
                    ))}
                </select>
            </label>
            <label className="filter-label">
                <select
                    id="filter-bedrooms"
                    name="bedrooms"
                    className="filter-select"
                    value={values.bedrooms}
                    onChange={(e) =>
                        onChange({ ...values, bedrooms: e.target.value })
                    }
                    aria-label="Filtrar por quantidade de quartos"
                >
                    <option value="">Quartos</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
            </label>
        </div>
    );
}
