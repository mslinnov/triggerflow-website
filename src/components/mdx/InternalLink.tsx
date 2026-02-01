import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface InternalLinkProps {
  href: string;
  children: React.ReactNode;
}

export function InternalLink({ href, children }: InternalLinkProps) {
  return (
    <Link
      href={href}
      className="group my-4 flex items-center gap-2 rounded-lg border border-brand-light bg-brand-light/20 px-4 py-3 text-sm font-medium text-brand-primary transition-colors hover:bg-brand-light/40"
    >
      <span>{children}</span>
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}
