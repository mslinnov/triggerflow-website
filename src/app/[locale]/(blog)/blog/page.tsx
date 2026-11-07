import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { getAllArticles } from '@/lib/blog';
import { Container, CtaBand, Eyebrow, Section } from '@/components/ds';
import { brand } from '@/data/brand';
import { ArticleCard, SiloNav, ArticleList } from '@/components/blog';
import { pageAlternates } from '@/lib/seo';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });

  return {
    title: t('meta.title'),
    alternates: pageAlternates(locale, '/blog'),
    description: t('meta.description'),
  };
}

export default async function BlogListingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'blog' });
  const nav = await getTranslations({ locale, namespace: 'nav' });
  const articles = getAllArticles(locale);

  // Recent: first article featured, next 3 horizontal
  const recentFeatured = articles[0] ?? null;
  const recentSide = articles.slice(1, 4);

  // All posts grid — show the rest when there are enough, otherwise all
  const gridArticles = articles.length > 4 ? articles.slice(4) : articles;

  return (
    <>
      {/* Hero */}
      <section className="border-b border-line bg-white pb-14 pt-14 md:pb-20 md:pt-20">
        <Container className="text-center">
          <Eyebrow>{t('breadcrumb.blog')}</Eyebrow>
          <h1 className="mx-auto mt-5 max-w-3xl text-balance text-[2.25rem] font-medium leading-[1.08] tracking-[-0.025em] text-ink md:text-[3.5rem]">
            {t('hero.title')}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-2 md:text-lead">{t('hero.subtitle')}</p>
        </Container>
      </section>

      {/* Recent blog posts */}
      {recentFeatured && (
        <section className="bg-white py-16 md:py-24">
          <Container>
            <h2 className="font-mono text-eyebrow font-medium uppercase text-ink-3">
              {t('listing.recentPosts', { defaultValue: 'Articles r\u00e9cents' })}
            </h2>
            <div className="mt-8 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
              <ArticleCard article={recentFeatured} locale={locale} variant="featured" />
              <div className="flex flex-col">
                {recentSide.map((article) => (
                  <ArticleCard
                    key={`${article.siloSlug}-${article.slug}`}
                    article={article}
                    locale={locale}
                    variant="horizontal"
                  />
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* All blog posts */}
      <Section tone="paper">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <h2 className="font-mono text-eyebrow font-medium uppercase text-ink-3">
              {t('listing.allPosts', { defaultValue: 'Tous les articles' })}
            </h2>
            <SiloNav allLabel={t('listing.allSilos')} locale={locale} />
          </div>
          <div className="mt-10">
            <ArticleList articles={gridArticles} locale={locale} emptyMessage={t('listing.noArticles')} />
          </div>
        </Container>
      </Section>

      <CtaBand
        title={t('article.ctaTitle')}
        primary={{ label: t('article.ctaButton'), href: brand.demoUrl }}
        secondary={{ label: nav('seeProduct'), href: '/produit' }}
      />
    </>
  );
}
