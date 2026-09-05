import Link from 'next/link';
import { useTranslations } from 'next-intl';

/**
 * Pied de page réduit aux obligations légales. Aucun autre lien : une landing
 * d'acquisition n'a pas de navigation secondaire.
 */
export function UpsellFooter({ locale }: { locale: string }) {
  const t = useTranslations('lpUpsell.footer');

  const links = [
    { href: `/${locale}/mentions-legales`, label: t('legal') },
    { href: `/${locale}/politique-confidentialite`, label: t('privacy') },
    { href: `/${locale}/cgv`, label: t('terms') },
  ];

  return (
    <footer className="border-t border-[var(--up-line)] bg-[var(--up-bg-sunken)] py-10 pb-24 lg:pb-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 px-4 text-sm text-[var(--up-ink-muted)] sm:px-6 md:flex-row md:justify-between lg:px-8">
        <p>{t('copyright', { year: String(new Date().getFullYear()) })}</p>
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex min-h-11 items-center transition-colors hover:text-[var(--up-accent-text)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
