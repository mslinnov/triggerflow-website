'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { UpsellLinkButton } from '../upsell/primitives';

/**
 * Hero asymétrique : l'affirmation à gauche, le parcours réel d'un avis à
 * droite. Ce parcours tient lieu d'image : il dit en cinq lignes ce que la
 * page démontre ensuite, et il n'a besoin d'aucun fichier à charger, sur un
 * trafic mobile où la première image pèse sur le temps d'affichage.
 *
 * Le titre est une seule phrase, à une seule échelle, la promesse distinguée
 * par la couleur seulement : c'est la leçon retenue de la landing jumelle, où
 * composer la circonstance en petit et l'affirmation en grand cassait la
 * phrase en deux blocs sans lien apparent.
 */

/**
 * Le parcours d'un avis, sur 100 e-mails envoyés.
 *
 * Source : guide du post-séjour, chapitre 1, mêmes envois que les références
 * de `@/data/post-stay`. Ces cinq nombres ne servent qu'à l'affichage de ce
 * seul bloc : ils sont volontairement écrits ici plutôt qu'ajoutés au fichier
 * de données, qui ne porte que les taux cités par plusieurs sections.
 *
 * Ce sont des proportions pour cent envois, jamais des volumes : la page ne
 * renseigne personne sur la taille de notre parc.
 */
const FUNNEL = [
  { id: 'sent', value: 100, hasNote: false },
  { id: 'opened', value: 54, hasNote: true },
  { id: 'clicked', value: 16, hasNote: true },
  { id: 'formOpened', value: 13, hasNote: true },
  { id: 'completed', value: 10, hasNote: true },
] as const;

export function PostStayHero() {
  const t = useTranslations('lpPostStay.hero');
  const tf = useTranslations('lpPostStay.funnel');
  const tc = useTranslations('lpPostStay.cta');
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[var(--up-bg)] pt-12 pb-16 md:pt-20 md:pb-24">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-[var(--up-accent-wash)] blur-3xl"
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:px-8">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="mb-5 inline-flex rounded-full border border-[var(--up-line-strong)] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--up-ink-muted)]">
            {t('badge')}
          </p>

          <h1 className="text-balance text-[2rem] font-bold leading-[1.14] tracking-[-0.03em] text-[var(--up-ink)] sm:text-[2.5rem] lg:text-[2.8rem] lg:leading-[1.08]">
            {t('titleLead')}{' '}
            <span className="text-[var(--up-accent-text)] lg:block">{t('titleStatement')}</span>
          </h1>

          <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-[var(--up-ink-soft)]">
            {t('subtitle')}
          </p>

          <div className="mt-9">
            <UpsellLinkButton href="#comparatif" size="lg">
              {tc('compare')}
            </UpsellLinkButton>
          </div>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl border border-[var(--up-line)] bg-[var(--up-surface)] p-5 shadow-[var(--up-shadow-lg)] sm:p-7"
        >
          <p className="text-sm font-semibold text-[var(--up-ink)]">{t('funnelTitle')}</p>

          <ul className="mt-6 space-y-5">
            {FUNNEL.map((step) => (
              <li key={step.id}>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-[15px] leading-snug text-[var(--up-ink-soft)]">
                    {tf(step.id)}
                  </span>
                  <span className="shrink-0 font-[family-name:var(--font-geist-mono)] text-lg font-semibold tabular-nums text-[var(--up-ink)]">
                    {step.value}
                  </span>
                </div>
                {/* Repère proportionnel, pas une jauge : aucune piste de fond,
                    la barre se lit par rapport à celle du dessus. */}
                <div
                  aria-hidden
                  className="mt-2 h-1.5 rounded-full bg-[var(--up-accent)]"
                  style={{ width: `${step.value}%` }}
                />
                {step.hasNote && (
                  <p className="mt-2 text-[13px] leading-relaxed text-[var(--up-ink-muted)]">
                    {tf(`${step.id}Note`)}
                  </p>
                )}
              </li>
            ))}
          </ul>

          <p className="mt-6 border-t border-[var(--up-line)] pt-5 text-[13px] leading-relaxed text-[var(--up-ink-soft)]">
            {t('funnelNote')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
