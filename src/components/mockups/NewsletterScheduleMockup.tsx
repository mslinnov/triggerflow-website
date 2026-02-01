'use client';

import { BrowserMockup } from './PhoneMockup';
import { Calendar, Mail, Check, Clock } from 'lucide-react';

export function NewsletterScheduleMockup() {
  return (
    <BrowserMockup title="Calendrier éditorial" className="max-w-lg">
      <div className="p-4 min-h-[300px]">
        {/* Month header */}
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-semibold text-gray-800">Décembre 2026</h4>
          <div className="flex items-center gap-1.5">
            <button className="w-6 h-6 rounded bg-gray-100 flex items-center justify-center text-gray-500 text-xs">←</button>
            <button className="w-6 h-6 rounded bg-gray-100 flex items-center justify-center text-gray-500 text-xs">→</button>
          </div>
        </div>

        {/* Schedule list */}
        <div className="space-y-2">
          <ScheduleItem
            date="1 déc"
            day="Lun"
            title="Newsletter mensuelle"
            segment="Tous les contacts"
            status="sent"
            opens="32%"
          />
          <ScheduleItem
            date="8 déc"
            day="Lun"
            title="Offre Immaculée"
            segment="Couples · Familles"
            status="sent"
            opens="41%"
          />
          <ScheduleItem
            date="15 déc"
            day="Lun"
            title="Offre Saint-Sylvestre"
            segment="VIP · Fidèles"
            status="scheduled"
          />
          <ScheduleItem
            date="22 déc"
            day="Lun"
            title="Vœux de fin d'année"
            segment="Tous les contacts"
            status="draft"
          />
        </div>

        {/* Auto sequences */}
        <div className="mt-4 pt-3 border-t border-gray-100">
          <p className="text-[10px] font-medium text-gray-500 mb-2">Séquences automatiques actives</p>
          <div className="flex gap-2">
            <AutoBadge label="Anniversaire" />
            <AutoBadge label="Relance 6 mois" />
            <AutoBadge label="Bienvenue" />
          </div>
        </div>
      </div>
    </BrowserMockup>
  );
}

function ScheduleItem({ date, day, title, segment, status, opens }: { date: string; day: string; title: string; segment: string; status: 'sent' | 'scheduled' | 'draft'; opens?: string }) {
  const statusConfig = {
    sent: { icon: Check, label: 'Envoyé', color: 'text-green-600 bg-green-50' },
    scheduled: { icon: Clock, label: 'Programmé', color: 'text-blue-600 bg-blue-50' },
    draft: { icon: Mail, label: 'Brouillon', color: 'text-gray-500 bg-gray-100' },
  };
  const s = statusConfig[status];
  const Icon = s.icon;
  return (
    <div className="flex items-center gap-3 p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
      <div className="flex flex-col items-center w-10 flex-shrink-0">
        <span className="text-[9px] text-gray-400">{day}</span>
        <span className="text-sm font-bold text-gray-800">{date.split(' ')[0]}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-gray-800 truncate">{title}</p>
        <p className="text-[9px] text-gray-500">{segment}</p>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        {opens && <span className="text-[9px] font-medium text-brand-primary">{opens} opens</span>}
        <span className={`flex items-center gap-0.5 text-[8px] px-1.5 py-0.5 rounded ${s.color}`}>
          <Icon className="w-2.5 h-2.5" />{s.label}
        </span>
      </div>
    </div>
  );
}

function AutoBadge({ label }: { label: string }) {
  return (
    <span className="text-[9px] px-2 py-1 bg-brand-primary/10 text-brand-primary rounded-full font-medium flex items-center gap-1">
      <Calendar className="w-3 h-3" />{label}
    </span>
  );
}
