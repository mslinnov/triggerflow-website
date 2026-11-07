import { notFound } from 'next/navigation';
import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Linkedin } from 'lucide-react';

import { getAllArticles, getArticleBySlug, getArticleByTranslationKey, generateTableOfContents, extractFaqItems } from '@/lib/blog';
import { Container, CtaBand, Eyebrow } from '@/components/ds';
import { BlogBreadcrumb, TableOfContents } from '@/components/blog';
import { BlogPostingJsonLd, BreadcrumbListJsonLd, FaqJsonLd } from '@/components/seo';
import { ImageBlock } from '@/components/mdx/ImageBlock';
import { Callout } from '@/components/mdx/Callout';
import { InternalLink } from '@/components/mdx/InternalLink';
import { normalizeInternalHref } from '@/lib/utils';
import { NewsletterInline } from '@/components/mdx/NewsletterInline';
import { KeyFigure } from '@/components/mdx/KeyFigure';
import { KeyFiguresGrid, KeyFigureCard } from '@/components/mdx/KeyFiguresGrid';
import { Stat } from '@/components/mdx/Stat';
import { getAuthor } from '@/data/authors';
import { brand } from '@/data/brand';

const BASE_URL = brand.url;

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
    // Les tableaux défilent dans leur cadre sur mobile au lieu d'élargir la page.
    table: (props: React.ComponentProps<'table'>) => (
      <div className="not-prose my-8 overflow-x-auto rounded-xl border border-line bg-white">
        <table
          {...props}
          className="w-full border-collapse text-left text-[15px] leading-snug [&_td]:border-t [&_td]:border-line [&_td]:px-4 [&_td]:py-3 [&_td]:align-top [&_td]:text-ink-2 [&_th]:bg-paper [&_th]:px-4 [&_th]:py-3 [&_th]:font-semibold [&_th]:text-ink [&_strong]:font-semibold [&_strong]:text-ink"
        />
      </div>
    ),
    a: ({ href = '', ...props }: React.ComponentProps<'a'>) => <a href={normalizeInternalHref(href, locale)} {...props} />,
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

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  const formattedDate = formatDate(article.datePublication);
  // Date de fraîcheur visible : les moteurs IA privilégient un contenu daté et à jour.
  const formattedUpdate =
    article.dateMiseAJour > article.datePublication ? formatDate(article.dateMiseAJour) : null;
  const author = getAuthor(article.auteur);

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
        <header className="bg-white">
          <Container>
            <div className="pb-10 pt-8 md:pb-14">
              <BlogBreadcrumb
                blogLabel={tBlog('breadcrumb.blog')}
                silo={{ nom: article.siloNom, slug: article.siloSlug }}
                articleTitle={article.title}
              />
            </div>

            <div className="mx-auto max-w-[800px] text-center">
              <Eyebrow>{article.siloNom}</Eyebrow>
              <h1 className="mt-5 text-balance text-[2rem] font-medium leading-[1.12] tracking-[-0.02em] text-ink md:text-[3rem] md:leading-[1.08]">
                {/* Espace insécable avant « : ; ? ! » : la ponctuation ne part pas seule à la ligne. */}
                {article.title.replace(/ ([:;?!])/g, ' $1')}
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-2 md:text-lead">{article.metaDescription}</p>
            </div>

            {/* Author & meta bar */}
            <div className="mx-auto mt-10 flex max-w-[800px] flex-wrap items-center justify-between gap-x-8 gap-y-5 border-y border-line py-5">
              <dl className="flex flex-wrap gap-x-8 gap-y-4">
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.06em] text-ink-3">{t('writtenBy', { defaultValue: 'Par' })}</dt>
                  <dd className="mt-1 text-[15px] font-medium text-ink">
                    {author.linkedin ? (
                      <a href={author.linkedin} target="_blank" rel="noopener noreferrer author" className="transition-colors hover:text-accent">
                        {author.name}
                      </a>
                    ) : (
                      author.name
                    )}
                  </dd>
                  <dd className="text-[13px] text-ink-3">{locale === 'fr' ? author.role.fr : author.role.en}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.06em] text-ink-3">{t('publishedOn', { defaultValue: 'Publié le' })}</dt>
                  <dd className="mt-1 text-[15px] font-medium text-ink">
                    <time dateTime={article.datePublication}>{formattedDate}</time>
                  </dd>
                  <dd className="text-[13px] text-ink-3">
                    {article.tempsLecture} {t('minRead')}
                  </dd>
                </div>
                {formattedUpdate && (
                  <div>
                    <dt className="font-mono text-[11px] uppercase tracking-[0.06em] text-ink-3">{t('updatedOn')}</dt>
                    <dd className="mt-1 text-[15px] font-medium text-ink">
                      <time dateTime={article.dateMiseAJour}>{formattedUpdate}</time>
                    </dd>
                  </div>
                )}
              </dl>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-line text-ink-2 transition-colors duration-150 hover:border-accent hover:text-accent"
                aria-label="Share on LinkedIn"
              >
                <Linkedin aria-hidden strokeWidth={1.75} className="h-4 w-4" />
              </a>
            </div>

            {heroImage && (
              <div className="relative mx-auto mt-10 aspect-[16/9] max-w-[1040px] overflow-hidden rounded-2xl border border-line bg-paper md:mt-14 md:aspect-[21/9]">
                <Image
                  src={`/images/blog/${article.slug}/${heroImage.filename}`}
                  alt={heroImage.alt || article.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1100px) 100vw, 1040px"
                  priority
                />
              </div>
            )}
          </Container>
        </header>

        {/* Article body */}
        <div className="bg-white pb-20 pt-12 md:pb-28 md:pt-16">
          <Container>
            {/* Content grid: TOC left + reading column. TableOfContents rend lui-même
                sa version mobile repliable (lg:hidden) et la colonne collante desktop. */}
            <div
              className={
                showToc
                  ? 'mx-auto max-w-[720px] lg:grid lg:max-w-none lg:grid-cols-[220px_minmax(0,720px)] lg:justify-center lg:gap-16'
                  : 'mx-auto max-w-[720px]'
              }
            >
              {showToc && (
                <TableOfContents
                  items={toc}
                  title={tBlog('toc.title')}
                  showLabel={tBlog('toc.show')}
                  hideLabel={tBlog('toc.hide')}
                />
              )}

              <div className="min-w-0">
                {/* MDX content : variables de @tailwindcss/typography calées sur la charte */}
                <div
                  className="prose max-w-none text-[17px] leading-[1.7]
                    [--tw-prose-body:var(--color-ink-2)] [--tw-prose-headings:var(--color-ink)] [--tw-prose-lead:var(--color-ink-2)]
                    [--tw-prose-links:var(--color-accent)] [--tw-prose-bold:var(--color-ink)] [--tw-prose-counters:var(--color-ink-3)]
                    [--tw-prose-bullets:var(--color-accent)] [--tw-prose-hr:var(--color-line)] [--tw-prose-quotes:var(--color-ink)]
                    [--tw-prose-quote-borders:var(--color-accent)] [--tw-prose-captions:var(--color-ink-3)] [--tw-prose-code:var(--color-ink)]
                    [--tw-prose-th-borders:var(--color-line)] [--tw-prose-td-borders:var(--color-line)]
                    prose-headings:scroll-mt-28 prose-headings:font-medium prose-headings:tracking-[-0.015em]
                    prose-h2:mb-4 prose-h2:mt-14 prose-h2:text-[1.625rem] prose-h2:leading-[1.2] md:prose-h2:text-[1.875rem]
                    prose-h3:mb-3 prose-h3:mt-10 prose-h3:text-[1.25rem] prose-h3:font-semibold prose-h3:leading-[1.3] prose-h3:tracking-[-0.01em]
                    prose-h4:mb-2 prose-h4:mt-8 prose-h4:text-[1.0625rem] prose-h4:font-semibold
                    prose-p:my-5
                    prose-a:font-medium prose-a:underline prose-a:decoration-accent/30 prose-a:underline-offset-4 hover:prose-a:decoration-accent
                    prose-strong:font-semibold
                    prose-ol:my-5 prose-ul:my-5 prose-li:my-1.5
                    prose-blockquote:my-8 prose-blockquote:border-l-2 prose-blockquote:pl-6 prose-blockquote:text-[1.1875rem] prose-blockquote:font-normal prose-blockquote:not-italic prose-blockquote:leading-relaxed
                    [&_blockquote_p]:before:content-none [&_blockquote_p]:after:content-none
                    prose-code:rounded prose-code:bg-paper prose-code:px-1.5 prose-code:py-0.5 prose-code:text-[0.9em] prose-code:font-normal prose-code:before:content-none prose-code:after:content-none
                    prose-img:rounded-xl prose-hr:my-12"
                >
                  <MDXRemote
                    source={article.content}
                    components={mdxComponents}
                    options={{ mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] } }}
                  />
                </div>
              </div>
            </div>
          </Container>
        </div>
      </article>

      {/* CTA de fin d'article */}
      {article.ctaPrincipal !== 'newsletter' && (
        <CtaBand title={t('ctaTitle')} primary={{ label: t('ctaButton'), href: brand.demoUrl }} />
      )}
    </>
  );
}
