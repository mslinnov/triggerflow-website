'use client';

import { useTranslations } from 'next-intl';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import {
  Mail,
  Workflow,
  Users,
  ClipboardList,
  ShoppingBag,
  Star,
  BarChart3,
  MessageSquare,
  Smartphone,
  Send,
  ArrowRight,
  Check,
} from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Container, Badge } from '@/components/ui';
import { fadeInUp, defaultViewport } from '@/lib/animations';
import { WorkflowBuilderMockup } from '@/components/mockups';

// --- Animations ---

const columnStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const cardReveal: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

// --- Decorative Visuals ---

function ConcentricCircles({ className }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute ${className}`}>
      <div className="relative h-[160px] w-[160px]">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="absolute rounded-full border border-border-light"
            style={{ inset: `${i * 18}px` }}
          />
        ))}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-primary/8 p-2">
          <BarChart3 className="h-4 w-4 text-brand-primary" />
        </div>
      </div>
    </div>
  );
}

function ChannelIcons({ className }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute ${className}`}>
      <div className="flex items-center gap-5 opacity-40">
        <div className="rounded-lg bg-brand-primary/8 p-2 shadow-[var(--shadow-sm)]">
          <MessageSquare className="h-4 w-4 text-brand-primary" />
        </div>
        <div className="h-px w-8 bg-border-default" />
        <div className="rounded-lg bg-brand-primary/8 p-2 shadow-[var(--shadow-sm)]">
          <Smartphone className="h-4 w-4 text-brand-primary" />
        </div>
        <div className="h-px w-8 bg-border-default" />
        <div className="rounded-lg bg-brand-primary/8 p-2 shadow-[var(--shadow-sm)]">
          <Send className="h-4 w-4 text-brand-primary" />
        </div>
      </div>
    </div>
  );
}

function StarRating({ className }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute ${className}`}>
      <div className="flex flex-col gap-1.5 opacity-40">
        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} className="h-4 w-4 fill-brand-accent text-brand-accent" />
          ))}
          <span className="ml-1.5 text-xs font-semibold text-text-muted">4.9</span>
        </div>
        <div className="h-1.5 w-28 rounded-full bg-surface-tertiary">
          <div className="h-full w-[85%] rounded-full bg-brand-accent/40" />
        </div>
      </div>
    </div>
  );
}

function BigStat({ className }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute ${className}`}>
      <span className="text-4xl font-black tracking-tight text-brand-primary/10 lg:text-5xl">
        98%
      </span>
    </div>
  );
}

// --- Shared card text block ---

