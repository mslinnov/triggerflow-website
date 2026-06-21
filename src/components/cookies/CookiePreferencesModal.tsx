'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { X } from 'lucide-react';
import { getConsent, setConsent } from '@/lib/cookies';

interface CookiePreferencesModalProps {
  open: boolean;
  onClose: () => void;
}

export function CookiePreferencesModal({ open, onClose }: CookiePreferencesModalProps) {
  const t = useTranslations('cookies.modal');
  const [analyticsOn, setAnalyticsOn] = useState(false);
  const [marketingOn, setMarketingOn] = useState(false);

  useEffect(() => {
    if (!open) return;
    const consent = getConsent();
    setAnalyticsOn(consent?.analytics ?? false);
    setMarketingOn(consent?.marketing ?? false);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleSave = () => {
    setConsent(analyticsOn, marketingOn);
    onClose();
  };

  const handleAcceptAll = () => {
    setConsent(true, true);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[101] flex items-end justify-center bg-black/40 p-4 backdrop-blur-sm sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-zinc-100 px-6 py-4">
          <h2
            id="cookie-modal-title"
            className="text-lg font-semibold text-brand-dark"
          >
            {t('title')}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700"
            aria-label={t('close')}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4 px-6 py-5">
          <CookieRow
            label={t('necessary')}
            description={t('necessaryDesc')}
            checked
            disabled
          />
          <CookieRow
            label={t('analytics')}
            description={t('analyticsDesc')}
            checked={analyticsOn}
            onChange={setAnalyticsOn}
          />
          <CookieRow
            label={t('marketing')}
            description={t('marketingDesc')}
            checked={marketingOn}
            onChange={setMarketingOn}
          />
        </div>

        <div className="flex flex-col gap-2 border-t border-zinc-100 px-6 py-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={handleSave}
            className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
          >
            {t('save')}
          </button>
          <button
            type="button"
            onClick={handleAcceptAll}
            className="rounded-lg bg-brand-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-primary/90"
          >
            {t('acceptAll')}
          </button>
        </div>
      </div>
    </div>
  );
}

interface CookieRowProps {
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (next: boolean) => void;
}

function CookieRow({ label, description, checked, disabled, onChange }: CookieRowProps) {
  return (
    <div className="flex items-start gap-4 rounded-lg border border-zinc-100 p-4">
      <div className="flex-1">
        <p className="text-sm font-semibold text-brand-dark">{label}</p>
        <p className="mt-1 text-sm leading-relaxed text-zinc-600">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        disabled={disabled}
        onClick={() => !disabled && onChange?.(!checked)}
        className={`relative mt-1 inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors ${
          checked ? 'bg-brand-primary' : 'bg-zinc-200'
        } ${disabled ? 'cursor-not-allowed opacity-60' : ''}`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform ${
            checked ? 'translate-x-5' : 'translate-x-0.5'
          }`}
        />
      </button>
    </div>
  );
}
