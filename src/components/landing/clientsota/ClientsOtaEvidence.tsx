'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { CLIENTS_OTA_RULES } from '@/data/clients-ota';
import { UpsellSection } from '../upsell/primitives';
import { PENDING } from './format';

/**
 * Les sept règles, chacune avec les deux taux de capture qui l'opposent, lus
 * dans `@/data/clients-ota` : la page et le guide ne peuvent pas diverger.
 *
 * Toutes les valeurs sont des taux de capture PAR CLIENT OTA, c'est écrit en
 * sous-titre parce que c'est ce qui rend les sept lignes comparables. Sous
 * chaque règle, le contrôle à l'intérieur d'un même hôtel est affiché en clair,
 * y compris quand il manque : deux règles ne reposent que sur un écart entre
 * hôtels, et le visiteur doit pouvoir le lire.
 */
const MEASURED_BEST = CLIENTS_OTA_RULES.flatMap((rule) => (rule.best === null ? [] : [rule.best]));
const MAX_RATE = MEASURED_BEST.length > 0 ? Math.max(...MEASURED_BEST) : 1;

export function ClientsOtaEvidence() {
  const t = useTranslations('lpClientsOta.evidence');

  return (
    <UpsellSection className="bg-[var(--up-bg-sunken)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-[var(--up-ink)] md:text-4xl">{t('title')}</h2>
          <p className="mt-4 text-lg leading-relaxed text-[var(--up-ink-soft)]">{t('subtitle')}</p>
        </div>

        <ol className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-7">
          {CLIENTS_OTA_RULES.map((rule, index) => (
            <motion.li
              key={rule.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: (index % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl border border-[var(--up-line)] bg-[var(--up-surface)] p-6 md:p-8"
            >
              <p className="font-[family-name:var(--font-geist-mono)] text-sm font-semibold text-[var(--up-accent-text)]">
                {index + 1}
              </p>
              <h3 className="mt-2 text-lg font-semibold leading-snug text-[var(--up-ink)]">{t(`${rule.id}.title`)}</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-[var(--up-ink-soft)]">{t(`${rule.id}.body`)}</p>

              <dl className="mt-6 space-y-3 border-t border-[var(--up-line)] pt-5">
                {(['best', 'worst'] as const).map((side) => {
                  const rate = rule[side];
                  return (
                    <div key={side} className="flex items-center gap-3">
                      <dt className="w-[7.5rem] shrink-0 text-[13px] leading-snug text-[var(--up-ink-soft)]">
                        {t(`${rule.id}.${side}`)}
                      </dt>
                      <div aria-hidden className="min-w-0 flex-1">
                        <span
                          className={
                            side === 'best'
                              ? 'block h-1.5 rounded-full bg-[var(--up-accent)]'
                              : 'block h-1.5 rounded-full bg-[var(--up-line-strong)]'
                          }
                          style={{ width: rate === null ? '0%' : `${Math.max((rate / MAX_RATE) * 100, 4)}%` }}
                        />
                      </div>
                      <dd className="w-14 shrink-0 text-right font-[family-name:var(--font-geist-mono)] text-sm font-semibold text-[var(--up-ink)]">
                        {rate === null ? PENDING : t('rateValue', { rate: rate * 100 })}
                      </dd>
                    </div>
                  );
                })}
              </dl>

              <p className="mt-4 text-[13px] leading-relaxed text-[var(--up-ink-muted)]">
                {rule.withinHotels
                  ? t('withinHotels', { wins: rule.withinHotels.wins, of: rule.withinHotels.of })
                  : t('betweenHotelsOnly')}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </UpsellSection>
  );
}
