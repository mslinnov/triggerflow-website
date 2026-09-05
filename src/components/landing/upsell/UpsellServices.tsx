'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { UPSELL_SERVICES } from '@/data/upsell-services';
import { formatEuros } from '@/lib/upsell-simulator';
import { cn } from '@/lib/utils';
import { UpsellEyebrow, UpsellSection } from './primitives';
import { UpsellIcon } from './UpsellIcon';

/**
 * Les douze prestations réellement vendues chez les clients, classées par poids
 * dans le chiffre d'affaires observé et non par intuition marketing. Grille
 * asymétrique : autant de cellules que de prestations, largeurs variables,
 * trois cellules teintées pour donner du rythme.
 */

// Largeur de chaque cellule sur la grille 12 colonnes (desktop). Quatre rangées.
const SPANS = [
  'lg:col-span-5', 'lg:col-span-4', 'lg:col-span-3',
  'lg:col-span-3', 'lg:col-span-5', 'lg:col-span-4',
  'lg:col-span-4', 'lg:col-span-3', 'lg:col-span-5',
  'lg:col-span-5', 'lg:col-span-4', 'lg:col-span-3',
];

const TINTED = new Set([0, 4, 8]);

export function UpsellServices() {
  const t = useTranslations('lpUpsell.servicesSection');
  const tServices = useTranslations('lpUpsell.services');
  const locale = useLocale();
  const reduce = useReducedMotion();

  return (
    <UpsellSection className="bg-[var(--up-bg-sunken)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <UpsellEyebrow>{t('eyebrow')}</UpsellEyebrow>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--up-ink)] md:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[var(--up-ink-soft)]">{t('subtitle')}</p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-12">
          {UPSELL_SERVICES.map((service, index) => (
            <motion.article
              key={service.id}
              initial={reduce ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: (index % 3) * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                'flex flex-col rounded-2xl border p-6',
                SPANS[index],
                TINTED.has(index)
                  ? 'border-[var(--up-accent)]/25 bg-gradient-to-br from-[var(--up-accent-wash)] to-[var(--up-surface)]'
                  : 'border-[var(--up-line)] bg-[var(--up-surface)]'
              )}
            >
              <UpsellIcon name={service.icon} className="h-6 w-6 text-[var(--up-accent)]" />
              <h3 className="mt-4 text-base font-semibold text-[var(--up-ink)]">
                {tServices(`${service.id}.name`)}
              </h3>
              <p className="mt-2 grow text-[15px] leading-relaxed text-[var(--up-ink-soft)]">
                {tServices(`${service.id}.example`)}
              </p>
              <dl className="mt-5 flex flex-wrap items-baseline gap-x-6 gap-y-1 border-t border-[var(--up-line)] pt-4 text-sm text-[var(--up-ink-muted)]">
                <div className="flex items-baseline gap-1.5">
                  <dt>{t('medianBasket')}</dt>
                  <dd className="font-[family-name:var(--font-geist-mono)] font-semibold text-[var(--up-ink)]">
                    {formatEuros(service.medianPrice, locale)}
                  </dd>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <dt className="sr-only">{t('hotelCountLabel')}</dt>
                  <dd>{t('hotelCount', { count: service.hotelCount })}</dd>
                </div>
              </dl>
            </motion.article>
          ))}
        </div>

        <p className="mt-6 max-w-[70ch] text-sm leading-relaxed text-[var(--up-ink-muted)]">
          {t('disclaimer')}
        </p>
      </div>
    </UpsellSection>
  );
}
