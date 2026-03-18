'use client';

import { Bot } from 'lucide-react';

export function WhatsAppChatbotMockup() {
  return (
    <div className="h-full w-full bg-[#e5ddd5]">
        {/* WhatsApp header */}
        <div className="bg-[#075e54] px-3 py-2 flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-[10px] font-semibold text-white">Hôtel du Lac</p>
            <p className="text-[8px] text-white/70">en ligne</p>
          </div>
        </div>

        {/* Messages */}
        <div className="p-2 space-y-1.5 overflow-hidden">
          <WaIn text="Bonjour ! Quels sont les horaires de la piscine ?" time="14:02" />
          <WaOut text="🏊 La piscine est ouverte de 7h à 21h. Serviettes fournies sur place ! Autre question ?" time="14:02" bot />
          <WaIn text="Oui, je voudrais réserver le spa demain" time="14:03" />
          <WaOut text="💆 Voici les créneaux disponibles demain :" time="14:03" bot />
          {/* Quick reply buttons */}
          <div className="flex flex-col gap-1 ml-1">
            <QuickReply text="🕐 10h00 - Duo (89€)" />
            <QuickReply text="🕑 14h00 - Duo (89€)" />
            <QuickReply text="🕓 16h00 - Solo (59€)" />
          </div>
          <WaIn text="14h00 pour 2 personnes svp !" time="14:04" />
          <WaOut text="✅ Réservé ! Spa duo demain à 14h. Confirmation envoyée par email. Profitez bien ! 🌿" time="14:04" bot />
        </div>
    </div>
  );
}

function WaOut({ text, time, bot }: { text: string; time: string; bot?: boolean }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[85%] bg-[#dcf8c6] rounded-lg rounded-tr-none px-2 py-1.5 shadow-sm">
        {bot && <p className="text-[7px] text-green-700 font-medium mb-0.5">🤖 Bot</p>}
        <p className="text-[10px] text-gray-800 leading-relaxed">{text}</p>
        <p className="text-[7px] text-gray-500 text-right mt-0.5">{time}</p>
      </div>
    </div>
  );
}

function WaIn({ text, time }: { text: string; time: string }) {
  return (
    <div className="flex justify-start">
      <div className="max-w-[85%] bg-white rounded-lg rounded-tl-none px-2 py-1.5 shadow-sm">
        <p className="text-[10px] text-gray-800 leading-relaxed">{text}</p>
        <p className="text-[7px] text-gray-500 text-right mt-0.5">{time}</p>
      </div>
    </div>
  );
}

function QuickReply({ text }: { text: string }) {
  return (
    <div className="bg-white border border-[#25D366]/30 rounded-lg px-3 py-1.5 text-center shadow-sm max-w-[80%] ml-auto">
      <span className="text-[10px] text-[#075e54] font-medium">{text}</span>
    </div>
  );
}
