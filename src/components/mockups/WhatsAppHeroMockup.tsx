'use client';

import Image from 'next/image';

export function WhatsAppHeroMockup() {
  return (
    <div className="relative w-full h-full min-h-[400px] overflow-visible">
      <Image
        src="/images/produit/whatsapp/hero-whatsapp-desktop.webp"
        alt="Dashboard WhatsApp Business TriggerFlow"
        width={1400}
        height={875}
        className="w-[115%] max-w-none h-auto object-contain origin-top-left"
        priority
      />
    </div>
  );
}
