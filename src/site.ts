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

// Título e meta description de cada categoria (a intro editorial fica em CATEGORY_INTRO).
export const CATEGORY_META: Record<string, { title: string; description: string }> = {
  "Argentina": { title: "Argentina: roteiros e dicas de viagem | Siga Marisco", description: "Dicas de viagem para a Argentina: review do restaurante Abrasado, em Mendoza, e ideias de roteiro romântico por Mendoza e Bariloche. Veja os posts." },
  "Bolívia": { title: "Bolívia: roteiros e dicas de viagem | Siga Marisco", description: "Guias da Bolívia por quem foi: tour de 3 dias no Salar do Uyuni, Hotel Palacio de Sal e o que fazer em Santa Cruz de la Sierra. Comece a planejar." },
  "Brasil": { title: "Brasil: roteiros e dicas de viagem | Siga Marisco", description: "Roteiros pelo Rio de Janeiro e passeios perto de Natal, como a Trilha do Vale Encantado, a Lagoa da Juventude e as Ruínas de São João Lostau. Confira." },
  "Colômbia": { title: "Colômbia: roteiros e dicas de viagem | Siga Marisco", description: "O que fazer em Medellín, na Colômbia: Comuna 13, Guatapé, onde ficar e onde comer, além de destinos colombianos para a lua de mel. Confira os posts." },
  "Informação": { title: "Dicas de viagem e planejamento | Siga Marisco", description: "Dicas práticas para planejar a viagem: tamanho de mala permitido no avião e os destinos mais românticos da América do Sul para a lua de mel. Confira." },
  "Peru": { title: "Peru: roteiros e dicas de viagem | Siga Marisco", description: "Como chegar em Machu Picchu pelo trem, pela Hidrelétrica ou pelo Trekking Salkantay, com dicas de ingresso e da visita. Tudo para sua viagem ao Peru." },
};

export const PAGE_META = {
  "blog": { title: "Blog de viagem: todos os artigos | Siga Marisco", description: "Todos os roteiros, guias e reviews do Siga Marisco: Brasil, Bolívia, Peru, Colômbia, Argentina e dicas de viagem, com custos e experiências reais." },
  "contato": { title: "Contato | Siga Marisco", description: "Fale com o Siga Marisco por e-mail, Instagram ou YouTube: dúvidas sobre roteiros, sugestões de destinos e propostas de parceria. Vamos adorar conversar!" },
  "sobre": { title: "Sobre nós: Marina e Francisco | Siga Marisco", description: "Conheça a Marina e o Francisco, o casal nordestino por trás do Siga Marisco: quem somos, como viajamos e por que contamos tudo aqui no blog de viagem." },
};
