'use client';

/*
 * Une seule toile WebGL pour les six objets 3D du récit.
 * Chaque objet est posé sur la caméra de la nuée. La boucle ne tourne que si la scène est à l'écran et qu'un objet
 * est présent ; chaque nouvel état (un défilement, hors de React) la réveille.
 */

import { useEffect, useRef, type RefObject } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { construire, type Boite, type EtatObjet, type NomObjet, type Objet, type TextesObjets } from './objets3d';

export type EtatScene = Partial<Record<NomObjet, EtatObjet>>;

/**
 * `etat` : l'état de chaque objet, écrit par le défilement sans rendu React. `reveil` : la scène y range la relance
 * de sa boucle, que le défilement appelle après chaque nouvel état. `textes` : ce que la lettre et la carte affichent.
 */
export default function Scene3D({
  etat,
  reveil,
  boites,
  textes,
}: {
  etat: RefObject<EtatScene>;
  reveil: RefObject<(() => void) | null>;
  boites: Record<NomObjet, Boite>;
  textes: TextesObjets;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const fin = window.matchMedia('(pointer: fine)').matches;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, fin ? 2 : 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.92;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    // Ombres portées douces : seuls les objets qui le demandent (l'enveloppe) en projettent.
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = env;
    const cle = new THREE.DirectionalLight(0xffe7d2, 1.4);
    cle.position.set(-3, 4, 5);
    cle.castShadow = true;
    cle.shadow.mapSize.set(1024, 1024);
    cle.shadow.camera.left = cle.shadow.camera.bottom = -2.6;
    cle.shadow.camera.right = cle.shadow.camera.top = 2.6;
    cle.shadow.camera.near = 1;
    cle.shadow.camera.far = 16;
    cle.shadow.bias = -0.0004;
    cle.shadow.normalBias = 0.012;
    cle.shadow.radius = 4;
    const contre = new THREE.DirectionalLight(0x8fd9c4, 1.1);
    contre.position.set(4, -2, -3);
    scene.add(cle, contre, new THREE.AmbientLight(0xffffff, 0.15));
    const camera = new THREE.PerspectiveCamera(26, 1, 0.1, 50);
    const D = 8;
    camera.position.set(0, 0, D);
    const aniso = Math.min(8, renderer.capabilities.getMaxAnisotropy());

    /** Construits à leur première apparition. */
    const objets = new Map<NomObjet, { objet: Objet; atelier: { jetables: { dispose(): void }[] } }>();

    const batir = (n: NomObjet) => {
      let o = objets.get(n);
      if (!o) {
        o = construire(n, boites[n], aniso, textes);
        objets.set(n, o);
        scene.add(o.objet.racine);
      }
      return o;
    };

    const pointeur = { x: 0, y: 0, tx: 0, ty: 0 };
    const bouge = (e: PointerEvent) => {
      pointeur.tx = (e.clientX / window.innerWidth) * 2 - 1;
      pointeur.ty = (e.clientY / window.innerHeight) * 2 - 1;
    };
    if (fin) window.addEventListener('pointermove', bouge, { passive: true });

    let w = 0;
    let h = 0;
    const taille = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / Math.max(1, h);
      camera.updateProjectionMatrix();
      reveil.current?.();
    };
    const ro = new ResizeObserver(taille);
    ro.observe(canvas);

    let vide = true;
    let visible = false;
    let raf = 0;
    const image = () => {
      raf = 0;
      const e = etat.current;
      const presents = (Object.keys(e) as NomObjet[]).filter((n) => (e[n]?.presence ?? 0) > 0.002);
      if (!presents.length || !w) {
        if (!vide) {
          for (const o of objets.values()) o.objet.racine.visible = false;
          renderer.clear();
          vide = true;
        }
        return;
      }
      raf = requestAnimationFrame(image);
      vide = false;
      pointeur.x += (pointeur.tx - pointeur.x) * 0.08;
      pointeur.y += (pointeur.ty - pointeur.y) * 0.08;
      const k = (2 * D * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2))) / h;
      for (const [n, o] of objets) if (!presents.includes(n)) o.objet.racine.visible = false;
      let ombre = 0;
      for (const n of presents) {
        const o = batir(n);
        const s = e[n]!;
        o.objet.racine.position.set((s.cadre.cx - w / 2) * k, -(s.cadre.cy - h / 2) * k, 0);
        o.objet.racine.scale.setScalar(s.cadre.u * k);
        o.objet.appliquer(s, pointeur.x, pointeur.y);
        if (o.objet.ombre) ombre = Math.max(ombre, s.presence);
      }
      // Les ombres suivent le fondu de l'objet qui les projette.
      cle.shadow.intensity = ombre;
      renderer.render(scene, camera);
    };
    const lancer = () => {
      if (visible && !raf) raf = requestAnimationFrame(image);
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) lancer();
      else if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    });
    io.observe(canvas);
    reveil.current = lancer;
    taille();

    // Les objets sont bâtis et leurs shaders compilés pendant les temps morts, un par un, avant leur apparition :
    // sinon la première image de chacun (textures de papier, shaders avec ombres) fait un à-coup au défilement.
    const inactif = (f: () => void) => (typeof window.requestIdleCallback === 'function' ? window.requestIdleCallback(f, { timeout: 3000 }) : setTimeout(f, 200) as unknown as number);
    let attente = 0;
    const preparer = () => {
      const n = (Object.keys(etat.current) as NomObjet[]).find((k) => !objets.has(k));
      if (!n) return;
      const o = batir(n);
      o.objet.racine.visible = true;
      renderer.compile(scene, camera);
      o.objet.racine.visible = false;
      attente = inactif(preparer);
    };
    attente = inactif(preparer);

    return () => {
      cancelAnimationFrame(raf);
      if (typeof window.cancelIdleCallback === 'function') window.cancelIdleCallback(attente);
      else clearTimeout(attente);
      io.disconnect();
      ro.disconnect();
      reveil.current = null;
      window.removeEventListener('pointermove', bouge);
      for (const o of objets.values()) {
        o.objet.liberer();
        for (const j of o.atelier.jetables) j.dispose();
      }
      env.dispose();
      pmrem.dispose();
      renderer.dispose();
    };
    // `boites` vient des formes, chargées une fois ; `textes`, de la page, ne change pas.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <canvas ref={ref} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" />;
}
