import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
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
  className,
}: {
  article: Article;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const heroImage = article.images.find((img) => img.id === 'hero');

  if (heroImage) {
    return (
      <Image
        src={`/images/blog/${article.slug}/${heroImage.filename}`}
        alt={heroImage.alt || article.title}
        fill
        className={cn('object-cover transition-transform duration-500 group-hover:scale-[1.03]', className)}
        sizes={sizes}
        priority={priority}
      />
    );
  }

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-brand-primary via-brand-primary/80 to-brand-dark flex items-end p-6">
      <span className="text-white/90 font-serif text-lg leading-snug line-clamp-3">
        {article.title}
      </span>
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

function CategoryTags({ article }: { article: Article }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      <span className="inline-flex rounded-full border border-gray-200 px-2.5 py-0.5 text-xs font-medium text-gray-600">
        {article.siloNom}
      </span>
    </div>
  );
}

export function ArticleCard({ article, locale, variant = 'grid' }: ArticleCardProps) {
  const href = `/blog/${article.siloSlug}/${article.slug}` as const;

  if (variant === 'featured') {
    return (
      <Link href={href} className="group block">
        <div className="relative aspect-[4/3] overflow-hidden rounded-none bg-gray-100">
          <ArticleImage
            article={article}
            sizes="(max-width: 768px) 100vw, 55vw"
            priority
          />
        </div>
        <div className="mt-5">
          <p className="text-sm text-gray-500">
            {formatDate(article.datePublication, locale, 'long')}
          </p>
          <h3 className="mt-2 font-serif text-2xl font-bold text-brand-dark transition-colors group-hover:text-brand-primary leading-tight">
            {article.title}
            <ArrowUpRight className="ml-1.5 inline-block h-5 w-5 opacity-0 transition-all group-hover:opacity-100 -translate-y-0.5" />
          </h3>
          <p className="mt-2.5 line-clamp-2 text-[15px] leading-relaxed text-gray-600">
            {article.metaDescription}
          </p>
          <div className="mt-4">
            <CategoryTags article={article} />
          </div>
        </div>
      </Link>
    );
  }

  if (variant === 'horizontal') {
    return (
      <Link href={href} className="group flex gap-5 py-5 border-b border-gray-100 last:border-0">
        <div className="relative h-[120px] w-[180px] shrink-0 overflow-hidden rounded-none bg-gray-100">
          <ArticleImage
            article={article}
            sizes="180px"
          />
        </div>
        <div className="flex flex-col justify-center min-w-0">
          <p className="text-xs text-gray-500">
            {formatDate(article.datePublication, locale, 'long')}
          </p>
          <h3 className="mt-1.5 font-serif text-base font-bold text-brand-dark leading-snug transition-colors group-hover:text-brand-primary line-clamp-2">
            {article.title}
          </h3>
          <p className="mt-1 text-sm text-gray-500 line-clamp-1 hidden sm:block">
            {article.metaDescription}
          </p>
          <div className="mt-2">
            <CategoryTags article={article} />
          </div>
        </div>
      </Link>
    );
  }

  // Grid variant (default)
  return (
    <Link href={href} className="group block h-full">
      <div className="relative aspect-[16/10] overflow-hidden rounded-none bg-gray-100">
        <ArticleImage
          article={article}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="pt-4">
        <p className="text-xs text-gray-500">
          {formatDate(article.datePublication, locale)}
        </p>
        <h3 className="mt-1.5 font-serif text-lg font-bold leading-snug text-brand-dark transition-colors group-hover:text-brand-primary line-clamp-2">
          {article.title}
          <ArrowUpRight className="ml-1 inline-block h-4 w-4 opacity-0 transition-all group-hover:opacity-100 -translate-y-0.5" />
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-gray-600">
          {article.metaDescription}
        </p>
        <div className="mt-3">
          <CategoryTags article={article} />
        </div>
      </div>
    </Link>
  );
}
