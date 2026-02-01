'use client';

import { type ReactNode } from 'react';
import { Search, Zap, Clock, Wifi, Sparkles, MapPin } from 'lucide-react';
import { BrowserMockup } from './PhoneMockup';

interface TemplateCardProps {
  title: string;
  preview: string;
  usageCount: number;
  icon: React.ReactNode;
  expanded?: boolean;
  fullText?: ReactNode;
}

function TemplateCard({ title, preview, usageCount, icon, expanded, fullText }: TemplateCardProps) {
  if (expanded) {
    return (
      <div className="bg-white rounded-xl border-2 border-brand-primary/30 p-2.5 shadow-sm">
        <div className="flex items-center gap-1.5 mb-1.5">
          <div className="w-5 h-5 rounded-lg bg-brand-primary/10 flex items-center justify-center">
            {icon}
          </div>
          <p className="text-[10px] font-semibold text-gray-800">{title}</p>
          <span className="ml-auto text-[7px] text-gray-400">Utilis{'\u00e9'} {usageCount}x</span>
        </div>
        <div className="bg-gray-50 rounded-lg p-2 mb-2 text-[9px] text-gray-700 leading-relaxed">
          {fullText}
        </div>
        {/* Variables badge */}
        <div className="flex items-center gap-1 mb-2">
          <Zap className="w-2.5 h-2.5 text-brand-primary" />
          <span className="text-[8px] text-brand-primary font-medium">Variables auto-remplies :</span>
          <span className="text-[8px] bg-brand-primary/10 text-brand-primary rounded px-1 py-0.5 font-mono">{'{pr\u00e9nom}'}</span>
          <span className="text-[8px] bg-brand-primary/10 text-brand-primary rounded px-1 py-0.5 font-mono">{'{chambre}'}</span>
          <span className="text-[8px] bg-brand-primary/10 text-brand-primary rounded px-1 py-0.5 font-mono">{'{date_arriv\u00e9e}'}</span>
        </div>
        <button className="w-full bg-brand-primary text-white text-[9px] font-semibold rounded-lg py-1.5 hover:bg-brand-primary/90 transition-colors">
          Ins{'\u00e9'}rer
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-2.5 hover:border-brand-primary/30 hover:shadow-sm transition-all cursor-pointer">
      <div className="flex items-center gap-1.5 mb-1">
        <div className="w-5 h-5 rounded-lg bg-gray-100 flex items-center justify-center">
          {icon}
        </div>
        <p className="text-[10px] font-semibold text-gray-800">{title}</p>
      </div>
      <p className="text-[8px] text-gray-400 leading-relaxed mb-1.5 line-clamp-2">{preview}</p>
      <div className="flex items-center justify-between">
        <span className="text-[7px] text-gray-400">Utilis{'\u00e9'} {usageCount}x</span>
        <span className="text-[8px] text-brand-primary font-medium">Utiliser</span>
      </div>
    </div>
  );
}

export function HubTemplatesMockup() {
  return (
    <BrowserMockup title="Templates - TriggerFlow" className="max-w-lg">
      <div className="min-h-[300px] p-3 bg-gray-50/50">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs font-semibold text-gray-800">Templates rapides</p>
            <p className="text-[8px] text-gray-400">R{'\u00e9'}pondez en quelques secondes</p>
          </div>
          <span className="text-[8px] font-medium text-brand-primary bg-brand-primary/10 rounded-full px-2 py-0.5 flex items-center gap-0.5">
            <Sparkles className="w-2.5 h-2.5" />
            4 templates
          </span>
        </div>

        {/* Search bar */}
        <div className="flex items-center gap-1.5 bg-white rounded-lg px-2.5 py-1.5 mb-3 border border-gray-200">
          <Search className="w-3 h-3 text-gray-400" />
          <span className="text-[9px] text-gray-400">Rechercher un template...</span>
        </div>

        {/* Templates grid */}
        <div className="grid grid-cols-2 gap-2">
          {/* Expanded template */}
          <div className="col-span-2">
            <TemplateCard
              title="Code WiFi"
              preview=""
              usageCount={128}
              icon={<Wifi className="w-3 h-3 text-brand-primary" />}
              expanded
              fullText={
                <>
                  Bonjour <span className="bg-brand-primary/20 text-brand-primary rounded px-0.5 font-mono">{'{pr\u00e9nom}'}</span> ! Voici votre code WiFi : <span className="bg-brand-primary/20 text-brand-primary rounded px-0.5 font-mono">{'{wifi_code}'}</span>. Connectez-vous au r{'\u00e9'}seau &quot;Hotel_Guest&quot;. Bon s{'\u00e9'}jour dans notre {'\u00e9'}tablissement !
                </>
              }
            />
          </div>

          <TemplateCard
            title="Horaires check-in"
            preview={`Le check-in est disponible \u00e0 partir de 15h. Pour un early check-in, contactez la r\u00e9ception...`}
            usageCount={45}
            icon={<Clock className="w-3 h-3 text-blue-500" />}
          />

          <TemplateCard
            title="Confirmation spa"
            preview={`Votre r\u00e9servation spa est confirm\u00e9e pour {date} \u00e0 {heure}. Pr\u00e9sentez-vous 15min avant...`}
            usageCount={23}
            icon={<Sparkles className="w-3 h-3 text-purple-500" />}
          />

          <TemplateCard
            title="Plan d'acc{'\u00e8'}s"
            preview={`Voici notre plan d'acc\u00e8s : {link}. GPS : 43.7102, 7.2620. Parking disponible sur place...`}
            usageCount={67}
            icon={<MapPin className="w-3 h-3 text-red-500" />}
          />
        </div>
      </div>
    </BrowserMockup>
  );
}
