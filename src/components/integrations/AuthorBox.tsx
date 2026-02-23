'use client';

import { useTranslations } from 'next-intl';
import { Linkedin } from 'lucide-react';

export function AuthorBox() {
  const t = useTranslations('mewsIntegration.author');

  return (
    <div className="flex items-center gap-5 border-t border-border-light pt-8">
      {/* Avatar initials */}
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-surface-dark text-xs font-bold tracking-wide text-white">
        {t('initials')}
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-2.5">
          <span className="text-sm font-semibold text-text-primary">{t('name')}</span>
          <a
            href={t('linkedin')}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted transition-colors hover:text-[#0077b5]"
            aria-label={t('linkedinLabel')}
          >
            <Linkedin className="h-3.5 w-3.5" />
          </a>
        </div>
        <p className="mt-0.5 text-xs leading-relaxed text-text-muted">{t('bio')}</p>
      </div>
    </div>
  );
}
