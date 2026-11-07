import { cn } from '@/lib/utils';
import { Link } from '@/i18n/navigation';

type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  asChild?: boolean;
}

// Aligné sur la charte (docs/charte.md) : mono, majuscules, rayon 8 px, une seule couleur d'action.
const variants: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-white hover:bg-accent-hover',
  secondary: 'bg-ink text-white hover:bg-ink/90',
  accent: 'bg-peach text-ink hover:bg-peach/90',
  ghost: 'bg-transparent text-ink border border-ink/80 hover:bg-ink hover:text-white',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'h-10 px-4 text-[13px]',
  md: 'h-12 px-6 text-sm',
  lg: 'h-12 px-7 text-sm',
};

const base =
  'inline-flex items-center justify-center gap-2 rounded-lg font-mono font-medium uppercase tracking-[0.04em] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2';

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        base,
        'disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

interface ButtonLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonLinkProps) {
  const classes = cn(
    base,
    variants[variant],
    sizes[size],
    className
  );
  const { href } = props;
  // Lien interne sans préfixe de langue (« /tarifs ») : le Link de next-intl ajoute /fr ou /en.
  if (typeof href === 'string' && href.startsWith('/') && !/^\/(fr|en)(\/|$)/.test(href)) {
    return (
      <Link {...props} href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <a className={classes} {...props}>
      {children}
    </a>
  );
}
