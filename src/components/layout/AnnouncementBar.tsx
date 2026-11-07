import { getTranslations } from 'next-intl/server';
import { ArrowRight } from 'lucide-react';
import { brand } from '@/data/brand';

/**
 * Bandeau d'annonce produit, en tête du header fixe (remplace l'annonce de hausse des tarifs,
 * décision du 07/11/2026 ; la hausse reste expliquée sur /tarifs).
 * Hauteur fixe h-9 (36px) : le décalage du contenu sous le header en dépend (data-price-banner).
 */
export async function AnnouncementBar() {
  const t = await getTranslations('announcement');
  return (
    <a
      href={brand.demoUrl}
      target="_blank"
      rel="noopener noreferrer"
      data-price-banner
      className="flex h-9 items-center justify-center gap-2 bg-brand-dark px-4 text-xs font-medium text-white sm:text-sm"
    >
      <span className="shrink-0 rounded-full bg-brand-light px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand-dark">
        {t('badge')}
      </span>
      <span className="truncate lg:hidden">{t('short')}</span>
      <span className="hidden truncate lg:inline">{t('text')}</span>
      <span className="hidden shrink-0 items-center gap-1 underline underline-offset-2 md:inline-flex">
        {t('cta')}
        <ArrowRight className="h-3.5 w-3.5" />
      </span>
    </a>
  );
}
