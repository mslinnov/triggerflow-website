'use client';

import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { useStaticMode } from '@/components/how-it-works/useStaticMode';

/**
 * Place gardée tant que la scène n'est pas là : la hauteur de la version animée (`h-[930vh]` de
 * HowItWorksAnimated), ou celle de la version fixe, mesurée à 390 px (5 927 px) et à 1 440 px (5 684 px).
 */
function Reserve({ header }: { header: number }) {
  const fixed = useStaticMode(header);
  return <div aria-hidden="true" className={fixed ? 'h-[5900px] lg:h-[5700px]' : 'h-[930vh]'} />;
}

/** Morceau à part, demandé au premier rendu seulement : jamais côté serveur, puisqu'il n'est rendu qu'à l'approche. */
const HowItWorksStory = lazy(() =>
  import('@/components/how-it-works/HowItWorksStory').then((module) => ({ default: module.HowItWorksStory })),
);

/**
 * Charge la scène à l'approche (un écran avant qu'elle n'arrive), jamais avec le premier écran : le code de la
 * scène est dans un morceau à part, demandé seulement à ce moment. Avec `prefers-reduced-motion` (ou un écran
 * trop court), HowItWorksStory montre d'elle-même la version fixe.
 */
export function LPStoryLoader({ header }: { header: number }) {
  const wrapper = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const node = wrapper.current;
    if (!node || near) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setNear(true);
      },
      { rootMargin: '100% 0px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [near]);

  const reserve = <Reserve header={header} />;
  return (
    <div ref={wrapper}>
      {near ? (
        <Suspense fallback={reserve}>
          <HowItWorksStory header={header} />
        </Suspense>
      ) : (
        reserve
      )}
    </div>
  );
}
