'use client';

import { Search, Phone, MoreHorizontal, Send, Paperclip, Smile } from 'lucide-react';

export function SmsBidirectionalMockup() {
  return (
    <div className="flex h-full w-full">
      {/* Left: Conversations list */}
      <div className="w-[35%] bg-gray-50 border-r border-gray-200 flex flex-col">
        {/* Search bar */}
        <div className="p-3 border-b border-gray-200">
          <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 px-2.5 py-1.5">
            <Search className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-[10px] text-gray-400">Rechercher...</span>
          </div>
        </div>

        {/* Conversation list */}
        <div className="flex-1 overflow-hidden">
          <ConversationItem
            initials="SD"
            name="Sophie Durand"
            preview="Super, merci beaucoup 😊"
            time="10:06"
            unread={1}
            active
          />
          <ConversationItem
            initials="ML"
            name="Marc Lefèvre"
            preview="OK parfait pour 14h !"
            time="09:45"
          />
          <ConversationItem
            initials="JR"
            name="Julie Roux"
            preview="Vous avez envoyé un SMS"
            time="Hier"
          />
          <ConversationItem
            initials="PD"
            name="Pierre Dubois"
            preview="Le spa est ouvert dimanche ?"
            time="Hier"
            unread={1}
          />
          <ConversationItem
            initials="CB"
            name="Claire Blanc"
            preview="Vous avez envoyé un SMS"
            time="Lun"
          />
        </div>

        {/* Stats mini */}
        <div className="p-3 border-t border-gray-200 bg-white">
          <div className="flex items-center justify-between">
            <div className="text-center">
              <p className="text-[10px] font-bold text-gray-800">47</p>
              <p className="text-[7px] text-gray-500">Conversations</p>
            </div>
            <div className="w-px h-6 bg-gray-200" />
            <div className="text-center">
              <p className="text-[10px] font-bold text-brand-primary">12</p>
              <p className="text-[7px] text-gray-500">Non lues</p>
            </div>
            <div className="w-px h-6 bg-gray-200" />
            <div className="text-center">
              <p className="text-[10px] font-bold text-gray-800">3min</p>
              <p className="text-[7px] text-gray-500">Temps rép.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Active conversation */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Conversation header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center">
                <span className="text-brand-primary text-[10px] font-bold">SD</span>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-800">Sophie Durand</p>
              <p className="text-[9px] text-gray-500">Ch. 204 · Check-in demain</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400">
              <Phone className="w-3.5 h-3.5" />
            </button>
            <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400">
              <MoreHorizontal className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Messages area */}
        <div className="flex-1 p-4 space-y-3 overflow-hidden bg-[#fafbfc]">
          {/* Date separator */}
          <div className="flex items-center gap-2">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-[8px] text-gray-400 font-medium">Aujourd&apos;hui</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Outgoing */}
          <div className="flex justify-end">
            <div className="max-w-[75%]">
              <div className="bg-brand-primary text-white rounded-2xl rounded-br-sm px-3 py-2">
                <p className="text-[10px] leading-relaxed">Bonjour Sophie ! 👋 Votre check-in est demain à 15h. Code WiFi : <span className="font-mono font-bold">HOTEL2026</span>. Bon voyage !</p>
              </div>
              <div className="flex items-center justify-end gap-1 mt-0.5 mr-1">
                <span className="text-[7px] text-gray-400">10:00</span>
                <span className="text-[7px] text-brand-primary">✓✓</span>
              </div>
            </div>
          </div>

          {/* Incoming */}
          <div className="flex justify-start">
            <div className="max-w-[75%]">
              <div className="bg-white border border-gray-200 text-gray-800 rounded-2xl rounded-bl-sm px-3 py-2 shadow-sm">
                <p className="text-[10px] leading-relaxed">Merci ! Est-ce possible d&apos;arriver à 13h plutôt ?</p>
              </div>
              <span className="text-[7px] text-gray-400 ml-1 mt-0.5 block">10:03</span>
            </div>
          </div>

          {/* Outgoing */}
          <div className="flex justify-end">
            <div className="max-w-[75%]">
              <div className="bg-brand-primary text-white rounded-2xl rounded-br-sm px-3 py-2">
                <p className="text-[10px] leading-relaxed">Bien sûr ! Nous préparons votre chambre en priorité. À demain Sophie ! 🏨</p>
              </div>
              <div className="flex items-center justify-end gap-1 mt-0.5 mr-1">
                <span className="text-[7px] text-gray-400">10:05</span>
                <span className="text-[7px] text-brand-primary">✓✓</span>
              </div>
            </div>
          </div>

          {/* Incoming */}
          <div className="flex justify-start">
            <div className="max-w-[75%]">
              <div className="bg-white border border-gray-200 text-gray-800 rounded-2xl rounded-bl-sm px-3 py-2 shadow-sm">
                <p className="text-[10px] leading-relaxed">Super, merci beaucoup 😊</p>
              </div>
              <span className="text-[7px] text-gray-400 ml-1 mt-0.5 block">10:06</span>
            </div>
          </div>
        </div>

        {/* Input bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-t border-gray-200 bg-white">
          <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400">
            <Paperclip className="w-3.5 h-3.5" />
          </button>
          <div className="flex-1 flex items-center bg-gray-100 rounded-xl px-3 py-2">
            <span className="text-[10px] text-gray-400">Répondre à Sophie...</span>
          </div>
          <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400">
            <Smile className="w-3.5 h-3.5" />
          </button>
          <button className="w-8 h-8 rounded-xl bg-brand-primary flex items-center justify-center shadow-sm">
            <Send className="w-3.5 h-3.5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

function ConversationItem({ initials, name, preview, time, unread, active }: {
  initials: string;
  name: string;
  preview: string;
  time: string;
  unread?: number;
  active?: boolean;
}) {
  return (
    <div className={`flex items-center gap-2.5 px-3 py-2.5 cursor-pointer transition-colors ${
      active ? 'bg-brand-primary/5 border-l-2 border-brand-primary' : 'hover:bg-gray-100 border-l-2 border-transparent'
    }`}>
      <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center flex-shrink-0">
        <span className="text-brand-primary text-[9px] font-bold">{initials}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className={`text-[10px] truncate ${active ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}>{name}</p>
          <span className="text-[8px] text-gray-400 flex-shrink-0 ml-1">{time}</span>
        </div>
        <p className="text-[9px] text-gray-500 truncate">{preview}</p>
      </div>
      {unread && (
        <div className="w-4 h-4 rounded-full bg-brand-primary flex items-center justify-center flex-shrink-0">
          <span className="text-[7px] font-bold text-white">{unread}</span>
        </div>
      )}
    </div>
  );
}
