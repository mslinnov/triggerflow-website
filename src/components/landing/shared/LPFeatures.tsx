import {
  Mail, Clock, Zap, Shield, BarChart3, Users, MessageSquare,
  Star, Globe, Settings, TrendingUp, Send, Bell, Smartphone,
  FileText, CreditCard, Award, Headphones, Lock, Layers,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Container, SectionWrapper, SectionHeader } from '@/components/ui';

const iconMap: Record<string, LucideIcon> = {
  Mail, Clock, Zap, Shield, BarChart3, Users, MessageSquare,
  Star, Globe, Settings, TrendingUp, Send, Bell, Smartphone,
  FileText, CreditCard, Award, Headphones, Lock, Layers,
};

export interface LPFeatureItem {
  icon: string;
  title: string;
  description: string;
}

export interface LPFeaturesProps {
  sectionTitle?: string;
  sectionSubtitle?: string;
  features: LPFeatureItem[];
  columns?: 2 | 3;
  className?: string;
}

export function LPFeatures({
  sectionTitle,
  sectionSubtitle,
  features,
  columns = 3,
  className,
}: LPFeaturesProps) {
  return (
    <SectionWrapper background="white" className={className}>
      <Container>
        {sectionTitle && (
          <SectionHeader title={sectionTitle} subtitle={sectionSubtitle} />
        )}

        <div
          className={cn(
            'grid gap-8',
            columns === 2 && 'sm:grid-cols-2',
            columns === 3 && 'sm:grid-cols-2 lg:grid-cols-3'
          )}
        >
          {features.map((feature) => {
            const Icon = iconMap[feature.icon] ?? Zap;
            return (
              <div key={feature.title} className="rounded-xl border border-brand-light/60 bg-white p-6">
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-brand-primary/10">
                  <Icon className="h-5 w-5 text-brand-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-brand-dark">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-zinc-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </SectionWrapper>
  );
}
