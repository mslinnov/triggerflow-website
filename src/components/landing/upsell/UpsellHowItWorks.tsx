'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Check } from 'lucide-react';
import { UpsellSection } from './primitives';

/**
 * Le frein principal n'est pas l'intérêt de l'offre, c'est la crainte du
 * chantier. Cette section attaque donc la mise en place avant d'expliquer le
 * fonctionnement : d'abord le fait que rien n'est à écrire, ensuite les trois
 * moments, ensuite la preuve par la capture réelle du produit.
 *
 * Le bloc « clé en main » est le seul endroit de la page à utiliser l'accent
 * pêche de la charte. C'est ce qui en fait un point d'arrêt visuel.
 */

const STEPS = ['connect', 'offer', 'collect'] as const;
const TURNKEY_POINTS = ['scenarios', 'content', 'prices'] as const;

export function UpsellHowItWorks() {
  const t = useTranslations('lpUpsell.how');
  const reduce = useReducedMotion();

  return (
    <UpsellSection className="bg-[var(--up-bg)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="max-w-[34ch] text-balance text-3xl font-bold tracking-tight text-[var(--up-ink)] md:text-4xl">
          {t('title')}
        </h2>
        <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-[var(--up-ink-soft)]">
          {t('subtitle')}
        </p>

        {/* Clé en main */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 overflow-hidden rounded-2xl bg-[var(--up-highlight)] text-[var(--up-highlight-ink)]"
        >
          <div className="grid gap-8 p-7 md:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14">
            <div>
              <p className="text-2xl font-bold leading-[1.15] tracking-tight md:text-3xl lg:text-[2.15rem]">
                {t('turnkey.title')}
              </p>
              <p className="mt-4 max-w-[42ch] text-[17px] leading-relaxed opacity-80">
                {t('turnkey.body')}
              </p>
            </div>

            <ul className="grid gap-3.5">
              {TURNKEY_POINTS.map((point) => (
                <li key={point} className="flex gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0" strokeWidth={2.4} aria-hidden />
                  <span className="text-[15px] leading-relaxed">{t(`turnkey.${point}`)}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Les trois moments */}
        <ol className="mt-14 grid gap-8 md:grid-cols-3 md:gap-10">
          {STEPS.map((step, index) => (
            <motion.li
              key={step}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="border-t-2 border-[var(--up-accent)] pt-5"
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
          <figcaption className="mt-4 max-w-[62ch] text-sm leading-relaxed text-[var(--up-ink-muted)]">
            {t('imageCaption')}
          </figcaption>
        </figure>
      </div>
    </UpsellSection>
  );
}
