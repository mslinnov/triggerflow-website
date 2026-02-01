'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { routing, type Locale } from '@/i18n/routing';

const localeFlags: Record<Locale, string> = {
  fr: '🇫🇷',
  en: '🇬🇧',
};

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleLocaleChange = (newLocale: Locale) => {
    router.replace(pathname as any, { locale: newLocale });
    setIsOpen(false);
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 rounded-lg px-2 py-2 text-sm transition-colors hover:bg-zinc-100"
        aria-label="Changer de langue"
      >
        <span className="text-lg leading-none">{localeFlags[locale]}</span>
        <ChevronDown className={cn(
          'h-3.5 w-3.5 text-gray-400 transition-transform duration-200',
          isOpen && 'rotate-180'
        )} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 min-w-[44px] overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-lg">
          {routing.locales
            .filter((loc) => loc !== locale)
            .map((loc) => (
              <button
                key={loc}
                onClick={() => handleLocaleChange(loc)}
                className="flex w-full items-center justify-center px-3 py-2 text-lg transition-colors hover:bg-zinc-50"
                aria-label={loc === 'fr' ? 'Français' : 'English'}
              >
                {localeFlags[loc]}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
