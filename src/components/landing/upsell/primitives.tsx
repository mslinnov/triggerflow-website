'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { formatEurosParts } from '@/lib/upsell-simulator';
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

/**
 * Variante lien externe. `UpsellLinkButton` passe par `next/link`, qui ne
 * convient pas pour une prise de rendez-vous ouverte dans un onglet : il lui
 * faut `target`, `rel` et un `onClick` de suivi. Sans cette primitive, la
 * recette de classes était retapée à la main dans l'en-tête et divergeait
 * déjà du reste des boutons de la page.
 */
export function UpsellExternalLinkButton({
  href,
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: UpsellButtonProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(buttonBase, buttonSizes[size], buttonVariants[variant], className)}
      {...props}
    >
      {children}
    </a>
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

/**
 * Chiffre composé en Geist Mono, unité rendue à part et à échelle réduite.
 *
 * L'unité a besoin de son propre élément : en Geist Mono, l'espace insécable
 * étroite que produit `Intl` occupe une chasse pleine et détache le symbole du
 * nombre. Le rapport d'échelle et la marge sont définis ici et nulle part
 * ailleurs, sans quoi le « € » du simulateur et le « % » de la bande de
 * réassurance se composent différemment.
 */
export function UpsellFigure({
  value,
  unit,
  className,
  unitClassName,
}: {
  value: string;
  unit: string;
  className?: string;
  unitClassName?: string;
}) {
  return (
    <span
      className={cn(
        'font-[family-name:var(--font-geist-mono)] [font-variant-numeric:tabular-nums]',
        className
      )}
    >
      {value}
      <span
        className={cn(
          'ml-[0.2em] align-baseline text-[0.62em] font-medium tracking-normal',
          unitClassName
        )}
      >
        {unit}
      </span>
    </span>
  );
}

/** Montant en euros. La locale est lue ici, elle n'a pas à traverser l'arbre. */
export function UpsellAmount({ amount, className }: { amount: number; className?: string }) {
  const locale = useLocale();
  const { value, currency } = formatEurosParts(amount, locale);

  return <UpsellFigure value={value} unit={currency} className={className} />;
}
