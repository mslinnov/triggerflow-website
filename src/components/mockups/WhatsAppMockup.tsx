'use client';

import { PhoneMockup } from './PhoneMockup';
import { Phone, Video, MoreVertical, Paperclip, Camera, Mic, Check, CheckCheck } from 'lucide-react';

export function WhatsAppMockup() {
  return (
    <PhoneMockup variant="dark">
      <div className="h-full flex flex-col bg-[#0b141a]">
        {/* WhatsApp header - dark green */}
        <div className="bg-[#202c33] px-3 py-2 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center">
            <span className="text-white text-xs font-bold">H</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Hôtel & Spa du Lac</p>
            <p className="text-[10px] text-gray-400">En ligne</p>
          </div>
          <div className="flex items-center gap-3 text-gray-400">
            <Video className="w-5 h-5" />
            <Phone className="w-5 h-5" />
            <MoreVertical className="w-5 h-5" />
          </div>
        </div>

        {/* Chat area with WhatsApp wallpaper pattern */}
        <div
          className="flex-1 p-3 overflow-hidden"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundColor: '#0b141a'
          }}
        >
          <div className="space-y-2">
            {/* System message */}
            <div className="flex justify-center mb-2">
              <span className="bg-[#182229] text-gray-400 text-[10px] px-3 py-1 rounded-lg">
                Messages chiffrés de bout en bout
              </span>
            </div>

            {/* Incoming message */}
            <div className="flex">
              <div className="bg-[#202c33] rounded-lg rounded-tl-none px-3 py-2 max-w-[85%] relative">
                <p className="text-sm text-gray-100">
                  Bonjour Jean ! 👋
                </p>
                <p className="text-sm text-gray-100 mt-1">
                  Merci pour votre réservation. Votre suite vous attend le 15 décembre.
                </p>
                <div className="flex items-center justify-end gap-1 mt-1">
                  <span className="text-[10px] text-gray-500">14:30</span>
                </div>
              </div>
            </div>

            {/* Incoming message with link */}
            <div className="flex">
              <div className="bg-[#202c33] rounded-lg rounded-tl-none px-3 py-2 max-w-[85%]">
                <p className="text-sm text-gray-100">
                  Voici votre lien de pré-check-in pour gagner du temps à l'arrivée :
                </p>
                {/* Link preview */}
                <div className="mt-2 bg-[#0b141a] rounded-lg overflow-hidden">
                  <div className="h-16 bg-brand-primary/20 flex items-center justify-center">
                    <span className="text-2xl">🏨</span>
                  </div>
                  <div className="p-2">
                    <p className="text-[10px] text-gray-500 uppercase">hotel-spa-dulac.com</p>
                    <p className="text-xs text-gray-300">Pré-check-in en ligne</p>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-1 mt-1">
                  <span className="text-[10px] text-gray-500">14:31</span>
                </div>
              </div>
            </div>

            {/* Outgoing message */}
            <div className="flex justify-end">
              <div className="bg-[#005c4b] rounded-lg rounded-tr-none px-3 py-2 max-w-[75%]">
                <p className="text-sm text-white">
                  Super, merci ! J'ai une question sur le parking ?
                </p>
                <div className="flex items-center justify-end gap-1 mt-1">
                  <span className="text-[10px] text-gray-300">14:35</span>
                  <CheckCheck className="w-4 h-4 text-[#53bdeb]" />
                </div>
              </div>
            </div>

            {/* Incoming response */}
            <div className="flex">
              <div className="bg-[#202c33] rounded-lg rounded-tl-none px-3 py-2 max-w-[85%]">
                <p className="text-sm text-gray-100">
                  Notre parking est gratuit et sécurisé 🚗 Vous pourrez vous garer dès votre arrivée !
                </p>
                <div className="flex items-center justify-end gap-1 mt-1">
                  <span className="text-[10px] text-gray-500">14:36</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Input bar */}
        <div className="bg-[#202c33] px-2 py-2 flex items-center gap-2">
          <button className="p-2 text-gray-400">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zm3.5-9c.828 0 1.5-.672 1.5-1.5S16.328 8 15.5 8 14 8.672 14 9.5s.672 1.5 1.5 1.5zm-7 0c.828 0 1.5-.672 1.5-1.5S9.328 8 8.5 8 7 8.672 7 9.5 7.672 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
            </svg>
          </button>
          <div className="flex-1 bg-[#2a3942] rounded-full px-4 py-2 flex items-center gap-2">
            <input
              type="text"
              placeholder="Message"
              className="flex-1 bg-transparent text-sm text-gray-200 outline-none placeholder-gray-500"
              disabled
            />
            <Paperclip className="w-5 h-5 text-gray-400 rotate-45" />
            <Camera className="w-5 h-5 text-gray-400" />
          </div>
          <button className="w-10 h-10 bg-[#00a884] rounded-full flex items-center justify-center">
            <Mic className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </PhoneMockup>
  );
}
