/*
 * Les formes que prend la nuée du récit, en listes de points.
 * Unités : celles de la scène d'origine (1 = 36 % du côté du visuel carré, origine au centre, y vers le bas).
 * Une forme se dessine sur une toile cachée (traits, aplats), puis des points y sont semés sans amas
 * (meilleur candidat de Mitchell) : n'importe quel dessin devient une forme de points, à densité régulière.
 * Pictogrammes des offres : tracés de Lucide (licence ISC), déjà dans le projet.
 */

import { getLayout, type Pt } from '@/lib/how-it-works/geometry';
import { rng } from '@/lib/how-it-works/math';
import { picto } from '@/lib/how-it-works/shapes';
import type { NomForme } from './histoire';

/** Nombre de points de la nuée : ceux de l'ouverture (576 fiches gardées et 84 doublons). */
export const N = 660;

export type Teinte = 'menthe' | 'peche';

export interface Courant {
  /** Ligne brisée x0, y0, x1, y1… parcourue par les points du courant. */
  ligne: Float32Array;
  /** Tours par seconde. */
  vitesse: number;
  /** Boucle fermée : pas de fondu aux extrémités. */
  ferme: boolean;
}

export interface Forme {
  pts: Pt[];
  /** Part d'accent de chaque point (0 ou 1), et sa couleur pour cette forme. */
  accent: Float32Array;
  teinte: Teinte | null;
  /** Opacité propre à chaque point. */
  gain: Float32Array;
  /** Points en mouvement le long d'un courant : indice du courant (ou -1) et position de départ sur la ligne. */
  courant: Int8Array;
  depart: Float32Array;
  courants: Courant[];
  /** Mêmes emplacements que la forme précédente : chaque point garde le sien (les blocs glissent d'un seul tenant). */
  garde?: boolean;
  /** Données brutes : points gris, avant le nettoyage. */
  brut?: boolean;
  /** Part de la profondeur appliquée à cette forme : un dessin précis (planning, pictogrammes) en veut moins. */
  relief: number;
  /** Boîte englobante, en unités. */
  boite: { x0: number; y0: number; x1: number; y1: number };
}

type Dessin = (ctx: CanvasRenderingContext2D) => void;

const RES = 440;
const BOX = 2.7;

/** Sème `n` points dans ce que `dessin` a peint. Reproductible : même graine, mêmes points. */
function semer(dessin: Dessin, n: number, seed: number): Pt[] {
  const canvas = document.createElement('canvas');
  canvas.width = RES;
  canvas.height = RES;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx || n <= 0) return [];
  const k = RES / BOX;
  ctx.setTransform(k, 0, 0, k, RES / 2, RES / 2);
  ctx.fillStyle = '#fff';
  ctx.strokeStyle = '#fff';
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  dessin(ctx);
  const data = ctx.getImageData(0, 0, RES, RES).data;
  const pool: number[] = [];
  for (let i = 0; i < RES * RES; i++) if (data[4 * i + 3] > 110) pool.push(i);
  if (!pool.length) return Array.from({ length: n }, () => [0, 0] as const);
  const next = rng(seed);
  const xs = new Float32Array(n);
  const ys = new Float32Array(n);
  for (let j = 0; j < n; j++) {
    let bx = 0;
    let by = 0;
    let bestD = -1;
    for (let c = 0; c < 9; c++) {
      const cell = pool[Math.floor(next() * pool.length)];
      const cx = (cell % RES) + next();
      const cy = Math.floor(cell / RES) + next();
      let d = Infinity;
      for (let q = 0; q < j; q++) {
        const dx = xs[q] - cx;
        const dy = ys[q] - cy;
        const dd = dx * dx + dy * dy;
        if (dd < d) d = dd;
      }
      if (d > bestD) {
        bestD = d;
        bx = cx;
        by = cy;
      }
    }
    xs[j] = bx;
    ys[j] = by;
  }
  return Array.from({ length: n }, (_, j) => [(xs[j] - RES / 2) / k, (ys[j] - RES / 2) / k] as const);
}

