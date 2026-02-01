import { Link } from '@/i18n/navigation';
import { ChevronRight } from 'lucide-react';

interface BlogBreadcrumbProps {
  blogLabel: string;
  silo?: { nom: string; slug: string };
  articleTitle?: string;
}

export function BlogBreadcrumb({ blogLabel, silo, articleTitle }: BlogBreadcrumbProps) {
  return (
    <nav className="flex items-center gap-1.5 text-sm text-gray-500" aria-label="Breadcrumb">
      <Link href="/blog" className="transition-colors hover:text-brand-primary">
        {blogLabel}
      </Link>

      {silo && (
        <>
          <ChevronRight className="h-3.5 w-3.5 shrink-0" />
          {articleTitle ? (
            <Link
              href={`/blog/${silo.slug}`}
              className="transition-colors hover:text-brand-primary"
            >
              {silo.nom}
            </Link>
          ) : (
            <span className="text-brand-dark font-medium">{silo.nom}</span>
          )}
        </>
      )}

      {articleTitle && (
        <>
          <ChevronRight className="h-3.5 w-3.5 shrink-0" />
          <span className="line-clamp-1 text-brand-dark font-medium">{articleTitle}</span>
        </>
      )}
    </nav>
  );
}
