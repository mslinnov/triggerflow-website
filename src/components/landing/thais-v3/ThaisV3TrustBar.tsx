'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Star, Users, Clock, TrendingUp } from 'lucide-react';
import { Container } from '@/components/ui';

const stats = [
  {
    icon: Users,
    value: '200+',
    label: 'Hôtels connectés',
  },
  {
    icon: Star,
    value: '4.9/5',
    label: 'Note de satisfaction',
  },
  {
    icon: Clock,
    value: '4h',
    label: 'Gagnées par semaine',
  },
  {
    icon: TrendingUp,
    value: '+23%',
    label: 'Revenus additionnels',
  },
];

export function ThaisV3TrustBar() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="border-y border-[var(--v3-border)] bg-[var(--v3-bg-secondary)] py-8">
      <Container>
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--v3-bg-primary)] shadow-sm">
                <stat.icon className="h-5 w-5 text-[var(--v3-accent-green)]" />
              </div>
              <p className="font-[family-name:var(--font-cormorant)] text-3xl font-bold text-[var(--v3-text-primary)]">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-[var(--v3-text-muted)]">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
