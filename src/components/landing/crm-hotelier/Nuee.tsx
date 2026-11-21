'use client';

/*
 * La nuée du récit : une toile qui couvre toute la scène.
 * Par rapport à la toile d'origine (RepelCanvas) : trois plans de profondeur (taille, opacité, parallaxe),
 * une respiration au repos, des transformations avec élan et départs échelonnés, une couleur d'accent par
 * forme, des courants (points qui coulent le long d'une ligne), une caméra (place et zoom) et le pointeur.
 * Tout dépend de l'instant du récit `s` et d'une horloge : un saut de défilement donne la même image.
 */

import { useEffect, useMemo, useRef, type RefObject } from 'react';
import type { Pt } from '@/lib/how-it-works/geometry';
import { clamp, easeInOut, lerp, smooth } from '@/lib/how-it-works/math';
import { matchNearest } from '@/lib/how-it-works/swarm';
import { N, type Forme, type Teinte } from './formes';
import { jourDe, teintes } from './jour';
import { DEPART, segment, type Cle, type NomForme, type Place } from './histoire';

/** Où la caméra pose la nuée : centre (pixels de la scène), taille d'une unité, et zoom (1 hors du moment H). */
export interface Cadre {
  cx: number;
  cy: number;
  u: number;
  zoom: number;
}

/** Un bloc de texte que les points contournent, en pixels de la scène. */
export interface Trou {
  cx: number;
  cy: number;
  a: number;
  b: number;
}

interface Piste {
  forme: Forme;
  x: Float32Array;
  y: Float32Array;
  accent: Float32Array;
  gain: Float32Array;
  courant: Int8Array;
  depart: Float32Array;
  /** Écart du point à sa ligne de courant. */
  dx: Float32Array;
  dy: Float32Array;
  /** Rang de départ dans la transformation qui mène à cette forme, de 0 à 1. */
  rang: Float32Array;
}

const OR = 0.61803398875;
const frac = (v: number) => v - Math.floor(v);

/** Range les points de chaque forme : chacun va vers l'emplacement libre le plus proche de là où il est. */
function construirePistes(cles: readonly Cle[], formes: Record<NomForme, Forme>): Piste[] {
  const out: Piste[] = [];
  let ordre = Array.from({ length: N }, (_, i) => i);
  let prev: Piste | null = null;
  let prevNom: NomForme | null = null;
  for (const cle of cles) {
    if (prev && cle.forme === prevNom) {
      out.push(prev);
      continue;
    }
    const f = formes[cle.forme];
    const avant = prev;
    if (avant && !f.garde) ordre = matchNearest(Array.from({ length: N }, (_, i): Pt => [avant.x[i], avant.y[i]]), f.pts);
    const p: Piste = {
      forme: f,
      x: new Float32Array(N),
      y: new Float32Array(N),
      accent: new Float32Array(N),
      gain: new Float32Array(N),
      courant: new Int8Array(N),
      depart: new Float32Array(N),
      dx: new Float32Array(N),
      dy: new Float32Array(N),
      rang: new Float32Array(N),
    };
    let lo = Infinity;
    let hi = -Infinity;
    for (let i = 0; i < N; i++) {
      const j = ordre[i];
      p.x[i] = f.pts[j][0];
      p.y[i] = f.pts[j][1];
      p.accent[i] = f.accent[j];
      p.gain[i] = f.gain[j];
      p.courant[i] = f.courant[j];
      p.depart[i] = f.depart[j];
      if (p.courant[i] >= 0) {
        const l = f.courants[p.courant[i]].ligne;
        const n = l.length / 2 - 1;
        const fl = Math.min(n - 1e-6, Math.max(0, p.depart[i] * n));
        const k = Math.floor(fl);
        p.dx[i] = p.x[i] - (l[2 * k] + (l[2 * k + 2] - l[2 * k]) * (fl - k));
        p.dy[i] = p.y[i] - (l[2 * k + 1] + (l[2 * k + 3] - l[2 * k + 1]) * (fl - k));
      }
      // Le départ balaie la forme précédente en diagonale, avec une part de hasard : une vague, pas un bloc.
      const d = avant ? avant.x[i] * 0.8 + avant.y[i] * 0.6 : 0;
      p.rang[i] = d;
      if (d < lo) lo = d;
      if (d > hi) hi = d;
    }
    for (let i = 0; i < N; i++) p.rang[i] = 0.6 * ((p.rang[i] - lo) / Math.max(1e-6, hi - lo)) + 0.4 * frac(i * OR);
    out.push(p);
    prev = p;
    prevNom = cle.forme;
  }
  return out;
}