/** Complète une liste de points jusqu'à `n` : des jumeaux légèrement décalés, pris au hasard. */
function completer(pts: readonly Pt[], n: number, seed: number): Pt[] {
  const next = rng(seed);
  const out = pts.slice(0, n);
  while (out.length < n) {
    const [x, y] = pts[Math.floor(next() * pts.length)];
    out.push([x + (next() - 0.5) * 0.03, y + (next() - 0.5) * 0.03]);
  }
  return out;
}

function forme(pts: Pt[], extra: Partial<Forme> = {}): Forme {
  let x0 = Infinity;
  let y0 = Infinity;
  let x1 = -Infinity;
  let y1 = -Infinity;
  for (const [x, y] of pts) {
    if (x < x0) x0 = x;
    if (x > x1) x1 = x;
    if (y < y0) y0 = y;
    if (y > y1) y1 = y;
  }
  return {
    pts,
    accent: new Float32Array(pts.length),
    teinte: null,
    gain: new Float32Array(pts.length).fill(1),
    courant: new Int8Array(pts.length).fill(-1),
    depart: new Float32Array(pts.length),
    courants: [],
    relief: 1,
    boite: { x0, y0, x1, y1 },
    ...extra,
  };
}

function rond(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number): void {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
}

/* ---------- Le point d'une courbe de Bézier cubique, et sa ligne brisée ---------- */

type Bezier = readonly [number, number, number, number, number, number, number, number];

function ligne(b: Bezier, pas = 48): Float32Array {
  const out = new Float32Array((pas + 1) * 2);
  for (let i = 0; i <= pas; i++) {
    const t = i / pas;
    const u = 1 - t;
    out[2 * i] = u * u * u * b[0] + 3 * u * u * t * b[2] + 3 * u * t * t * b[4] + t * t * t * b[6];
    out[2 * i + 1] = u * u * u * b[1] + 3 * u * u * t * b[3] + 3 * u * t * t * b[5] + t * t * t * b[7];
  }
  return out;
}

/** Position sur une ligne brisée, `u` de 0 à 1. */
export function surLigne(l: Float32Array, u: number): Pt {
  const n = l.length / 2 - 1;
  const f = Math.min(n - 1e-6, Math.max(0, u * n));
  const i = Math.floor(f);
  const t = f - i;
  return [l[2 * i] + (l[2 * i + 2] - l[2 * i]) * t, l[2 * i + 1] + (l[2 * i + 3] - l[2 * i + 1]) * t];
}

/* ---------- 1. Réservation : le planning du PMS, dont les lignes coulent vers la fiche ---------- */

/** Le cadre de la fiche, en unités : la vraie capture de la fiche client s'y pose (mêmes proportions, 1168 × 722). */
export const FICHE = { x: -1, y: -0.2, w: 2, h: 1.236 } as const;

/** Les séjours du planning : une ligne par chambre, [début, longueur]. */
export const SEJOURS: readonly (readonly (readonly [number, number])[])[] = [
  [[-1.1, 0.42], [-0.6, 0.56], [0.04, 0.4], [0.52, 0.58]],
  [[-0.94, 0.64], [-0.22, 0.34], [0.2, 0.66]],
  [[-1.1, 0.3], [-0.72, 0.5], [-0.14, 0.62], [0.56, 0.4]],
  [[-0.86, 0.52], [-0.26, 0.4], [0.22, 0.34], [0.64, 0.46]],
];
export const RANG = 0.152;
export const HAUT = -1.06;
const SOUS = HAUT + 3 * RANG + 0.082;

/** Trois courants : ils quittent le bas du planning et entrent par le haut de la fiche. */
const COURANTS: readonly Bezier[] = [
  [-0.62, SOUS, -0.62, SOUS + 0.2, -0.5, FICHE.y - 0.16, -0.5, FICHE.y + 0.02],
  [0.06, SOUS, 0.06, SOUS + 0.2, 0, FICHE.y - 0.16, 0, FICHE.y + 0.02],
  [0.74, SOUS, 0.74, SOUS + 0.2, 0.5, FICHE.y - 0.16, 0.5, FICHE.y + 0.02],
];

