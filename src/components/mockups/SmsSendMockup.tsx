'use client';

import Image from 'next/image';
import { Clock, Globe, Check, Zap } from 'lucide-react';

export function SmsSendMockup() {
  return (
    <div className="flex h-full w-full">
      {/* Left: iPhone with conversation screenshot */}
      <div className="w-[38%] bg-gradient-to-br from-gray-50 via-gray-100/80 to-gray-50 border-r border-gray-200 flex items-center justify-center p-4">
        <div className="relative w-full max-w-[190px]">
          {/* Glow behind phone */}
          <div className="absolute -inset-6 bg-brand-primary/6 rounded-[3rem] blur-2xl" />

          {/* iPhone frame */}
          <div className="relative bg-gray-900 rounded-[2rem] p-[7px] shadow-2xl ring-1 ring-white/10">
            {/* Dynamic Island */}
            <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[72px] h-[18px] bg-black rounded-full z-20" />

            {/* Screen */}
            <div className="relative rounded-[1.6rem] overflow-hidden bg-white">
              <Image
                src="/images/produit/sms/feature-sms-conversation.webp"
                alt="Conversation SMS avec un client"
                width={390}
                height={844}
                className="w-full h-auto"
              />
            </div>

            {/* Home indicator */}
            <div className="absolute bottom-[5px] left-1/2 -translate-x-1/2 w-[52px] h-[3px] bg-gray-500 rounded-full z-20" />
          </div>
        </div>
      </div>

      {/* Right: Configuration panel */}
      <div className="flex-1 p-5 bg-white">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h4 className="text-sm font-semibold text-gray-800">Programmation intelligente</h4>
            <p className="text-[10px] text-gray-500">Chaque SMS part au bon moment</p>
          </div>
          <span className="text-[9px] font-medium text-brand-primary bg-brand-primary/10 px-2 py-1 rounded-full flex items-center gap-1">
            <Zap className="w-3 h-3" />
            Auto
          </span>
        </div>

        {/* Timezone */}
        <div className="bg-blue-50 rounded-xl p-3 border border-blue-100 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-600" />
              <div>
                <p className="text-[10px] font-medium text-blue-800">Fuseau auto-détecté</p>
                <p className="text-[9px] text-blue-600">Europe/Paris (UTC+1)</p>
              </div>
            </div>
            <Check className="w-4 h-4 text-blue-600" />
          </div>
        </div>

        {/* Send window */}
        <div className="bg-gray-50 rounded-xl p-3 border border-gray-200 mb-4">
          <div className="flex items-center gap-2 mb-2.5">
            <Clock className="w-4 h-4 text-brand-primary" />
            <span className="text-[10px] font-medium text-gray-700">Heure idéale d&apos;envoi</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-gray-600 bg-white px-2 py-1 rounded-lg border border-gray-200">08:00</span>
            <div className="flex-1 h-2 bg-gray-200 rounded-full relative">
              <div className="absolute left-[4%] right-[17%] h-full bg-gradient-to-r from-brand-primary to-brand-primary/80 rounded-full" />
              <div className="absolute left-[4%] top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-2 border-brand-primary rounded-full shadow" />
              <div className="absolute right-[17%] top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-2 border-brand-primary rounded-full shadow" />
            </div>
            <span className="text-[10px] font-mono text-gray-600 bg-white px-2 py-1 rounded-lg border border-gray-200">20:00</span>
          </div>
        </div>

        {/* Timeline d'envois */}
        <div>
          <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-2.5">Séquence programmée</p>
          <div className="space-y-2">
            <TimelineRow
              day="J-1"
              time="10:00"
              label="Rappel check-in"
              detail="Horaires + check-in en ligne"
              status="sent"
            />
            <TimelineRow
              day="J"
              time="15:00"
              label="Bienvenue + WiFi"
              detail="N° chambre, code WiFi, restaurant"
              status="scheduled"
            />
            <TimelineRow
              day="J+1"
              time="11:00"
              label="Offre spa -20%"
              detail="Promotion flash créneaux dispo"
              status="draft"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function TimelineRow({ day, time, label, detail, status }: {
  day: string;
  time: string;
  label: string;
  detail: string;
  status: 'sent' | 'scheduled' | 'draft';
}) {
  const colors = {
    sent: { dot: 'bg-green-500', bg: 'bg-green-50 border-green-200', badge: 'bg-green-100 text-green-700', badgeText: 'Envoyé' },
    scheduled: { dot: 'bg-brand-primary', bg: 'bg-brand-primary/5 border-brand-primary/20', badge: 'bg-brand-primary/10 text-brand-primary', badgeText: 'Programmé' },
    draft: { dot: 'bg-gray-300', bg: 'bg-gray-50 border-gray-200', badge: 'bg-gray-100 text-gray-500', badgeText: 'Brouillon' },
  };
  const c = colors[status];

  return (
    <div className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border ${c.bg}`}>
      <div className="flex flex-col items-center gap-0.5">
        <span className="text-[9px] font-bold text-gray-700">{day}</span>
        <span className="text-[8px] font-mono text-gray-500">{time}</span>
      </div>
      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${c.dot}`} />
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-semibold text-gray-800">{label}</p>
        <p className="text-[8px] text-gray-500 truncate">{detail}</p>
      </div>
      <span className={`text-[8px] font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${c.badge}`}>
        {c.badgeText}
      </span>
    </div>
  );
}
