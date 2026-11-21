'use client';

/* Les fiches de l'ouverture (la carte de Camille, puis le dézoom), sur la nuit du héros. */

import { useState } from 'react';
import { useMotionValueEvent, type MotionValue } from 'framer-motion';
import type { JourneyTime } from '@/lib/how-it-works/timeline';
import { Cartes, type LibellesCartes } from './Cartes';

/** Fiches blanches (pas de crème), pastilles de la couleur des points, celle de Camille en menthe. */
const HABILLAGE =
  '[&_.fill-paper]:fill-white [&_svg>g>g:nth-of-type(2)]:[stroke:#7FA09B] [&_svg>g>path]:[stroke:#8FD9C4] [&_.stroke-line]:[stroke:transparent]';

export default function Fiches({ libelles, side, time }: { libelles: LibellesCartes; side: number; time: MotionValue<JourneyTime> }) {
  // Seul le passage visible / caché fait un rendu ; les cartes suivent `time` hors de React.
  const [cache, setCache] = useState(() => time.get().p >= 0);
  useMotionValueEvent(time, 'change', (v) => setCache(v.p >= 0));
  if (cache) return null;
  return (
    <div className={`absolute inset-0 ${HABILLAGE}`}>
      <Cartes key={side} libelles={libelles} side={side} time={time} />
    </div>
  );
}
