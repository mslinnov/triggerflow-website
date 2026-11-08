'use client';

import { useId, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight, Check } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { useNewsletter } from '@/lib/hooks/useNewsletter';

/** Inscription à la newsletter (Brevo via /api/newsletter), avec consentement RGPD explicite. */
export function FooterNewsletter() {
  const t = useTranslations('nav.footer.newsletter');
  const tConsent = useTranslations('newsletter');
  const locale = useLocale();
  const id = useId();
  const { email, setEmail, honeypot, setHoneypot, status, subscribe } = useNewsletter();
  const [consent, setConsent] = useState(false);
  const [needConsent, setNeedConsent] = useState(false);
  const done = status === 'success';

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      setNeedConsent(true);
      return;
    }
    await subscribe(locale);
  };

  return (
    <form onSubmit={onSubmit} className="w-full max-w-md" aria-labelledby={`${id}-title`}>
      <p id={`${id}-title`} className="text-[17px] font-semibold text-white">{t('title')}</p>
      <p className="mt-1.5 text-[14px] leading-relaxed text-white/80">{t('text')}</p>

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

      <div className="mt-4 flex gap-2">
        <label htmlFor={`${id}-email`} className="sr-only">{t('placeholder')}</label>
        <input
          id={`${id}-email`}
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('placeholder')}
          disabled={status === 'loading' || done}
          autoComplete="email"
          className="h-11 min-w-0 flex-1 rounded-lg border border-white/20 bg-white/[0.06] px-4 text-[15px] text-white placeholder:text-white/50 outline-none transition-colors focus:border-mint focus:bg-white/10"
        />
        <button
          type="submit"
          disabled={status === 'loading' || done}
          className="inline-flex h-11 shrink-0 items-center gap-1.5 rounded-lg bg-white px-4 font-mono text-[13px] font-medium uppercase tracking-[0.04em] text-ink transition-colors hover:bg-mint disabled:cursor-not-allowed disabled:opacity-60"
        >
          {done ? <Check aria-hidden className="h-4 w-4" /> : <>{t('cta')}<ArrowRight aria-hidden className="h-4 w-4" /></>}
        </button>
      </div>

      <label className="mt-3 flex cursor-pointer items-start gap-2.5">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => {
            setConsent(e.target.checked);
            if (e.target.checked) setNeedConsent(false);
          }}
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/30 bg-transparent accent-[#CCE2E1]"
        />
        <span className="text-[12.5px] leading-relaxed text-white/65">
          {tConsent('consent')}{' '}
          <Link href="/politique-confidentialite" className="underline underline-offset-2 hover:text-white">
            {tConsent('privacyLink')}
          </Link>
        </span>
      </label>

      <p role="status" className="mt-2 text-[13px] empty:hidden">
        {done && <span className="text-mint">{tConsent('success')}</span>}
        {status === 'error' && <span className="text-peach">{tConsent('error')}</span>}
        {needConsent && !done && <span className="text-peach">{t('consentRequired')}</span>}
      </p>
    </form>
  );
}
