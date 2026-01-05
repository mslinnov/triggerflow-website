'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { useState } from 'react';
import { Linkedin, Mail, Phone, MapPin, ArrowRight, Send, CheckCircle } from 'lucide-react';
import { Container, ButtonLink } from '@/components/ui';
import { cn } from '@/lib/utils';

// Product links matching mega menu
const productLinks = [
  { href: '#features', labelKey: 'product.communication' },
  { href: '#features', labelKey: 'product.automation' },
  { href: '#features', labelKey: 'product.marketing' },
  { href: '#features', labelKey: 'product.tools' },
  { href: '#features', labelKey: 'product.reputation' },
] as const;

// Solutions links
const solutionLinks = [
  { href: '#solutions', labelKey: 'solutions.independentHotel' },
  { href: '#solutions', labelKey: 'solutions.hotelGroup' },
  { href: '#solutions', labelKey: 'solutions.residence' },
  { href: '#solutions', labelKey: 'solutions.camping' },
] as const;

// Resources links (using anchor tags as these pages may not exist yet)
const resourceLinks = [
  { href: '/blog', labelKey: 'resources.blog' },
  { href: '/cas-clients', labelKey: 'resources.caseStudies' },
  { href: '/guides', labelKey: 'resources.guides' },
  { href: 'https://help.trigger-flow.com', labelKey: 'resources.helpCenter', external: true },
];

// Company links (using anchor tags as these pages may not exist yet)
const companyLinks = [
  { href: '/a-propos', labelKey: 'company.about' },
  { href: '/contact', labelKey: 'company.contact' },
  { href: '/carrieres', labelKey: 'company.careers' },
];

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
      {/* CTA Banner */}
      <div className="bg-gradient-to-r from-brand-primary to-brand-primary/80">
        <Container>
          <div className="flex flex-col items-center justify-between gap-6 py-10 md:flex-row md:py-12">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-white md:text-3xl">
                {t('cta.title')}
              </h3>
              <p className="mt-2 text-white/80">
                {t('cta.subtitle')}
              </p>
            </div>
            <ButtonLink
              href="https://app.lemcal.com/@trigger-flow/demo"
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              size="lg"
              className="shrink-0 bg-white text-brand-primary hover:bg-zinc-100"
            >
              {t('cta.button')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </ButtonLink>
          </div>
        </Container>
      </div>

      {/* Main Footer Content */}
      <Container>
        <div className="py-12 md:py-16">
          {/* 5-Column Grid */}
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
            {/* Column 1: Logo + Contact */}
            <div className="lg:col-span-1">
              <Logo />
              <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                {t('description')}
              </p>

              {/* Contact Info */}
              <div className="mt-6 space-y-3">
                <a
                  href="mailto:contact@trigger-flow.com"
                  className="flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4" />
                  contact@trigger-flow.com
                </a>
                <a
                  href="tel:+33123456789"
                  className="flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4" />
                  +33 1 23 45 67 89
                </a>
                <div className="flex items-start gap-2 text-sm text-zinc-400">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
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
                    <a
                      href={link.href}
                      className="text-sm text-zinc-400 transition-colors hover:text-white"
                    >
                      {t(link.labelKey)}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="#pricing"
                    className="text-sm text-zinc-400 transition-colors hover:text-white"
                  >
                    {t('product.pricing')}
                  </a>
                </li>
                <li>
                  <a
                    href="#integrations"
                    className="text-sm text-zinc-400 transition-colors hover:text-white"
                  >
                    {t('product.integrations')}
                  </a>
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
                    <a
                      href={link.href}
                      className="text-sm text-zinc-400 transition-colors hover:text-white"
                    >
                      {t(link.labelKey)}
                    </a>
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
                    <a
                      href={link.href}
                      {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="text-sm text-zinc-400 transition-colors hover:text-white"
                    >
                      {t(link.labelKey)}
                    </a>
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
                    <a
                      href={link.href}
                      className="text-sm text-zinc-400 transition-colors hover:text-white"
                    >
                      {t(link.labelKey)}
                    </a>
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
                      className="text-sm text-zinc-400 transition-colors hover:text-white"
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
          <p className="text-sm text-zinc-400">
            {t('copyright', { year: currentYear })}
          </p>
          <div className="flex items-center gap-6 text-sm text-zinc-400">
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
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Redirect to Brevo/Sibforms newsletter
    window.open(
      `https://15671da4.sibforms.com/serve/MUIFAOXnAHo2WSOP6csFPh9uhaHk6AD1ZdDIJgBiOKzHrqB40POPdPX0eiNDYqSG5TYkn6g7xqGHokwUEvYIQjtONDtazMnGFAi17szMqSfvy_fnmQ_Clsi8SRtsspUTWVFLPFD_iiuyjqXIu0TiSL7zr3LRuQWB9wMIHqk78xtN5XIDmwiHq7JxAHEnTJDQOBDlvCbImMJiZxrc`,
      '_blank'
    );
    setStatus('success');
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3">
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('placeholder')}
          className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
          required
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className={cn(
            'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors',
            status === 'success'
              ? 'bg-green-500 text-white'
              : 'bg-brand-primary text-white hover:bg-brand-primary/90'
          )}
        >
          {status === 'success' ? (
            <CheckCircle className="h-4 w-4" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </button>
      </div>
      <p className="mt-2 text-xs text-zinc-500">
        {t('disclaimer')}
      </p>
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
