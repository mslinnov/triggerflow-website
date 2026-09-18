'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
  POST_STAY_CTA_SHAPES,
  POST_STAY_REVIEW_LINK,
  POST_STAY_SEND_HOURS,
} from '@/data/post-stay';
import { UpsellSection } from '../upsell/primitives';

/**
 * Les cinq règles, chacune avec les deux taux qui l'opposent.
 *
 * Les trois premières lisent leurs taux dans `@/data/post-stay`, la source du
 * simulateur : le visiteur qui vient de bouger un réglage retrouve ici
 * exactement le chiffre qui a déplacé son résultat. Les deux dernières, l'objet
 * et la première question du formulaire, ne sont pas des entrées du calcul :
 * leurs taux sont écrits ici, avec la mention de leur provenance.
 *
 * Toutes les valeurs sont des taux d'avis terminés par e-mail ENVOYÉ, jamais
 * par e-mail ouvert. C'est écrit en sous-titre parce que c'est ce qui rend les
 * cinq lignes comparables entre elles, et vérifiables par l'hôtelier sur sa
 * propre base.
 */

function rateOf(references: readonly { id: string; completionRate: number }[], id: string): number {
  const reference = references.find((candidate) => candidate.id === id);
  // Une faute de frappe dans un identifiant se verrait sinon comme un « 0 % »
  // affiché en clair. Mieux vaut casser le chargement du module.
  if (!reference) throw new Error(`Référence post-séjour inconnue : ${id}`);
  return reference.completionRate * 100;
}

/**
 * Les taux de `subject` et `starsFirst` viennent du guide du post-séjour,
 * chapitre 2, règles 4 et 5, mesurés sur les mêmes envois que les autres :
 * objet formulé en question 13,0 % contre 7,5 % pour un remerciement,
 * formulaire ouvrant sur des étoiles 13,0 % contre 7,9 % pour une question à
 * choix.
 */
const RULES = [
  {
    id: 'hour',
    best: rateOf(POST_STAY_SEND_HOURS, 'nineToEleven'),
    worst: rateOf(POST_STAY_SEND_HOURS, 'afterTwenty'),
  },
  {
    id: 'single',
    best: rateOf(POST_STAY_CTA_SHAPES, 'singleButton'),
    worst: rateOf(POST_STAY_CTA_SHAPES, 'starRow'),
  },
  {
    id: 'noCompetitor',
    best: POST_STAY_REVIEW_LINK.absent.completionRate * 100,
    worst: POST_STAY_REVIEW_LINK.present.completionRate * 100,
  },
  { id: 'subject', best: 13.0, worst: 7.5 },
  { id: 'starsFirst', best: 13.0, worst: 7.9 },
] as const;

const MAX_RATE = Math.max(...RULES.map((rule) => rule.best));

export function PostStayEvidence() {
  const t = useTranslations('lpPostStay.evidence');
  const reduce = useReducedMotion();

  return (
    <UpsellSection className="bg-[var(--up-bg-sunken)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-[var(--up-ink)] md:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[var(--up-ink-soft)]">{t('subtitle')}</p>
        </div>

        <ol className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-7">
          {RULES.map((rule, index) => (
            <motion.li
              key={rule.id}
              initial={reduce ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: (index % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl border border-[var(--up-line)] bg-[var(--up-surface)] p-6 md:p-8"
            >
              <p className="font-[family-name:var(--font-geist-mono)] text-sm font-semibold text-[var(--up-accent-text)]">
                {index + 1}
              </p>
              <h3 className="mt-2 text-lg font-semibold leading-snug text-[var(--up-ink)]">
                {t(`${rule.id}.title`)}
              </h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-[var(--up-ink-soft)]">
                {t(`${rule.id}.body`)}
              </p>

              <dl className="mt-6 space-y-3 border-t border-[var(--up-line)] pt-5">
                {(['best', 'worst'] as const).map((side) => (
                  <div key={side} className="flex items-center gap-3">
                    <dt className="w-[7.5rem] shrink-0 text-[13px] leading-snug text-[var(--up-ink-soft)]">
                      {t(`${rule.id}.${side}`)}
                    </dt>
                    {/* Repère proportionnel, pas une jauge : aucune piste de
                        fond, les deux barres se comparent entre elles. */}
                    <div aria-hidden className="min-w-0 flex-1">
                      <span
                        className={
                          side === 'best'
                            ? 'block h-1.5 rounded-full bg-[var(--up-accent)]'
                            : 'block h-1.5 rounded-full bg-[var(--up-line-strong)]'
                        }
                        style={{ width: `${Math.max((rule[side] / MAX_RATE) * 100, 4)}%` }}
                      />
                    </div>
                    <dd className="w-14 shrink-0 text-right font-[family-name:var(--font-geist-mono)] text-sm font-semibold text-[var(--up-ink)]">
                      {t('rateValue', { rate: rule[side] })}
                    </dd>
                  </div>
                ))}
              </dl>
            </motion.li>
          ))}
        </ol>
      </div>
    </UpsellSection>
  );
}
