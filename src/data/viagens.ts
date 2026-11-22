// Rotas das viagens, desenhadas no /mapa.
//
// Cada viagem é uma lista de paradas NA ORDEM em que passamos. O campo `by` diz como
// chegamos ATÉ aquela parada (vindo da anterior) e muda o traço no mapa:
//   carro / onibus / van → linha contínua · aviao → arco tracejado · barco → pontilhado
// `pending: true` marca um trecho que ainda não foi detalhado (aparece em cinza tracejado).
// `post` (opcional) é o slug de um post em src/content/blog para linkar a parada.

export type Transport = 'carro' | 'onibus' | 'van' | 'aviao' | 'barco' | 'trem' | 'a-pe';

export interface Stop {
  name: string;
  lat: number;
  lng: number;
  by?: Transport;
  pending?: boolean;
  post?: string;
}

export interface Trip {
  slug: string;
  name: string;
  /** Texto livre, ex.: "2025" ou "out/2025 – jan/2026". */
  when?: string;
  color: string;
  summary?: string;
  stops: Stop[];
}

export const TRIPS: Trip[] = [
  {
    slug: 'rota-das-emocoes',
    name: 'Rota das Emoções',
    when: '2025',
    color: '#fb8500',
    summary: 'De Natal até Belém pelo litoral do Nordeste, de carro.',
    stops: [
      { name: 'Natal', lat: -5.7945, lng: -35.211 },
      { name: 'Pureza', lat: -5.4639, lng: -35.555, by: 'carro' },
      { name: 'Macau', lat: -5.115, lng: -36.634, by: 'carro' },
      { name: 'Mossoró', lat: -5.188, lng: -37.344, by: 'carro' },
      { name: 'Tibau', lat: -4.837, lng: -37.255, by: 'carro' },
      { name: 'Fortaleza', lat: -3.7319, lng: -38.5267, by: 'carro' },
      { name: 'Canoa Quebrada', lat: -4.526, lng: -37.713, by: 'carro' },
      // TODO: paradas entre Canoa Quebrada e Belém
      { name: 'Belém', lat: -1.4558, lng: -48.4902, by: 'carro', pending: true },
    ],
  },
];

export const TRANSPORT_LABEL: Record<Transport, string> = {
  carro: 'carro',
  onibus: 'ônibus',
  van: 'van',
  aviao: 'avião',
  barco: 'barco',
  trem: 'trem',
  'a-pe': 'a pé',
};
