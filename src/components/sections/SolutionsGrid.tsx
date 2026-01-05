'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Building, Building2, Home, House, ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui';

const solutions = [
  {
    key: 'independent',
    icon: Building,
    href: '#',
  },
  {
    key: 'group',
    icon: Building2,
    href: '#',
  },
  {
    key: 'residence',
    icon: Home,
    href: '#',
  },
  {
    key: 'guesthouse',
    icon: House,
    href: '#',
  },
];

export function SolutionsGrid() {
  const t = useTranslations('solutions');

  return (
    <section className="bg-brand-light/30 py-16 md:py-24">
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

        {/* Solutions Grid */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {solutions.map((solution, index) => (
            <motion.a
              key={solution.key}
              href={solution.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm transition-all duration-300 hover:border-brand-primary/20 hover:shadow-lg"
            >
              {/* Icon */}
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary/10 transition-colors group-hover:bg-brand-primary">
                <solution.icon className="h-6 w-6 text-brand-primary transition-colors group-hover:text-white" />
              </div>

              {/* Title & Description */}
              <h3 className="text-lg font-bold text-brand-dark">
                {t(`items.${solution.key}.title`)}
              </h3>
              <p className="mt-2 text-sm text-zinc-600">
                {t(`items.${solution.key}.description`)}
              </p>

              {/* Link */}
              <div className="mt-4 flex items-center gap-2 text-sm font-medium text-brand-primary transition-colors group-hover:text-brand-dark">
                {t('discover')}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </motion.a>
          ))}
        </div>
      </Container>
    </section>
  );
}
