'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type Variants,
} from 'framer-motion';
import {
  Mail,
  MessageSquare,
  Smartphone,
  ShoppingBag,
  Headphones,
  Star,
  ClipboardList,
  Check,
} from 'lucide-react';
import { Container, Badge } from '@/components/ui';
import { fadeInUp, defaultViewport } from '@/lib/animations';
import type { LucideIcon } from 'lucide-react';

// --- Types ---

interface PhaseConfig {
  key: 'preStay' | 'stay' | 'postStay';
  number: string;
  pillClass: string;
  gradientStyle: string;
  icons: LucideIcon[];
  highlightCount: number;
  iconBg: string;
  checkColor: string;
}

// --- Data ---

const phases: PhaseConfig[] = [
  {
    key: 'preStay',
    number: '01',
    pillClass: 'bg-brand-primary/10 text-brand-primary',
    gradientStyle: 'radial-gradient(ellipse at 100% 0%, rgba(0,111,104,0.04), transparent 60%)',
    icons: [Mail, Smartphone, ShoppingBag],
    highlightCount: 4,
    iconBg: 'bg-brand-primary/8',
    checkColor: 'text-brand-primary',
  },
  {
    key: 'stay',
    number: '02',
    pillClass: 'bg-emerald-500/10 text-emerald-600',
    gradientStyle: 'radial-gradient(ellipse at 50% 100%, rgba(16,185,129,0.04), transparent 60%)',
    icons: [MessageSquare, Headphones, ClipboardList],
    highlightCount: 3,
    iconBg: 'bg-emerald-500/8',
    checkColor: 'text-emerald-500',
  },
  {
    key: 'postStay',
    number: '03',
    pillClass: 'bg-brand-accent/30 text-brand-accent',
    gradientStyle: 'radial-gradient(ellipse at 0% 100%, rgba(255,207,162,0.08), transparent 60%)',
    icons: [Star, ClipboardList, Mail],
    highlightCount: 4,
    iconBg: 'bg-brand-accent/15',
    checkColor: 'text-amber-600',
  },
];

// --- Animations ---

const cardReveal: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerCards: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

// --- Sub-components ---

