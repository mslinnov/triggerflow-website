'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
  MessageSquare,
  Calendar,
  ClipboardList,
  ShoppingCart,
  Smartphone,
  Star,
  Heart,
  MessageCircle,
  ArrowRight,
} from 'lucide-react';
import { Container, Badge, ButtonLink } from '@/components/ui';
import { fadeInUp, staggerContainer, staggerItem, defaultViewport } from '@/lib/animations';

const useCases = [
  { key: 'sms', icon: MessageSquare, colorLight: 'bg-emerald-50', colorText: 'text-emerald-600' },
  { key: 'precheckin', icon: Smartphone, colorLight: 'bg-blue-50', colorText: 'text-blue-600' },
  { key: 'event', icon: Calendar, colorLight: 'bg-violet-50', colorText: 'text-violet-600' },
  { key: 'survey', icon: ClipboardList, colorLight: 'bg-amber-50', colorText: 'text-amber-600' },
  { key: 'upsell', icon: ShoppingCart, colorLight: 'bg-rose-50', colorText: 'text-rose-600' },
  { key: 'reviews', icon: Star, colorLight: 'bg-orange-50', colorText: 'text-orange-600' },
  { key: 'loyalty', icon: Heart, colorLight: 'bg-pink-50', colorText: 'text-pink-600' },
  { key: 'whatsapp', icon: MessageCircle, colorLight: 'bg-green-50', colorText: 'text-green-600' },
] as const;

export function Examples() {
  const t = useTranslations('examples');

  return (
    <section id="exemples" className="bg-white py-16 md:py-24">
      <Container>
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          viewport={defaultViewport}
          className="text-center"
        >
          <Badge variant="secondary" className="mb-4">
            {t('badge')}
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-v3-text-primary md:text-4xl">
            {t('title')}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-v3-text-secondary">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Grid of 8 use cases */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={staggerContainer}
          viewport={defaultViewport}
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {useCases.map((useCase) => {
            const Icon = useCase.icon;
            return (
              <motion.div
                key={useCase.key}
                variants={staggerItem}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group relative rounded-2xl border border-v3-border/50 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-brand-primary/20"
              >
                {/* Icon */}
                <div
                  className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${useCase.colorLight}`}
                >
                  <Icon className={`h-5 w-5 ${useCase.colorText}`} />
                </div>

                {/* Title */}
                <h3 className="font-semibold text-v3-text-primary">
                  {t(`items.${useCase.key}.title`)}
                </h3>

                {/* Description */}
                <p className="mt-1.5 text-sm leading-relaxed text-v3-text-secondary">
                  {t(`items.${useCase.key}.description`)}
                </p>

                {/* Result badge */}
                <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-brand-primary/5 px-2.5 py-1">
                  <span className="text-xs font-semibold text-brand-primary">
                    {t(`items.${useCase.key}.result`)}
                  </span>
                </div>

                {/* Hover arrow */}
                <div className="absolute right-4 top-5 opacity-0 transition-opacity group-hover:opacity-100">
                  <ArrowRight className="h-4 w-4 text-brand-primary/40" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA - "Et bien plus encore" */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          viewport={defaultViewport}
          className="mt-12 text-center"
        >
          <p className="text-lg font-semibold text-v3-text-primary">
            {t('bottomTitle')}
          </p>
          <p className="mx-auto mt-2 max-w-lg text-base text-v3-text-secondary">
            {t('bottomText')}
          </p>
          <ButtonLink
            href="https://app.lemcal.com/@trigger-flow/demo"
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            size="md"
            className="mt-5 gap-2"
          >
            {t('bottomCta')}
            <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        </motion.div>
      </Container>
    </section>
  );
}
