// Mapa interativo do /mapa (Leaflet + markercluster). Só é carregado nessa página.
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';

type Photo = { src: string; alt: string };
type Pin = {
  id: string; slug: string; place: string; lat: number; lng: number; title: string;
  country: string; flag: string; state?: string; date: string; ts: number; thumb: string; pin: string; photos: Photo[];
};

// Provedor de tiles: OpenStreetMap (sem chave). O visual "limpo" vem do filtro CSS em .leaflet-tile-pane.
// Para trocar por um provedor com estilo próprio (MapTiler, Stadia...), mude a URL e a atribuição aqui.
const TILES = {
  url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  maxZoom: 19,
};

const pins = JSON.parse(document.getElementById('map-data')!.textContent!) as Pin[];
const byId = new Map(pins.map((p) => [p.id, p]));
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const coarse = matchMedia('(pointer: coarse)').matches;
const mobileQ = matchMedia('(max-width: 899px)');
const isMac = /Mac|iPhone|iPad/.test(navigator.userAgent);

const hero = document.querySelector('.mx-hero') as HTMLElement;
const mapEl = document.getElementById('map')!;
const panel = document.getElementById('mx-panel')!;
const placeEl = document.getElementById('mx-place')!;
const hintEl = hero.querySelector('.mx-hint') as HTMLElement;
const skeleton = hero.querySelector('.mx-skeleton') as HTMLElement;
const HEADER = 72;

// ---------- Mapa ----------
const map = L.map(mapEl, {
  minZoom: 2,
  zoomSnap: 0.5,
  zoomControl: false,
  scrollWheelZoom: false, // zoom só com Ctrl/⌘ + scroll (ver abaixo)
  dragging: !coarse, // no celular, um dedo rola a página; dois dedos movem/zoom
  touchZoom: true,
  worldCopyJump: true,
  keyboard: true,
  zoomAnimation: !reduced,
  markerZoomAnimation: !reduced,
  fadeAnimation: !reduced,
});
L.control.zoom({ position: 'bottomright', zoomInTitle: 'Aproximar', zoomOutTitle: 'Afastar' }).addTo(map);
map.attributionControl.setPrefix('<a href="https://leafletjs.com">Leaflet</a>');

const tiles = L.tileLayer(TILES.url, { maxZoom: TILES.maxZoom, attribution: TILES.attribution }).addTo(map);
const hideSkeleton = () => skeleton.classList.add('is-done');
tiles.once('load', hideSkeleton);
setTimeout(hideSkeleton, 5000); // não deixa o skeleton preso se algum tile falhar

// ---------- Espaço ocupado pelos cards (para o enquadramento) ----------
const insets = () => {
  if (mobileQ.matches) {
    const sheet = hero.classList.contains('has-place') ? placeEl : panel;
    return { tl: L.point(24, HEADER + 24), br: L.point(24, sheet.offsetHeight + 24) };
  }
  const p = panel.getBoundingClientRect();
  const right = hero.classList.contains('has-place') ? placeEl.offsetWidth + 48 : 48;
  return { tl: L.point(p.right + 32, HEADER + 32), br: L.point(right, 72) };
};
const syncControls = () => {
  const m = mobileQ.matches;
  mapEl.style.setProperty('--map-bottom-inset', m ? `${(hero.classList.contains('has-place') ? placeEl : panel).offsetHeight}px` : '0px');
  mapEl.style.setProperty('--map-right-inset', !m && hero.classList.contains('has-place') ? `${placeEl.offsetWidth + 40}px` : '0px');
};
new ResizeObserver(syncControls).observe(panel);
new ResizeObserver(syncControls).observe(placeEl);

