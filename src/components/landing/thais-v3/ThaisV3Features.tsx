'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Clock,
  MessageSquare,
  TrendingUp,
  Check,
  Users,
  Star,
  ShoppingCart,
  ArrowUpRight,
  Heart,
  Gift,
  Award,
} from 'lucide-react';
import { Container } from '@/components/ui';

const features = [
  {
    id: 'temps',
    icon: Clock,
    badge: 'Automatisation',
    badgeColor: 'bg-blue-50 text-blue-600 border-blue-100',
    title: 'Gagnez 4h par semaine',
    subtitle: 'Sans toucher à rien',
    description:
      "Vos emails se configurent une fois et s'envoient automatiquement. Plus besoin de copier-coller ou de vous souvenir d'envoyer.",
    benefits: [
      'Configuration guidée en 15 minutes',
      'Fonctionne 24/7, même le dimanche',
      'Modification facile si besoin',
    ],
    image: '/images/assets/flow-builder.png',
    floatingElements: [
      {
        type: 'stat',
        value: '98%',
        label: 'Délivrabilité',
        position: 'top-right',
      },
      {
        type: 'metric',
        value: '1,247',
        label: 'clients contactés',
        icon: Users,
        position: 'bottom-left',
      },
    ],
  },
  {
    id: 'relation',
    icon: MessageSquare,
    badge: 'Communication',
    badgeColor: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    title: 'Répondez à tous vos messages',
    subtitle: 'Au même endroit',
    description:
      "Email, SMS, WhatsApp : tout arrive dans une seule boîte. Plus de messages perdus ou oubliés.",
    benefits: [
      'Historique complet par client',
      "Réponses suggérées par l'IA",
      'Synchronisé avec Thaïs',
    ],
    image: '/images/assets/messaging.png',
    floatingElements: [
      {
        type: 'channels',
        content: 'Canaux actifs',
        channels: ['Email', 'SMS', 'WhatsApp'],
        position: 'top-left',
      },
      {
        type: 'metric',
        value: '2min',
        label: 'Temps de réponse',
        icon: Clock,
        position: 'bottom-right',
      },
    ],
  },
  {
    id: 'revenus',
    icon: TrendingUp,
    badge: 'Ventes',
    badgeColor: 'bg-amber-50 text-amber-600 border-amber-100',
    title: 'Vendez vos services',
    subtitle: 'Sans effort commercial',
    description:
      "Spa, restaurant, late check-out : proposés automatiquement au bon moment. Paiement en ligne inclus.",
    benefits: [
      'Propositions personnalisées',
      'Paiement sécurisé intégré',
      'Suivi des ventes en temps réel',
    ],
    image: '/images/assets/catalog.png',
    floatingElements: [
      {
        type: 'cart',
        value: '12',
        position: 'top-left',
      },
      {
        type: 'sync',
        content: 'Sync Thaïs PMS',
        position: 'top-right',
      },
      {
        type: 'price',
        value: '49€',
        label: 'Petit-déjeuner',
        position: 'bottom-left',
      },
    ],
  },
  {
    id: 'fidelisation',
    icon: Heart,
    badge: 'Fidélisation',
    badgeColor: 'bg-rose-50 text-rose-600 border-rose-100',
    title: 'Fidélisez vos clients',
    subtitle: 'Ils reviendront naturellement',
    description:
      "Programme de fidélité automatique avec points et récompenses. Vos clients accumulent des avantages à chaque séjour.",
    benefits: [
      'Points cumulés automatiquement',
      'Récompenses personnalisables',
      'Emails de relance automatiques',
    ],
    image: '/images/assets/loyalty.webp',
    floatingElements: [
      {
        type: 'loyalty-points',
        value: '2,450',
        label: 'points',
        position: 'top-right',
      },
      {
        type: 'loyalty-tier',
        content: 'Gold',
        position: 'top-left',
      },
      {
        type: 'metric',
        value: '+28%',
        label: 'Retours clients',
        icon: Award,
        position: 'bottom-left',
      },
    ],
  },
];

interface FloatingElement {
  type: string;
  content?: string;
  value?: string;
  label?: string;
  icon?: React.ComponentType<{ className?: string }>;
  channels?: string[];
  position: string;
  color?: string;
}

