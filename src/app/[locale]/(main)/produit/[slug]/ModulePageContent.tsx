'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Check, X, Star, Quote, Mail, TrendingUp, Shield, Zap, GitBranch, MessageSquare, Clock, Users, MailOpen, Send, Gift, FileText, ShoppingBag, BarChart3, Eye, Euro } from 'lucide-react';
import { IntegrationsShowcase, FeaturesTabbed } from '@/components/sections';
import type { TabConfig, FeaturesTabbedDirectData } from '@/components/sections';
import { cn } from '@/lib/utils';
import { modules } from '@/data/modules';
import { AnimatedStat } from '@/components/ui/AnimatedStat';
import { FaqAccordion } from '@/components/ui/FaqAccordion';
import { Container, Badge, ButtonLink } from '@/components/ui';
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
  slideInLeft,
  slideInRight,
  defaultViewport,
} from '@/lib/animations';

// Import mockups — Hero mockups
import { DashboardMockup } from '@/components/mockups/DashboardMockup';
import { EmailMockup } from '@/components/mockups/EmailMockup';
import { WorkflowBuilderMockup } from '@/components/mockups/WorkflowBuilderMockup';
import { CampaignMockup } from '@/components/mockups/CampaignMockup';
import { CRMMockup } from '@/components/mockups/CRMMockup';
import { WhatsAppMockup } from '@/components/mockups/WhatsAppMockup';
// Email feature mockups
import { EmailEditorMockup } from '@/components/mockups/EmailEditorMockup';
import { EmailPersonalizationMockup } from '@/components/mockups/EmailPersonalizationMockup';
import { EmailAnalyticsMockup } from '@/components/mockups/EmailAnalyticsMockup';
// SMS feature mockups
import { SmsSendMockup } from '@/components/mockups/SmsSendMockup';
import { SmsBidirectionalMockup } from '@/components/mockups/SmsBidirectionalMockup';
import { SmsRgpdMockup } from '@/components/mockups/SmsRgpdMockup';
import { SmsHeroMockup } from '@/components/mockups/SmsHeroMockup';
// WhatsApp feature mockups
import { WhatsAppChatbotMockup } from '@/components/mockups/WhatsAppChatbotMockup';
import { WhatsAppTemplateMockup } from '@/components/mockups/WhatsAppTemplateMockup';
import { WhatsAppHistoryMockup } from '@/components/mockups/WhatsAppHistoryMockup';
import { WhatsAppHeroMockup } from '@/components/mockups/WhatsAppHeroMockup';
// Newsletter feature mockups
import { NewsletterEditorMockup } from '@/components/mockups/NewsletterEditorMockup';
import { NewsletterSegmentMockup } from '@/components/mockups/NewsletterSegmentMockup';
import { NewsletterScheduleMockup } from '@/components/mockups/NewsletterScheduleMockup';
// Fidélité feature mockups
import { LoyaltyPointsMockup } from '@/components/mockups/LoyaltyPointsMockup';
import { LoyaltyRewardsMockup } from '@/components/mockups/LoyaltyRewardsMockup';
import { LoyaltyPortalMockup } from '@/components/mockups/LoyaltyPortalMockup';
// Automatisations feature mockups
import { WorkflowBuilderFeatureMockup } from '@/components/mockups/WorkflowBuilderFeatureMockup';
import { WorkflowTriggersMockup } from '@/components/mockups/WorkflowTriggersMockup';
import { WorkflowConditionsMockup } from '@/components/mockups/WorkflowConditionsMockup';
// CRM feature mockups
import { CrmClientCardMockup } from '@/components/mockups/CrmClientCardMockup';
import { CrmPmsSyncMockup } from '@/components/mockups/CrmPmsSyncMockup';
import { CrmSegmentsMockup } from '@/components/mockups/CrmSegmentsMockup';
// Formulaires feature mockups
import { FormBuilderMockup } from '@/components/mockups/FormBuilderMockup';
import { FormAutoSendMockup } from '@/components/mockups/FormAutoSendMockup';
import { FormAnalysisMockup } from '@/components/mockups/FormAnalysisMockup';
// Avis feature mockups
import { ReviewHeroMockup } from '@/components/mockups/ReviewHeroMockup';
import { ReviewCollectMockup } from '@/components/mockups/ReviewCollectMockup';
import { ReviewDashboardMockup } from '@/components/mockups/ReviewDashboardMockup';
import { ReviewAiResponseMockup } from '@/components/mockups/ReviewAiResponseMockup';
// Analytics feature mockups
import { AnalyticsHeroMockup } from '@/components/mockups/AnalyticsHeroMockup';
import { AnalyticsDashboardMockup } from '@/components/mockups/AnalyticsDashboardMockup';
import { AnalyticsReportMockup } from '@/components/mockups/AnalyticsReportMockup';
import { AnalyticsCompareMockup } from '@/components/mockups/AnalyticsCompareMockup';
// Hub Messagerie feature mockups
import { HubInboxMockup } from '@/components/mockups/HubInboxMockup';
import { HubHeroMockup } from '@/components/mockups/HubHeroMockup';
import { HubClientViewMockup } from '@/components/mockups/HubClientViewMockup';
import { HubTemplatesMockup } from '@/components/mockups/HubTemplatesMockup';
// Ventes Additionnelles feature mockups
import { UpsellOfferMockup } from '@/components/mockups/UpsellOfferMockup';
import { UpsellTimingMockup } from '@/components/mockups/UpsellTimingMockup';
import { UpsellCheckoutMockup } from '@/components/mockups/UpsellCheckoutMockup';
// Paiements feature mockups
import { PaymentHeroMockup } from '@/components/mockups/PaymentHeroMockup';
import { PaymentLinkMockup } from '@/components/mockups/PaymentLinkMockup';
import { PaymentInstantMockup } from '@/components/mockups/PaymentInstantMockup';
import { PaymentCautionMockup } from '@/components/mockups/PaymentCautionMockup';
import { PaymentEmpreinteMockup } from '@/components/mockups/PaymentEmpreinteMockup';
import { PaymentTrackingMockup } from '@/components/mockups/PaymentTrackingMockup';
import { PaymentProvidersMockup } from '@/components/mockups/PaymentProvidersMockup';

interface ModulePageContentProps {
  moduleSlug: string;
}

const mockupComponents: Record<string, React.ComponentType> = {
  DashboardMockup,
  EmailMockup,
  WorkflowBuilderMockup,
  CampaignMockup,
  CRMMockup,
  WhatsAppMockup,
  PhoneMockup: DashboardMockup,
  EmailEditorMockup,
  EmailPersonalizationMockup,
  EmailAnalyticsMockup,
  SmsSendMockup,
  SmsBidirectionalMockup,
  SmsRgpdMockup,
  SmsHeroMockup,
  WhatsAppChatbotMockup,
  WhatsAppTemplateMockup,
  WhatsAppHistoryMockup,
  WhatsAppHeroMockup,
  NewsletterEditorMockup,
  NewsletterSegmentMockup,
  NewsletterScheduleMockup,
  LoyaltyPointsMockup,
  LoyaltyRewardsMockup,
  LoyaltyPortalMockup,
  WorkflowBuilderFeatureMockup,
  WorkflowTriggersMockup,
  WorkflowConditionsMockup,
  CrmClientCardMockup,
  CrmPmsSyncMockup,
  CrmSegmentsMockup,
  FormBuilderMockup,
  FormAutoSendMockup,
  FormAnalysisMockup,
  ReviewHeroMockup,
  ReviewCollectMockup,
  ReviewDashboardMockup,
  ReviewAiResponseMockup,
  AnalyticsHeroMockup,
  AnalyticsDashboardMockup,
  AnalyticsReportMockup,
  AnalyticsCompareMockup,
  HubInboxMockup,
  HubHeroMockup,
  HubClientViewMockup,
  HubTemplatesMockup,
  UpsellOfferMockup,
  UpsellTimingMockup,
  UpsellCheckoutMockup,
  PaymentHeroMockup,
  PaymentLinkMockup,
  PaymentInstantMockup,
  PaymentCautionMockup,
  PaymentEmpreinteMockup,
  PaymentTrackingMockup,
  PaymentProvidersMockup,
};


