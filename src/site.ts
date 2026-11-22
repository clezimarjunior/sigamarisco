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

/** URL da subcategoria de estado: /categoria/brasil/para */
export const stateUrl = (state: string) => `/categoria/brasil/${slugify(state)}`;

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
  "Brasil": { title: "Brasil: roteiros e dicas de viagem | Siga Marisco", description: "Passeios perto de Natal, como a Trilha do Vale Encantado e a Lagoa da Juventude, roteiros pelo Rio de Janeiro e a Praia do Céu, no Marajó. Confira." },
  "Colômbia": { title: "Colômbia: roteiros e dicas de viagem | Siga Marisco", description: "O que fazer em Medellín, na Colômbia: Comuna 13, Guatapé, onde ficar e onde comer, além de destinos colombianos para a lua de mel. Confira os posts." },
  "Informação": { title: "Dicas de viagem e planejamento | Siga Marisco", description: "Dicas práticas para planejar a viagem: tamanho de mala permitido no avião e os destinos mais românticos da América do Sul para a lua de mel. Confira." },
  "Peru": { title: "Peru: roteiros e dicas de viagem | Siga Marisco", description: "Como chegar em Machu Picchu pelo trem, pela Hidrelétrica ou pelo Trekking Salkantay, com dicas de ingresso e da visita. Tudo para sua viagem ao Peru." },
};

// Subcategorias de Brasil (estados). Só ganham página os estados que têm posts.
// Se um estado não estiver aqui, a página usa um título/descrição padrão.
export const STATE_META: Record<string, { title: string; description: string }> = {
  "Pará": { title: "Pará: roteiros e dicas de viagem | Siga Marisco", description: "Belém, Ilha do Marajó e Alter do Chão: Círio de Nazaré, Ver-o-Peso, Praia do Céu e Pindobal, com preços e dicas de quem foi. Veja os posts do Pará." },
  "Paraná": { title: "Paraná: roteiros e dicas de viagem | Siga Marisco", description: "O que fazer em Curitiba, no Paraná: Feira do Largo da Ordem, quanto gastamos e o que visitar a pé por perto. Confira os posts do Paraná." },
  "Rio Grande do Norte": { title: "Rio Grande do Norte: passeios e dicas | Siga Marisco", description: "Passeios perto de Natal, no RN: Trilha do Vale Encantado, Ruínas de São João Lostau e Lagoa da Juventude, em Pium e Nísia Floresta. Confira." },
  "Rio de Janeiro": { title: "Rio de Janeiro: roteiros e dicas de viagem | Siga Marisco", description: "Roteiro completo para o Rio de Janeiro em 4, 5 ou 7 dias: pontos turísticos, trilhas, praias, onde comer e onde ficar. Veja o post do Rio." },
};

export const PAGE_META = {
  "blog": { title: "Blog de viagem: todos os artigos | Siga Marisco", description: "Todos os roteiros, guias e reviews do Siga Marisco: Brasil, Bolívia, Peru, Colômbia, Argentina e dicas de viagem, com custos e experiências reais." },
  "contato": { title: "Contato | Siga Marisco", description: "Fale com o Siga Marisco por e-mail, Instagram ou YouTube: dúvidas sobre roteiros, sugestões de destinos e propostas de parceria. Vamos adorar conversar!" },
  "sobre": { title: "Sobre nós: Marina e Francisco | Siga Marisco", description: "Conheça a Marina e o Francisco, o casal nordestino por trás do Siga Marisco: quem somos, como viajamos e por que contamos tudo aqui no blog de viagem." },
};

