'use client';

import { Mail, Workflow, Bot, ClipboardList } from 'lucide-react';
import {
  HubInboxMockup,
  WorkflowBuilderMockup,
  WhatsAppChatbotMockup,
  FormBuilderMockup,
} from '@/components/mockups';
import { FeaturesTabbed, type TabConfig } from './FeaturesTabbed';

const tabs: TabConfig[] = [
  { key: 'communication', icon: Mail, mockup: <HubInboxMockup /> },
  { key: 'automation', icon: Workflow, mockup: <WorkflowBuilderMockup /> },
  { key: 'chatbot', icon: Bot, mockup: <WhatsAppChatbotMockup /> },
  { key: 'forms', icon: ClipboardList, mockup: <FormBuilderMockup /> },
];

export function FeaturesTabbedCommunication() {
  return (
    <FeaturesTabbed
      translationNamespace="featuresTabbed1"
      tabs={tabs}
      className="bg-white"
    />
  );
}
