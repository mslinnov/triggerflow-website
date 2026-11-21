/*
 * Un objet Three.js par étape du récit, construit dans les unités de la forme de la nuée (même repère, y vers le haut),
 * animé par une timeline GSAP en pause que le défilement fait avancer (`tl.progress`, jamais `play`). La scène (Scene3D) le pose sur la caméra de la nuée.
 */

import * as THREE from 'three';
import gsap from 'gsap';
import { CENTRES, FICHE, FLECHE, HAUT, LIT, OFFRE, PARKING, RANG, RECUL, SEJOURS, TASSE } from './formes';

export type NomObjet = 'planning' | 'enveloppe' | 'offres' | 'carte' | 'etoiles' | 'ruban';
export type Boite = { x0: number; y0: number; x1: number; y1: number };

export interface EtatObjet {
  /** 0 à 1 : l'objet est là (il arrive quand la nuée a fini sa forme, repart quand elle se défait). */
  presence: number;
  /** 0 à 1 : de l'arrivée de l'objet à son départ. */
  avance: number;
  /** 0 à 1, propre à l'objet : le choix de Camille (offres), le paiement (carte). */
  detail: number;
  /** La caméra de la nuée : centre en pixels de la scène, et pixels par unité de forme. */
  cadre: { cx: number; cy: number; u: number };
}

export interface Objet {
  racine: THREE.Group;
  /** L'objet projette des ombres : la lumière principale en dessine tant qu'il est là. */
  ombre?: boolean;
  appliquer(e: EtatObjet, px: number, py: number): void;
  liberer(): void;
}

const MENTHE = '#8FD9C4';
const PECHE = '#FFCFA2';
const CLAIR = '#EEF6F4';
const MONO = '"IBM Plex Mono", ui-monospace, monospace';
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number) => Math.min(1, Math.max(0, v));

/** Ce que chaque objet garde pour se libérer, et ses matériaux pour le fondu. */
class Atelier {
  jetables: { dispose(): void }[] = [];
  fondus: { m: THREE.Material; base: number }[] = [];
  constructor(readonly aniso: number) {}
  garde<T extends { dispose(): void }>(o: T): T {
    this.jetables.push(o);
    return o;
  }
  mat<T extends THREE.Material>(m: T, base = 1): T {
    m.transparent = true;
    this.fondus.push({ m, base });
    return this.garde(m);
  }
  fondu(p: number) {
    for (const f of this.fondus) f.m.opacity = f.base * p;
  }
  /** Texture d'une toile ; `w` et `h` : taille du contour en unités (les UV d'une extrusion sont ses coordonnées). */
  tex(c: HTMLCanvasElement, w = 0, h = 0): THREE.CanvasTexture {
    const t = this.garde(new THREE.CanvasTexture(c));
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = this.aniso;
    if (w) {
      t.repeat.set(1 / w, 1 / h);
      t.offset.set(0.5, 0.5);
    }
    return t;
  }
}

function toile(W: number, H: number, dessin: (ctx: CanvasRenderingContext2D) => void): HTMLCanvasElement {
  const c = document.createElement('canvas');
  c.width = W;
  c.height = H;
  dessin(c.getContext('2d')!);
  return c;
}

function rectArrondi(w: number, h: number, r: number): THREE.Shape {
  const s = new THREE.Shape();
  s.moveTo(-w / 2 + r, -h / 2);
  s.lineTo(w / 2 - r, -h / 2);
  s.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
  s.lineTo(w / 2, h / 2 - r);
  s.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
  s.lineTo(-w / 2 + r, h / 2);
  s.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
  s.lineTo(-w / 2, -h / 2 + r);
  s.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);
  return s;
}

function extrusion(a: Atelier, s: THREE.Shape, depth: number, bevel: number, courbe = 16): THREE.ExtrudeGeometry {
  const g = a.garde(new THREE.ExtrudeGeometry(s, { depth, bevelEnabled: bevel > 0, bevelThickness: bevel, bevelSize: bevel, bevelSegments: 3, curveSegments: courbe }));
  g.translate(0, 0, -depth / 2);
  return g;
}

const verre = (a: Atelier, o: THREE.MeshPhysicalMaterialParameters, base = 1) =>
  a.mat(new THREE.MeshPhysicalMaterial({ roughness: 0.3, metalness: 0.1, clearcoat: 1, clearcoatRoughness: 0.08, envMapIntensity: 0.5, ...o }), base);

/** Tout objet : arrivée en pivotant depuis le fond, fondu, et une légère inclinaison suivant le pointeur. */
function poser(racine: THREE.Group, pivot: THREE.Object3D, a: Atelier, e: EtatObjet, v: { rx: number; ry: number; z: number }, px: number, py: number) {
  a.fondu(e.presence);
  pivot.position.z = v.z;
  pivot.rotation.set(v.rx + py * 0.1, v.ry + px * 0.14, 0);
  racine.visible = e.presence > 0.002;
}

/* ---------- 1. Réservation : le planning en relief, les séjours tombent dans leurs lignes ---------- */

