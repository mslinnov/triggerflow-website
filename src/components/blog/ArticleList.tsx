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
      <div className="border-t border-gray-200 py-20 text-center">
        <p className="text-gray-400 text-sm">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
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
