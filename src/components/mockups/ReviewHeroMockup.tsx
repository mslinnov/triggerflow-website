'use client';

import { Star, TrendingUp, MessageSquare, ArrowUpRight, ThumbsUp, ThumbsDown, Sparkles } from 'lucide-react';

export function ReviewHeroMockup() {
  return (
    <div className="h-full w-full bg-[#f8fafb] p-4">
      {/* Top stats row */}
      <div className="mb-3 grid grid-cols-3 gap-2.5">
        <div className="rounded-xl border border-gray-200 bg-white p-2.5">
          <p className="text-[9px] text-gray-500">Note moyenne</p>
          <div className="mt-0.5 flex items-baseline gap-1.5">
            <span className="text-lg font-bold text-gray-800">4.6</span>
            <span className="text-[10px] text-gray-400">/5</span>
          </div>
          <div className="mt-0.5 flex gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className={`h-2.5 w-2.5 ${s <= 4 ? 'fill-amber-400 text-amber-400' : 'fill-amber-400/40 text-amber-400/40'}`}
              />
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-green-100 bg-green-50 p-2.5">
          <p className="text-[9px] text-gray-500">Avis collectés</p>
          <div className="mt-0.5 flex items-baseline gap-1.5">
            <span className="text-lg font-bold text-gray-800">+47%</span>
          </div>
          <div className="mt-0.5 flex items-center gap-0.5">
            <TrendingUp className="h-2.5 w-2.5 text-green-500" />
            <span className="text-[9px] text-green-600">vs trimestre précédent</span>
          </div>
        </div>
        <div className="rounded-xl border border-purple-100 bg-purple-50 p-2.5">
          <p className="text-[9px] text-gray-500">Réponse IA</p>
          <div className="mt-0.5 flex items-baseline gap-1.5">
            <span className="text-lg font-bold text-gray-800">2 min</span>
          </div>
          <div className="mt-0.5 flex items-center gap-0.5">
            <Sparkles className="h-2.5 w-2.5 text-purple-500" />
            <span className="text-[9px] text-purple-600">délai moyen</span>
          </div>
        </div>
      </div>

      {/* Recent reviews list */}
      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="flex items-center justify-between border-b border-gray-100 px-3 py-2">
          <h4 className="text-[10px] font-semibold text-gray-800">Derniers avis</h4>
          <div className="flex gap-1">
            <PlatformBadge name="Google" color="bg-blue-50 text-blue-600" />
            <PlatformBadge name="TripAdvisor" color="bg-green-50 text-green-600" />
            <PlatformBadge name="Booking" color="bg-indigo-50 text-indigo-600" />
          </div>
        </div>
        <div className="divide-y divide-gray-50">
          <ReviewRow
            name="Marie L."
            platform="Google"
            rating={5}
            snippet="Séjour parfait, personnel aux petits soins..."
            status="responded"
            timeAgo="Il y a 2h"
          />
          <ReviewRow
            name="James W."
            platform="Booking"
            rating={4}
            snippet="Très bien dans l'ensemble, petit bémol sur..."
            status="ai-ready"
            timeAgo="Il y a 5h"
          />
          <ReviewRow
            name="Sophie D."
            platform="Google"
            rating={5}
            snippet="Nous reviendrons sans hésiter. La vue..."
            status="responded"
            timeAgo="Hier"
          />
          <ReviewRow
            name="Pierre M."
            platform="TripAdvisor"
            rating={3}
            snippet="Chambre correcte mais la climatisation..."
            status="intercepted"
            timeAgo="Hier"
          />
        </div>
      </div>
    </div>
  );
}

function PlatformBadge({ name, color }: { name: string; color: string }) {
  return (
    <span className={`rounded px-1.5 py-0.5 text-[8px] font-medium ${color}`}>{name}</span>
  );
}

function ReviewRow({ name, platform, rating, snippet, status, timeAgo }: {
  name: string;
  platform: string;
  rating: number;
  snippet: string;
  status: 'responded' | 'ai-ready' | 'intercepted';
  timeAgo: string;
}) {
  const statusConfig = {
    responded: { label: 'Répondu', color: 'text-green-600 bg-green-50' },
    'ai-ready': { label: 'Réponse IA prête', color: 'text-purple-600 bg-purple-50' },
    intercepted: { label: 'Intercepté', color: 'text-amber-600 bg-amber-50' },
  };
  const s = statusConfig[status];

  return (
    <div className="flex items-center gap-2.5 px-3 py-2">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <p className="text-[10px] font-semibold text-gray-800">{name}</p>
          <span className="text-[8px] text-gray-400">{platform}</span>
          <div className="flex gap-px">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className={`h-2 w-2 ${s <= rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`}
              />
            ))}
          </div>
        </div>
        <p className="mt-0.5 truncate text-[9px] text-gray-500">{snippet}</p>
      </div>
      <div className="shrink-0 text-right">
        <div className={`rounded-full px-1.5 py-0.5 ${s.color}`}>
          <span className="text-[8px] font-semibold">{s.label}</span>
        </div>
        <p className="mt-0.5 text-[8px] text-gray-400">{timeAgo}</p>
      </div>
    </div>
  );
}
