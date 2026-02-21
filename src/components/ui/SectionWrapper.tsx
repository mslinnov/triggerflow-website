import { cn } from '@/lib/utils';

type SectionBackground = 'white' | 'light' | 'mist' | 'dark' | 'gradient';

interface SectionWrapperProps {
  className?: string;
  children: React.ReactNode;
  background?: SectionBackground;
  id?: string;
}

const backgrounds: Record<SectionBackground, string> = {
  white: 'bg-white',
  light: 'bg-brand-light',
  mist: 'bg-surface-secondary',
  dark: 'bg-brand-dark text-white',
  gradient: 'bg-gradient-to-br from-brand-dark via-brand-dark to-brand-primary/80 text-white',
};

export function SectionWrapper({
  className,
  children,
  background = 'white',
  id,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn('py-16 md:py-24', backgrounds[background], className)}
    >
      {children}
    </section>
  );
}

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  centered?: boolean;
}

export function SectionHeader({
  title,
  subtitle,
  className,
  centered = true,
}: SectionHeaderProps) {
  return (
    <div className={cn('mb-12', centered && 'text-center', className)}>
      <h2 className="font-serif text-3xl font-bold tracking-tight text-text-primary md:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-text-secondary">
          {subtitle}
        </p>
      )}
    </div>
  );
}
