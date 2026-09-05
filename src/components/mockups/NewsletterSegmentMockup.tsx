'use client';

import { BrowserMockup } from './PhoneMockup';
import { Users, Heart, Briefcase, Baby } from 'lucide-react';

export function NewsletterSegmentMockup() {
  return (
    <BrowserMockup title="Segmentation" className="max-w-lg">
      <div className="p-4 min-h-[300px]">
        <h4 className="text-xs font-semibold text-gray-800 mb-3">Segments actifs</h4>

        <div className="space-y-2.5">
          <SegmentCard icon={Heart} name="Couples" count="1 247" color="pink" tags={['2 adultes', '0 enfant', 'Chambre double']} />
          <SegmentCard icon={Baby} name="Familles" count="892" color="blue" tags={['Enfants > 0', 'Suite ou familiale']} />
          <SegmentCard icon={Briefcase} name="Business" count="634" color="purple" tags={['Solo', 'Semaine', '> 2 séjours']} />
          <SegmentCard icon={Users} name="VIP / Fidèles" count="156" color="amber" tags={['> 3 séjours', '> 500€ total']} />
        </div>

        {/* Filter bar */}
        <div className="mt-4 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] text-gray-500">Filtrer :</span>
            <FilterChip label="Dernière visite < 6 mois" active />
            <FilterChip label="Langue = FR" />
            <FilterChip label="Opt-in newsletter" active />
          </div>
        </div>
      </div>
    </BrowserMockup>
  );
}

function SegmentCard({ icon: Icon, name, count, color, tags }: { icon: React.ComponentType<{ className?: string }>; name: string; count: string; color: string; tags: string[] }) {
  const colors: Record<string, { bg: string; icon: string; text: string }> = {
    pink: { bg: 'bg-pink-50', icon: 'text-pink-500', text: 'text-pink-700' },
    blue: { bg: 'bg-blue-50', icon: 'text-blue-500', text: 'text-blue-700' },
    purple: { bg: 'bg-purple-50', icon: 'text-purple-500', text: 'text-purple-700' },
    amber: { bg: 'bg-amber-50', icon: 'text-amber-500', text: 'text-amber-700' },
  };
  const c = colors[color];
  return (
    <div className={`flex items-center gap-3 p-3 ${c.bg} rounded-xl`}>
      <div className={`w-9 h-9 rounded-lg bg-white flex items-center justify-center flex-shrink-0`}>
        <Icon className={`w-4.5 h-4.5 ${c.icon}`} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-800">{name}</span>
          <span className={`text-[9px] font-medium ${c.text}`}>{count} contacts</span>
        </div>
        <div className="flex gap-1 mt-1">
          {tags.map((t) => (
            <span key={t} className="text-[8px] bg-white/70 text-gray-600 px-1.5 py-0.5 rounded">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function FilterChip({ label, active }: { label: string; active?: boolean }) {
  return (
    <span className={`text-[9px] px-2 py-1 rounded-full cursor-pointer ${active ? 'bg-brand-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
      {label}
    </span>
  );
}
