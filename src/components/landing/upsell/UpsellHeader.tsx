'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { trackMetaEvent } from '@/components/analytics/MetaPixel';
import { LEMCAL_DEMO_URL, LEMCAL_DEMO_URL_WHITEPAPER } from '@/data/upsell-links';
import { UpsellExternalLinkButton } from './primitives';
import { useUpsell } from './UpsellContext';

/**
 * En-tête volontairement réduit à sa plus simple expression : le trafic est
 * payant, toute sortie de page est un lead perdu. Un logo, un bouton, rien d'autre.
 *
 * Le bouton est visible sur mobile, contrairement à la première version. Les
 * deux appels à l'action ne se marchent pas dessus parce qu'ils ne mènent pas
 * au même endroit : en haut, la prise de rendez-vous directe pour le visiteur
 * déjà décidé ; en bas, la barre collante qui pointe sur le formulaire, offre
 * principale de la variante. Le calendrier est distinct par variante, pour que
 * les rendez-vous restent attribuables.
 */
export function UpsellHeader() {
  const t = useTranslations('lpUpsell');
  const { goal, result } = useUpsell();

  const href = goal === 'demo' ? LEMCAL_DEMO_URL : LEMCAL_DEMO_URL_WHITEPAPER;

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--up-line)] bg-[var(--up-bg)]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Deux versions du logo : le logo sombre disparaîtrait sur le thème
            sombre. Le variant `dark:` de Tailwind s'appuie sur la même media
            query `prefers-color-scheme` que les tokens de la page. */}
        <Image
          src="/images/logo.webp"
          alt="TriggerFlow"
          width={150}
          height={32}
          priority
          className="h-7 w-auto dark:hidden"
        />
        {/* Pas de `priority` ici : les deux variantes du logo se préchargeraient,
            alors qu'un seul thème est actif à la fois. */}
        <Image
          src="/images/logo-white.webp"
          alt="TriggerFlow"
          width={150}
          height={32}
          className="hidden h-7 w-auto dark:block"
        />

        <UpsellExternalLinkButton
          href={href}
          className="shrink-0"
          onClick={() =>
            trackMetaEvent('ViewContent', {
              content_name: 'lp-upsell-header-demo',
              variant: goal,
              value: result.monthlyRevenue,
              currency: 'EUR',
            })
          }
        >
          {t('cta.bookDemo')}
        </UpsellExternalLinkButton>
      </div>
    </header>
  );
}
