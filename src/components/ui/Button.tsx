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

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-brand-primary text-white hover:bg-brand-primary/90',
  secondary: 'bg-brand-dark text-white hover:bg-brand-dark/90',
  accent: 'bg-brand-accent text-brand-dark hover:bg-brand-accent/90',
  ghost: 'bg-transparent text-brand-dark hover:bg-brand-light border border-brand-light',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

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
        'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        variant === 'primary' ? 'shadow-md shadow-brand-primary/20 hover:shadow-lg hover:shadow-brand-primary/25' : '',
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
    'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2',
    variant === 'primary' ? 'shadow-md shadow-brand-primary/20 hover:shadow-lg hover:shadow-brand-primary/25' : '',
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
