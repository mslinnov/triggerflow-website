'use client';

import { useState, useEffect, useCallback, useRef, type ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useAnimationControls,
} from 'framer-motion';
import { type LucideIcon, ArrowRight } from 'lucide-react';
import { Container, Badge } from '@/components/ui';
import { fadeInUp, defaultViewport } from '@/lib/animations';
import { cn } from '@/lib/utils';

export interface TabConfig {
  key: string;
  icon: LucideIcon;
  mockup: ReactNode;
}

/** Direct data to bypass translations — title, description per tab + header */
export interface FeaturesTabbedDirectData {
  badge: string;
  title: string;
  subtitle: string;
  cta: string;
  items: Record<string, { title: string; description: string }>;
}

interface FeaturesTabbedProps {
  translationNamespace?: string;
  directData?: FeaturesTabbedDirectData;
  tabs: TabConfig[];
  inverted?: boolean;
  autoPlayInterval?: number;
  className?: string;
}

const DEMO_URL = 'https://app.lemcal.com/@trigger-flow/demo';
const DEFAULT_INTERVAL = 5500;

// Accent colors per tab position — teal, accent-warm, dark, light-teal
const TAB_ACCENTS = [
  {
    icon: 'bg-brand-primary/10',
    iconColor: 'text-brand-primary',
    glow: 'rgba(0,111,104,0.08)',
    bar: 'bg-brand-primary',
    number: 'text-brand-primary/15',
  },
  {
    icon: 'bg-brand-accent/20',
    iconColor: 'text-brand-dark',
    glow: 'rgba(255,207,162,0.12)',
    bar: 'bg-brand-primary',
    number: 'text-brand-accent/20',
  },
  {
    icon: 'bg-brand-dark/8',
    iconColor: 'text-brand-dark',
    glow: 'rgba(0,43,40,0.06)',
    bar: 'bg-brand-primary',
    number: 'text-brand-dark/10',
  },
  {
    icon: 'bg-brand-primary/8',
    iconColor: 'text-brand-primary',
    glow: 'rgba(0,111,104,0.06)',
    bar: 'bg-brand-primary',
    number: 'text-brand-primary/10',
  },
];

