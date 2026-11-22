'use client';

import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Mouvement de la page, sans rendu : entrée du héros, léger décalage de l'éventail au défilement,
 * révélations au scroll, flux de la bande démo. Seulement si le visiteur n'a pas demandé de réduire les
 * animations ; sans JavaScript, tout reste visible. Les ScrollTrigger sont défaits au démontage.
 */
export function PageMotion() {
  useLayoutEffect(() => {
    const root = document.querySelector<HTMLElement>('.cf');
    if (!root) return;
    gsap.registerPlugin(ScrollTrigger);
    const all = <T extends Element>(selector: string) => Array.from(root.querySelectorAll<T>(selector));
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .from(all('[data-h]'), { y: 28, autoAlpha: 0, duration: 0.8, stagger: 0.09 })
        .from(all('.cf-carte-h'), { y: 80, autoAlpha: 0, duration: 1, stagger: 0.12 }, 0.15);

      all('.cf-carte-h').forEach((carte, k) =>
        gsap.to(carte, {
          yPercent: [-14, -6, -20][k] ?? -10,
          ease: 'none',
          scrollTrigger: { trigger: '.cf-hero', start: 'top top', end: 'bottom top', scrub: true },
        }),
      );

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
