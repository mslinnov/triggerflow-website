'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { UpsellLinkButton } from './primitives';

/**
 * En-tête volontairement réduit à sa plus simple expression : le trafic est
 * payant, toute sortie de page est un lead perdu. Un logo, un bouton, rien d'autre.
 */
export function UpsellHeader() {
  const t = useTranslations('lpUpsell');

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--up-line)] bg-[var(--up-bg)]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
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
        <Image
          src="/images/logo-white.webp"
          alt="TriggerFlow"
          width={150}
          height={32}
          priority
          className="hidden h-7 w-auto dark:block"
        />
        {/* Masqué sur mobile : la barre collante en bas d'écran porte déjà l'action. */}
        <UpsellLinkButton href="#simulateur" size="md" className="hidden sm:inline-flex">
          {t('cta.calculate')}
        </UpsellLinkButton>
      </div>
    </header>
  );
}