export default function ModulePageContent({ moduleSlug }: ModulePageContentProps) {
  const t = useTranslations('modulePage');
  const prefersReducedMotion = useReducedMotion();
  const module = modules[moduleSlug];

  if (!module) {
    return null;
  }

  const motionProps = prefersReducedMotion
    ? {}
    : {
        initial: 'hidden' as const,
        whileInView: 'visible' as const,
        viewport: defaultViewport,
      };

  const MockupComponent = mockupComponents[module.mockup] || DashboardMockup;
  const Icon = module.icon;

  const relatedModulesData = module.relatedModules
    .map((slug) => modules[slug])
    .filter(Boolean);

  // Build FeaturesTabbed config from module.features
  const featureTabs: TabConfig[] = module.features.map((feature, i) => {
    const MockupComp = feature.mockup ? mockupComponents[feature.mockup] : null;
    let mockupContent;

    // Special: automatisations feature 0 — screenshot + floating elements
    if (moduleSlug === 'automatisations' && i === 0 && feature.image) {
      mockupContent = (
        <div className="relative h-full w-full">
          <Image
            src={feature.image}
            alt={feature.title}
            width={1232}
            height={770}
            className="h-full w-full object-cover object-top"
          />
          {/* Floating: Ajouter un email */}
          <div className="absolute left-[2%] top-[6%] animate-[float_4s_ease-in-out_infinite] flex items-center gap-2 rounded-xl border border-white/70 bg-white/90 px-3 py-2 shadow-lg backdrop-blur-md">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-orange-100">
              <Mail className="h-3.5 w-3.5 text-orange-600" />
            </div>
            <div>
              <p className="text-[10px] font-semibold text-gray-800">+ Ajouter un email</p>
              <p className="text-[8px] text-gray-500">Action · pré-séjour J-3</p>
            </div>
          </div>
          {/* Floating: Condition */}
          <div className="absolute right-[2%] top-[5%] animate-[float_3.8s_ease-in-out_infinite_0.3s] flex items-center gap-2 rounded-xl border border-white/70 bg-white/90 px-3 py-2 shadow-lg backdrop-blur-md">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-purple-100">
              <GitBranch className="h-3.5 w-3.5 text-purple-600" />
            </div>
            <div>
              <p className="text-[10px] font-semibold text-gray-800">Condition</p>
              <p className="text-[8px] text-gray-500">Si client fidèle → surclassement</p>
            </div>
          </div>
          {/* Floating: Ajouter SMS */}
          <div className="absolute bottom-[10%] left-[2%] animate-[float_4.2s_ease-in-out_infinite_0.5s] flex items-center gap-2 rounded-xl border border-white/70 bg-white/90 px-3 py-2 shadow-lg backdrop-blur-md">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-100">
              <MessageSquare className="h-3.5 w-3.5 text-blue-600" />
            </div>
            <div>
              <p className="text-[10px] font-semibold text-gray-800">+ Ajouter un SMS</p>
              <p className="text-[8px] text-gray-500">Rappel check-in · J-1</p>
            </div>
          </div>
          {/* Floating: Délai */}
          <div className="absolute bottom-[10%] right-[2%] animate-[float_3.6s_ease-in-out_infinite_0.7s] flex items-center gap-2 rounded-xl border border-white/70 bg-white/90 px-3 py-2 shadow-lg backdrop-blur-md">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-100">
              <Clock className="h-3.5 w-3.5 text-emerald-600" />
            </div>
            <div>
              <p className="text-[10px] font-semibold text-gray-800">+ Attendre 2 jours</p>
              <p className="text-[8px] text-gray-500">Délai avant prochaine étape</p>
            </div>
          </div>
        </div>
      );
    } else if (moduleSlug === 'automatisations' && i === 1 && MockupComp) {
      // Feature 2: Triggers — mockup + floating elements
      mockupContent = (
        <div className="relative h-full w-full">
          <MockupComp />
          {/* Floating: Check-in détecté */}
          <div className="absolute right-[3%] top-[4%] animate-[float_4s_ease-in-out_infinite] flex items-center gap-2 rounded-xl border border-white/70 bg-white/90 px-3 py-2 shadow-lg backdrop-blur-md">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-100">
              <Zap className="h-3.5 w-3.5 text-emerald-600" />
            </div>
            <div>
              <p className="text-[10px] font-semibold text-gray-800">Check-in détecté</p>
              <p className="text-[8px] text-gray-500">Workflow déclenché · Ch. 108</p>
            </div>
          </div>
          {/* Floating: Déclencheurs actifs */}
          <div className="absolute bottom-[6%] right-[3%] animate-[float_3.5s_ease-in-out_infinite_0.5s] flex items-center gap-2 rounded-full bg-gray-900/85 px-3.5 py-1.5 shadow-lg backdrop-blur-sm">
            <div className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />
            </div>
            <span className="text-[10px] font-semibold text-white">8 déclencheurs actifs</span>
          </div>
        </div>
      );
    } else if (moduleSlug === 'automatisations' && i === 2 && feature.image) {
      // Feature 3: Conditions — screenshot + floating elements
      mockupContent = (
        <div className="relative h-full w-full">
          <Image
            src={feature.image}
            alt={feature.title}
            width={1232}
            height={770}
            className="h-full w-full object-cover object-top"
          />
          {/* Floating: Branche couple */}
          <div className="absolute left-[2%] top-[5%] animate-[float_4s_ease-in-out_infinite] flex items-center gap-2 rounded-xl border border-white/70 bg-white/90 px-3 py-2 shadow-lg backdrop-blur-md">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-pink-100">
              <Star className="h-3.5 w-3.5 text-pink-600" />
            </div>
            <div>
              <p className="text-[10px] font-semibold text-gray-800">Plan SPA détecté</p>
              <p className="text-[8px] text-gray-500">→ Email offre bien-être</p>
            </div>
          </div>
          {/* Floating: Formulaire condition */}
          <div className="absolute right-[2%] top-[5%] animate-[float_3.8s_ease-in-out_infinite_0.3s] flex items-center gap-2 rounded-xl border border-white/70 bg-white/90 px-3 py-2 shadow-lg backdrop-blur-md">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-purple-100">
              <GitBranch className="h-3.5 w-3.5 text-purple-600" />
            </div>
            <div>
              <p className="text-[10px] font-semibold text-gray-800">4 branches actives</p>
              <p className="text-[8px] text-gray-500">Chaque profil a son parcours</p>
            </div>
          </div>
          {/* Floating: Taux de conversion */}
          <div className="absolute bottom-[8%] right-[2%] animate-[float_3.5s_ease-in-out_infinite_0.5s] flex items-center gap-2.5 rounded-full bg-gray-900/85 px-4 py-2 shadow-lg backdrop-blur-sm">
            <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
            <span className="text-[11px] font-bold text-white">+22%</span>
            <span className="text-[9px] text-gray-400">taux de conversion</span>
          </div>
        </div>
      );
    } else if (moduleSlug === 'sms' && MockupComp) {
      // SMS features — mockup + floating elements
      const smsFloaters: Record<number, React.ReactNode> = {
        0: (
          <>
            <div className="absolute right-[2%] top-[4%] animate-[float_4s_ease-in-out_infinite] flex items-center gap-2 rounded-full bg-gray-900/85 px-3.5 py-1.5 shadow-lg backdrop-blur-sm">
              <div className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />
              </div>
              <span className="text-[10px] font-semibold text-white">342 SMS envoyés aujourd&apos;hui</span>
            </div>
            <div className="absolute bottom-[5%] left-[2%] animate-[float_3.5s_ease-in-out_infinite_0.5s] flex items-center gap-2 rounded-xl border border-white/70 bg-white/90 px-3 py-2 shadow-lg backdrop-blur-md">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-brand-primary/10">
                <Check className="h-3.5 w-3.5 text-brand-primary" />
              </div>
              <div>
                <p className="text-[10px] font-semibold text-gray-800">98% délivrés</p>
                <p className="text-[8px] text-gray-500">Taux de livraison</p>
              </div>
            </div>
          </>
        ),
        1: (
          <>
            <div className="absolute left-[2%] top-[4%] animate-[float_4.2s_ease-in-out_infinite] flex items-center gap-2 rounded-xl border border-white/70 bg-white/90 px-3 py-2 shadow-lg backdrop-blur-md">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-100">
                <MessageSquare className="h-3.5 w-3.5 text-blue-600" />
              </div>
              <div>
                <p className="text-[10px] font-semibold text-gray-800">Réponse reçue</p>
                <p className="text-[8px] text-gray-500">Sophie — il y a 2 min</p>
              </div>
            </div>
            <div className="absolute bottom-[5%] right-[2%] animate-[float_3.8s_ease-in-out_infinite_0.3s] flex items-center gap-2.5 rounded-full bg-gray-900/85 px-4 py-2 shadow-lg backdrop-blur-sm">
              <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-[11px] font-bold text-white">5x</span>
              <span className="text-[9px] text-gray-400">plus de réponses vs email</span>
            </div>
          </>
        ),
        2: (
          <>
            <div className="absolute right-[2%] top-[4%] animate-[float_3.5s_ease-in-out_infinite_0.2s] flex items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 shadow-lg">
              <Shield className="h-3.5 w-3.5 text-white" />
              <span className="text-[10px] font-bold text-white">0 plainte CNIL</span>
            </div>
          </>
        ),
      };

      mockupContent = (
        <div className="relative h-full w-full">
          <MockupComp />
          {smsFloaters[i]}
        </div>
      );
    } else if (moduleSlug === 'whatsapp') {
      // WhatsApp features — mockup or image + floating elements
      const waFloaters: Record<number, React.ReactNode> = {
        0: (
          <>
            <div className="absolute left-[2%] top-[4%] animate-[float_4s_ease-in-out_infinite] flex items-center gap-2 rounded-xl border border-white/70 bg-white/90 px-3 py-2 shadow-lg backdrop-blur-md">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#25D366]/10">
                <MessageSquare className="h-3.5 w-3.5 text-[#25D366]" />
              </div>
              <div>
                <p className="text-[10px] font-semibold text-gray-800">Spa réservé via WhatsApp</p>
                <p className="text-[8px] text-gray-500">Alexander N. · Duo 14h</p>
              </div>
            </div>
            <div className="absolute right-[2%] bottom-[5%] animate-[float_3.5s_ease-in-out_infinite_0.5s] flex items-center gap-2.5 rounded-full bg-gray-900/85 px-4 py-2 shadow-lg backdrop-blur-sm">
              <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-[11px] font-bold text-white">+45%</span>
              <span className="text-[9px] text-gray-400">réservations services additionnels</span>
            </div>
          </>
        ),
        1: (
          <>
            <div className="absolute left-[2%] top-[4%] animate-[float_4.2s_ease-in-out_infinite] flex items-center gap-2 rounded-xl border border-white/70 bg-white/90 px-3 py-2 shadow-lg backdrop-blur-md">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-green-100">
                <Check className="h-3.5 w-3.5 text-green-600" />
              </div>
              <div>
                <p className="text-[10px] font-semibold text-gray-800">Template approuvé Meta</p>
                <p className="text-[8px] text-gray-500">FR · EN · ES · DE</p>
              </div>
            </div>
            <div className="absolute bottom-[5%] right-[2%] animate-[float_3.8s_ease-in-out_infinite_0.3s] flex items-center gap-2 rounded-full bg-gray-900/85 px-3.5 py-1.5 shadow-lg backdrop-blur-sm">
              <div className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />
              </div>
              <span className="text-[10px] font-semibold text-white">Variables PMS auto-remplies</span>
            </div>
          </>
        ),
        2: (
          <>
            <div className="absolute right-[2%] top-[4%] animate-[float_4s_ease-in-out_infinite_0.2s] flex items-center gap-2 rounded-xl border border-white/70 bg-white/90 px-3 py-2 shadow-lg backdrop-blur-md">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-100">
                <Mail className="h-3.5 w-3.5 text-blue-600" />
              </div>
              <div>
                <p className="text-[10px] font-semibold text-gray-800">3 canaux, 1 vue</p>
                <p className="text-[8px] text-gray-500">Email + SMS + WhatsApp</p>
              </div>
            </div>
            <div className="absolute bottom-[5%] left-[2%] animate-[float_3.6s_ease-in-out_infinite_0.4s] flex items-center gap-2 rounded-xl border border-white/70 bg-white/90 px-3 py-2 shadow-lg backdrop-blur-md">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-brand-primary/10">
                <Users className="h-3.5 w-3.5 text-brand-primary" />
              </div>
              <div>
                <p className="text-[10px] font-semibold text-gray-800">Fiche client complète</p>
                <p className="text-[8px] text-gray-500">Notes, tags, préférences</p>
              </div>
            </div>
          </>
        ),
      };

      const inner = feature.image ? (
        <Image src={feature.image} alt={feature.title} width={1232} height={770} className="h-full w-full object-cover object-top" />
      ) : MockupComp ? (
        <MockupComp />
      ) : null;

      mockupContent = (
        <div className="relative h-full w-full">
          {inner}
          {waFloaters[i]}
        </div>
      );
    } else if (moduleSlug === 'hub-messagerie') {
      // Hub Messagerie features — mockup + floating elements
      const hubFloaters: Record<number, React.ReactNode> = {
        0: (
          <>
            <div className="absolute right-[2%] top-[4%] animate-[float_4s_ease-in-out_infinite] flex items-center gap-2 rounded-xl border border-white/70 bg-white/90 px-3 py-2 shadow-lg backdrop-blur-md">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-brand-primary/10">
                <Mail className="h-3.5 w-3.5 text-brand-primary" />
              </div>
              <div>
                <p className="text-[10px] font-semibold text-gray-800">Tous les canaux, 1 inbox</p>
                <p className="text-[8px] text-gray-500">Email · SMS · WhatsApp</p>
              </div>
            </div>
            <div className="absolute bottom-[5%] left-[2%] animate-[float_3.5s_ease-in-out_infinite_0.5s] flex items-center gap-2.5 rounded-full bg-gray-900/85 px-4 py-2 shadow-lg backdrop-blur-sm">
              <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-[11px] font-bold text-white">0</span>
              <span className="text-[9px] text-gray-400">message perdu</span>
            </div>
          </>
        ),
        1: (
          <>
            <div className="absolute left-[2%] top-[4%] animate-[float_4.2s_ease-in-out_infinite] flex items-center gap-2 rounded-xl border border-white/70 bg-white/90 px-3 py-2 shadow-lg backdrop-blur-md">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-100">
                <Star className="h-3.5 w-3.5 text-amber-600" />
              </div>
              <div>
                <p className="text-[10px] font-semibold text-gray-800">Client Gold · 8 séjours</p>
                <p className="text-[8px] text-gray-500">Préfère vue mer, oreiller ferme</p>
              </div>
            </div>
            <div className="absolute bottom-[5%] right-[2%] animate-[float_3.8s_ease-in-out_infinite_0.3s] flex items-center gap-2 rounded-xl border border-white/70 bg-white/90 px-3 py-2 shadow-lg backdrop-blur-md">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-purple-100">
                <MessageSquare className="h-3.5 w-3.5 text-purple-600" />
              </div>
              <div>
                <p className="text-[10px] font-semibold text-gray-800">Contexte complet</p>
                <p className="text-[8px] text-gray-500">Avant de répondre</p>
              </div>
            </div>
          </>
        ),
        2: (
          <>
            <div className="absolute right-[2%] top-[4%] animate-[float_4s_ease-in-out_infinite_0.2s] flex items-center gap-2 rounded-xl border border-white/70 bg-white/90 px-3 py-2 shadow-lg backdrop-blur-md">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-brand-primary/10">
                <Clock className="h-3.5 w-3.5 text-brand-primary" />
              </div>
              <div>
                <p className="text-[10px] font-semibold text-gray-800">Réponse en 5 secondes</p>
                <p className="text-[8px] text-gray-500">Templates pré-remplis</p>
              </div>
            </div>
            <div className="absolute bottom-[5%] left-[2%] animate-[float_3.6s_ease-in-out_infinite_0.4s] flex items-center gap-2.5 rounded-full bg-gray-900/85 px-4 py-2 shadow-lg backdrop-blur-sm">
              <Zap className="h-3.5 w-3.5 text-amber-400" />
              <span className="text-[11px] font-bold text-white">128x</span>
              <span className="text-[9px] text-gray-400">template WiFi utilisé</span>
            </div>
          </>
        ),
      };

      const hubInner = MockupComp ? <MockupComp /> : null;

      mockupContent = (
        <div className="relative h-full w-full">
          {hubInner}
          {hubFloaters[i]}
        </div>
      );
    } else if (feature.image) {
      mockupContent = (
        <Image
          src={feature.image}
          alt={feature.title}
          width={1232}
          height={770}
          className="h-full w-full object-cover object-top"
        />
      );
    } else if (MockupComp) {
      mockupContent = <MockupComp />;
    } else {
      mockupContent = (
        <div className="flex h-full items-center justify-center"><span className="text-sm text-text-muted">{feature.title}</span></div>
      );
    }

    const phoneMockups = ['UpsellCheckoutMockup', 'WhatsAppMockup', 'LoyaltyPortalMockup'];
    return {
      key: `feature_${i}`,
      icon: feature.icon,
      mockup: mockupContent,
      isImage: !!feature.image,
      hideChrome: feature.mockup ? phoneMockups.includes(feature.mockup) : false,
    };
  });

  const featuresDirectData: FeaturesTabbedDirectData = {
    badge: t('features.title'),
    title: t('features.title'),
    subtitle: t('features.subtitle'),
    cta: t('cta.demo'),
    items: Object.fromEntries(
      module.features.map((feature, i) => [
        `feature_${i}`,
        { title: feature.title, description: feature.description },
      ])
    ),
  };

  return (
    <main className="min-h-screen bg-white">
      {/* ===== 1. HERO (light gradient — homepage style) ===== */}
      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#CCE2E1_0%,#ffffff_35%,#ffffff_65%,#F7FAFA_100%)] pt-12 pb-16 md:pt-16 md:pb-24">
        {/* Grid pattern + teal glow accents */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_80%_15%,rgba(0,111,104,0.08),transparent_55%)]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_15%_85%,rgba(0,111,104,0.06),transparent_55%)]" />

        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <motion.div {...motionProps} variants={fadeInUp} className="flex flex-col text-center lg:text-left">
              <Badge variant="primary" className="mb-6 gap-2 self-center border-brand-primary/20 bg-brand-primary/8 text-xs font-semibold tracking-wide lg:self-start">
                <Icon className="h-3.5 w-3.5 text-brand-primary" />
                Automatisation email hôtelière
              </Badge>

              <h1 className="text-3xl font-bold leading-[1.15] tracking-tight text-brand-dark sm:text-4xl md:text-5xl lg:text-[3.25rem]">
                {module.headline}
              </h1>

              <p className="mt-5 max-w-lg text-base leading-relaxed text-text-secondary md:text-lg">
                {module.description}
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
                <ButtonLink
                  href="https://app.lemcal.com/@trigger-flow/demo"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  size="lg"
                  className="group gap-2 shadow-lg shadow-brand-primary/20 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-primary/30"
                >
                  {t('cta.demo')}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </ButtonLink>
                <ButtonLink
                  href="/tarifs"
                  variant="secondary"
                  size="lg"
                  className="gap-2"
                >
                  {t('cta.pricing')}
                </ButtonLink>
              </div>

              {/* Social proof — logos clients — masqué */}
            </motion.div>

            <motion.div
              {...motionProps}
              variants={fadeInUp}
              className="relative"
            >
              <div className="relative z-10 overflow-hidden rounded-2xl border border-border-light bg-white shadow-[var(--shadow-lg)]">
                {module.heroImage ? (
                  <Image
                    src={module.heroImage}
                    alt={module.headline}
                    width={1232}
                    height={770}
                    priority
                    className="w-full h-auto"
                  />
                ) : (
                  <MockupComponent />
                )}
              </div>
              <div className="pointer-events-none absolute -bottom-8 -right-8 h-64 w-64 rounded-full bg-brand-primary/10 blur-3xl" />
              <div className="pointer-events-none absolute -left-8 -top-8 h-48 w-48 rounded-full bg-brand-primary/5 blur-2xl" />

              {/* Floating elements — email module */}
              {moduleSlug === 'email' && (
                <>
                  {/* Top-right: Email sent confirmation */}
                  <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute -top-3 right-[8%] z-20 md:-top-5 md:right-[12%]"
                  >
                    <motion.div
                      animate={!prefersReducedMotion ? { y: [0, -6, 0] } : {}}
                      transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
                      className="flex items-center gap-2.5 rounded-xl border border-white/60 bg-white/80 px-3 py-2 shadow-lg backdrop-blur-md"
                    >
                      <div className="h-full w-1 self-stretch rounded-full bg-green-500" />
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                        <Check className="h-3.5 w-3.5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold text-gray-800">Email envoyé</p>
                        <p className="text-[10px] text-gray-500">Confirmation — Ch. 204</p>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Left: Deliverability badge */}
                  <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute -left-2 top-[22%] z-20 md:-left-6 md:top-[18%]"
                  >
                    <motion.div
                      animate={!prefersReducedMotion ? { y: [0, 5, 0] } : {}}
                      transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
                      className="rounded-xl border border-white/60 bg-white/80 px-2.5 py-2 shadow-md backdrop-blur-md"
                    >
                      <div className="flex items-center gap-1.5">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-primary/10">
                          <Shield className="h-3 w-3 text-brand-primary" />
                        </div>
                        <div>
                          <p className="text-[10px] font-semibold text-gray-800">Délivrabilité</p>
                          <p className="text-[10px] font-bold text-brand-primary">98.2%</p>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Right: Open rate */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute -right-1 bottom-[22%] z-30 md:-right-8 md:bottom-[16%]"
                  >
                    <motion.div
                      animate={!prefersReducedMotion ? { y: [0, -10, 0] } : {}}
                      transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
                      className="flex items-center gap-2.5 rounded-full bg-gray-900/90 px-5 py-2.5 shadow-xl backdrop-blur-sm"
                    >
                      <TrendingUp className="h-4 w-4 text-emerald-400" />
                      <span className="text-base font-bold tabular-nums text-white">98%</span>
                      <span className="text-[10px] text-gray-400">taux d&apos;ouverture</span>
                    </motion.div>
                  </motion.div>

                  {/* Bottom-left: Emails sent counter */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.8, duration: 0.5 }}
                    className="absolute -bottom-3 left-[6%] z-20 md:-bottom-4 md:left-[8%]"
                  >
                    <motion.div
                      animate={!prefersReducedMotion ? { y: [0, 4, 0] } : {}}
                      transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                      className="flex items-center gap-2 rounded-full bg-gray-900/90 px-3.5 py-1.5 shadow-lg backdrop-blur-sm"
                    >
                      <div className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                      </div>
                      <span className="text-xs font-bold tabular-nums text-white">7 243</span>
                      <span className="text-[9px] text-gray-400">emails envoyés ce mois</span>
                    </motion.div>
                  </motion.div>
                </>
              )}

              {/* Floating elements — automatisations module */}
              {moduleSlug === 'automatisations' && (
                <>
                  {/* Top-right: Large card — profil adapté avec mini workflow */}
                  <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute -top-4 right-[4%] z-20 md:-top-6 md:right-[8%]"
                  >
                    <motion.div
                      animate={!prefersReducedMotion ? { y: [0, -8, 0] } : {}}
                      transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
                      className="rounded-2xl border border-white/60 bg-white/90 p-3.5 shadow-xl backdrop-blur-md"
                    >
                      <div className="flex items-center gap-2 mb-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-primary/10">
                          <Users className="h-4 w-4 text-brand-primary" />
                        </div>
                        <div>
                          <p className="text-[11px] font-bold text-gray-800">Email adapté au profil</p>
                          <p className="text-[9px] text-gray-500">Personnalisation automatique</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="rounded-full bg-pink-100 px-2 py-0.5 text-[8px] font-semibold text-pink-700">Couple</span>
                        <span className="text-[9px] text-gray-400">→</span>
                        <span className="rounded-full bg-pink-50 px-2 py-0.5 text-[8px] text-pink-600">Offre spa</span>
                      </div>
                      <div className="mt-1 flex items-center gap-1.5">
                        <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[8px] font-semibold text-blue-700">Famille</span>
                        <span className="text-[9px] text-gray-400">→</span>
                        <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[8px] text-blue-600">Kids club</span>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Left: Relance auto — compact */}
                  <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute -left-2 top-[30%] z-20 md:-left-6 md:top-[25%]"
                  >
                    <motion.div
                      animate={!prefersReducedMotion ? { y: [0, 5, 0] } : {}}
                      transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
                      className="flex items-center gap-2 rounded-xl border border-white/60 bg-white/85 px-3 py-2 shadow-lg backdrop-blur-md"
                    >
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-100">
                        <MailOpen className="h-3.5 w-3.5 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold text-gray-800">Relance automatique</p>
                        <p className="text-[9px] text-gray-500">Si non ouvert après 48h</p>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Right: Temps gagné — dark pill */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute -right-1 bottom-[26%] z-30 md:-right-8 md:bottom-[18%]"
                  >
                    <motion.div
                      animate={!prefersReducedMotion ? { y: [0, -10, 0] } : {}}
                      transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
                      className="flex items-center gap-2.5 rounded-full bg-gray-900/90 px-5 py-2.5 shadow-xl backdrop-blur-sm"
                    >
                      <TrendingUp className="h-4 w-4 text-emerald-400" />
                      <span className="text-base font-bold tabular-nums text-white">+35%</span>
                      <span className="text-[10px] text-gray-400">de ventes additionnelles</span>
                    </motion.div>
                  </motion.div>

                  {/* Bottom-left: Scénarios exécutés — dark pill */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.8, duration: 0.5 }}
                    className="absolute -bottom-3 left-[6%] z-20 md:-bottom-4 md:left-[8%]"
                  >
                    <motion.div
                      animate={!prefersReducedMotion ? { y: [0, 4, 0] } : {}}
                      transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                      className="flex items-center gap-2 rounded-full bg-gray-900/90 px-3.5 py-1.5 shadow-lg backdrop-blur-sm"
                    >
                      <div className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                      </div>
                      <span className="text-xs font-bold tabular-nums text-white">2 847</span>
                      <span className="text-[9px] text-gray-400">scénarios exécutés ce mois</span>
                    </motion.div>
                  </motion.div>
                </>
              )}

              {/* Floating elements — formulaires module */}
              {moduleSlug === 'formulaires' && (
                <>
                  {/* Top-right: Form completed */}
                  <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute -top-3 right-[8%] z-20 md:-top-5 md:right-[12%]"
                  >
                    <motion.div
                      animate={!prefersReducedMotion ? { y: [0, -6, 0] } : {}}
                      transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
                      className="flex items-center gap-2.5 rounded-xl border border-white/60 bg-white/80 px-3 py-2 shadow-lg backdrop-blur-md"
                    >
                      <div className="h-full w-1 self-stretch rounded-full bg-green-500" />
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                        <Check className="h-3.5 w-3.5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold text-gray-800">Pré-check-in complété</p>
                        <p className="text-[10px] text-gray-500">L. Martin — Ch. 312</p>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Left: Completion rate */}
                  <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute -left-2 top-[22%] z-20 md:-left-6 md:top-[18%]"
                  >
                    <motion.div
                      animate={!prefersReducedMotion ? { y: [0, 5, 0] } : {}}
                      transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
                      className="rounded-xl border border-white/60 bg-white/80 px-2.5 py-2 shadow-md backdrop-blur-md"
                    >
                      <div className="flex items-center gap-1.5">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-primary/10">
                          <FileText className="h-3 w-3 text-brand-primary" />
                        </div>
                        <div>
                          <p className="text-[10px] font-semibold text-gray-800">Taux de complétion</p>
                          <p className="text-[10px] font-bold text-brand-primary">75%</p>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Right: Check-in time saved */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute -right-1 bottom-[22%] z-30 md:-right-8 md:bottom-[16%]"
                  >
                    <motion.div
                      animate={!prefersReducedMotion ? { y: [0, -10, 0] } : {}}
                      transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
                      className="flex items-center gap-2.5 rounded-full bg-gray-900/90 px-5 py-2.5 shadow-xl backdrop-blur-sm"
                    >
                      <TrendingUp className="h-4 w-4 text-emerald-400" />
                      <span className="text-base font-bold tabular-nums text-white">2 min</span>
                      <span className="text-[10px] text-gray-400">de check-in au lieu de 8</span>
                    </motion.div>
                  </motion.div>

                  {/* Bottom-left: Forms submitted */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.8, duration: 0.5 }}
                    className="absolute -bottom-3 left-[6%] z-20 md:-bottom-4 md:left-[8%]"
                  >
                    <motion.div
                      animate={!prefersReducedMotion ? { y: [0, 4, 0] } : {}}
                      transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                      className="flex items-center gap-2 rounded-full bg-gray-900/90 px-3.5 py-1.5 shadow-lg backdrop-blur-sm"
                    >
                      <div className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                      </div>
                      <span className="text-xs font-bold tabular-nums text-white">1 340</span>
                      <span className="text-[9px] text-gray-400">formulaires complétés ce mois</span>
                    </motion.div>
                  </motion.div>
                </>
              )}

              {/* Floating elements — ventes-additionnelles module */}
              {moduleSlug === 'ventes-additionnelles' && (
                <>
                  {/* Top-right: Upsell purchased */}
                  <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute -top-3 right-[8%] z-20 md:-top-5 md:right-[12%]"
                  >
                    <motion.div
                      animate={!prefersReducedMotion ? { y: [0, -6, 0] } : {}}
                      transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
                      className="flex items-center gap-2.5 rounded-xl border border-white/60 bg-white/80 px-3 py-2 shadow-lg backdrop-blur-md"
                    >
                      <div className="h-full w-1 self-stretch rounded-full bg-green-500" />
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                        <ShoppingBag className="h-3.5 w-3.5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold text-gray-800">Late checkout acheté</p>
                        <p className="text-[10px] text-gray-500">Ch. 405 — 35€</p>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Left: Conversion rate */}
                  <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute -left-2 top-[22%] z-20 md:-left-6 md:top-[18%]"
                  >
                    <motion.div
                      animate={!prefersReducedMotion ? { y: [0, 5, 0] } : {}}
                      transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
                      className="rounded-xl border border-white/60 bg-white/80 px-2.5 py-2 shadow-md backdrop-blur-md"
                    >
                      <div className="flex items-center gap-1.5">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-primary/10">
                          <TrendingUp className="h-3 w-3 text-brand-primary" />
                        </div>
                        <div>
                          <p className="text-[10px] font-semibold text-gray-800">Taux de conversion</p>
                          <p className="text-[10px] font-bold text-brand-primary">12%</p>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Right: Revenue boost */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute -right-1 bottom-[22%] z-30 md:-right-8 md:bottom-[16%]"
                  >
                    <motion.div
                      animate={!prefersReducedMotion ? { y: [0, -10, 0] } : {}}
                      transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
                      className="flex items-center gap-2.5 rounded-full bg-gray-900/90 px-5 py-2.5 shadow-xl backdrop-blur-sm"
                    >
                      <TrendingUp className="h-4 w-4 text-emerald-400" />
                      <span className="text-base font-bold tabular-nums text-white">+5 020€</span>
                      <span className="text-[10px] text-gray-400">ce mois</span>
                    </motion.div>
                  </motion.div>

                  {/* Bottom-left: Orders count */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.8, duration: 0.5 }}
                    className="absolute -bottom-3 left-[6%] z-20 md:-bottom-4 md:left-[8%]"
                  >
                    <motion.div
                      animate={!prefersReducedMotion ? { y: [0, 4, 0] } : {}}
                      transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                      className="flex items-center gap-2 rounded-full bg-gray-900/90 px-3.5 py-1.5 shadow-lg backdrop-blur-sm"
                    >
                      <div className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                      </div>
                      <span className="text-xs font-bold tabular-nums text-white">36</span>
                      <span className="text-[9px] text-gray-400">commandes ce mois</span>
                    </motion.div>
                  </motion.div>
                </>
              )}

              {/* Floating elements — newsletter module */}
              {moduleSlug === 'newsletter' && (
                <>
                  {/* Top-right: Campagne envoyée */}
                  <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute -top-3 right-[8%] z-20 md:-top-5 md:right-[12%]"
                  >
                    <motion.div
                      animate={!prefersReducedMotion ? { y: [0, -6, 0] } : {}}
                      transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
                      className="flex items-center gap-2.5 rounded-xl border border-white/60 bg-white/80 px-3 py-2 shadow-lg backdrop-blur-md"
                    >
                      <div className="h-full w-1 self-stretch rounded-full bg-green-500" />
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                        <Send className="h-3.5 w-3.5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold text-gray-800">Campagne envoyée</p>
                        <p className="text-[10px] text-gray-500">Newsletter mars — 2 430 destinataires</p>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Left: Taux d'ouverture */}
                  <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute -left-2 top-[22%] z-20 md:-left-6 md:top-[18%]"
                  >
                    <motion.div
                      animate={!prefersReducedMotion ? { y: [0, 5, 0] } : {}}
                      transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
                      className="rounded-xl border border-white/60 bg-white/80 px-2.5 py-2 shadow-md backdrop-blur-md"
                    >
                      <div className="flex items-center gap-1.5">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-primary/10">
                          <MailOpen className="h-3 w-3 text-brand-primary" />
                        </div>
                        <div>
                          <p className="text-[10px] font-semibold text-gray-800">Taux d&apos;ouverture</p>
                          <p className="text-[10px] font-bold text-brand-primary">45.2%</p>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Right: Taux de clic */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute -right-1 bottom-[22%] z-30 md:-right-8 md:bottom-[16%]"
                  >
                    <motion.div
                      animate={!prefersReducedMotion ? { y: [0, -10, 0] } : {}}
                      transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
                      className="flex items-center gap-2.5 rounded-full bg-gray-900/90 px-5 py-2.5 shadow-xl backdrop-blur-sm"
                    >
                      <TrendingUp className="h-4 w-4 text-emerald-400" />
                      <span className="text-base font-bold tabular-nums text-white">12.8%</span>
                      <span className="text-[10px] text-gray-400">taux de clic</span>
                    </motion.div>
                  </motion.div>

                  {/* Bottom-left: Newsletters envoyées */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.8, duration: 0.5 }}
                    className="absolute -bottom-3 left-[6%] z-20 md:-bottom-4 md:left-[8%]"
                  >
                    <motion.div
                      animate={!prefersReducedMotion ? { y: [0, 4, 0] } : {}}
                      transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                      className="flex items-center gap-2 rounded-full bg-gray-900/90 px-3.5 py-1.5 shadow-lg backdrop-blur-sm"
                    >
                      <div className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                      </div>
                      <span className="text-xs font-bold tabular-nums text-white">18 540</span>
                      <span className="text-[9px] text-gray-400">emails envoyés ce mois</span>
                    </motion.div>
                  </motion.div>
                </>
              )}

              {/* Floating elements — fidélité module */}
              {moduleSlug === 'fidelite' && (
                <>
                  {/* Top-right: Points gagnés */}
                  <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute -top-4 right-[4%] z-20 md:-top-6 md:right-[8%]"
                  >
                    <motion.div
                      animate={!prefersReducedMotion ? { y: [0, -8, 0] } : {}}
                      transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
                      className="rounded-2xl border border-white/60 bg-white/90 p-3.5 shadow-xl backdrop-blur-md"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-100">
                          <Star className="h-4 w-4 text-amber-600" />
                        </div>
                        <div>
                          <p className="text-[11px] font-bold text-gray-800">+150 points gagnés</p>
                          <p className="text-[9px] text-gray-500">Séjour du 12-15 mars</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[8px] font-semibold text-amber-700">Niveau Gold</span>
                        <span className="text-[9px] text-gray-400">→</span>
                        <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[8px] text-amber-600">850 pts cumulés</span>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Left: Taux de rétention */}
                  <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute -left-2 top-[22%] z-20 md:-left-6 md:top-[18%]"
                  >
                    <motion.div
                      animate={!prefersReducedMotion ? { y: [0, 5, 0] } : {}}
                      transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
                      className="rounded-xl border border-white/60 bg-white/80 px-2.5 py-2 shadow-md backdrop-blur-md"
                    >
                      <div className="flex items-center gap-1.5">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-primary/10">
                          <Gift className="h-3 w-3 text-brand-primary" />
                        </div>
                        <div>
                          <p className="text-[10px] font-semibold text-gray-800">Taux de rétention</p>
                          <p className="text-[10px] font-bold text-brand-primary">+32%</p>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Right: Réservations directes */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute -right-1 bottom-[22%] z-30 md:-right-8 md:bottom-[16%]"
                  >
                    <motion.div
                      animate={!prefersReducedMotion ? { y: [0, -10, 0] } : {}}
                      transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
                      className="flex items-center gap-2.5 rounded-full bg-gray-900/90 px-5 py-2.5 shadow-xl backdrop-blur-sm"
                    >
                      <TrendingUp className="h-4 w-4 text-emerald-400" />
                      <span className="text-base font-bold tabular-nums text-white">+24%</span>
                      <span className="text-[10px] text-gray-400">réservations directes</span>
                    </motion.div>
                  </motion.div>

                  {/* Bottom-left: Membres actifs */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.8, duration: 0.5 }}
                    className="absolute -bottom-3 left-[6%] z-20 md:-bottom-4 md:left-[8%]"
                  >
                    <motion.div
                      animate={!prefersReducedMotion ? { y: [0, 4, 0] } : {}}
                      transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                      className="flex items-center gap-2 rounded-full bg-gray-900/90 px-3.5 py-1.5 shadow-lg backdrop-blur-sm"
                    >
                      <div className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                      </div>
                      <span className="text-xs font-bold tabular-nums text-white">1 890</span>
                      <span className="text-[9px] text-gray-400">membres fidélité actifs</span>
                    </motion.div>
                  </motion.div>
                </>
              )}

              {/* Floating elements — CRM module */}
              {moduleSlug === 'crm' && (
                <>
                  {/* Top-right: Fiche client enrichie */}
                  <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute -top-4 right-[4%] z-20 md:-top-6 md:right-[8%]"
                  >
                    <motion.div
                      animate={!prefersReducedMotion ? { y: [0, -8, 0] } : {}}
                      transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
                      className="rounded-2xl border border-white/60 bg-white/90 p-3.5 shadow-xl backdrop-blur-md"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-100">
                          <Users className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-[11px] font-bold text-gray-800">Fiche client enrichie</p>
                          <p className="text-[9px] text-gray-500">Synchronisée avec le PMS</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[8px] font-semibold text-blue-700">3 séjours</span>
                        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[8px] font-semibold text-emerald-700">VIP</span>
                        <span className="rounded-full bg-purple-100 px-2 py-0.5 text-[8px] font-semibold text-purple-700">Spa lover</span>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Left: Segments actifs */}
                  <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute -left-2 top-[22%] z-20 md:-left-6 md:top-[18%]"
                  >
                    <motion.div
                      animate={!prefersReducedMotion ? { y: [0, 5, 0] } : {}}
                      transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
                      className="rounded-xl border border-white/60 bg-white/80 px-2.5 py-2 shadow-md backdrop-blur-md"
                    >
                      <div className="flex items-center gap-1.5">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-primary/10">
                          <Users className="h-3 w-3 text-brand-primary" />
                        </div>
                        <div>
                          <p className="text-[10px] font-semibold text-gray-800">Segments actifs</p>
                          <p className="text-[10px] font-bold text-brand-primary">12 segments</p>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Right: Données centralisées */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute -right-1 bottom-[22%] z-30 md:-right-8 md:bottom-[16%]"
                  >
                    <motion.div
                      animate={!prefersReducedMotion ? { y: [0, -10, 0] } : {}}
                      transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
                      className="flex items-center gap-2.5 rounded-full bg-gray-900/90 px-5 py-2.5 shadow-xl backdrop-blur-sm"
                    >
                      <TrendingUp className="h-4 w-4 text-emerald-400" />
                      <span className="text-base font-bold tabular-nums text-white">100%</span>
                      <span className="text-[10px] text-gray-400">données centralisées</span>
                    </motion.div>
                  </motion.div>

                  {/* Bottom-left: Fiches clients */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.8, duration: 0.5 }}
                    className="absolute -bottom-3 left-[6%] z-20 md:-bottom-4 md:left-[8%]"
                  >
                    <motion.div
                      animate={!prefersReducedMotion ? { y: [0, 4, 0] } : {}}
                      transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                      className="flex items-center gap-2 rounded-full bg-gray-900/90 px-3.5 py-1.5 shadow-lg backdrop-blur-sm"
                    >
                      <div className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                      </div>
                      <span className="text-xs font-bold tabular-nums text-white">4 620</span>
                      <span className="text-[9px] text-gray-400">fiches clients actives</span>
                    </motion.div>
                  </motion.div>
                </>
              )}

              {/* Floating elements — sms module */}
              {moduleSlug === 'sms' && (
                <>
                  {/* Top-right: SMS lu */}
                  <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute -top-3 right-[6%] z-20 md:-top-5 md:right-[10%]"
                  >
                    <motion.div
                      animate={!prefersReducedMotion ? { y: [0, -6, 0] } : {}}
                      transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
                      className="flex items-center gap-2.5 rounded-xl border border-white/60 bg-white/80 px-3 py-2 shadow-lg backdrop-blur-md"
                    >
                      <div className="h-full w-1 self-stretch rounded-full bg-green-500" />
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                        <Check className="h-3.5 w-3.5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold text-gray-800">SMS lu en 2 min</p>
                        <p className="text-[10px] text-gray-500">Sophie D. — Ch. 204</p>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Left: Taux d'ouverture */}
                  <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute -left-2 top-[28%] z-20 md:-left-6 md:top-[22%]"
                  >
                    <motion.div
                      animate={!prefersReducedMotion ? { y: [0, 5, 0] } : {}}
                      transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
                      className="rounded-2xl border border-white/60 bg-white/90 p-3 shadow-lg backdrop-blur-md"
                    >
                      <p className="text-[9px] font-medium text-gray-500 mb-1">Taux d&apos;ouverture</p>
                      <p className="text-2xl font-bold text-brand-primary leading-none">98%</p>
                      <p className="text-[8px] text-gray-400 mt-0.5">vs 22% email</p>
                    </motion.div>
                  </motion.div>

                  {/* Right: Offre flash */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute -right-1 bottom-[26%] z-30 md:-right-8 md:bottom-[18%]"
                  >
                    <motion.div
                      animate={!prefersReducedMotion ? { y: [0, -10, 0] } : {}}
                      transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
                      className="flex items-center gap-2.5 rounded-full bg-gray-900/90 px-5 py-2.5 shadow-xl backdrop-blur-sm"
                    >
                      <TrendingUp className="h-4 w-4 text-emerald-400" />
                      <span className="text-base font-bold tabular-nums text-white">23%</span>
                      <span className="text-[10px] text-gray-400">conversion offres flash</span>
                    </motion.div>
                  </motion.div>

                  {/* Bottom-left: SMS envoyés */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.8, duration: 0.5 }}
                    className="absolute -bottom-3 left-[6%] z-20 md:-bottom-4 md:left-[8%]"
                  >
                    <motion.div
                      animate={!prefersReducedMotion ? { y: [0, 4, 0] } : {}}
                      transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                      className="flex items-center gap-2 rounded-full bg-gray-900/90 px-3.5 py-1.5 shadow-lg backdrop-blur-sm"
                    >
                      <div className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                      </div>
                      <span className="text-xs font-bold tabular-nums text-white">1 842</span>
                      <span className="text-[9px] text-gray-400">SMS envoyés ce mois</span>
                    </motion.div>
                  </motion.div>
                </>
              )}

              {/* Floating elements — whatsapp module */}
              {moduleSlug === 'whatsapp' && (
                <>
                  {/* Top-right: Bot response */}
                  <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute -top-3 right-[6%] z-20 md:-top-5 md:right-[10%]"
                  >
                    <motion.div
                      animate={!prefersReducedMotion ? { y: [0, -6, 0] } : {}}
                      transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
                      className="rounded-2xl border border-white/60 bg-white/90 p-3 shadow-xl backdrop-blur-md"
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#25D366]/10">
                          <MessageSquare className="h-3.5 w-3.5 text-[#25D366]" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-gray-800">Chatbot actif</p>
                          <p className="text-[8px] text-gray-500">Réponse en 2 secondes</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="rounded-full bg-[#25D366]/10 px-2 py-0.5 text-[8px] font-semibold text-[#25D366]">70%</span>
                        <span className="text-[8px] text-gray-500">des questions traitées auto</span>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Left: Taux d'ouverture */}
                  <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute -left-2 top-[28%] z-20 md:-left-6 md:top-[22%]"
                  >
                    <motion.div
                      animate={!prefersReducedMotion ? { y: [0, 5, 0] } : {}}
                      transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
                      className="rounded-2xl border border-white/60 bg-white/90 p-3 shadow-lg backdrop-blur-md"
                    >
                      <p className="text-[9px] font-medium text-gray-500 mb-1">Taux d&apos;ouverture</p>
                      <p className="text-2xl font-bold text-[#25D366] leading-none">90%</p>
                      <p className="text-[8px] text-gray-400 mt-0.5">WhatsApp Business</p>
                    </motion.div>
                  </motion.div>

                  {/* Right: Réservations spa */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute -right-1 bottom-[26%] z-30 md:-right-8 md:bottom-[18%]"
                  >
                    <motion.div
                      animate={!prefersReducedMotion ? { y: [0, -10, 0] } : {}}
                      transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
                      className="flex items-center gap-2.5 rounded-full bg-gray-900/90 px-5 py-2.5 shadow-xl backdrop-blur-sm"
                    >
                      <TrendingUp className="h-4 w-4 text-emerald-400" />
                      <span className="text-base font-bold tabular-nums text-white">+45%</span>
                      <span className="text-[10px] text-gray-400">réservations services</span>
                    </motion.div>
                  </motion.div>

                  {/* Bottom-left: Conversations */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.8, duration: 0.5 }}
                    className="absolute -bottom-3 left-[6%] z-20 md:-bottom-4 md:left-[8%]"
                  >
                    <motion.div
                      animate={!prefersReducedMotion ? { y: [0, 4, 0] } : {}}
                      transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                      className="flex items-center gap-2 rounded-full bg-gray-900/90 px-3.5 py-1.5 shadow-lg backdrop-blur-sm"
                    >
                      <div className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                      </div>
                      <span className="text-xs font-bold tabular-nums text-white">-70%</span>
                      <span className="text-[9px] text-gray-400">d&apos;appels téléphoniques</span>
                    </motion.div>
                  </motion.div>
                </>
              )}

              {/* Floating elements — hub-messagerie module */}
              {moduleSlug === 'hub-messagerie' && (
                <>
                  {/* Top-right: Temps de réponse */}
                  <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute -top-3 right-[6%] z-20 md:-top-5 md:right-[10%]"
                  >
                    <motion.div
                      animate={!prefersReducedMotion ? { y: [0, -6, 0] } : {}}
                      transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
                      className="flex items-center gap-2.5 rounded-xl border border-white/60 bg-white/80 px-3 py-2 shadow-lg backdrop-blur-md"
                    >
                      <div className="h-full w-1 self-stretch rounded-full bg-brand-primary" />
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-primary/10">
                        <Clock className="h-3.5 w-3.5 text-brand-primary" />
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold text-gray-800">Réponse en 5 sec</p>
                        <p className="text-[10px] text-gray-500">Avec templates pré-remplis</p>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Left: 0 message perdu */}
                  <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute -left-2 top-[28%] z-20 md:-left-6 md:top-[22%]"
                  >
                    <motion.div
                      animate={!prefersReducedMotion ? { y: [0, 5, 0] } : {}}
                      transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
                      className="rounded-2xl border border-white/60 bg-white/90 p-3 shadow-lg backdrop-blur-md"
                    >
                      <p className="text-[9px] font-medium text-gray-500 mb-1">Messages perdus</p>
                      <p className="text-2xl font-bold text-brand-primary leading-none">0</p>
                      <p className="text-[8px] text-gray-400 mt-0.5">Email + SMS + WhatsApp</p>
                    </motion.div>
                  </motion.div>

                  {/* Right: Productivité */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute -right-1 bottom-[26%] z-30 md:-right-8 md:bottom-[18%]"
                  >
                    <motion.div
                      animate={!prefersReducedMotion ? { y: [0, -10, 0] } : {}}
                      transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
                      className="flex items-center gap-2.5 rounded-full bg-gray-900/90 px-5 py-2.5 shadow-xl backdrop-blur-sm"
                    >
                      <TrendingUp className="h-4 w-4 text-emerald-400" />
                      <span className="text-base font-bold tabular-nums text-white">3x</span>
                      <span className="text-[10px] text-gray-400">plus de demandes traitées</span>
                    </motion.div>
                  </motion.div>

                  {/* Bottom-left: Canaux unifiés */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.8, duration: 0.5 }}
                    className="absolute -bottom-3 left-[6%] z-20 md:-bottom-4 md:left-[8%]"
                  >
                    <motion.div
                      animate={!prefersReducedMotion ? { y: [0, 4, 0] } : {}}
                      transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                      className="flex items-center gap-2 rounded-full bg-gray-900/90 px-3.5 py-1.5 shadow-lg backdrop-blur-sm"
                    >
                      <div className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                      </div>
                      <span className="text-xs font-bold tabular-nums text-white">1</span>
                      <span className="text-[9px] text-gray-400">boîte pour tous vos canaux</span>
                    </motion.div>
                  </motion.div>
                </>
              )}

              {/* Floating elements — avis module */}
              {moduleSlug === 'avis' && (
                <>
                  {/* Top-right: Nouvel avis 5 étoiles */}
                  <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute -top-3 right-[8%] z-20 md:-top-5 md:right-[12%]"
                  >
                    <motion.div
                      animate={!prefersReducedMotion ? { y: [0, -6, 0] } : {}}
                      transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
                      className="flex items-center gap-2.5 rounded-xl border border-white/60 bg-white/80 px-3 py-2 shadow-lg backdrop-blur-md"
                    >
                      <div className="h-full w-1 self-stretch rounded-full bg-amber-400" />
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className="h-3 w-3 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold text-gray-800">Nouvel avis Google</p>
                        <p className="text-[10px] text-gray-500">Marie L. — Il y a 2h</p>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Left: Note moyenne */}
                  <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute -left-2 top-[22%] z-20 md:-left-6 md:top-[18%]"
                  >
                    <motion.div
                      animate={!prefersReducedMotion ? { y: [0, 5, 0] } : {}}
                      transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
                      className="rounded-2xl border border-white/60 bg-white/90 p-3 shadow-lg backdrop-blur-md"
                    >
                      <p className="mb-1 text-[9px] font-medium text-gray-500">Note Google</p>
                      <p className="text-2xl font-bold leading-none text-brand-primary">4.6<span className="text-sm text-gray-400">/5</span></p>
                      <p className="mt-0.5 text-[8px] text-gray-400">+0.4 en 3 mois</p>
                    </motion.div>
                  </motion.div>

                  {/* Right: Réponse IA */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute -right-1 bottom-[22%] z-30 md:-right-8 md:bottom-[16%]"
                  >
                    <motion.div
                      animate={!prefersReducedMotion ? { y: [0, -10, 0] } : {}}
                      transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
                      className="flex items-center gap-2.5 rounded-full bg-gray-900/90 px-5 py-2.5 shadow-xl backdrop-blur-sm"
                    >
                      <MessageSquare className="h-4 w-4 text-purple-400" />
                      <span className="text-base font-bold tabular-nums text-white">2 min</span>
                      <span className="text-[10px] text-gray-400">réponse IA</span>
                    </motion.div>
                  </motion.div>

                  {/* Bottom-left: Avis positifs */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.8, duration: 0.5 }}
                    className="absolute -bottom-3 left-[6%] z-20 md:-bottom-4 md:left-[8%]"
                  >
                    <motion.div
                      animate={!prefersReducedMotion ? { y: [0, 4, 0] } : {}}
                      transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                      className="flex items-center gap-2 rounded-full bg-gray-900/90 px-3.5 py-1.5 shadow-lg backdrop-blur-sm"
                    >
                      <div className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                      </div>
                      <span className="text-xs font-bold tabular-nums text-white">90%</span>
                      <span className="text-[9px] text-gray-400">d&apos;avis collectés positifs</span>
                    </motion.div>
                  </motion.div>
                </>
              )}

              {/* Floating elements — paiements module */}
              {moduleSlug === 'paiements' && (
                <>
                  {/* Top-right: Acompte encaissé */}
                  <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute -top-3 right-[8%] z-20 md:-top-5 md:right-[12%]"
                  >
                    <motion.div
                      animate={!prefersReducedMotion ? { y: [0, -6, 0] } : {}}
                      transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
                      className="flex items-center gap-2.5 rounded-xl border border-white/60 bg-white/80 px-3 py-2 shadow-lg backdrop-blur-md"
                    >
                      <div className="h-full w-1 self-stretch rounded-full bg-green-500" />
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                        <Check className="h-3.5 w-3.5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold text-gray-800">Acompte encaissé</p>
                        <p className="text-[10px] text-gray-500">150€ — Sophie Durand</p>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Left: 0€ commission */}
                  <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute -left-2 top-[22%] z-20 md:-left-6 md:top-[18%]"
                  >
                    <motion.div
                      animate={!prefersReducedMotion ? { y: [0, 5, 0] } : {}}
                      transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
                      className="rounded-2xl border border-white/60 bg-white/90 p-3 shadow-lg backdrop-blur-md"
                    >
                      <p className="mb-1 text-[9px] font-medium text-gray-500">Commission TriggerFlow</p>
                      <p className="text-2xl font-bold leading-none text-brand-primary">0€</p>
                      <p className="mt-0.5 text-[8px] text-gray-400">Seuls les frais Stripe</p>
                    </motion.div>
                  </motion.div>

                  {/* Right: Caution active */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute -right-1 bottom-[22%] z-30 md:-right-8 md:bottom-[16%]"
                  >
                    <motion.div
                      animate={!prefersReducedMotion ? { y: [0, -10, 0] } : {}}
                      transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
                      className="flex items-center gap-2.5 rounded-full bg-gray-900/90 px-5 py-2.5 shadow-xl backdrop-blur-sm"
                    >
                      <Shield className="h-4 w-4 text-blue-400" />
                      <span className="text-base font-bold tabular-nums text-white">300€</span>
                      <span className="text-[10px] text-gray-400">caution bloquée</span>
                    </motion.div>
                  </motion.div>

                  {/* Bottom-left: Paiements ce mois */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.8, duration: 0.5 }}
                    className="absolute -bottom-3 left-[6%] z-20 md:-bottom-4 md:left-[8%]"
                  >
                    <motion.div
                      animate={!prefersReducedMotion ? { y: [0, 4, 0] } : {}}
                      transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                      className="flex items-center gap-2 rounded-full bg-gray-900/90 px-3.5 py-1.5 shadow-lg backdrop-blur-sm"
                    >
                      <div className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                      </div>
                      <span className="text-xs font-bold tabular-nums text-white">85%</span>
                      <span className="text-[9px] text-gray-400">acomptes payés en 2h</span>
                    </motion.div>
                  </motion.div>
                </>
              )}

              {/* Floating elements — analytics module */}
              {moduleSlug === 'analytics' && (
                <>
                  {/* Top-right: Revenus générés */}
                  <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute -top-3 right-[8%] z-20 md:-top-5 md:right-[12%]"
                  >
                    <motion.div
                      animate={!prefersReducedMotion ? { y: [0, -6, 0] } : {}}
                      transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
                      className="flex items-center gap-2.5 rounded-xl border border-white/60 bg-white/80 px-3 py-2 shadow-lg backdrop-blur-md"
                    >
                      <div className="h-full w-1 self-stretch rounded-full bg-emerald-500" />
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
                        <Euro className="h-3.5 w-3.5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold text-gray-800">Revenus générés</p>
                        <p className="text-[10px] text-gray-500">+22% vs mois dernier</p>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Left: Taux d'ouverture */}
                  <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute -left-2 top-[22%] z-20 md:-left-6 md:top-[18%]"
                  >
                    <motion.div
                      animate={!prefersReducedMotion ? { y: [0, 5, 0] } : {}}
                      transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
                      className="rounded-2xl border border-white/60 bg-white/90 p-3 shadow-lg backdrop-blur-md"
                    >
                      <p className="mb-1 text-[9px] font-medium text-gray-500">Taux d&apos;ouverture</p>
                      <p className="text-2xl font-bold leading-none text-brand-primary">45.2%</p>
                      <p className="mt-0.5 text-[8px] text-gray-400">+3.1% cette semaine</p>
                    </motion.div>
                  </motion.div>

                  {/* Right: NPS */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute -right-1 bottom-[22%] z-30 md:-right-8 md:bottom-[16%]"
                  >
                    <motion.div
                      animate={!prefersReducedMotion ? { y: [0, -10, 0] } : {}}
                      transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
                      className="flex items-center gap-2.5 rounded-full bg-gray-900/90 px-5 py-2.5 shadow-xl backdrop-blur-sm"
                    >
                      <Star className="h-4 w-4 text-amber-400" />
                      <span className="text-base font-bold tabular-nums text-white">NPS 58</span>
                      <span className="text-[10px] text-gray-400">+16 pts</span>
                    </motion.div>
                  </motion.div>

                  {/* Bottom-left: Rapport automatique */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.8, duration: 0.5 }}
                    className="absolute -bottom-3 left-[6%] z-20 md:-bottom-4 md:left-[8%]"
                  >
                    <motion.div
                      animate={!prefersReducedMotion ? { y: [0, 4, 0] } : {}}
                      transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                      className="flex items-center gap-2 rounded-full bg-gray-900/90 px-3.5 py-1.5 shadow-lg backdrop-blur-sm"
                    >
                      <div className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                      </div>
                      <span className="text-xs font-bold tabular-nums text-white">0 min</span>
                      <span className="text-[9px] text-gray-400">de reporting manuel</span>
                    </motion.div>
                  </motion.div>
                </>
              )}
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ===== 2. STATS BAR ===== */}
      {module.stats && module.stats.length > 0 && (
        <section className="relative border-b border-border-light bg-white py-10">
          <Container>
            <div className={cn(
              'grid gap-8',
              module.stats!.length === 3
                ? 'grid-cols-3'
                : 'grid-cols-2 md:grid-cols-4'
            )}>
              {module.stats.map((stat, index) => (
                <motion.div
                  key={index}
                  {...motionProps}
                  variants={staggerItem}
                  className="group text-center"
                >
                  <div className="font-serif text-4xl font-bold text-brand-primary transition-colors md:text-5xl">
                    <AnimatedStat value={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="mt-1 text-sm text-text-muted">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ===== 3. JOURNEY TIMELINE ===== */}
      {module.journey && module.journey.length > 0 && (
        <section className="relative overflow-hidden bg-surface-secondary py-20 md:py-28">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border-default to-transparent" />
          <Container className="relative">
            <motion.div {...motionProps} variants={fadeInUp} className="mb-14 text-center">
              <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.15em] text-brand-primary">
                Parcours client
              </span>
              <h2 className="font-serif text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
                {t('journey.title')}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-text-secondary">
                {t('journey.subtitle')}
              </p>
            </motion.div>

            <div className="relative">
              {/* Connecting line */}
              <div className="absolute left-0 right-0 top-8 hidden h-px bg-border-default md:block" />

              <motion.div
                {...motionProps}
                variants={staggerContainer}
                className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6 md:gap-6"
              >
                {module.journey.map((step, index) => (
                  <motion.div
                    key={index}
                    variants={staggerItem}
                    className="relative text-center"
                  >
                    <div className={cn(
                      'relative z-10 mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full transition-all',
                      step.active
                        ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/25'
                        : 'border-2 border-border-default bg-white text-text-muted'
                    )}>
                      <span className="text-sm font-bold">{index + 1}</span>
                    </div>
                    <h3 className={cn(
                      'text-sm font-semibold',
                      step.active ? 'text-text-primary' : 'text-text-muted'
                    )}>
                      {step.label}
                    </h3>
                    <p className={cn(
                      'mt-1 text-xs',
                      step.active ? 'text-text-secondary' : 'text-text-muted'
                    )}>
                      {step.description}
                    </p>
                    {step.active && (
                      <div className="mt-2">
                        <span className="inline-flex items-center gap-1 rounded-full bg-brand-primary/10 px-2 py-0.5 text-[10px] font-medium text-brand-primary">
                          <Icon className="h-3 w-3" />
                          {module.title}
                        </span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </Container>
        </section>
      )}

      {/* ===== 4. AVANT / APRES ===== */}
      <section className="py-20 md:py-28">
        <Container>
          <motion.div {...motionProps} variants={fadeInUp} className="mb-14 text-center">
            <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.15em] text-brand-primary">
              Le déclic
            </span>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
              {t('problemSolution.title')}
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            {/* BEFORE */}
            <motion.div
              {...motionProps}
              variants={slideInLeft}
              className="group relative overflow-hidden rounded-2xl border border-red-200/60 bg-gradient-to-br from-red-50/80 to-orange-50/30 p-8"
            >
              <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 translate-x-1/2 -translate-y-1/2 rounded-full bg-red-100/40" />
              <div className="relative">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                    <X className="h-6 w-6 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-red-900">
                      {t('problemSolution.before')}
                    </h3>
                    <p className="text-sm text-red-600/60">{t('problemSolution.beforeSubtitle')}</p>
                  </div>
                </div>
                <ul className="space-y-4">
                  {module.painPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-red-100">
                        <X className="h-4 w-4 text-red-500" />
                      </span>
                      <span className="leading-relaxed text-red-900/70">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* AFTER */}
            <motion.div
              {...motionProps}
              variants={slideInRight}
              className="group relative overflow-hidden rounded-2xl border border-brand-primary/15 bg-gradient-to-br from-brand-primary/[0.06] to-brand-primary/[0.02] p-8"
            >
              <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-primary/[0.06]" />
              <div className="relative">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-primary/10">
                    <Check className="h-6 w-6 text-brand-primary" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-text-primary">
                      {t('problemSolution.after')}
                    </h3>
                    <p className="text-sm text-text-muted">{t('problemSolution.afterSubtitle')}</p>
                  </div>
                </div>
                <ul className="space-y-4">
                  {module.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand-primary/10">
                        <Check className="h-4 w-4 text-brand-primary" />
                      </span>
                      <span className="leading-relaxed text-text-secondary">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ===== 5. FEATURES — Tabbed (exact homepage component) ===== */}
      <FeaturesTabbed
        directData={featuresDirectData}
        tabs={featureTabs}
        className="bg-white"
      />

      {/* ===== 6. USE CASES ===== */}
      <section className="relative overflow-hidden bg-surface-dark py-20 md:py-28">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse,rgba(0,111,104,0.1),transparent_70%)]" />

        <Container className="relative">
          <motion.div {...motionProps} variants={fadeInUp} className="mb-14 text-center">
            <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.15em] text-brand-primary">
              En situation
            </span>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-white md:text-4xl">
              {t('useCases.title')}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/60">
              {t('useCases.subtitle')}
            </p>
          </motion.div>

          <motion.div
            {...motionProps}
            variants={staggerContainer}
            className="grid gap-5 sm:grid-cols-2"
          >
            {module.useCases.map((useCase, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="group rounded-2xl border border-white/[0.08] bg-white/[0.05] p-6 backdrop-blur-sm transition-all duration-200 hover:border-white/15 hover:bg-white/[0.08]"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white/10 font-serif text-sm font-bold text-white">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-white">
                      {useCase.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/65">
                      {useCase.description}
                    </p>
                    {useCase.result && (
                      <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5">
                        <div className="h-1.5 w-1.5 rounded-full bg-white" />
                        <span className="text-xs font-medium text-white">
                          {useCase.result}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* ===== 7. INTEGRATIONS — Homepage PMS showcase ===== */}
      <IntegrationsShowcase />

      {/* ===== 8. TESTIMONIAL ===== */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#F7FAFA_0%,#EFF5F5_50%,#F7FAFA_100%)]" />
        <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] bg-[radial-gradient(ellipse,rgba(0,111,104,0.06),transparent_70%)]" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-serif text-[20rem] font-bold leading-none text-brand-primary/[0.03]">
          &ldquo;
        </div>

        <Container className="relative">
          <motion.div {...motionProps} variants={fadeInUp} className="mx-auto max-w-3xl text-center">
            <div className="mb-8 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-primary/10">
              <Quote className="h-6 w-6 text-brand-primary" />
            </div>

            {/* Stars */}
            <div className="mb-6 flex items-center justify-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-brand-accent text-brand-accent" />
              ))}
            </div>

            <blockquote className="font-serif text-xl font-medium leading-relaxed text-text-primary md:text-2xl lg:text-[1.75rem] lg:leading-relaxed">
              &ldquo;{module.testimonial ? module.testimonial.quote : t('testimonial.quote')}&rdquo;
            </blockquote>

            <div className="mt-10 flex flex-col items-center gap-1">
              <div className="mb-4 h-px w-12 bg-border-default" />
              <p className="text-sm font-semibold text-text-primary">
                {module.testimonial?.author || t('testimonial.author')}
              </p>
              <p className="text-xs tracking-wide text-text-muted">
                {module.testimonial
                  ? `${module.testimonial.role}, ${module.testimonial.hotel}`
                  : t('testimonial.role')
                }
              </p>
              {module.testimonial?.metric && (
                <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-brand-primary/15 bg-brand-primary/5 px-4 py-1.5">
                  <span className="text-xs font-semibold text-brand-primary">
                    {module.testimonial.metric}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ===== 9. FAQ ===== */}
      {module.faq && module.faq.length > 0 && (
        <section className="py-20 md:py-28">
          <Container className="max-w-3xl">
            <motion.div {...motionProps} variants={fadeInUp} className="mb-14 text-center">
              <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.15em] text-brand-primary">
                FAQ
              </span>
              <h2 className="font-serif text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
                {t('faq.title')}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-text-secondary">
                {t('faq.subtitle')}
              </p>
            </motion.div>

            <motion.div {...motionProps} variants={fadeInUp}>
              <FaqAccordion items={module.faq} />
            </motion.div>
          </Container>
        </section>
      )}

      {/* ===== 10. RELATED MODULES ===== */}
      <section className="relative bg-surface-secondary py-20 md:py-28">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border-default to-transparent" />
        <Container>
          <motion.div {...motionProps} variants={fadeInUp} className="mb-12">
            <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.15em] text-brand-primary">
              Ecosystem
            </span>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
              {t('related.title')}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary">
              {t('related.subtitle')}
            </p>
          </motion.div>

          <motion.div
            {...motionProps}
            variants={staggerContainer}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {relatedModulesData.map((relatedModule) => {
              const RelatedIcon = relatedModule.icon;
              return (
                <motion.div
                  key={relatedModule.slug}
                  variants={staggerItem}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                >
                  <Link
                    href={`/produit/${relatedModule.slug}`}
                    className="group relative block overflow-hidden rounded-2xl border border-border-default bg-white p-6 transition-all duration-200 hover:border-brand-primary/20 hover:shadow-lg"
                    style={{ boxShadow: 'var(--shadow-sm)' }}
                  >
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-primary/[0.02] to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="relative flex items-start gap-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-brand-primary/10 transition-colors group-hover:bg-brand-primary/15">
                        <RelatedIcon className="h-6 w-6 text-brand-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-text-primary transition-colors group-hover:text-brand-primary">
                          {relatedModule.title}
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-text-muted line-clamp-2">
                          {relatedModule.headline}
                        </p>
                      </div>
                      <ArrowRight className="h-5 w-5 flex-shrink-0 text-text-muted/40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-primary" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </Container>
      </section>

      {/* ===== 11. CTA FINAL ===== */}
      <section className="relative overflow-hidden bg-surface-dark py-24 md:py-32">
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse,rgba(0,111,104,0.18),transparent_70%)]" />
        <div className="absolute bottom-0 right-1/4 h-[300px] w-[300px] bg-[radial-gradient(ellipse,rgba(255,207,162,0.06),transparent_70%)]" />
        <div className="absolute left-1/4 top-0 h-[200px] w-[200px] bg-[radial-gradient(ellipse,rgba(0,111,104,0.08),transparent_70%)]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        <Container className="relative">
          <motion.div {...motionProps} variants={fadeInUp} className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-4xl font-bold tracking-tight text-white md:text-5xl">
              {module.ctaTitle || t('cta.title')}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/60">
              {module.ctaSubtitle || t('cta.subtitle')}
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <ButtonLink
                href="https://app.lemcal.com/@trigger-flow/demo"
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="lg"
                className="group gap-2 shadow-lg shadow-brand-primary/25"
              >
                {t('cta.demo')}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </ButtonLink>
              <ButtonLink
                href="/contact"
                variant="ghost"
                size="lg"
                className="border border-white/15 text-white backdrop-blur-sm hover:bg-white/10"
              >
                {t('cta.contact')}
              </ButtonLink>
            </div>
          </motion.div>
        </Container>
      </section>
    </main>
  );
}


