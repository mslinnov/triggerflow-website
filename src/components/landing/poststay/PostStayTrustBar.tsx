'use client';

import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Headset, PackageCheck, Plug, ShieldCheck } from 'lucide-react';
import {
  PLATFORM_COMPLETION_RATE,
  POST_STAY_CTA_SHAPES,
  POST_STAY_SEND_HOURS,
} from '@/data/post-stay';
import { cn } from '@/lib/utils';
import { UpsellFigure } from '../upsell/primitives';

/**
 * Bande de réassurance : trois chiffres de l'étude, puis les PMS connectés.
 *
 * Les trois chiffres sont des taux et des rapports, jamais des volumes. Le
 * nombre d'envois de notre base prouverait notre activité, pas la sienne, et
 * renseignerait la concurrence sur la taille du parc. Les écarts en revanche
 * lui parlent : ils lui disent combien coûte un réglage.
 *
 * Mur de logos : les neuf PMS réellement connectés, hauteur calée logo par
 * logo pour égaliser le poids optique, filtre en niveaux de gris plutôt qu'un
 * aplat monochrome qui écraserait les marques figuratives. La table est
 * recopiée depuis la landing jumelle : c'est une duplication assumée, ces deux
 * pages doivent pouvoir mettre en avant des intégrations différentes sans se
 * déranger l'une l'autre.
 */
const PMS_LOGOS = [
  { file: 'mews.svg', name: 'Mews', width: 901, height: 113, size: 'h-5' },
  { file: 'thais.svg', name: 'Thaïs', width: 210, height: 64, size: 'h-6' },
  { file: 'opera.png', name: 'Opera Cloud', width: 1080, height: 500, size: 'h-8' },
  { file: 'misterbooking.png', name: 'Misterbooking', width: 498, height: 100, size: 'h-6' },
  { file: 'medialog.svg', name: 'Medialog', width: 152, height: 36, size: 'h-5' },
  { file: 'asterio.png', name: 'Asterio', width: 300, height: 157, size: 'h-8' },
  { file: 'clockpms.svg', name: 'Clock PMS', width: 600, height: 183, size: 'h-6' },
  { file: 'reservit.webp', name: 'Reservit', width: 300, height: 173, size: 'h-8' },
  { file: 'vega.png', name: 'Vega', width: 512, height: 512, size: 'h-7' },
] as const;

/**
 * Les deux rapports sont DÉRIVÉS des constantes de `@/data/post-stay`, et non
 * recopiés depuis la couverture du guide. Deux raisons : un chiffre affiché ici
 * ne peut plus contredire celui que le visiteur lit deux sections plus bas, et
 * une prochaine extraction déplacera les deux ensemble.
 *
 * Les créneaux non mesurés sont écartés du rapport : un écart annoncé doit
 * tenir entre deux mesures, sinon il n'annonce rien.
 */
const MEASURED_HOURS = POST_STAY_SEND_HOURS.filter((hour) => hour.isMeasured).map(
  (hour) => hour.completionRate
);
const HOUR_SPREAD = Math.max(...MEASURED_HOURS) / Math.min(...MEASURED_HOURS);
const CTA_RATES = POST_STAY_CTA_SHAPES.map((shape) => shape.completionRate);
const CTA_SPREAD = Math.max(...CTA_RATES) / Math.min(...CTA_RATES);

const REASSURANCE = [
  { key: 'turnkey', Icon: PackageCheck },
  { key: 'pms', Icon: Plug },
  { key: 'gdpr', Icon: ShieldCheck },
  { key: 'support', Icon: Headset },
] as const;

export function PostStayTrustBar() {
  const t = useTranslations('lpPostStay.trust');
  const locale = useLocale();

  const oneDecimal = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 });
  const figures = [
    {
      key: 'completion',
      value: oneDecimal.format(PLATFORM_COMPLETION_RATE * 100),
      unit: '%',
    },
    { key: 'hourSpread', value: `×${oneDecimal.format(HOUR_SPREAD)}`, unit: '' },
    { key: 'ctaSpread', value: `×${oneDecimal.format(CTA_SPREAD)}`, unit: '' },
  ];

  return (
    <section className="border-y border-[var(--up-line)] bg-[var(--up-surface-alt)] py-10 md:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-y-8 sm:grid-cols-3 sm:gap-y-0 sm:divide-x sm:divide-[var(--up-line)]">
          {figures.map((figure) => (
            <div key={figure.key} className="flex flex-col items-center px-2 text-center sm:px-8">
              {/* `dt` avant `dd` dans le balisage comme l'exige une liste de
                  définitions, ordre visuel rétabli par `order`. */}
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
