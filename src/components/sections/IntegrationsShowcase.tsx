'use client';

import { useTranslations } from 'next-intl';
import { motion, type Variants } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Container, Badge } from '@/components/ui';
import { fadeInUp, defaultViewport } from '@/lib/animations';
import { Link } from '@/i18n/navigation';

interface PmsIntegration {
  name: string;
  src: string | null;
}

const integrations: PmsIntegration[] = [
  { name: 'Mews', src: '/images/pms/mews.webp' },
  { name: 'Opera', src: '/images/pms/opera.webp' },
  { name: 'Thaïs', src: '/images/pms/thais.webp' },
  { name: 'Misterbooking', src: '/images/pms/misterbooking.webp' },
  { name: 'Asterio', src: '/images/pms/asterio.webp' },
  { name: 'Clock PMS', src: null },
  { name: 'Cloudbeds', src: null },
  { name: 'Protel', src: null },
];

// --- Animations ---

const staggerGrid: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
};

const cardReveal: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

// --- Main Component ---

export function IntegrationsShowcase() {
  const t = useTranslations('integrationsShowcase');

  return (
    <section className="bg-[var(--v3-bg-primary)] py-16 md:py-24">
      <Container>
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
          className="text-center mb-10 md:mb-14"
        >
          <Badge variant="accent" className="mb-3">
            {t('badge')}
          </Badge>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-v3-text-primary">
            {t('title')}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-v3-text-secondary">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Logos Grid */}
        <motion.div
          variants={staggerGrid}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="mx-auto max-w-4xl grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 justify-items-center"
        >
          {integrations.map((integration) => (
            <motion.div
              key={integration.name}
              variants={cardReveal}
              whileHover={{ scale: 1.05 }}
              className="flex w-full items-center justify-center rounded-xl border border-v3-border/50 bg-white p-4 grayscale transition-all duration-300 hover:grayscale-0 hover:shadow-[var(--v3-shadow-md)] cursor-default"
            >
              {integration.src ? (
                <Image
                  src={integration.src}
                  alt={`Logo ${integration.name}`}
                  width={120}
                  height={48}
                  style={{ width: 'auto', height: '28px' }}
                  className="object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    if (e.currentTarget.parentElement) {
                      e.currentTarget.parentElement.innerHTML = `<span class="text-sm font-semibold text-v3-text-secondary">${integration.name}</span>`;
                    }
                  }}
                />
              ) : (
                <span className="text-sm font-semibold text-v3-text-secondary whitespace-nowrap">
                  {integration.name}
                </span>
              )}
            </motion.div>
          ))}

          {/* +50 integrations badge */}
          <motion.div
            variants={cardReveal}
            whileHover={{ scale: 1.05 }}
            className="flex w-full items-center justify-center rounded-xl border border-brand-primary/20 bg-brand-primary/5 p-4 cursor-default"
          >
            <span className="text-sm font-bold text-brand-primary whitespace-nowrap">
              {t('count')}
            </span>
          </motion.div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
          className="mt-10 text-center"
        >
          <Link
            href="/integrations"
            className="inline-flex items-center gap-2 text-brand-primary font-semibold hover:underline underline-offset-4 transition-colors"
          >
            {t('cta')}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
