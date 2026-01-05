'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { Plug, Workflow, Sparkles, Check, ArrowRight, BarChart3 } from 'lucide-react';
import { Container, Badge } from '@/components/ui';
import { fadeInUp, staggerContainer, defaultViewport, cardHover } from '@/lib/animations';

const steps = [
  { key: 'connect', icon: Plug, number: '01' },
  { key: 'create', icon: Workflow, number: '02' },
  { key: 'launch', icon: Sparkles, number: '03' },
] as const;

const pmsLogos = [
  { name: 'Mews', src: '/images/pms/mews.webp' },
  { name: 'Opera', src: '/images/pms/opera.webp' },
  { name: 'Thaïs', src: '/images/pms/thais.webp' },
  { name: 'Misterbooking', src: '/images/pms/misterbooking.webp' },
  { name: 'Asterio', src: '/images/pms/asterio.webp' },
];

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
          className="text-center"
        >
          <Badge variant="secondary" className="mb-4">
            {t('badge')}
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-brand-dark md:text-4xl lg:text-[2.75rem]">
            {t('title')}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Timeline connector (desktop only) */}
        <div className="hidden lg:block relative mt-16 mb-4">
          <div className="absolute top-7 left-[16.67%] right-[16.67%] h-0.5 bg-zinc-200 rounded-full" />
          <motion.div
            className="absolute top-7 left-[16.67%] h-0.5 bg-brand-primary rounded-full origin-left"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={defaultViewport}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            style={{ width: '66.67%' }}
          />

          {/* Animated dots on timeline */}
          {!prefersReducedMotion && (
            <svg className="absolute top-0 left-[16.67%] w-[66.67%] h-14 pointer-events-none overflow-visible">
              <circle r="4" fill="#006F68">
                <animateMotion dur="3s" repeatCount="indefinite">
                  <mpath href="#timeline-path" />
                </animateMotion>
                <animate
                  attributeName="opacity"
                  values="0;0.8;0.8;0"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </circle>
              <path id="timeline-path" d="M 0 28 L 100% 28" fill="none" stroke="transparent" />
            </svg>
          )}
        </div>

        {/* Steps */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={staggerContainer}
          className="grid gap-6 lg:grid-cols-3 lg:gap-8"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.key}
              variants={fadeInUp}
              className="relative"
            >
              {/* Step Card */}
              <motion.div
                whileHover={cardHover}
                className="h-full rounded-2xl border border-zinc-100 bg-zinc-50/50 p-6 transition-all duration-300 hover:border-brand-primary/20 hover:shadow-xl"
              >
                {/* Step header */}
                <div className="flex items-center gap-4 mb-5">
                  <motion.div
                    className="relative flex h-14 w-14 items-center justify-center rounded-full bg-brand-primary shadow-lg"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    {/* Pulse ring */}
                    {!prefersReducedMotion && (
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-brand-primary"
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.5, 0, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.3,
                        }}
                      />
                    )}
                    <span className="text-lg font-bold text-white">{step.number}</span>
                  </motion.div>

                  {/* Icon */}
                  <motion.div
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary/10"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <step.icon className="h-5 w-5 text-brand-primary" />
                  </motion.div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-brand-dark">
                  {t(`steps.${step.key}.title`)}
                </h3>
                <p className="mt-2 text-zinc-600 leading-relaxed">
                  {t(`steps.${step.key}.description`)}
                </p>

                {/* Step 1: PMS logos */}
                {step.key === 'connect' && (
                  <div className="mt-5 pt-4 border-t border-zinc-200">
                    <p className="text-xs text-zinc-500 mb-3">{t('pmsIntegrations')}</p>
                    <div className="flex flex-wrap gap-2">
                      {pmsLogos.map((pms, i) => (
                        <motion.div
                          key={pms.name}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={defaultViewport}
                          transition={{ delay: 0.5 + i * 0.1 }}
                        >
                          <PMSLogo name={pms.name} src={pms.src} />
                        </motion.div>
                      ))}
                      <span className="flex items-center text-xs text-zinc-500">+50</span>
                    </div>
                  </div>
                )}

                {/* Step 2: Workflow Builder Placeholder */}
                {step.key === 'create' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={defaultViewport}
                    transition={{ delay: 0.6 }}
                    className="mt-5 pt-4 border-t border-zinc-200"
                  >
                    <p className="text-xs text-zinc-500 mb-3">{t('workflowBuilder')}</p>
                    <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-4 border-2 border-dashed border-gray-300">
                      {/* Mini workflow preview */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-10 h-10 rounded-lg bg-white border-2 border-gray-300 flex items-center justify-center">
                            <div className="w-4 h-4 rounded bg-brand-primary/30" />
                          </div>
                          <span className="text-[8px] text-gray-400">Trigger</span>
                        </div>
                        <div className="w-6 h-0.5 bg-gray-300" />
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-10 h-10 rounded-lg bg-white border-2 border-gray-300 flex items-center justify-center">
                            <div className="w-4 h-4 rounded bg-brand-primary/30" />
                          </div>
                          <span className="text-[8px] text-gray-400">Condition</span>
                        </div>
                        <div className="w-6 h-0.5 bg-gray-300" />
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-10 h-10 rounded-lg bg-white border-2 border-gray-300 flex items-center justify-center">
                            <div className="w-4 h-4 rounded bg-brand-primary/30" />
                          </div>
                          <span className="text-[8px] text-gray-400">Action</span>
                        </div>
                      </div>
                      <p className="text-[10px] text-gray-400 text-center mt-3">
                        {t('screenshotWorkflow')}
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Dashboard Analytics Placeholder */}
                {step.key === 'launch' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={defaultViewport}
                    transition={{ delay: 0.7 }}
                    className="mt-5 pt-4 border-t border-zinc-200"
                  >
                    <p className="text-xs text-zinc-500 mb-3">{t('analytics')}</p>
                    <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-4 border-2 border-dashed border-gray-300">
                      {/* Mini dashboard preview */}
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        <div className="bg-white rounded p-2 border border-gray-200">
                          <div className="w-full h-1.5 bg-brand-primary/30 rounded mb-1" />
                          <div className="w-2/3 h-1 bg-gray-200 rounded" />
                        </div>
                        <div className="bg-white rounded p-2 border border-gray-200">
                          <div className="w-full h-1.5 bg-green-400/30 rounded mb-1" />
                          <div className="w-2/3 h-1 bg-gray-200 rounded" />
                        </div>
                        <div className="bg-white rounded p-2 border border-gray-200">
                          <div className="w-full h-1.5 bg-blue-400/30 rounded mb-1" />
                          <div className="w-2/3 h-1 bg-gray-200 rounded" />
                        </div>
                      </div>
                      <div className="bg-white rounded p-2 border border-gray-200">
                        <div className="flex items-end gap-1 h-8">
                          {[40, 60, 45, 80, 55, 70, 90].map((h, i) => (
                            <div
                              key={i}
                              className="flex-1 bg-brand-primary/20 rounded-t"
                              style={{ height: `${h}%` }}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-[10px] text-gray-400 text-center mt-3">
                        {t('screenshotDashboard')}
                      </p>
                    </div>

                    {/* Success indicator */}
                    <div className="flex items-center gap-3 rounded-lg bg-brand-primary/5 p-3 border border-brand-primary/10 mt-3">
                      <motion.span
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary"
                        animate={!prefersReducedMotion ? {
                          scale: [1, 1.1, 1],
                        } : {}}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                        }}
                      >
                        <Check className="h-4 w-4 text-white" />
                      </motion.span>
                      <div>
                        <span className="text-sm font-semibold text-brand-dark block">
                          {t('autoRunning')}
                        </span>
                        <span className="text-xs text-zinc-500">{t('autoRunningDesc')}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
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
            href="#"
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

function PMSLogo({ name, src }: { name: string; src: string }) {
  return (
    <motion.div
      className="flex h-8 items-center justify-center rounded-md bg-white px-2 border border-zinc-100 transition-all duration-300 hover:border-brand-primary/30 hover:shadow-md"
      whileHover={{ scale: 1.05, y: -2 }}
    >
      <Image
        src={src}
        alt={`Logo ${name}`}
        width={50}
        height={20}
        style={{ width: 'auto', height: '16px' }}
        className="object-contain opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
          e.currentTarget.parentElement!.innerHTML = `<span class="text-[10px] font-medium text-zinc-500">${name}</span>`;
        }}
      />
    </motion.div>
  );
}
