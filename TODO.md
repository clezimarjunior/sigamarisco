# Pendências do blog

## Posts para revisar (preços e informações que envelhecem)

Quando revisar um post de verdade, atualize o conteúdo e adicione no frontmatter
`updatedDate: AAAA-MM-DD`. A data aparece como "Atualizado em ..." no post e vira o
`dateModified` do schema e o `<lastmod>` do sitemap. **Não preencha sem revisão real.**

- [ ] `passeio-salar-do-uyuni-bolivia`: preço do tour (BOB 2.000 / R$ 1.400 o casal, 700 BOB por pessoa), entrada da Laguna Colorada (BOB 150), monumentos (BOB 10).
- [ ] `como-chegar-em-machu-picchu`: regras de ingresso e circuitos, preço das vans Cusco > Hidrelétrica (70 soles), trem e ônibus.
- [ ] `mala-que-pode-levar-no-aviao-melhores-modelos-e-tamanhos-permitidos`: medidas e pesos por companhia aérea, preço para despachar, links das companhias.
- [ ] `o-que-fazer-em-medellin`: hotéis e restaurantes indicados, tours e preços.
- [ ] `o-que-fazer-no-rio-de-janeiro-em-4-5-ou-7-dias`: preços de atrações, restaurantes e hospedagens.
- [ ] Também com preços: `hotel-palacio-de-sal-...` (diárias), `trilha-do-vale-encantado-...` (day use), `o-que-fazer-em-santa-cruz-de-la-sierra` (táxi, minivan, trem), `restaurante-abrasado-mendoza-review-completo`.

## Página /sobre

- [ ] Preencher os trechos marcados com `[PREENCHER]` em `src/pages/sobre.astro`.
  Enquanto houver `[PREENCHER]`, esses blocos **não aparecem no site publicado** (só no `npm run dev`).

## Autoria

- [ ] Hoje todos os posts estão assinados por Marina Petrovich. Se o Francisco escreveu algum
  (ou parte), dá para colocá-lo como coautor nesse post. Isso exige transformar o campo
  `author` em lista e ajustar o schema; não foi feito para não atribuir autoria sem confirmação.
