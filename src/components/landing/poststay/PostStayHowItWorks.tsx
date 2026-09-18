'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { UpsellSection } from '../upsell/primitives';

/**
 * Le modèle d'e-mail à copier, puis la checklist en huit points.
 *
 * L'aperçu de l'e-mail est composé en HTML et non repris en capture d'écran :
 * il reste lisible à 400 px, il suit le thème sombre, et son unique bouton se
 * voit comme tel. Une image l'aurait figé dans une largeur et une palette.
 *
 * Ce faux bouton n'est volontairement PAS un lien. C'est la maquette d'un
 * e-mail, pas un appel à l'action de la page : un clic ici partirait vers
 * nulle part, et deux appels à l'action de même poids dans une même section se
 * neutralisent. Il est masqué aux lecteurs d'écran, qui liraient sinon un
 * bouton sans destination au milieu d'un paragraphe.
 */
const CHECKLIST = [
  'sendWindow',
  'delay',
  'subjectLength',
  'reviewWord',
  'singleButton',
  'noCompetitor',
  'linkCount',
  'starsFirst',
] as const;

export function PostStayHowItWorks() {
  const t = useTranslations('lpPostStay.how');
  const reduce = useReducedMotion();

  return (
    <UpsellSection className="bg-[var(--up-bg)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-[var(--up-ink)] md:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[var(--up-ink-soft)]">{t('subtitle')}</p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Le modèle d'e-mail */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden rounded-2xl border border-[var(--up-line)] bg-[var(--up-surface)] shadow-[var(--up-shadow-sm)]"
          >
            <div className="border-b border-[var(--up-line)] bg-[var(--up-surface-alt)] px-5 py-4 sm:px-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--up-ink-muted)]">
                {t('mail.subjectLabel')}
              </p>
              <p className="mt-1.5 text-[17px] font-semibold text-[var(--up-ink)]">
                {t('mail.subject')}
              </p>
              <p className="mt-1.5 text-[13px] text-[var(--up-ink-muted)]">{t('mail.timing')}</p>
            </div>

            <div className="px-5 py-7 sm:px-7">
              <p className="text-[15px] text-[var(--up-ink)]">{t('mail.greeting')}</p>
              <p className="mt-3 max-w-[44ch] text-[15px] leading-relaxed text-[var(--up-ink-soft)]">
                {t('mail.body')}
              </p>

              <p
                aria-hidden
                className="mt-7 inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--up-accent)] px-6 py-3 text-sm font-semibold text-[var(--up-accent-ink)]"
              >
                {t('mail.button')}
              </p>

              <p className="mt-7 border-t border-[var(--up-line)] pt-5 text-[13px] leading-relaxed text-[var(--up-ink-muted)]">
                {t('mail.footnote')}
              </p>
            </div>
          </motion.div>

          {/* La checklist */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className="text-xl font-semibold text-[var(--up-ink)]">{t('checklistTitle')}</h3>

            <ul className="mt-6 space-y-3.5">
              {CHECKLIST.map((item) => (
                <li key={item} className="flex gap-3">
                  <Check
                    className="mt-0.5 h-5 w-5 shrink-0 text-[var(--up-accent-text)]"
                    strokeWidth={2.2}
                    aria-hidden
                  />
                  <span className="text-[15px] leading-relaxed text-[var(--up-ink-soft)]">
                    {t(`checklist.${item}`)}
                  </span>
                </li>
              ))}
            </ul>

            {/* Le seul aplat pêche de la page : il sert de point d'arrêt
                visuel à la fin de la recette, avant la section de conversion. */}
            <p className="mt-8 rounded-2xl bg-[var(--up-highlight)] p-6 text-[15px] leading-relaxed text-[var(--up-highlight-ink)]">
              {t('checklistNote')}
            </p>
          </motion.div>
        </div>
      </div>
    </UpsellSection>
  );
}
