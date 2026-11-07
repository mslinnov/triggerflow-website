import Link from 'next/link';
import { useLocale } from 'next-intl';
import { normalizeInternalHref } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface InternalLinkProps {
  href: string;
  children: React.ReactNode;
}

export function InternalLink({ href, children }: InternalLinkProps) {
  const locale = useLocale();
  return (
    <Link
      href={normalizeInternalHref(href, locale)}
      className="not-prose group my-6 flex items-center justify-between gap-4 rounded-xl border border-line bg-white px-5 py-4 text-[16px] font-medium text-ink no-underline transition-colors duration-150 hover:border-accent hover:text-accent"
    >
      <span className="min-w-0">{children}</span>
      <ArrowRight aria-hidden className="h-4 w-4 shrink-0 text-accent transition-transform duration-150 group-hover:translate-x-0.5" />
    </Link>
  );
}
