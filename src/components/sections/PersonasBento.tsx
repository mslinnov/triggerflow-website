'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui';
import { fadeInUp, defaultViewport } from '@/lib/animations';

interface CtaLink {
  label: string;
  href: string;
}

function PersonaCard({
  title,
  description,
  imageSrc,
  imagePosition = 'object-center',
  gradient,
  ctaLinks,
  className = '',
}: {
  title: string;
  description: string;
  imageSrc: string;
  imagePosition?: string;
  gradient?: string;
  ctaLinks: CtaLink[];
  className?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`group relative overflow-hidden rounded-[20px] md:rounded-[32px] ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background image */}
      <Image
        src={imageSrc}
        alt={title}
        fill
        className={`object-cover transition-transform duration-700 group-hover:scale-105 ${imagePosition}`}
        sizes="(max-width: 768px) 100vw, 33vw"
      />

      {/* Color tint for screenshot backgrounds */}
      {gradient && (
        <div
          className={`absolute inset-0 bg-gradient-to-br ${gradient} mix-blend-multiply`}
        />
      )}

      {/* Gradient overlay — lighter top, darker bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/70" />

      {/* Content: title TOP, description/CTAs BOTTOM */}
      <div className="relative z-10 flex h-full flex-col justify-between p-5 md:p-7">
        <h3 className="text-2xl font-bold leading-[1.1] text-white sm:text-3xl md:text-4xl">
          {title}
        </h3>

        {/* Bottom area: description ↔ CTA pills swap on hover */}
        <div className="min-h-[48px]">
          <AnimatePresence mode="wait">
            {!isHovered ? (
              <motion.p
                key="desc"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-sm leading-relaxed text-white/60"
              >
                {description}
              </motion.p>
            ) : (
              <motion.div
                key="ctas"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.25 }}
                className="flex flex-wrap gap-2"
              >
                {ctaLinks.map((link) => (
                  <Link
                    key={link.href + link.label}
                    href={link.href}
                    className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/25"
                  >
                    {link.label}
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export function PersonasBento() {
  const t = useTranslations('personasBento');
  const locale = useLocale();

  const frontDeskLinks: CtaLink[] = [
    { label: t('personas.frontDesk.ctas.messaging'), href: `/${locale}/produit/hub-messagerie` },
    { label: t('personas.frontDesk.ctas.checkin'), href: `/${locale}/produit/formulaires` },
    { label: t('personas.frontDesk.ctas.sms'), href: `/${locale}/produit/automatisations` },
  ];

  const marketingLinks: CtaLink[] = [
    { label: t('personas.marketing.ctas.journeys'), href: `/${locale}/produit/automatisations` },
    { label: t('personas.marketing.ctas.email'), href: `/${locale}/produit/hub-messagerie` },
    { label: t('personas.marketing.ctas.campaigns'), href: `/${locale}/produit/ventes-additionnelles` },
  ];

  const directionLinks: CtaLink[] = [
    { label: t('personas.direction.ctas.analytics'), href: `/${locale}/produit/analytics` },
    { label: t('personas.direction.ctas.crm'), href: `/${locale}/produit/crm` },
    { label: t('personas.direction.ctas.reports'), href: `/${locale}/produit/analytics` },
  ];

  return (
    <section className="bg-surface-secondary py-14 md:py-20">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          viewport={defaultViewport}
        >
          {/* Bento Grid — Bookboost proportions: 760px total, 2 cols, 16px gap */}
          <div className="grid grid-cols-1 gap-3 md:h-[760px] md:grid-cols-2 md:gap-4">
            {/* ═══ LEFT COLUMN — 2fr / 1fr split ═══ */}
            <div className="grid gap-3 md:grid-rows-[2fr_1fr] md:gap-4">
              {/* Product Screenshot with browser chrome */}
              <div className="relative overflow-hidden rounded-[20px] border border-border-default bg-white shadow-sm md:rounded-[32px]">
                <div className="flex items-center gap-2 border-b border-border-light bg-surface-tertiary/80 px-4 py-2.5">
                  <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-border-default" />
                    <div className="h-2.5 w-2.5 rounded-full bg-border-default" />
                    <div className="h-2.5 w-2.5 rounded-full bg-border-default" />
                  </div>
                  <div className="ml-2 flex-1 rounded-md bg-surface-tertiary px-3 py-1 text-xs text-text-muted">
                    app.trigger-flow.com
                  </div>
                </div>
                <div className="relative h-[250px] md:h-full">
                  <Image
                    src="/images/homepage/personas-dashboard.webp"
                    alt="TriggerFlow — Hub de messagerie"
                    fill
                    className="object-cover object-left-top"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>

              {/* Directeurs d'hôtel */}
              <PersonaCard
                title={t('personas.direction.title')}
                description={t('personas.direction.description')}
                imageSrc="/images/homepage/persona-direction_1.webp"
                imagePosition="object-top"
                ctaLinks={directionLinks}
                className="min-h-[180px]"
              />
            </div>

            {/* ═══ RIGHT COLUMN — sub-grid / CTA ═══ */}
            <div className="grid gap-3 md:grid-rows-[1fr_180px] md:gap-4">
              {/* Nested 2×2 sub-grid — 1.84fr / 1fr rows */}
              <div className="grid grid-cols-2 gap-3 md:grid-rows-[1.84fr_1fr] md:gap-4">
                {/* Équipes réception */}
                <PersonaCard
                  title={t('personas.frontDesk.title')}
                  description={t('personas.frontDesk.description')}
                  imageSrc="/images/homepage/persona-reception_1.webp"
                  gradient="from-[#002B28]/70 to-[#006F68]/50"
                  ctaLinks={frontDeskLinks}
                  className="min-h-[180px]"
                />

                {/* Responsables Marketing — spans 2 rows */}
                <PersonaCard
                  title={t('personas.marketing.title')}
                  description={t('personas.marketing.description')}
                  imageSrc="/images/homepage/persona-marketing_1.webp"
                  gradient="from-[#006F68]/60 to-[#002B28]/70"
                  ctaLinks={marketingLinks}
                  className="row-span-2 min-h-[180px]"
                />

                {/* Social proof — col 1, row 2 */}
                <div className="flex flex-col items-start justify-center rounded-[20px] bg-brand-dark p-5 md:rounded-[32px] md:p-6">
                  <div className="mb-2 flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-brand-accent text-brand-accent"
                      />
                    ))}
                  </div>
                  <div className="text-3xl font-bold text-white md:text-5xl">
                    9.4
                    <span className="text-base font-normal text-white/30 md:text-lg">
                      /10
                    </span>
                  </div>
                  <div className="mt-1 text-sm text-white/40">
                    {t('socialProof')}
                  </div>
                </div>
              </div>

              {/* CTA card */}
              <a
                href="https://app.lemcal.com/@trigger-flow/demo"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-[20px] bg-surface-tertiary p-6 transition-colors hover:bg-surface-tertiary md:rounded-[32px] md:p-8"
              >
                <span className="text-lg font-semibold text-text-primary md:text-2xl">
                  {t('cta')}
                </span>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-primary text-white transition-transform group-hover:translate-x-1">
                  <ArrowRight className="h-5 w-5" />
                </div>
              </a>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
