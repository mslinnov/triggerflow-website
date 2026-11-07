import { Link } from '@/i18n/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  labels: {
    previous: string;
    next: string;
    page: string;
  };
}

export function Pagination({ currentPage, totalPages, basePath, labels }: PaginationProps) {
  if (totalPages <= 1) return null;

  const separator = basePath.includes('?') ? '&' : '?';

  function pageHref(page: number) {
    if (page === 1) return basePath;
    return `${basePath}${separator}page=${page}`;
  }

  const pages: number[] = [];
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, start + 4);
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <nav
      className="mt-16 flex items-center justify-between border-t border-line pt-5"
      aria-label="Pagination"
    >
      {/* Previous */}
      {currentPage > 1 ? (
        <Link
          href={pageHref(currentPage - 1)}
          className="inline-flex items-center gap-2 text-sm font-medium text-ink-2 transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" />
          {labels.previous}
        </Link>
      ) : (
        <span className="inline-flex items-center gap-2 text-sm font-medium text-ink-3/40">
          <ArrowLeft className="h-4 w-4" />
          {labels.previous}
        </span>
      )}

      {/* Page numbers */}
      <div className="hidden items-center gap-1 sm:flex">
        {pages[0] > 1 && (
          <>
            <Link
              href={pageHref(1)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg font-mono text-[13px] font-medium text-ink-2 transition-colors hover:bg-paper"
            >
              1
            </Link>
            {pages[0] > 2 && (
              <span className="px-1 text-ink-3">&hellip;</span>
            )}
          </>
        )}
        {pages.map((page) => (
          <Link
            key={page}
            href={pageHref(page)}
            className={cn(
              'inline-flex h-10 w-10 items-center justify-center rounded-lg font-mono text-[13px] font-medium transition-colors',
              page === currentPage
                ? 'bg-ink text-white'
                : 'text-ink-2 hover:bg-paper'
            )}
          >
            {page}
          </Link>
        ))}
        {pages[pages.length - 1] < totalPages && (
          <>
            {pages[pages.length - 1] < totalPages - 1 && (
              <span className="px-1 text-ink-3">&hellip;</span>
            )}
            <Link
              href={pageHref(totalPages)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg font-mono text-[13px] font-medium text-ink-2 transition-colors hover:bg-paper"
            >
              {totalPages}
            </Link>
          </>
        )}
      </div>

      {/* Next */}
      {currentPage < totalPages ? (
        <Link
          href={pageHref(currentPage + 1)}
          className="inline-flex items-center gap-2 text-sm font-medium text-ink-2 transition-colors hover:text-accent"
        >
          {labels.next}
          <ArrowRight className="h-4 w-4" />
        </Link>
      ) : (
        <span className="inline-flex items-center gap-2 text-sm font-medium text-ink-3/40">
          {labels.next}
          <ArrowRight className="h-4 w-4" />
        </span>
      )}
    </nav>
  );
}
