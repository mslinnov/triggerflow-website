import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight, Star } from 'lucide-react';
import { Container, Section, SectionHeader, TestimonialCard } from '@/components/ds';
import { homeTestimonials } from '@/data/clients';
import { Link } from '@/i18n/navigation';

interface ResultItem {
  client: string;
  tag: string;
  title: string;
  text: string;
  href: string;
  cta: string;
}

export function HomeResults() {
  const t = useTranslations('home2.results');
  const tq = useTranslations('home2.testimonials');
  const locale = useLocale() as 'fr' | 'en';
  const items = t.raw('items') as ResultItem[];
  // Les clients déjà présents dans les cartes de résultats ne sont pas cités deux fois.
  const quotes = homeTestimonials.filter((q) => !items.some((item) => item.client === q.company));
  return (
    <Section tone="paper">
      <Container>
        <SectionHeader eyebrow={t('eyebrow')} title={t('title')} align="left" />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {items.map((item) => (
            <Link
              key={item.client}
              href={item.href}
              className="group flex flex-col rounded-xl border border-line bg-white p-7 transition-colors hover:border-accent"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-[15px] font-semibold text-ink">{item.client}</span>
                <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-ink-3">{item.tag}</span>
              </div>
              <h3 className="mt-8 text-h3 font-medium text-ink">{item.title}</h3>
              <p className="mt-4 flex-1 text-[15px] leading-relaxed text-ink-2">{item.text}</p>
              <span className="mt-8 inline-flex items-center gap-1.5 text-[14px] font-medium text-accent">
                {item.cta}
                <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>

        {/* Les autres témoignages et l'avis Google, dans la même section */}
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {quotes.map((q) => (
            <TestimonialCard key={q.name} quote={q.quote[locale]} name={q.name} role={q.role[locale]} company={q.company} />
          ))}
        </div>
        <div className="mt-5 flex flex-col gap-2 rounded-xl border border-line bg-white px-6 py-5 sm:flex-row sm:items-center sm:gap-5">
          <span className="flex gap-0.5" role="img" aria-label="5/5">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} aria-hidden className="h-4 w-4 fill-peach text-peach" />
            ))}
          </span>
          <p className="text-[15px] text-ink">« {tq('review')} »</p>
          <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-ink-3 sm:ml-auto">{tq('reviewLabel')}</span>
        </div>
      </Container>
    </Section>
  );
}
