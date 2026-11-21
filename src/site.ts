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
