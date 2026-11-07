import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { Check, ExternalLink } from 'lucide-react';
import { Container, Eyebrow, LogoWall, TestimonialCard, TrustStrip } from '@/components/ds';
import { brand } from '@/data/brand';
import { clientLogos, homeClients, homeTestimonials } from '@/data/clients';
import { pageAlternates } from '@/lib/seo';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'demoPage' });
  return {
    title: { absolute: t('meta.title') },
    description: t('meta.description'),
    alternates: pageAlternates(locale, '/demo'),
  };
}

/** Page de prise de rendez-vous : ce qui attend l'hôtelier, le calendrier lemcal intégré, des preuves à côté. */
export default async function DemoPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'demoPage' });
  const points = t.raw('points') as string[];
  const quote = homeTestimonials[0];
  const lang = locale === 'en' ? 'en' : 'fr';

  return (
    <>
      <section className="bg-white pb-16 pt-14 md:pb-24 md:pt-20">
        <Container className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <Eyebrow>{t('eyebrow')}</Eyebrow>
            <h1 className="mt-5 text-balance text-[2.25rem] font-medium leading-[1.08] tracking-[-0.025em] text-ink md:text-[3rem]">{t('title')}</h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-2">{t('subtitle')}</p>
            <ul className="mt-8 space-y-3">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-[15.5px] leading-relaxed text-ink">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-mint text-accent-hover">
                    <Check aria-hidden className="h-3.5 w-3.5" strokeWidth={2.25} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
            <TestimonialCard
              className="mt-10 h-auto"
              quote={quote.quote[lang]}
              name={quote.name}
              role={quote.role[lang]}
              company={quote.company}
            />
          </div>

          <div>
            <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-product">
              <iframe
                src={brand.demoUrl}
                title={t('calendarTitle')}
                loading="lazy"
                className="block h-[820px] w-full"
              />
            </div>
            <a
              href={brand.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-[14px] font-medium text-accent hover:text-accent-hover"
            >
              {t('openCalendar')}
              <ExternalLink aria-hidden className="h-3.5 w-3.5" />
            </a>
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-paper py-14 md:py-20">
        <Container>
          <p className="text-center font-mono text-eyebrow font-medium uppercase text-ink-3">{t('logosTitle')}</p>
          <LogoWall names={homeClients} logos={clientLogos} className="mt-8" />
          <TrustStrip className="mt-10" />
        </Container>
      </section>
    </>
  );
}