export function FeaturesTabbed({
  translationNamespace,
  directData,
  tabs,
  inverted = false,
  autoPlayInterval = DEFAULT_INTERVAL,
  className,
}: FeaturesTabbedProps) {
  // Use translations if namespace provided, otherwise use directData
  const tRaw = useTranslations(translationNamespace || 'featuresTabbed1');
  const getText = useCallback((key: string) => {
    if (directData) {
      // Resolve dotted keys like "items.communication.title"
      const parts = key.split('.');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let val: any = directData;
      for (const p of parts) { val = val?.[p]; }
      return typeof val === 'string' ? val : key;
    }
    return tRaw(key);
  }, [directData, tRaw]);
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const progressControls = useAnimationControls();

  const tabCount = tabs.length;

  // Track elapsed time so pause/resume works seamlessly
  const elapsedRef = useRef(0);
  const startTimeRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const scheduleNext = useCallback(
    (remaining: number) => {
      clearTimer();
      startTimeRef.current = Date.now();
      const fraction = 1 - elapsedRef.current / autoPlayInterval;

      if (!prefersReducedMotion) {
        progressControls.set({ scaleX: 1 - fraction });
        progressControls.start({
          scaleX: 1,
          transition: { duration: remaining / 1000, ease: 'linear' },
        });
      }

      timerRef.current = setTimeout(() => {
        elapsedRef.current = 0;
        setActiveIndex((prev) => (prev + 1) % tabCount);
      }, remaining);
    },
    [autoPlayInterval, tabCount, progressControls, prefersReducedMotion, clearTimer],
  );

  const goToTab = useCallback(
    (index: number) => {
      clearTimer();
      progressControls.stop();
      elapsedRef.current = 0;
      setActiveIndex(index);
    },
    [progressControls, clearTimer],
  );

  // Start / pause / resume auto-play
  useEffect(() => {
    if (prefersReducedMotion) return;

    if (isPaused) {
      elapsedRef.current += Date.now() - startTimeRef.current;
      clearTimer();
      progressControls.stop();
      return;
    }

    const remaining = autoPlayInterval - elapsedRef.current;
    scheduleNext(remaining);

    return () => {
      clearTimer();
      progressControls.stop();
    };
  }, [isPaused, prefersReducedMotion, activeIndex, autoPlayInterval, scheduleNext, clearTimer, progressControls]);

  // Reset elapsed when tab changes
  useEffect(() => {
    elapsedRef.current = 0;
  }, [activeIndex]);

  const activeTab = tabs[activeIndex];
  const activeAccent = TAB_ACCENTS[activeIndex % TAB_ACCENTS.length];

  return (
    <section className={cn('relative overflow-hidden py-16 md:py-24', className)}>
      {/* Decorative background glows */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: inverted
            ? 'radial-gradient(ellipse at 15% 20%, rgba(0,111,104,0.05), transparent 55%), radial-gradient(ellipse at 85% 80%, rgba(255,207,162,0.06), transparent 50%)'
            : 'radial-gradient(ellipse at 80% 15%, rgba(0,111,104,0.06), transparent 55%), radial-gradient(ellipse at 20% 85%, rgba(255,207,162,0.05), transparent 50%)',
        }}
      />
      {/* Subtle grid texture */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]" />

      <Container className="relative">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          viewport={defaultViewport}
          className="mb-12 text-center md:mb-16"
        >
          <Badge variant="accent" className="mb-4">
            {getText('badge')}
          </Badge>
          <h2 className="font-serif text-3xl font-bold text-text-primary md:text-4xl lg:text-[2.75rem]">
            {getText('title')}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary">
            {getText('subtitle')}
          </p>
        </motion.div>

        {/* Tabs + Mockup */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          viewport={defaultViewport}
          className={cn(
            'flex flex-col items-start gap-8 lg:gap-12',
            inverted ? 'lg:flex-row-reverse' : 'lg:flex-row',
          )}
        >
          {/* Tab list */}
          <div className="w-full lg:w-[40%]">
            <div className="flex flex-col">
              {tabs.map((tab, index) => {
                const isActive = index === activeIndex;
                const Icon = tab.icon;
                const accent = TAB_ACCENTS[index % TAB_ACCENTS.length];

                return (
                  <button
                    key={tab.key}
                    onClick={() => goToTab(index)}
                    className={cn(
                      'group relative w-full cursor-pointer text-left transition-all duration-300',
                      index < tabCount - 1
                        && !isActive
                        && index !== activeIndex - 1
                        && 'border-b border-border-light',
                    )}
                  >
                    {/* Active tab background highlight */}
                    {isActive && (
                      <motion.div
                        layoutId={`tab-bg-${translationNamespace}`}
                        className="absolute inset-0 rounded-xl border border-border-light bg-white shadow-[var(--shadow-md)]"
                        style={{
                          background: `linear-gradient(135deg, white 60%, ${accent.glow})`,
                        }}
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}

                    <div className="relative z-10 px-4 py-4 lg:py-5">
                      {/* Title row */}
                      <div className="flex items-center gap-3">
                        {/* Step number */}
                        <span
                          className={cn(
                            'text-[0.65rem] font-bold tabular-nums transition-colors duration-200',
                            isActive ? 'text-text-muted' : 'text-text-muted/50',
                          )}
                        >
                          0{index + 1}
                        </span>
                        {/* Icon */}
                        <div
                          className={cn(
                            'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-all duration-300',
                            isActive
                              ? accent.icon
                              : 'bg-surface-secondary group-hover:bg-brand-primary/5',
                          )}
                        >
                          <Icon
                            className={cn(
                              'h-[18px] w-[18px] transition-colors duration-200',
                              isActive
                                ? accent.iconColor
                                : 'text-text-muted group-hover:text-text-secondary',
                            )}
                          />
                        </div>
                        {/* Title */}
                        <span
                          className={cn(
                            'text-sm font-semibold transition-colors duration-200 lg:text-base',
                            isActive
                              ? 'font-bold text-text-primary'
                              : 'text-text-muted group-hover:text-text-secondary',
                          )}
                        >
                          {getText(`items.${tab.key}.title`)}
                        </span>
                      </div>

                      {/* Description (expand/collapse) */}
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                            onMouseEnter={() => setIsPaused(true)}
                            onMouseLeave={() => setIsPaused(false)}
                          >
                            <p className="mt-2 pl-[4.25rem] text-sm leading-relaxed text-text-secondary">
                              {getText(`items.${tab.key}.description`)}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Progress bar */}
                    {isActive && (
                      <div className="relative z-10 mx-4 mb-1">
                        <div className="h-[3px] rounded-full bg-border-light">
                          <motion.div
                            className={cn('h-full origin-left rounded-full', accent.bar)}
                            animate={progressControls}
                            initial={{ scaleX: 0 }}
                          />
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* CTA below tabs */}
            <motion.div
              className="mt-8 pl-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={defaultViewport}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <a
                href={DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group/cta inline-flex items-center gap-2.5 rounded-xl bg-brand-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-brand-primary/30"
              >
                {getText('cta')}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
              </a>
            </motion.div>
          </div>

          {/* Mockup area */}
          <div className="w-full lg:w-[60%]">
            <div className="relative">
              {/* Decorative glow behind mockup */}
              <div
                className="pointer-events-none absolute -inset-4 rounded-3xl opacity-60 blur-2xl"
                style={{
                  background: `radial-gradient(ellipse at 50% 50%, ${activeAccent.glow}, transparent 70%)`,
                }}
              />

              {/* Mockup container */}
              <div className="relative overflow-hidden rounded-2xl border border-border-light bg-white p-1.5 shadow-[var(--shadow-lg)]">
                {/* Top accent bar */}
                <div className="mb-1.5 flex items-center gap-1.5 px-3 pt-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
                  <div className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
                  <div className="h-2.5 w-2.5 rounded-full bg-[#28CA41]" />
                  <div className="mx-auto flex h-5 items-center rounded-md bg-surface-secondary px-3">
                    <span className="text-[10px] text-text-muted">app.trigger-flow.com</span>
                  </div>
                </div>

                {/* Mockup with crossfade — fixed aspect ratio container */}
                <div className="relative overflow-hidden rounded-b-xl" style={{ aspectRatio: '16 / 10' }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab.key}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0"
                    >
                      <div className="pointer-events-none h-full w-full origin-top overflow-hidden">
                        {activeTab.mockup}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