// ---------- Aviso de gestos (Ctrl + scroll / dois dedos) ----------
let hintTimer = 0;
const hint = (text: string) => {
  hintEl.textContent = text;
  hintEl.classList.add('is-on');
  clearTimeout(hintTimer);
  hintTimer = window.setTimeout(() => hintEl.classList.remove('is-on'), 1400);
};
let wheelAcc = 0, wheelLock = 0;
mapEl.addEventListener('wheel', (e) => {
  if (!(e.ctrlKey || e.metaKey)) {
    hint(isMac ? 'Use ⌘ + scroll para dar zoom no mapa' : 'Use Ctrl + scroll para dar zoom no mapa');
    return; // a página rola normalmente
  }
  e.preventDefault();
  hintEl.classList.remove('is-on');
  wheelAcc += e.deltaY;
  const now = performance.now();
  if (Math.abs(wheelAcc) < 40 || now < wheelLock) return;
  const step = wheelAcc < 0 ? 0.5 : -0.5;
  wheelAcc = 0;
  wheelLock = now + 90;
  map.setZoomAround(map.mouseEventToContainerPoint(e), map.getZoom() + step, { animate: !reduced });
}, { passive: false });
if (coarse) {
  mapEl.addEventListener('touchmove', (e) => { if (e.touches.length === 1) hint('Use dois dedos para mover o mapa'); }, { passive: true });
}

// ---------- Pins ----------
const cluster = L.markerClusterGroup({
  showCoverageOnHover: false,
  zoomToBoundsOnClick: false,
  spiderfyOnMaxZoom: true,
  maxClusterRadius: 48,
  animate: !reduced,
  iconCreateFunction: (c) => L.divIcon({
    className: 'mx-cluster',
    html: `<span class="mx-cluster-in" style="--d:${Math.round(Math.random() * 250)}ms">${c.getChildCount()}</span>`,
    iconSize: [50, 50],
  }),
});

const markers = new Map<string, L.Marker>();
pins.forEach((p, i) => {
  const icon = L.divIcon({
    className: 'mx-pin',
    html: `<span class="mx-pin-in" style="--d:${i * 45}ms"><img src="${p.pin}" alt="" width="50" height="50" decoding="async"></span>`,
    iconSize: [62, 74],
    iconAnchor: [31, 72],
  });
  const m = L.marker([p.lat, p.lng], { icon, keyboard: true, riseOnHover: true });
  Object.assign(m, { _mxId: p.id, _mxLabel: `${p.place}, ${p.country}. Abrir fotos e post` });
  m.on('click', () => openPlace(p.id));
  markers.set(p.id, m);
});

/** Aproxima num grupo (ou abre em leque, se os lugares estiverem colados). */
const zoomCluster = (c: L.MarkerCluster, fromKeyboard: boolean) => {
  const b = c.getBounds();
  if (map.getZoom() >= map.getMaxZoom() - 1 || b.getNorthEast().equals(b.getSouthWest())) {
    c.spiderfy();
    return;
  }
  if (fromKeyboard) {
    // Depois do zoom, o foco vai para o primeiro lugar que saiu do grupo.
    map.once('moveend', () => setTimeout(() => {
      const first = c.getAllChildMarkers()[0];
      (cluster.getVisibleParent(first) as L.Marker | null)?.getElement()?.focus({ preventScroll: true });
    }, 50));
  }
  const { tl, br } = insets();
  if (reduced) map.fitBounds(b, { paddingTopLeft: tl, paddingBottomRight: br, maxZoom: 14, animate: false });
  else map.flyToBounds(b, { paddingTopLeft: tl, paddingBottomRight: br, maxZoom: 14, duration: 0.8 });
};
cluster.on('clusterclick', (e: any) => zoomCluster(e.layer, false));

// Pins e grupos: rótulo acessível e Enter/Espaço (os elementos são recriados pelo cluster a cada zoom).
map.on('layeradd', (e: L.LayerEvent) => {
  const layer = e.layer as any;
  const el: HTMLElement | undefined = layer.getElement?.();
  if (!el || el.dataset.mx) return;
  el.dataset.mx = '1';
  el.setAttribute('role', 'button');
  el.tabIndex = 0;
  if (layer._mxId) el.setAttribute('aria-label', layer._mxLabel);
  else if (layer.getChildCount) el.setAttribute('aria-label', `Grupo com ${layer.getChildCount()} lugares. Aproximar`);
  else return;
  if (layer === activeMarker()) el.classList.add('is-active');
  el.addEventListener('keydown', (ev) => {
    if (ev.key !== 'Enter' && ev.key !== ' ') return;
    ev.preventDefault();
    ev.stopPropagation();
    if (layer._mxId) openPlace(layer._mxId);
    else zoomCluster(layer, true);
  });
});

