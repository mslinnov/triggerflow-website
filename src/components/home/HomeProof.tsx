import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { Container, LogoWall } from '@/components/ds';
import { clientLogos, homeClients } from '@/data/clients';
import { prestigeHotels } from '@/data/client-results';

export function HomeProof() {
  const t = useTranslations('home2.proof');
  return (
    <section className="border-y border-line bg-white py-12 md:py-16" aria-labelledby="proof-title">
      <Container>
        <p id="proof-title" className="text-center font-mono text-eyebrow font-medium uppercase text-ink-3">
          {t('title')}
        </p>
        {/* Quelques-uns de nos établissements, en photo */}
        <ul className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-5">
          {prestigeHotels.map((h, i) => (
            <li key={h.name} className={i === 4 ? 'col-span-2 md:col-span-1' : undefined}>
              <figure className="group relative overflow-hidden rounded-xl">
                <Image
                  src={h.photo}
                  alt={h.name}
                  width={1200}
                  height={900}
                  sizes="(min-width: 768px) 20vw, 50vw"
                  className={cn('h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]', i === 4 ? 'aspect-[16/9] md:aspect-[4/5]' : 'aspect-[4/5]')}
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 pb-3.5 pt-10 text-white">
                  <span className="block text-[14px] font-semibold leading-tight">{h.name}</span>
                  <span className="mt-0.5 block font-mono text-[10.5px] uppercase tracking-[0.06em] text-white/80">{h.place}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
        <LogoWall names={homeClients} logos={clientLogos} className="mt-8" />
        <p className="mt-6 text-center text-[14px] text-ink-3">
          {t('pms')}
        </p>
      </Container>
    </section>
  );
}
