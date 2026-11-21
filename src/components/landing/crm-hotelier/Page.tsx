'use client';

/*
 * La coquille de la page : l'en-tête (sombre sur la nuit de l'ouverture, papier ensuite), le récit, puis le bas de
 * page clair qui remonte en rideau sur la scène encore épinglée.
 */

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import { cn } from '@/lib/utils';
import { EnTete, type TextesEnTete } from './EnTete';
import { Immersion, NUIT, QUEUE, useFixe, type TextesImmersion } from './Immersion';
import type { Chiffres } from './histoire';
import { PAPIER } from './jour';
import type { Logo } from './Logos';
import { HEADER } from './moteur';

interface PageRecitProps {
  entete: TextesEnTete;
  textes: TextesImmersion;
  chiffres: Chiffres;
  logos: readonly Logo[];
  /** Le bas de page (rendu au serveur). */
  children: ReactNode;
}

export function PageRecit({ entete, textes, chiffres, logos, children }: PageRecitProps) {
  const fixe = useFixe();
  const clair = useRef<HTMLDivElement>(null);
  const [sombre, setSombre] = useState(true);
  const { scrollY } = useScroll();
  const update = () => {
    const el = clair.current;
    if (el) setSombre(el.getBoundingClientRect().top > HEADER + 1);
  };
  useMotionValueEvent(scrollY, 'change', update);
  useEffect(update, [fixe]);
  return (
    <>
      <EnTete textes={entete} sombre={sombre} fond={NUIT.couleur} papier={PAPIER} />
      <main>
        <Immersion textes={textes} chiffres={chiffres} logos={logos} />
        {/* Version animée : le bas de page remonte en rideau sur la fin du récit ; version fixe : coupe nette. */}
        <div
          ref={clair}
          className={cn('relative z-[45] bg-white', !fixe && 'overflow-hidden rounded-t-[28px] shadow-[0_-30px_80px_-30px_rgba(0,40,36,0.22)] lg:rounded-t-[40px]')}
          style={fixe ? undefined : { marginTop: `-${QUEUE * 100}svh` }}
        >
          {children}
        </div>
      </main>
    </>
  );
}
