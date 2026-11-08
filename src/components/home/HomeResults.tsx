import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Container, Section, SectionHeader, TestimonialCard } from '@/components/ds';
import { homeTestimonials } from '@/data/clients';
import { clientResults } from '@/data/client-results';
import { Link } from '@/i18n/navigation';

interface ResultItem {
  client: string;
  tag: string;
  title: string;
  text: string;
  href: string;
  cta: string;
}

/** Résultats clients : photo de l'hôtel, chiffre clé, citation ; puis les autres témoignages. */
export function HomeResults() {
  const t = useTranslations('home2.results');
  const locale = useLocale() as 'fr' | 'en';
  const items = t.raw('items') as ResultItem[];
  // Les clients déjà présents dans les cartes de résultats ne sont pas cités deux fois.
  const quotes = homeTestimonials.filter((q) => !items.some((item) => item.client === q.company));
  return (
    <Section tone="paper">
      <Container>
        <SectionHeader eyebrow={t('eyebrow')} title={t('title')} align="left" />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {items.map((item) => {
            const result = clientResults.find((r) => r.client === item.client);
            return (
              <Link
                key={item.client}
                href={item.href}
                className="group flex flex-col overflow-hidden rounded-xl border border-line bg-white transition-colors hover:border-accent"
              >
                {result && (
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <Image
                      src={result.photo}
                      alt={item.client}
                      width={1200}
                      height={800}
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.06em] text-ink">
                      {item.tag}
                    </span>
                  </div>
                )}
                <div className="flex flex-1 flex-col p-7">
                  <span className="text-[15px] font-semibold text-ink">{item.client}</span>
                  {result && (
                    <p className="mt-5 border-b border-line pb-5">
                      <span className="block text-[2.25rem] font-medium leading-none tracking-[-0.02em] text-accent">{result.metric.value[locale]}</span>
                      <span className="mt-2 block text-[14px] text-ink-2">{result.metric.label[locale]}</span>
                    </p>
                  )}
                  <h3 className="mt-5 text-[19px] font-medium leading-snug text-ink">{item.title}</h3>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink-2">{item.text}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-medium text-accent">
                    {item.cta}
                    <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Les autres témoignages */}
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {quotes.map((q) => (
            <TestimonialCard key={q.name} quote={q.quote[locale]} name={q.name} role={q.role[locale]} company={q.company} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
