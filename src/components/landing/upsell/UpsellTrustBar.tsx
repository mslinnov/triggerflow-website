'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ShieldCheck, Plug, Headset, PackageCheck } from 'lucide-react';
import { HOTEL_VALUE_FIGURES } from '@/data/upsell-services';
import { cn } from '@/lib/utils';
import { UpsellFigure } from './primitives';

/**
 * Bande de réassurance : ce que l'hôtel gagne, puis avec quoi c'est compatible.
 *
 * Les trois chiffres sont tournés du côté de l'hôtelier. Le volume de notre
 * base de production (offres envoyées, ventes générées) a été retiré d'ici :
 * il prouve notre activité, pas la sienne, et il vit désormais uniquement dans
 * le bloc méthodologie du simulateur, là où il sert à justifier un calcul.
 *
 * Mur de logos : les neuf PMS réellement connectés, avec leurs logos officiels.
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
 * pour rien. Protel a été retiré pour la même raison : le partenariat n'est
 * pas signé.
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
  { file: 'reservit.webp', name: 'Reservit', width: 300, height: 173, size: 'h-8' },
  { file: 'vega.png', name: 'Vega', width: 512, height: 512, size: 'h-7' },
] as const;

const FIGURES = [
  { key: 'revenuePerRoom', value: `+${HOTEL_VALUE_FIGURES.revenuePerRoom}`, unit: '€' },
  { key: 'uplift', value: `+${HOTEL_VALUE_FIGURES.ancillaryUplift}`, unit: '%' },
  { key: 'margin', value: `${HOTEL_VALUE_FIGURES.marginRate}`, unit: '%' },
] as const;

const REASSURANCE = [
  { key: 'turnkey', Icon: PackageCheck },
  { key: 'pms', Icon: Plug },
  { key: 'gdpr', Icon: ShieldCheck },
  { key: 'support', Icon: Headset },
] as const;

export function UpsellTrustBar() {
  const t = useTranslations('lpUpsell.trust');

  return (
    <section className="border-y border-[var(--up-line)] bg-[var(--up-surface-alt)] py-10 md:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Filets verticaux plutôt que trois cartes : la hiérarchie tient à
            l'échelle du chiffre, un encadré n'ajouterait rien. */}
        <dl className="grid grid-cols-1 gap-y-8 sm:grid-cols-3 sm:gap-y-0 sm:divide-x sm:divide-[var(--up-line)]">
          {FIGURES.map((figure) => (
            <div
              key={figure.key}
              className="flex flex-col items-center px-2 text-center sm:px-8"
            >
              {/* `dt` avant `dd` dans le balisage, comme l'exige une liste de
                  définitions ; l'ordre visuel est rétabli par `order`.
                  `flex-col-reverse` empilerait depuis le bas du conteneur, et
                  les trois chiffres cesseraient de s'aligner dès qu'un libellé
                  tient sur trois lignes plutôt que deux. */}
              <dt className="order-2 mt-3 max-w-[24ch] text-[15px] leading-snug text-[var(--up-ink-soft)]">
                {t(`figures.${figure.key}`)}
              </dt>
              {/* Même primitive que les montants du simulateur : le rapport
                  d'échelle entre le chiffre et son unité n'a qu'une définition.
                  Elle rend un `span`, donc elle reste enveloppée dans le `dd`. */}
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
