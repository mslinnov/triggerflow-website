import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

export type DsButtonVariant = 'primary' | 'secondary' | 'link' | 'primaryOnDark' | 'secondaryOnDark';

interface DsButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: DsButtonVariant;
  size?: 'md' | 'sm';
  /** Flèche après le libellé. */
  arrow?: boolean;
  className?: string;
  'aria-label'?: string;
}

const base =
  'group inline-flex items-center justify-center gap-2 whitespace-nowrap font-mono font-medium uppercase tracking-[0.04em] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2';

const variants: Record<DsButtonVariant, string> = {
  primary: 'rounded-lg bg-accent text-white hover:bg-accent-hover',
  secondary: 'rounded-lg border border-ink/80 text-ink hover:bg-ink hover:text-white',
  link: 'text-accent hover:text-accent-hover normal-case tracking-normal font-sans',
  primaryOnDark: 'rounded-lg bg-white text-ink hover:bg-mint',
  secondaryOnDark: 'rounded-lg border border-white/40 text-white hover:bg-white/10',
};

const sizes = { md: 'h-12 px-6 text-sm', sm: 'h-10 px-4 text-[13px]' };

/**
 * Bouton-lien de la charte (mono, majuscules). Lien interne : préfixe de langue ajouté
 * par next-intl ; lien externe (prise de rendez-vous, app) : nouvel onglet.
 */
export function DsButton({ href, children, variant = 'primary', size = 'md', arrow, className, ...rest }: DsButtonProps) {
  const classes = cn(base, variants[variant], variant !== 'link' && sizes[size], className);
  const content = (
    <>
      {children}
      {arrow && <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" />}
    </>
  );
  if (href.startsWith('/') && !/^\/(fr|en)(\/|$)/.test(href)) {
    return (
      <Link href={href} className={classes} {...rest}>
        {content}
      </Link>
    );
  }
  const external = /^https?:\/\//.test(href);
  return (
    <a href={href} className={classes} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...rest}>
      {content}
    </a>
  );
}
