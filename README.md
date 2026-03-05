# New Palace Imobiliária

## Descrição

Site institucional da **New Palace Imobiliária**, uma plataforma moderna para apresentação de empreendimentos imobiliários. O projeto tem como objetivo divulgar imóveis, conectar potenciais clientes à imobiliária e proporcionar uma experiência de navegação fluida e informativa.

---

## Demonstração

[![Deploy na Vercel](https://vercel.com/button)](https://www.imobiliarianewpalace.com.br/)

---

## Funcionalidades Principais

- **Home** — Página inicial com hero dinâmico, seção sobre, depoimentos e grid de empreendimentos.
- **Imóveis** — Listagem de todos os empreendimentos com cards informativos.
- **Filtros** — Filtro por cidade e número de quartos para facilitar a busca.
- **Detalhes do Imóvel** — Páginas dedicadas a cada empreendimento com carrossel de imagens, plantas, preços, data de entrega e integração com WhatsApp.
- **Contato** — Seção de contato com formulário e informações para atendimento.
- **Layout Responsivo** — Interface adaptada para desktop, tablet e mobile.
- **Animações** — Transições suaves utilizando Motion.

---

## Tecnologias Utilizadas

| Stack        | Tecnologia        |
|-------------|--------------------|
| Framework   | React 19           |
| Build       | Vite 7             |
| Linguagem   | TypeScript         |
| Estilização | SASS               |
| Roteamento  | React Router DOM 7 |
| Animações   | Motion             |
| Ícones      | Lucide React       |
| Imagens     | Cloudinary (CDN)   |

---

## Estrutura de Pastas

```
newPalace/
├── public/              # Arquivos estáticos (favicon, logo, manifest)
├── src/
│   ├── components/      # Componentes reutilizáveis
│   │   ├── Hero.tsx           # Banner principal da home
│   │   ├── Abount.tsx         # Seção sobre a empresa
│   │   ├── Properties.tsx     # Grid de imóveis
│   │   ├── PropertiesLayout.tsx  # Layout base para páginas de imóveis
│   │   ├── Filter.tsx         # Filtros de busca
│   │   ├── Testimonials.tsx   # Depoimentos
│   │   ├── Contacts.tsx       # Seção de contato
│   │   ├── Companies.tsx      # Parceiros/empresas
│   │   ├── Footer.tsx         # Rodapé
│   │   └── NavBar.tsx         # Navegação
│   │
│   ├── pages/           # Páginas e rotas
│   │   ├── PropertyPage.tsx   # Template dinâmico por slug
│   │   └── *.tsx              # Páginas específicas de empreendimentos
│   │
│   ├── data/            # Dados estáticos
│   │   ├── properties.ts      # Lista de imóveis
│   │   └── testimonials.ts    # Depoimentos
│   │
│   ├── config/          # Configurações
│   │   └── cloudinary.ts     # Integração com Cloudinary
│   │
│   ├── style/           # Estilos SASS
│   │   ├── components/       # Estilos por componente
│   │   ├── scss/             # Variáveis e utilitários
│   │   └── style.scss        # Entrada principal
│   │
│   └── utils/           # Utilitários
│       ├── scroll.ts         # Restauração de scroll
│       └── slugify.ts        # Normalização de slugs
│
├── docs/                # Documentação adicional
├── .env.example         # Exemplo de variáveis de ambiente
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## Como Rodar o Projeto Localmente

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn

### Passo a passo

1. **Clone o repositório**

```bash
git clone <https://github.com/Eduardo-Alves-0/NewPalace---React.git>
cd newPalace
```

2. **Instale as dependências**

```bash
npm install
```

3. **Configure as variáveis de ambiente**

Crie um arquivo `.env` na raiz do projeto copiando o `.env.example`:

```bash
cp .env.example .env
```

Edite o `.env` e preencha:

```env
VITE_CLOUDINARY_CLOUD_NAME=seu_cloud_name
VITE_WHATSAPP_NUMBER=seu_numero_whatsapp
VITE_EMAIL=seu_email@exemplo.com
```

4. **Inicie o servidor de desenvolvimento**

```bash
npm run dev
```

5. **Acesse no navegador**

Abra [http://localhost:5173](http://localhost:5173)

---

## Como Gerar Build de Produção

```bash
npm run build
```

A pasta `dist/` será gerada com os arquivos otimizados. Para visualizar o build localmente:

```bash
npm run preview
```

Para deploy na Vercel, conecte o repositório ao projeto e configure as mesmas variáveis de ambiente nas configurações.

---

## Diferenciais do Projeto

- **UI moderna e limpa** — Interface focada em usabilidade e visual contemporâneo
- **Performance** — Uso de Cloudinary para otimização e entrega de imagens via CDN
- **Código organizado** — Separação clara entre componentes, páginas, dados e estilos
- **TypeScript** — Tipagem estática para maior segurança e manutenibilidade
- **SASS modular** — Estilos por componente com variáveis e boas práticas
- **Roteamento dinâmico** — Página de imóvel genérica via slug (`/properties/:slug`)
- **Acessibilidade** — Uso de `aria-label` e semântica adequada nos filtros
- **Boas práticas** — ESLint configurado, estrutura escalável

---

## Melhorias Futuras

- [ ] Modo escuro (dark mode).
- [ ] Internacionalização (i18n) para múltiplos idiomas.
- [ ] Integração com API de acessibilidades do Gov.
