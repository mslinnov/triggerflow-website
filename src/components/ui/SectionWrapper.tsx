import { cn } from '@/lib/utils';

type SectionBackground = 'white' | 'light' | 'dark';

interface SectionWrapperProps {
  className?: string;
  children: React.ReactNode;
  background?: SectionBackground;
  id?: string;
}

const backgrounds: Record<SectionBackground, string> = {
  white: 'bg-white',
  light: 'bg-brand-light',
  dark: 'bg-brand-dark text-white',
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
      <h2 className="font-serif text-3xl font-bold tracking-tight text-v3-text-primary md:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-v3-text-secondary">
          {subtitle}
        </p>
      )}
    </div>
  );
}
