import '../style/components/_Companies.scss';
import { getCloudinaryUrl } from "../config/cloudinary";
import * as m from "motion/react-m";

const LOGOS = [
    { id: 'ACLF', src: "v1770332083/logoACLF_ikixvu.png", alt: 'Logo ACLF', title: 'Logo ACLF' },
    { id: 'MaxPlural', src: "v1770332080/logMaxPlural_nqibf8.png", alt: 'Logo Max Plural', title: 'Logo Max Plural' },
    { id: 'Tenda', src: "v1770332072/logoTenda_jtlhfn.png", alt: 'Logo Tenda', title: 'Logo Tenda' },
    { id: 'VL', src: "v1770332076/logoVL_jokrgm.png", alt: 'Logo VL', title: 'Logo VL' },
    { id: 'UsinaDeObras', src: "v1770332075/logoUsinaDeObras_dsghox.png", alt: 'Logo Usina de Obras', title: 'Logo Usina de Obras' },
    { id: 'TenorioSimoes', src: "v1770332074/logoTenorioSimoes_xx5vp1.png", alt: 'Logo Tenorio Simoes', title: 'Logo Tenorio Simoes' },
    { id: 'SBM', src: "v1770332071/logoSBM_q1ju8p.png", alt: 'Logo SBM', title: 'Logo SBM' },
    { id: 'MultTecnica', src: "v1770332069/logoMultTecnica_d7f5jd.png", alt: 'Logo Mult Tecnica', title: 'Logo Mult Tecnica' },
    { id: 'JMA', src: "v1770332066/logoJMA_irqllj.png", alt: 'Logo JMA', title: 'Logo JMA' },
    { id: 'Hexagonal', src: "v1770332064/logoHexagonal_dbnhkx.png", alt: 'Logo Hexagonal', title: 'Logo Hexagonal' },
    { id: 'ExataLife', src: "v1770332062/logoExataLife_zxcqk6.png", alt: 'Logo Exata Life', title: 'Logo Exata Life' },
    { id: 'Escopo', src: "v1770332061/logoEscopo_neloul.png", alt: 'Logo Escopo', title: 'Logo Escopo' },
    { id: 'Direcional', src: "v1770332060/logoDirecional_oqd5fd.png", alt: 'Logo Direcional', title: 'Logo Direcional' },
    { id: 'Carrilho', src: "v1770332058/logoCarrilho_vhbxex.png", alt: 'Logo Carrilho', title: 'Logo Carrilho' },
    { id: 'AzevedoCastro', src: "v1770332057/logoAzevedoCastro_z6p5se.png", alt: 'Logo Azevedo Castro', title: 'Logo Azevedo Castro' },
    { id: 'Artec', src: "v1770332056/logoArtec_gzeo5g.png", alt: 'Logo Artec', title: 'Logo Artec' },
    { id: 'Albuquerque', src: "v1770332054/logoAlbuquerque_bpuvx2.png", alt: 'Logo Albuquerque', title: 'Logo Albuquerque' },
    { id: 'AF', src: "v1770332053/logoAF_ryktji.png", alt: 'Logo AF', title: 'Logo AF' },
];

export default function Companies() {
    return (
        <section className="companies">
            <h2 id='companies-title'>CONSTRUTORAS PARCEIRAS</h2>

            <div className="companies-content">
                <m.div
                    className="companies-track"
                    animate={{ x: ['0%', '-50%'] }}
                    transition={{
                        repeat: Infinity,
                        repeatType: 'loop',
                        duration: 25,
                        ease: 'linear',
                    }}
                >
                    {[...LOGOS, ...LOGOS].map((logo, index) => (
                        <m.img
                            key={`${logo.id}-${index}`}
                            src={getCloudinaryUrl(logo.src)}
                            alt={logo.alt}
                            title={logo.title}
                        />
                    ))}
                </m.div>
            </div>
        </section>
    );
}