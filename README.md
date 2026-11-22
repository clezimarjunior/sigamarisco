# Siga Marisco

Blog de viagem da Marina e do Francisco — feito em [Astro](https://astro.build), hospedado na Vercel.

## Rodar local

```bash
npm install
npm run dev
```

## Publicar um post

Crie `src/content/blog/<slug-do-post>.md`:

```md
---
title: "Título do post"
description: "Resumo de 1–2 frases (vira meta description)"
category: "Brasil"        # Brasil, Bolívia, Peru, Colômbia, Argentina, Informação...
date: 2026-11-21
cover: "https://…/foto.jpg"
---

Texto em Markdown ou HTML.
```

## Mapa (/mapa)

Para o post virar pin no mapa, adicione `places` no frontmatter (pode ter mais de um lugar):

```yaml
places:
  - { name: "Salar do Uyuni", lat: -20.1338, lng: -67.4891 }
```

Dica: no Google Maps, clique com o botão direito no lugar e copie as coordenadas.
O card do pin usa a capa/thumb e as primeiras fotos do post automaticamente.

O push para `main` publica sozinho na Vercel. Sitemap, RSS, schema (BlogPosting/Breadcrumb),
índice do artigo e posts relacionados são gerados automaticamente.
