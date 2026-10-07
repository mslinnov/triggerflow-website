import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { CalendarCheck } from 'lucide-react';
import { Container } from '@/components/ui';

export function EquiphotelHeader() {
  const t = useTranslations('equiphotel.header');

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-surface-dark/95 backdrop-blur-md">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/fr" aria-label={t('homeLabel')} className="shrink-0">
            <Image
              src="/images/logo-white.webp"
              alt="TriggerFlow"
              width={146}
              height={31}
              className="h-7 w-auto"
              priority
            />
          </Link>

          <span className="hidden rounded-full border border-white/15 px-3 py-1 text-xs font-medium text-brand-light md:inline-flex">
            {t('badge')}
          </span>

          <a
            href="#rdv"
            className="inline-flex items-center gap-2 rounded-full bg-brand-accent px-4 py-2 text-sm font-semibold text-brand-dark transition-colors hover:bg-brand-accent/90"
          >
            <CalendarCheck className="h-4 w-4" aria-hidden="true" />
            {t('cta')}
          </a>
        </div>
      </Container>
    </header>
  );
}
