import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { getArticlesBySilo, getSilos } from '@/lib/blog';
import { getSiloBySlug, siloName, siloDescription } from '@/data/silos';
import { Container } from '@/components/ui/Container';
import { SiloNav, ArticleList, BlogBreadcrumb } from '@/components/blog';
import { BreadcrumbListJsonLd } from '@/components/seo';

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
  };
}

export default async function SiloListingPage({ params }: Props) {
  const { locale, silo: siloSlug } = await params;
  setRequestLocale(locale);

  const silo = getSiloBySlug(siloSlug);
  if (!silo) notFound();

  const t = await getTranslations({ locale, namespace: 'blog' });
  const allArticles = getArticlesBySilo(siloSlug, locale);

  const baseUrl = 'https://www.trigger-flow.com';
  const breadcrumbItems = [
    { name: t('breadcrumb.blog'), url: `${baseUrl}/${locale}/blog` },
    { name: siloName(silo, locale), url: `${baseUrl}/${locale}/blog/${silo.slug}` },
  ];

  return (
    <>
      <BreadcrumbListJsonLd items={breadcrumbItems} />
      <main className="min-h-screen bg-white">
        {/* Header */}
        <section className="border-b border-gray-100 py-12 md:py-16">
          <Container>
            <BlogBreadcrumb
              blogLabel={t('breadcrumb.blog')}
              silo={{ nom: siloName(silo, locale), slug: silo.slug }}
            />
            <h1 className="mt-6 font-serif text-3xl font-bold tracking-tight text-brand-dark md:text-4xl">
              {siloName(silo, locale)}
            </h1>
            <p className="mt-3 max-w-2xl text-lg text-gray-500">
              {siloDescription(silo, locale)}
            </p>
          </Container>
        </section>

        {/* Silo navigation */}
        <section className="pt-10 pb-4">
          <Container>
            <div className="flex justify-center">
              <SiloNav activeSilo={siloSlug} allLabel={t('listing.allSilos')} locale={locale} />
            </div>
          </Container>
        </section>

        {/* Articles grid */}
        <section className="py-10 pb-16 md:pb-24">
          <Container>
            {allArticles.length === 0 ? (
              <div className="border-t border-gray-200 py-20 text-center">
                <p className="text-gray-400 text-sm">{t('listing.noArticles')}</p>
              </div>
            ) : (
              <ArticleList
                articles={allArticles}
                locale={locale}
                emptyMessage={t('listing.noArticles')}
              />
            )}
          </Container>
        </section>
      </main>
    </>
  );
}
