'use client';

import { Mail, MessageSquare, MessageCircle } from 'lucide-react';

export function WhatsAppHistoryMockup() {
  return (
    <div className="h-full w-full p-5 bg-white">
        {/* Client header */}
        <div className="flex items-center gap-3 pb-3 mb-3 border-b border-gray-100">
          <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center">
            <span className="text-brand-primary font-bold text-sm">SD</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">Sophie Durand</p>
            <p className="text-[10px] text-gray-500">3 canaux · 12 échanges</p>
          </div>
          <div className="ml-auto flex gap-1">
            <ChannelBadge icon={Mail} label="5" color="blue" />
            <ChannelBadge icon={MessageSquare} label="4" color="green" />
            <ChannelBadge icon={MessageCircle} label="3" color="emerald" />
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-2.5 relative">
          <div className="absolute left-[15px] top-2 bottom-2 w-px bg-gray-200" />

          <TimelineItem channel="email" time="Aujourd'hui · 10:00" text="Email de confirmation réservation envoyé" />
          <TimelineItem channel="whatsapp" time="Aujourd'hui · 10:03" text="Client : 'Merci ! Horaires piscine ?'" />
          <TimelineItem channel="whatsapp" time="Aujourd'hui · 10:03" text="Bot : horaires + info serviettes" />
          <TimelineItem channel="sms" time="Hier · 15:00" text="SMS rappel check-in envoyé" />
          <TimelineItem channel="email" time="J-3 · 09:00" text="Email pré-séjour + offre spa" />
          <TimelineItem channel="whatsapp" time="J-3 · 09:15" text="Client : 'Je prends le spa duo !'" />
        </div>
    </div>
  );
}

function ChannelBadge({ icon: Icon, label, color }: { icon: React.ComponentType<{ className?: string }>; label: string; color: string }) {
  const colors: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    green: 'bg-green-50 text-green-600 border-green-200',
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  };
  return (
    <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded border text-[9px] font-medium ${colors[color]}`}>
      <Icon className="w-3 h-3" />
      {label}
    </div>
  );
}

function TimelineItem({ channel, time, text }: { channel: 'email' | 'sms' | 'whatsapp'; time: string; text: string }) {
  const icons = { email: Mail, sms: MessageSquare, whatsapp: MessageCircle };
  const colors = {
    email: 'bg-blue-100 text-blue-600',
    sms: 'bg-green-100 text-green-600',
    whatsapp: 'bg-emerald-100 text-emerald-600',
  };
  const Icon = icons[channel];
  return (
    <div className="flex items-start gap-3 relative">
      <div className={`w-[30px] h-[30px] rounded-full flex items-center justify-center flex-shrink-0 z-10 ${colors[channel]}`}>
        <Icon className="w-3.5 h-3.5" />
      </div>
      <div className="flex-1 min-w-0 pt-0.5">
        <p className="text-[10px] text-gray-700 leading-relaxed">{text}</p>
        <p className="text-[8px] text-gray-400 mt-0.5">{time}</p>
      </div>
    </div>
  );
}
