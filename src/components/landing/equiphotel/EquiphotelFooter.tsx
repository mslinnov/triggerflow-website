import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui';

export function EquiphotelFooter() {
  const t = useTranslations('equiphotel.footer');

  return (
    <footer className="border-t border-border-light bg-surface-secondary py-8">
      <Container>
        <div className="flex flex-col items-center gap-4 text-sm text-text-muted md:flex-row md:justify-between">
          <p>{t('rights', { year: new Date().getFullYear() })}</p>
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link href="/fr" className="hover:text-text-primary">
              {t('site')}
            </Link>
            <Link href="/fr/mentions-legales" className="hover:text-text-primary">
              {t('legal')}
            </Link>
            <Link href="/fr/politique-confidentialite" className="hover:text-text-primary">
              {t('privacy')}
            </Link>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
