'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { HeadphonesIcon, Users, Rocket, ShieldCheck } from 'lucide-react';
import { Container } from '@/components/ui';

const benefits = [
  { key: 'support', icon: HeadphonesIcon, description: 'Support 7j/7' },
  { key: 'team', icon: Users, description: 'De vrais humains' },
  { key: 'setup', icon: Rocket, description: 'Configuration rapide' },
  { key: 'rgpd', icon: ShieldCheck, description: 'Conforme RGPD' },
] as const;

export function Benefits() {
  const t = useTranslations('benefits');

  return (
    <section className="border-y border-zinc-100 bg-zinc-50/50 py-10 md:py-12">
      <Container>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.key}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-dark shadow-md">
                <benefit.icon className="h-6 w-6 text-white" />
              </div>
              <span className="text-sm font-semibold text-brand-dark">
                {t(benefit.key)}
              </span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
