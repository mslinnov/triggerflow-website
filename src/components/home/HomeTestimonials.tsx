import { useLocale, useTranslations } from 'next-intl';
import { Star } from 'lucide-react';
import { Container, Section, SectionHeader, TestimonialCard } from '@/components/ds';
import { homeTestimonials } from '@/data/clients';

export function HomeTestimonials() {
  const t = useTranslations('home2.testimonials');
  const locale = useLocale() as 'fr' | 'en';
  return (
    <Section tone="paper">
      <Container>
        <SectionHeader eyebrow={t('eyebrow')} title={t('title')} align="left" />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {homeTestimonials.map((q) => (
            <TestimonialCard key={q.name} quote={q.quote[locale]} name={q.name} role={q.role[locale]} company={q.company} />
          ))}
        </div>
        <div className="mt-8 flex flex-col gap-2 rounded-xl border border-line bg-white px-6 py-5 sm:flex-row sm:items-center sm:gap-5">
          <span className="flex gap-0.5" role="img" aria-label="5/5">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} aria-hidden className="h-4 w-4 fill-peach text-peach" />
            ))}
          </span>
          <p className="text-[15px] text-ink">« {t('review')} »</p>
          <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-ink-3 sm:ml-auto">{t('reviewLabel')}</span>
        </div>
      </Container>
    </Section>
  );
}
