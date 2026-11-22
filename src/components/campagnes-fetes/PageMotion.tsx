'use client';

import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Mouvement de la page, sans rendu : révélations au scroll et flux de la bande démo. Seulement si le visiteur
 * n'a pas demandé de réduire les animations ; sans JavaScript, tout reste visible. Le haut de page ne bouge pas :
 * le titre (LCP) et la planche des 7 sont visibles dès le rendu serveur.
 * Les ScrollTrigger sont défaits au démontage.
 */
export function PageMotion() {
  useLayoutEffect(() => {
    const root = document.querySelector<HTMLElement>('.cf');
    if (!root) return;
    gsap.registerPlugin(ScrollTrigger);
    const all = <T extends Element>(selector: string) => Array.from(root.querySelectorAll<T>(selector));
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      all('[data-rv]').forEach((el) =>
        gsap.from(el, { y: 28, autoAlpha: 0, duration: 0.7, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } }),
      );

      const flux = gsap.timeline({ scrollTrigger: { trigger: '.cf-flux', start: 'top 80%', once: true } });
      all('.cf-flux-l').forEach((ligne, k) => {
        flux
          .from(ligne.querySelector('.cf-aud'), { x: -20, autoAlpha: 0, duration: 0.5 }, k * 0.45)
          .from(ligne.querySelector('.cf-fil'), { scaleX: 0, duration: 0.6, ease: 'power2.inOut' }, k * 0.45 + 0.25)
          .from(ligne.querySelector('.cf-chip'), { x: 20, autoAlpha: 0, duration: 0.5 }, k * 0.45 + 0.7);
      });
    });

    return () => mm.revert();
  }, []);

  return null;
}
