'use client';

import { useTranslations } from 'next-intl';
import { openCookieModal } from './CookieConsentBanner';

interface CookieManagerLinkProps {
  className?: string;
}

export function CookieManagerLink({ className }: CookieManagerLinkProps) {
  const t = useTranslations('cookies.manager');
  return (
    <button
      type="button"
      onClick={openCookieModal}
      className={className}
    >
      {t('link')}
    </button>
  );
}
