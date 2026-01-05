import { cn } from '@/lib/utils';

type BadgeVariant = 'default' | 'primary' | 'secondary' | 'accent' | 'outline';

interface BadgeProps {
  variant?: BadgeVariant;
  className?: string;
  children: React.ReactNode;
}

const variants: Record<BadgeVariant, string> = {
  default: 'bg-brand-light text-brand-dark',
  primary: 'bg-brand-primary/10 text-brand-primary',
  secondary: 'bg-brand-dark/10 text-brand-dark',
  accent: 'bg-brand-accent/20 text-brand-dark',
  outline: 'bg-transparent border border-brand-light text-brand-dark',
};

export function Badge({ variant = 'default', className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-sm font-medium',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