// Introdução editorial de cada categoria (100 a 180 palavras), baseada no que os posts cobrem.
export const CATEGORY_INTRO: Record<string, string[]> = {
  "Argentina": [
    "A Argentina entrou no nosso roteiro pelo vinho e pela comida. Em Mendoza, a capital vinícola do país, fomos conhecer o Abrasado, restaurante que fica na Bodega Los Toneles e é especializado em harmonizar vinhos com carnes. No review contamos, com sinceridade, como foram os pratos, os vinhos, a estrutura do espaço e quanto custou, para você decidir se vale reservar.",
    "Se você está pensando em viajar a dois, Mendoza e Bariloche também aparecem na nossa lista de destinos românticos na América do Sul, com paisagens de montanha, lagos e vinícolas. Aos poucos vamos trazer mais roteiros pela Argentina por aqui.",
  ],
  "Bolívia": [
    "A Bolívia é um dos países que mais nos marcaram. Foi no Salar do Uyuni que aconteceu o nosso pedido de casamento, e é por isso que o roteiro de 3 dias pelo salar está contado com tanto detalhe: o que vimos em cada dia, o que levar, a melhor época e quanto pagamos pelo tour.",
    "Também contamos como foi se hospedar no Hotel Palacio de Sal, o primeiro hotel construído com sal, com a estrutura de lazer e os preços da nossa estadia. Do outro lado do país, o guia de Santa Cruz de la Sierra reúne o centro histórico, passeios como Samaipata, Las Cuevas, Lomas de Arena e o Parque Amboró, além de onde ficar, onde comer e como chegar, inclusive pelo trem que sai da fronteira com Corumbá.",
  ],
  "Brasil": [
    "Somos nordestinos e moramos em Pium, em Parnamirim, pertinho de Natal, então boa parte dos posts sobre o Brasil nasce de passeios pelo Rio Grande do Norte. Em Pium, a cerca de 20 km da capital, mostramos a Trilha do Vale Encantado, fácil e boa para iniciantes, e as Ruínas de São João Lostau, um lugar pouco conhecido cheio de história. Seguindo para Nísia Floresta, levamos o nosso carro 4x4 até a Lagoa da Juventude.",
    "Fora do Nordeste, o Rio de Janeiro ganhou um roteiro completo de 4, 5 ou 7 dias, com pontos turísticos, trilhas e praias, além de onde comer e onde se hospedar. No Pará, mostramos a Praia do Céu, na Ilha do Marajó: como chegar, a vila de casas coloridas sobre palafitas e onde almoçar.",
  ],
  "Colômbia": [
    "Fomos a Medellín sem muitas expectativas, para reencontrar amigos do Francisco que moram lá, e saímos surpresos com tudo o que a cidade oferece. No guia de Medellín reunimos os passeios que fizemos e indicamos: o centro e a Plaza Botero, El Poblado, a Comuna 13, o Pueblito Paisa, o Jardim Botânico, o teleférico e o bate-volta para Guatapé e a Piedra del Peñol.",
    "Também deixamos sugestões de onde se hospedar com segurança e de restaurantes para provar a culinária paisa. Se a ideia é uma viagem romântica, Cartagena e San Andrés estão na nossa lista de destinos para lua de mel na América do Sul.",
  ],
  "Informação": [
    "Nem todo post daqui é sobre um destino específico. Nesta seção ficam as dicas que ajudam a planejar qualquer viagem, reunidas a partir do que aprendemos na estrada e de pesquisa nas regras das companhias aéreas.",
    "No guia de bagagem explicamos as medidas da mochila de item pessoal, da mala de mão e da bagagem despachada, o que pode e o que não pode ir em cada uma e quanto costuma custar despachar, sempre lembrando de conferir as regras da sua companhia aérea. Já a lista de destinos para lua de mel reúne nove lugares românticos na América do Sul, de Cartagena a Foz do Iguaçu, com links para os roteiros que já fizemos.",
  ],
  "Peru": [
    "Machu Picchu é um daqueles lugares que todo mundo quer conhecer, mas chegar até lá exige planejamento. No nosso guia explicamos como funcionam os ingressos e os circuitos de visita, e comparamos as três formas mais conhecidas de chegar: o Trekking Salkantay, o caminho da Hidrelétrica, que é a opção mais barata, e o trem.",
    "Também mostramos como subir de Aguas Calientes até a cidadela, de ônibus ou pela trilha, e reunimos cinco dicas para aproveitar melhor a visita, como comprar o ingresso com antecedência e dormir em Aguas Calientes. Se você vai combinar o Peru com a Bolívia, vale ver também os nossos roteiros bolivianos.",
  ],
};

