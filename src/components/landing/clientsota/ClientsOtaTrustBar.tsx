'use client';

import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Headset, PackageCheck, Plug, ShieldCheck } from 'lucide-react';
import { CLIENTS_OTA_CAPTURE_RATE, CLIENTS_OTA_HOTEL_SPREAD, CLIENTS_OTA_RULES } from '@/data/clients-ota';
import { cn } from '@/lib/utils';
import { UpsellFigure } from '../upsell/primitives';
import { formatPercentValue, formatRatio } from './format';

/**
 * Bande de réassurance : trois chiffres de l'étude, puis les PMS connectés.
 * Des taux et des rapports, jamais des volumes, comme sur les deux landings
 * jumelles.
 *
 * PMS : connecteurs actifs vérifiés dans le code triggerflow le 31/10/2026
 * (`backend/app/Services/Plugs/*`), restreints aux PMS que le site peut citer.
 * Duplication assumée de la table des landings jumelles, pour que chaque page
 * puisse mettre en avant ses propres intégrations.
 */
const PMS_LOGOS = [
  { file: 'mews.svg', name: 'Mews', width: 901, height: 113, size: 'h-5' },
  { file: 'thais.svg', name: 'Thaïs', width: 210, height: 64, size: 'h-6' },
  { file: 'opera.png', name: 'Opera Cloud', width: 1080, height: 500, size: 'h-8' },
  { file: 'apaleo.png', name: 'Apaleo', width: 829, height: 210, size: 'h-6' },
  { file: 'misterbooking.png', name: 'Misterbooking', width: 498, height: 100, size: 'h-6' },
  { file: 'medialog.svg', name: 'Medialog', width: 152, height: 36, size: 'h-5' },
  { file: 'asterio.png', name: 'Asterio', width: 300, height: 157, size: 'h-8' },
  { file: 'reservit.webp', name: 'Reservit', width: 300, height: 173, size: 'h-8' },
  { file: 'vega.png', name: 'Vega', width: 512, height: 512, size: 'h-7' },
] as const;

/** Écart de la règle n°1, le moment du premier message : vérifié dans 10 hôtels sur 10. */
const FIRST_RULE = CLIENTS_OTA_RULES[0];
const FIRST_RULE_SPREAD =
  FIRST_RULE.best !== null && FIRST_RULE.worst !== null && FIRST_RULE.worst > 0
    ? FIRST_RULE.best / FIRST_RULE.worst
    : null;

const REASSURANCE = [
  { key: 'turnkey', Icon: PackageCheck },
  { key: 'pms', Icon: Plug },
  { key: 'gdpr', Icon: ShieldCheck },
  { key: 'support', Icon: Headset },
] as const;

export function ClientsOtaTrustBar() {
  const t = useTranslations('lpClientsOta.trust');
  const locale = useLocale();

  const figures = [
    { key: 'capture', value: formatPercentValue(CLIENTS_OTA_CAPTURE_RATE, locale), unit: '%' },
    { key: 'hotelSpread', value: formatRatio(CLIENTS_OTA_HOTEL_SPREAD, locale), unit: '' },
    { key: 'ruleSpread', value: formatRatio(FIRST_RULE_SPREAD, locale), unit: '' },
  ];

  return (
    <section className="border-y border-[var(--up-line)] bg-[var(--up-surface-alt)] py-10 md:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-y-8 sm:grid-cols-3 sm:gap-y-0 sm:divide-x sm:divide-[var(--up-line)]">
          {figures.map((figure) => (
            <div key={figure.key} className="flex flex-col items-center px-2 text-center sm:px-8">
              <dt className="order-2 mt-3 max-w-[26ch] text-[15px] leading-snug text-[var(--up-ink-soft)]">
                {t(`figures.${figure.key}`)}
              </dt>
              <dd className="order-1">
                <UpsellFigure
                  value={figure.value}
                  unit={figure.unit}
                  className="text-[2.75rem] font-semibold leading-none tracking-[-0.03em] text-[var(--up-accent-text)] md:text-[3.25rem]"
                />
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-11 border-t border-[var(--up-line)] pt-9 text-center text-sm font-medium text-[var(--up-ink-muted)]">
          {t('title')}
        </p>

        <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-10 gap-y-7 sm:gap-x-12">
          {PMS_LOGOS.map((pms) => (
            <li key={pms.file} className="flex shrink-0 items-center justify-center">
              <Image
                src={`/images/integrations/${pms.file}`}
                alt={pms.name}
                width={pms.width}
                height={pms.height}
                className={cn('w-auto max-w-[7rem] object-contain', pms.size)}
                style={{ filter: 'var(--up-logo-filter)' }}
              />
            </li>
          ))}
        </ul>

        <ul className="mt-10 flex flex-col items-center justify-center gap-4 border-t border-[var(--up-line)] pt-8 text-sm text-[var(--up-ink-soft)] sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-3">
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
