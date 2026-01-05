'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { MessageSquare, TrendingUp, Zap, LayoutDashboard, ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui';

const modules = [
  {
    key: 'communication',
    icon: MessageSquare,
    href: '#',
    features: ['Emails transactionnels', 'SMS automatiques', 'WhatsApp Business', 'Hub de messagerie'],
  },
  {
    key: 'marketing',
    icon: TrendingUp,
    href: '#',
    features: ['Newsletters', 'Campagnes marketing', 'Programme de fidélité', 'Segmentation avancée'],
  },
  {
    key: 'automation',
    icon: Zap,
    href: '#',
    features: ['Triggers personnalisés', 'Actions automatiques', 'Conditions avancées', 'Scénarios illimités'],
  },
  {
    key: 'tools',
    icon: LayoutDashboard,
    href: '#',
    features: ['CRM intégré', 'Formulaires & enquêtes', 'Upsell & ventes', 'Tableaux de bord'],
  },
];

export function ModulesGrid() {
  const t = useTranslations('modules');

  return (
    <section id="modules" className="bg-white py-16 md:py-24">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-brand-dark md:text-4xl lg:text-[2.75rem]">
            {t('title')}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Modules Grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {modules.map((module, index) => (
            <motion.a
              key={module.key}
              href={module.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group rounded-2xl border border-zinc-100 bg-white p-6 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-brand-primary/20 hover:shadow-xl md:p-8"
            >
              {/* Icon */}
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-brand-primary/10 transition-colors group-hover:bg-brand-primary">
                <module.icon className="h-7 w-7 text-brand-primary transition-colors group-hover:text-white" />
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold text-brand-dark">
                {t(`items.${module.key}.title`)}
              </h3>
              <p className="mt-2 text-zinc-600">
                {t(`items.${module.key}.description`)}
              </p>

              {/* Features List */}
              <p className="mt-4 text-sm text-zinc-500">
                {module.features.join(' • ')}
              </p>

              {/* Link */}
              <div className="mt-6 flex items-center gap-2 text-sm font-medium text-brand-primary transition-colors group-hover:text-brand-dark">
                {t('learnMore')}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </motion.a>
          ))}
        </div>
      </Container>
    </section>
  );
}
