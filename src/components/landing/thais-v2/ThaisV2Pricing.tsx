'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Check, Sparkles, ArrowRight, Shield, Headphones, Zap } from 'lucide-react';
import { Container, ButtonLink } from '@/components/ui';

const plans = [
  {
    name: 'Communication',
    description: 'Idéal pour démarrer',
    originalPrice: 69,
    thaisPrice: 49,
    features: [
      '10 segments clients',
      '5 flows',
      '5 000 emails/mois',
      'SMS & WhatsApp',
      'Messaging Hub unifié',
      'Domaine personnalisé',
    ],
    gradient: 'from-blue-500 to-indigo-600',
    popular: false,
  },
  {
    name: 'Conversion',
    description: 'Pour maximiser vos revenus',
    originalPrice: 149,
    thaisPrice: 110,
    features: [
      'Tout Communication +',
      '45 segments clients',
      '10 flows',
      '15 000 emails/mois',
      'Conditions d\'interactions',
      '5 formulaires',
    ],
    gradient: 'from-emerald-500 to-teal-600',
    popular: true,
  },
  {
    name: 'Marketing+',
    description: 'Le plus complet',
    originalPrice: 199,
    thaisPrice: 149,
    features: [
      'Tout Conversion +',
      'Segments illimités',
      'Flows illimités',
      '50 000 emails/mois',
      'Formulaires illimités',
      'Support prioritaire',
    ],
    gradient: 'from-purple-500 to-violet-600',
    popular: false,
  },
];

const includedFeatures = [
  { icon: Zap, text: 'Intégration 1-clic Thaïs' },
  { icon: Headphones, text: 'Support francophone' },
  { icon: Shield, text: 'Conformité RGPD' },
];

export function ThaisV2Pricing() {
  const searchParams = useSearchParams();

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
    <section className="relative overflow-hidden bg-white py-24 md:py-32">
      {/* Background pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(0 0 0 / 0.03) 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Decorative blobs */}
      <div className="absolute -left-64 top-1/3 h-[500px] w-[500px] rounded-full bg-emerald-500/5 blur-[150px]" />
      <div className="absolute -right-64 bottom-1/3 h-[400px] w-[400px] rounded-full bg-purple-500/5 blur-[120px]" />

      <Container className="relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
            <Sparkles className="h-4 w-4" />
            Tarifs préférentiels Thaïs
          </span>
          <h2 className="font-serif text-4xl font-bold tracking-tight text-zinc-900 md:text-5xl lg:text-6xl">
            Des tarifs négociés pour{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              les utilisateurs Thaïs
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600">
            Bénéficiez de tarifs exclusifs grâce au partenariat TriggerFlow × Thaïs
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className={`relative overflow-hidden rounded-3xl transition-all ${
                plan.popular
                  ? 'border-2 border-emerald-500 bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-2xl shadow-emerald-500/30 lg:scale-105'
                  : 'border-2 border-zinc-200 bg-white shadow-lg hover:shadow-xl'
              } p-8`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -right-10 top-6 rotate-45 bg-amber-400 px-12 py-1.5 text-xs font-bold uppercase tracking-wider text-zinc-900">
                  Populaire
                </div>
              )}

              {/* Plan header */}
              <div className="mb-6">
                <h3 className={`text-2xl font-bold ${plan.popular ? 'text-white' : 'text-zinc-900'}`}>
                  {plan.name}
                </h3>
                <p className={`mt-1 text-sm ${plan.popular ? 'text-white/80' : 'text-zinc-500'}`}>
                  {plan.description}
                </p>
              </div>

              {/* Pricing */}
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className={`text-5xl font-bold ${plan.popular ? 'text-white' : 'text-zinc-900'}`}>
                    {plan.thaisPrice}€
                  </span>
                  <span className={plan.popular ? 'text-white/70' : 'text-zinc-500'}>/mois</span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <span className={`text-lg line-through ${plan.popular ? 'text-white/50' : 'text-zinc-400'}`}>
                    {plan.originalPrice}€
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                      plan.popular ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-700'
                    }`}
                  >
                    -{Math.round(((plan.originalPrice - plan.thaisPrice) / plan.originalPrice) * 100)}% Thaïs
                  </span>
                </div>
              </div>

              {/* Features */}
              <ul className="mb-8 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                        plan.popular ? 'bg-white/20' : 'bg-emerald-100'
                      }`}
                    >
                      <Check
                        className={`h-3 w-3 ${plan.popular ? 'text-white' : 'text-emerald-600'}`}
                        strokeWidth={3}
                      />
                    </div>
                    <span className={`text-sm ${plan.popular ? 'text-white/90' : 'text-zinc-700'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <ButtonLink
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full justify-center rounded-xl py-4 text-base font-semibold transition-all ${
                  plan.popular
                    ? 'bg-white text-emerald-600 hover:bg-zinc-100'
                    : 'bg-zinc-900 text-white hover:bg-zinc-800'
                }`}
              >
                Réserver une démo
                <ArrowRight className="ml-2 h-4 w-4" />
              </ButtonLink>
            </motion.div>
          ))}
        </div>

        {/* Included features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12"
        >
          <p className="mb-4 text-center text-sm font-medium text-zinc-500">
            Inclus dans tous les forfaits
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {includedFeatures.map((feature) => (
              <div key={feature.text} className="flex items-center gap-2 text-sm text-zinc-600">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100">
                  <feature.icon className="h-4 w-4 text-emerald-600" />
                </div>
                {feature.text}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center text-sm text-zinc-500"
        >
          Sans engagement • Annulation à tout moment • Support francophone
        </motion.p>
      </Container>
    </section>
  );
}
