import { Container } from './Container';
import { DsButton } from './Button';
import { TrustStrip } from './TrustStrip';

interface CtaBandProps {
  title: string;
  text?: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
}

/** CTA final : section sombre, motif du logo en filigrane, bande confiance. */
export function CtaBand({ title, text, primary, secondary }: CtaBandProps) {
  return (
    <section className="relative overflow-hidden bg-ink py-24 text-white md:py-32">
      <LogoMotif className="pointer-events-none absolute -right-24 top-1/2 h-[520px] w-[520px] -translate-y-1/2 text-white/[0.04]" />
      <Container className="relative text-center">
        <h2 className="mx-auto max-w-3xl text-balance text-[2rem] font-medium leading-[1.1] tracking-[-0.02em] md:text-h1">{title}</h2>
        {text && <p className="mx-auto mt-5 max-w-xl text-lg text-white/70">{text}</p>}
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
  return (
    <svg viewBox="0 0 120 120" fill="currentColor" aria-hidden className={className}>
      <path d="M48 8c10 6 16 17 16 29H52c0-8-4-15-10-19l6-10Z" />
      <path d="M48 112c10-6 16-17 16-29H52c0 8-4 15-10 19l6 10Z" />
      <rect x="8" y="54" width="56" height="12" rx="2" />
      <path d="M70 36c13 0 24 11 24 24S83 84 70 84V36Z" />
    </svg>
  );
}
