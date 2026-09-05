'use client';

import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { ShieldCheck, Plug, Headset, PackageCheck } from 'lucide-react';
import { PRODUCTION_FIGURES } from '@/data/upsell-services';
import { formatEuros } from '@/lib/upsell-simulator';
import { cn } from '@/lib/utils';

/**
 * Mur de logos : les dix PMS réellement connectés, avec leurs logos officiels.
 *
 * Le traitement est un passage en niveaux de gris et non un aplat monochrome.
 * La nuance compte : `brightness(0)` écrasait tout en noir, ce qui réduisait
 * Reservit à trois gouttes opaques et Vega à un disque plein, leurs éléments
 * internes disparaissant. `grayscale()` conserve les écarts de luminosité,
 * donc les icônes blanches des repères Reservit et l'étoile de Vega restent
 * lisibles, tout en gardant une rangée homogène qui ne vole pas l'attention
 * au simulateur juste en dessous.
 *
 * Amenitiz et D-EDGE ont été retirés du site entier : ce ne sont pas des
 * partenaires, et une intégration annoncée à tort se paie en rendez-vous pris
 * pour rien.
 *
 * Les rapports largeur/hauteur vont de 1,00 à 7,92 et les densités visuelles
 * sont très inégales : la hauteur est donc calée logo par logo pour égaliser
 * leur poids optique. Les marques figuratives (Vega, Reservit) sont plus
 * petites que les marques verbales, sans quoi elles dominent la rangée.
 */
const PMS_LOGOS = [
  { file: 'mews.svg', name: 'Mews', width: 901, height: 113, size: 'h-5' },
  { file: 'thais.svg', name: 'Thaïs', width: 210, height: 64, size: 'h-6' },
  { file: 'opera.png', name: 'Opera Cloud', width: 1080, height: 500, size: 'h-8' },
  { file: 'misterbooking.png', name: 'Misterbooking', width: 498, height: 100, size: 'h-6' },
  { file: 'medialog.svg', name: 'Medialog', width: 152, height: 36, size: 'h-5' },
  { file: 'asterio.png', name: 'Asterio', width: 300, height: 157, size: 'h-8' },
  { file: 'clockpms.svg', name: 'Clock PMS', width: 600, height: 183, size: 'h-6' },
  { file: 'protel.png', name: 'Protel', width: 300, height: 200, size: 'h-9' },
  { file: 'reservit.webp', name: 'Reservit', width: 300, height: 173, size: 'h-8' },
  { file: 'vega.png', name: 'Vega', width: 512, height: 512, size: 'h-7' },
] as const;

const REASSURANCE = [
  { key: 'turnkey', Icon: PackageCheck },
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