// Introdução curta de cada estado (baseada nos posts publicados).
export const STATE_INTRO: Record<string, string[]> = {
  "Pará": [
    "Passamos um tempo no Pará em outubro de 2026 e os posts daqui saíram da estrada: Belém, a Ilha do Marajó e Alter do Chão, no oeste do estado. Em Belém, contamos como foi assistir ao Círio de Nazaré da arquibancada e visitar o Mercado de Carne, ao lado do Ver-o-Peso.",
    "No Marajó, mostramos a Praia do Céu, em Soure, e em Alter do Chão, um dia inteiro na Praia do Pindobal, com quanto gastamos e se dá para trabalhar por lá.",
  ],
  "Paraná": [
    "Do Paraná, por enquanto, temos Curitiba: a Feira do Largo da Ordem, que só acontece aos domingos, com quanto gastamos comendo e um roteiro a pé pelos museus, a mesquita, o Memorial e a Catedral que ficam por perto.",
  ],
  "Rio Grande do Norte": [
    "O Rio Grande do Norte é a nossa casa, então estes são os passeios que fazemos perto de Natal. Em Pium, mostramos a Trilha do Vale Encantado e as Ruínas de São João Lostau, e em Nísia Floresta, a Lagoa da Juventude, que fomos conhecer de 4x4.",
  ],
  "Rio de Janeiro": [
    "O Rio de Janeiro ganhou um roteiro completo de 4, 5 ou 7 dias, com pontos turísticos, trilhas, praias, onde comer e onde se hospedar.",
  ],
};

// ---- Schema.org compartilhado ----
export const ORG_ID = `${SITE.url}/#organization`;
export const SOCIAL = [SITE.youtube, SITE.instagram];

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ORG_ID,
  name: SITE.name,
  url: SITE.url,
  logo: { '@type': 'ImageObject', url: `${SITE.url}/brand/logo.svg` },
  email: SITE.email,
  sameAs: SOCIAL,
};

/** Autores conhecidos. A âncora aponta para o bloco da pessoa em /sobre. */
export const AUTHORS: Record<string, { id: string; url: string; avatar?: string }> = {
  'Marina Petrovich': { id: `${SITE.url}/sobre#marina`, url: `${SITE.url}/sobre#marina`, avatar: '/images/brand/marina-thumb.webp' },
  'Francisco Oliveira': { id: `${SITE.url}/sobre#francisco`, url: `${SITE.url}/sobre#francisco`, avatar: '/images/brand/francisco-thumb.webp' },
};

export const personSchema = (name: string) => ({
  '@type': 'Person',
  '@id': AUTHORS[name]?.id,
  name,
  url: AUTHORS[name]?.url ?? `${SITE.url}/sobre`,
  image: AUTHORS[name]?.avatar ? `${SITE.url}${AUTHORS[name].avatar}` : undefined,
  sameAs: SOCIAL,
});

/** "Marina Petrovich" ou "Marina Petrovich e Francisco Oliveira" */
export const authorNames = (d: { author: string; coauthors?: string[] }) => {
  const all = [d.author, ...(d.coauthors ?? [])];
  return all.length > 1 ? `${all.slice(0, -1).join(', ')} e ${all.at(-1)}` : all[0];
};

/** Autores do post com avatar, na ordem de assinatura. */
export const postAuthors = (d: { author: string; coauthors?: string[] }) =>
  [d.author, ...(d.coauthors ?? [])].map((name) => ({ name, avatar: AUTHORS[name]?.avatar ?? '/images/brand/marina-thumb.webp' }));

// ---- Ferramentas (micro apps de SEO) ----
// Cada ferramenta tem página própria em /ferramentas/<slug>. A lista alimenta o hub /ferramentas.
export const TOOLS = [
  {
    slug: 'calculadora-schengen',
    name: 'Calculadora Schengen',
    tagline: 'Quantos dias você ainda pode ficar na Europa pela regra 90/180',
    description: 'Some as entradas e saídas do Espaço Schengen e veja quantos dos 90 dias ainda restam, até quando pode ficar e quando os dias voltam.',
    emoji: '🇪🇺',
    published: '2026-11-22',
    updated: '2026-11-22',
  },
];
