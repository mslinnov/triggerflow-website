'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, useReducedMotion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { Container, ButtonLink } from '@/components/ui';

const plans = [
  {
    name: 'Communication',
    scenario: 'Pour automatiser vos emails de base',
    monthlyPrice: 49,
    originalPrice: 69,
    popular: false,
    keyIncludes: [
      'Emails automatiques (confirmation, pré-séjour, après)',
      'Jusqu\'à 5 000 emails/mois',
      'SMS et WhatsApp inclus',
      'Support par email',
    ],
    exampleUse: 'Envoyez automatiquement la confirmation et les infos pratiques à chaque réservation.',
  },
  {
    name: 'Conversion',
    scenario: 'Pour aussi vendre plus de services',
    monthlyPrice: 110,
    originalPrice: 149,
    popular: true,
    keyIncludes: [
      'Tout Communication +',
      'Jusqu\'à 15 000 emails/mois',
      'Propositions d\'upsell automatiques',
      'Formulaires de pré-check-in',
      'Support prioritaire',
    ],
    exampleUse: 'Proposez automatiquement le spa ou le restaurant avant l\'arrivée.',
  },
  {
    name: 'Marketing+',
    scenario: 'Pour multi-établissements ou fort volume',
    monthlyPrice: 149,
    originalPrice: 199,
    popular: false,
    keyIncludes: [
      'Tout Conversion +',
      'Volume illimité',
      'Campagnes marketing avancées',
      'Rapports personnalisés',
      'Account manager dédié',
    ],
    exampleUse: 'Gérez plusieurs établissements depuis une seule interface.',
  },
];

export function ThaisV3Pricing() {
  const searchParams = useSearchParams();
  const prefersReducedMotion = useReducedMotion();

  const calendlyUrl = useMemo(() => {
    const baseUrl = 'https://app.lemcal.com/@trigger-flow/tf-thais';
    const utmParams = new URLSearchParams();
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach((param) => {
      const value = searchParams.get(param);
      if (value) utmParams.append(param, value);
    });
    return utmParams.toString() ? `${baseUrl}?${utmParams.toString()}` : baseUrl;
  }, [searchParams]);

  return (
    <section id="pricing" className="bg-[var(--v3-bg-secondary)] py-20 md:py-28">
      <Container>
        {/* Header */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-[var(--v3-accent-green)]/20 bg-[var(--v3-accent-green)]/10 px-4 py-2 text-sm font-medium text-[var(--v3-accent-green)]">
            Tarifs partenaire Thaïs
          </span>
          <h2 className="font-[family-name:var(--font-cormorant)] text-3xl font-semibold tracking-tight text-[var(--v3-text-primary)] md:text-4xl lg:text-5xl">
            Choisissez selon{' '}
            <span className="text-[var(--v3-accent-green)]">votre hôtel</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--v3-text-secondary)]">
            Tarifs préférentiels pour les utilisateurs Thaïs PMS
          </p>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative flex flex-col rounded-3xl p-8 transition-all ${
                plan.popular
                  ? 'bg-[var(--v3-accent-green)] text-white shadow-2xl shadow-[var(--v3-accent-green)]/20 md:scale-105'
                  : 'border border-[var(--v3-border)] bg-[var(--v3-bg-primary)] shadow-sm'
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-[var(--v3-accent-gold)] px-4 py-1.5 text-sm font-semibold text-[var(--v3-text-primary)]">
                  Le plus choisi
                </div>
              )}

              {/* Header */}
              <div className="mb-6">
                <h3 className={`text-2xl font-bold ${plan.popular ? 'text-white' : 'text-[var(--v3-text-primary)]'}`}>
                  {plan.name}
                </h3>
                <p className={`mt-1 text-sm ${plan.popular ? 'text-white/80' : 'text-[var(--v3-text-muted)]'}`}>
                  {plan.scenario}
                </p>
              </div>

              {/* Pricing */}
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className={`text-5xl font-bold ${plan.popular ? 'text-white' : 'text-[var(--v3-text-primary)]'}`}>
                    {plan.monthlyPrice}€
                  </span>
                  <span className={plan.popular ? 'text-white/70' : 'text-[var(--v3-text-muted)]'}>/mois</span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <span className={`text-lg line-through ${plan.popular ? 'text-white/50' : 'text-[var(--v3-text-muted)]'}`}>
                    {plan.originalPrice}€
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      plan.popular ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-700'
                    }`}
                  >
                    Tarif Thaïs
                  </span>
                </div>
              </div>

              {/* Key includes */}
              <ul className="mb-6 flex-1 space-y-3">
                {plan.keyIncludes.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className={`h-5 w-5 shrink-0 ${plan.popular ? 'text-white' : 'text-[var(--v3-accent-green)]'}`} />
                    <span className={`text-sm ${plan.popular ? 'text-white/90' : 'text-[var(--v3-text-secondary)]'}`}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Example use */}
              <div
                className={`mb-6 rounded-xl p-4 ${plan.popular ? 'bg-white/10' : 'bg-[var(--v3-bg-card)]'}`}
              >
                <p className={`text-sm italic ${plan.popular ? 'text-white/80' : 'text-[var(--v3-text-secondary)]'}`}>
                  {plan.exampleUse}
                </p>
              </div>

              {/* CTA */}
              <ButtonLink
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full justify-center rounded-full py-3 font-semibold transition-all ${
                  plan.popular
                    ? 'bg-white text-[var(--v3-accent-green)] hover:bg-[var(--v3-bg-secondary)]'
                    : 'bg-[var(--v3-accent-green)] text-white hover:opacity-90'
                }`}
              >
                Réserver une démo
                <ArrowRight className="ml-2 h-4 w-4" />
              </ButtonLink>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center text-sm text-[var(--v3-text-muted)]"
        >
          Tous les tarifs sont HT. Sans engagement, annulation facile. 14 jours d'essai gratuit.
        </motion.p>
      </Container>
    </section>
  );
}
