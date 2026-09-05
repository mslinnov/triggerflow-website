'use client';

import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { ShieldCheck, Plug, Headset, PackageCheck } from 'lucide-react';
import { PRODUCTION_FIGURES } from '@/data/upsell-services';
import { formatEuros } from '@/lib/upsell-simulator';
import { cn } from '@/lib/utils';

/**
 * Mur de logos PMS réels, puis les trois éléments de réassurance sortis du hero.
 * Les logos sont neutralisés par un filtre piloté par token, pour rester lisibles
 * en thème clair comme en thème sombre.
 */

/**
 * Mur de logos : uniquement les marques dont nous avons le logo authentique.
 *
 * Trois partenaires manquent au mur, pour deux raisons distinctes.
 *
 * Protel : le fichier protel.svg est une approximation fabriquée, « protel » en
 * Arial dans un carré bleu. Le site de l'éditeur bloque l'accès automatisé, le
 * vrai logo reste à récupérer à la main. Afficher une contrefaçon du logo d'un
 * partenaire dessert sa marque autant que la nôtre.
 *
 * Reservit et Vega : leurs vrais logos existent mais ne survivent pas au
 * passage en monochrome du mur. Vega est un badge circulaire plein qui devient
 * un disque gris, Reservit un ensemble de pictogrammes colorés qui devient
 * trois gouttes noires. Les mettre en couleur au milieu de marques verbales
 * grises casserait l'homogénéité de la rangée.
 *
 * Ces trois-là sont cités en toutes lettres dans la FAQ et le formulaire.
 * Amenitiz et D-EDGE, eux, ont été retirés partout : ce ne sont pas des
 * partenaires.
 *
 * Restent sept marques verbales, homogènes entre elles.
 *
 * Les rapports largeur/hauteur vont de 1,91 à 7,92 : la hauteur est calée par
 * logo pour égaliser leur poids visuel, plutôt qu'uniformément.
 */
const PMS_LOGOS = [
  { file: 'mews.svg', name: 'Mews', width: 901, height: 113, size: 'h-5' },
  { file: 'thais.svg', name: 'Thaïs', width: 210, height: 64, size: 'h-6' },
  { file: 'opera.png', name: 'Opera Cloud', width: 1080, height: 500, size: 'h-8' },
  { file: 'misterbooking.png', name: 'Misterbooking', width: 498, height: 100, size: 'h-5' },
  { file: 'medialog.svg', name: 'Medialog', width: 152, height: 36, size: 'h-5' },
  { file: 'asterio.png', name: 'Asterio', width: 300, height: 157, size: 'h-7' },
  { file: 'clockpms.svg', name: 'Clock PMS', width: 600, height: 183, size: 'h-6' },
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
