'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Send, ArrowDown } from 'lucide-react';
import { Container, ButtonLink, Badge } from '@/components/ui';
import { fadeInUp, staggerContainer, staggerItem, defaultViewport } from '@/lib/animations';

const integrationCategories = [
  {
    key: 'pms',
    integrations: [
      { key: 'mews', native: true },
      { key: 'opera', native: true },
      { key: 'thais', native: true },
      { key: 'dedge', native: true },
      { key: 'misterbooking', native: true },
      { key: 'amenitiz', native: true },
      { key: 'reservit', native: true },
      { key: 'medialog', native: true },
    ],
  },
  {
    key: 'pos',
    integrations: [
      { key: 'lightspeed', native: true },
      { key: 'sumup', native: true },
      { key: 'zelty', native: true },
      { key: 'addition', native: true },
    ],
  },
  {
    key: 'crm',
    integrations: [
      { key: 'salesforce', native: false },
      { key: 'hubspot', native: false },
      { key: 'mailchimp', native: true },
      { key: 'brevo', native: true },
    ],
  },
  {
    key: 'locks',
    integrations: [
      { key: 'sesame', native: true },
      { key: 'nuki', native: true },
      { key: 'assaabloy', native: true },
      { key: 'salto', native: true },
    ],
  },
  {
    key: 'channel',
    integrations: [
      { key: 'siteminder', native: true },
      { key: 'cubilis', native: true },
      { key: 'wubook', native: true },
    ],
  },
  {
    key: 'other',
    integrations: [
      { key: 'zapier', native: false },
      { key: 'make', native: false },
      { key: 'api', native: false },
    ],
  },
];

export function IntegrationsContent() {
  const t = useTranslations('integrations');
  const prefersReducedMotion = useReducedMotion();
  const [formData, setFormData] = useState({
    toolName: '',
    email: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log('Integration request:', formData);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

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
            <div className="mt-8">
              {/* eslint-disable-next-line */}
              <a
                href="#request-integration"
                className="inline-flex items-center gap-2 text-brand-primary font-medium hover:underline"
              >
                {t('hero.cta')}
                <ArrowDown className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Integration Categories */}
      {integrationCategories.map((category, categoryIndex) => (
        <section
          key={category.key}
          className={categoryIndex % 2 === 0 ? 'py-12 md:py-16' : 'py-12 md:py-16 bg-zinc-50'}
        >
          <Container>
            <motion.div
              initial={prefersReducedMotion ? 'visible' : 'hidden'}
              whileInView="visible"
              variants={fadeInUp}
              viewport={defaultViewport}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-brand-dark">
                {t(`categories.${category.key}.title`)}
              </h2>
            </motion.div>

            <motion.div
              initial={prefersReducedMotion ? 'visible' : 'hidden'}
              whileInView="visible"
              variants={staggerContainer}
              viewport={defaultViewport}
              className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            >
              {category.integrations.map((integration) => (
                <motion.div
                  key={integration.key}
                  variants={staggerItem}
                  whileHover={!prefersReducedMotion ? { scale: 1.02, y: -2 } : {}}
                  className="bg-white rounded-xl shadow-sm border border-zinc-100 p-6 hover:shadow-md transition-shadow"
                >
                  {/* Logo placeholder */}
                  <div className="w-12 h-12 rounded-lg bg-zinc-100 flex items-center justify-center mb-4">
                    <span className="text-lg font-bold text-zinc-400">
                      {t(`categories.${category.key}.integrations.${integration.key}.name`).slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-brand-dark">
                      {t(`categories.${category.key}.integrations.${integration.key}.name`)}
                    </h3>
                    <Badge
                      variant={integration.native ? 'primary' : 'secondary'}
                      className="text-xs shrink-0"
                    >
                      {integration.native ? t('badges.native') : t('badges.api')}
                    </Badge>
                  </div>
                  <p className="text-sm text-zinc-600">
                    {t(`categories.${category.key}.integrations.${integration.key}.description`)}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </Container>
        </section>
      ))}

      {/* Request Integration Section */}
      <section id="request-integration" className="py-16 md:py-24 bg-brand-light/30">
        <Container>
          <motion.div
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            variants={fadeInUp}
            viewport={defaultViewport}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-2xl font-bold text-brand-dark md:text-3xl">
              {t('request.title')}
            </h2>
            <p className="mt-4 text-zinc-600">
              {t('request.description')}
            </p>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-8 rounded-2xl bg-brand-primary/10 p-8"
              >
                <div className="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-brand-dark">
                  {t('request.success.title')}
                </h3>
                <p className="mt-2 text-zinc-600">
                  {t('request.success.message')}
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <input
                  type="text"
                  name="toolName"
                  required
                  value={formData.toolName}
                  onChange={handleChange}
                  placeholder={t('request.form.toolPlaceholder')}
                  className="flex-1 rounded-lg border border-zinc-300 px-4 py-3 text-sm focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-colors"
                />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t('request.form.emailPlaceholder')}
                  className="flex-1 rounded-lg border border-zinc-300 px-4 py-3 text-sm focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-colors"
                />
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={!prefersReducedMotion ? { scale: 1.02 } : {}}
                  whileTap={!prefersReducedMotion ? { scale: 0.98 } : {}}
                  className="bg-brand-primary text-white font-medium py-3 px-6 rounded-lg hover:bg-brand-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {isSubmitting ? t('request.form.submitting') : t('request.form.submit')}
                </motion.button>
              </form>
            )}
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
                href="/tarifs"
                variant="secondary"
                size="lg"
              >
                {t('cta.pricing')}
              </ButtonLink>
            </div>
          </motion.div>
        </Container>
      </section>
    </main>
  );
}
