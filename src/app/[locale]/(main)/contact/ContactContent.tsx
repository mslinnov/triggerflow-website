'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Mail, Phone, MapPin, Clock, Linkedin, Send } from 'lucide-react';
import { Container, CtaBand, Eyebrow } from '@/components/ds';
import { brand } from '@/data/brand';
import { cn } from '@/lib/utils';
import { getAttribution } from '@/lib/attribution';
import { trackAdsConversion } from '@/lib/ads';

const roomOptions = ['1-20', '21-50', '51-100', '100+'];

export function ContactContent() {
  const t = useTranslations('contact');
  const locale = useLocale();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    hotelName: '',
    rooms: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  // Le message part par /api/leads (contact Brevo + e-mail à l'équipe). Jusqu'au
  // 14/10/2026, ce formulaire affichait un succès sans rien envoyer.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setHasError(false);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          firstName: formData.name,
          hotelName: formData.hotelName,
          phone: formData.phone,
          roomsRange: formData.rooms,
          message: formData.message,
          source: 'contact',
          goal: 'contact',
          locale,
          attribution: getAttribution() ?? undefined,
          honeypot,
        }),
      });
      const result = (await response.json().catch(() => null)) as { success?: boolean } | null;
      if (!response.ok || !result?.success) throw new Error('lead_failed');
      trackAdsConversion('lead');
      window.gtag?.('event', 'generate_lead', { form: 'contact' });
      setIsSubmitted(true);
    } catch {
      setHasError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const inputClass =
    'w-full rounded-lg border border-line bg-white px-4 py-3 text-[15px] text-ink placeholder:text-ink-3/80 outline-none transition-colors duration-150 hover:border-ink-3/40 focus:border-accent focus:ring-2 focus:ring-accent/20';
  const labelClass = 'mb-1.5 block text-[14px] font-medium text-ink';

  const contactItems = [
    { icon: Mail, label: t('info.email'), value: 'contact@trigger-flow.com', href: 'mailto:contact@trigger-flow.com' },
    { icon: Phone, label: t('info.phone'), value: '+33 (0)5 54 54 48 52', href: 'tel:+33554544852' },
    { icon: MapPin, label: t('info.address'), value: 'Toulouse, France' },
    { icon: Clock, label: t('info.hours'), value: t('info.hoursValue') },
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-white pb-14 pt-14 md:pb-20 md:pt-20">
        <Container className="text-center">
          <Eyebrow>{t('meta.title')}</Eyebrow>
          <h1 className="mx-auto mt-5 max-w-3xl text-balance text-[2.25rem] font-medium leading-[1.08] tracking-[-0.025em] text-ink md:text-[3.5rem]">
            {t('hero.title')}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-2 md:text-lead">{t('hero.subtitle')}</p>
        </Container>
      </section>

      {/* Formulaire + coordonnées */}
      <section className="border-t border-line bg-paper py-16 md:py-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-10 [&>*]:min-w-0">
            {/* Form */}
            <div className="rounded-2xl border border-line bg-white p-6 sm:p-8 md:p-10">
              <h2 className="text-[1.5rem] font-medium leading-[1.2] tracking-[-0.015em] text-ink md:text-[1.75rem]">{t('form.title')}</h2>

              {isSubmitted ? (
                <div role="status" className="mt-8 rounded-xl border border-mint bg-mint/40 p-8 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent">
                    <Send aria-hidden className="h-6 w-6 text-white" strokeWidth={1.75} />
                  </div>
                  <h3 className="mt-5 text-h3 font-semibold text-ink">{t('form.success.title')}</h3>
                  <p className="mt-2 text-[16px] leading-relaxed text-ink-2">{t('form.success.message')}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className={labelClass}>
                        {t('form.fields.name')} <span className="text-accent">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder={t('form.placeholders.name')}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className={labelClass}>
                        {t('form.fields.email')} <span className="text-accent">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder={t('form.placeholders.email')}
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className={labelClass}>
                        {t('form.fields.phone')}
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder={t('form.placeholders.phone')}
                      />
                    </div>

                    {/* Hotel Name */}
                    <div>
                      <label htmlFor="hotelName" className={labelClass}>
                        {t('form.fields.hotelName')} <span className="text-accent">*</span>
                      </label>
                      <input
                        type="text"
                        id="hotelName"
                        name="hotelName"
                        required
                        value={formData.hotelName}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder={t('form.placeholders.hotelName')}
                      />
                    </div>
                  </div>

                  {/* Rooms */}
                  <div>
                    <label htmlFor="rooms" className={labelClass}>
                      {t('form.fields.rooms')}
                    </label>
                    <select id="rooms" name="rooms" value={formData.rooms} onChange={handleChange} className={inputClass}>
                      <option value="">{t('form.placeholders.rooms')}</option>
                      {roomOptions.map((option) => (
                        <option key={option} value={option}>
                          {option} {t('form.rooms')}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className={labelClass}>
                      {t('form.fields.message')} <span className="text-accent">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className={cn(inputClass, 'resize-none')}
                      placeholder={t('form.placeholders.message')}
                    />
                  </div>

                  {/* Piège à robots : invisible pour un humain, rempli par les robots. */}
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="hidden"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />

                  {hasError && (
                    <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-[14px] text-red-800">
                      {t('form.error')}
                    </p>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-accent px-6 font-mono text-sm font-medium uppercase tracking-[0.04em] text-white transition-colors duration-150 hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                  >
                    {isSubmitting ? (
                      <span>{t('form.submitting')}</span>
                    ) : (
                      <>
                        {t('form.submit')}
                        <Send aria-hidden className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Coordonnées */}
            <div>
              <h2 className="font-mono text-eyebrow font-medium uppercase text-ink-3">{t('info.title')}</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {contactItems.map(({ icon: Icon, label, value, href }) => {
                  const inner = (
                    <>
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-mint text-accent">
                        <Icon aria-hidden className="h-5 w-5" strokeWidth={1.5} />
                      </span>
                      <span className="min-w-0">
                        <span className="block font-mono text-[11px] uppercase tracking-[0.06em] text-ink-3">{label}</span>
                        <span className="mt-0.5 block break-words text-[16px] font-medium text-ink">{value}</span>
                      </span>
                    </>
                  );
                  return (
                    <li key={label}>
                      {href ? (
                        <a
                          href={href}
                          className="flex items-center gap-4 rounded-xl border border-line bg-white p-4 transition-colors duration-150 hover:border-accent"
                        >
                          {inner}
                        </a>
                      ) : (
                        <div className="flex items-center gap-4 rounded-xl border border-line bg-white p-4">{inner}</div>
                      )}
                    </li>
                  );
                })}
              </ul>

              <h3 className="mt-10 font-mono text-eyebrow font-medium uppercase text-ink-3">{t('info.social')}</h3>
              <a
                href="https://www.linkedin.com/company/triggerflow"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex h-11 items-center gap-2 rounded-lg border border-line bg-white px-4 text-[15px] font-medium text-ink transition-colors duration-150 hover:border-accent hover:text-accent"
              >
                <Linkedin aria-hidden className="h-4 w-4" strokeWidth={1.75} />
                LinkedIn
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Démo */}
      <CtaBand title={t('demo.title')} text={t('demo.description')} primary={{ label: t('demo.cta'), href: brand.demoPage }} />
    </>
  );
}
