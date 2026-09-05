'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { UpsellSection } from './primitives';

/**
 * Le manque à gagner, en trois constats de terrain. Bande pleine largeur
 * asymétrique : l'affirmation à gauche, les constats empilés à droite. Aucun
 * encadré, la hiérarchie tient aux filets et à l'espace.
 */

// Alignées sur les trois premières sources de revenu réellement constatées.
const OBSERVATIONS = ['breakfast', 'restaurant', 'spa'] as const;

export function UpsellGap() {
  const t = useTranslations('lpUpsell.gap');
  const reduce = useReducedMotion();

  return (
    <UpsellSection className="bg-[var(--up-ink)] text-[var(--up-bg)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:px-8">
        <div>
          <h2 className="text-3xl font-bold leading-tight tracking-tight md:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-4 max-w-[38ch] text-lg leading-relaxed opacity-70">{t('subtitle')}</p>
        </div>

        <ul className="divide-y divide-white/12">
          {OBSERVATIONS.map((key, index) => (
            <motion.li
              key={key}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="py-6 first:pt-0 last:pb-0"
            >
              <p className="text-xl leading-relaxed md:text-2xl">{t(`${key}.statement`)}</p>
              <p className="mt-2 text-[15px] opacity-60">{t(`${key}.consequence`)}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </UpsellSection>
  );
}