/** Les séjours en deux rangs de perles : on lit des barres, pas un nuage. `pas` : écart entre deux perles. */
function perles(pas: number): Pt[] {
  const out: Pt[] = [];
  SEJOURS.forEach((chambre, r) => {
    for (const [x, w] of chambre) {
      const long = w - 0.07;
      const n = Math.max(2, Math.round(long / pas));
      for (let i = 0; i <= n; i++) for (const dy of [0.022, 0.06]) out.push([x + 0.018 + (long * i) / n, HAUT + r * RANG + dy]);
    }
  });
  return out;
}

function planning(capture: boolean): Forme {
  const cadre: Dessin = (ctx) => {
    ctx.lineWidth = 0.05;
    rond(ctx, FICHE.x, FICHE.y, FICHE.w, FICHE.h, 0.07);
    ctx.stroke();
    if (capture) return;
    // Sans la capture : la fiche est dessinée (pastille et lignes).
    ctx.beginPath();
    ctx.arc(FICHE.x + 0.36, FICHE.y + 0.38, 0.17, 0, Math.PI * 2);
    ctx.fill();
    ctx.lineWidth = 0.07;
    for (const [x, y, w] of [[0.68, 0.3, 0.8], [0.68, 0.48, 0.5], [0.2, 0.78, 1.6], [0.2, 0.96, 1.2]] as const) {
      ctx.beginPath();
      ctx.moveTo(FICHE.x + x, FICHE.y + y);
      ctx.lineTo(FICHE.x + x + w, FICHE.y + y);
      ctx.stroke();
    }
  };
  const nCourant = 108;
  const barres = perles(capture ? 0.0335 : 0.05);
  const lignes = COURANTS.map((bz) => ligne(bz));
  const next = rng(13);
  const pts: Pt[] = [...barres, ...semer(cadre, N - nCourant - barres.length, 12)];
  const debut = pts.length;
  const parLigne = nCourant / lignes.length;
  for (let j = 0; j < nCourant; j++) {
    const [x, y] = surLigne(lignes[j % lignes.length], (Math.floor(j / lignes.length) + next() * 0.8) / parLigne);
    pts.push([x + (next() - 0.5) * 0.06, y + (next() - 0.5) * 0.05]);
  }
  const out = forme(pts, { teinte: 'menthe', relief: 0.35, courants: lignes.map((l) => ({ ligne: l, vitesse: 0.11, ferme: false })) });
  for (let j = 0; j < nCourant; j++) {
    out.courant[debut + j] = j % lignes.length;
    out.depart[debut + j] = (Math.floor(j / lignes.length) + 0.4) / parLigne;
    out.accent[debut + j] = 1;
  }
  // La légende de la capture se pose sous le cadre : la boîte lui garde sa place.
  if (capture) out.boite.y1 += 0.13;
  return out;
}

/* ---------- 3. Les offres : surclassement, petit-déjeuner, parking ---------- */

export const LIT = ['M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8', 'M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4', 'M12 4v6', 'M2 18h20'];
export const FLECHE = ['m5 12 7-7 7 7', 'M12 19V5'];
export const TASSE = ['M10 2v2', 'M14 2v2', 'M6 2v2', 'M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1'];
export const PARKING = ['M9 17V7h4a3 3 0 0 1 0 6H9'];

export const OFFRE = 0.94;
/** Centres des trois offres, dans l'ordre : surclassement, parking, petit-déjeuner. Deux en haut, une en bas. */
export const CENTRES = [[-0.56, -0.5], [0.56, -0.5], [0.02, 0.56]] as const;
/** Après le choix : les deux offres écartées reculent dans les coins, le petit-déjeuner prend la scène. */
export const RECUL = [[-0.9, -0.92], [0.9, -0.92], [0, 0.14]] as const;
const PAR_OFFRE = N / 3;