// ---------- Linha do tempo (ordem cronológica dos posts) ----------
const route = L.polyline([], { className: 'mx-route', color: '#023047', weight: 2.5, opacity: 0.55, dashArray: '2 9', interactive: false });
let routeOn = true;
let routeAnim = 0;

/** Curva suave (Bézier quadrática) entre cada par de lugares. */
const curve = (pts: L.LatLngTuple[]) => {
  const out: L.LatLngTuple[] = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const [y1, x1] = pts[i], [y2, x2] = pts[i + 1];
    const cx = (x1 + x2) / 2 - (y2 - y1) * 0.22, cy = (y1 + y2) / 2 + (x2 - x1) * 0.22;
    for (let t = i === 0 ? 0 : 1; t <= 24; t++) {
      const s = t / 24;
      out.push([(1 - s) ** 2 * y1 + 2 * (1 - s) * s * cy + s ** 2 * y2, (1 - s) ** 2 * x1 + 2 * (1 - s) * s * cx + s ** 2 * x2]);
    }
  }
  return out;
};

const drawRoute = (animate: boolean) => {
  cancelAnimationFrame(routeAnim);
  const pts = curve(visible().sort((a, b) => a.ts - b.ts).map((p) => [p.lat, p.lng] as L.LatLngTuple));
  if (!routeOn || pts.length < 2) { route.remove(); return; }
  route.addTo(map);
  if (!animate || reduced) { route.setLatLngs(pts); return; }
  const start = performance.now(), dur = Math.min(2600, 400 + pts.length * 40);
  const step = (now: number) => {
    const k = Math.min(1, (now - start) / dur);
    const eased = 1 - (1 - k) ** 3;
    route.setLatLngs(pts.slice(0, Math.max(2, Math.ceil(pts.length * eased))));
    if (k < 1) routeAnim = requestAnimationFrame(step);
  };
  routeAnim = requestAnimationFrame(step);
};

const switchBtn = panel.querySelector('.mx-switch') as HTMLButtonElement;
switchBtn.addEventListener('click', () => {
  routeOn = !routeOn;
  switchBtn.setAttribute('aria-checked', String(routeOn));
  drawRoute(true);
});

// ---------- Filtro por país ----------
let country = '';
const visible = () => pins.filter((p) => !country || p.country === country);

const fit = (animate: boolean) => {
  const b = L.latLngBounds(visible().map((p) => [p.lat, p.lng] as L.LatLngTuple));
  if (!b.isValid()) return;
  const { tl, br } = insets();
  const opts = { paddingTopLeft: tl, paddingBottomRight: br, maxZoom: 11 };
  if (animate && !reduced) map.flyToBounds(b, { ...opts, duration: 0.9 });
  else map.fitBounds(b, { ...opts, animate: false });
};

const renderPins = () => {
  cluster.clearLayers();
  cluster.addLayers(visible().map((p) => markers.get(p.id)!));
};

const groups = [...document.querySelectorAll<HTMLElement>('.mx-group')];
const listStatus = document.querySelector('.mx-list-status')!;
const chips = [...panel.querySelectorAll<HTMLButtonElement>('.mx-chip')];

