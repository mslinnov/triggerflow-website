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

/** CTA final : carte vert de marque à cheval entre la page et le footer encre, motif du logo, bande confiance. */
export function CtaBand({ title, text, primary, secondary }: CtaBandProps) {
  return (
    <section className="relative">
      {/* La carte est à cheval sur la page et le footer : moitié haute claire, moitié basse couleur encre. */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 top-1/2 bg-ink" />
      <Container className="relative">
        <div className="relative overflow-hidden rounded-3xl bg-accent bg-[radial-gradient(ellipse_at_top_left,rgba(204,226,225,0.22),transparent_60%)] px-6 py-16 text-center text-white shadow-[0_30px_80px_-30px_rgba(0,43,40,0.6)] md:px-12 md:py-20">
          <LogoMotif className="pointer-events-none absolute -right-20 top-1/2 h-[420px] w-[420px] -translate-y-1/2 text-white/[0.07]" />
          <div className="relative">
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
          </div>
        </div>
      </Container>
    </section>
  );
}

/** Les 3 formes du logo (déclencheur, flux, flèche), en motif graphique. */
export function LogoMotif({ className }: { className?: string }) {
  return <BrandMark className={className} />;
}
