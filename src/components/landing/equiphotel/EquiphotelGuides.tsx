import { useTranslations } from 'next-intl';
import { BookOpen, Download, Repeat, Sparkles, Star, TrendingUp } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Container } from '@/components/ui';
import { EQUIPHOTEL_GUIDES, type EquiphotelGuide, type GuideId } from '@/data/equiphotel';
import { cn } from '@/lib/utils';

const icons: Record<GuideId, LucideIcon> = {
  clientsOta: Repeat,
  revenus: TrendingUp,
  avis: Star,
};

/**
 * Les guides du salon. Le guide mis en avant (le plus récent) occupe toute la
 * largeur en tête, couverture aux couleurs de la marque, badge « Nouveau » et
 * chiffre clé ; les autres gardent leur carte côte à côte, inchangée.
 */
export function EquiphotelGuides() {
  const t = useTranslations('equiphotel.guides');

  return (
    <section id="guides" className="scroll-mt-16 bg-surface-tertiary py-16 md:py-24">
      <Container>
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-primary">{t('eyebrow')}</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-text-primary md:text-4xl">{t('title')}</h2>
          <p className="mt-4 text-lg text-text-secondary">{t('subtitle')}</p>
        </div>

        <ul className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-2">
          {EQUIPHOTEL_GUIDES.map((guide, index) => (
            <GuideCard key={guide.id} guide={guide} index={index} />
          ))}
        </ul>
      </Container>
    </section>
  );
}

function GuideCard({ guide, index }: { guide: EquiphotelGuide; index: number }) {
  const t = useTranslations('equiphotel.guides');
  const Icon = icons[guide.id];
  const featured = guide.featured === true;

  return (
    <li
      className={cn(
        'flex flex-col overflow-hidden rounded-3xl bg-white shadow-[var(--shadow-md)]',
        featured ? 'ring-2 ring-brand-primary md:col-span-2 md:flex-row' : 'ring-1 ring-border-light'
      )}
    >
      {/* Couverture graphique, sans image pour rester léger */}
      <div
        className={cn(
          'relative flex items-end justify-between p-5',
          featured
            ? 'h-40 bg-brand-primary md:h-auto md:w-[38%] md:shrink-0 md:flex-col md:items-start md:justify-end md:gap-6 md:p-7'
            : 'h-32 bg-surface-dark md:h-36'
        )}
      >
        <span className={cn('font-bold text-white/15', featured ? 'text-6xl' : 'text-5xl')}>0{index + 1}</span>
        <span
          className={cn(
            'flex h-12 w-12 items-center justify-center rounded-2xl',
            featured ? 'bg-white text-brand-primary' : 'bg-brand-primary text-white'
          )}
        >
          <Icon className="h-6 w-6" aria-hidden="true" />
        </span>
        <span className="absolute left-5 top-5 flex flex-wrap items-center gap-2 md:left-7 md:top-7">
          {featured && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-accent px-3 py-1 text-xs font-semibold text-brand-dark">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              {t('new')}
            </span>
          )}
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-brand-light">
            <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
            {t(`items.${guide.id}.tag`)}
          </span>
        </span>
      </div>

      <div className={cn('flex flex-1 flex-col p-6', featured && 'md:p-8')}>
        <h3 className={cn('font-bold leading-snug text-text-primary', featured ? 'text-2xl' : 'text-xl')}>
          {t(`items.${guide.id}.title`)}
        </h3>
        <p className="mt-3 flex-1 text-text-secondary">{t(`items.${guide.id}.description`)}</p>

        {featured && (
          <p className="mt-5 flex items-baseline gap-3 rounded-2xl bg-brand-accent-light px-4 py-3">
            <span className="shrink-0 text-2xl font-bold text-brand-primary">{t(`items.${guide.id}.figure`)}</span>
            <span className="text-sm text-text-secondary">{t(`items.${guide.id}.figureLabel`)}</span>
          </p>
        )}

        <a
          href={guide.href}
          {...(guide.href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}
          className={cn(
            'group mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-brand-primary px-5 py-3.5 font-semibold text-white transition-colors hover:bg-brand-primary/90',
            featured && 'md:self-start md:px-7'
          )}
        >
          <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
          {t('cta')}
        </a>
      </div>
    </li>
  );
}
