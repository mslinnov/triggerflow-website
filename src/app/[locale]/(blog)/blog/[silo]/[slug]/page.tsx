import { notFound } from 'next/navigation';
import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Calendar, Clock, Share2, Linkedin, Twitter } from 'lucide-react';

import { getAllArticles, getArticleBySlug, getArticleByTranslationKey, generateTableOfContents, extractFaqItems } from '@/lib/blog';
import { Container } from '@/components/ui/Container';
import { BlogBreadcrumb, TableOfContents } from '@/components/blog';
import { BlogPostingJsonLd, BreadcrumbListJsonLd, FaqJsonLd } from '@/components/seo';
import { ImageBlock } from '@/components/mdx/ImageBlock';
import { Callout } from '@/components/mdx/Callout';
import { InternalLink } from '@/components/mdx/InternalLink';
import { NewsletterInline } from '@/components/mdx/NewsletterInline';
import { KeyFigure } from '@/components/mdx/KeyFigure';
import { KeyFiguresGrid, KeyFigureCard } from '@/components/mdx/KeyFiguresGrid';
import { Stat } from '@/components/mdx/Stat';

const BASE_URL = 'https://www.trigger-flow.com';

interface PageProps {
  params: Promise<{ locale: string; silo: string; slug: string }>;
}

