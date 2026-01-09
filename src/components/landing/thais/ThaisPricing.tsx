'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Check, Sparkles, Clock, Zap } from 'lucide-react';
import { Container, ButtonLink } from '@/components/ui';

const plans = [
  {
    name: 'Communication',
    description: 'Idéal pour démarrer',
    originalPrice: 69,
    thaisPrice: 49,
    priceLabel: '€/mois',
    features: [
      '10 segments clients',
      '5 flows',
      '5 000 emails/mois',
      'SMS & WhatsApp',
      'Messaging Hub unifié',
      'Domaine personnalisé',
    ],
  },
  {
    name: 'Conversion',
    description: 'Pour maximiser vos revenus',
    originalPrice: 149,
    thaisPrice: 110,
    priceLabel: '€/mois',
    isPopular: true,
    features: [
      'Tout Communication +',
      '45 segments clients',
      '10 flows',
      '15 000 emails/mois',
      'Conditions d\'interactions',
      '5 formulaires',
    ],
  },
  {
    name: 'Marketing+',
    description: 'Le plus populaire',
    originalPrice: 199,
    thaisPrice: 149,
    priceLabel: '€/mois',
    features: [
      'Tout Conversion +',
      'Segments illimités',
      'Flows illimités',
      '50 000 emails/mois',
      'Formulaires illimités',
      'Support prioritaire',
    ],
  },
];

export function ThaisPricing() {
  const searchParams = useSearchParams();

  // Build Calendly URL with UTM parameters
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
    <section className="bg-gradient-to-b from-white to-brand-light/20 py-16 md:py-24">
      <Container>
        {/* Urgency Banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="max-w-2xl mx-auto bg-gradient-to-r from-[var(--thais-primary)] to-[var(--thais-cyan)] rounded-xl p-4 shadow-lg">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-white">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 animate-pulse" />
                <span className="font-semibold">Offre partenariat Thaïs</span>
              </div>
              <span className="hidden sm:block text-white/60">•</span>
              <span className="text-white/90 text-sm">
                Tarifs préférentiels garantis pour les nouveaux clients
              </span>
            </div>
          </div>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--thais-bg)] border border-[var(--thais-primary)]/20 rounded-full mb-6">
            <Sparkles className="w-5 h-5 text-[var(--thais-primary)]" />
            <span className="text-sm font-semibold text-[var(--thais-primary)]">Tarifs préférentiels Thaïs</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl md:text-5xl">
            Des tarifs négociés pour les utilisateurs Thaïs
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600">
            Bénéficiez de tarifs exclusifs grâce au partenariat TriggerFlow × Thaïs
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid gap-8 lg:grid-cols-3 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl border-2 ${
                plan.isPopular
                  ? 'border-[var(--thais-cyan)] shadow-2xl scale-105'
                  : 'border-gray-200 shadow-lg'
              } bg-white p-8`}
            >
              {/* Popular badge - Recommandé par Thaïs */}
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-[var(--thais-primary)] to-[var(--thais-cyan)] text-white text-xs font-bold rounded-full shadow-lg">
                    <Check className="w-3 h-3" />
                    RECOMMANDÉ PAR THAÏS
                  </span>
                </div>
              )}

              {/* Plan header */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-brand-dark mb-2">{plan.name}</h3>
                <p className="text-sm text-zinc-600">{plan.description}</p>
              </div>

              {/* Pricing */}
              <div className="mb-6">
                {/* Prix avec réduction */}
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="text-5xl font-bold text-brand-primary">{plan.thaisPrice}</span>
                  <span className="text-lg text-zinc-600">{plan.priceLabel}</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-lg text-zinc-400 line-through">{plan.originalPrice}€</span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[var(--thais-bg)] text-xs font-semibold text-[var(--thais-primary)] border border-[var(--thais-cyan)]/30">
                    -{Math.round(((plan.originalPrice - plan.thaisPrice) / plan.originalPrice) * 100)}% Thaïs
                  </span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand-primary/10">
                      <Check className="h-3 w-3 text-brand-primary" strokeWidth={3} />
                    </div>
                    <span className="text-sm text-zinc-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <ButtonLink
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant={plan.isPopular ? 'primary' : 'secondary'}
                size="lg"
                className={`w-full justify-center gap-2 ${plan.isPopular ? 'shadow-lg' : ''}`}
              >
                {plan.isPopular && <Zap className="w-4 h-4" />}
                {plan.isPopular ? 'Choisir ce plan' : 'Démarrer avec ce plan'}
              </ButtonLink>

              {/* Scarcity message for popular plan */}
              {plan.isPopular && (
                <p className="mt-3 text-xs text-center text-[var(--thais-primary)] font-medium">
                  Le plus choisi par les hôteliers Thaïs
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-zinc-600">
            💡 Tous les forfaits incluent l'intégration 1-clic avec Thaïs PMS et la synchronisation automatique
          </p>
          <p className="text-sm text-zinc-500 mt-2">
            Sans engagement • Annulation à tout moment • Support francophone
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
