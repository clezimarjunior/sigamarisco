// Regra 90/180 do Espaço Schengen (Regulamento (UE) 2016/399, art. 6.º):
// em cada dia de permanência, somam-se os dias passados no Espaço Schengen
// nos 180 dias que terminam nesse dia (o próprio dia + os 179 anteriores). O total não pode passar de 90.
// O dia de entrada e o dia de saída contam como dias inteiros.
// Datas viram "número do dia" em UTC para não sofrer com fuso e horário de verão.

export const LIMIT = 90;
export const WINDOW = 180;
const DAY = 86_400_000;

export type Trip = { entry: string; exit: string }; // AAAA-MM-DD

export const isValidIso = (s: string) => /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(Date.parse(s));
export const toDay = (iso: string): number => Math.floor(Date.parse(`${iso}T00:00:00Z`) / DAY);
export const toIso = (n: number): string => new Date(n * DAY).toISOString().slice(0, 10);
export const todayDay = (): number => {
  const t = new Date();
  return Math.floor(Date.UTC(t.getFullYear(), t.getMonth(), t.getDate()) / DAY);
};

/** Dias (números) passados no Espaço Schengen. Viagens sobrepostas não contam em dobro. */
export function stayDays(trips: Trip[]): Set<number> {
  const set = new Set<number>();
  for (const t of trips) {
    if (!isValidIso(t.entry) || !isValidIso(t.exit)) continue;
    const a = toDay(t.entry), b = toDay(t.exit);
    if (b < a || b - a > 3650) continue;
    for (let d = a; d <= b; d++) set.add(d);
  }
  return set;
}

/** Dias usados na janela de 180 dias que termina em `day` (inclusive). */
export function usedOn(days: Set<number>, day: number): number {
  let n = 0;
  for (let d = day - WINDOW + 1; d <= day; d++) if (days.has(d)) n++;
  return n;
}

/** Primeiro dia em que a soma passou de 90 (permanência irregular), se houver. */
export function firstOverstay(days: Set<number>): { day: number; used: number } | null {
  for (const d of [...days].sort((a, b) => a - b)) {
    const u = usedOn(days, d);
    if (u > LIMIT) return { day: d, used: u };
  }
  return null;
}

/**
 * Quantos dias seguidos dá para ficar entrando em `entry` (máx. 90), sem que nenhum dia —
 * desta estadia ou de viagens futuras já registradas — passe de 90 na sua janela de 180 dias.
 */
export function maxStay(days: Set<number>, entry: number): number {
  // cnt[i] = dias usados na janela que termina em (base + i)
  const base = entry;
  const span = LIMIT + WINDOW * 2;
  const cnt = new Int16Array(span);
  for (let i = 0; i < span; i++) cnt[i] = usedOn(days, base + i);
  const stay = (i: number) => days.has(base + i);
  // checa se algum dia de permanência em [from, from+179] passa do limite
  const okFrom = (from: number, added: Set<number>) => {
    for (let i = from; i < Math.min(span, from + WINDOW); i++) {
      if ((stay(i) || added.has(i)) && cnt[i] > LIMIT) return false;
    }
    return true;
  };
  const added = new Set<number>();
  let len = 0;
  for (let i = 0; len < LIMIT && i < span; i++) {
    if (stay(i)) { len++; continue; } // esse dia já está numa viagem registrada
    for (let j = i; j < Math.min(span, i + WINDOW); j++) cnt[j]++;
    added.add(i);
    if (!okFrom(i, added)) break;
    len++;
  }
  return len;
}

/** Primeira data a partir de `from` em que dá para entrar e ficar `wanted` dias seguidos. */
export function nextDateFor(days: Set<number>, from: number, wanted: number = LIMIT): number | null {
  for (let d = from; d <= from + WINDOW * 2; d++) if (maxStay(days, d) >= wanted) return d;
  return null;
}

/**
 * Datas, depois de `ref`, em que dias passados saem da janela de 180 dias e voltam a ficar livres.
 * Considera só viagens até `ref`. Dias seguidos viram um bloco: { início, quantos dias voltam }.
 */
export function recoveries(days: Set<number>, ref: number, max = 3): { day: number; regained: number }[] {
  const out: { day: number; regained: number }[] = [];
  for (let d = ref + 1; d <= ref + WINDOW; d++) {
    const leaving = d - WINDOW; // dia que sai da janela em `d`
    if (leaving > ref || !days.has(leaving)) continue;
    const last = out.at(-1);
    if (last && last.day + last.regained === d) last.regained++;
    else if (out.length < max) out.push({ day: d, regained: 1 });
    else break;
  }
  return out;
}

export type Summary = {
  used: number; // dias usados na janela que termina na data de referência
  left: number;
  overstay: { day: number; used: number } | null;
  stayFromRef: number; // entrando na data de referência, quantos dias seguidos dá para ficar
  windowStart: number;
};

export function summarize(trips: Trip[], ref: number): Summary {
  const days = stayDays(trips);
  const used = usedOn(days, ref);
  return {
    used,
    left: Math.max(0, LIMIT - used),
    overstay: firstOverstay(days),
    stayFromRef: maxStay(days, ref),
    windowStart: ref - WINDOW + 1,
  };
}
