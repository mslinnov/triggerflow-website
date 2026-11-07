import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Container, Section, SectionHeader } from '@/components/ds';
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
  const items = t.raw('items') as ResultItem[];
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
      </Container>
    </Section>
  );
}