/** Aller-retour avec élan : un léger recul au départ, un léger dépassement à l'arrivée. `c` : force. */
function elan(t: number, c: number): number {
  if (t <= 0) return 0;
  if (t >= 1) return 1;
  return t < 0.5 ? (Math.pow(2 * t, 2) * ((c + 1) * 2 * t - c)) / 2 : (Math.pow(2 * t - 2, 2) * ((c + 1) * (t * 2 - 2) + c) + 2) / 2;
}

/** Réglages de la nuée, figés sur la version validée le 21/11 (élan et décalage des départs, profondeur, pointeur). */
const CALAGE = { taillePoints: 1, profondeur: 0.8, elan: 0.45, decalage: 0.35, ecartement: 1, respiration: 1, pointeur: 0.8 } as const;

interface NueeProps {
  cles: readonly Cle[];
  formes: Record<NomForme, Forme>;
  /** L'instant exact du récit, mis à jour au défilement. */
  recit: RefObject<number>;
  cadreDe: (place: Place, forme: NomForme) => Cadre;
  /** Rayon d'un point au sortir de l'ouverture, en pixels. */
  rayon: number;
  trous?: RefObject<(() => Trou[]) | null>;
  /** Appelé à chaque image avec l'instant lissé et la caméra : les calques (capture, message) se calent dessus. */
  onFrame?: (s: number, cam: Cadre) => void;
}

