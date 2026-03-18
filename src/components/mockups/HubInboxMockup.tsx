'use client';

import { Mail, MessageSquare, Search, User } from 'lucide-react';

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.146.564 4.158 1.548 5.896L0 24l6.304-1.654A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.82a9.82 9.82 0 01-5.01-1.374l-.36-.213-3.73.978.995-3.637-.235-.374A9.806 9.806 0 012.18 12c0-5.422 4.398-9.82 9.82-9.82 5.422 0 9.82 4.398 9.82 9.82 0 5.422-4.398 9.82-9.82 9.82z"/>
  </svg>
);

interface ConversationItemProps {
  name: string;
  initials: string;
  channel: 'email' | 'sms' | 'whatsapp';
  preview: string;
  time: string;
  unread?: boolean;
  selected?: boolean;
}

function ConversationItem({ name, initials, channel, preview, time, unread, selected }: ConversationItemProps) {
  const channelIcon = {
    email: <Mail className="w-3 h-3 text-blue-500" />,
    sms: <MessageSquare className="w-3 h-3 text-purple-500" />,
    whatsapp: <WhatsAppIcon className="w-3 h-3 text-green-500" />,
  };

  return (
    <div className={`flex items-center gap-2 px-3 py-2 cursor-pointer ${selected ? 'bg-brand-primary/5 border-l-2 border-brand-primary' : 'hover:bg-gray-50'}`}>
      <div className="relative flex-shrink-0">
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
          <span className="text-[9px] font-bold text-gray-600">{initials}</span>
        </div>
        <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-white flex items-center justify-center shadow-sm">
          {channelIcon[channel]}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className={`text-[10px] ${unread ? 'font-bold text-gray-900' : 'font-medium text-gray-700'} truncate`}>{name}</p>
          <span className="text-[8px] text-gray-400 flex-shrink-0 ml-1">{time}</span>
        </div>
        <p className={`text-[9px] truncate ${unread ? 'text-gray-700 font-medium' : 'text-gray-400'}`}>{preview}</p>
      </div>
      {unread && (
        <div className="w-2 h-2 rounded-full bg-brand-primary flex-shrink-0" />
      )}
    </div>
  );
}

export function HubInboxMockup() {
  return (
    <div className="h-full w-full">
        {/* Filter tabs */}
        <div className="flex items-center gap-1 px-3 py-2 border-b border-gray-100 bg-gray-50/50">
          <span className="text-[9px] font-semibold text-white bg-brand-primary rounded-full px-2 py-0.5">Tous</span>
          <span className="text-[9px] font-medium text-red-600 bg-red-50 rounded-full px-2 py-0.5">Non lus (3)</span>
          <span className="text-[9px] text-gray-500 bg-white rounded-full px-2 py-0.5 border border-gray-200">Email</span>
          <span className="text-[9px] text-gray-500 bg-white rounded-full px-2 py-0.5 border border-gray-200">SMS</span>
          <span className="text-[9px] text-gray-500 bg-white rounded-full px-2 py-0.5 border border-gray-200">WhatsApp</span>
          <div className="ml-auto flex items-center gap-1 text-[8px] text-gray-500">
            <User className="w-2.5 h-2.5" />
            <span>Assign{'\u00e9'} {'\u00e0'}: <strong>Marie R.</strong></span>
          </div>
        </div>

        <div className="flex">
          {/* Left panel - conversation list */}
          <div className="w-[45%] border-r border-gray-100">
            {/* Search */}
            <div className="px-3 py-2 border-b border-gray-50">
              <div className="flex items-center gap-1.5 bg-gray-100 rounded-lg px-2 py-1">
                <Search className="w-3 h-3 text-gray-400" />
                <span className="text-[9px] text-gray-400">Rechercher...</span>
              </div>
            </div>

            <ConversationItem
              name="Sophie Durand"
              initials="SD"
              channel="whatsapp"
              preview="À quelle heure le petit-déj..."
              time="2min"
              unread
              selected
            />
            <ConversationItem
              name="Pierre Bernard"
              initials="PB"
              channel="email"
              preview="Re: Confirmation réservation"
              time="15min"
              unread
            />
            <ConversationItem
              name="Marie Petit"
              initials="MP"
              channel="sms"
              preview="Oui, parfait pour 19h"
              time="1h"
              unread
            />
            <ConversationItem
              name="Jean Martin"
              initials="JM"
              channel="whatsapp"
              preview="Merci beaucoup !"
              time="2h"
            />
          </div>

          {/* Right panel - conversation view */}
          <div className="w-[55%] flex flex-col">
            {/* Conversation header */}
            <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-100">
              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-[8px] font-bold text-gray-600">SD</span>
              </div>
              <div>
                <p className="text-[10px] font-semibold text-gray-800">Sophie Durand</p>
                <div className="flex items-center gap-1">
                  <WhatsAppIcon className="w-2.5 h-2.5 text-green-500" />
                  <span className="text-[8px] text-green-600">WhatsApp</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-3 space-y-2 bg-gray-50/30">
              {/* Outgoing message */}
              <div className="flex justify-end">
                <div className="max-w-[85%]">
                  <div className="bg-brand-primary text-white rounded-xl rounded-br-sm px-2.5 py-1.5 text-[9px] leading-relaxed">
                    Bonjour Sophie ! Votre r{'\u00e9'}servation pour le 15 d{'\u00e9'}c est bien confirm{'\u00e9'}e. {'\ud83c\udfe8'}
                  </div>
                  <p className="text-[7px] text-gray-400 text-right mt-0.5">14:20 {'\u2713\u2713'}</p>
                </div>
              </div>

              {/* Incoming message */}
              <div className="flex justify-start">
                <div className="max-w-[85%]">
                  <div className="bg-white text-gray-800 rounded-xl rounded-bl-sm px-2.5 py-1.5 text-[9px] leading-relaxed shadow-sm">
                    Merci ! {'\u00c0'} quelle heure le petit-d{'\u00e9'}jeuner est servi ?
                  </div>
                  <p className="text-[7px] text-gray-400 mt-0.5">14:22</p>
                </div>
              </div>

              {/* Incoming message */}
              <div className="flex justify-start">
                <div className="max-w-[85%]">
                  <div className="bg-white text-gray-800 rounded-xl rounded-bl-sm px-2.5 py-1.5 text-[9px] leading-relaxed shadow-sm">
                    Et est-ce que le parking est inclus ?
                  </div>
                  <p className="text-[7px] text-gray-400 mt-0.5">14:22</p>
                </div>
              </div>
            </div>

            {/* Reply bar */}
            <div className="flex items-center gap-1.5 px-3 py-2 border-t border-gray-100">
              <input
                className="flex-1 bg-gray-100 rounded-full px-2.5 py-1 text-[9px] text-gray-500 outline-none"
                placeholder="R{'\u00e9'}pondre via WhatsApp..."
                readOnly
              />
              <div className="w-6 h-6 rounded-full bg-brand-primary flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
