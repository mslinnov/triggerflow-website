import { BrandMark } from './BrandMark';
import { Container } from './Container';
import { DsButton } from './Button';
import { TrustStrip } from './TrustStrip';

interface CtaBandProps {
  title: string;
  text?: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
}

/** CTA final : vert de marque (distinct du footer encre), motif du logo en filigrane, bande confiance. */
export function CtaBand({ title, text, primary, secondary }: CtaBandProps) {
  return (
    <section className="relative overflow-hidden bg-accent bg-[radial-gradient(ellipse_at_top_left,rgba(204,226,225,0.18),transparent_60%)] py-24 text-white md:py-32">
      <LogoMotif className="pointer-events-none absolute -right-24 top-1/2 h-[520px] w-[520px] -translate-y-1/2 text-white/[0.07]" />
      <Container className="relative text-center">
        <h2 className="mx-auto max-w-3xl text-balance text-[2rem] font-medium leading-[1.1] tracking-[-0.02em] md:text-h1">{title}</h2>
        {text && <p className="mx-auto mt-5 max-w-xl text-lg text-white/85">{text}</p>}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <DsButton href={primary.href} variant="primaryOnDark" arrow>
            {primary.label}
          </DsButton>
          {secondary && (
            <DsButton href={secondary.href} variant="secondaryOnDark">
              {secondary.label}
            </DsButton>
          )}
        </div>
        <TrustStrip onDark className="mt-10" />
      </Container>
    </section>
  );
}

/** Les 3 formes du logo (déclencheur, flux, flèche), en motif graphique. */
export function LogoMotif({ className }: { className?: string }) {
  return <BrandMark className={className} />;
}
