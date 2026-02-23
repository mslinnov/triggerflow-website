'use client';

import { Users, ShoppingBag, Star, BarChart3 } from 'lucide-react';
import {
  CrmClientCardMockup,
  UpsellOfferMockup,
  ReviewDashboardMockup,
  AnalyticsDashboardMockup,
} from '@/components/mockups';
import { FeaturesTabbed, type TabConfig } from './FeaturesTabbed';

const tabs: TabConfig[] = [
  { key: 'crm', icon: Users, mockup: <CrmClientCardMockup /> },
  { key: 'upsell', icon: ShoppingBag, mockup: <UpsellOfferMockup /> },
  { key: 'reviews', icon: Star, mockup: <ReviewDashboardMockup /> },
  { key: 'analytics', icon: BarChart3, mockup: <AnalyticsDashboardMockup /> },
];

export function FeaturesTabbedCRM() {
  return (
    <FeaturesTabbed
      translationNamespace="featuresTabbed2"
      tabs={tabs}
      inverted
      className="bg-surface-secondary"
    />
  );
}
