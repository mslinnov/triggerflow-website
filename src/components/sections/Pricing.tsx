'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { Container, Badge, ButtonLink } from '@/components/ui';
import { cn } from '@/lib/utils';

const plans = [
  {
    key: 'discovery',
    name: 'Découverte',
    tableName: 'Plan Découverte',
    price: '0',
    subtitle: 'Aucune carte requise',
    description: 'Découvrez TriggerFlow gratuitement et testez vos premiers scénarios clients.',
    popular: false,
  },
  {
    key: 'communication',
    name: 'Communication',
    tableName: 'Plan Communication',
    price: '69',
    subtitle: 'Essai gratuit 14 jours',
    description: 'Créez vos segments et automatisez vos messages avant, pendant et après séjour.',
    popular: false,
  },
  {
    key: 'conversion',
    name: 'Conversion',
    tableName: 'Plan Conversion',
    price: '149',
    subtitle: 'Essai gratuit 14 jours',
    description: 'Avec plus d\'interaction, renforcez vos ventes annexes et collectez les retours clients.',
    popular: true,
  },
  {
    key: 'marketing',
    name: 'Marketing +',
    tableName: 'Plan Marketing +',
    price: '199',
    subtitle: 'Essai gratuit 14 jours',
    description: 'Déployez vos campagnes marketing et newsletter à grande échelle et fidélisez vos clients.',
    popular: false,
  },
] as const;

// Feature rows with values for each plan
const features = [
  {
    name: 'Segments clients',
    values: ['5', '10', '45', 'illimités']
  },
  {
    name: 'Flows (automatisations)',
    values: ['1', '5', '10', 'illimités']
  },
  {
    name: 'E-mails/mois',
    values: ['1 000', '5 000', '15 000', '50 000']
  },
  {
    name: 'SMS (À partir de 0,08€/sms)',
    values: [true, true, true, true]
  },
  {
    name: 'Statistiques et analyses',
    values: [true, true, true, true]
  },
  {
    name: 'Module CRM',
    values: [true, true, true, true]
  },
  {
    name: 'Hub de messagerie',
    values: [false, true, true, true]
  },
  {
    name: 'Nom de domaine personnalisé',
    values: [false, true, true, true]
  },
  {
    name: 'Whatsapp',
    values: [false, true, true, true]
  },
  {
    name: 'Marketing & Newsletter',
    values: [false, false, true, true]
  },
  {
    name: 'Formulaires',
    values: [false, false, '5', 'illimités']
  },
  {
    name: 'Module vente et catalogue',
    values: [false, false, true, true]
  },
  {
    name: 'Portail groupe hôtelier',
    values: [false, false, true, true]
  },
  {
    name: 'Conditions sur les interactions clients',
    values: [false, false, true, true]
  },
  {
    name: 'Programme de fidélité',
    values: [false, false, false, true]
  },
] as const;

export function Pricing() {
  const t = useTranslations('pricing');

  return (
    <section id="pricing" className="bg-white py-16 md:py-24">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Badge variant="outline" className="mb-4">
            Tarification
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-brand-dark md:text-4xl lg:text-[2.75rem] lg:leading-tight">
            Comparez nos plans en fonction<br className="hidden md:block" /> de vos besoins
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600">
            Utilisez TriggerFlow de façon millimétrée en fonction de vos besoins et décuplez vos capacités au fur et à mesure que vous vous développez
          </p>
        </motion.div>

        {/* Pricing cards */}
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={cn(
                'rounded-2xl p-6 text-center',
                plan.popular
                  ? 'bg-brand-dark text-white'
                  : 'bg-brand-light/50 text-brand-dark'
              )}
            >
              <h3 className={cn(
                'text-xl font-bold',
                plan.popular ? 'text-white' : 'text-brand-dark'
              )}>
                {plan.name}
              </h3>

              <div className="mt-4">
                <span className={cn(
                  'text-4xl font-bold',
                  plan.popular ? 'text-white' : 'text-brand-dark'
                )}>
                  {plan.price}€
                </span>
                <span className={cn(
                  'text-lg',
                  plan.popular ? 'text-white/80' : 'text-zinc-600'
                )}>
                  /mois
                </span>
              </div>

              <p className={cn(
                'mt-2 text-sm',
                plan.popular ? 'text-white/70' : 'text-zinc-500'
              )}>
                {plan.subtitle}
              </p>

              <ButtonLink
                href="https://app.lemcal.com/@trigger-flow/demo"
                target="_blank"
                rel="noopener noreferrer"
                variant={plan.popular ? 'primary' : 'secondary'}
                size="md"
                className={cn(
                  'mt-6 w-full justify-center',
                  plan.popular && 'bg-white text-brand-dark hover:bg-zinc-100'
                )}
              >
                Réserver une demo
              </ButtonLink>

              <p className={cn(
                'mt-4 text-sm leading-relaxed',
                plan.popular ? 'text-white/80' : 'text-zinc-600'
              )}>
                {plan.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Pricing comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-20 overflow-x-auto"
        >
          <div className="min-w-[800px]">
            {/* Plan headers */}
            <div className="grid grid-cols-5 gap-0 pt-6">
              <div className="p-4" /> {/* Empty cell for feature names column */}
              {plans.map((plan) => (
                <div key={plan.key} className="p-4 text-center relative">
                  {plan.popular && (
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                      <span className="inline-block whitespace-nowrap rounded-full border-2 border-brand-primary bg-white px-4 py-1.5 text-sm font-medium text-brand-primary shadow-sm">
                        Le plus populaire
                      </span>
                    </div>
                  )}
                  <h3 className={cn(
                    "text-base font-bold text-brand-dark",
                    plan.popular && "mt-4"
                  )}>{plan.tableName}</h3>
                </div>
              ))}
            </div>

            {/* Features section header */}
            <div className="mt-4 mb-2">
              <h4 className="text-base font-bold text-brand-dark px-4">Fonctionnalités</h4>
            </div>

            {/* Feature rows */}
            <div className="rounded-xl overflow-hidden">
              {features.map((feature, index) => (
                <div
                  key={feature.name}
                  className={cn(
                    'grid grid-cols-5 gap-0',
                    index % 2 === 0 ? 'bg-brand-light/50' : 'bg-white'
                  )}
                >
                  {/* Feature name */}
                  <div className="p-4 flex items-center">
                    <span className="text-sm text-brand-dark">{feature.name}</span>
                  </div>

                  {/* Values for each plan */}
                  {feature.values.map((value, planIndex) => (
                    <div key={planIndex} className="p-4 flex items-center justify-center">
                      {typeof value === 'boolean' ? (
                        value ? (
                          <Check className="h-5 w-5 text-brand-primary" />
                        ) : (
                          <X className="h-5 w-5 text-red-400" />
                        )
                      ) : (
                        <span className="text-sm font-medium text-brand-dark">{value}</span>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Enterprise CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 rounded-2xl bg-brand-dark p-8 text-center text-white"
        >
          <h3 className="text-xl font-bold">{t('enterprise.title')}</h3>
          <p className="mx-auto mt-2 max-w-xl text-zinc-300">
            {t('enterprise.description')}
          </p>
          <ButtonLink
            href="mailto:contact@trigger-flow.com"
            variant="primary"
            size="lg"
            className="mt-6"
          >
            {t('enterprise.cta')}
          </ButtonLink>
        </motion.div>
      </Container>
    </section>
  );
}
