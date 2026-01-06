'use client';

import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import { Users, Hotel, Zap, Globe, Heart, Target, Lightbulb, ArrowRight, Linkedin } from 'lucide-react';
import { Container, ButtonLink } from '@/components/ui';
import { fadeInUp, staggerContainer, staggerItem, slideInLeft, slideInRight, defaultViewport } from '@/lib/animations';

const stats = [
  { key: 'hotels', icon: Hotel, value: '500+' },
  { key: 'messages', icon: Zap, value: '2M+' },
  { key: 'countries', icon: Globe, value: '15' },
  { key: 'team', icon: Users, value: '20' },
];

const values = [
  { key: 'innovation', icon: Lightbulb },
  { key: 'proximity', icon: Heart },
  { key: 'excellence', icon: Target },
];

const team = [
  { name: 'Alexandre Martin', role: 'CEO & Co-founder', linkedin: '#' },
  { name: 'Marie Dubois', role: 'CTO & Co-founder', linkedin: '#' },
  { name: 'Thomas Bernard', role: 'Head of Product', linkedin: '#' },
  { name: 'Sophie Laurent', role: 'Head of Customer Success', linkedin: '#' },
];

export function AboutContent() {
  const t = useTranslations('about');
  const prefersReducedMotion = useReducedMotion();

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-brand-light/30 to-white pt-32 pb-16 md:pt-40 md:pb-24">
        <Container>
          <motion.div
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            animate="visible"
            variants={fadeInUp}
            className="text-center"
          >
            <h1 className="text-3xl font-bold tracking-tight text-brand-dark md:text-4xl lg:text-5xl">
              {t('hero.title')}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600">
              {t('hero.subtitle')}
            </p>
          </motion.div>
        </Container>
      </section>

      {/* History Section */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <motion.div
              initial={prefersReducedMotion ? 'visible' : 'hidden'}
              whileInView="visible"
              variants={slideInLeft}
              viewport={defaultViewport}
            >
              <h2 className="text-2xl font-bold text-brand-dark md:text-3xl">
                {t('history.title')}
              </h2>
              <div className="mt-6 space-y-4 text-zinc-600">
                <p>{t('history.p1')}</p>
                <p>{t('history.p2')}</p>
                <p>{t('history.p3')}</p>
              </div>
            </motion.div>

            <motion.div
              initial={prefersReducedMotion ? 'visible' : 'hidden'}
              whileInView="visible"
              variants={slideInRight}
              viewport={defaultViewport}
              className="relative"
            >
              {/* Timeline visual */}
              <div className="space-y-6">
                {['2020', '2021', '2022', '2024'].map((year, index) => (
                  <motion.div
                    key={year}
                    initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={defaultViewport}
                    className="flex items-start gap-4"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-primary text-white font-bold text-sm">
                      {year.slice(2)}
                    </div>
                    <div className="pt-2">
                      <p className="font-semibold text-brand-dark">{t(`history.timeline.${year}.title`)}</p>
                      <p className="text-sm text-zinc-600">{t(`history.timeline.${year}.description`)}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="bg-brand-dark py-16 md:py-20">
        <Container>
          <motion.div
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            variants={staggerContainer}
            viewport={defaultViewport}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.key}
                variants={staggerItem}
                className="text-center"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-primary/20">
                  <stat.icon className="h-7 w-7 text-brand-primary" />
                </div>
                <p className="text-4xl font-bold text-white">{stat.value}</p>
                <p className="mt-1 text-sm text-white/70">{t(`stats.${stat.key}`)}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24">
        <Container>
          <motion.div
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            variants={fadeInUp}
            viewport={defaultViewport}
            className="text-center mb-12"
          >
            <h2 className="text-2xl font-bold text-brand-dark md:text-3xl">
              {t('values.title')}
            </h2>
            <p className="mt-2 text-zinc-600">
              {t('values.subtitle')}
            </p>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            variants={staggerContainer}
            viewport={defaultViewport}
            className="grid gap-8 md:grid-cols-3"
          >
            {values.map((value) => (
              <motion.div
                key={value.key}
                variants={staggerItem}
                whileHover={!prefersReducedMotion ? { scale: 1.02, y: -5 } : {}}
                className="rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-primary/10">
                  <value.icon className="h-8 w-8 text-brand-primary" />
                </div>
                <h3 className="text-xl font-bold text-brand-dark">
                  {t(`values.items.${value.key}.title`)}
                </h3>
                <p className="mt-3 text-zinc-600">
                  {t(`values.items.${value.key}.description`)}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Team Section */}
      <section className="bg-zinc-50 py-16 md:py-24">
        <Container>
          <motion.div
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            variants={fadeInUp}
            viewport={defaultViewport}
            className="text-center mb-12"
          >
            <h2 className="text-2xl font-bold text-brand-dark md:text-3xl">
              {t('team.title')}
            </h2>
            <p className="mt-2 text-zinc-600">
              {t('team.subtitle')}
            </p>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            variants={staggerContainer}
            viewport={defaultViewport}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {team.map((member) => (
              <motion.div
                key={member.name}
                variants={staggerItem}
                whileHover={!prefersReducedMotion ? { y: -5 } : {}}
                className="group rounded-2xl bg-white p-6 text-center shadow-sm hover:shadow-lg transition-shadow"
              >
                {/* Avatar placeholder */}
                <div className="mx-auto mb-4 h-24 w-24 rounded-full bg-gradient-to-br from-brand-primary/20 to-brand-primary/5 flex items-center justify-center">
                  <Users className="h-10 w-10 text-brand-primary/50" />
                </div>
                <h3 className="font-bold text-brand-dark">{member.name}</h3>
                <p className="text-sm text-zinc-600">{member.role}</p>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-sm text-brand-primary hover:underline"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <Container>
          <motion.div
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            variants={fadeInUp}
            viewport={defaultViewport}
            className="rounded-3xl bg-brand-primary/10 p-8 md:p-12 text-center"
          >
            <h2 className="text-2xl font-bold text-brand-dark md:text-3xl">
              {t('cta.title')}
            </h2>
            <p className="mt-4 text-zinc-600 max-w-xl mx-auto">
              {t('cta.description')}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <ButtonLink
                href="https://app.lemcal.com/@trigger-flow/demo"
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="lg"
                className="gap-2"
              >
                {t('cta.demo')}
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink
                href="/contact"
                variant="secondary"
                size="lg"
              >
                {t('cta.contact')}
              </ButtonLink>
            </div>
          </motion.div>
        </Container>
      </section>
    </main>
  );
}