const setCountry = (c: string, animate = true) => {
  country = c;
  chips.forEach((b) => b.setAttribute('aria-pressed', String((b.dataset.country ?? '') === c)));
  closePlace(false);
  groups.forEach((g) => (g.hidden = !!c && g.dataset.country !== c));
  const n = visible().length;
  listStatus.textContent = c ? `${c}: ${n} ${n === 1 ? 'lugar' : 'lugares'}` : `${n} lugares em ${groups.length} países`;
  if (!animate || reduced) {
    renderPins(); drawRoute(false); fit(false);
    return;
  }
  mapEl.classList.add('is-filtering');
  setTimeout(() => {
    renderPins();
    drawRoute(false);
    fit(true);
    map.once('moveend', () => { mapEl.classList.remove('is-filtering'); drawRoute(true); });
  }, 220);
};
chips.forEach((b) => b.addEventListener('click', () => setCountry(b.dataset.country ?? '')));

// ---------- Card do lugar (carrossel) ----------
const track = placeEl.querySelector('.mx-track') as HTMLElement;
const dots = placeEl.querySelector('.mx-dots') as HTMLElement;
const counter = placeEl.querySelector('.mx-counter') as HTMLElement;
const prev = placeEl.querySelector('.mx-prev') as HTMLButtonElement;
const next = placeEl.querySelector('.mx-next') as HTMLButtonElement;
let current: Pin | null = null;
let slide = 0;
let returnFocus: HTMLElement | null = null;

const activeMarker = () => (current ? markers.get(current.id) : undefined);
const setActive = (on: boolean) => {
  const m = activeMarker();
  if (!m) return;
  const el = (cluster.getVisibleParent(m) === m ? m : null)?.getElement();
  el?.classList.toggle('is-active', on);
};

const updateSlide = () => {
  if (!current) return;
  const n = current.photos.length;
  slide = Math.round(track.scrollLeft / Math.max(1, track.clientWidth));
  [...dots.children].forEach((d, i) => d.classList.toggle('on', i === slide));
  counter.textContent = `${slide + 1} / ${n}`;
  prev.disabled = slide <= 0;
  next.disabled = slide >= n - 1;
};
const goTo = (i: number) => {
  if (!current) return;
  slide = Math.max(0, Math.min(current.photos.length - 1, i));
  track.scrollTo({ left: slide * track.clientWidth, behavior: reduced ? 'auto' : 'smooth' });
};
let scrollTimer = 0;
track.addEventListener('scroll', () => { clearTimeout(scrollTimer); scrollTimer = window.setTimeout(updateSlide, 60); }, { passive: true });
prev.addEventListener('click', () => goTo(slide - 1));
next.addEventListener('click', () => goTo(slide + 1));
placeEl.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(slide - 1); }
  if (e.key === 'ArrowRight') { e.preventDefault(); goTo(slide + 1); }
});

function openPlace(id: string) {
  const p = byId.get(id);
  if (!p) return;
  setActive(false);
  returnFocus = (document.activeElement as HTMLElement) ?? null;
  current = p;
  track.innerHTML = p.photos.map((ph, i) =>
    `<figure><img src="${ph.src}" alt="${esc(ph.alt || `${p.place}: foto ${i + 1}`)}" loading="${i === 0 ? 'eager' : 'lazy'}" decoding="async"></figure>`).join('');
  dots.innerHTML = p.photos.length > 1 ? p.photos.map(() => '<i></i>').join('') : '';
  const multi = p.photos.length > 1;
  [prev, next, counter].forEach((el) => (el.hidden = !multi));
  track.scrollLeft = 0;
  slide = 0;
  (placeEl.querySelector('.mx-place-country') as HTMLElement).textContent = `${p.flag ? `${p.flag} ` : ''}${p.state ? `${p.state}, ` : ''}${p.country}`;
  (placeEl.querySelector('#mx-place-name') as HTMLElement).textContent = p.place;
  (placeEl.querySelector('.mx-place-title') as HTMLElement).textContent = p.title;
  (placeEl.querySelector('.mx-place-date') as HTMLElement).textContent = `Publicado em ${p.date}`;
  const cta = placeEl.querySelector('.mx-cta') as HTMLAnchorElement;
  cta.href = `/blog/${p.slug}`;
  cta.setAttribute('aria-label', `Ler o post: ${p.title}`);
  placeEl.hidden = false;
  hero.classList.add('has-place');
  requestAnimationFrame(() => {
    updateSlide();
    syncControls();
    setActive(true);
    const { tl, br } = insets();
    // +80px no topo: o ponto do pin fica na ponta de baixo do ícone, que tem ~74px de altura.
    map.panInside([p.lat, p.lng], { paddingTopLeft: tl.add([0, 80]), paddingBottomRight: br, animate: !reduced });
    placeEl.focus({ preventScroll: true });
  });
  history.replaceState(null, '', `#${p.id}`);
}

