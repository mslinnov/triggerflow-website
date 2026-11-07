import { ArticleCard } from './ArticleCard';
import type { Article } from '@/types/blog';

interface ArticleListProps {
  articles: Article[];
  locale: string;
  emptyMessage: string;
}

export function ArticleList({ articles, locale, emptyMessage }: ArticleListProps) {
  if (articles.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-line py-20 text-center">
        <p className="text-[15px] text-ink-3">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <ArticleCard
          key={`${article.siloSlug}-${article.slug}`}
          article={article}
          locale={locale}
        />
      ))}
    </div>
  );
}
