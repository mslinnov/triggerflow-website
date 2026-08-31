'use client';

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { hasValidConsent, setConsent } from '@/lib/cookies';
import { CookiePreferencesModal } from './CookiePreferencesModal';

const OPEN_MODAL_EVENT = 'tf-open-cookie-modal';

export function CookieConsentBanner() {
  const t = useTranslations('cookies.banner');
  const locale = useLocale();
  const [needsConsent, setNeedsConsent] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setNeedsConsent(!hasValidConsent());

    const onConsentChanged = () => setNeedsConsent(!hasValidConsent());
    const onOpenModal = () => {
      setNeedsConsent(false);
      setModalOpen(true);
    };

    window.addEventListener('tf-consent-changed', onConsentChanged);
    window.addEventListener(OPEN_MODAL_EVENT, onOpenModal);
    return () => {
      window.removeEventListener('tf-consent-changed', onConsentChanged);
      window.removeEventListener(OPEN_MODAL_EVENT, onOpenModal);
    };
  }, []);

  const handleAccept = () => setConsent(true, true);
  const handleReject = () => setConsent(false, false);
  const handleCustomize = () => {
    setNeedsConsent(false);
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
    setNeedsConsent(!hasValidConsent());
  };

  return (
    <>
      {needsConsent && (
        <div
          className="fixed inset-x-0 bottom-0 z-[100] border-t border-zinc-200 bg-white shadow-[0_-4px_24px_rgba(0,0,0,0.08)]"
          role="region"
          aria-label={t('ariaLabel')}
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:gap-6 lg:px-8 lg:py-6">
            <p className="flex-1 text-sm leading-relaxed text-zinc-700">
              {t('message')}{' '}
              <a
                href={`/${locale}/politique-confidentialite`}
                className="font-medium text-brand-primary underline-offset-2 hover:underline"
              >
                {t('learnMore')}
              </a>
              .
            </p>

            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap lg:flex-nowrap">
              <button
                type="button"
                onClick={handleReject}
                className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
              >
                {t('reject')}
              </button>
              <button
                type="button"
                onClick={handleCustomize}
                className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
              >
                {t('customize')}
              </button>
              <button
                type="button"
                onClick={handleAccept}
                className="rounded-lg bg-brand-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-primary/90"
              >
                {t('accept')}
              </button>
            </div>
          </div>
        </div>
      )}

      <CookiePreferencesModal open={modalOpen} onClose={handleModalClose} />
    </>
  );
}

/** Dispatched by CookieManagerLink to open the modal from anywhere. */
export function openCookieModal() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(OPEN_MODAL_EVENT));
}
