import { Link } from '@/i18n/navigation';
import { ChevronRight } from 'lucide-react';

interface BlogBreadcrumbProps {
  blogLabel: string;
  silo?: { nom: string; slug: string };
  articleTitle?: string;
}

export function BlogBreadcrumb({ blogLabel, silo, articleTitle }: BlogBreadcrumbProps) {
  return (
    <nav className="flex min-w-0 items-center gap-1.5 font-mono text-[12px] uppercase tracking-[0.06em] text-ink-3" aria-label="Breadcrumb">
      <Link href="/blog" className="shrink-0 transition-colors hover:text-accent">
        {blogLabel}
      </Link>

      {silo && (
        <>
          <ChevronRight aria-hidden className="h-3.5 w-3.5 shrink-0 text-ink-3/60" />
          {articleTitle ? (
            <Link
              href={`/blog/${silo.slug}`}
              className="shrink-0 transition-colors hover:text-accent"
            >
              {silo.nom}
            </Link>
          ) : (
            <span className="text-ink">{silo.nom}</span>
          )}
        </>
      )}

      {articleTitle && (
        <>
          <ChevronRight aria-hidden className="hidden h-3.5 w-3.5 shrink-0 text-ink-3/60 sm:block" />
          <span className="hidden min-w-0 truncate text-ink sm:block">{articleTitle}</span>
        </>
      )}
    </nav>
  );
}
