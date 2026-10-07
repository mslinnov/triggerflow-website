import { useTranslations } from 'next-intl';
import { BookOpen, Download, Star, TrendingUp, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Container } from '@/components/ui';
import { EQUIPHOTEL_GUIDES, type GuideId } from '@/data/equiphotel';

const icons: Record<GuideId, LucideIcon> = {
  revenus: TrendingUp,
  directs: Users,
  avis: Star,
};

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

        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {EQUIPHOTEL_GUIDES.map((guide, index) => {
            const Icon = icons[guide.id];
            return (
              <li
                key={guide.id}
                className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-[var(--shadow-md)] ring-1 ring-border-light"
              >
                {/* Couverture graphique, sans image pour rester léger */}
                <div className="relative flex h-32 items-end justify-between md:h-36 bg-surface-dark p-5">
                  <span className="text-5xl font-bold text-white/15">0{index + 1}</span>
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-primary text-white">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-brand-light">
                    <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                    {t(`items.${guide.id}.tag`)}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-bold leading-snug text-text-primary">
                    {t(`items.${guide.id}.title`)}
                  </h3>
                  <p className="mt-3 flex-1 text-text-secondary">{t(`items.${guide.id}.description`)}</p>

                  <a
                    href={guide.href}
                    {...(guide.href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}
                    className="group mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-brand-primary px-5 py-3.5 font-semibold text-white transition-colors hover:bg-brand-primary/90"
                  >
                    <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
                    {t('cta')}
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