function FloatingElementComponent({
  element,
  index,
}: {
  element: FloatingElement;
  index: number;
}) {
  const prefersReducedMotion = useReducedMotion();
  const delays = [0.3, 0.5, 0.7, 0.9];
  const delay = delays[index] || 0.3;

  const positionClasses: Record<string, string> = {
    'top-left': '-left-4 -top-4 md:-left-8 md:-top-6',
    'top-right': '-right-4 -top-4 md:-right-8 md:-top-6',
    'bottom-left': '-bottom-4 -left-4 md:-bottom-6 md:-left-8',
    'bottom-right': '-bottom-4 -right-4 md:-bottom-6 md:-right-8',
  };

  const baseClasses =
    'absolute z-10 rounded-xl border border-[var(--v3-border)] bg-[var(--v3-bg-primary)] p-3 shadow-[var(--v3-shadow-lg)]';

  if (element.type === 'status') {
    const Icon = element.icon;
    return (
      <motion.div
        initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
        className={`${baseClasses} ${positionClasses[element.position]} hidden md:flex items-center gap-2 ${element.color}`}
      >
        <div className="h-2 w-2 animate-pulse rounded-full bg-white" />
        {Icon && <Icon className="h-4 w-4" />}
        <span className="text-sm font-medium">{element.content}</span>
      </motion.div>
    );
  }

  if (element.type === 'stat') {
    return (
      <motion.div
        initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
        className={`${baseClasses} ${positionClasses[element.position]}`}
      >
        <p className="text-2xl font-bold text-[var(--v3-text-primary)]">{element.value}</p>
        <p className="text-xs text-[var(--v3-text-muted)]">{element.label}</p>
      </motion.div>
    );
  }

  if (element.type === 'metric') {
    const Icon = element.icon;
    return (
      <motion.div
        initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
        className={`${baseClasses} ${positionClasses[element.position]} hidden md:flex items-center gap-3`}
      >
        {Icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--v3-bg-card)]">
            <Icon className="h-5 w-5 text-[var(--v3-text-secondary)]" />
          </div>
        )}
        <div>
          <p className="text-lg font-bold text-[var(--v3-text-primary)]">{element.value}</p>
          <p className="text-xs text-[var(--v3-text-muted)]">{element.label}</p>
        </div>
      </motion.div>
    );
  }

  if (element.type === 'performance') {
    return (
      <motion.div
        initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
        className={`${positionClasses[element.position]} absolute z-10 hidden rounded-xl bg-gradient-to-r from-[var(--v3-accent-green)] to-emerald-600 p-3 text-white shadow-lg md:block`}
      >
        <p className="text-xl font-bold">{element.value}</p>
        <p className="text-xs opacity-90">{element.label}</p>
      </motion.div>
    );
  }

  if (element.type === 'channels') {
    return (
      <motion.div
        initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
        className={`${baseClasses} ${positionClasses[element.position]} hidden md:block`}
      >
        <p className="mb-2 text-xs font-medium text-[var(--v3-text-muted)]">{element.content}</p>
        <div className="flex gap-2">
          {element.channels?.map((channel) => (
            <span
              key={channel}
              className="rounded-full bg-[var(--v3-bg-card)] px-2 py-1 text-xs font-medium text-[var(--v3-text-secondary)]"
            >
              {channel}
            </span>
          ))}
        </div>
      </motion.div>
    );
  }

  if (element.type === 'notification') {
    return (
      <motion.div
        initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
        className={`${positionClasses[element.position]} absolute z-10 flex h-12 w-12 items-center justify-center rounded-full ${element.color} shadow-lg`}
      >
        <div className="text-center">
          <p className="text-lg font-bold leading-none">{element.value}</p>
          <p className="text-[8px] opacity-90">{element.label}</p>
        </div>
      </motion.div>
    );
  }

  if (element.type === 'badge') {
    return (
      <motion.div
        initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
        className={`${positionClasses[element.position]} absolute z-10 hidden rounded-full ${element.color} px-4 py-2 text-sm font-medium shadow-lg md:block`}
      >
        {element.content}
      </motion.div>
    );
  }

  if (element.type === 'cart') {
    return (
      <motion.div
        initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
        className={`${positionClasses[element.position]} absolute z-10 hidden md:flex h-14 w-14 items-center justify-center rounded-full bg-[var(--v3-accent-green)] text-white shadow-lg`}
      >
        <ShoppingCart className="h-6 w-6" />
        <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--v3-accent-gold)] text-xs font-bold text-[var(--v3-text-primary)]">
          {element.value}
        </span>
      </motion.div>
    );
  }

  if (element.type === 'sync') {
    return (
      <motion.div
        initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
        className={`${baseClasses} ${positionClasses[element.position]} hidden md:flex items-center gap-2 bg-gradient-to-r from-[var(--v3-accent-gold-light)] to-[var(--v3-bg-card)]`}
      >
        <ArrowUpRight className="h-4 w-4 text-[var(--v3-accent-gold)]" />
        <span className="text-sm font-medium text-[var(--v3-text-primary)]">{element.content}</span>
      </motion.div>
    );
  }

  if (element.type === 'price') {
    return (
      <motion.div
        initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
        className={`${baseClasses} ${positionClasses[element.position]} hidden md:block`}
      >
        <p className="text-xl font-bold text-[var(--v3-accent-green)]">{element.value}</p>
        <p className="text-xs text-[var(--v3-text-muted)]">{element.label}</p>
      </motion.div>
    );
  }

  if (element.type === 'loyalty-points') {
    return (
      <motion.div
        initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
        className={`${baseClasses} ${positionClasses[element.position]} hidden md:flex items-center gap-3`}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-rose-100 to-rose-200">
          <Gift className="h-5 w-5 text-rose-600" />
        </div>
        <div>
          <p className="text-lg font-bold text-[var(--v3-text-primary)]">{element.value}</p>
          <p className="text-xs text-[var(--v3-text-muted)]">{element.label}</p>
        </div>
      </motion.div>
    );
  }

  if (element.type === 'loyalty-tier') {
    return (
      <motion.div
        initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
        className={`${positionClasses[element.position]} absolute z-10 hidden md:flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-4 py-2 text-white shadow-lg`}
      >
        <Star className="h-4 w-4 fill-current" />
        <span className="text-sm font-semibold">{element.content}</span>
      </motion.div>
    );
  }

  return null;
}

