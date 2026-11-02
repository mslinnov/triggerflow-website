import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ArrowDown, LogIn } from 'lucide-react';
import { AllYearBlock } from '@/components/calendrier/AllYearBlock';
import { BackToTop } from '@/components/calendrier/BackToTop';
import { CalendarStatsTracker } from '@/components/calendrier/CalendarStatsTracker';
import { MonthChips } from '@/components/calendrier/MonthChips';
import { MonthSection } from '@/components/calendrier/MonthSection';
import { BreadcrumbListJsonLd } from '@/components/seo';
import { ButtonLink, Container } from '@/components/ui';
import { brand } from '@/data/brand';
import { CALENDAR, CAMPAIGNS, calendarDemoUrl, monthYear, TEMPS_FORTS, upcomingCampaigns } from '@/data/calendrier-marketing';
import { toPlainText } from '@/lib/calendrier';
import { getPricingPhase } from '@/data/pricing';
import { pageAlternates } from '@/lib/seo';

const PATH = '/calendrier-marketing';
const PAGE_URL = `${brand.url}/fr${PATH}`;
const LOGIN_URL = 'https://app.trigger-flow.com/login';

interface PageProps {
  params: Promise<{ locale: string }>;
}

// Français seulement (décision 15) : /en/calendrier-marketing redirige vers /fr (next.config.ts).
export function generateStaticParams() {
  return [{ locale: 'fr' }];
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'calendrierMarketing.meta' });

  return {
    title: { absolute: t('title') },
    description: t('description'),
    alternates: pageAlternates(locale, PATH, ['fr']),
    openGraph: {
      type: 'article',
      locale: 'fr_FR',
      url: PAGE_URL,
      title: t('title'),
      description: t('description'),
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: t('title') }],
    },
  };
}

