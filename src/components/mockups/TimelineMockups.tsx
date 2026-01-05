'use client';

import { PhoneMockup } from './PhoneMockup';
import { Star, Calendar, MapPin, Clock, ArrowRight, Check, MessageSquare } from 'lucide-react';

/**
 * Email confirmation mockup for "Before" stage
 * Shows a reservation confirmation email on phone
 */
export function EmailConfirmationMockup() {
  return (
    <PhoneMockup variant="light">
      <div className="p-4 h-full bg-gray-50">
        {/* Email app header */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center">
            <span className="text-white text-xs font-bold">H</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-gray-800 truncate">Hôtel & Spa du Lac</p>
            <p className="text-[10px] text-gray-500">Confirmation de réservation</p>
          </div>
          <span className="text-[10px] text-gray-400">9:41</span>
        </div>

        {/* Email content */}
        <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
          {/* Header with checkmark */}
          <div className="text-center mb-3 pb-3 border-b border-gray-100">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Check className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-sm font-semibold text-gray-800">Réservation confirmée !</p>
            <p className="text-[10px] text-gray-500">N° 2024-HT-1847</p>
          </div>

          {/* Booking details */}
          <div className="space-y-2 mb-3">
            <div className="flex items-center gap-2 text-xs">
              <Calendar className="w-4 h-4 text-brand-primary" />
              <span className="text-gray-600">15 - 18 Décembre 2024</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <MapPin className="w-4 h-4 text-brand-primary" />
              <span className="text-gray-600">Suite Deluxe Vue Lac</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <Clock className="w-4 h-4 text-brand-primary" />
              <span className="text-gray-600">Arrivée dès 15h00</span>
            </div>
          </div>

          {/* CTA button */}
          <button className="w-full bg-brand-primary text-white py-2 px-3 rounded-lg text-xs font-medium flex items-center justify-center gap-1">
            Voir ma réservation
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Info footer */}
        <p className="text-[9px] text-gray-400 text-center mt-3">
          Des questions ? Répondez à cet email
        </p>
      </div>
    </PhoneMockup>
  );
}

/**
 * SMS conversation mockup for "During" stage
 * Shows a welcome SMS conversation
 */
export function SMSConversationMockup() {
  return (
    <PhoneMockup variant="light">
      <div className="p-3 h-full bg-gray-100">
        {/* SMS header */}
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-200">
          <div className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center">
            <span className="text-white text-xs font-bold">H</span>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-800">Hôtel & Spa du Lac</p>
            <p className="text-[10px] text-green-600 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              Vérifié
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="space-y-3">
          {/* Incoming message */}
          <div className="flex gap-2">
            <div className="w-6 h-6 rounded-full bg-brand-primary flex items-center justify-center flex-shrink-0">
              <span className="text-white text-[8px] font-bold">H</span>
            </div>
            <div className="bg-white rounded-2xl rounded-tl-sm px-3 py-2 max-w-[85%] shadow-sm">
              <p className="text-xs text-gray-800">
                Bonjour Jean ! 👋
              </p>
              <p className="text-xs text-gray-800 mt-1">
                Bienvenue à l'Hôtel & Spa du Lac. Votre chambre 302 est prête.
              </p>
              <p className="text-[10px] text-gray-400 mt-1">14:32</p>
            </div>
          </div>

          {/* Second message with quick actions */}
          <div className="flex gap-2">
            <div className="w-6 h-6 rounded-full bg-brand-primary flex items-center justify-center flex-shrink-0">
              <span className="text-white text-[8px] font-bold">H</span>
            </div>
            <div className="bg-white rounded-2xl rounded-tl-sm px-3 py-2 max-w-[85%] shadow-sm">
              <p className="text-xs text-gray-800">
                Code WiFi : HOTEL2024
              </p>
              <p className="text-xs text-gray-800 mt-1">
                Notre spa vous attend jusqu'à 20h 🧖‍♀️
              </p>
              <p className="text-[10px] text-gray-400 mt-1">14:32</p>
            </div>
          </div>

          {/* User reply */}
          <div className="flex justify-end">
            <div className="bg-brand-primary rounded-2xl rounded-tr-sm px-3 py-2 max-w-[75%]">
              <p className="text-xs text-white">Merci ! Je réserve pour le spa 🙏</p>
              <p className="text-[10px] text-white/70 mt-1 text-right">14:35</p>
            </div>
          </div>
        </div>

        {/* Input bar */}
        <div className="absolute bottom-8 left-3 right-3">
          <div className="flex items-center gap-2 bg-white rounded-full px-3 py-2 shadow-sm">
            <input
              type="text"
              placeholder="Message..."
              className="flex-1 text-xs text-gray-600 outline-none bg-transparent"
              disabled
            />
            <MessageSquare className="w-4 h-4 text-brand-primary" />
          </div>
        </div>
      </div>
    </PhoneMockup>
  );
}

/**
 * Review request mockup for "After" stage
 * Shows a Google review request with star rating
 */
export function ReviewRequestMockup() {
  return (
    <PhoneMockup variant="light">
      <div className="p-4 h-full bg-gradient-to-b from-gray-50 to-white">
        {/* Header */}
        <div className="text-center mb-4">
          <div className="w-12 h-12 bg-brand-primary rounded-xl flex items-center justify-center mx-auto mb-2">
            <span className="text-white text-lg">🏨</span>
          </div>
          <p className="text-sm font-semibold text-gray-800">Hôtel & Spa du Lac</p>
          <p className="text-[10px] text-gray-500">Merci pour votre séjour !</p>
        </div>

        {/* Review card */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
          <p className="text-xs text-gray-600 text-center mb-3">
            Comment s'est passé votre séjour, Jean ?
          </p>

          {/* Star rating */}
          <div className="flex justify-center gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className={`w-8 h-8 ${
                  i <= 4
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-200'
                } cursor-pointer hover:scale-110 transition-transform`}
              />
            ))}
          </div>

          {/* Selected rating feedback */}
          <div className="text-center mb-3">
            <span className="text-xs text-gray-600">Vous avez sélectionné</span>
            <p className="text-sm font-semibold text-gray-800">Très satisfait ⭐</p>
          </div>

          {/* Comment input */}
          <div className="bg-gray-50 rounded-lg p-2 mb-3">
            <p className="text-xs text-gray-400">
              Un commentaire ? (optionnel)
            </p>
            <p className="text-xs text-gray-700 mt-1">
              Séjour parfait, personnel aux petits soins...
            </p>
          </div>

          {/* Submit button */}
          <button className="w-full bg-brand-primary text-white py-2.5 px-4 rounded-lg text-xs font-medium flex items-center justify-center gap-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm5.82 9.04l-6.26 6.26a.75.75 0 01-1.06 0l-3.3-3.3a.75.75 0 111.06-1.06l2.77 2.77 5.73-5.73a.75.75 0 111.06 1.06z" />
            </svg>
            Publier sur Google
          </button>
        </div>

        {/* Google branding */}
        <div className="flex items-center justify-center gap-2 text-gray-400">
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <span className="text-[10px]">Propulsé par Google Reviews</span>
        </div>
      </div>
    </PhoneMockup>
  );
}
