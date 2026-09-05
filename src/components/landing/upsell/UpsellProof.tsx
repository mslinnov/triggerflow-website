'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { UpsellSection } from './primitives';

/**
 * Contrepartie du hero : le hero montre ce que recoit le client, cette section
 * montre ce que l'hotelier en voit. Capture reelle du produit, pas une maquette.
 */
export function UpsellProof() {
  const t = useTranslations('lpUpsell.proof');

  return (
    <UpsellSection className="bg-[var(--up-bg)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-[var(--up-ink)] md:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[var(--up-ink-soft)]">{t('subtitle')}</p>
        </div>

        <figure className="mt-12">
          <div className="overflow-hidden rounded-2xl border border-[var(--up-line)] bg-[var(--up-surface)] shadow-[var(--up-shadow-lg)]">
            <Image
              src="/images/homepage/upsell-offer.webp"
              alt={t('imageAlt')}
              width={1600}
              height={999}
              className="h-auto w-full"
            />
          </div>
          <figcaption className="mt-4 max-w-[60ch] text-[15px] leading-relaxed text-[var(--up-ink-soft)]">
            {t('caption')}
          </figcaption>
        </figure>
      </div>
    </UpsellSection>
  );
}
