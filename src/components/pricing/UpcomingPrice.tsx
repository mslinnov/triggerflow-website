'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

interface UpcomingPriceProps {
  price: string | null;
  variant?: 'plan' | 'addon';
  className?: string;
}

/** Mention « 99€/mois à partir du 1er janvier 2027 », absente hors période d'annonce. */
export function UpcomingPrice({ price, variant = 'plan', className }: UpcomingPriceProps) {
  const t = useTranslations('priceChange');
  if (!price) return null;
  return (
    <p className={cn('mt-1 text-xs font-medium', className)}>
      {t(variant === 'plan' ? 'upcoming' : 'upcomingAddon', { price })}
    </p>
  );
}
