'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Mail, CheckCircle } from 'lucide-react';
import { useNewsletter } from '@/lib/hooks/useNewsletter';
import { cn } from '@/lib/utils';

export function NewsletterInline() {
  const t = useTranslations('blog.newsletter');
  const tConsent = useTranslations('newsletter');
  const locale = useLocale();
  const { email, setEmail, honeypot, setHoneypot, status, subscribe } = useNewsletter();
  const [consent, setConsent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) return;
    await subscribe(locale);
  };

  return (
    <div className="my-8 rounded-lg border border-brand-light bg-brand-light/20 p-6">
      <div className="flex items-center gap-2 mb-2">
        <Mail className="h-5 w-5 text-brand-primary" />
        <h4 className="text-base font-semibold text-brand-dark">{t('title')}</h4>
      </div>
      <p className="text-sm text-brand-dark/70 mb-4">{t('subtitle')}</p>

      <form onSubmit={handleSubmit}>
        {/* Honeypot — hidden from users */}
        <input
          type="text"
          name="website"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        <div className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('placeholder')}
            required
            disabled={status === 'loading' || status === 'success'}
            className="flex-1 rounded-md border border-brand-light bg-white px-3 py-2 text-sm outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
          />
          <button
            type="submit"
            disabled={status === 'loading' || status === 'success' || !consent}
            className={cn(
              'flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white transition-colors',
              status === 'success'
                ? 'bg-green-500'
                : 'bg-brand-primary hover:bg-brand-primary/90 disabled:opacity-50'
            )}
          >
            {status === 'success' ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              t('button')
            )}
          </button>
        </div>

        {/* RGPD consent */}
        <label className="mt-3 flex items-start gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-brand-light bg-white text-brand-primary focus:ring-brand-primary"
          />
          <span className="text-xs text-brand-dark/60">
            {tConsent('consent')}{' '}
            <Link href="/politique-confidentialite" className="text-brand-primary underline hover:text-brand-primary/80">
              {tConsent('privacyLink')}
            </Link>
          </span>
        </label>

        {/* Status messages */}
        {status === 'success' && (
          <p className="mt-2 text-xs text-green-600">{tConsent('success')}</p>
        )}
        {status === 'error' && (
          <p className="mt-2 text-xs text-red-500">{tConsent('error')}</p>
        )}
      </form>
    </div>
  );
}
