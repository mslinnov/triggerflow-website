import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { getAllArticles } from '@/lib/blog';
import { Container } from '@/components/ui/Container';
import { ArticleCard, SiloNav, ArticleList, Pagination } from '@/components/blog';

const ARTICLES_PER_PAGE = 9;

interface Props {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });

  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

export default async function BlogListingPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { page } = await searchParams;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'blog' });
  const articles = getAllArticles(locale);

  // Recent: first article featured, next 3 horizontal
  const recentFeatured = articles[0] ?? null;
  const recentSide = articles.slice(1, 4);

  // All articles grid (paginated, skip the featured ones on page 1)
  const gridArticles = page ? articles : articles.slice(4);
  const currentPage = Math.max(1, parseInt(page || '1', 10) || 1);
  const totalPages = Math.max(1, Math.ceil(gridArticles.length / ARTICLES_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);

  const start = (safePage - 1) * ARTICLES_PER_PAGE;
  const paginatedArticles = gridArticles.slice(start, start + ARTICLES_PER_PAGE);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="border-b border-gray-100 py-16 md:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="font-serif text-4xl font-bold tracking-tight text-brand-dark md:text-5xl">
              {t('hero.title')}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-gray-500">
              {t('hero.subtitle')}
            </p>
          </div>
        </Container>
      </section>

      {/* Recent blog posts */}
      {recentFeatured && !page && (
        <section className="py-12 md:py-16">
          <Container>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400">
              {t('listing.recentPosts', { defaultValue: 'Articles r\u00e9cents' })}
            </h2>
            <div className="mt-8 grid gap-8 lg:grid-cols-2">
              {/* Featured large card */}
              <ArticleCard
                article={recentFeatured}
                locale={locale}
                variant="featured"
              />

              {/* Side stack — horizontal cards */}
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

      {/* Silo navigation */}
      <section className="border-t border-gray-100 pt-10 pb-4">
        <Container>
          <div className="flex justify-center">
            <SiloNav allLabel={t('listing.allSilos')} />
          </div>
        </Container>
      </section>

      {/* All blog posts grid */}
      <section className="py-10 pb-16 md:pb-24">
        <Container>
          <h2 className="mb-8 text-sm font-semibold uppercase tracking-widest text-gray-400">
            {t('listing.allPosts', { defaultValue: 'Tous les articles' })}
          </h2>

          <ArticleList
            articles={paginatedArticles}
            locale={locale}
            emptyMessage={t('listing.noArticles')}
          />

          <Pagination
            currentPage={safePage}
            totalPages={totalPages}
            basePath="/blog"
            labels={{
              previous: t('listing.pagination.previous'),
              next: t('listing.pagination.next'),
              page: t('listing.pagination.page', { current: safePage, total: totalPages }),
            }}
          />
        </Container>
      </section>
    </main>
  );
}
