'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { useStaticMode } from '@/components/how-it-works/useStaticMode';

/**
 * Place gardée tant que la scène n'est pas là : la hauteur de la version animée (`h-[930vh]` de
 * HowItWorksAnimated), ou celle de la version fixe, mesurée à 390 px (5 927 px) et à 1 440 px (5 684 px).
 */
function Reserve() {
  const fixed = useStaticMode();
  return <div aria-hidden="true" className={fixed ? 'h-[5900px] lg:h-[5700px]' : 'h-[930vh]'} />;
}

const HowItWorksStory = dynamic(
  () => import('@/components/how-it-works/HowItWorksStory').then((module) => module.HowItWorksStory),
  { ssr: false, loading: Reserve },
);

/**
 * Charge la scène à l'approche (un écran avant qu'elle n'arrive), jamais avec le premier écran : le code de la
 * scène est dans un morceau à part, demandé seulement à ce moment. Avec `prefers-reduced-motion` (ou un écran
 * trop court), HowItWorksStory montre d'elle-même la version fixe.
 */
export function LPStoryLoader() {
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

  return <div ref={wrapper}>{near ? <HowItWorksStory /> : <Reserve />}</div>;
}