function HighlightItem({
  text,
  checkColor,
}: {
  text: string;
  checkColor: string;
}) {
  return (
    <li className="flex items-start gap-2.5">
      <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-surface-tertiary ${checkColor}`}>
        <Check className="h-3 w-3" strokeWidth={2.5} />
      </span>
      <span className="text-sm font-medium text-text-secondary">{text}</span>
    </li>
  );
}

function PhaseCard({
  phase,
  index,
  prefersReducedMotion,
  t,
}: {
  phase: PhaseConfig;
  index: number;
  prefersReducedMotion: boolean | null;
  t: ReturnType<typeof useTranslations>;
}) {
  const staggerOffset =
    index === 0 ? '' : index === 1 ? 'md:-translate-y-4' : 'md:translate-y-2';

  const highlights: string[] = [];
  for (let i = 0; i < phase.highlightCount; i++) {
    highlights.push(t(`phases.${phase.key}.highlights.${i}`));
  }

  return (
    <motion.div
      variants={cardReveal}
      whileHover={prefersReducedMotion ? undefined : { y: -4 }}
      className={`group relative overflow-hidden rounded-2xl border border-border-light bg-white p-8 shadow-[var(--shadow-md)] transition-shadow duration-300 hover:shadow-[var(--shadow-lg)] lg:p-10 ${staggerOffset}`}
    >
      {/* Subtle colored gradient tint */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: phase.gradientStyle }}
      />

      {/* Decorative large number */}
      <span className="pointer-events-none absolute right-4 top-2 select-none font-serif text-[120px] font-bold leading-none text-brand-primary/[0.05] lg:text-[140px]">
        {phase.number}
      </span>

      <div className="relative">
        {/* Phase label pill */}
        <span
          className={`inline-flex rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.15em] ${phase.pillClass}`}
        >
          {t(`phases.${phase.key}.label`)}
        </span>

        {/* Channel icons row */}
        <div className="mt-4 flex gap-2">
          {phase.icons.map((Icon, i) => (
            <div
              key={i}
              className={`flex h-9 w-9 items-center justify-center rounded-full ${phase.iconBg}`}
            >
              <Icon className="h-4 w-4 text-text-secondary" />
            </div>
          ))}
        </div>

        {/* Phase title */}
        <h3 className="mt-5 font-serif text-xl font-bold text-text-primary lg:text-2xl">
          {t(`phases.${phase.key}.title`)}
        </h3>

        {/* Description */}
        <p className="mt-3 text-sm leading-relaxed text-text-secondary lg:text-[15px]">
          {t(`phases.${phase.key}.description`)}
        </p>

        {/* Highlights */}
        <ul className="mt-6 space-y-3">
          {highlights.map((text, i) => (
            <HighlightItem key={i} text={text} checkColor={phase.checkColor} />
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

function JourneyConnector({
  scrollYProgress,
  prefersReducedMotion,
}: {
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
  prefersReducedMotion: boolean | null;
}) {
  const pathLength = useTransform(scrollYProgress, [0.1, 0.7], [0, 1]);

  return (
    <svg
      className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
      viewBox="0 0 900 60"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="connector-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--color-brand-primary)" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#10b981" stopOpacity="0.3" />
          <stop offset="100%" stopColor="var(--color-brand-accent)" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="connector-gradient-active" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--color-brand-primary)" />
          <stop offset="50%" stopColor="#10b981" />
          <stop offset="100%" stopColor="var(--color-brand-accent)" />
        </linearGradient>
      </defs>
      {/* Background dashed path */}
      <path
        d="M 100 30 C 250 30, 250 30, 450 30 C 650 30, 650 30, 800 30"
        stroke="url(#connector-gradient)"
        strokeWidth="2"
        strokeDasharray="6 4"
        fill="none"
      />
      {/* Animated fill path */}
      <motion.path
        d="M 100 30 C 250 30, 250 30, 450 30 C 650 30, 650 30, 800 30"
        stroke="url(#connector-gradient-active)"
        strokeWidth="2"
        strokeDasharray="6 4"
        fill="none"
        style={{
          pathLength: prefersReducedMotion ? 1 : pathLength,
        }}
      />
    </svg>
  );
}

// --- Mobile connector between cards ---

function MobileConnector() {
  return (
    <div className="flex flex-col items-center gap-1 py-1 md:hidden">
      <div className="h-6 w-px border-l border-dashed border-brand-primary/20" />
      <div className="h-1.5 w-1.5 rounded-full bg-brand-primary/20" />
      <div className="h-6 w-px border-l border-dashed border-brand-primary/20" />
    </div>
  );
}

// --- Main ---

export function JourneyTimeline() {
  const t = useTranslations('journeyTimeline');
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-surface-secondary py-20 md:py-28"
    >
      {/* Subtle radial background overlay */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[800px] w-[1200px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-primary/[0.02] blur-3xl" />
      </div>

      <Container>
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="mx-auto mb-16 max-w-2xl text-center md:mb-20"
        >
          <Badge variant="accent">{t('badge')}</Badge>
          <h2 className="mb-4 mt-4 font-serif text-3xl font-bold tracking-tight text-text-primary md:text-4xl lg:text-[2.75rem]">
            {t('title')}
          </h2>
          <p className="text-lg text-text-secondary">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Cards grid with connector overlay */}
        <div className="relative">
          {/* SVG connector — desktop only, positioned between cards */}
          <div className="pointer-events-none absolute inset-x-0 top-1/2 z-10 hidden -translate-y-1/2 md:block">
            <JourneyConnector
              scrollYProgress={scrollYProgress}
              prefersReducedMotion={prefersReducedMotion}
            />
          </div>

          {/* Desktop: 3-column grid */}
          <motion.div
            variants={staggerCards}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="hidden gap-6 md:grid md:grid-cols-3 lg:gap-8"
          >
            {phases.map((phase, index) => (
              <PhaseCard
                key={phase.key}
                phase={phase}
                index={index}
                prefersReducedMotion={prefersReducedMotion}
                t={t}
              />
            ))}
          </motion.div>

          {/* Mobile: stacked cards with connectors */}
          <motion.div
            variants={staggerCards}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="flex flex-col md:hidden"
          >
            {phases.map((phase, index) => (
              <div key={phase.key}>
                {index > 0 && <MobileConnector />}
                <PhaseCard
                  phase={phase}
                  index={index}
                  prefersReducedMotion={prefersReducedMotion}
                  t={t}
                />
              </div>
            ))}
          </motion.div>
        </div>

      </Container>
    </section>
  );
}
