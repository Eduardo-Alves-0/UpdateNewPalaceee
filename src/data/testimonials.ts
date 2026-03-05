export interface Testimonial {
    text: string;
    name?: string;
    role?: string;
}

export const testimonials: Testimonial[] = [
    {
        text: "Gostaria de agradecer aos corretores que fizeram do impossível, possível, que foi a realização desse sonho. Não apenas em um relacionamento de cliente e corretores, mais de amigos. Sou imensamente grato a @imobiliarianewpalace que deu todo apoio e suporte em todo processo do início ao fim!",
        role: "Comprador",
    },
    {
        text: "Quero expressar minha profunda gratidão por toda a ajuda e dedicação que vocês me ofereceram durante a compra do meu imóvel. Sei que não foi um processo fácil, mas com a experiência, paciência e cuidado de vocês, tudo se tornou mais tranquilo e seguro. Vocês estiveram ao meu lado em cada etapa, respondendo minhas dúvidas, orientando-me com clareza. Esse imóvel representa muito para mim, e saber que consegui alcançá-lo com sua ajuda torna essa conquista ainda mais especial. Muito obrigado por tudo!",
        name: "paulo_silva_885",
        role: "Comprador"
    },
];
