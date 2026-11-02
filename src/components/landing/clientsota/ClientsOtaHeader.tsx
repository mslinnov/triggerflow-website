'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { trackMetaEvent } from '@/components/analytics/MetaPixel';
import { LEMCAL_DEMO_URL_CLIENTS_OTA } from '@/data/upsell-links';
import { UpsellExternalLinkButton } from '../upsell/primitives';

/**
 * En-tête réduit à un logo et un bouton, comme sur les deux landings jumelles :
 * le trafic est payant, aucune navigation secondaire.
 *
 * Le bouton mène au calendrier propre au thème « clients OTA », pour que les
 * rendez-vous soient attribuables à cette campagne.
 */
export function ClientsOtaHeader() {
  const t = useTranslations('lpClientsOta.cta');

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--up-line)] bg-[var(--up-bg)]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
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
          href={LEMCAL_DEMO_URL_CLIENTS_OTA}
          className="shrink-0"
          onClick={() => trackMetaEvent('ViewContent', { content_name: 'lp-clientsota-header-demo' })}
        >
          {t('bookDemo')}
        </UpsellExternalLinkButton>
      </div>
    </header>
  );
}
