/**
 * Faz scroll suave até uma seção usando animação do Motion.
 * @param targetId - ID do elemento (ex: "inicio", "sobre")
 * @param onComplete - Callback opcional executado ao finalizar o scroll
 */
export function scrollToSection(targetId: string, onComplete?: () => void): void {
    const element = document.getElementById(targetId);
    if (!element) return;

    element.scrollIntoView({ behavior: "smooth", block: "start" });

    if (onComplete) {
        setTimeout(() => onComplete(), 800);
    }
}
