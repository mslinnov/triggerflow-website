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
      className="mt-16 flex items-center justify-between border-t border-gray-200 pt-5"
      aria-label="Pagination"
    >
      {/* Previous */}
      {currentPage > 1 ? (
        <Link
          href={pageHref(currentPage - 1)}
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-brand-dark"
        >
          <ArrowLeft className="h-4 w-4" />
          {labels.previous}
        </Link>
      ) : (
        <span className="inline-flex items-center gap-2 text-sm font-medium text-gray-300">
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
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
            >
              1
            </Link>
            {pages[0] > 2 && (
              <span className="px-1 text-gray-400">&hellip;</span>
            )}
          </>
        )}
        {pages.map((page) => (
          <Link
            key={page}
            href={pageHref(page)}
            className={cn(
              'inline-flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition-colors',
              page === currentPage
                ? 'bg-brand-dark text-white'
                : 'text-gray-600 hover:bg-gray-50'
            )}
          >
            {page}
          </Link>
        ))}
        {pages[pages.length - 1] < totalPages && (
          <>
            {pages[pages.length - 1] < totalPages - 1 && (
              <span className="px-1 text-gray-400">&hellip;</span>
            )}
            <Link
              href={pageHref(totalPages)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
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
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-brand-dark"
        >
          {labels.next}
          <ArrowRight className="h-4 w-4" />
        </Link>
      ) : (
        <span className="inline-flex items-center gap-2 text-sm font-medium text-gray-300">
          {labels.next}
          <ArrowRight className="h-4 w-4" />
        </span>
      )}
    </nav>
  );
}
