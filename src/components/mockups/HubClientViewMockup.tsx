'use client';

import { Mail, MessageSquare, Star, Clock, Bed, StickyNote, Send } from 'lucide-react';
import { BrowserMockup } from './PhoneMockup';

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.146.564 4.158 1.548 5.896L0 24l6.304-1.654A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.82a9.82 9.82 0 01-5.01-1.374l-.36-.213-3.73.978.995-3.637-.235-.374A9.806 9.806 0 012.18 12c0-5.422 4.398-9.82 9.82-9.82 5.422 0 9.82 4.398 9.82 9.82 0 5.422-4.398 9.82-9.82 9.82z"/>
  </svg>
);

export function HubClientViewMockup() {
  return (
    <BrowserMockup title="Hub Messagerie - TriggerFlow" className="max-w-lg">
      <div className="min-h-[300px] flex">
        {/* Main conversation area */}
        <div className="flex-1 flex flex-col">
          {/* Conversation header */}
          <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-100">
            <div className="w-7 h-7 rounded-full bg-amber-100 flex items-center justify-center">
              <span className="text-[9px] font-bold text-amber-700">SD</span>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-gray-800">Sophie Durand</p>
              <div className="flex items-center gap-1">
                <WhatsAppIcon className="w-2.5 h-2.5 text-green-500" />
                <span className="text-[8px] text-green-600">En ligne</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 space-y-2 bg-gray-50/30">
            {/* Outgoing */}
            <div className="flex justify-end">
              <div className="max-w-[80%]">
                <div className="bg-brand-primary text-white rounded-xl rounded-br-sm px-2.5 py-1.5 text-[9px] leading-relaxed">
                  Bonjour Sophie, bienvenue ! Votre chambre 304 vue mer est pr{'\u00ea'}te. {'\ud83c\udf0a'}
                </div>
                <p className="text-[7px] text-gray-400 text-right mt-0.5">Hier, 16:00 {'\u2713\u2713'}</p>
              </div>
            </div>

            {/* Incoming */}
            <div className="flex justify-start">
              <div className="max-w-[80%]">
                <div className="bg-white text-gray-800 rounded-xl rounded-bl-sm px-2.5 py-1.5 text-[9px] leading-relaxed shadow-sm">
                  Merci beaucoup ! Est-il possible de r{'\u00e9'}server le spa pour demain matin ?
                </div>
                <p className="text-[7px] text-gray-400 mt-0.5">Hier, 16:05</p>
              </div>
            </div>

            {/* Outgoing */}
            <div className="flex justify-end">
              <div className="max-w-[80%]">
                <div className="bg-brand-primary text-white rounded-xl rounded-br-sm px-2.5 py-1.5 text-[9px] leading-relaxed">
                  Bien s{'\u00fb'}r ! Je vous r{'\u00e9'}serve le soin signature {'\u00e0'} 10h. Confirmez-vous ?
                </div>
                <p className="text-[7px] text-gray-400 text-right mt-0.5">Hier, 16:08 {'\u2713\u2713'}</p>
              </div>
            </div>
          </div>

          {/* Reply bar with channel selector */}
          <div className="px-3 py-2 border-t border-gray-100">
            <div className="flex items-center gap-1.5 mb-1.5">
              <span className="text-[8px] text-gray-400">R{'\u00e9'}pondre via :</span>
              <button className="flex items-center gap-0.5 text-[8px] text-gray-500 bg-gray-100 rounded px-1.5 py-0.5">
                <Mail className="w-2.5 h-2.5" /> Email
              </button>
              <button className="flex items-center gap-0.5 text-[8px] text-gray-500 bg-gray-100 rounded px-1.5 py-0.5">
                <MessageSquare className="w-2.5 h-2.5" /> SMS
              </button>
              <button className="flex items-center gap-0.5 text-[8px] text-white bg-green-500 rounded px-1.5 py-0.5">
                <WhatsAppIcon className="w-2.5 h-2.5" /> WhatsApp
              </button>
            </div>
            <div className="flex items-center gap-1.5">
              <input
                className="flex-1 bg-gray-100 rounded-full px-2.5 py-1 text-[9px] text-gray-500 outline-none"
                placeholder="Votre message..."
                readOnly
              />
              <div className="w-6 h-6 rounded-full bg-brand-primary flex items-center justify-center">
                <Send className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Right sidebar - Client context */}
        <div className="w-[40%] border-l border-gray-100 bg-gray-50/50 overflow-y-auto">
          {/* Client card header */}
          <div className="p-3 text-center border-b border-gray-100 bg-white">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-1.5">
              <span className="text-xs font-bold text-amber-700">SD</span>
            </div>
            <p className="text-xs font-semibold text-gray-800">Sophie Durand</p>
            <div className="flex items-center justify-center gap-1 mt-1">
              <span className="text-[8px] font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-2 py-0.5 flex items-center gap-0.5">
                <Star className="w-2 h-2 fill-amber-500 text-amber-500" />
                Gold {'\u00b7'} 8 s{'\u00e9'}jours
              </span>
            </div>
          </div>

          {/* Quick info */}
          <div className="p-3 space-y-2 border-b border-gray-100">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-gray-400" />
              <div>
                <p className="text-[8px] text-gray-400">Dernier s{'\u00e9'}jour</p>
                <p className="text-[9px] font-medium text-gray-700">D{'\u00e9'}c 2026</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <Bed className="w-3 h-3 text-gray-400" />
              <div>
                <p className="text-[8px] text-gray-400">Chambre pr{'\u00e9'}f.</p>
                <p className="text-[9px] font-medium text-gray-700">Vue mer</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <Star className="w-3 h-3 text-gray-400" />
              <div>
                <p className="text-[8px] text-gray-400">Note</p>
                <p className="text-[9px] font-medium text-gray-700">4.8/5</p>
              </div>
            </div>
          </div>

          {/* Historique */}
          <div className="p-3 border-b border-gray-100">
            <p className="text-[9px] font-semibold text-gray-600 mb-2">Historique</p>
            <div className="space-y-2">
              <div className="flex items-start gap-1.5">
                <div className="w-4 h-4 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <WhatsAppIcon className="w-2.5 h-2.5 text-green-500" />
                </div>
                <div>
                  <p className="text-[8px] text-gray-700">Confirmation check-in</p>
                  <p className="text-[7px] text-gray-400">Hier, 16:00</p>
                </div>
              </div>
              <div className="flex items-start gap-1.5">
                <div className="w-4 h-4 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mail className="w-2.5 h-2.5 text-blue-500" />
                </div>
                <div>
                  <p className="text-[8px] text-gray-700">Email r{'\u00e9'}servation</p>
                  <p className="text-[7px] text-gray-400">10 d{'\u00e9'}c</p>
                </div>
              </div>
              <div className="flex items-start gap-1.5">
                <div className="w-4 h-4 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MessageSquare className="w-2.5 h-2.5 text-purple-500" />
                </div>
                <div>
                  <p className="text-[8px] text-gray-700">SMS enqu{'\u00ea'}te satisfaction</p>
                  <p className="text-[7px] text-gray-400">5 nov</p>
                </div>
              </div>
            </div>
          </div>

          {/* Notes internes */}
          <div className="p-3">
            <p className="text-[9px] font-semibold text-gray-600 mb-1.5 flex items-center gap-1">
              <StickyNote className="w-3 h-3" />
              Notes internes
            </p>
            <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-2">
              <p className="text-[8px] text-yellow-800 leading-relaxed">
                Cliente fid{'\u00e8'}le, attention aux d{'\u00e9'}tails. Pr{'\u00e9'}f{'\u00e8'}re {'\u00e9'}tage {'\u00e9'}lev{'\u00e9'} et oreiller ferme.
              </p>
              <p className="text-[7px] text-yellow-600 mt-1">Marie R. - 10 d{'\u00e9'}c</p>
            </div>
          </div>
        </div>
      </div>
    </BrowserMockup>
  );
}
