'use client';

import { BrowserMockup } from './PhoneMockup';
import {
  Star,
  Heart,
  Waves,
  Building,
  WheatOff,
  Mail,
  MessageCircle,
  Calendar,
  TrendingUp,
  Clock,
  Euro,
  ThumbsUp,
} from 'lucide-react';

export function CrmClientCardMockup() {
  return (
    <BrowserMockup title="Fiche Client" className="max-w-lg">
      <div className="p-4 min-h-[300px]">
        {/* Client header */}
        <div className="flex items-start gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-bold text-brand-primary">SD</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <h4 className="text-sm font-semibold text-gray-800">Sophie Durand</h4>
              <span className="flex items-center gap-0.5 text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full font-medium">
                <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                Gold
              </span>
            </div>
            <p className="text-[10px] text-gray-500">12 sejours depuis 2021</p>
          </div>
        </div>

        {/* Key stats */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-gray-50 rounded-xl p-2.5 text-center">
            <Euro className="w-3.5 h-3.5 text-gray-400 mx-auto mb-1" />
            <p className="text-xs font-bold text-gray-800">8 750&euro;</p>
            <p className="text-[10px] text-gray-500">Lifetime value</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-2.5 text-center">
            <Calendar className="w-3.5 h-3.5 text-gray-400 mx-auto mb-1" />
            <p className="text-xs font-bold text-gray-800">2 mois</p>
            <p className="text-[10px] text-gray-500">Dernier sejour</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-2.5 text-center">
            <ThumbsUp className="w-3.5 h-3.5 text-gray-400 mx-auto mb-1" />
            <p className="text-xs font-bold text-gray-800">9/10</p>
            <p className="text-[10px] text-gray-500">NPS</p>
          </div>
        </div>

        {/* Preferences */}
        <div className="mb-4">
          <p className="text-[10px] font-semibold text-gray-600 uppercase tracking-wide mb-2">Preferences</p>
          <div className="flex flex-wrap gap-1.5">
            <PreferenceBadge icon={Heart} label="Oreiller ferme" />
            <PreferenceBadge icon={Waves} label="Vue mer" />
            <PreferenceBadge icon={Building} label="Etage eleve" />
            <PreferenceBadge icon={WheatOff} label="Sans gluten" />
          </div>
        </div>

        {/* Recent stays */}
        <div className="mb-4">
          <p className="text-[10px] font-semibold text-gray-600 uppercase tracking-wide mb-2">Sejours recents</p>
          <div className="space-y-1.5">
            <StayRow date="12-15 jan 2026" room="Suite Deluxe" amount="1 280 EUR" />
            <StayRow date="03-06 nov 2025" room="Chambre Superieure" amount="720 EUR" />
            <StayRow date="18-22 aout 2025" room="Suite Junior" amount="1 560 EUR" />
          </div>
        </div>

        {/* Communication timeline */}
        <div className="bg-gray-50 rounded-xl p-3">
          <p className="text-[10px] font-semibold text-gray-600 uppercase tracking-wide mb-2">Derniers messages</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-md bg-blue-100 flex items-center justify-center">
                <Mail className="w-3 h-3 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-medium text-gray-700">Confirmation sejour</p>
                <p className="text-[9px] text-gray-400">Il y a 3 jours</p>
              </div>
              <span className="text-[9px] text-green-600 font-medium">Ouvert</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-md bg-green-100 flex items-center justify-center">
                <MessageCircle className="w-3 h-3 text-green-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-medium text-gray-700">Code WiFi envoye</p>
                <p className="text-[9px] text-gray-400">Il y a 2 mois</p>
              </div>
              <span className="text-[9px] text-green-600 font-medium">Delivre</span>
            </div>
          </div>
        </div>
      </div>
    </BrowserMockup>
  );
}

function PreferenceBadge({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <span className="flex items-center gap-1 text-[10px] px-2 py-1 rounded-full bg-brand-primary/10 text-brand-primary font-medium">
      <Icon className="w-3 h-3" />
      {label}
    </span>
  );
}

function StayRow({ date, room, amount }: { date: string; room: string; amount: string }) {
  return (
    <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-gray-100">
      <Clock className="w-3 h-3 text-gray-400 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-medium text-gray-700">{room}</p>
        <p className="text-[9px] text-gray-400">{date}</p>
      </div>
      <span className="text-[10px] font-bold text-gray-700">{amount}</span>
    </div>
  );
}
