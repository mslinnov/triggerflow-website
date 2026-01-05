'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { MessageSquare, Calendar, Star, ArrowRight, Clock, CheckCircle } from 'lucide-react';
import { Container, Badge } from '@/components/ui';

const steps = [
  { key: 'before', icon: Calendar, number: '01' },
  { key: 'during', icon: MessageSquare, number: '02' },
  { key: 'after', icon: Star, number: '03' },
] as const;

const metrics = [
  { key: 'basket', value: '+17%', icon: '📈' },
  { key: 'satisfaction', value: '+80%', icon: '⭐' },
] as const;

export function CommunicationTimeline() {
  const t = useTranslations('timeline');

  return (
    <section className="bg-gradient-to-b from-zinc-50 to-white py-20 md:py-28 overflow-hidden">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <Badge variant="primary" className="mb-4">
            {t('badge')}
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-brand-dark md:text-4xl lg:text-[2.75rem]">
            {t('title')}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Timeline Steps - Horizontal */}
        <div className="relative">
          {/* Connection line */}
          <div className="absolute left-0 right-0 top-[60px] hidden h-0.5 bg-gradient-to-r from-transparent via-zinc-200 to-transparent lg:block" />

          <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <TimelineCard
                  icon={step.icon}
                  number={step.number}
                  title={t(`steps.${step.key}.title`)}
                  description={t(`steps.${step.key}.description`)}
                  isLast={index === steps.length - 1}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-20"
        >
          <div className="mx-auto max-w-3xl rounded-2xl border border-zinc-100 bg-white p-8 shadow-lg">
            <div className="mb-6 text-center">
              <p className="text-sm font-medium text-zinc-500 uppercase tracking-wider">Résultats prouvés</p>
            </div>
            <div className="grid grid-cols-2 gap-8">
              {metrics.map((metric, index) => (
                <motion.div
                  key={metric.key}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="mb-2 text-3xl">{metric.icon}</div>
                  <p className="text-4xl font-bold text-brand-primary md:text-5xl">
                    {metric.value}
                  </p>
                  <p className="mt-2 text-sm text-zinc-600 font-medium">
                    {t(`metrics.${metric.key}`)}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

interface TimelineCardProps {
  icon: React.ComponentType<{ className?: string }>;
  number: string;
  title: string;
  description: string;
  isLast: boolean;
}

function TimelineCard({ icon: Icon, number, title, description, isLast }: TimelineCardProps) {
  return (
    <div className="relative">
      {/* Number circle */}
      <div className="relative z-10 mx-auto mb-6 flex h-[120px] w-[120px] items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-brand-dark/10" />
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-dark shadow-lg">
          <Icon className="h-8 w-8 text-white" />
        </div>
        <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-xs font-bold text-brand-dark shadow-md">
          {number}
        </div>
      </div>

      {/* Arrow to next (desktop only) */}
      {!isLast && (
        <div className="absolute right-0 top-[60px] hidden -translate-y-1/2 translate-x-1/2 lg:block">
          <ArrowRight className="h-5 w-5 text-zinc-300" />
        </div>
      )}

      {/* Card content */}
      <div className="rounded-xl border border-zinc-100 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:shadow-md hover:border-brand-primary/20">
        <h3 className="text-lg font-semibold text-brand-dark">{title}</h3>
        <p className="mt-2 text-sm text-zinc-600 leading-relaxed">{description}</p>

        {/* Visual indicators */}
        <div className="mt-4 flex justify-center gap-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-1.5 w-1.5 rounded-full ${i === 1 ? 'bg-brand-primary' : 'bg-zinc-200'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
