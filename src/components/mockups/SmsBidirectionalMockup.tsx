'use client';

import { PhoneMockup } from './PhoneMockup';

export function SmsBidirectionalMockup() {
  return (
    <PhoneMockup>
      <div className="p-3 space-y-2">
        {/* Header */}
        <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
          <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center">
            <span className="text-brand-primary text-xs font-bold">SD</span>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-800">Sophie Durand</p>
            <p className="text-[9px] text-gray-400">+33 6 12 34 56 78</p>
          </div>
        </div>

        {/* Messages */}
        <div className="space-y-2 py-1">
          <SmsOut text="Bonjour Sophie ! Votre check-in est demain à 15h. Code WiFi : HOTEL2026. Bon voyage ! 🏨" time="10:00" />
          <SmsIn text="Merci ! Est-ce possible d'arriver à 13h ?" time="10:03" />
          <SmsOut text="Bien sûr ! Nous préparons votre chambre en priorité. À demain Sophie !" time="10:05" />
          <SmsIn text="Super, merci beaucoup 😊" time="10:06" />
        </div>

        {/* Reply bar */}
        <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
          <input
            className="flex-1 bg-gray-100 rounded-full px-3 py-1.5 text-[10px] text-gray-500 outline-none"
            placeholder="Répondre..."
            readOnly
          />
          <div className="w-7 h-7 rounded-full bg-brand-primary flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </div>
        </div>
      </div>
    </PhoneMockup>
  );
}

function SmsOut({ text, time }: { text: string; time: string }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[85%]">
        <div className="bg-brand-primary text-white rounded-2xl rounded-br-md px-3 py-2 text-[10px] leading-relaxed">
          {text}
        </div>
        <p className="text-[8px] text-gray-400 text-right mt-0.5">{time} ✓✓</p>
      </div>
    </div>
  );
}

function SmsIn({ text, time }: { text: string; time: string }) {
  return (
    <div className="flex justify-start">
      <div className="max-w-[85%]">
        <div className="bg-gray-100 text-gray-800 rounded-2xl rounded-bl-md px-3 py-2 text-[10px] leading-relaxed">
          {text}
        </div>
        <p className="text-[8px] text-gray-400 mt-0.5">{time}</p>
      </div>
    </div>
  );
}