export default async function CalendrierMarketingPage({ params }: PageProps) {
  const { locale } = await params;
  if (locale !== 'fr') notFound();
  setRequestLocale(locale);

  const t = await getTranslations('calendrierMarketing');
  // En-tête fixe du site : plus haut pendant l'annonce des tarifs (bandeau), cf. (main)/layout.tsx.
  const announcing = getPricingPhase() === 'announce';
  // Barre des mois : 65 px (puces de 44 px). Ancres sous l'en-tête et la barre ; colonne
  // des dates clés collante juste dessous (desktop).
  const stickyTopClass = announcing ? 'top-[100px] md:top-[116px]' : 'top-16 md:top-20';
  const scrollMarginClass = announcing ? 'scroll-mt-[180px] md:scroll-mt-[196px]' : 'scroll-mt-[144px] md:scroll-mt-[160px]';
  const stickyColumnClass = announcing ? 'lg:top-[208px]' : 'lg:top-[172px]';

  // Arrivée par le QR : les deux prochains temps forts dont l'envoi n'est pas passé, à la
  // date du jour (page régénérée toutes les heures, cf. (main)/layout.tsx).
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Paris' }).format(new Date());
  const upcoming = upcomingCampaigns(today);

  const years = [...new Set(CALENDAR.map(monthYear))].map((year) => ({
    year,
    months: CALENDAR.filter((m) => monthYear(m) === year).map(({ id, chip, title }) => ({ id, chip, title })),
  }));
  const yearLabels = Object.fromEntries(years.map(({ year }) => [year, t('nav.years', { year })]));

  const webPage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: t('meta.title'),
    description: t('meta.description'),
    url: PAGE_URL,
    inLanguage: 'fr-FR',
    isPartOf: { '@type': 'WebSite', name: brand.name, url: brand.url },
    publisher: { '@type': 'Organization', name: brand.name, url: brand.url },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: CAMPAIGNS.filter((c, i, all) => all.findIndex((x) => x.code === c.code) === i).map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: TEMPS_FORTS[c.code].title,
        url: `${PAGE_URL}/${TEMPS_FORTS[c.code].slug}`,
      })),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }} />
      <BreadcrumbListJsonLd
        items={[
          { name: t('meta.breadcrumbHome'), url: `${brand.url}/fr` },
          { name: t('meta.breadcrumbPage'), url: PAGE_URL },
        ]}
      />

      <section className="relative overflow-hidden bg-surface-dark text-text-on-dark">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-primary/40 blur-3xl"
        />
        <Container className="relative py-8 md:py-20">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-brand-light">
            <span className="h-2 w-2 rounded-full bg-brand-accent" aria-hidden="true" />
            {t('hero.eyebrow')}
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-3xl font-bold leading-tight tracking-tight sm:text-5xl md:mt-6">
            {t('hero.title')}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg md:mt-6">{t('hero.subtitle')}</p>

          <div className="mt-6 grid gap-3 md:mt-8 md:grid-cols-2 md:gap-4">
            <div className="rounded-2xl bg-brand-accent p-4 text-brand-dark md:p-5">
              <p className="text-sm font-semibold uppercase tracking-wider">{t('hero.goldenRuleTitle')}</p>
              <p className="mt-1 text-base font-semibold md:text-lg">{t('hero.goldenRule')}</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4 text-sm md:p-5">
              <p className="font-semibold uppercase tracking-wider text-brand-light">{t('hero.legendTitle')}</p>
              <p className="mt-2 flex flex-wrap items-center gap-2">
                <mark className="rounded bg-brand-accent-light px-1 text-brand-dark ring-1 ring-brand-accent">{t('hero.legendExample')}</mark>
                <span className="text-white/80">{t('hero.legendField')}</span>
              </p>
              <p className="mt-2 flex flex-wrap items-center gap-2">
                <span className="rounded bg-brand-light px-1 font-medium text-brand-primary">{t('variables.firstname')}</span>
                <span className="text-white/80">{t('hero.legendVariable')}</span>
              </p>
            </div>
          </div>
        </Container>
      </section>

      {upcoming.length > 0 && (
        <section aria-labelledby="a-preparer" className="border-b border-border-light bg-brand-accent-light">
          <Container className="flex flex-col gap-3 py-4 md:flex-row md:items-center md:gap-6">
            <h2 id="a-preparer" className="shrink-0 text-xs font-semibold uppercase tracking-wider text-brand-dark">
              {t('now.title')}
            </h2>
            <ul className="flex flex-col gap-2 md:flex-row md:gap-6">
              {upcoming.map((c) => (
                <li key={c.id}>
                  <a
                    href={`#${c.id}`}
                    className="group inline-flex min-h-11 items-center gap-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
                  >
                    <ArrowDown className="h-4 w-4 shrink-0 text-brand-primary" aria-hidden="true" />
                    <span>
                      <span className="font-semibold group-hover:underline">{TEMPS_FORTS[c.code].title}</span>
                      <span className="text-text-secondary"> · {toPlainText(c.send)}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <MonthChips years={years} label={t('nav.label')} yearLabels={yearLabels} stickyTopClass={stickyTopClass} />

      {CALENDAR.map((month, i) => (
        <MonthSection
          key={month.id}
          month={month}
          scrollMarginClass={scrollMarginClass}
          stickyColumnClass={stickyColumnClass}
          muted={i % 2 === 1}
        />
      ))}

      <AllYearBlock demoUrl={calendarDemoUrl('toute-l-annee')} />

      <section className="bg-surface-dark py-16 text-text-on-dark md:py-24">
        <Container className="text-center">
          <h2 className="font-serif text-3xl font-bold tracking-tight md:text-4xl">{t('finalCta.title')}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">{t('finalCta.subtitle')}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href={calendarDemoUrl('page')} target="_blank" rel="noopener noreferrer" variant="accent" size="lg">
              {t('finalCta.demo')}
            </ButtonLink>
            <a
              href={LOGIN_URL}
              data-calendar-stat="client_click"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-8 py-4 text-lg font-medium text-white transition-colors hover:bg-white/10"
            >
              <LogIn className="h-5 w-5" aria-hidden="true" />
              {t('finalCta.login')}
            </a>
          </div>
        </Container>
      </section>
      <BackToTop label={t('backToTop')} />
      <CalendarStatsTracker />
    </>
  );
}
