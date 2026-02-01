import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { getArticlesBySilo, getSilos } from '@/lib/blog';
import { getSiloBySlug } from '@/data/silos';
import { Container } from '@/components/ui/Container';
import { SiloNav, ArticleList, BlogBreadcrumb, Pagination } from '@/components/blog';
import { BreadcrumbListJsonLd } from '@/components/seo';

const ARTICLES_PER_PAGE = 9;

interface Props {
  params: Promise<{ locale: string; silo: string }>;
  searchParams: Promise<{ page?: string }>;
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
    title: t('silo.metaTitle', { siloName: silo.nom }),
    description: t('silo.metaDescription', { siloName: silo.nom }),
  };
}

export default async function SiloListingPage({ params, searchParams }: Props) {
  const { locale, silo: siloSlug } = await params;
  const { page } = await searchParams;
  setRequestLocale(locale);

  const silo = getSiloBySlug(siloSlug);
  if (!silo) notFound();

  const t = await getTranslations({ locale, namespace: 'blog' });
  const allArticles = getArticlesBySilo(siloSlug, locale);

  const currentPage = Math.max(1, parseInt(page || '1', 10) || 1);
  const totalPages = Math.max(1, Math.ceil(allArticles.length / ARTICLES_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);

  const start = (safePage - 1) * ARTICLES_PER_PAGE;
  const paginatedArticles = allArticles.slice(start, start + ARTICLES_PER_PAGE);

  const baseUrl = 'https://www.trigger-flow.com';
  const breadcrumbItems = [
    { name: t('breadcrumb.blog'), url: `${baseUrl}/${locale}/blog` },
    { name: silo.nom, url: `${baseUrl}/${locale}/blog/${silo.slug}` },
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
              silo={{ nom: silo.nom, slug: silo.slug }}
            />
            <h1 className="mt-6 font-serif text-3xl font-bold tracking-tight text-brand-dark md:text-4xl">
              {silo.nom}
            </h1>
            <p className="mt-3 max-w-2xl text-lg text-gray-500">
              {silo.description}
            </p>
          </Container>
        </section>

        {/* Silo navigation */}
        <section className="pt-10 pb-4">
          <Container>
            <div className="flex justify-center">
              <SiloNav activeSilo={siloSlug} allLabel={t('listing.allSilos')} />
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
              <>
                <ArticleList
                  articles={paginatedArticles}
                  locale={locale}
                  emptyMessage={t('listing.noArticles')}
                />

                <Pagination
                  currentPage={safePage}
                  totalPages={totalPages}
                  basePath={`/blog/${siloSlug}`}
                  labels={{
                    previous: t('listing.pagination.previous'),
                    next: t('listing.pagination.next'),
                    page: t('listing.pagination.page', { current: safePage, total: totalPages }),
                  }}
                />
              </>
            )}
          </Container>
        </section>
      </main>
    </>
  );
}
