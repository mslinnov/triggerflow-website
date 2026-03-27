'use client';

import { BrowserMockup } from './PhoneMockup';
import { Star, Sparkles, Pencil, Send } from 'lucide-react';

export function ReviewAiResponseMockup() {
  return (
    <BrowserMockup title="Reponses IA aux avis">
      <div className="p-4 min-h-[300px]">
        {/* Tone selector */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] text-gray-500">Ton :</span>
          {['Professionnel', 'Chaleureux', 'Empathique'].map((tone, i) => (
            <button
              key={tone}
              className={`text-[10px] px-2.5 py-1 rounded-full font-medium transition-colors ${
                i === 1
                  ? 'bg-brand-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tone}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Left: Review card */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-purple-600">ML</span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-800">Marie L.</p>
                  <p className="text-[10px] text-gray-400">Il y a 2 heures</p>
                </div>
              </div>
            </div>

            {/* Stars */}
            <div className="flex items-center gap-0.5 mb-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${i <= 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                />
              ))}
              <span className="text-[10px] text-gray-500 ml-1">4/5</span>
            </div>

            {/* Review text */}
            <p className="text-[10px] text-gray-700 leading-relaxed">
              &quot;Tres bel hotel, personnel accueillant. Petit bemol sur le petit-dejeuner qui manquait de variete.&quot;
            </p>

            {/* Source */}
            <div className="flex items-center gap-1 mt-2 pt-2 border-t border-gray-200">
              <svg className="w-3 h-3" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              <span className="text-[10px] text-gray-400">Google</span>
            </div>
          </div>

          {/* Right: AI response */}
          <div className="bg-white border border-brand-primary/30 rounded-xl p-3 relative">
            {/* AI badge */}
            <div className="flex items-center gap-1 mb-2">
              <Sparkles className="w-3 h-3 text-brand-primary" />
              <span className="text-[10px] font-semibold text-brand-primary bg-brand-primary/10 px-2 py-0.5 rounded-full">
                Genere par IA
              </span>
            </div>

            {/* Response with highlighted sections */}
            <div className="space-y-1.5 text-[10px] leading-relaxed">
              <p className="text-gray-700">
                <span className="bg-blue-50 text-blue-700 px-0.5 rounded text-[9px] font-medium mr-1">Accueil</span>
                Chere Marie, merci pour votre avis !
              </p>
              <p className="text-gray-700">
                <span className="bg-green-50 text-green-700 px-0.5 rounded text-[9px] font-medium mr-1">Positif</span>
                Nous sommes ravis que vous ayez apprecie notre hotel et la qualite de notre accueil.
              </p>
              <p className="text-gray-700">
                <span className="bg-amber-50 text-amber-700 px-0.5 rounded text-[9px] font-medium mr-1">Reponse</span>
                Votre retour sur le petit-dejeuner est precieux. Nous enrichissons notre carte des ce mois.
              </p>
              <p className="text-gray-700">
                <span className="bg-purple-50 text-purple-700 px-0.5 rounded text-[9px] font-medium mr-1">Invitation</span>
                Au plaisir de vous accueillir a nouveau tres bientot !
              </p>
            </div>
          </div>
        </div>

        {/* Bottom actions */}
        <div className="flex items-center justify-end gap-2 mt-3">
          <button className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
            <Pencil className="w-3 h-3" />
            Modifier
          </button>
          <button className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-brand-primary text-white hover:bg-brand-primary/90 transition-colors font-medium">
            <Send className="w-3 h-3" />
            Publier
          </button>
        </div>
      </div>
    </BrowserMockup>
  );
}
