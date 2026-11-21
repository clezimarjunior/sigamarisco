export const SITE = {
  name: 'Siga Marisco',
  url: 'https://www.sigamarisco.com',
  tagline: 'Blog de viagens e aventuras',
  description:
    'Blog de viagem do casal Marina e Francisco: roteiros, dicas e experiências reais pelo Brasil e América do Sul — de Natal/RN ao Salar de Uyuni.',
  email: 'sigamarisco@gmail.com',
  instagram: 'https://www.instagram.com/sigamarisco/',
  youtube: 'https://www.youtube.com/@sigamarisco',
};

export const slugify = (s: string) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export const readingTime = (html: string) =>
  Math.max(1, Math.round(html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length / 200));

export const fmtDate = (d: Date) =>
  d.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

// "Veja outros artigos": 3 posts escolhidos por relação (cluster), não pela data.
// Posts que não estiverem aqui usam a mesma categoria e completam com os mais recentes.
export const RELATED: Record<string, string[]> = {
  'como-chegar-em-machu-picchu': ['melhores-destinos-na-america-do-sul-para-lua-de-mel-os-9-mais-romanticos', 'mala-que-pode-levar-no-aviao-melhores-modelos-e-tamanhos-permitidos', 'passeio-salar-do-uyuni-bolivia'],
  'hotel-palacio-de-sal-nossa-experiencia-no-primeiro-hotel-de-sal-do-mundo': ['passeio-salar-do-uyuni-bolivia', 'o-que-fazer-em-santa-cruz-de-la-sierra', 'melhores-destinos-na-america-do-sul-para-lua-de-mel-os-9-mais-romanticos'],
  'lagoa-da-juventude-um-passeio-off-road-imperdivel': ['trilha-do-vale-encantado-tudo-que-voce-precisa-saber', 'ruinas-de-sao-joao-lostau-em-pium-rn', 'o-que-fazer-no-rio-de-janeiro-em-4-5-ou-7-dias'],
  'mala-que-pode-levar-no-aviao-melhores-modelos-e-tamanhos-permitidos': ['como-chegar-em-machu-picchu', 'passeio-salar-do-uyuni-bolivia', 'melhores-destinos-na-america-do-sul-para-lua-de-mel-os-9-mais-romanticos'],
  'melhores-destinos-na-america-do-sul-para-lua-de-mel-os-9-mais-romanticos': ['restaurante-abrasado-mendoza-review-completo', 'hotel-palacio-de-sal-nossa-experiencia-no-primeiro-hotel-de-sal-do-mundo', 'como-chegar-em-machu-picchu'],
  'o-que-fazer-em-medellin': ['melhores-destinos-na-america-do-sul-para-lua-de-mel-os-9-mais-romanticos', 'mala-que-pode-levar-no-aviao-melhores-modelos-e-tamanhos-permitidos', 'o-que-fazer-no-rio-de-janeiro-em-4-5-ou-7-dias'],
  'o-que-fazer-em-santa-cruz-de-la-sierra': ['passeio-salar-do-uyuni-bolivia', 'hotel-palacio-de-sal-nossa-experiencia-no-primeiro-hotel-de-sal-do-mundo', 'melhores-destinos-na-america-do-sul-para-lua-de-mel-os-9-mais-romanticos'],
  'o-que-fazer-no-rio-de-janeiro-em-4-5-ou-7-dias': ['trilha-do-vale-encantado-tudo-que-voce-precisa-saber', 'lagoa-da-juventude-um-passeio-off-road-imperdivel', 'mala-que-pode-levar-no-aviao-melhores-modelos-e-tamanhos-permitidos'],
  'passeio-salar-do-uyuni-bolivia': ['hotel-palacio-de-sal-nossa-experiencia-no-primeiro-hotel-de-sal-do-mundo', 'o-que-fazer-em-santa-cruz-de-la-sierra', 'melhores-destinos-na-america-do-sul-para-lua-de-mel-os-9-mais-romanticos'],
  'restaurante-abrasado-mendoza-review-completo': ['melhores-destinos-na-america-do-sul-para-lua-de-mel-os-9-mais-romanticos', 'o-que-fazer-em-medellin', 'mala-que-pode-levar-no-aviao-melhores-modelos-e-tamanhos-permitidos'],
  'ruinas-de-sao-joao-lostau-em-pium-rn': ['trilha-do-vale-encantado-tudo-que-voce-precisa-saber', 'lagoa-da-juventude-um-passeio-off-road-imperdivel', 'o-que-fazer-no-rio-de-janeiro-em-4-5-ou-7-dias'],
  'trilha-do-vale-encantado-tudo-que-voce-precisa-saber': ['lagoa-da-juventude-um-passeio-off-road-imperdivel', 'ruinas-de-sao-joao-lostau-em-pium-rn', 'o-que-fazer-no-rio-de-janeiro-em-4-5-ou-7-dias'],
};
