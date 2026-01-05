'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Workflow, BarChart3, ArrowRight, Check } from 'lucide-react';
import { Container } from '@/components/ui';
import { fadeInUp, defaultViewport } from '@/lib/animations';
import {
  WhatsAppMockup,
  WorkflowBuilderMockup,
  CampaignMockup,
  CRMMockup,
} from '@/components/mockups';

const modules = [
  {
    key: 'communication',
    icon: Mail,
    mockupComponent: WhatsAppMockup,
    features: ['multicanal', 'templates', 'personalization'],
  },
  {
    key: 'automation',
    icon: Workflow,
    mockupComponent: WorkflowBuilderMockup,
    features: ['triggers', 'conditions', 'noCode'],
  },
  {
    key: 'marketing',
    icon: MessageSquare,
    mockupComponent: CampaignMockup,
    features: ['campaigns', 'newsletter', 'loyalty'],
  },
  {
    key: 'tools',
    icon: BarChart3,
    mockupComponent: CRMMockup,
    features: ['crm', 'forms', 'analytics'],
  },
];

export function ModulesShowcase() {
  const t = useTranslations('modulesShowcase');

  return (
    <section>
      {modules.map((module, index) => {
        const isReversed = index % 2 === 1;
        const bgClass = index % 2 === 0 ? 'bg-white' : 'bg-brand-light/20';

        return (
          <div key={module.key} className={`${bgClass} py-16 md:py-24 overflow-hidden`}>
            <Container>
              <div className={`grid gap-8 lg:gap-16 items-center lg:grid-cols-2 ${isReversed ? 'lg:grid-flow-dense' : ''}`}>
                {/* Text Content */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={defaultViewport}
                  variants={fadeInUp}
                  className={isReversed ? 'lg:col-start-2' : ''}
                >
                  <div className={`flex items-center gap-3 mb-4`}>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary/10">
                      <module.icon className="h-6 w-6 text-brand-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-brand-dark md:text-3xl">
                      {t(`modules.${module.key}.title`)}
                    </h3>
                  </div>

                  <p className="text-lg text-zinc-600 leading-relaxed mb-6">
                    {t(`modules.${module.key}.description`)}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-3 mb-6">
                    {module.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-primary/10 shrink-0 mt-0.5">
                          <Check className="h-3.5 w-3.5 text-brand-primary" />
                        </div>
                        <span className="text-zinc-700">
                          {t(`modules.${module.key}.features.${feature}`)}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <motion.a
                    href="#"
                    className="inline-flex items-center gap-2 text-brand-primary font-medium hover:text-brand-dark transition-colors group"
                    whileHover={{ x: 5 }}
                  >
                    {t('learnMore')}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </motion.a>
                </motion.div>

                {/* Mockup Component */}
                <motion.div
                  initial={{ opacity: 0, x: isReversed ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={defaultViewport}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className={`${isReversed ? 'lg:col-start-1' : ''} flex justify-center`}
                >
                  <module.mockupComponent />
                </motion.div>
              </div>
            </Container>
          </div>
        );
      })}
    </section>
  );
}