export async function generateStaticParams() {
  const frArticles = getAllArticles('fr');
  const enArticles = getAllArticles('en');
  const articles = [...frArticles, ...enArticles];

  return articles.map((article) => ({
    locale: article.locale,
    silo: article.siloSlug,
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, silo, slug } = await params;
  const article = getArticleBySlug(silo, slug, locale);

  if (!article) return {};

  const url = `${BASE_URL}/${locale}/blog/${silo}/${slug}`;
  const heroImage = article.images.find((img) => img.id === 'hero');
  const ogImage = heroImage
    ? `/images/blog/${slug}/${heroImage.filename}`
    : '/og-image.jpg';

  return {
    title: article.title,
    description: article.metaDescription,
    keywords: [article.motClePrincipal, ...article.motsClesSecondaires],
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.metaDescription,
      url,
      publishedTime: article.datePublication,
      modifiedTime: article.dateMiseAJour,
      images: [{ url: ogImage, width: 1200, height: 630, alt: article.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.metaDescription,
      images: [ogImage],
    },
    alternates: (() => {
      const alternateLocale = locale === 'fr' ? 'en' : 'fr';
      const languages: Record<string, string> = {
        [locale]: url,
      };

      if (article.translationKey) {
        const translatedArticle = getArticleByTranslationKey(article.translationKey, alternateLocale);
        if (translatedArticle) {
          const altUrl = `${BASE_URL}/${alternateLocale}/blog/${translatedArticle.siloSlug}/${translatedArticle.slug}`;
          languages[alternateLocale] = altUrl;
        }
      }

      // x-default points to the FR version when available, else the current URL.
      languages['x-default'] = languages.fr ?? url;

      return { canonical: url, languages };
    })(),
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { locale, silo, slug } = await params;
  setRequestLocale(locale);

  const article = getArticleBySlug(silo, slug, locale);
  if (!article) notFound();

  const t = await getTranslations({ locale, namespace: 'blog.article' });
  const tBlog = await getTranslations({ locale, namespace: 'blog' });

  const mdxComponents = {
    ImageBlock: (props: { id: string }) => (
      <ImageBlock id={props.id} images={article.images} slug={article.slug} />
    ),
    Callout,
    InternalLink,
    NewsletterInline,
    KeyFigure,
    KeyFiguresGrid,
    KeyFigureCard: (props: { value?: string; label: string; statId?: string }) => (
      <KeyFigureCard {...props} locale={locale} />
    ),
    Stat: (props: { id: string }) => <Stat id={props.id} locale={locale} />,
  };

  const formattedDate = new Date(article.datePublication).toLocaleDateString(
    locale === 'fr' ? 'fr-FR' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  const toc = generateTableOfContents(article.content);
  const h2Count = toc.filter((i) => i.level === 2).length;
  const showToc = article.longueurMots > 1500 && h2Count >= 2;

  const heroImage = article.images.find((img) => img.id === 'hero');
  const articleUrl = `${BASE_URL}/${locale}/blog/${article.siloSlug}/${article.slug}`;

  const breadcrumbItems = [
    { name: tBlog('breadcrumb.blog'), url: `${BASE_URL}/${locale}/blog` },
    { name: article.siloNom, url: `${BASE_URL}/${locale}/blog/${article.siloSlug}` },
    { name: article.title, url: articleUrl },
  ];

  return (
    <>
      <BlogPostingJsonLd article={article} locale={locale} />
      <BreadcrumbListJsonLd items={breadcrumbItems} />
      <FaqJsonLd items={extractFaqItems(article.content)} />

      <article>
        {/* Article header */}
        <header className="border-b border-gray-100 pb-0">
          <Container>
            {/* Breadcrumb */}
            <div className="pt-8 pb-6">
              <BlogBreadcrumb
                blogLabel={tBlog('breadcrumb.blog')}
                silo={{ nom: article.siloNom, slug: article.siloSlug }}
                articleTitle={article.title}
              />
            </div>

            {/* Title */}
            <div className="mx-auto max-w-3xl">
              <h1 className="font-serif text-3xl font-bold leading-tight tracking-tight text-brand-dark md:text-[2.75rem] md:leading-[1.15]">
                {article.title}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-gray-500">
                {article.metaDescription}
              </p>
            </div>

            {/* Author & meta bar */}
            <div className="mx-auto mt-8 flex max-w-3xl items-center justify-between border-t border-gray-100 py-5">
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-xs text-gray-400">{t('writtenBy', { defaultValue: 'Par' })}</p>
                  <p className="text-sm font-medium text-brand-dark">TriggerFlow</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">{t('publishedOn', { defaultValue: 'Publi\u00e9 le' })}</p>
                  <p className="text-sm font-medium text-brand-dark">{formattedDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(articleUrl)}&text=${encodeURIComponent(article.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-400 transition-colors hover:border-brand-primary hover:text-brand-primary"
                  aria-label="Share on Twitter"
                >
                  <Twitter className="h-4 w-4" />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-400 transition-colors hover:border-brand-primary hover:text-brand-primary"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </div>
            </div>
          </Container>

          {/* Hero image — full width within container */}
          {heroImage && (
            <Container>
              <div className="relative aspect-[21/9] overflow-hidden bg-gray-100">
                <Image
                  src={`/images/blog/${article.slug}/${heroImage.filename}`}
                  alt={heroImage.alt || article.title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                />
              </div>
            </Container>
          )}

          {/* Gradient placeholder when no hero image */}
          {!heroImage && (
            <Container>
              <div className="relative aspect-[21/9] overflow-hidden bg-gradient-to-br from-brand-primary via-brand-primary/80 to-brand-dark" />
            </Container>
          )}
        </header>

        {/* Article body */}
        <div className="py-12 md:py-16">
          <Container>
            {/* Mobile TOC */}
            {showToc && (
              <div className="mx-auto max-w-3xl lg:hidden">
                <TableOfContents
                  items={toc}
                  title={tBlog('toc.title')}
                  showLabel={tBlog('toc.show')}
                  hideLabel={tBlog('toc.hide')}
                />
              </div>
            )}

            {/* Content grid: TOC LEFT + content RIGHT */}
            <div className={showToc
              ? 'mx-auto max-w-5xl lg:grid lg:grid-cols-[200px_1fr] lg:gap-16'
              : 'mx-auto max-w-3xl'
            }>
              {/* Desktop TOC — LEFT sidebar */}
              {showToc && (
                <TableOfContents
                  items={toc}
                  title={tBlog('toc.title')}
                  showLabel={tBlog('toc.show')}
                  hideLabel={tBlog('toc.hide')}
                />
              )}

              <div>
                {/* MDX content */}
                <div className="prose max-w-none
                  prose-headings:font-serif prose-headings:tracking-tight prose-headings:text-brand-dark
                  prose-h1:text-2xl prose-h1:mt-10 prose-h1:mb-3
                  prose-h2:text-[1.5rem] prose-h2:mt-10 prose-h2:mb-3 prose-h2:border-b prose-h2:border-gray-100 prose-h2:pb-3
                  prose-h3:text-lg prose-h3:mt-7 prose-h3:mb-2
                  prose-h4:text-base prose-h4:mt-5 prose-h4:mb-2 prose-h4:font-bold
                  prose-p:text-gray-600 prose-p:leading-[1.6] prose-p:mt-1.5 prose-p:mb-1.5
                  prose-a:text-brand-primary prose-a:no-underline prose-a:font-medium hover:prose-a:underline
                  prose-strong:text-brand-dark prose-strong:font-semibold
                  prose-ul:my-3 prose-ul:pl-5 prose-ul:space-y-1
                  prose-ol:my-3 prose-ol:pl-5 prose-ol:space-y-1
                  prose-li:text-gray-600 prose-li:leading-[1.65] prose-li:pl-1
                  prose-img:rounded-sm
                  prose-blockquote:border-l-2 prose-blockquote:border-brand-primary prose-blockquote:bg-brand-light/20 prose-blockquote:py-3 prose-blockquote:px-5 prose-blockquote:my-5 prose-blockquote:rounded-r-sm prose-blockquote:not-italic prose-blockquote:text-brand-dark prose-blockquote:font-serif prose-blockquote:text-lg prose-blockquote:leading-relaxed
                  prose-table:text-sm prose-th:bg-brand-light/30 prose-th:px-4 prose-th:py-2.5
                  prose-td:px-4 prose-td:py-2.5 prose-td:border-b prose-td:border-gray-100
                  prose-hr:border-gray-100 prose-hr:my-8
                  [&>h2+p]:mt-0 [&>h3+p]:mt-0
                ">
                  <MDXRemote
                    source={article.content}
                    components={mdxComponents}
                    options={{ mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] } }}
                  />
                </div>

                {/* CTA footer */}
                {article.ctaPrincipal !== 'newsletter' && (
                  <div className="mt-16 border-t border-gray-100 pt-12">
                    <div className="rounded-none bg-brand-dark px-8 py-10 text-center md:px-12">
                      <p className="font-serif text-xl font-bold text-white md:text-2xl">
                        {t('ctaTitle')}
                      </p>
                      <a
                        href="https://app.lemcal.com/@trigger-flow/demo"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex rounded-none bg-white px-8 py-3 text-sm font-semibold text-brand-dark transition-colors hover:bg-brand-light"
                      >
                        {t('ctaButton')}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Container>
        </div>
      </article>
    </>
  );
}
