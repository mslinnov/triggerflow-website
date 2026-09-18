'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { POST_STAY_ASSUMPTIONS } from '@/data/post-stay';
import { UpsellFigure, UpsellLinkButton } from '../upsell/primitives';
import { usePostStay } from './PostStayContext';

/**
 * Panneau de résultat. Il n'annonce pas un gain, il affiche un écart : à
 * gauche ce que rapportent les réglages déclarés, à droite ce que mesure
 * l'étude sur les meilleurs. Le visiteur reste libre de trouver l'écart faible.
 *
 * ─── TROIS PRÉCAUTIONS, TROIS ENDROITS ───────────────────────────────────
 * 1. Le taux atteignable est une ESTIMATION combinée, obtenue en rapprochant
 *    trois mesures prises chacune sur un seul critère. Le croisement
 *    réellement mesuré par l'étude, bouton unique sans lien concurrent, vaut
 *    16,4 %. Les deux chiffres sont cités, jamais dans la même phrase sans
 *    dire lequel est mesuré : le premier porte le mot « estimation », le
 *    second le mot « mesuré ».
 * 2. La durée moyenne de séjour est une hypothèse, pas une mesure. Elle est
 *    signalée exactement là où elle agit, sous le nombre d'avis, puisqu'elle
 *    déplace les volumes et jamais les taux.
 * 3. Le créneau non mesuré est signalé dans le simulateur, sur la commande
 *    elle-même, là où le visiteur fait son choix.
 */
export function PostStayResultPanel() {
  const t = useTranslations('lpPostStay.result');
  const tc = useTranslations('lpPostStay.cta');
  const locale = useLocale();
  const reduce = useReducedMotion();
  const { result, rooms } = usePostStay();

  // Le nombre et son signe « % » sont composés séparément : en Geist Mono,
  // l'espace fine insécable que produit `Intl` en style pourcentage occupe une
  // chasse pleine et détache le symbole du nombre. Même raison que
  // `UpsellFigure`, dont c'est précisément le rôle.
  const percent = (value: number) =>
    new Intl.NumberFormat(locale, {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(value * 100);

  const hasGap = result.gainedReviewsPerMonth > 0;

  return (
    <div className="rounded-2xl border border-[var(--up-line)] bg-[var(--up-surface)] p-5 shadow-[var(--up-shadow-lg)] sm:p-6 md:p-8">
      <p className="text-sm font-medium text-[var(--up-ink-soft)]">{t('label')}</p>

      <motion.p
        key={result.currentRate}
        initial={reduce ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="mt-2 text-[3.25rem] font-semibold leading-none tracking-[-0.03em] text-[var(--up-accent-text)] md:text-6xl"
      >
        <UpsellFigure value={percent(result.currentRate)} unit="%" />
      </motion.p>
      <p className="mt-1.5 text-sm text-[var(--up-ink-muted)]">
        {t('reviewsPerMonth', { count: result.currentReviewsPerMonth })}
      </p>

      {/* `justify-between` aligne les deux chiffres sur la même ligne de base
          même quand un libellé tient sur deux lignes et l'autre sur une. */}
      <dl className="mt-6 grid grid-cols-2 items-stretch gap-4 border-t border-[var(--up-line)] pt-6">
        <div className="flex flex-col justify-between">
          <dt className="text-xs uppercase tracking-wide text-[var(--up-ink-muted)]">
            {t('reachableLabel')}
          </dt>
          <dd className="mt-1 text-xl font-semibold text-[var(--up-ink)]">
            <UpsellFigure value={percent(result.reachableRate)} unit="%" />
          </dd>
        </div>
        <div className="flex flex-col justify-between">
          <dt className="text-xs uppercase tracking-wide text-[var(--up-ink-muted)]">
            {t('benchmarkLabel')}
          </dt>
          <dd className="mt-1 text-xl font-semibold text-[var(--up-ink)]">
            <UpsellFigure value={percent(result.benchmarkRate)} unit="%" />
          </dd>
        </div>
      </dl>

      <div className="mt-6 rounded-xl bg-[var(--up-accent-wash)] p-5">
        <p className="text-xs uppercase tracking-wide text-[var(--up-ink-muted)]">
          {t('gainLabel')}
        </p>
        {hasGap ? (
          <>
            <p className="mt-1.5 text-lg font-semibold leading-snug text-[var(--up-ink)]">
              {t('gainPerMonth', { count: result.gainedReviewsPerMonth })}
            </p>
            <p className="mt-1 text-sm text-[var(--up-ink-soft)]">
              {t('gainPerYear', { count: result.gainedReviewsPerYear })}
            </p>
          </>
        ) : (
          <p className="mt-1.5 text-[15px] leading-relaxed text-[var(--up-ink-soft)]">
            {t('noGap')}
          </p>
        )}
      </div>

      {/* Hypothèse de volumétrie, posée sous le nombre d'avis parce que c'est
          lui qu'elle déplace. Les taux, eux, ne dépendent pas de la durée de
          séjour : les confondre ferait douter de tout le panneau. */}
      <p className="mt-5 text-[13px] leading-relaxed text-[var(--up-ink-soft)]">
        {t('stayNote', { los: POST_STAY_ASSUMPTIONS.averageLengthOfStay })}
      </p>

      <UpsellLinkButton href="#formulaire" size="lg" className="mt-6 w-full">
        {tc('guide')}
      </UpsellLinkButton>

      {/* Estimation combinée face à la seule mesure croisée disponible. Ce
          paragraphe est affiché en permanence, ce n'est pas une note de bas de
          page : c'est la phrase qui empêche de lire le taux atteignable comme
          une mesure. */}
      <p className="mt-6 border-t border-[var(--up-line)] pt-5 text-[13px] leading-relaxed text-[var(--up-ink-soft)]">
        {t('estimateNote')}
      </p>

      <details className="group mt-5">
        <summary className="inline-flex min-h-11 cursor-pointer list-none items-center text-sm font-medium text-[var(--up-ink-soft)] hover:text-[var(--up-accent-text)]">
          {t('methodologyToggle')}
        </summary>
        <div className="mt-3 space-y-3 text-[13px] leading-relaxed text-[var(--up-ink-soft)]">
          <p>
            {t('methodologyVolume', {
              rooms,
              nights: result.monthlyNights,
              stays: result.monthlyStays,
            })}
          </p>
          <p>{t('methodologyCombine')}</p>
          <p>{t('methodologyBounds')}</p>
          <p>{t('methodologyCorrelation')}</p>
        </div>
      </details>
    </div>
  );
}
