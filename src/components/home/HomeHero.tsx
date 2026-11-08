import { useTranslations } from 'next-intl';
import { Container, DsButton, Eyebrow, ProductFrame, TrustStrip } from '@/components/ds';
import { HeroScenario } from '@/components/visuals';
import { HeroFloatingCards } from './HeroFloatingCards';
import { brand } from '@/data/brand';

export function HomeHero() {
  const t = useTranslations('home2.hero');
  const nav = useTranslations('nav');
  return (
    <section className="relative overflow-hidden bg-white pb-16 pt-14 md:pb-24 md:pt-20">
      {/* Lignes de grille fines (charte) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#E4E8E7_1px,transparent_1px)] bg-[size:calc(100%/12)_100%] opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
      <Container className="relative">
        <div className="mx-auto max-w-4xl text-center">
          <Eyebrow>{t('eyebrow')}</Eyebrow>
          <h1 className="mt-5 text-balance text-[2.5rem] font-medium leading-[1.05] tracking-[-0.025em] text-ink md:text-display">
            {t('title')} <span className="text-ink-3">{t('titleMuted')}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-2 md:text-lead">{t('subtitle')}</p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <DsButton href={brand.demoPage} arrow className="w-full sm:w-auto">
              {nav('startFree')}
            </DsButton>
            <DsButton href="#produit" variant="secondary" className="w-full sm:w-auto">
              {nav('seeProduct')}
            </DsButton>
          </div>
          <TrustStrip className="mt-7" />
        </div>
        <div className="relative mx-auto mt-14 max-w-[1080px] md:mt-16">
          <ProductFrame>
            <HeroScenario />
          </ProductFrame>
          <HeroFloatingCards />
        </div>
      </Container>
    </section>
  );
}
