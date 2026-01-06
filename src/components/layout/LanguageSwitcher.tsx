'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { routing, type Locale } from '@/i18n/routing';

const localeLabels: Record<Locale, string> = {
  fr: 'FR',
  en: 'EN',
};

const localeFlags: Record<Locale, string> = {
  fr: '🇫🇷',
  en: '🇬🇧',
};

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: Locale) => {
    // Cast to any to handle dynamic routes like /produit/[slug]
    router.replace(pathname as any, { locale: newLocale });
  };

  return (
    <div className="flex items-center gap-1 rounded-full bg-brand-light p-1">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          onClick={() => handleLocaleChange(loc)}
          className={cn(
            'flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-all',
            locale === loc
              ? 'bg-white text-brand-dark shadow-sm'
              : 'text-zinc-600 hover:text-brand-dark'
          )}
          aria-label={`Switch to ${loc === 'fr' ? 'French' : 'English'}`}
        >
          <span className="text-base">{localeFlags[loc]}</span>
          <span>{localeLabels[loc]}</span>
        </button>
      ))}
    </div>
  );
}
