'use client';

import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import { Building, Building2, Home, Tent, ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/ui';
import { fadeInUp, staggerContainer, staggerItem, cardHover, defaultViewport } from '@/lib/animations';

const solutions = [
  {
    key: 'independent',
    icon: Building,
    href: '/solutions/hotels-independants',
  },
  {
    key: 'group',
    icon: Building2,
    href: '/solutions/groupes-hoteliers',
  },
  {
    key: 'residence',
    icon: Home,
    href: '/solutions/residences',
  },
  {
    key: 'guesthouse',
    icon: Tent,
    href: '/solutions/campings',
  },
];

export function SolutionsGrid() {
  const t = useTranslations('solutions');
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-white py-16 md:py-24">
      <Container>
        {/* Header */}
        <motion.div
          initial={prefersReducedMotion ? 'visible' : 'hidden'}
          whileInView="visible"
          variants={fadeInUp}
          viewport={defaultViewport}
          className="text-center"
        >
          <h2 className="font-serif text-3xl font-bold tracking-tight text-text-primary md:text-4xl lg:text-[2.75rem]">
            {t('title')}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Solutions Grid with stagger */}
        <motion.div
          initial={prefersReducedMotion ? 'visible' : 'hidden'}
          whileInView="visible"
          variants={staggerContainer}
          viewport={defaultViewport}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {solutions.map((solution) => (
            <Link
              key={solution.key}
              href={solution.href as any}
              className="group"
            >
              <motion.div
                variants={staggerItem}
                whileHover={!prefersReducedMotion ? cardHover : {}}
                className="rounded-2xl border border-border-light bg-white p-6 shadow-[var(--shadow-md)] transition-shadow hover:border-brand-primary/20 hover:shadow-[var(--shadow-lg)] h-full"
              >
                {/* Icon */}
                <motion.div
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary/10 transition-colors group-hover:bg-brand-primary"
                  whileHover={!prefersReducedMotion ? { scale: 1.1, rotate: 5 } : {}}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <solution.icon className="h-6 w-6 text-brand-primary transition-colors group-hover:text-white" />
                </motion.div>

                {/* Title & Description */}
                <h3 className="font-serif text-lg font-bold text-text-primary">
                  {t(`items.${solution.key}.title`)}
                </h3>
                <p className="mt-2 text-sm text-text-secondary">
                  {t(`items.${solution.key}.description`)}
                </p>

                {/* Link */}
                <div className="mt-4 flex items-center gap-2 text-sm font-medium text-brand-primary transition-colors group-hover:text-brand-dark">
                  {t('discover')}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
