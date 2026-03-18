'use client';

import Image from 'next/image';

export function HubHeroMockup() {
  return (
    <div className="relative w-full h-full min-h-[400px] overflow-visible">
      <Image
        src="/images/produit/hub-messagerie/hero-hub-desktop.webp"
        alt="Hub messagerie unifiée TriggerFlow"
        width={1400}
        height={875}
        className="w-[115%] max-w-none h-auto object-contain origin-top-left"
        priority
      />
    </div>
  );
}
