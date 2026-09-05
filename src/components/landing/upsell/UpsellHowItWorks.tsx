'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { UpsellSection } from './primitives';

/**
 * Trois moments, présentés en frise horizontale puis illustrés par une capture
 * réelle du constructeur de scénarios. Objectif : désamorcer le « ça a l'air
 * compliqué à mettre en place ».
 */

const STEPS = ['connect', 'offer', 'collect'] as const;

export function UpsellHowItWorks() {
  const t = useTranslations('lpUpsell.how');
  const reduce = useReducedMotion();

  return (
    <UpsellSection className="bg-[var(--up-bg)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="max-w-[20ch] text-3xl font-bold tracking-tight text-[var(--up-ink)] md:text-4xl">
          {t('title')}
        </h2>

        <ol className="mt-12 grid gap-8 md:grid-cols-3 md:gap-10">
          {STEPS.map((step, index) => (
            <motion.li
              key={step}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="relative border-t-2 border-[var(--up-accent)] pt-5"
            >
              <h3 className="text-lg font-semibold text-[var(--up-ink)]">{t(`${step}.title`)}</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-[var(--up-ink-soft)]">
                {t(`${step}.body`)}
              </p>
            </motion.li>
          ))}
        </ol>

        <figure className="mt-14">
          <div className="overflow-hidden rounded-2xl border border-[var(--up-line)] bg-[var(--up-surface)] shadow-[var(--up-shadow-sm)]">
            <Image
              src="/images/homepage/workflow-builder.webp"
              alt={t('imageAlt')}
              width={2800}
              height={1726}
              className="h-auto w-full"
            />
          </div>
          <figcaption className="mt-3 text-sm text-[var(--up-ink-muted)]">
            {t('imageCaption')}
          </figcaption>
        </figure>
      </div>
    </UpsellSection>
  );
}
