import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { getArticlesBySilo, getSilos } from '@/lib/blog';
import { getSiloBySlug, siloName, siloDescription } from '@/data/silos';
import { Container, CtaBand } from '@/components/ds';
import { SiloNav, ArticleList, BlogBreadcrumb } from '@/components/blog';
import { BreadcrumbListJsonLd } from '@/components/seo';
import { pageAlternates } from '@/lib/seo';
import { brand } from '@/data/brand';

interface Props {
  params: Promise<{ locale: string; silo: string }>;
}

export async function generateStaticParams() {
  const silos = getSilos();
  const locales = ['fr', 'en'];

  return silos.flatMap((silo) =>
    locales.map((locale) => ({
      locale,
      silo: silo.slug,
    }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, silo: siloSlug } = await params;
  const silo = getSiloBySlug(siloSlug);
  if (!silo) return {};

  const t = await getTranslations({ locale, namespace: 'blog' });

  return {
    title: t('silo.metaTitle', { siloName: siloName(silo, locale) }),
    description: t('silo.metaDescription', { siloName: siloName(silo, locale) }),
    alternates: pageAlternates(locale, `/blog/${silo.slug}`),
  };
}

export default async function SiloListingPage({ params }: Props) {
  const { locale, silo: siloSlug } = await params;
  setRequestLocale(locale);

  const silo = getSiloBySlug(siloSlug);
  if (!silo) notFound();

  const t = await getTranslations({ locale, namespace: 'blog' });
  const nav = await getTranslations({ locale, namespace: 'nav' });
  const allArticles = getArticlesBySilo(siloSlug, locale);

  const baseUrl = brand.url;
  const breadcrumbItems = [
    { name: t('breadcrumb.blog'), url: `${baseUrl}/${locale}/blog` },
    { name: siloName(silo, locale), url: `${baseUrl}/${locale}/blog/${silo.slug}` },
  ];

  return (
    <>
      <BreadcrumbListJsonLd items={breadcrumbItems} />
      {/* Header */}
      <section className="border-b border-line bg-white pb-14 pt-10 md:pb-20 md:pt-14">
        <Container>
          <BlogBreadcrumb blogLabel={t('breadcrumb.blog')} silo={{ nom: siloName(silo, locale), slug: silo.slug }} />
          <div className="mt-10 max-w-3xl md:mt-14">
            <h1 className="text-balance text-[2.25rem] font-medium leading-[1.08] tracking-[-0.025em] text-ink md:text-[3.25rem]">
              {siloName(silo, locale)}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2 md:text-lead">{siloDescription(silo, locale)}</p>
          </div>
        </Container>
      </section>

      {/* Silo navigation + articles */}
      <section className="bg-paper pb-20 pt-12 md:pb-28 md:pt-16">
        <Container>
          <SiloNav activeSilo={siloSlug} allLabel={t('listing.allSilos')} locale={locale} />
          <div className="mt-10">
            <ArticleList articles={allArticles} locale={locale} emptyMessage={t('listing.noArticles')} />
          </div>
        </Container>
      </section>

      <CtaBand
        title={t('article.ctaTitle')}
        primary={{ label: t('article.ctaButton'), href: brand.demoUrl }}
        secondary={{ label: nav('seeProduct'), href: '/produit' }}
      />
    </>
  );
}
