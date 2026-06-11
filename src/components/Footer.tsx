import { useNavigate } from 'react-router-dom';
import '../style/components/_Footer.scss';
import { MapPin, Phone, Mail, Instagram, BriefcaseBusiness } from 'lucide-react';
import { buildWhatsAppUrl } from '../utils/whatsapp';
import { env } from '../config/env';
import logo from '/logo.jpeg';
import { scrollToSection } from '../utils/scroll';

function useHandleNavClick() {
    const navigate = useNavigate();

    return (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
        e.preventDefault();
        const element = document.getElementById(sectionId);
        if (element) {
            scrollToSection(sectionId);
            return;
        }
        navigate("/");
        setTimeout(() => {
            const el = document.getElementById(sectionId);
            if (el) {
                scrollToSection(sectionId);
            } else {
                window.location.href = `/#${sectionId}`;
            }
        }, 120);
    };
}

export default function Footer() {
    const whatsappUrl = buildWhatsAppUrl(env.VITE_WHATSAPP_NUMBER);
    const handleNavClick = useHandleNavClick();

    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="footer-column footer-brand">
                    <a href="#inicio" className="footer-logo" onClick={(e) => handleNavClick(e, "inicio")}>
                        <img src={logo} alt="Logo New Palace" title="Logo New Palace" />
                        <div className="footer-logo-text">
                            <span className="footer-logo-name">New Palace</span>
                            <span className="footer-logo-tagline">IMOBILIÁRIA</span>
                        </div>
                    </a>
                    <p className="footer-description">
                        Transformando sonhos em realidade desde 2023. Sua imobiliária de confiança para encontrar o imóvel perfeito.
                    </p>
                    <div className="footer-social">
                        <a href="https://www.instagram.com/imobiliarianewpalace/" aria-label="Instagram"><Instagram size={18} /></a>
                        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><Phone size={18} /></a>
                        <a href={`https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${env.VITE_EMAIL}&su=${encodeURIComponent('Contato - New Palace Imobiliária')}`} target="_blank" rel="noopener noreferrer" aria-label="E-mail"><Mail size={18} /></a>
                    </div>
                </div>

                <div className="footer-column footer-links">
                    <h4>Links Rápidos</h4>
                    <ul>
                        <li><a href="#inicio" onClick={(e) => handleNavClick(e, "inicio")}>Início</a></li>
                        <li><a href="#sobre" onClick={(e) => handleNavClick(e, "sobre")}>Sobre</a></li>
                        <li><a href="#depoimentos" onClick={(e) => handleNavClick(e, "depoimentos")}>Depoimentos</a></li>
                        <li><a href="#empreendimentos" onClick={(e) => handleNavClick(e, "empreendimentos")}>Empreendimentos</a></li>
                    </ul>
                </div>

                <div className="footer-column footer-contact">
                    <h4>Contato</h4>
                    <ul>
                        <li>
                            <MapPin size={18} className="footer-icon" aria-hidden />
                            <span>Av. Caxangá, 5405 - Várzea<br />Recife - PE, Brasil</span>
                        </li>
                        <li>
                            <Phone size={18} className="footer-icon" aria-hidden />
                            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">+55 (81) 99675-9099</a>
                        </li>
                        <li>
                            <Mail size={18} className="footer-icon" aria-hidden />
                            <a href={`https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${env.VITE_EMAIL}&su=${encodeURIComponent('Contato - New Palace Imobiliária')}`} target="_blank" rel="noopener noreferrer">{env.VITE_EMAIL}</a>
                        </li>
                        <li>
                            <BriefcaseBusiness size={18} className="footer-icon" aria-hidden />
                            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="footer-fale-conosco">Trabalhe Conosco</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} New Palace Imobiliária. Todos os direitos reservados.</p>
            </div>
        </footer>
    );
}