function planning(a: Atelier): Objet {
  const racine = new THREE.Group();
  const pivot = new THREE.Group();
  racine.add(pivot);
  const y = (fy: number) => -fy;
  const bas = HAUT + 3 * RANG + 0.12;
  const fond = new THREE.Mesh(extrusion(a, rectArrondi(2.42, bas - HAUT + 0.1, 0.05), 0.02, 0), verre(a, { color: '#052E2A', roughness: 0.55 }, 0.85));
  fond.position.set(-0.04, y((HAUT + bas) / 2 - 0.03), -0.05);
  pivot.add(fond);
  // Les autres séjours : un vert soutenu (plus de pastel), Camille reste la seule lumière.
  const pale = verre(a, { color: '#2F8476', roughness: 0.42, envMapIntensity: 0.35 });
  const camille = verre(a, { color: MENTHE, emissive: MENTHE, emissiveIntensity: 0.5 });
  const barres: THREE.Mesh[] = [];
  let elle: THREE.Mesh | null = null;
  SEJOURS.forEach((chambre, r) =>
    chambre.forEach(([x, w], k) => {
      const long = w - 0.07;
      const lui = r === 1 && k === 2;
      const m = new THREE.Mesh(extrusion(a, rectArrondi(long, 0.075, 0.03), 0.04, 0.008, 6), lui ? camille : pale);
      m.position.set(x + 0.018 + long / 2, y(HAUT + r * RANG + 0.041), 0);
      pivot.add(m);
      barres.push(m);
      if (lui) elle = m;
    }),
  );
  const v = { rx: -0.5, ry: -0.18, z: -1 };
  const tl = gsap.timeline({ paused: true });
  tl.to(v, { rx: -0.22, ry: 0.12, z: 0, duration: 0.35, ease: 'power3.out' }, 0);
  tl.from(
    barres.map((b) => b.position),
    { z: 0.9, duration: 0.24, ease: 'back.out(1.6)', stagger: { each: 0.012, from: 'random' } },
    0.05,
  );
  tl.from(
    barres.map((b) => b.scale),
    { x: 0.2, duration: 0.24, ease: 'power2.out', stagger: { each: 0.012, from: 'random' } },
    0.05,
  );
  tl.to(v, { rx: -0.08, ry: -0.06, duration: 0.45, ease: 'sine.inOut' }, 0.35);
  if (elle) {
    const p = (elle as THREE.Mesh).position;
    tl.to(p, { z: 0.16, duration: 0.15, ease: 'power2.out' }, 0.5);
    // La réservation de Camille coule vers sa fiche.
    tl.to(p, { y: y(FICHE.y + 0.12), x: 0, duration: 0.3, ease: 'power2.in' }, 0.7);
  }
  tl.to(v, { z: -0.5, duration: 0.2, ease: 'power2.in' }, 0.8);
  return {
    racine,
    appliquer(e, px, py) {
      tl.progress(e.avance);
      camille.emissiveIntensity = 0.5 + 0.6 * clamp((e.avance - 0.5) / 0.15);
      poser(racine, pivot, a, e, v, px, py);
    },
    liberer: () => tl.kill(),
  };
}

/* ---------- 2. Avant l'arrivée : l'enveloppe de papier s'ouvre, la lettre de l'hôtel monte ---------- */

/** Un hasard à graine : le même grain de papier à chaque visite. */
function hasard(graine: number) {
  let g = graine;
  return () => (g = (g * 16807) % 2147483647) / 2147483647;
}

/** Une feuille de papier : fond, marbrure et fibres légères ; `dessin` ajoute plis et texte par-dessus. */
function feuillePapier(W: number, H: number, fond: string, graine: number, dessin?: (ctx: CanvasRenderingContext2D, w: number, h: number) => void) {
  return toile(W, H, (ctx) => {
    const rnd = hasard(graine);
    ctx.fillStyle = fond;
    ctx.fillRect(0, 0, W, H);
    for (let i = 0; i < 70; i++) {
      const x = rnd() * W;
      const y = rnd() * H;
      const r = (0.05 + rnd() * 0.14) * W;
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      const c = rnd() < 0.5 ? '255,255,255' : '0,32,30';
      g.addColorStop(0, `rgba(${c},0.04)`);
      g.addColorStop(1, `rgba(${c},0)`);
      ctx.fillStyle = g;
      ctx.fillRect(x - r, y - r, 2 * r, 2 * r);
    }
    ctx.lineWidth = Math.max(1, W / 700);
    // Deux tracés en tout (fibres claires, fibres sombres) : un seul trait par couleur, pas un par fibre.
    for (const couleur of ['rgba(255,255,255,0.09)', 'rgba(0,32,30,0.06)']) {
      ctx.strokeStyle = couleur;
      ctx.beginPath();
      for (let i = 0; i < (W * H) / 520; i++) {
        const x = rnd() * W;
        const y = rnd() * H;
        const l = (2 + rnd() * 8) * (W / 700);
        const t = rnd() * Math.PI;
        ctx.moveTo(x, y);
        ctx.lineTo(x + Math.cos(t) * l, y + Math.sin(t) * l);
      }
      ctx.stroke();
    }
    dessin?.(ctx, W, H);
  });
}

