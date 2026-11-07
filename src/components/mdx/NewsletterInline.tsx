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
    <div className="not-prose my-10 rounded-xl border border-line bg-paper p-6 md:p-7">
      <div className="flex items-center gap-2.5">
        <Mail aria-hidden strokeWidth={1.75} className="h-5 w-5 text-accent" />
        <p className="text-[17px] font-semibold text-ink">{t('title')}</p>
      </div>
      <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{t('subtitle')}</p>

      <form onSubmit={handleSubmit} className="mt-5">
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

        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('placeholder')}
            aria-label={t('placeholder')}
            required
            disabled={status === 'loading' || status === 'success'}
            className="h-11 min-w-0 flex-1 rounded-lg border border-line bg-white px-4 text-[15px] text-ink placeholder:text-ink-3 outline-none transition-colors duration-150 focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
          <button
            type="submit"
            disabled={status === 'loading' || status === 'success' || !consent}
            className={cn(
              'flex h-11 items-center justify-center rounded-lg px-5 font-mono text-[13px] font-medium uppercase tracking-[0.04em] text-white transition-colors duration-150 disabled:cursor-not-allowed',
              status === 'success' ? 'bg-accent' : 'bg-accent hover:bg-accent-hover disabled:opacity-50'
            )}
          >
            {status === 'success' ? <CheckCircle aria-hidden className="h-4 w-4" /> : t('button')}
          </button>
        </div>

        {/* RGPD consent */}
        <label className="mt-3 flex cursor-pointer items-start gap-2">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-line bg-white accent-accent"
          />
          <span className="text-[13px] leading-snug text-ink-2">
            {tConsent('consent')}{' '}
            <Link href="/politique-confidentialite" className="text-accent underline underline-offset-2 hover:text-accent-hover">
              {tConsent('privacyLink')}
            </Link>
          </span>
        </label>

        {/* Status messages */}
        {status === 'success' && <p className="mt-2 text-[13px] text-accent">{tConsent('success')}</p>}
        {status === 'error' && <p className="mt-2 text-[13px] text-red-700">{tConsent('error')}</p>}
      </form>
    </div>
  );
}
