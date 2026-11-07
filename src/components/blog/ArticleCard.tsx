import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { ArrowUpRight } from 'lucide-react';
import { BrandMark } from '@/components/ds';
import type { Article } from '@/types/blog';

interface ArticleCardProps {
  article: Article;
  locale: string;
  variant?: 'grid' | 'featured' | 'horizontal';
}

function ArticleImage({
  article,
  sizes,
  priority = false,
}: {
  article: Article;
  sizes: string;
  priority?: boolean;
}) {
  const heroImage = article.images.find((img) => img.id === 'hero');

  if (heroImage) {
    return (
      <Image
        src={`/images/blog/${article.slug}/${heroImage.filename}`}
        alt={heroImage.alt || article.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        sizes={sizes}
        priority={priority}
      />
    );
  }

  // Sans image : fond menthe et motif du logo (charte, pas de dégradé).
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-mint">
      <BrandMark className="h-1/2 w-auto text-accent/25" />
    </div>
  );
}

function formatDate(dateStr: string, locale: string, format: 'short' | 'long' = 'short') {
  return new Date(dateStr).toLocaleDateString(
    locale === 'fr' ? 'fr-FR' : 'en-US',
    format === 'long'
      ? { day: 'numeric', month: 'long', year: 'numeric' }
      : { day: 'numeric', month: 'short', year: 'numeric' }
  );
}

/** Ligne méta : silo en étiquette mono accent, date en texte discret. */
function Meta({ article, locale, format }: { article: Article; locale: string; format?: 'short' | 'long' }) {
  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.06em]">
      <span className="text-accent">{article.siloNom}</span>
      <span aria-hidden className="h-1 w-1 rounded-full bg-line" />
      <time dateTime={article.datePublication} className="text-ink-3">
        {formatDate(article.datePublication, locale, format)}
      </time>
    </p>
  );
}

export function ArticleCard({ article, locale, variant = 'grid' }: ArticleCardProps) {
  const href = `/blog/${article.siloSlug}/${article.slug}` as const;

  if (variant === 'featured') {
    return (
      <Link
        href={href}
        className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white transition-colors duration-150 hover:border-accent"
      >
        <div className="relative aspect-[16/9] overflow-hidden border-b border-line bg-paper">
          <ArticleImage article={article} sizes="(max-width: 1024px) 100vw, 600px" priority />
        </div>
        <div className="flex flex-1 flex-col p-6 md:p-8">
          <Meta article={article} locale={locale} format="long" />
          <h3 className="mt-4 text-balance text-[1.5rem] font-medium leading-[1.2] tracking-[-0.015em] text-ink md:text-[1.75rem]">
            {article.title}
          </h3>
          <p className="mt-3 line-clamp-3 text-[16px] leading-relaxed text-ink-2">{article.metaDescription}</p>
          <ArrowUpRight
            aria-hidden
            className="mt-6 h-5 w-5 text-accent transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </div>
      </Link>
    );
  }

  if (variant === 'horizontal') {
    return (
      <Link href={href} className="group flex gap-4 border-b border-line py-5 first:pt-0 last:border-0 last:pb-0 sm:gap-5">
        <div className="relative aspect-[4/3] w-[104px] shrink-0 overflow-hidden rounded-lg border border-line bg-paper sm:w-[156px]">
          <ArticleImage article={article} sizes="156px" />
        </div>
        <div className="flex min-w-0 flex-col justify-center">
          <Meta article={article} locale={locale} />
          <h3 className="mt-2 line-clamp-2 text-[16px] font-medium leading-snug text-ink transition-colors duration-150 group-hover:text-accent sm:text-[17px]">
            {article.title}
          </h3>
          <p className="mt-1.5 hidden text-[14px] leading-relaxed text-ink-3 sm:line-clamp-2">{article.metaDescription}</p>
        </div>
      </Link>
    );
  }

  // Grid variant (default)
  return (
    <Link
      href={href}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white transition-colors duration-150 hover:border-accent"
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-paper">
        <ArticleImage article={article} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <Meta article={article} locale={locale} />
        <h3 className="mt-3 line-clamp-3 text-lg font-medium leading-snug tracking-[-0.01em] text-ink">{article.title}</h3>
        <p className="mt-2 line-clamp-2 flex-1 text-[15px] leading-relaxed text-ink-2">{article.metaDescription}</p>
        <ArrowUpRight
          aria-hidden
          className="mt-5 h-4 w-4 text-accent transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </div>
    </Link>
  );
}
