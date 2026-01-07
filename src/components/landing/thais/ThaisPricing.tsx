'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { Container, ButtonLink } from '@/components/ui';

const plans = [
  {
    name: 'Communication',
    description: 'Idéal pour démarrer',
    originalPrice: 69,
    thaisPrice: 49,
    priceLabel: '€/mois',
    features: [
      'Email illimités',
      'SMS & WhatsApp',
      '1 utilisateur',
      'Templates personnalisables',
      'Support par email',
    ],
  },
  {
    name: 'Automation',
    description: 'Le plus populaire',
    originalPrice: 149,
    thaisPrice: 110,
    priceLabel: '€/mois',
    isPopular: true,
    features: [
      'Tout Communication +',
      'Workflows automatisés illimités',
      'Segmentation avancée',
      '3 utilisateurs',
      'Intégration Thaïs complète',
      'Support prioritaire',
    ],
  },
  {
    name: 'Enterprise',
    description: 'Pour les groupes',
    originalPrice: 199,
    thaisPrice: 149,
    priceLabel: '€/mois',
    features: [
      'Tout Automation +',
      'Utilisateurs illimités',
      'Multi-établissements',
      'API & Webhooks',
      'Account manager dédié',
      'Support 24/7',
      'Formation personnalisée',
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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-primary/10 to-purple-500/10 rounded-full mb-6">
            <Sparkles className="w-5 h-5 text-brand-primary" />
            <span className="text-sm font-semibold text-brand-primary">Tarifs préférentiels Thaïs</span>
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
                  ? 'border-brand-primary shadow-2xl scale-105'
                  : 'border-gray-200 shadow-lg'
              } bg-white p-8`}
            >
              {/* Popular badge */}
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 px-4 py-1.5 bg-gradient-to-r from-brand-primary to-brand-dark text-white text-xs font-bold rounded-full shadow-lg">
                    <Sparkles className="w-3 h-3" />
                    LE PLUS POPULAIRE
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
                <div className="flex items-end gap-3 mb-2">
                  <div className="flex items-baseline">
                    <span className="text-5xl font-bold text-brand-primary">{plan.thaisPrice}</span>
                    <span className="text-lg text-zinc-600 ml-1">{plan.priceLabel}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg text-zinc-400 line-through">{plan.originalPrice}€</span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                    -{Math.round(((plan.originalPrice - plan.thaisPrice) / plan.originalPrice) * 100)}%
                  </span>
                </div>
                <p className="text-xs text-zinc-500 mt-2">
                  Tarif préférentiel partenaire Thaïs
                </p>
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
                className="w-full justify-center"
              >
                Réserver une démo
              </ButtonLink>
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
