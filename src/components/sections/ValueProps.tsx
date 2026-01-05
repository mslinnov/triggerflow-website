'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Clock, MessageSquare, TrendingUp } from 'lucide-react';
import { Container, Badge } from '@/components/ui';

const valueProps = [
  {
    key: 'time',
    icon: Clock,
    image: '/images/benefit-1.webp',
  },
  {
    key: 'communication',
    icon: MessageSquare,
    image: '/images/benefit-2.webp',
  },
  {
    key: 'sales',
    icon: TrendingUp,
    image: '/images/benefit-3.webp',
  },
] as const;

export function ValueProps() {
  const t = useTranslations('valueProps');

  return (
    <section className="bg-brand-light/30 py-20 md:py-28">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
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

        {/* 3 Column Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {valueProps.map((prop, index) => (
            <motion.div
              key={prop.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <div className="group h-full rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
                {/* Image */}
                <div className="mb-6 overflow-hidden rounded-xl">
                  <Image
                    src={prop.image}
                    alt={t(`items.${prop.key}.title`)}
                    width={400}
                    height={250}
                    className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Icon */}
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-dark shadow-md">
                  <prop.icon className="h-6 w-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-brand-dark">
                  {t(`items.${prop.key}.title`)}
                </h3>
                <p className="mt-3 text-sm text-zinc-600 leading-relaxed">
                  {t(`items.${prop.key}.description`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
