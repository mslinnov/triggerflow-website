'use client';

import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useMotionValue, useMotionValueEvent, useScroll } from 'framer-motion';
import { CHAPTERS, toJourneyTime } from '@/lib/how-it-works/timeline';
import { ChapterText } from './ChapterText';
import { IntroCards } from './IntroCards';
import { PointsCanvas } from './PointsCanvas';
import { StageOverlay } from './StageOverlay';
import { useSide } from './useSide';

/**
 * Le parcours d'une cliente, animé au rythme du défilement.
 * La section est haute (930 vh) ; la scène reste collée sous l'en-tête pendant qu'on la traverse.
 * 100 px : hauteur de l'en-tête fixe du site, comme le `pt-[100px]` de `(main)/layout.tsx`.
 * 312 px = en-tête 100 + ligne de séjour 60 + bloc de texte 152 ; 192 px = en-tête 100 + ligne 60 + marge 32.
 * Deux colonnes à partir de 1024 px seulement : en dessous, texte et visuel ne tiennent pas côte à côte.
 * Hauteurs en `svh` (la plus petite hauteur d'écran) : sur téléphone, la scène ne change pas de taille quand
 * la barre d'adresse se replie.
 */
export function HowItWorksAnimated() {
  const t = useTranslations('howItWorksPage');
  const section = useRef<HTMLElement>(null);
  const [visual, side] = useSide();

  const { scrollYProgress } = useScroll({ target: section, offset: ['start 100px', 'end end'] });
  // Une valeur mise à jour seulement quand le défilement change. Un `useTransform` recréerait l'objet à chaque
  // rendu et préviendrait ses abonnés en plein rendu de React.
  const time = useMotionValue(toJourneyTime(0));
  useMotionValueEvent(scrollYProgress, 'change', (progress) => time.set(toJourneyTime(progress)));

  // Le champ de fiches n'existe que pendant l'ouverture. L'état ne change qu'au passage de p = 0.
  const [intro, setIntro] = useState(true);
  useMotionValueEvent(time, 'change', ({ p }) => setIntro(p < 0));

  return (
    <section ref={section} className="relative h-[930vh]">
      <div className="sticky top-[100px] flex h-[calc(100svh-100px)] flex-col items-center justify-center overflow-hidden lg:flex-row-reverse lg:gap-12 lg:px-8 xl:gap-16">
        <div className="shrink-0 pb-[60px]">
          <div
            ref={visual}
            className="relative aspect-square w-[min(100vw,430px,calc(100svh-312px))] lg:w-[min(46vw,580px,calc(100svh-192px))]"
          >
            <PointsCanvas side={side} time={time} />
            {intro && <IntroCards key={side} side={side} time={time} />}
            {/* Remontés à chaque changement de taille : leur géométrie dépend du côté du visuel. */}
            <StageOverlay key={`calque-${side}`} side={side} time={time} />
          </div>
        </div>
        <div className="relative h-[152px] w-full max-w-[430px] shrink-0 lg:h-[270px] lg:w-[min(38vw,440px)] lg:max-w-none">
          {CHAPTERS.map((_, index) => (
            <ChapterText
              key={index}
              index={index}
              time={time}
              title={t(`chapters.${index}.title`)}
              text={t(`chapters.${index}.text`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
