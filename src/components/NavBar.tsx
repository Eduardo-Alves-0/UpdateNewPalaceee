import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Menu, X } from "lucide-react"
import * as m from "motion/react-m";
import { AnimatePresence } from "motion/react"
import logo from "/logo.jpeg"
import { scrollToSection } from "../utils/scroll"
import "../style/components/_navBar.scss"

export default function Navbar() {
    const navigate = useNavigate()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isPastHero, setIsPastHero] = useState(false)

    useEffect(() => {
        const handleScroll = () => setIsPastHero(window.scrollY > 50)
        handleScroll()
        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const closeMenu = () => setIsMenuOpen(false)
    const toggleMenu = () => setIsMenuOpen((prev) => !prev)

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string, closeMenuCb?: () => void) => {
        e.preventDefault()

        const element = document.getElementById(sectionId)
        if (element) {
            scrollToSection(sectionId, closeMenuCb)
            return
        }

        // If element not on current page, navigate to home then scroll
        navigate("/", { replace: false })
        setTimeout(() => {
            const el = document.getElementById(sectionId)
            if (el) {
                scrollToSection(sectionId, closeMenuCb)
            } else {
                // fallback to hash navigation
                window.location.href = `/#${sectionId}`
            }
            if (closeMenuCb) closeMenuCb()
        }, 120)
    }

    return (
        <>
            <header className={`navbar ${isPastHero ? "navbar--scrolled" : ""}`}>
                <nav className="navbar-desktop" aria-label="Menu principal">
                    <a href="#inicio" className="logo-container" onClick={(e) => handleNavClick(e, "inicio")}>
                        <img id="logo" src={logo} alt="Logo New Palace" title="New Palace" />
                        <span>
                            <span id="logo-new">New</span> Palace
                        </span>
                    </a>
                    <ul className="menu">
                        <li><a href="#inicio" onClick={(e) => handleNavClick(e, "inicio")}>Início</a></li>
                        <li><a href="#sobre" onClick={(e) => handleNavClick(e, "sobre")}>Sobre Nós</a></li>
                        <li><a href="#depoimentos" onClick={(e) => handleNavClick(e, "depoimentos")}>Depoimentos</a></li>
                        <li><a href="#empreendimentos" onClick={(e) => handleNavClick(e, "empreendimentos")}>Empreendimentos</a></li>
                    </ul>
                    <a href="#contato" className="navbar-cta" onClick={(e) => handleNavClick(e, "contato")}>Fale Conosco</a>
                </nav>

                {/* Hamburger: visível apenas em telas menores */}
                <button
                    type="button"
                    className="menu-toggle"
                    onClick={toggleMenu}
                    aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
                >
                    <AnimatePresence mode="wait">
                        <m.span
                            key={isMenuOpen ? "close" : "open"}
                            initial={{ opacity: 0, rotate: -90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 90 }}
                            transition={{ duration: 0.2 }}
                            className="menu-toggle-icon"
                        >
                            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </m.span>
                    </AnimatePresence>
                </button>
            </header>

            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        <m.div
                            key="menu-overlay"
                            className="menu-overlay"
                            onClick={closeMenu}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            aria-hidden="true"
                        />
                        <m.div
                            key="menu-drawer"
                            className="menu-drawer"
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
                        >
                            <button
                                type="button"
                                className="menu-drawer-close"
                                onClick={closeMenu}
                                aria-label="Fechar menu"
                            >
                                <X size={28} />
                            </button>

                            <ul className="menu">
                                <li><a href="#inicio" onClick={(e) => handleNavClick(e, "inicio", closeMenu)}>Início</a></li>
                                <li><a href="#sobre" onClick={(e) => handleNavClick(e, "sobre", closeMenu)}>Sobre Nós</a></li>
                                <li><a href="#depoimentos" onClick={(e) => handleNavClick(e, "depoimentos", closeMenu)}>Depoimentos</a></li>
                                <li><a href="#empreendimentos" onClick={(e) => handleNavClick(e, "empreendimentos", closeMenu)}>Empreendimentos</a></li>
                            </ul>

                            <div className="menu-drawer-cta">
                                <a href="#contato" onClick={(e) => handleNavClick(e, "contato", closeMenu)}>Fale Conosco</a>
                            </div>
                        </m.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}
