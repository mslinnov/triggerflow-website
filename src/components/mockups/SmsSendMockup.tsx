'use client';

import { PhoneMockup } from './PhoneMockup';
import { Clock, Globe, Check } from 'lucide-react';

export function SmsSendMockup() {
  return (
    <PhoneMockup>
      <div className="p-4 space-y-3">
        <h4 className="text-xs font-semibold text-gray-800 mb-2">Programmation SMS</h4>

        {/* Timezone selector */}
        <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
          <div className="flex items-center gap-2 mb-2">
            <Globe className="w-4 h-4 text-blue-600" />
            <span className="text-[10px] font-medium text-blue-800">Fuseau horaire détecté</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-blue-700">Europe/Paris (UTC+1)</span>
            <Check className="w-3 h-3 text-blue-600" />
          </div>
        </div>

        {/* Send window */}
        <div className="bg-white rounded-lg p-3 border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-brand-primary" />
            <span className="text-[10px] font-medium text-gray-700">Fenêtre d&apos;envoi</span>
          </div>
          <div className="flex items-center gap-2">
            <TimeSlot time="09:00" />
            <div className="flex-1 h-1.5 bg-brand-primary/20 rounded-full relative">
              <div className="absolute left-[10%] right-[25%] h-full bg-brand-primary rounded-full" />
            </div>
            <TimeSlot time="20:00" />
          </div>
          <p className="text-[9px] text-gray-400 mt-1.5 text-center">Plages légales RGPD respectées</p>
        </div>

        {/* Scheduled messages */}
        <div className="space-y-2">
          <p className="text-[10px] font-medium text-gray-500">Envois programmés</p>
          <ScheduleRow time="J-1 · 10:00" label="Rappel check-in" status="scheduled" />
          <ScheduleRow time="J · 15:00" label="Bienvenue + WiFi" status="scheduled" />
          <ScheduleRow time="J+1 · 09:00" label="Offre spa flash" status="draft" />
        </div>
      </div>
    </PhoneMockup>
  );
}

function TimeSlot({ time }: { time: string }) {
  return <span className="text-[10px] font-mono text-gray-600 bg-gray-100 px-1.5 py-0.5 rounded">{time}</span>;
}

function ScheduleRow({ time, label, status }: { time: string; label: string; status: 'scheduled' | 'draft' }) {
  return (
    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
      <div className={`w-2 h-2 rounded-full ${status === 'scheduled' ? 'bg-brand-primary' : 'bg-gray-300'}`} />
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-medium text-gray-700 truncate">{label}</p>
        <p className="text-[9px] text-gray-400">{time}</p>
      </div>
      <span className={`text-[8px] px-1.5 py-0.5 rounded ${status === 'scheduled' ? 'bg-brand-primary/10 text-brand-primary' : 'bg-gray-200 text-gray-500'}`}>
        {status === 'scheduled' ? 'Programmé' : 'Brouillon'}
      </span>
    </div>
  );
}
