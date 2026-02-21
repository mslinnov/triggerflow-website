'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { useState } from 'react';
import { Linkedin, Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { useNewsletter } from '@/lib/hooks/useNewsletter';
import { Container } from '@/components/ui';
import { cn } from '@/lib/utils';

// Product links to individual module pages
const productLinks = [
  { href: '/produit/hub-messagerie', labelKey: 'product.communication', isLink: true },
  { href: '/produit/automatisations', labelKey: 'product.automation', isLink: true },
  { href: '/produit/newsletter', labelKey: 'product.marketing', isLink: true },
  { href: '/produit/crm', labelKey: 'product.tools', isLink: true },
  { href: '/produit/avis', labelKey: 'product.reputation', isLink: true },
] as const;

// Solutions links
const solutionLinks = [
  { href: '/solutions/hotels-independants', labelKey: 'solutions.independentHotel' },
  { href: '/solutions/groupes-hoteliers', labelKey: 'solutions.hotelGroup' },
  { href: '/solutions/residences', labelKey: 'solutions.residence' },
  { href: '/solutions/campings', labelKey: 'solutions.camping' },
] as const;

// Resources links
const resourceLinks = [
  { href: '/blog', labelKey: 'resources.blog' },
  { href: '/ressources/cas-clients', labelKey: 'resources.caseStudies' },
  { href: '/ressources/guides', labelKey: 'resources.guides' },
  { href: '/ressources/aide', labelKey: 'resources.helpCenter' },
] as const;

// Company links
const companyLinks = [
  { href: '/entreprise/a-propos', labelKey: 'company.about', isLink: true },
  { href: '/contact', labelKey: 'company.contact', isLink: true },
  { href: '/entreprise/carrieres', labelKey: 'company.careers', isLink: true },
] as const;

const legalLinks = [
  { href: '/mentions-legales', labelKey: 'legal.legalNotice' },
  { href: '/cgv', labelKey: 'legal.terms' },
  { href: '/cgu', labelKey: 'legal.termsOfUse' },
  { href: '/politique-confidentialite', labelKey: 'legal.privacy' },
] as const;

export function Footer() {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark">
      {/* Main Footer Content */}
      <Container>
        <div className="py-12 md:py-16">
          {/* 5-Column Grid */}
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
            {/* Column 1: Logo + Contact */}
            <div className="lg:col-span-1">
              <Logo />
              <p className="mt-4 text-sm leading-relaxed text-white/50">
                {t('description')}
              </p>

              {/* Contact Info */}
              <div className="mt-6 space-y-3">
                <a
                  href="mailto:contact@trigger-flow.com"
                  className="flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  contact@trigger-flow.com
                </a>
                <a
                  href="tel:+33123456789"
                  className="flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  +33 1 23 45 67 89
                </a>
                <div className="flex items-start gap-2 text-sm text-white/50">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Paris, France</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-6 flex items-center gap-3">
                <a
                  href="https://www.linkedin.com/company/triggerflow/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-brand-primary"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Column 2: Produit */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                {t('columns.product')}
              </h3>
              <ul className="mt-4 space-y-3">
                {productLinks.map((link) => (
                  <li key={link.labelKey}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/50 transition-colors hover:text-white"
                    >
                      {t(link.labelKey)}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/tarifs"
                    className="text-sm text-white/50 transition-colors hover:text-white"
                  >
                    {t('product.pricing')}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/integrations"
                    className="text-sm text-white/50 transition-colors hover:text-white"
                  >
                    {t('product.integrations')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Solutions */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                {t('columns.solutions')}
              </h3>
              <ul className="mt-4 space-y-3">
                {solutionLinks.map((link) => (
                  <li key={link.labelKey}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/50 transition-colors hover:text-white"
                    >
                      {t(link.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Ressources */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                {t('columns.resources')}
              </h3>
              <ul className="mt-4 space-y-3">
                {resourceLinks.map((link) => (
                  <li key={link.labelKey}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/50 transition-colors hover:text-white"
                    >
                      {t(link.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Newsletter */}
              <div className="mt-8">
                <h4 className="text-sm font-semibold text-white">
                  {t('newsletter.title')}
                </h4>
                <NewsletterForm />
              </div>
            </div>

            {/* Column 5: Entreprise + Légal */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                {t('columns.company')}
              </h3>
              <ul className="mt-4 space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.labelKey}>
                    {link.isLink ? (
                      <Link
                        href={link.href}
                        className="text-sm text-white/50 transition-colors hover:text-white"
                      >
                        {t(link.labelKey)}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-sm text-white/50 transition-colors hover:text-white"
                      >
                        {t(link.labelKey)}
                      </a>
                    )}
                  </li>
                ))}
              </ul>

              <h3 className="mt-8 text-sm font-semibold uppercase tracking-wider text-white">
                {t('columns.legal')}
              </h3>
              <ul className="mt-4 space-y-3">
                {legalLinks.map((link) => (
                  <li key={link.labelKey}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/50 transition-colors hover:text-white"
                    >
                      {t(link.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-8 md:flex-row">
          <p className="text-sm text-white/50">
            {t('copyright', { year: currentYear })}
          </p>
          <div className="flex items-center gap-6 text-sm text-white/50">
            <span>{t('bottom.utelysSolution')}</span>
            <span className="hidden md:inline">•</span>
            <span>
              {t('bottom.designBy')}{' '}
              <a
                href="https://www.larampe.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white transition-colors hover:text-brand-primary"
              >
                La Rampe
              </a>
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function NewsletterForm() {
  const t = useTranslations('footer.newsletter');
  const tConsent = useTranslations('newsletter');
  const { email, setEmail, honeypot, setHoneypot, status, subscribe } = useNewsletter();
  const [consent, setConsent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) return;
    await subscribe('fr');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3">
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
          className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
          required
          disabled={status === 'loading' || status === 'success'}
        />
        <button
          type="submit"
          disabled={status === 'loading' || status === 'success' || !consent}
          className={cn(
            'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors',
            status === 'success'
              ? 'bg-green-500 text-white'
              : 'bg-brand-primary text-white hover:bg-brand-primary/90 disabled:opacity-50'
          )}
        >
          {status === 'success' ? (
            <CheckCircle className="h-4 w-4" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* RGPD consent */}
      <label className="mt-3 flex items-start gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/20 bg-white/5 text-brand-primary focus:ring-brand-primary"
        />
        <span className="text-xs text-white/40">
          {tConsent('consent')}{' '}
          <Link href="/politique-confidentialite" className="text-white/50 underline hover:text-white">
            {tConsent('privacyLink')}
          </Link>
        </span>
      </label>

      {/* Status messages */}
      {status === 'success' && (
        <p className="mt-2 text-xs text-green-400">{tConsent('success')}</p>
      )}
      {status === 'error' && (
        <p className="mt-2 text-xs text-red-400">{tConsent('error')}</p>
      )}
      {status === 'idle' && (
        <p className="mt-2 text-xs text-white/40">{t('disclaimer')}</p>
      )}
    </form>
  );
}

function Logo() {
  return (
    <Image
      src="/images/logo-white.webp"
      alt="TriggerFlow"
      width={160}
      height={40}
      className="h-8 w-auto"
    />
  );
}
