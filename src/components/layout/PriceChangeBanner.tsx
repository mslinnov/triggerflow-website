import { getTranslations } from 'next-intl/server';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';

/**
 * Annonce de la hausse du 1er janvier 2027, en tête du header fixe.
 * Hauteur fixe h-9 (36px) : le décalage du contenu sous le header en dépend.
 */
export async function PriceChangeBanner() {
  const t = await getTranslations('priceChange');
  return (
    <Link
      href="/tarifs"
      data-price-banner
      className="flex h-9 items-center justify-center gap-2 bg-brand-dark px-4 text-xs font-medium text-white sm:text-sm"
    >
      <span className="truncate lg:hidden">{t('bannerShort')}</span>
      <span className="hidden truncate lg:inline">{t('banner')}</span>
      <span className="hidden shrink-0 items-center gap-1 underline underline-offset-2 md:inline-flex">
        {t('bannerCta')}
        <ArrowRight className="h-3.5 w-3.5" />
      </span>
    </Link>
  );
}