function FeatureVisual({
  image,
  floatingElements,
}: {
  image: string;
  floatingElements: FloatingElement[];
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-2xl px-4 md:px-8">
      {/* Main Screenshot */}
      <motion.div
        initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl border border-[var(--v3-border)] bg-[var(--v3-bg-card)] shadow-[var(--v3-shadow-lg)]"
      >
        <Image
          src={image}
          alt="Feature screenshot"
          width={1200}
          height={750}
          className="h-auto w-full"
        />
      </motion.div>

      {/* Floating Elements */}
      {floatingElements.map((element, index) => (
        <FloatingElementComponent key={index} element={element} index={index} />
      ))}
    </div>
  );
}

export function ThaisV3Features() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="features" className="bg-[var(--v3-bg-primary)] py-20 md:py-28">
      <Container>
        {/* Header */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-[var(--v3-accent-green)]/20 bg-[var(--v3-accent-green)]/10 px-4 py-2 text-sm font-medium text-[var(--v3-accent-green)]">
            Ce que vous y gagnez
          </span>
          <h2 className="font-[family-name:var(--font-cormorant)] text-3xl font-semibold tracking-tight text-[var(--v3-text-primary)] md:text-4xl lg:text-5xl">
            Des résultats concrets,{' '}
            <span className="text-[var(--v3-accent-green)]">sans complexité</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--v3-text-secondary)]">
            Quatre bénéfices clés pour votre hôtel
          </p>
        </motion.div>

        {/* Features */}
        <div className="space-y-24 md:space-y-32">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20"
            >
              {/* Content - alternating sides */}
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                {/* Badge */}
                <span
                  className={`mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium ${feature.badgeColor}`}
                >
                  <feature.icon className="h-4 w-4" />
                  {feature.badge}
                </span>

                {/* Title */}
                <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-semibold text-[var(--v3-text-primary)] md:text-3xl lg:text-4xl">
                  {feature.title}
                </h3>
                <p className="mt-1 text-lg text-[var(--v3-text-muted)]">{feature.subtitle}</p>

                {/* Description */}
                <p className="mt-4 text-lg leading-relaxed text-[var(--v3-text-secondary)]">
                  {feature.description}
                </p>

                {/* Benefits */}
                <ul className="mt-6 space-y-3">
                  {feature.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--v3-accent-green)]/10">
                        <Check className="h-3.5 w-3.5 text-[var(--v3-accent-green)]" />
                      </div>
                      <span className="text-[var(--v3-text-primary)]">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Visual with floating elements */}
              <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <FeatureVisual image={feature.image} floatingElements={feature.floatingElements} />
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
