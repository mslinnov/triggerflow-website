import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface LPFooterLink {
  label: string;
  href: string;
}

export interface LPFooterProps {
  links: LPFooterLink[];
  className?: string;
}

/** Pied de page minimal : mentions légales et confidentialité, sans menu qui ferait quitter la page. */
export function LPFooter({ links, className }: LPFooterProps) {
  return (
    <footer className={cn('border-t border-white/10 bg-brand-dark text-xs text-white/60', className)}>
      <div className="mx-auto flex max-w-7xl flex-wrap gap-x-5 gap-y-2 px-4 py-5 sm:px-6 lg:px-8">
        <span>© {new Date().getFullYear()} TriggerFlow</span>
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="underline-offset-2 hover:text-white hover:underline">
            {link.label}
          </Link>
        ))}
      </div>
    </footer>
  );
}