function closePlace(restoreFocus = true) {
  if (placeEl.hidden) return;
  setActive(false);
  placeEl.hidden = true;
  hero.classList.remove('has-place');
  syncControls();
  current = null;
  history.replaceState(null, '', location.pathname + location.search);
  if (restoreFocus) returnFocus?.focus({ preventScroll: true });
}
placeEl.querySelector('.mx-close')!.addEventListener('click', () => closePlace());
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !placeEl.hidden) closePlace(); });
map.on('click', () => closePlace(false));

/** Mostra um pin no mapa (lista, link #id): aproxima até ele sair do grupo e abre o card. */
const showPin = (id: string, scroll: boolean) => {
  const m = markers.get(id);
  if (!m) return;
  if (country && byId.get(id)!.country !== country) setCountry('', false);
  if (scroll) window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  cluster.zoomToShowLayer(m, () => {
    openPlace(id);
    m.getElement()?.focus({ preventScroll: true });
  });
};
document.querySelectorAll<HTMLButtonElement>('[data-show]').forEach((b) => b.addEventListener('click', () => showPin(b.dataset.show!, true)));

// ---------- Painel: recolher/expandir (desktop) e bottom sheet (celular) ----------
const handle = panel.querySelector('.mx-handle') as HTMLButtonElement;
const setPanel = (open: boolean) => {
  panel.dataset.state = open ? 'open' : 'closed';
  handle.setAttribute('aria-expanded', String(open));
  handle.setAttribute('aria-label', open ? 'Recolher painel' : 'Expandir painel');
};
let suppressClick = false;
handle.addEventListener('click', () => {
  if (suppressClick) return;
  setPanel(panel.dataset.state !== 'open');
});
let dragY: number | null = null;
handle.addEventListener('pointerdown', (e) => { if (mobileQ.matches) dragY = e.clientY; });
addEventListener('pointerup', (e) => {
  if (dragY === null) return;
  const dy = e.clientY - dragY;
  dragY = null;
  if (Math.abs(dy) > 24) {
    setPanel(dy < 0);
    suppressClick = true; // o "click" que vem logo depois do arraste não deve desfazer o gesto
    setTimeout(() => (suppressClick = false), 80);
  }
});
// No celular, o sheet começa recolhido para o mapa aparecer inteiro.
if (mobileQ.matches) setPanel(false);

// ---------- Estatísticas com contagem ----------
const counts = [...panel.querySelectorAll<HTMLElement>('[data-count]')];
if (!reduced) {
  counts.forEach((el) => (el.textContent = '0'));
  const io = new IntersectionObserver((entries) => {
    if (!entries.some((en) => en.isIntersecting)) return;
    io.disconnect();
    const start = performance.now();
    const tick = (now: number) => {
      const k = Math.min(1, (now - start) / 900);
      counts.forEach((el) => (el.textContent = String(Math.round(Number(el.dataset.count) * (1 - (1 - k) ** 3)))));
      if (k < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
  io.observe(panel);
}

// ---------- Início ----------
renderPins();
cluster.addTo(map);
syncControls();
fit(false);
drawRoute(true);
setTimeout(() => mapEl.classList.remove('is-intro'), 1800);

const fromHash = () => {
  const id = decodeURIComponent(location.hash.slice(1));
  if (id && byId.has(id)) showPin(id, false);
};
fromHash();
addEventListener('hashchange', fromHash);
mobileQ.addEventListener('change', () => { syncControls(); fit(false); });