function offres(): Forme {
  const pose = (ctx: CanvasRenderingContext2D, [cx, cy]: readonly [number, number]) => {
    ctx.translate(cx - OFFRE / 2, cy - OFFRE / 2);
    ctx.scale(OFFRE / 24, OFFRE / 24);
    ctx.lineWidth = 2.3;
  };
  const dessins: Dessin[] = [
    (ctx) => {
      // Surclassement : un lit, et une flèche qui monte.
      ctx.save();
      pose(ctx, CENTRES[0]);
      ctx.save();
      ctx.translate(0, 5.2);
      ctx.scale(0.78, 0.78);
      ctx.lineWidth = 2.3 / 0.78;
      for (const d of LIT) ctx.stroke(new Path2D(d));
      ctx.restore();
      ctx.translate(15.4, -1.6);
      ctx.scale(0.46, 0.46);
      ctx.lineWidth = 2.3 / 0.46;
      for (const d of FLECHE) ctx.stroke(new Path2D(d));
      ctx.restore();
    },
    (ctx) => {
      // Parking : le panneau, un P dans un carré.
      ctx.save();
      pose(ctx, CENTRES[1]);
      rond(ctx, 3, 3, 18, 18, 3);
      ctx.stroke();
      for (const d of PARKING) ctx.stroke(new Path2D(d));
      ctx.restore();
    },
    (ctx) => {
      // Petit-déjeuner : la tasse fumante.
      ctx.save();
      pose(ctx, CENTRES[2]);
      for (const d of TASSE) ctx.stroke(new Path2D(d));
      ctx.restore();
    },
  ];
  return forme(dessins.flatMap((d, i) => semer(d, PAR_OFFRE, 21 + i)), { relief: 0.5 });
}

/** Camille choisit le petit-déjeuner : il grandit et s'allume, les deux autres reculent. Mêmes points, même ordre. */
function choix(base: Forme): Forme {
  const pts = base.pts.map(([x, y], i): Pt => {
    const g = Math.min(2, Math.floor(i / PAR_OFFRE));
    const k = g === 2 ? 1.5 : 0.5;
    return [RECUL[g][0] + (x - CENTRES[g][0]) * k, RECUL[g][1] + (y - CENTRES[g][1]) * k];
  });
  const out = forme(pts, { teinte: 'peche', garde: true, relief: 0.5 });
  for (let i = 0; i < N; i++) {
    const chosen = Math.floor(i / PAR_OFFRE) >= 2;
    out.accent[i] = chosen ? 1 : 0;
    out.gain[i] = chosen ? 1 : 0.4;
  }
  return out;
}

/* ---------- 4. La carte : la piste et la puce s'allument quand c'est payé ---------- */

function carte(): Forme {
  const pts = completer(picto('card'), N, 31);
  const out = forme(pts, { teinte: 'peche', relief: 0.8 });
  const { x0, y0, x1, y1 } = out.boite;
  // Les points qui ne sont pas sur le pourtour : la piste et les détails de la carte.
  pts.forEach(([x, y], i) => {
    if (x > x0 + 0.16 && x < x1 - 0.16 && y > y0 + 0.16 && y < y1 - 0.16) out.accent[i] = 1;
  });
  return out;
}

/* ---------- 6. Le retour : la boucle, que les points parcourent sans fin ---------- */

