'use client';

import { BrowserMockup } from './PhoneMockup';
import { Send, Star, Bell, ArrowDown, CheckCircle, TrendingUp } from 'lucide-react';

export function ReviewCollectMockup() {
  return (
    <BrowserMockup title="Collecte d'avis">
      <div className="p-4 min-h-[300px]">
        {/* Step 1: Survey sent */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
            <Send className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-gray-800">Enquete satisfaction envoyee</p>
            <p className="text-[10px] text-gray-500">Automatique apres le check-out</p>
          </div>
          <div className="bg-white rounded-lg px-2 py-1 border border-blue-200">
            <p className="text-[10px] text-gray-500">Score</p>
            <p className="text-sm font-bold text-gray-900">4,2/5</p>
          </div>
        </div>

        {/* Arrow connector */}
        <div className="flex justify-center py-1.5">
          <ArrowDown className="w-4 h-4 text-gray-400" />
        </div>

        {/* Branch split */}
        <div className="grid grid-cols-2 gap-3">
          {/* Positive path */}
          <div>
            <div className="flex items-center gap-1 mb-1.5 justify-center">
              <div className="h-px flex-1 bg-green-300" />
              <span className="text-[10px] font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full whitespace-nowrap">
                Score &ge; 4/5
              </span>
              <div className="h-px flex-1 bg-green-300" />
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                <span className="text-xs font-semibold text-gray-800">Demande d&apos;avis Google</span>
              </div>
              <div className="flex items-center gap-0.5 mb-1.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${i <= 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <p className="text-[10px] text-gray-500">Lien personnalise envoye par SMS</p>
              <div className="flex items-center gap-1 mt-2">
                <CheckCircle className="w-3 h-3 text-green-500" />
                <span className="text-[10px] font-medium text-green-600">Avis publie</span>
              </div>
            </div>
          </div>

          {/* Negative path */}
          <div>
            <div className="flex items-center gap-1 mb-1.5 justify-center">
              <div className="h-px flex-1 bg-amber-300" />
              <span className="text-[10px] font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full whitespace-nowrap">
                Score &lt; 3/5
              </span>
              <div className="h-px flex-1 bg-amber-300" />
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0">
                  <Bell className="w-3 h-3 text-white" />
                </div>
                <span className="text-xs font-semibold text-gray-800">Alerte Manager</span>
              </div>
              <div className="bg-white rounded-lg p-2 border border-amber-200 mb-2">
                <p className="text-[10px] text-gray-600">Client: Jean D.</p>
                <p className="text-[10px] text-gray-600">Score: 2/5</p>
                <p className="text-[10px] text-gray-500 italic">&quot;Probleme de climatisation...&quot;</p>
              </div>
              <span className="inline-flex items-center text-[10px] font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                Traitement prioritaire
              </span>
            </div>
          </div>
        </div>

        {/* Bottom stat */}
        <div className="mt-4 bg-brand-primary/5 border border-brand-primary/20 rounded-xl p-3 flex items-center gap-3">
          <TrendingUp className="w-5 h-5 text-brand-primary flex-shrink-0" />
          <div>
            <p className="text-xs font-semibold text-gray-800">90% des avis collectes sont positifs</p>
            <p className="text-[10px] text-gray-500">Grace au filtrage intelligent des demandes</p>
          </div>
        </div>
      </div>
    </BrowserMockup>
  );
}
