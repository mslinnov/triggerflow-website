'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Star, Quote, TrendingUp, Clock, ThumbsUp, ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui';

const metrics = [
  {
    icon: TrendingUp,
    value: '+45%',
    label: "d'avis clients",
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
  },
  {
    icon: Clock,
    value: '10h',
    label: 'gagnées/semaine',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    icon: ThumbsUp,
    value: '4.2 → 4.7',
    label: 'Note OTA',
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
  },
];

export function TestimonialV2() {
  const t = useTranslations('testimonialFeatured');

  return (
    <section className="relative overflow-hidden bg-brand-dark py-24 md:py-32">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute left-0 top-0 h-full w-1/2 bg-gradient-to-r from-brand-primary/10 to-transparent" />
        <div className="absolute bottom-0 right-0 h-1/2 w-1/2 bg-gradient-to-tl from-brand-accent/10 to-transparent" />
      </div>

      {/* Decorative quote marks */}
      <div className="absolute left-8 top-24 text-[300px] font-serif leading-none text-white/[0.02] md:left-16">
        "
      </div>

      {/* Pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left side - Quote */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Quote icon */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-primary"
            >
              <Quote className="h-8 w-8 text-white" />
            </motion.div>

            {/* Quote text */}
            <blockquote className="mb-8">
              <p className="font-serif text-2xl font-medium leading-relaxed text-white md:text-3xl lg:text-4xl">
                "{t('quote')}"
              </p>
            </blockquote>

            {/* Author */}
            <div className="flex items-center gap-4">
              {/* Avatar with initials */}
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-primary to-emerald-500 text-xl font-bold text-white">
                {t('author.initials')}
              </div>

              <div>
                <p className="text-lg font-semibold text-white">{t('author.name')}</p>
                <p className="text-zinc-400">{t('author.title')}</p>
              </div>

              {/* Stars */}
              <div className="ml-auto flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right side - Metrics */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            {/* Metrics cards */}
            <div className="space-y-4">
              {metrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ x: 10, transition: { duration: 0.2 } }}
                  className="group flex items-center gap-6 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:bg-white/10"
                >
                  {/* Icon */}
                  <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${metric.bgColor}`}>
                    <metric.icon className={`h-7 w-7 ${metric.color}`} />
                  </div>

                  {/* Value and label */}
                  <div className="flex-1">
                    <p className={`text-3xl font-bold ${metric.color} md:text-4xl`}>
                      {metric.value}
                    </p>
                    <p className="text-zinc-400">{metric.label}</p>
                  </div>

                  {/* Arrow on hover */}
                  <ArrowRight className="h-5 w-5 text-zinc-500 opacity-0 transition-opacity group-hover:opacity-100" />
                </motion.div>
              ))}
            </div>

            {/* CTA link */}
            <motion.a
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              href="#"
              className="group mt-8 inline-flex items-center gap-2 text-brand-primary transition-colors hover:text-brand-accent"
            >
              {t('cta')}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.a>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