/** Le relief du papier (fibres), en gris, répété sur toutes les faces. */
function grainPapier(a: Atelier): THREE.CanvasTexture {
  const t = a.tex(feuillePapier(256, 256, '#808080', 11));
  t.colorSpace = THREE.NoColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(5, 5);
  return t;
}

const matPapier = (a: Atelier, o: THREE.MeshPhysicalMaterialParameters, base = 1) =>
  a.mat(new THREE.MeshPhysicalMaterial({ roughness: 0.86, metalness: 0, sheen: 0.3, sheenRoughness: 0.75, sheenColor: new THREE.Color('#ffffff'), bumpScale: 0.9, envMapIntensity: 0.18, ...o }), base);

/** Toile → forme : x de -W/2 à W/2 vers 0..w, y de H/2 à -H/2 vers 0..h. */
const versToile = (W: number, H: number, w: number, h: number) => (x: number, y: number) => [(x / W + 0.5) * w, (0.5 - y / H) * h] as const;

function enveloppe(a: Atelier, b: Boite): Objet {
  const racine = new THREE.Group();
  const pivot = new THREE.Group();
  const corps = new THREE.Group();
  racine.add(pivot);
  pivot.add(corps);
  const W = (b.x1 - b.x0) * 0.9;
  const H = (b.y1 - b.y0) * 0.74;
  pivot.position.set((b.x0 + b.x1) / 2, -(b.y0 + b.y1) / 2, 0);
  const grain = grainPapier(a);
  const DOS = -0.022;
  const POCHE = 0.022;
  const V = -0.06 * H; // pointe du V de la poche
  const TW = 1024;
  const TH = Math.round((TW * H) / W);
  const pt = versToile(W, H, TW, TH);

  /** L'intérieur : vert profond de la marque, motif de sécurité fin (il fait ressortir la lettre blanche). */
  const interieur = feuillePapier(TW, TH, '#0B4A44', 3, (ctx, w, h) => {
    ctx.strokeStyle = 'rgba(143,217,196,0.13)';
    ctx.lineWidth = 2;
    for (let x = -h; x < w; x += 14) {
      ctx.beginPath();
      ctx.moveTo(x, h);
      ctx.lineTo(x + h, 0);
      ctx.stroke();
    }
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, 'rgba(0,20,18,0.55)');
    g.addColorStop(0.5, 'rgba(0,20,18,0.1)');
    g.addColorStop(1, 'rgba(0,20,18,0.4)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  });
  const texInterieur = a.tex(interieur, W, H);
  const dos = new THREE.Mesh(a.garde(new THREE.ShapeGeometry(rectArrondi(W, H, 0.02))), matPapier(a, { map: texInterieur, bumpMap: grain, side: THREE.DoubleSide }));
  dos.position.z = DOS;
  dos.receiveShadow = true;

  /** La poche : un V ouvert en haut, les plis des rabats latéraux et du rabat du bas, un peu d'ombre sous chaque pli. */
  const extColor = '#97B7AD';
  const poche = feuillePapier(TW, TH, extColor, 5, (ctx, w, h) => {
    const [bgx, bgy] = pt(-W / 2, -H / 2);
    const [bdx] = pt(W / 2, -H / 2);
    const [cx, cy] = pt(0, -0.16 * H);
    const [, hy] = pt(0, H / 2);
    // Rabat du bas, posé sur les côtés : une ombre douce sous son bord.
    ctx.save();
    ctx.shadowColor = 'rgba(0,32,30,0.32)';
    ctx.shadowBlur = 18;
    ctx.shadowOffsetY = -4;
    ctx.fillStyle = extColor;
    ctx.beginPath();
    ctx.moveTo(bgx, bgy);
    ctx.lineTo(cx, cy);
    ctx.lineTo(bdx, bgy);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    // Côtés : légèrement plus sombres vers le pli.
    for (const sens of [-1, 1]) {
      const [ex] = pt((sens * W) / 2, 0);
      const g = ctx.createLinearGradient(ex, 0, w / 2, 0);
      g.addColorStop(0, 'rgba(0,32,30,0)');
      g.addColorStop(1, 'rgba(0,32,30,0.08)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.moveTo(ex, hy);
      ctx.lineTo(w / 2, pt(0, V)[1]);
      ctx.lineTo(cx, cy);
      ctx.lineTo(ex, bgy);
      ctx.closePath();
      ctx.fill();
    }
    ctx.strokeStyle = 'rgba(0,32,30,0.22)';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(bgx, bgy);
    ctx.lineTo(cx, cy);
    ctx.lineTo(bdx, bgy);
    ctx.stroke();
    // L'adresse de Camille, discrète, sur le rabat du bas.
    ctx.fillStyle = 'rgba(4,32,30,0.55)';
    ctx.font = `500 ${Math.round(h * 0.052)}px system-ui, sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText('Camille Rousseau', w / 2, h * 0.8);
    ctx.fillStyle = 'rgba(4,32,30,0.3)';
    ctx.fillRect(w * 0.38, h * 0.84, w * 0.24, h * 0.018);
  });
  const formePoche = new THREE.Shape();
  formePoche.moveTo(-W / 2, -H / 2);
  formePoche.lineTo(W / 2, -H / 2);
  formePoche.lineTo(W / 2, H / 2 - 0.01);
  formePoche.lineTo(0, V);
  formePoche.lineTo(-W / 2, H / 2 - 0.01);
  formePoche.closePath();
  const avant = new THREE.Mesh(a.garde(new THREE.ShapeGeometry(formePoche)), matPapier(a, { map: a.tex(poche, W, H), bumpMap: grain, side: THREE.DoubleSide }));
  avant.position.z = POCHE;
  avant.castShadow = true;
  avant.receiveShadow = true;
  // Les tranches : la poche est fermée sur les côtés et en bas.
  const tranche = matPapier(a, { color: '#6F9188' });
  for (const [x, y, w, h] of [
    [-W / 2, 0, 0.006, H],
    [W / 2, 0, 0.006, H],
    [0, -H / 2, W, 0.006],
  ] as const) {
    const m = new THREE.Mesh(a.garde(new THREE.BoxGeometry(w, h, POCHE - DOS)), tranche);
    m.position.set(x, y, (POCHE + DOS) / 2);
    corps.add(m);
  }

  /** La lettre : blanche, l'en-tête de l'hôtel, « Bonjour Camille », l'offre en pêche. */
  const LW = W * 0.88;
  const LH = H * 0.9;
  const lw = 1024;
  const lh = Math.round((lw * LH) / LW);
  const lettre = new THREE.Mesh(
    a.garde(new THREE.ShapeGeometry(rectArrondi(LW, LH, 0.012))),
    matPapier(a, {
      bumpMap: grain,
      bumpScale: 0.5,
      side: THREE.DoubleSide,
      map: a.tex(
        feuillePapier(lw, lh, '#FBFCFA', 9, (ctx, w, h) => {
          ctx.fillStyle = '#063F39';
          ctx.fillRect(0, 0, w, h * 0.15);
          ctx.fillStyle = '#EEF6F4';
          ctx.font = `600 ${Math.round(h * 0.062)}px system-ui, sans-serif`;
          ctx.fillText('Votre hôtel', w * 0.07, h * 0.097);
          ctx.fillStyle = 'rgba(238,246,244,0.7)';
          ctx.textAlign = 'right';
          ctx.font = `500 ${Math.round(h * 0.045)}px system-ui, sans-serif`;
          ctx.fillText('J-3', w * 0.93, h * 0.095);
          ctx.textAlign = 'left';
          ctx.fillStyle = '#10201E';
          ctx.font = `600 ${Math.round(h * 0.085)}px system-ui, sans-serif`;
          ctx.fillText('Bonjour Camille,', w * 0.07, h * 0.31);
          ctx.fillStyle = '#3C4D4A';
          ctx.font = `400 ${Math.round(h * 0.054)}px system-ui, sans-serif`;
          ctx.fillText('Votre chambre vous attend vendredi.', w * 0.07, h * 0.43);
          ctx.fillText('Envie du petit-déjeuner en chambre ?', w * 0.07, h * 0.51);
          ctx.fillStyle = '#FFE6CF';
          ctx.beginPath();
          ctx.roundRect(w * 0.07, h * 0.6, w * 0.86, h * 0.14, h * 0.03);
          ctx.fill();
          ctx.fillStyle = '#10201E';
          ctx.font = `500 ${Math.round(h * 0.052)}px system-ui, sans-serif`;
          ctx.fillText('Petit-déjeuner en chambre', w * 0.11, h * 0.687);
          ctx.textAlign = 'right';
          ctx.font = `600 ${Math.round(h * 0.056)}px system-ui, sans-serif`;
          ctx.fillText('72 €', w * 0.89, h * 0.688);
          ctx.textAlign = 'center';
          ctx.fillStyle = '#10201E';
          ctx.beginPath();
          ctx.roundRect(w * 0.27, h * 0.8, w * 0.46, h * 0.11, h * 0.055);
          ctx.fill();
          ctx.fillStyle = '#FFFFFF';
          ctx.font = `600 ${Math.round(h * 0.042)}px system-ui, sans-serif`;
          ctx.fillText('AJOUTER À MON SÉJOUR', w / 2, h * 0.868);
        }),
        LW,
        LH,
      ),
    }),
  );
  lettre.castShadow = true;
  lettre.receiveShadow = true;

  /** Le rabat : charnière au bord haut du dos ; dehors en papier, dedans du vert de l'intérieur ; la pastille pêche le ferme. */
  const rabat = new THREE.Group();
  rabat.position.set(0, H / 2, DOS);
  const PROF = POCHE - DOS + 0.006;
  const tri = new THREE.Shape();
  tri.moveTo(-W / 2, 0);
  tri.lineTo(W / 2, 0);
  tri.lineTo(W * 0.07, -H * 0.54);
  tri.quadraticCurveTo(0, -H * 0.59, -W * 0.07, -H * 0.54);
  tri.closePath();
  const geoRabat = a.garde(new THREE.ShapeGeometry(tri));
  const dehors = feuillePapier(TW, TH, '#88AA9F', 8, (ctx, w, h) => {
    const g = ctx.createLinearGradient(0, 0, 0, h * 0.6);
    g.addColorStop(0, 'rgba(0,32,30,0.12)');
    g.addColorStop(1, 'rgba(0,32,30,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  });
  const texDehors = a.tex(dehors, W, H);
  texDehors.offset.set(0.5, 1); // la charnière (y = 0) en haut de la toile
  const texDedans = a.garde(texInterieur.clone());
  texDedans.offset.set(0.5, 1);
  texDedans.needsUpdate = true;
  const exterieur = new THREE.Mesh(geoRabat, matPapier(a, { map: texDehors, bumpMap: grain, side: THREE.FrontSide }));
  const dedans = new THREE.Mesh(geoRabat, matPapier(a, { map: texDedans, bumpMap: grain, side: THREE.BackSide }));
  for (const m of [exterieur, dedans]) {
    m.position.z = PROF;
    m.castShadow = true;
    m.receiveShadow = true;
    rabat.add(m);
  }
  const pastille = new THREE.Mesh(
    a.garde(new THREE.CircleGeometry(0.075, 40)),
    a.mat(
      new THREE.MeshPhysicalMaterial({
        roughness: 0.4,
        clearcoat: 0.6,
        map: a.tex(
          toile(256, 256, (ctx) => {
            ctx.fillStyle = PECHE;
            ctx.fillRect(0, 0, 256, 256);
            ctx.strokeStyle = 'rgba(120,60,20,0.35)';
            ctx.lineWidth = 6;
            ctx.beginPath();
            ctx.arc(128, 128, 104, 0, Math.PI * 2);
            ctx.stroke();
            ctx.fillStyle = '#5A2E10';
            ctx.font = '600 92px Georgia, serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('H', 128, 136);
          }),
        ),
      }),
    ),
  );
  pastille.position.set(0, -H * 0.5, PROF + 0.004);
  pastille.castShadow = true;
  rabat.add(pastille);

  /** L'ombre portée sur la page : douce, décalée vers le bas et la droite comme la lumière. */
  const ombre = new THREE.Mesh(
    a.garde(new THREE.PlaneGeometry(W * 1.5, H * 1.6)),
    a.mat(
      new THREE.MeshBasicMaterial({
        depthWrite: false,
        map: a.tex(
          toile(256, 256, (ctx) => {
            // Flou par l'ombre du canevas (ctx.filter manque à Safari) : le rectangle est dessiné hors champ.
            ctx.shadowColor = 'rgba(0,10,9,1)';
            ctx.shadowBlur = 40;
            ctx.shadowOffsetX = 1000;
            ctx.fillRect(56 - 1000, 60, 144, 136);
          }),
        ),
      }),
      0.8,
    ),
  );
  ombre.position.set(0.1, -0.15, DOS - 0.08);

  corps.add(ombre, dos, lettre, avant, rabat);
  dos.renderOrder = 0;
  lettre.renderOrder = 1;
  avant.renderOrder = 2;

  const v = { rx: 0.55, ry: -0.6, z: -1.2, ouvre: 0, monte: 0, sort: 0, descend: 0 };
  const tl = gsap.timeline({ paused: true });
  tl.to(v, { rx: 0.14, ry: -0.14, z: 0, duration: 0.14, ease: 'power3.out' }, 0)
    .to(v, { ry: -0.05, duration: 0.1, ease: 'sine.inOut' }, 0.12)
    .to(v, { ouvre: 1, duration: 0.26, ease: 'power2.inOut' }, 0.18)
    .to(v, { monte: 1, duration: 0.3, ease: 'power2.inOut' }, 0.4)
    .to(v, { descend: 1, duration: 0.3, ease: 'sine.inOut' }, 0.4)
    .to(v, { sort: 1, duration: 0.2, ease: 'power2.out' }, 0.64)
    .to(v, { rx: 0.04, ry: 0, duration: 0.3, ease: 'sine.inOut' }, 0.6)
    .to({}, { duration: 0.06 }, 0.88);
  return {
    racine,
    ombre: true,
    appliquer(e, px, py) {
      tl.progress(e.avance);
      rabat.rotation.x = -Math.PI * 1.06 * v.ouvre;
      // Rabat fermé, la lettre et l'intérieur sont cachés : on ne les voit pas à travers le papier pendant le fondu d'arrivée.
      lettre.visible = dos.visible = v.ouvre > 0.01;
      // La lettre sort par le haut, puis vient vers nous, droite.
      lettre.position.set(0, lerp(-0.04 * H, 0.6 * H, v.monte) + 0.04 * H * v.sort, lerp(0, 0.24, v.sort));
      lettre.rotation.x = -0.1 * v.sort;
      lettre.scale.setScalar(1 + 0.06 * v.sort);
      corps.position.y = -0.24 * H * v.descend;
      poser(racine, pivot, a, e, v, px, py);
    },
    liberer: () => tl.kill(),
  };
}

/* ---------- 3. Ventes : trois jetons de verre ; celui que Camille choisit avance et s'allume ---------- */

function offres(a: Atelier): Objet {
  const racine = new THREE.Group();
  const pivot = new THREE.Group();
  racine.add(pivot);
  const R = OFFRE * 0.5;
  const disque = new THREE.Shape();
  disque.absarc(0, 0, R, 0, Math.PI * 2, false);
  const geo = extrusion(a, disque, 0.07, 0.02, 48);
  const icone = (traits: readonly { d: readonly string[]; x: number; y: number; k: number }[], couleur: string, fond: boolean) =>
    toile(512, 512, (ctx) => {
      if (fond) {
        const g = ctx.createRadialGradient(170, 150, 0, 256, 256, 360);
        g.addColorStop(0, '#16625A');
        g.addColorStop(1, '#042A26');
        ctx.fillStyle = g;
      } else ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, 512, 512);
      ctx.strokeStyle = couleur;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      for (const t of traits) {
        ctx.save();
        ctx.translate(256 - 150 + t.x * 12.5, 256 - 150 + t.y * 12.5);
        ctx.scale(12.5 * t.k, 12.5 * t.k);
        ctx.lineWidth = 2.1 / t.k;
        for (const d of t.d) ctx.stroke(new Path2D(d));
        ctx.restore();
      }
    });
  const dessins = [
    [
      { d: LIT, x: 0, y: 5.2, k: 0.78 },
      { d: FLECHE, x: 15.4, y: -1.6, k: 0.46 },
    ],
    [{ d: ['M6 3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3z', ...PARKING], x: 0, y: 0, k: 1 }],
    [{ d: TASSE, x: 0, y: 0, k: 1 }],
  ];
  const mats = dessins.map((d, g) =>
    verre(a, {
      map: a.tex(icone(d, CLAIR, true), 2 * R, 2 * R),
      emissive: PECHE,
      emissiveMap: g === 2 ? a.tex(icone(d, '#FFFFFF', false), 2 * R, 2 * R) : null,
      emissiveIntensity: 0,
      iridescence: 0.35,
      iridescenceIOR: 1.3,
      roughness: 0.22,
    }),
  );
  const tranche = verre(a, { color: '#8FBFB4', metalness: 0.6, roughness: 0.3 });
  const jetons = mats.map((m, g) => {
    const j = new THREE.Mesh(geo, [m, tranche]);
    j.position.set(CENTRES[g][0], -CENTRES[g][1], 0);
    pivot.add(j);
    return j;
  });
  const v = { rx: 0.2, ry: -0.3, z: -0.8, tour0: -Math.PI / 2, tour1: -Math.PI / 2, tour2: -Math.PI / 2 };
  const tl = gsap.timeline({ paused: true });
  tl.to(v, { rx: 0.05, ry: 0.06, z: 0, duration: 0.3, ease: 'power3.out' }, 0).to(v, { tour0: 0, tour1: 0, tour2: 0, duration: 0.26, ease: 'back.out(1.4)', stagger: 0.04 }, 0.02);
  return {
    racine,
    appliquer(e, px, py) {
      tl.progress(e.avance);
      const d = e.detail;
      jetons.forEach((j, g) => {
        const choisi = g === 2;
        j.position.x = lerp(CENTRES[g][0], RECUL[g][0], d);
        j.position.y = -lerp(CENTRES[g][1], RECUL[g][1], d) + Math.sin(e.avance * 9 + g * 2) * 0.02;
        j.position.z = choisi ? 0.25 * d : -0.2 * d;
        j.scale.setScalar(lerp(1, choisi ? 1.5 : 0.5, d));
        j.rotation.y = [v.tour0, v.tour1, v.tour2][g] + (choisi ? 0 : -0.3 * d);
      });
      poser(racine, pivot, a, e, v, px, py);
      // Après le fondu : le choix allume la tasse, les deux autres s'effacent à moitié.
      mats.forEach((m, g) => {
        if (g === 2) m.emissiveIntensity = 1.2 * d;
        else m.opacity *= 1 - 0.55 * d;
      });
    },
    liberer: () => tl.kill(),
  };
}

/* ---------- 4. Paiement : la carte ; la puce et « Payé » s'allument ---------- */

function carte(a: Atelier, b: Boite): Objet {
  const racine = new THREE.Group();
  const pivot = new THREE.Group();
  racine.add(pivot);
  const aspect = 1.586;
  const L = (b.x1 - b.x0) * 0.9;
  const Ht = L / aspect;
  pivot.position.set((b.x0 + b.x1) / 2, -(b.y0 + b.y1) / 2, 0);
  const W = 1024;
  const H = Math.round(W / aspect);
  const puce = (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath();
    ctx.roundRect(W * 0.085, H * 0.36, W * 0.14, H * 0.2, 12);
  };
  const face = toile(W, H, (ctx) => {
    const fond = ctx.createLinearGradient(0, 0, W, H);
    fond.addColorStop(0, '#0B4741');
    fond.addColorStop(0.55, '#042A26');
    fond.addColorStop(1, '#021A18');
    ctx.fillStyle = fond;
    ctx.fillRect(0, 0, W, H);
    const halo = ctx.createRadialGradient(W * 0.18, H * 0.05, 0, W * 0.18, H * 0.05, W * 0.7);
    halo.addColorStop(0, 'rgba(143,217,196,0.28)');
    halo.addColorStop(1, 'rgba(143,217,196,0)');
    ctx.fillStyle = halo;
    ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = 'rgba(143,217,196,0.07)';
    ctx.lineWidth = 1.4;
    for (let k = 0; k < 26; k++) {
      ctx.beginPath();
      for (let x = 0; x <= W; x += 8) ctx.lineTo(x, H * 0.25 + k * 14 + Math.sin(x / 90 + k * 0.4) * 26 + Math.sin(x / 31 + k) * 4);
      ctx.stroke();
    }
    const or = ctx.createLinearGradient(W * 0.085, H * 0.36, W * 0.225, H * 0.56);
    or.addColorStop(0, '#E9C29E');
    or.addColorStop(0.5, '#D6A47C');
    or.addColorStop(1, '#A87650');
    puce(ctx);
    ctx.fillStyle = or;
    ctx.fill();
    ctx.strokeStyle = 'rgba(238,246,244,0.7)';
    ctx.lineWidth = 4;
    for (let k = 1; k <= 3; k++) {
      ctx.beginPath();
      ctx.arc(W * 0.255, H * 0.46, k * 14, -0.9, 0.9);
      ctx.stroke();
    }
    ctx.fillStyle = MENTHE;
    ctx.beginPath();
    ctx.arc(W * 0.9, H * 0.15, H * 0.045, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = CLAIR;
    ctx.globalAlpha = 0.9;
    ctx.font = `500 ${Math.round(H * 0.085)}px ${MONO}`;
    ctx.fillText('••••  ••••  ••••  4821', W * 0.085, H * 0.72);
    ctx.globalAlpha = 0.7;
    ctx.font = `500 ${Math.round(H * 0.052)}px ${MONO}`;
    ctx.fillText('CAMILLE ROUSSEAU', W * 0.085, H * 0.87);
    ctx.textAlign = 'right';
    ctx.fillText('12/28', W * 0.915, H * 0.87);
  });
  const lueur = toile(W, H, (ctx) => {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, W, H);
    puce(ctx);
    ctx.fillStyle = '#B9805A';
    ctx.fill();
    ctx.fillStyle = MENTHE;
    ctx.font = `500 ${Math.round(H * 0.07)}px ${MONO}`;
    ctx.textAlign = 'right';
    ctx.fillText('✓ Payé · 72 €', W * 0.915, H * 0.47);
  });
  const faces = verre(a, {
    map: a.tex(face, L, Ht),
    emissiveMap: a.tex(lueur, L, Ht),
    emissive: 0xffffff,
    emissiveIntensity: 0,
    roughness: 0.34,
    iridescence: 0.4,
    iridescenceIOR: 1.35,
    envMapIntensity: 0.45,
  });
  const tranche = verre(a, { color: PECHE, metalness: 0.85, roughness: 0.28, envMapIntensity: 1.2, clearcoat: 0 });
  const forme = rectArrondi(L, Ht, 0.06 * L);
  pivot.add(new THREE.Mesh(extrusion(a, forme, 0.018 * L, 0.006 * L, 24), [faces, tranche]));
  const bande = a.tex(
    toile(512, 256, (ctx) => {
      const g = ctx.createLinearGradient(160, 0, 352, 256);
      g.addColorStop(0.45, 'rgba(255,255,255,0)');
      g.addColorStop(0.5, 'rgba(255,255,255,0.9)');
      g.addColorStop(0.56, 'rgba(255,255,255,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 512, 256);
    }),
  );
  bande.repeat.set(1 / L, 1 / Ht);
  const reflet = new THREE.Mesh(a.garde(new THREE.ShapeGeometry(forme, 24)), a.mat(new THREE.MeshBasicMaterial({ map: bande, blending: THREE.AdditiveBlending, depthWrite: false }), 0.35));
  reflet.position.z = 0.0165 * L;
  pivot.add(reflet);
  const v = { rx: 0.5, ry: -1.15, z: -1.2, reflet: -0.9 };
  const tl = gsap.timeline({ paused: true });
  tl.to(v, { ry: -0.34, rx: 0.2, z: 0, duration: 0.3, ease: 'power3.out' }, 0)
    .to(v, { ry: 0.26, rx: -0.05, duration: 0.42, ease: 'sine.inOut' }, 0.3)
    .to(v, { reflet: 0.9, duration: 0.22, ease: 'power2.inOut' }, 0.4)
    .to(v, { ry: 0.95, rx: -0.4, z: -0.8, duration: 0.28, ease: 'power2.in' }, 0.72);
  return {
    racine,
    appliquer(e, px, py) {
      tl.progress(e.avance);
      faces.emissiveIntensity = 1.1 * e.detail;
      bande.offset.set(v.reflet, 0.5);
      poser(racine, pivot, a, e, v, px, py);
    },
    liberer: () => tl.kill(),
  };
}

/* ---------- 5. Avis : cinq étoiles s'allument une à une ---------- */

function etoiles(a: Atelier, b: Boite): Objet {
  const racine = new THREE.Group();
  const pivot = new THREE.Group();
  racine.add(pivot);
  const larg = (b.x1 - b.x0) * 0.95;
  const r = larg / 11;
  pivot.position.set((b.x0 + b.x1) / 2, -(b.y0 + b.y1) / 2, 0);
  const s = new THREE.Shape();
  for (let k = 0; k <= 10; k++) {
    const ang = Math.PI / 2 + (k * Math.PI) / 5;
    const rr = k % 2 ? r * 0.46 : r;
    if (k === 0) s.moveTo(Math.cos(ang) * rr, Math.sin(ang) * rr);
    else s.lineTo(Math.cos(ang) * rr, Math.sin(ang) * rr);
  }
  const geo = extrusion(a, s, r * 0.32, r * 0.08, 4);
  const pale = new THREE.Color('#2C6A62');
  // Sur le papier : une pêche soutenue et peu d'éclat, sinon l'étoile allumée blanchit et disparaît.
  const vive = new THREE.Color('#E8935A');
  const items = Array.from({ length: 5 }, (_, i) => {
    const m = verre(a, { color: pale.clone(), emissive: PECHE, emissiveIntensity: 0, metalness: 0.5, roughness: 0.25 });
    const mesh = new THREE.Mesh(geo, m);
    mesh.position.x = (i - 2) * larg * 0.2;
    pivot.add(mesh);
    return { mesh, m };
  });
  const v = { rx: 0.25, ry: -0.4, z: -1 };
  const tl = gsap.timeline({ paused: true });
  tl.to(v, { rx: 0.05, ry: 0.1, z: 0, duration: 0.3, ease: 'power3.out' }, 0).to(v, { ry: -0.08, duration: 0.5, ease: 'sine.inOut' }, 0.3);
  return {
    racine,
    appliquer(e, px, py) {
      tl.progress(e.avance);
      items.forEach(({ mesh, m }, i) => {
        const k = clamp((e.avance - 0.22 - i * 0.07) / 0.1);
        const bosse = Math.sin(k * Math.PI);
        m.color.copy(pale).lerp(vive, k);
        m.emissiveIntensity = 0.12 * k;
        mesh.scale.setScalar(1 + 0.28 * bosse);
        mesh.rotation.y = (1 - k) * Math.PI;
        mesh.position.z = 0.12 * bosse;
      });
      poser(racine, pivot, a, e, v, px, py);
    },
    liberer: () => tl.kill(),
  };
}

/* ---------- 6. Retour : un ruban en boucle, que le point de Camille parcourt ---------- */

function ruban(a: Atelier): Objet {
  const racine = new THREE.Group();
  const pivot = new THREE.Group();
  racine.add(pivot);
  const pts = Array.from({ length: 96 }, (_, i) => {
    const t = (i / 96) * Math.PI * 2;
    return new THREE.Vector3(1.14 * Math.sin(t), -(0.52 * Math.sin(2 * t) + 0.06), 0.2 * Math.cos(t));
  });
  const courbe = new THREE.CatmullRomCurve3(pts, true);
  const PAS = 240;
  const COTES = 10;
  const geo = a.garde(new THREE.TubeGeometry(courbe, PAS, 0.04, COTES, true));
  const total = geo.index ? geo.index.count : PAS * COTES * 6;
  const tube = new THREE.Mesh(geo, verre(a, { color: '#3E8F82', emissive: MENTHE, emissiveIntensity: 0.12, roughness: 0.2, iridescence: 0.3 }, 0.9));
  const point = new THREE.Mesh(a.garde(new THREE.SphereGeometry(0.075, 24, 16)), a.mat(new THREE.MeshStandardMaterial({ color: MENTHE, emissive: MENTHE, emissiveIntensity: 1.4 })));
  pivot.add(tube, point);
  const v = { rx: 0.5, ry: -0.5, z: -0.8, trace: 0 };
  const tl = gsap.timeline({ paused: true });
  tl.to(v, { rx: 0.25, ry: 0.15, z: 0, duration: 0.35, ease: 'power3.out' }, 0)
    .to(v, { trace: 1, duration: 0.38, ease: 'power2.inOut' }, 0.02)
    .to(v, { rx: 0.12, ry: -0.2, duration: 0.6, ease: 'sine.inOut' }, 0.35);
  const ici = new THREE.Vector3();
  return {
    racine,
    appliquer(e, px, py) {
      tl.progress(e.avance);
      geo.setDrawRange(0, Math.floor((total * v.trace) / 6) * 6);
      // Le point suit le tracé, puis fait le tour : Camille revient.
      courbe.getPointAt((Math.min(v.trace, 1) * 0.999 + Math.max(0, e.avance - 0.4) * 1.6) % 1, ici);
      point.position.copy(ici);
      poser(racine, pivot, a, e, v, px, py);
    },
    liberer: () => tl.kill(),
  };
}

export function construire(nom: NomObjet, boite: Boite, aniso: number): { objet: Objet; atelier: Atelier } {
  const a = new Atelier(aniso);
  const objet = { planning: () => planning(a), enveloppe: () => enveloppe(a, boite), offres: () => offres(a), carte: () => carte(a, boite), etoiles: () => etoiles(a, boite), ruban: () => ruban(a) }[
    nom
  ]();
  // Les timelines sont en pause et le défilement pose leur avancement : le ticker de GSAP, réveillé par leur création,
  // tournerait pour rien à chaque image.
  gsap.ticker.sleep();
  return { objet, atelier: a };
}
