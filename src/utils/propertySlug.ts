import type { Property } from "../types/property";
import slugify from "./slugify";

export function getPropertySlug(property: Property): string {
    return property.link ? property.link.replace(/^\//, "") : slugify(property.name);
}

export function getPropertyPath(property: Property): string {
    return `/${getPropertySlug(property)}`;
}

export function findPropertyBySlug(slug: string, list: Property[]): Property | undefined {
    return list.find((property) => getPropertySlug(property) === slug);
}

export function getUniquePropertyPaths(list: Property[]): string[] {
    const paths = new Set<string>();
    for (const property of list) {
        paths.add(getPropertyPath(property));
    }
    return [...paths].sort();
}
