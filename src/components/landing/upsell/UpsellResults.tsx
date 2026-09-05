'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { UPSELL_RESULTS, UPSELL_RESULTS_FOOTNOTE } from '@/data/upsell-results';
import { formatEuros } from '@/lib/upsell-simulator';
import { cn } from '@/lib/utils';
import { UpsellSection } from './primitives';

/**
 * Résultats réellement mesurés chez des clients, pas des témoignages rédigés.
 * Établissements anonymisés, chiffres issus de l'audit de production du
 * 2026-09-05. Composition asymétrique : le premier cas occupe la colonne large.
 */
export function UpsellResults() {
  const t = useTranslations('lpUpsell.results');
  const locale = useLocale();
  const reduce = useReducedMotion();

  const [featured, ...rest] = UPSELL_RESULTS;

  return (
    <UpsellSection className="bg-[var(--up-bg)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-[var(--up-ink)] md:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[var(--up-ink-soft)]">{t('subtitle')}</p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.35fr_1fr]">
          <ResultCard result={featured} featured locale={locale} />
          <div className="grid gap-6">
            {rest.map((result, index) => (
              <motion.div
                key={result.id}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <ResultCard result={result} locale={locale} />
              </motion.div>
            ))}
          </div>
        </div>

        <p className="mt-6 max-w-[70ch] text-sm leading-relaxed text-[var(--up-ink-muted)]">
          {t('footnote', {
            roomsA: UPSELL_RESULTS_FOOTNOTE[0].rooms,
            revenueA: formatEuros(UPSELL_RESULTS_FOOTNOTE[0].monthlyRevenue, locale),
            roomsB: UPSELL_RESULTS_FOOTNOTE[1].rooms,
            revenueB: formatEuros(UPSELL_RESULTS_FOOTNOTE[1].monthlyRevenue, locale),
          })}
        </p>
      </div>
    </UpsellSection>
  );
}

function ResultCard({
  result,
  featured = false,
  locale,
}: {
  result: (typeof UPSELL_RESULTS)[number];
  featured?: boolean;
  locale: string;
}) {
  const t = useTranslations('lpUpsell.results');

  return (
    <article
      className={cn(
        'flex h-full flex-col rounded-2xl border border-[var(--up-line)] bg-[var(--up-surface)] p-7',
        featured &&
          'border-[var(--up-accent)]/25 bg-gradient-to-br from-[var(--up-accent-wash)] to-[var(--up-surface)] p-8'
      )}
    >
      <p className="text-sm font-medium text-[var(--up-ink-soft)]">
        {t(`profiles.${result.id}`)} · {t('rooms', { count: result.rooms })}
      </p>

      <p
        className={cn(
          'mt-3 font-[family-name:var(--font-geist-mono)] font-semibold text-[var(--up-accent-text)]',
          featured ? 'text-4xl md:text-5xl' : 'text-3xl'
        )}
      >
        {formatEuros(result.monthlyRevenue, locale)}
      </p>
      <p className="mt-1 text-sm text-[var(--up-ink-muted)]">{t('perMonth')}</p>

      <p className="mt-5 grow text-[15px] leading-relaxed text-[var(--up-ink-soft)]">
        {t(`mix.${result.id}`)}
      </p>

      <dl className="mt-5 flex flex-wrap gap-x-6 gap-y-1 border-t border-[var(--up-line)] pt-4 text-sm">
        <div className="flex items-baseline gap-1.5">
          <dt className="text-[var(--up-ink-muted)]">{t('perRoom')}</dt>
          <dd className="font-[family-name:var(--font-geist-mono)] font-semibold text-[var(--up-ink)]">
            {formatEuros(result.revenuePerRoom, locale)}
          </dd>
        </div>
        <div className="flex items-baseline gap-1.5">
          <dt className="sr-only">{t('monthsLabel')}</dt>
          <dd className="text-[var(--up-ink-muted)]">
            {t('months', { count: result.monthsObserved })}
          </dd>
        </div>
      </dl>
    </article>
  );
}
