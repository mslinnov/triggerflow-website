'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { PRODUCTION_FIGURES, SIMULATOR_ASSUMPTIONS } from '@/data/upsell-services';
import { formatEuros } from '@/lib/upsell-simulator';
import { UpsellLinkButton } from './primitives';
import { useUpsell } from './UpsellContext';

/**
 * Panneau de résultat du simulateur. Le chiffre est visible immédiatement dans
 * les deux variantes : masquer le résultat derrière un formulaire capte plus
 * d'emails mais casse la confiance, et c'est la confiance qui fait la démo.
 */
export function UpsellResultPanel() {
  const t = useTranslations('lpUpsell.simulator');
  const tServices = useTranslations('lpUpsell.services');
  const tCta = useTranslations('lpUpsell.cta');
  const locale = useLocale();
  const reduce = useReducedMotion();
  const { result, rooms, goal } = useUpsell();

  const isEmpty = result.monthlyRevenue === 0;

  return (
    <div className="rounded-2xl border border-[var(--up-line)] bg-[var(--up-surface)] p-6 shadow-[var(--up-shadow-lg)] md:p-8">
      <p className="text-sm font-medium text-[var(--up-ink-soft)]">{t('resultLabel')}</p>

      {isEmpty ? (
        <p className="mt-4 max-w-[34ch] text-[15px] leading-relaxed text-[var(--up-ink-soft)]">
          {t('emptyState')}
        </p>
      ) : (
        <>
          <motion.p
            key={result.monthlyRevenue}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mt-2 font-[family-name:var(--font-geist-mono)] text-5xl font-semibold tracking-tight text-[var(--up-accent-text)] md:text-6xl"
          >
            {formatEuros(result.monthlyRevenue, locale)}
          </motion.p>
          <p className="mt-1.5 text-sm text-[var(--up-ink-muted)]">{t('perMonth')}</p>

          <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-[var(--up-line)] pt-6">
            <div>
              <dt className="text-xs uppercase tracking-wide text-[var(--up-ink-muted)]">
                {t('perYear')}
              </dt>
              <dd className="mt-1 font-[family-name:var(--font-geist-mono)] text-xl font-semibold text-[var(--up-ink)]">
                {formatEuros(result.yearlyRevenue, locale)}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-[var(--up-ink-muted)]">
                {t('perRoom')}
              </dt>
              <dd className="mt-1 font-[family-name:var(--font-geist-mono)] text-xl font-semibold text-[var(--up-ink)]">
                {formatEuros(result.revenuePerRoom, locale)}
              </dd>
            </div>
          </dl>

          <ul className="mt-6 space-y-2.5 border-t border-[var(--up-line)] pt-6">
            {result.breakdown.slice(0, 5).map((row) => (
              <li key={row.serviceId} className="flex items-baseline justify-between gap-4 text-sm">
                <span className="truncate text-[var(--up-ink-soft)]">
                  {tServices(`${row.serviceId}.name`)}
                </span>
                <span className="flex shrink-0 items-baseline gap-3 font-[family-name:var(--font-geist-mono)]">
                  <span className="text-[var(--up-ink-muted)]">
                    {t('salesPerMonth', { count: row.salesPerMonth })}
                  </span>
                  <span className="font-semibold text-[var(--up-ink)]">
                    {formatEuros(row.monthlyRevenue, locale)}
                  </span>
                </span>
              </li>
            ))}
          </ul>

          <UpsellLinkButton href="#formulaire" size="lg" className="mt-7 w-full">
            {goal === 'demo' ? tCta('demo') : tCta('whitepaper')}
          </UpsellLinkButton>
        </>
      )}

      {/* Origine des chiffres : affichée en permanence, ce n'est pas une note de bas de page. */}
      <p className="mt-6 border-t border-[var(--up-line)] pt-5 text-[13px] leading-relaxed text-[var(--up-ink-soft)]">
        {t('basis', {
          hotels: PRODUCTION_FIGURES.referenceHotels,
          offers: PRODUCTION_FIGURES.offersSent,
          revenue: PRODUCTION_FIGURES.revenueGenerated,
        })}
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
              sends: result.monthlySends,
              los: SIMULATOR_ASSUMPTIONS.averageLengthOfStay,
            })}
          </p>
          <p>
            {t('methodologyRates', {
              rate: SIMULATOR_ASSUMPTIONS.acceptanceRate * 100,
              basket: Math.round(SIMULATOR_ASSUMPTIONS.averageBasket),
            })}
          </p>
          <p>{t('methodologyBias')}</p>
        </div>
      </details>
    </div>
  );
}
