'use client';

import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { ShieldCheck, Plug, Headset } from 'lucide-react';
import { PRODUCTION_FIGURES } from '@/data/upsell-services';
import { formatEuros } from '@/lib/upsell-simulator';

/**
 * Mur de logos PMS réels, puis les trois éléments de réassurance sortis du hero.
 * Les logos sont neutralisés par un filtre piloté par token, pour rester lisibles
 * en thème clair comme en thème sombre.
 */

const PMS_LOGOS = [
  { slug: 'mews', name: 'Mews' },
  { slug: 'thais', name: 'Thaïs' },
  { slug: 'opera', name: 'Opera Cloud' },
  { slug: 'amenitiz', name: 'Amenitiz' },
  { slug: 'misterbooking', name: 'Misterbooking' },
  { slug: 'medialog', name: 'Medialog' },
  { slug: 'reservit', name: 'Reservit' },
  { slug: 'asterio', name: 'Asterio' },
  { slug: 'dedge', name: 'D-EDGE' },
] as const;

const REASSURANCE = [
  { key: 'pms', Icon: Plug },
  { key: 'gdpr', Icon: ShieldCheck },
  { key: 'support', Icon: Headset },
] as const;

export function UpsellTrustBar() {
  const t = useTranslations('lpUpsell.trust');
  const locale = useLocale();

  const figures = [
    { key: 'facilities', value: new Intl.NumberFormat(locale === 'en' ? 'en-GB' : 'fr-FR').format(PRODUCTION_FIGURES.facilities) },
    { key: 'offers', value: new Intl.NumberFormat(locale === 'en' ? 'en-GB' : 'fr-FR').format(PRODUCTION_FIGURES.offersSent) },
    { key: 'revenue', value: formatEuros(PRODUCTION_FIGURES.revenueGenerated, locale) },
  ];

  return (
    <section className="border-y border-[var(--up-line)] bg-[var(--up-surface-alt)] py-10 md:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Chiffres bruts de la base de production, pas des arrondis marketing. */}
        <dl className="grid grid-cols-1 gap-6 border-b border-[var(--up-line)] pb-9 sm:grid-cols-3">
          {figures.map((figure) => (
            <div key={figure.key} className="text-center">
              <dt className="sr-only">{t(`figures.${figure.key}`)}</dt>
              <dd>
                <span className="block font-[family-name:var(--font-geist-mono)] text-3xl font-semibold text-[var(--up-ink)] md:text-4xl">
                  {figure.value}
                </span>
                <span className="mt-1.5 block text-sm text-[var(--up-ink-soft)]">
                  {t(`figures.${figure.key}`)}
                </span>
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-9 text-center text-sm font-medium text-[var(--up-ink-muted)]">
          {t('title')}
        </p>

        <ul className="mt-7 grid grid-cols-3 items-center gap-x-6 gap-y-7 sm:grid-cols-5 lg:grid-cols-9">
          {PMS_LOGOS.map((pms) => (
            <li key={pms.slug} className="flex items-center justify-center">
              <Image
                src={`/images/pms/${pms.slug}.svg`}
                alt={pms.name}
                width={120}
                height={36}
                className="h-6 w-auto max-w-full"
                style={{ filter: 'var(--up-logo-filter)' }}
              />
            </li>
          ))}
        </ul>

        <ul className="mt-10 flex flex-col items-center justify-center gap-4 border-t border-[var(--up-line)] pt-8 text-sm text-[var(--up-ink-soft)] sm:flex-row sm:gap-10">
          {REASSURANCE.map(({ key, Icon }) => (
            <li key={key} className="flex items-center gap-2.5">
              <Icon className="h-[18px] w-[18px] shrink-0 text-[var(--up-accent)]" strokeWidth={2} />
              {t(key)}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
