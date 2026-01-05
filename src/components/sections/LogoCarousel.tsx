'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Container } from '@/components/ui';

const logos = [
  { name: 'Accor', src: '/images/logo-accor.webp' },
  { name: 'Sofitel', src: '/images/logo-sofitel.webp' },
  { name: 'Ibis', src: '/images/logo-ibis.webp' },
  { name: 'Best Western', src: '/images/logo-bestwestern.webp' },
  { name: 'Les Hôtels Très Particuliers', src: '/images/logo-hotels.webp' },
  { name: 'Saint James', src: '/images/logo-saintjames.webp' },
];

export function LogoCarousel() {
  const t = useTranslations('logoCarousel');

  return (
    <section className="bg-white py-12 md:py-16">
      <Container>
        <p className="mb-8 text-center text-sm font-medium uppercase tracking-wider text-zinc-500">
          {t('title')}
        </p>
      </Container>

      {/* Infinite scroll container */}
      <div className="relative overflow-hidden">
        <div className="flex animate-scroll">
          {/* First set of logos (duplicated for infinite scroll) */}
          {[...logos, ...logos].map((logo, index) => (
            <div
              key={`${logo.name}-${index}`}
              className="flex min-w-[200px] items-center justify-center px-8"
            >
              <Image
                src={logo.src}
                alt={`Logo ${logo.name}`}
                width={120}
                height={40}
                style={{ width: 'auto', height: '32px' }}
                className="object-contain opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