function CardContent({
  featureKey,
  icon: Icon,
  iconBg,
  iconColor,
  t,
  compact = false,
  href,
  highlightCount = 0,
}: {
  featureKey: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  iconColor: string;
  t: ReturnType<typeof useTranslations>;
  compact?: boolean;
  href: string;
  highlightCount?: number;
}) {
  if (compact) {
    return (
      <div className="relative z-10 p-3 lg:p-3.5">
        <div className="flex items-center gap-2">
          <div className={`shrink-0 inline-flex items-center justify-center rounded-lg p-1.5 ${iconBg}`}>
            <Icon className={`h-3.5 w-3.5 ${iconColor}`} />
          </div>
          <h3 className="text-sm font-bold text-text-primary">
            {t(`items.${featureKey}.title`)}
          </h3>
        </div>
        <div className="pl-[28px]">
          <p className="mt-0.5 text-xs leading-relaxed text-text-secondary">
            {t(`items.${featureKey}.description`)}
          </p>
          <Link href={href} className="mt-1.5 inline-flex items-center gap-1 text-xs font-medium text-brand-primary">
            {t('cta')}
            <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-10 flex flex-col p-3.5 lg:p-4">
      <div className="mb-1.5 flex items-center gap-2">
        <div className={`shrink-0 inline-flex items-center justify-center rounded-lg p-1.5 ${iconBg}`}>
          <Icon className={`h-4 w-4 ${iconColor}`} />
        </div>
        <h3 className="text-sm font-bold text-text-primary lg:text-base">
          {t(`items.${featureKey}.title`)}
        </h3>
      </div>
      <p className="text-xs leading-relaxed text-text-secondary">
        {t(`items.${featureKey}.description`)}
      </p>
      {highlightCount > 0 && (
        <div className="mt-2 flex flex-col gap-1">
          {Array.from({ length: highlightCount }, (_, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <Check className="h-3 w-3 shrink-0 text-brand-primary" />
              <span className="text-xs text-text-secondary">
                {t(`items.${featureKey}.highlights.${i}`)}
              </span>
            </div>
          ))}
        </div>
      )}
      <Link href={href} className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-brand-primary">
        {t('cta')}
        <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}

// --- Main Section ---

export function FeaturesBento() {
  const t = useTranslations('featuresBento');
  const prefersReducedMotion = useReducedMotion();

  const hover = prefersReducedMotion
    ? undefined
    : { y: -4, transition: { duration: 0.25, ease: 'easeOut' as const } };

  return (
    <section className="bg-white py-16 md:py-24">
      <Container>
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="mx-auto mb-10 max-w-2xl text-center"
        >
          <Badge variant="accent" className="mb-3">
            {t('badge')}
          </Badge>
          <h2 className="mb-3 font-serif text-3xl font-bold tracking-tight text-text-primary md:text-4xl lg:text-[2.75rem]">
            {t('title')}
          </h2>
          <p className="text-lg text-text-secondary">{t('subtitle')}</p>
        </motion.div>

        {/* Bento — 3 flex columns */}
        <div className="flex flex-col gap-2.5 md:flex-row md:min-h-[340px] lg:min-h-[380px] lg:gap-3">
          {/* ─── LEFT COLUMN ─── */}
          <motion.div
            variants={columnStagger}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="flex flex-col gap-2.5 md:flex-[1] lg:gap-3"
          >
            {/* Ventes additionnelles — top ~42% */}
            <motion.div
              variants={cardReveal}
              whileHover={hover}
              className="group relative overflow-hidden rounded-2xl border border-border-light bg-white shadow-[var(--shadow-md)] transition-shadow duration-300 hover:shadow-[var(--shadow-lg)] md:flex-[42]"
            >
              <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(ellipse at 0% 0%, rgba(255,207,162,0.06), transparent 55%)' }} />
              <CardContent
                featureKey="upsell"
                icon={ShoppingBag}
                iconBg="bg-brand-accent/15"
                iconColor="text-brand-accent"
                t={t}
                href="/produit/ventes-additionnelles"
                highlightCount={2}
              />
            </motion.div>

            {/* Communication — bottom ~58% */}
            <motion.div
              variants={cardReveal}
              whileHover={hover}
              className="group relative overflow-hidden rounded-2xl border border-border-light bg-white shadow-[var(--shadow-md)] transition-shadow duration-300 hover:shadow-[var(--shadow-lg)] md:flex-[58]"
            >
              <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(ellipse at 100% 100%, rgba(0,111,104,0.04), transparent 60%)' }} />
              <CardContent
                featureKey="communication"
                icon={Mail}
                iconBg="bg-brand-primary/8"
                iconColor="text-brand-primary"
                t={t}
                href="/produit/hub-messagerie"
                highlightCount={2}
              />
              <ChannelIcons className="bottom-3.5 left-4 lg:bottom-4 lg:left-5" />
            </motion.div>
          </motion.div>

          {/* ─── CENTER COLUMN ─── */}
          <motion.div
            variants={columnStagger}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="flex flex-col gap-2.5 md:flex-[1.1] lg:gap-3"
          >
            {/* CRM — top compact */}
            <motion.div
              variants={cardReveal}
              whileHover={hover}
              className="group relative overflow-hidden rounded-2xl border border-border-light bg-white shadow-[var(--shadow-md)] transition-shadow duration-300 hover:shadow-[var(--shadow-lg)] md:flex-[12]"
            >
              <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(255,207,162,0.05), transparent 55%)' }} />
              <CardContent
                featureKey="crm"
                icon={Users}
                iconBg="bg-brand-accent/10"
                iconColor="text-brand-accent"
                t={t}
                compact
                href="/produit/crm"
              />
            </motion.div>

            {/* HERO — Workflows: text first, then mockup */}
            <motion.div
              variants={cardReveal}
              whileHover={hover}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-border-light bg-white shadow-[var(--shadow-md)] transition-shadow duration-300 hover:shadow-[var(--shadow-lg)] md:flex-[48]"
            >
              <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(ellipse at 85% 15%, rgba(0,111,104,0.04), transparent 50%), radial-gradient(ellipse at 15% 85%, rgba(255,207,162,0.04), transparent 50%)' }} />
              {/* Text — prioritized */}
              <div className="relative z-10 px-3.5 pt-3.5 pb-1 lg:px-4 lg:pt-4 lg:pb-1.5">
                <div className="mb-1.5 flex items-center gap-2">
                  <div className="shrink-0 inline-flex items-center justify-center rounded-lg bg-brand-primary/8 p-1.5">
                    <Workflow className="h-4 w-4 text-brand-primary" />
                  </div>
                  <h3 className="text-sm font-bold text-text-primary lg:text-base">
                    {t('items.automation.title')}
                  </h3>
                </div>
                <p className="text-xs leading-relaxed text-text-secondary">
                  {t('items.automation.description')}
                </p>
                <Link href="/produit/automatisations" className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-brand-primary">
                  {t('cta')}
                  <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              </div>
              {/* Mockup — capped height, scaled down */}
              <div className="relative flex-1 min-h-0 max-h-[220px] lg:max-h-[260px] px-3 pb-0">
                <div className="relative h-full overflow-hidden rounded-t-lg bg-white shadow-lg ring-1 ring-zinc-900/5">
                  <div className="pointer-events-none overflow-hidden origin-top scale-[0.85]">
                    <WorkflowBuilderMockup />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Analytics — bottom compact with circles */}
            <motion.div
              variants={cardReveal}
              whileHover={hover}
              className="group relative overflow-hidden rounded-2xl border border-border-light bg-white shadow-[var(--shadow-md)] transition-shadow duration-300 hover:shadow-[var(--shadow-lg)] md:flex-[18]"
            >
              <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(ellipse at 100% 50%, rgba(0,111,104,0.03), transparent 55%)' }} />
              <ConcentricCircles className="right-[-30px] top-1/2 -translate-y-1/2" />
              <CardContent
                featureKey="analytics"
                icon={BarChart3}
                iconBg="bg-brand-primary/8"
                iconColor="text-brand-primary"
                t={t}
                compact
                href="/produit/analytics"
              />
            </motion.div>
          </motion.div>

          {/* ─── RIGHT COLUMN ─── */}
          <motion.div
            variants={columnStagger}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="flex flex-col gap-2.5 md:flex-[1] lg:gap-3"
          >
            {/* Forms — top ~58% */}
            <motion.div
              variants={cardReveal}
              whileHover={hover}
              className="group relative overflow-hidden rounded-2xl border border-border-light bg-white shadow-[var(--shadow-md)] transition-shadow duration-300 hover:shadow-[var(--shadow-lg)] md:flex-[58]"
            >
              <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(ellipse at 100% 0%, rgba(0,111,104,0.04), transparent 55%)' }} />
              <CardContent
                featureKey="forms"
                icon={ClipboardList}
                iconBg="bg-brand-primary/8"
                iconColor="text-brand-primary"
                t={t}
                href="/produit/formulaires"
                highlightCount={2}
              />
              <BigStat className="bottom-3 right-4 lg:bottom-4 lg:right-5" />
            </motion.div>

            {/* Reviews — bottom ~42% */}
            <motion.div
              variants={cardReveal}
              whileHover={hover}
              className="group relative overflow-hidden rounded-2xl border border-border-light bg-white shadow-[var(--shadow-md)] transition-shadow duration-300 hover:shadow-[var(--shadow-lg)] md:flex-[42]"
            >
              <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(ellipse at 0% 100%, rgba(0,111,104,0.03), transparent 50%)' }} />
              <CardContent
                featureKey="reviews"
                icon={Star}
                iconBg="bg-brand-accent/15"
                iconColor="text-brand-accent"
                t={t}
                href="/produit/avis"
                highlightCount={2}
              />
              <StarRating className="bottom-3 right-4 lg:bottom-4 lg:right-5" />
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