export default function Nuee({ cles, formes, recit, cadreDe, rayon, trous, onFrame }: NueeProps) {
  const ref = useRef<HTMLCanvasElement>(null);
  const pistes = useMemo(() => construirePistes(cles, formes), [cles, formes]);
  /** Ce que la boucle de dessin lit à chaque image, sans se relancer quand une prop change. */
  const live = useRef({ cles, pistes, cadreDe, rayon, onFrame });
  useEffect(() => {
    live.current = { cles, pistes, cadreDe, rayon, onFrame };
  });

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const plan = new Uint8Array(N);
    const graine = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      const h = frac(i * 0.7548776662 + 0.31);
      plan[i] = h < 0.34 ? 0 : h < 0.85 ? 1 : 2;
      graine[i] = i * 2.3999632297;
    }
    // Du fond vers l'avant ; Sophie (le point 0) en dernier.
    const ordre = Array.from({ length: N }, (_, i) => i).sort((a, b) => (a === 0 ? 1 : b === 0 ? -1 : plan[a] - plan[b]));
    const pointeur = { x: 0, y: 0, tx: 0, ty: 0, force: 0, cible: 0 };
    const fin = window.matchMedia('(pointer: fine)').matches;
    const bouge = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointeur.tx = e.clientX - r.left;
      pointeur.ty = e.clientY - r.top;
      pointeur.cible = e.clientY >= r.top && e.clientY <= r.bottom ? 1 : 0;
    };
    const sort = () => {
      pointeur.cible = 0;
    };
    if (fin) {
      window.addEventListener('pointermove', bouge, { passive: true });
      document.documentElement.addEventListener('pointerleave', sort);
    }
    // Hors écran, la boucle s'arrête vraiment (pas d'image vide à 120 Hz) ; elle repart au retour.
    let raf = 0;
    let last = performance.now();
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !raf) {
        last = performance.now();
        raf = requestAnimationFrame(image);
      } else if (!entry.isIntersecting && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    });
    let clock = 0;
    let s = recit.current ?? 0;
    let vide = false;
    const A = new Float32Array(3);
    const B = new Float32Array(3);
    const lire = (p: Piste, j: number, t: number, out: Float32Array) => {
      const c = p.courant[j];
      if (c < 0) {
        out[0] = p.x[j];
        out[1] = p.y[j];
        out[2] = 1;
        return;
      }
      const cr = p.forme.courants[c];
      const u = frac(p.depart[j] + t * cr.vitesse);
      const l = cr.ligne;
      const n = l.length / 2 - 1;
      const fl = Math.min(n - 1e-6, u * n);
      const k = Math.floor(fl);
      out[0] = l[2 * k] + (l[2 * k + 2] - l[2 * k]) * (fl - k) + p.dx[j];
      out[1] = l[2 * k + 1] + (l[2 * k + 3] - l[2 * k + 1]) * (fl - k) + p.dy[j];
      out[2] = cr.ferme ? 1 : smooth(u / 0.1) * smooth((1 - u) / 0.16);
    };

    const image = (now: number) => {
      raf = requestAnimationFrame(image);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      clock += dt;
      const exact = recit.current ?? 0;
      s += (exact - s) * (1 - Math.exp(-dt / 0.1));
      if (Math.abs(exact - s) < 2e-4) s = exact;
      const { cles: K, pistes: P, cadreDe: cadre, rayon: r0, onFrame: suite } = live.current;
      const W = canvas.clientWidth;
      const H = canvas.clientHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      if (canvas.width !== Math.round(W * ratio) || canvas.height !== Math.round(H * ratio)) {
        canvas.width = Math.round(W * ratio);
        canvas.height = Math.round(H * ratio);
        vide = false;
      }
      const i = segment(K, s);
      const ka = K[i];
      const kb = K[i + 1] ?? ka;
      const phase = clamp((s - ka.s) / Math.max(1e-6, kb.s - ka.s));
      const ca = cadre(ka.place, ka.forme);
      const cb = cadre(kb.place, kb.forme);
      const e = easeInOut(phase);
      const cam: Cadre = { cx: lerp(ca.cx, cb.cx, e), cy: lerp(ca.cy, cb.cy, e), u: lerp(ca.u, cb.u, e), zoom: lerp(ca.zoom, cb.zoom, e) };
      suite?.(s, cam);
      // Pendant l'ouverture, les points sont dessinés par le champ de fiches : la toile reste vide.
      if (exact < DEPART) {
        if (!vide) {
          ctx.setTransform(1, 0, 0, 1, 0, 0);
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          vide = true;
        }
        return;
      }
      vide = false;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      ctx.clearRect(0, 0, W, H);

      const a = P[i];
      const b = P[i + 1] ?? a;
      const tenue = a === b;
      const decale = Math.min(0.8, Math.max(0, CALAGE.decalage));
      const force = 1.70158 * 1.525 * CALAGE.elan;
      const fa = a.forme.brut ? 0 : 1;
      const fb = b.forme.brut ? 0 : 1;
      // Les couleurs suivent le jour du récit : points clairs sur la nuit de l'ouverture, verts sur le papier.
      const { brut: BRUT, propre: PROPRE, ...TEINTES } = teintes(jourDe(recit.current ?? 0));
      const teinte = (t: Teinte | null) => (t ? TEINTES[t] : null);
      const ta = teinte(a.forme.teinte);
      const tb = teinte(b.forme.teinte);
      const sophie = TEINTES.menthe;

      pointeur.force += (pointeur.cible * 1 - pointeur.force) * 0.08;
      pointeur.x += (pointeur.tx - pointeur.x) * 0.16;
      pointeur.y += (pointeur.ty - pointeur.y) * 0.16;
      const zone = 130;
      const holes = trous?.current?.() ?? [];
      const R = 1 + 0.55 * Math.min(1.6, CALAGE.ecartement);
      const souffle = 1 + 0.007 * CALAGE.respiration * Math.sin(clock * 0.5);
      const relief = lerp(a.forme.relief, b.forme.relief, e);

      for (let n = 0; n < N; n++) {
        const j = ordre[n];
        lire(b, j, clock, B);
        let x = B[0];
        let y = B[1];
        let gain = b.gain[j] * B[2];
        let accA = 0;
        let accB = b.accent[j];
        let frais = fb;
        if (!tenue) {
          lire(a, j, clock, A);
          const local = clamp((phase - b.rang[j] * decale) / (1 - decale));
          const m = elan(local, force);
          const ml = smooth(local);
          const vx = B[0] - A[0];
          const vy = B[1] - A[1];
          // Trajet courbe, toujours du même côté : la nuée tourne en se transformant.
          const courbe = Math.sin(local * Math.PI) * 0.17 * (0.4 + 1.2 * frac(j * 0.381));
          x = A[0] + vx * m - vy * courbe;
          y = A[1] + vy * m + vx * courbe;
          gain = lerp(a.gain[j] * A[2], gain, ml);
          accA = a.accent[j] * (1 - ml);
          accB *= ml;
          frais = lerp(fa, fb, ml);
        }
        const pl = plan[j];
        const d = CALAGE.profondeur * frais * relief;
        // Respiration : chaque point dérive un peu, les plans avant davantage.
        const amp = 0.01 * CALAGE.respiration * (0.7 + 0.45 * pl);
        const par = 1 + (pl - 1) * 0.16 * d * (cam.zoom - 1);
        let X = cam.cx + (x * souffle + Math.sin(clock * 0.6 + graine[j]) * amp) * cam.u * par;
        let Y = cam.cy + (y * souffle + Math.cos(clock * 0.47 + graine[j] * 1.7) * amp) * cam.u * par;
        if (pointeur.force > 0.01) {
          // Le pointeur écarte doucement les points proches, et décale les plans (parallaxe).
          X -= ((pointeur.x - W / 2) / W) * (pl - 1) * 9 * d * pointeur.force;
          Y -= ((pointeur.y - H / 2) / H) * (pl - 1) * 9 * d * pointeur.force;
          const px = X - pointeur.x;
          const py = Y - pointeur.y;
          const dist = Math.hypot(px, py);
          if (dist < zone && dist > 0.01) {
            const f = Math.pow(1 - dist / zone, 2) * 30 * CALAGE.pointeur * pointeur.force;
            X += (px / dist) * f;
            Y += (py / dist) * f;
          }
        }
        for (const hole of holes) {
          const hx = X - hole.cx;
          const hy = Y - hole.cy;
          const q = Math.pow(Math.pow(hx / hole.a, 4) + Math.pow(hy / hole.b, 4), 0.25);
          if (q >= R || q < 1e-4) continue;
          const f = (1 + (R - 1) * (q / R)) / q;
          X = hole.cx + hx * f;
          Y = hole.cy + hy * f;
        }
        const alpha = gain * (pl === 0 ? 1 - 0.5 * d : pl === 2 ? 1 - 0.3 * d : 1);
        if (alpha < 0.012) continue;
        let rad = r0 * CALAGE.taillePoints * (pl === 0 ? 1 - 0.4 * d : pl === 2 ? 1 + 0.7 * d : 1) * Math.pow(cam.zoom, 0.3 + 0.2 * pl);
        let cr = lerp(BRUT[0], PROPRE[0], frais);
        let cg = lerp(BRUT[1], PROPRE[1], frais);
        let cb2 = lerp(BRUT[2], PROPRE[2], frais);
        if (ta && accA > 0) {
          cr = lerp(cr, ta[0], accA);
          cg = lerp(cg, ta[1], accA);
          cb2 = lerp(cb2, ta[2], accA);
        }
        if (tb && accB > 0) {
          cr = lerp(cr, tb[0], accB);
          cg = lerp(cg, tb[1], accB);
          cb2 = lerp(cb2, tb[2], accB);
        }
        if (j === 0 && sophie) {
          // Sophie : le point menthe de l'ouverture reste repérable dans toute la nuée.
          [cr, cg, cb2] = sophie;
          rad *= 1 + 0.4 * frais;
        }
        ctx.globalAlpha = Math.min(1, alpha);
        if (pl === 2 && d > 0.2) {
          // Plan avant : un point plus gros au bord fondu, comme hors de la mise au point.
          const doux = ctx.createRadialGradient(X, Y, 0, X, Y, rad * 1.25);
          doux.addColorStop(0, `rgba(${cr | 0},${cg | 0},${cb2 | 0},1)`);
          doux.addColorStop(0.5, `rgba(${cr | 0},${cg | 0},${cb2 | 0},0.8)`);
          doux.addColorStop(1, `rgba(${cr | 0},${cg | 0},${cb2 | 0},0)`);
          ctx.fillStyle = doux;
          rad *= 1.25;
        } else {
          ctx.fillStyle = `rgb(${cr | 0},${cg | 0},${cb2 | 0})`;
        }
        ctx.beginPath();
        ctx.arc(X, Y, rad, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };
    observer.observe(canvas);
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener('pointermove', bouge);
      document.documentElement.removeEventListener('pointerleave', sort);
    };
  }, [recit, trous]);

  return <canvas ref={ref} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" />;
}
