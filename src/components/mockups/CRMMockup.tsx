'use client';

import { BrowserMockup } from './PhoneMockup';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Star,
  Calendar,
  CreditCard,
  Tag,
  MessageSquare,
  Gift,
  TrendingUp,
  Clock,
} from 'lucide-react';

export function CRMMockup() {
  return (
    <BrowserMockup title="Fiche Client" className="max-w-lg">
      <div className="p-4">
        {/* Client header */}
        <div className="flex items-start gap-4 mb-4">
          <div className="w-14 h-14 rounded-full bg-brand-primary/10 flex items-center justify-center flex-shrink-0">
            <span className="text-lg font-bold text-brand-primary">JD</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="text-base font-semibold text-gray-800">Jean Dupont</h4>
              <span className="flex items-center gap-0.5 text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
                <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                VIP
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3" />
                jean.dupont@email.com
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3" />
                +33 6 12 34 56 78
              </span>
            </div>
          </div>
        </div>

        {/* Key metrics */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <MetricCard icon={Calendar} value="12" label="Séjours" />
          <MetricCard icon={CreditCard} value="4 280€" label="Total dépensé" />
          <MetricCard icon={TrendingUp} value="357€" label="Panier moyen" />
        </div>

        {/* Tags */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Tag className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-xs font-medium text-gray-600">Tags</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <TagBadge color="blue">Client fidèle</TagBadge>
            <TagBadge color="green">Spa régulier</TagBadge>
            <TagBadge color="purple">Anniversaire Déc.</TagBadge>
            <TagBadge color="orange">Préfère Suite</TagBadge>
          </div>
        </div>

        {/* Recent activity */}
        <div className="bg-gray-50 rounded-xl p-3">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-gray-700">Historique récent</span>
            <span className="text-[10px] text-brand-primary cursor-pointer">Voir tout</span>
          </div>
          <div className="space-y-2">
            <ActivityItem
              icon={Calendar}
              iconColor="text-blue-500"
              title="Réservation confirmée"
              description="Suite Deluxe • 15-18 Déc."
              time="Il y a 2j"
            />
            <ActivityItem
              icon={MessageSquare}
              iconColor="text-green-500"
              title="SMS envoyé"
              description="Confirmation de réservation"
              time="Il y a 2j"
            />
            <ActivityItem
              icon={Gift}
              iconColor="text-purple-500"
              title="Offre personnalisée"
              description="Spa -20% acceptée"
              time="Il y a 5j"
            />
          </div>
        </div>

        {/* Quick actions */}
        <div className="mt-4 pt-3 border-t border-gray-100">
          <div className="flex gap-2">
            <ActionButton icon={Mail} label="Email" />
            <ActionButton icon={MessageSquare} label="SMS" />
            <ActionButton icon={Gift} label="Offre" />
            <ActionButton icon={Calendar} label="Réserver" />
          </div>
        </div>
      </div>
    </BrowserMockup>
  );
}

function MetricCard({
  icon: Icon,
  value,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
}) {
  return (
    <div className="bg-gray-50 rounded-xl p-3 text-center">
      <Icon className="w-4 h-4 text-gray-400 mx-auto mb-1" />
      <p className="text-sm font-bold text-gray-800">{value}</p>
      <p className="text-[10px] text-gray-500">{label}</p>
    </div>
  );
}

function TagBadge({
  children,
  color,
}: {
  children: React.ReactNode;
  color: 'blue' | 'green' | 'purple' | 'orange';
}) {
  const colors = {
    blue: 'bg-blue-100 text-blue-700',
    green: 'bg-green-100 text-green-700',
    purple: 'bg-purple-100 text-purple-700',
    orange: 'bg-orange-100 text-orange-700',
  };

  return (
    <span className={`text-[10px] px-2 py-0.5 rounded-full ${colors[color]}`}>{children}</span>
  );
}

function ActivityItem({
  icon: Icon,
  iconColor,
  title,
  description,
  time,
}: {
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  title: string;
  description: string;
  time: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center border border-gray-100">
        <Icon className={`w-4 h-4 ${iconColor}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-gray-700">{title}</p>
        <p className="text-[10px] text-gray-500 truncate">{description}</p>
      </div>
      <span className="text-[10px] text-gray-400 flex-shrink-0 flex items-center gap-1">
        <Clock className="w-3 h-3" />
        {time}
      </span>
    </div>
  );
}

function ActionButton({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <button className="flex-1 flex flex-col items-center gap-1 py-2 px-2 bg-white border border-gray-200 rounded-lg hover:border-brand-primary hover:text-brand-primary transition-colors">
      <Icon className="w-4 h-4" />
      <span className="text-[10px]">{label}</span>
    </button>
  );
}
