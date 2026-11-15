'use client';

import { useTranslations } from 'next-intl';
import { CHAPTERS } from '@/lib/how-it-works/timeline';
import { StaticFrame } from './StaticFrame';

/**
 * Le parcours sans animation : les dix temps l'un sous l'autre, chacun avec son texte et son image fixe.
 * Montré quand le visiteur a demandé moins d'animations, ou quand l'écran est trop court pour la scène.
 */
export function HowItWorksStatic() {
  const t = useTranslations('howItWorksPage');
  return (
    <section className="overflow-x-clip bg-white pb-16">
      <ol className="mx-auto flex max-w-[1000px] flex-col gap-14 px-5 lg:gap-20">
        {CHAPTERS.map((_, index) => (
          <li key={index} className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
            <div>
              <h2 className="text-balance text-[25px] font-medium leading-[1.14] tracking-[-0.02em] text-ink lg:text-[36px] lg:leading-[1.1]">
                {t(`chapters.${index}.title`)}
              </h2>
              <p className="mt-2 text-[15.5px] leading-[1.5] text-ink-2 lg:mt-4 lg:text-[19px]">{t(`chapters.${index}.text`)}</p>
            </div>
            <StaticFrame index={index} />
          </li>
        ))}
      </ol>
    </section>
  );
}
