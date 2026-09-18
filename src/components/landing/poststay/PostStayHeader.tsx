'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { trackMetaEvent } from '@/components/analytics/MetaPixel';
import { LEMCAL_DEMO_URL_POST_STAY } from '@/data/upsell-links';
import { UpsellExternalLinkButton } from '../upsell/primitives';

/**
 * En-tête réduit à un logo et un bouton. Le trafic est payant : toute sortie
 * de page qui n'est pas une conversion est un lead perdu, donc aucune
 * navigation secondaire.
 *
 * Le bouton pointe vers le calendrier propre au thème post-séjour, et non vers
 * celui des ventes additionnelles : c'est ce qui rend les rendez-vous
 * attribuables à la bonne campagne. Il ne fait pas doublon avec la barre
 * collante du bas, qui mène au formulaire du guide : deux destinations, deux
 * intentions.
 */
export function PostStayHeader() {
  const t = useTranslations('lpPostStay.cta');

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--up-line)] bg-[var(--up-bg)]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Deux versions du logo : le logo sombre disparaîtrait sur le thème
            sombre. Le variant `dark:` s'appuie sur la même media query
            `prefers-color-scheme` que les jetons de couleur de la page. */}
        <Image
          src="/images/logo.webp"
          alt="TriggerFlow"
          width={150}
          height={32}
          priority
          className="h-7 w-auto dark:hidden"
        />
        <Image
          src="/images/logo-white.webp"
          alt="TriggerFlow"
          width={150}
          height={32}
          className="hidden h-7 w-auto dark:block"
        />

        <UpsellExternalLinkButton
          href={LEMCAL_DEMO_URL_POST_STAY}
          className="shrink-0"
          onClick={() =>
            trackMetaEvent('ViewContent', { content_name: 'lp-poststay-header-demo' })
          }
        >
          {t('bookDemo')}
        </UpsellExternalLinkButton>
      </div>
    </header>
  );
}