function boucle(): Forme {
  const pas = 160;
  const l = new Float32Array((pas + 1) * 2);
  for (let i = 0; i <= pas; i++) {
    const t = (i / pas) * Math.PI * 2;
    l[2 * i] = 1.14 * Math.sin(t);
    l[2 * i + 1] = 0.52 * Math.sin(2 * t) + 0.06;
  }
  const next = rng(41);
  const pts: Pt[] = [];
  const courant = new Int8Array(N);
  const depart = new Float32Array(N);
  const accent = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    const u = (i + next() * 0.9) / N;
    const [x, y] = surLigne(l, u);
    // Bande plus large dans les boucles qu'au croisement.
    const large = 0.035 + 0.075 * Math.abs(Math.sin(u * Math.PI * 2));
    const angle = next() * Math.PI * 2;
    const dist = Math.sqrt(next()) * large;
    pts.push([x + Math.cos(angle) * dist, y + Math.sin(angle) * dist]);
    depart[i] = u;
    // Une cliente qui revient : un petit groupe de points en menthe fait le tour.
    accent[i] = u > 0.02 && u < 0.085 ? 1 : 0;
  }
  return { ...forme(pts, { teinte: 'menthe' }), courant, depart, accent, courants: [{ ligne: l, vitesse: 0.022, ferme: true }] };
}

/* ---------- Les autres ---------- */

/** L'ouverture : les amas laissés par le dézoom des fiches. Le point 0 est Camille. */
function amas(): Forme {
  const layout = getLayout();
  const pts = [...layout.clusters, ...layout.clusterDupes].slice(0, N);
  const out = forme(pts, { brut: true });
  // Le champ de fiches est fondu sur ses bords : les amas reprennent ce fondu pour que le relais ne se voie pas.
  pts.forEach(([x, y], i) => {
    const fx = 0.5 + x * 0.36;
    const fy = 0.5 + y * 0.36;
    out.gain[i] = Math.min(1, Math.max(0, Math.min(fy / 0.09, (1 - fy) / 0.1, fx / 0.07, (1 - fx) / 0.07)));
  });
  return out;
}

/** Le moment H : un champ de points clairsemé, que la caméra traverse pour aller lire le message. */
function champ(): Forme {
  const pts = semer((ctx) => ctx.fillRect(-1.3, -1.3, 2.6, 2.6), N, 51);
  const out = forme(pts, { relief: 1.3 });
  out.gain.fill(0.8);
  return out;
}

/** L'appel à la démo : la nuée se pose, en une ligne d'horizon calme. */
function calme(): Forme {
  const next = rng(61);
  const pts: Pt[] = [];
  for (let i = 0; i < N; i++) {
    const x = ((i + next()) / N) * 2.6 - 1.3;
    const bord = 1 - Math.pow(Math.abs(x) / 1.3, 3);
    pts.push([x, (next() + next() + next() - 1.5) * 0.05 * bord]);
  }
  const out = forme(pts);
  pts.forEach(([x], i) => {
    out.gain[i] = 0.75 * (1 - Math.pow(Math.abs(x) / 1.3, 2.4));
  });
  return out;
}

/** Deux traversées : l'appel à la démo passe dans un cadre de points. */
function cadre(): Forme {
  const pts = semer((ctx) => {
    ctx.lineWidth = 0.1;
    rond(ctx, -1.18, -0.72, 2.36, 1.44, 0.16);
    ctx.stroke();
  }, N, 71);
  return forme(pts, { teinte: 'peche' });
}

const cache = new Map<boolean, Record<NomForme, Forme>>();

/** Toutes les formes du récit, calculées une fois. `capture` : la vraie capture de la fiche occupe le cadre de la fiche. */
export function formesDe(capture: boolean): Record<NomForme, Forme> {
  let formes = cache.get(capture);
  if (!formes) {
    formes = construireFormes(capture);
    cache.set(capture, formes);
  }
  return formes;
}

function construireFormes(capture: boolean): Record<NomForme, Forme> {
  const trois = offres();
  return {
    amas: amas(),
    planning: planning(capture),
    enveloppe: forme(completer(picto('mail'), N, 81), { relief: 0.8 }),
    champ: champ(),
    offres: trois,
    choix: choix(trois),
    carte: carte(),
    coeur: forme(completer(picto('heart'), N, 82)),
    boucle: boucle(),
    calme: calme(),
    cadre: cadre(),
  };
}
