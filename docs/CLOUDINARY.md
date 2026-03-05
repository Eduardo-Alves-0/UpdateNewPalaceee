# Guia: Migrar imagens para o Cloudinary

Este documento explica passo a passo como colocar as imagens do projeto no Cloudinary e deixar o frontend mais leve, removendo os arquivos locais.

---

## Índice

1. [Criar conta no Cloudinary](#1-criar-conta-no-cloudinary)
2. [Anotar seu Cloud Name](#2-anotar-seu-cloud-name)
3. [Criar a estrutura de pastas no Cloudinary](#3-criar-a-estrutura-de-pastas-no-cloudinary)
4. [Fazer upload das imagens](#4-fazer-upload-das-imagens)
5. [Configurar variável de ambiente no projeto](#5-configurar-variável-de-ambiente-no-projeto)
6. [Alterar o código para usar URLs do Cloudinary](#6-alterar-o-código-para-usar-urls-do-cloudinary)
7. [Remover as imagens locais](#7-remover-as-imagens-locais)
8. [Opcional: otimização automática (f_auto, tamanhos)](#8-opcional-otimização-automática)

---

## 1. Criar conta no Cloudinary

1. Acesse **[cloudinary.com](https://cloudinary.com)** e clique em **Sign Up for Free**.
2. Preencha e-mail, nome e senha. Aceite os termos e crie a conta.
3. Confirme o e-mail se for pedido.
4. Faça login no **Dashboard** (painel do Cloudinary).

---

## 2. Anotar seu Cloud Name

1. No Dashboard, no topo ou no menu, você verá algo como **Product Credentials** ou **Dashboard**.
2. Na página inicial do Dashboard aparecem:
   - **Cloud name** (ex.: `dxxxxxx`)
   - **API Key**
   - **API Secret**

Anote só o **Cloud name** por enquanto.  
Exemplo: se for `dabc123xyz`, a URL base das imagens será:

```text
https://res.cloudinary.com/dabc123xyz/image/upload
```

O **API Secret** não deve ser usado no frontend (só em uploads pelo backend). No frontend usamos apenas o Cloud name para montar as URLs públicas.

---

## 3. Criar a estrutura de pastas no Cloudinary

No Cloudinary não é obrigatório criar pastas antes; você pode usar **prefixos** no nome do arquivo no upload. O que importa é manter o mesmo “caminho” que o código espera.

Recomendação para este projeto:

| Pasta no Cloudinary | Conteúdo |
|---------------------|----------|
| `newpalace/hero` | 4 imagens do Hero |
| `newpalace/logo` | Logo do site (logo.jpeg) |
| `newpalace/images/startRecife` | Imagens da pasta startRecife |
| `newpalace/images/startCostaDourada` | Imagens da pasta startCostaDourada |
| … | Uma pasta por pasta em `src/assets/images/...` |

Ou, mais simples: subir tudo mantendo a mesma estrutura de pastas que você tem em `src/assets` (hero, images, etc.), usando um prefixo único (ex.: `newpalace`).

**Como criar pastas no Cloudinary:**

1. No menu lateral, vá em **Media Library**.
2. Clique em **Create folder** (ou **Add folder**).
3. Crie por exemplo: `newpalace` → dentro dela `hero`, `logo`, `images`.
4. Dentro de `images`, crie as mesmas subpastas que você tem em `src/assets/images/` (startRecife, startCostaDourada, auroraDosPassaros, etc.), para não se perder.

Assim, a URL de uma imagem ficará no formato:

```text
https://res.cloudinary.com/SEU_CLOUD_NAME/image/upload/newpalace/images/startRecife/empreendimentoStartRecife.jpg
```

---

## 4. Fazer upload das imagens

### Opção A: Upload pela Media Library (recomendado para começar)

1. Vá em **Media Library**.
2. Entre na pasta desejada (ex.: `newpalace/hero`).
3. Clique em **Upload** (ou **Browse**).
4. Selecione os arquivos. Você pode fazer vários uploads em sequência (hero primeiro, depois as pastas de empreendimentos).

Para as **4 imagens do Hero**:

- Pasta: `newpalace/hero`
- Arquivos:
  - `empreendimentoBrisaDosNobres.jpg`
  - `StartCostaDouradaGuarita.jpg`
  - `empreendimentoLikeBoaVista.png`
  - `empreendimentoStartRecife.jpg`

Para os **empreendimentos**:

- Suba cada pasta de `src/assets/images/` para a pasta correspondente em `newpalace/images/`.
- Ex.: conteúdo de `src/assets/images/startRecife/` → `newpalace/images/startRecife/`.

Para a **logo**:

- Suba `logo.jpeg` (raiz do projeto ou de onde estiver) para `newpalace/logo/logo.jpeg`.

Após o upload, ao clicar em uma imagem na Media Library o Cloudinary mostra a **URL**. Ela será algo como:

```text
https://res.cloudinary.com/SEU_CLOUD_NAME/image/upload/v1234567890/newpalace/hero/empreendimentoBrisaDosNobres.jpg
```

A parte `v1234567890` é a versão; você pode usar a URL **sem** o `v1234567890` para sempre pegar a última versão:

```text
https://res.cloudinary.com/SEU_CLOUD_NAME/image/upload/newpalace/hero/empreendimentoBrisaDosNobres.jpg
```

### Opção B: Upload em massa (script Node.js)

Se quiser automatizar o upload de muitas pastas, dá para usar a **API do Cloudinary** com um script em Node que percorre `src/assets` e faz o upload. Isso pode ser um segundo passo após você já ter testado com a Opção A.

---

## 5. Configurar variável de ambiente no projeto

Assim o projeto usa seu Cloud name sem deixá-lo fixo no código.

1. Na **raiz do projeto** (onde está o `package.json`), crie um arquivo `.env` (e, se quiser, um `.env.example` para documentar).

2. Conteúdo do **`.env`** (não commitar o `.env`; ele já deve estar no `.gitignore`):

```env
VITE_CLOUDINARY_CLOUD_NAME=seu_cloud_name_aqui
```

Substitua `seu_cloud_name_aqui` pelo Cloud name anotado no passo 2 (ex.: `dabc123xyz`).

3. No **Vercel** (ou outro host), configure a mesma variável:

- Project → **Settings** → **Environment Variables**
- Nome: `VITE_CLOUDINARY_CLOUD_NAME`
- Valor: seu Cloud name
- Ambiente: Production (e Preview se quiser)

4. Opcional: crie **`.env.example`** na raiz com uma linha: `VITE_CLOUDINARY_CLOUD_NAME=` (sem valor). Assim qualquer dev sabe que precisa preencher isso.

O projeto já tem o utilitário em **`src/config/cloudinary.ts`** (função `getCloudinaryUrl`). Use-o nos próximos passos.

---

## 6. Alterar o código para usar URLs do Cloudinary

A ideia: em vez de **importar** imagens, o código usa uma **URL base** + **caminho** da imagem no Cloudinary.

### 6.1 URL base no projeto

O projeto já inclui **`src/config/cloudinary.ts`** com a função `getCloudinaryUrl(path, options?)`. Ela usa `VITE_CLOUDINARY_CLOUD_NAME` e aplica `f_auto,q_auto` (formato e qualidade automáticos). O parâmetro `path` deve ser o caminho **no Cloudinary** (ex.: `newpalace/hero/empreendimentoBrisaDosNobres.jpg`). Se a variável não estiver definida, a função retorna string vazia; aí o código pode usar imagens locais como fallback.

### 6.2 Hero (4 imagens)

No **`src/components/Hero.tsx`**:

- Remova os 4 `import ... from '../../src/assets/heroImages/...'`.
- Importe: `import { getCloudinaryUrl } from "../config/cloudinary";`
- No JSX, troque `src={imagem1}` etc. por:

```tsx
src={getCloudinaryUrl("newpalace/hero/empreendimentoBrisaDosNobres.jpg")}
src={getCloudinaryUrl("newpalace/hero/StartCostaDouradaGuarita.jpg")}
src={getCloudinaryUrl("newpalace/hero/empreendimentoLikeBoaVista.png")}
src={getCloudinaryUrl("newpalace/hero/empreendimentoStartRecife.jpg")}
```

Ajuste os nomes dos arquivos exatamente como foram enviados ao Cloudinary.

### 6.3 Empreendimentos (`properties.ts`)

No **`src/data/properties.ts`**:

- Remova **todos** os `import img... from "../assets/images/..."`.
- No topo: `import { getCloudinaryUrl } from "../config/cloudinary";`
- Para cada imóvel, use `image: getCloudinaryUrl("newpalace/images/pasta/arquivo.jpg")`.

Exemplo para os primeiros itens:

```ts
import { getCloudinaryUrl } from "../config/cloudinary";

export const properties: Property[] = [
  {
    id: "1",
    image: getCloudinaryUrl("newpalace/images/startRecife/empreendimentoStartRecife.jpg"),
    name: "Condomínio Start Recife",
    ...
  },
  {
    id: "2",
    image: getCloudinaryUrl("newpalace/images/startCostaDourada/StartCostaDouradaGuarita.jpg"),
    ...
  },
  // ... todos os outros com o path correto
];
```

A regra: o **path** em `getCloudinaryUrl` deve ser igual ao caminho da imagem na Media Library do Cloudinary (incluindo pasta `newpalace/...` se você usou esse prefixo).

### 6.4 Logo (NavBar)

No **`src/components/NavBar.tsx`**:

- Remova o `import logo from "/logo.jpeg"`.
- Importe: `import { getCloudinaryUrl } from "../config/cloudinary";`
- Use no JSX: `src={getCloudinaryUrl("newpalace/logo/logo.jpeg")}` (ou uma variável `logoUrl`).

### 6.5 Vídeo (Abount)

O vídeo em `Abount.tsx` continua local por enquanto (ou você pode subir para o Cloudinary depois e trocar o `src` do `<video>` por uma URL do Cloudinary). Não é obrigatório para a migração das imagens.

---

## 7. Remover as imagens locais

Só faça isso **depois** de testar o site com as URLs do Cloudinary (local e, se possível, em preview no Vercel).

1. Confirme que todas as imagens usadas no código existem no Cloudinary e que os paths em `getCloudinaryUrl(...)` estão corretos.
2. Remova as pastas/arquivos locais que não são mais usados:
   - `src/assets/heroImages/` (as 4 imagens)
   - `src/assets/images/` (todas as pastas de empreendimentos)
   - A logo em `/logo.jpeg` (ou onde estiver), se passou a vir do Cloudinary.
3. **Mantenha** o que ainda for referenciado no código (ex.: vídeo em `src/assets/videos/` se não tiver migrado).
4. Rode o projeto de novo (`npm run dev`) e faça um build (`npm run build`) para garantir que não quebrou nada.

Assim o frontend fica mais leve: as imagens passam a ser carregadas do CDN do Cloudinary, e não entram mais no bundle do Vite.

---

## 8. Opcional: otimização automática

O Cloudinary permite passar parâmetros na URL para redimensionar e otimizar:

- **Formato automático:** `f_auto` (entrega WebP/AVIF quando o navegador aceita).
- **Largura:** `w_400` (ex.: para cards de empreendimentos).
- **Qualidade:** `q_auto`.

Exemplo de URL otimizada para um card:

```text
https://res.cloudinary.com/SEU_CLOUD_NAME/image/upload/w_600,f_auto,q_auto/newpalace/images/startRecife/empreendimentoStartRecife.jpg
```

O `getCloudinaryUrl` em `src/config/cloudinary.ts` já aceita `options: { width?: number }`. Nos cards você pode usar, por exemplo: `getCloudinaryUrl("newpalace/images/.../arquivo.jpg", { width: 600 })`. Isso é opcional; pode deixar para uma segunda etapa.

---

## Resumo rápido

| Etapa | O que fazer |
|-------|-------------|
| 1 | Criar conta no Cloudinary |
| 2 | Anotar o **Cloud name** |
| 3 | Criar pastas na Media Library (ex.: newpalace/hero, newpalace/images/...) |
| 4 | Fazer upload das imagens (Hero, logo, pastas de empreendimentos) |
| 5 | Criar `.env` com `VITE_CLOUDINARY_CLOUD_NAME` e configurar no Vercel |
| 6 | Criar `getCloudinaryUrl`, trocar Hero, properties.ts e NavBar para usar URLs |
| 7 | Testar bem e depois remover pastas/arquivos de imagens locais |
| 8 | (Opcional) Usar parâmetros na URL para otimização (f_auto, w_600, etc.) |

Se quiser, na próxima etapa podemos aplicar juntos as mudanças no código (criar `src/config/cloudinary.ts`, alterar `Hero.tsx`, `properties.ts` e `NavBar.tsx`) usando exatamente os caminhos que você definir no Cloudinary.
