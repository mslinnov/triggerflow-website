'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import {
  Plug,
  Workflow,
  Sparkles,
  Check,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';
import { Container, Badge } from '@/components/ui';
import { fadeInUp, defaultViewport } from '@/lib/animations';

const steps = [
  { key: 'connect', icon: Plug, number: '01', accent: 'brand-primary' },
  { key: 'create', icon: Workflow, number: '02', accent: 'brand-primary' },
  { key: 'launch', icon: Sparkles, number: '03', accent: 'brand-primary' },
] as const;

const pmsLogos = [
  { name: 'Mews', src: '/images/integrations/mews.svg' },
  { name: 'Opera', src: '/images/integrations/opera.png' },
  { name: 'Thaïs', src: '/images/integrations/thais.svg' },
  { name: 'Misterbooking', src: '/images/integrations/misterbooking.png' },
  { name: 'Asterio', src: '/images/integrations/asterio.png' },
];

// --- Animations ---

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const stepReveal: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const lineGrow: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 },
  },
};

// --- Main Component ---

export function HowItWorks() {
  const t = useTranslations('howItWorks');
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="how-it-works" className="bg-white py-16 md:py-24 overflow-hidden">
      <Container>
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
          className="text-center mb-12 md:mb-14"
        >
          <Badge variant="accent" className="mb-3">
            {t('badge')}
          </Badge>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-text-primary md:text-4xl lg:text-[2.75rem]">
            {t('title')}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-text-secondary">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Horizontal 3-step layout */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="relative grid grid-cols-1 gap-6 md:grid-cols-3 md:items-stretch md:gap-0"
        >
          {/* Horizontal connector line — desktop only */}
          <motion.div
            variants={prefersReducedMotion ? undefined : lineGrow}
            className="hidden md:block absolute top-[2.25rem] left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px bg-gradient-to-r from-brand-primary/30 via-brand-primary/20 to-brand-primary/30 origin-left z-0"
          />

          {steps.map((step, index) => (
            <motion.div
              key={step.key}
              variants={stepReveal}
              className="relative z-10 flex flex-col items-center text-center md:px-4 lg:px-6"
            >
              {/* Step number circle */}
              <div className="relative mb-5">
                {/* Pulse ring */}
                {!prefersReducedMotion && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-brand-primary/10"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: index * 0.5,
                      ease: 'easeInOut',
                    }}
                  />
                )}
                <div className="relative flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full bg-white border-2 border-brand-primary/20 shadow-[var(--shadow-md)]">
                  <step.icon className="h-6 w-6 text-brand-primary" />
                </div>
                {/* Step number badge */}
                <span className="absolute -top-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-brand-primary text-[11px] font-bold text-white shadow-sm">
                  {index + 1}
                </span>
              </div>

              {/* Arrow connector — mobile only */}
              {index < steps.length - 1 && (
                <div className="md:hidden flex justify-center -mt-2 mb-2">
                  <ChevronRight className="h-5 w-5 text-brand-primary/30 rotate-90" />
                </div>
              )}

              {/* Content card */}
              <div className="w-full flex-1 rounded-2xl border border-border-light bg-white p-5 shadow-[var(--shadow-sm)] transition-shadow duration-300 hover:shadow-[var(--shadow-md)]">
                <h3 className="mb-2 text-base font-bold text-text-primary lg:text-lg">
                  {t(`steps.${step.key}.title`)}
                </h3>
                <p className="text-sm leading-relaxed text-text-secondary">
                  {t(`steps.${step.key}.description`)}
                </p>

                {/* Features list (steps 2 & 3) */}
                {(step.key === 'create' || step.key === 'launch') && (
                  <ul className="mt-3 space-y-1.5 text-left">
                    {[0, 1, 2].map((i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-primary" />
                        <span className="text-xs leading-relaxed text-text-secondary">
                          {t(`steps.${step.key}.features.${i}`)}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* PMS logos (step 1) */}
                {step.key === 'connect' && (
                  <div className="mt-4">
                    <p className="mb-2.5 text-[10px] font-medium uppercase tracking-wider text-text-muted">
                      {t('pmsIntegrations')}
                    </p>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {pmsLogos.map((pms) => (
                        <PMSLogo key={pms.name} name={pms.name} src={pms.src} />
                      ))}
                      <span className="flex h-8 items-center justify-center rounded-md bg-brand-primary/5 px-2 text-[10px] font-semibold text-brand-primary">
                        +50
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Link */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
          className="mt-10 text-center"
        >
          <motion.a
            href="/integrations"
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-primary transition-colors hover:text-brand-dark"
            whileHover={{ x: 5 }}
          >
            {t('cta')}
            <ArrowRight className="h-4 w-4" />
          </motion.a>
        </motion.div>
      </Container>
    </section>
  );
}

/* ——— Sub-components ——— */

function PMSLogo({ name, src }: { name: string; src: string }) {
  return (
    <div className="flex h-9 items-center justify-center rounded-lg bg-white px-2.5 border border-border-light shadow-sm">
      <Image
        src={src}
        alt={`Logo ${name}`}
        width={64}
        height={24}
        style={{ width: 'auto', height: '18px' }}
        className="object-contain"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
          e.currentTarget.parentElement!.innerHTML = `<span class="text-[10px] font-semibold text-text-secondary">${name}</span>`;
        }}
      />
    </div>
  );
}
