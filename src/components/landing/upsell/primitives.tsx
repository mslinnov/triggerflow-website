import Link from 'next/link';
import { cn } from '@/lib/utils';

/**
 * Primitives visuelles de la LP. Rayons verrouillés :
 * boutons = pill, surfaces = 16px, champs = 12px (cf. globals.css).
 */

const buttonBase =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold ' +
  'transition-[transform,background-color,border-color] duration-200 ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ' +
  'focus-visible:ring-[var(--up-accent)] focus-visible:ring-offset-[var(--up-bg)] ' +
  'active:translate-y-[1px] disabled:pointer-events-none disabled:opacity-55';

// Hauteurs calées sur le minimum tactile de 44 px : le trafic est mobile.
const buttonSizes = {
  md: 'min-h-11 px-5 py-3 text-sm',
  lg: 'min-h-[52px] px-7 py-3.5 text-base',
} as const;

const buttonVariants = {
  primary: 'bg-[var(--up-accent)] text-[var(--up-accent-ink)] hover:bg-[var(--up-accent-hover)]',
  outline:
    'border border-[var(--up-line-strong)] bg-[var(--up-surface)] text-[var(--up-ink)] hover:border-[var(--up-accent)]',
} as const;

interface UpsellButtonProps {
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
  className?: string;
  children: React.ReactNode;
}

export function UpsellLinkButton({
  href,
  variant = 'primary',
  size = 'md',
  className,
  children,
}: UpsellButtonProps & { href: string }) {
  return (
    <Link
      href={href}
      className={cn(buttonBase, buttonSizes[size], buttonVariants[variant], className)}
    >
      {children}
    </Link>
  );
}

export function UpsellButton({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: UpsellButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(buttonBase, buttonSizes[size], buttonVariants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}

/** Libellé de section. Usage rationné : trois au maximum sur toute la page. */
export function UpsellEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--up-accent-text)]">
      {children}
    </p>
  );
}

export function UpsellSection({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn('scroll-mt-20 py-16 md:py-24', className)}>
      {children}
    </section>
  );
}
