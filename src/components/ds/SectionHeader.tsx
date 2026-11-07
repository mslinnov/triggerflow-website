import { cn } from '@/lib/utils';
import { Eyebrow } from './Eyebrow';

interface SectionHeaderProps {
  eyebrow?: string;
  title: React.ReactNode;
  /** Suite du titre en ton secondaire (titre en deux tons, à la Stripe). */
  titleMuted?: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: 'center' | 'left';
  onDark?: boolean;
  as?: 'h1' | 'h2';
  id?: string;
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  titleMuted,
  subtitle,
  align = 'center',
  onDark,
  as: Tag = 'h2',
  id,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn('max-w-3xl', align === 'center' ? 'mx-auto text-center' : 'text-left', className)}>
      {eyebrow && <Eyebrow onDark={onDark}>{eyebrow}</Eyebrow>}
      <Tag
        id={id}
        className={cn(
          'mt-4 font-medium text-balance',
          Tag === 'h1' ? 'text-[2.25rem] leading-[1.1] tracking-[-0.02em] md:text-h1' : 'text-[1.875rem] leading-[1.15] tracking-[-0.02em] md:text-h2',
          onDark ? 'text-white' : 'text-ink'
        )}
      >
        {title}
        {titleMuted && (
          <>
            {' '}
            <span className={onDark ? 'text-white/55' : 'text-ink-3'}>{titleMuted}</span>
          </>
        )}
      </Tag>
      {subtitle && (
        <p className={cn('mt-5 text-lg leading-relaxed md:text-lead', onDark ? 'text-white/70' : 'text-ink-2')}>{subtitle}</p>
      )}
    </div>
  );
}
