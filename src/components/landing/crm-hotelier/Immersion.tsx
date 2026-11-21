'use client';

/*
 * Le récit de la page : l'ouverture (le titre s'écarte sur la carte de Camille, on plonge dedans, les fiches
 * deviennent des points), puis une seule nuée couvre la scène. La caméra la pose à côté de chaque texte, entre dans
 * l'enveloppe pour lire le message de Camille, et un objet 3D accompagne chaque étape. La version fixe (animations
 * réduites, écran trop court) pose les mêmes textes sur le papier, avec une forme dessinée par étape.
 */

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type RefObject } from 'react';
import { useMotionValue, useMotionValueEvent, useScroll, type MotionValue } from 'framer-motion';
import { dotRadius } from '@/lib/how-it-works/intro';
import { clamp, easeInOut, lerp } from '@/lib/how-it-works/math';
import type { JourneyTime } from '@/lib/how-it-works/timeline';
import { cn } from '@/lib/utils';
import { ButtonLink } from '@/components/ui';
import { lpLinkProps } from '@/components/landing/shared/lp-links';
import { useSide } from '@/components/how-it-works/useSide';
import { useStaticMode } from '@/components/how-it-works/useStaticMode';
import { RAPPEL, demoHref, type Placement } from './liens';
import { CARD, HEADER, at, timeOf, useWide, type Keys } from './moteur';
import { Logos, type Logo } from './Logos';
import { Titre, titreEntier, type LignesTitre } from './Titre';
import { poserStyle, useOuvertureImperative } from './defilement';
import { CENTRES, FICHE, OFFRE, RECUL, type Forme } from './formes';
import { PAPIER, jourDe, poserJour, retirerJour, suivreOuvertureFixe, varsJour } from './jour';
import { DEPART, ENTRY, histoire, presence, segment, type Bloc, type Chiffres, type Histoire, type NomForme, type Place, type TextesRecit } from './histoire';
import type { Cadre, Trou } from './Nuee';
import type { EtatScene } from './Scene3D';
import type { NomObjet } from './objets3d';

const Nuee = dynamic(() => import('./Nuee'), { ssr: false });
const Fiches = dynamic(() => import('./Fiches'), { ssr: false });
const Figee = dynamic(() => import('./Figee'), { ssr: false });
const Scene3D = dynamic(() => import('./Scene3D'), { ssr: false });

/** Les textes du héros (lpCrmHotelier.hero). */
export interface TextesHero extends LignesTitre {
  sub: string;
  demo: string;
  callback: string;
}

export interface TextesImmersion {
  hero: TextesHero;
  story: TextesRecit;
}

interface Props {
  textes: TextesImmersion;
  chiffres: Chiffres;
  logos: readonly Logo[];
}

/** L'horloge du champ de fiches : la carte de Camille pendant l'ouverture, puis le dézoom jusqu'aux points. */
const FICHES: Keys = [
  [0, CARD],
  [ENTRY, CARD],
  [DEPART, 0],
  [DEPART + 20, 1],
];
const BOITE = { x0: -1.1, y0: -1.1, x1: 1.1, y1: 1.1 };
/** Part de la hauteur d'écran que le rideau clair remonte sur la scène encore épinglée. */
const QUEUE = 0.72;

/** La nuit de l'ouverture, seul moment sombre du récit. */
const NUIT = { couleur: '#002B28', image: 'radial-gradient(88% 72% at 50% 46%, #0B4640 0%, #002B28 56%, #00201E 100%)' };

/** Les formes de la nuée que chaque objet 3D accompagne. */
const FORMES_3D: Record<NomObjet, readonly NomForme[]> = { planning: ['planning'], enveloppe: ['enveloppe'], offres: ['offres', 'choix'], carte: ['carte'], etoiles: ['coeur'], ruban: ['boucle'] };
const TOUS_3D = Object.keys(FORMES_3D) as NomObjet[];
const BOITES = new WeakMap<object, Record<NomObjet, Forme['boite']>>();
/** La boîte de la forme principale de chaque objet (le même objet d'une image à l'autre). */
function boitesDe(formes: Record<NomForme, Forme>): Record<NomObjet, Forme['boite']> {
  let b = BOITES.get(formes);
  if (!b) {
    b = Object.fromEntries(TOUS_3D.map((n) => [n, formes[FORMES_3D[n][0]].boite])) as Record<NomObjet, Forme['boite']>;
    BOITES.set(formes, b);
  }
  return b;
}

// Couleurs du « jour » (jour.ts) : la nuit en repli, quand rien n'a posé les variables.
const CLAIR = 'text-[color:var(--t1,#EEF6F4)]';
const CORPS = 'text-[color:var(--t2,rgb(204_226_225/0.8))]';
const CONDENSE = 'font-[family-name:var(--font-plex-condensed)]';
/** Halo de la couleur du fond derrière un texte qui traverse la nuée. */
const VOILE = '[text-shadow:0_0_18px_var(--fd,#002B28),0_0_8px_var(--fd,#002B28),0_0_3px_var(--fd,#002B28)] [&_a]:[text-shadow:none]';

/** Dernier mot jamais seul sur sa ligne. */
const lie = (text: string) => text.replace(/ (\S+)$/, ' $1');
const hautPanneau = (stageH: number) => clamp(0.4 * stageH, 200, 330);

function Actions({ hero, placement, center }: { hero: TextesHero; placement: Placement; center?: boolean }) {
  const demo = demoHref(placement);
  return (
    <div className={cn('mt-7 flex flex-col items-center gap-4 sm:flex-row sm:gap-7 lg:mt-9', center && 'justify-center')}>
      <ButtonLink href={demo} variant="accent" size="lg" className="whitespace-nowrap" {...lpLinkProps(demo)}>
        {hero.demo}
      </ButtonLink>
      <a href={`#${RAPPEL}`} className="whitespace-nowrap text-[17px] font-medium text-[#EEF6F4] underline decoration-white/30 underline-offset-[6px] transition-colors hover:decoration-white">
        {hero.callback}
      </a>
    </div>
  );
}

/** Les montants en pêche et en condensé : la couleur de l'argent. */
function Montants({ text }: { text: string }) {
  const parts = text.split(/(\d+\s€)/);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 ? (
          <span key={i} className={cn(CONDENSE, 'whitespace-nowrap text-[1.12em] font-medium text-[color:var(--pe,#FFCFA2)]')}>
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}

/** Le titre en deux temps : ce qui suit la première virgule ou le premier point passe en menthe, même police. */
function DeuxTemps({ title }: { title: string }) {
  const m = /^(.+?[,.])\s(.+)$/.exec(title);
  if (!m) return <>{title}</>;
  return (
    <>
      {m[1]} <span className="text-[color:var(--t3,#86C5B9)]">{m[2]}</span>
    </>
  );
}

const LEGENDE = cn(CORPS, 'text-balance text-[14.5px] leading-[1.4] lg:text-[15px]');

/** Une composition par étape : PMS et ventes posent le chiffre sous le texte, l'avis est une phrase forte, le retour ouvre sur son chiffre. */
function Texte({ bloc, wide, hero }: { bloc: Bloc; wide: boolean; hero: TextesHero }) {
  const cross = bloc.kind !== 'calm';
  const enTete = bloc.id === 'retour' ? bloc.chiffre : undefined;
  const taille =
    bloc.kind === 'cta'
      ? 'text-[length:28px] leading-[1.08] lg:text-[length:44px] lg:leading-[1.05]'
      : cross
        ? 'text-[length:31px] leading-[1.04] lg:text-[length:58px] lg:leading-[1.02]'
        : bloc.id === 'avis'
          ? 'text-[length:30px] leading-[1.08] lg:text-[length:clamp(40px,3.5vw,56px)] lg:leading-[1.04]'
          : 'text-[length:26px] leading-[1.1] lg:text-[length:clamp(32px,2.6vw,42px)] lg:leading-[1.08]';
  return (
    <>
      {enTete && (
        <div className="mb-5 lg:mb-8">
          <p className={cn(CLAIR, CONDENSE, 'text-[76px] font-light leading-[0.88] tracking-[-0.02em] lg:text-[164px]')}>{enTete[0]}</p>
          <p className={cn(LEGENDE, 'mt-2 max-w-[34ch] lg:mt-3')}>{lie(enTete[1])}</p>
        </div>
      )}
      <h2 className={cn(CLAIR, 'text-balance font-medium tracking-[-0.03em]', taille)}>
        <DeuxTemps title={bloc.title} />
      </h2>
      <p className={cn(CORPS, 'mt-4 text-pretty text-[16px] leading-[1.45] lg:mt-5', cross ? 'mx-auto max-w-[30ch] lg:text-[19px]' : 'max-w-[44ch] lg:text-[19px]')}>
        <Montants text={lie(wide ? bloc.text : (bloc.bref ?? bloc.text))} />
      </p>
      {bloc.chiffre && !enTete && (
        <p className="mt-6 flex items-end gap-4 lg:mt-9 lg:gap-6">
          <span
            className={cn(
              CLAIR,
              'shrink-0 whitespace-nowrap leading-[0.86]',
              CONDENSE,
              'text-[56px] font-light tracking-[-0.015em] lg:text-[112px]',
            )}
          >
            {bloc.chiffre[0]}
          </span>
          <span className={cn(LEGENDE, 'max-w-[28ch] pb-1 lg:max-w-[30ch] lg:pb-2')}>{lie(bloc.chiffre[1])}</span>
        </p>
      )}
      {bloc.kind === 'cta' && <Actions hero={hero} placement="milieu" center />}
    </>
  );
}

/**
 * Le message que Camille reçoit avant son arrivée : la caméra vient le lire (H). La forme reprend les gabarits
 * d'e-mail de TriggerFlow (src/data/calendrier-mjml/) : fond gris, corps blanc, nom de l'hôtel centré sur un filet,
 * texte centré, bouton pilule en capitales. Au-dessus, la ligne de la boîte de réception.
 */
function Message({ m }: { m: TextesRecit['message'] }) {
  return (
    <div className="w-[min(88vw,392px)] overflow-hidden rounded-[16px] bg-[#F4F4F4] text-left text-[#2B2B2B] shadow-[0_30px_70px_-30px_rgba(0,14,12,0.9)]">
      <div className="border-b border-[#E2E2E2] bg-white px-5 py-3.5">
        <p className="flex items-baseline justify-between gap-3 text-[13px] text-ink-3">
          <span className="font-medium text-ink">{m.from}</span>
          <span className={cn(CONDENSE, 'whitespace-nowrap text-[14px] tracking-[0.01em]')}>
            {m.when}, {m.time}
          </span>
        </p>
        <p className="mt-1 text-[15.5px] font-medium leading-[1.3] text-ink">{m.subject}</p>
      </div>
      <div className="m-3 rounded-[4px] bg-white px-6 pb-6 pt-5 text-center lg:px-8">
        <p className="text-[19px] tracking-[0.01em]">{m.from}</p>
        <div aria-hidden className="mx-14 mt-3 h-px bg-[#E2E2E2]" />
        <p className="mt-5 text-pretty text-[15px] leading-[1.55]">{m.body}</p>
        <p className="mt-5 flex items-center justify-between gap-3 rounded-[12px] bg-[#EEF5F3] px-4 py-3 text-left text-[15px] font-medium">
          {m.offer}
          <span className={cn(CONDENSE, 'whitespace-nowrap rounded-full bg-peach px-2.5 py-0.5 text-[16.5px]')}>{m.price}</span>
        </p>
        <p className="mx-auto mt-5 w-fit rounded-full bg-[#2B2B2B] px-6 py-3 text-[12px] font-bold uppercase tracking-[0.08em] text-white">{m.button}</p>
      </div>
    </div>
  );
}

/** Sur téléphone, la capture a un écran à elle (décision du 21/11) : la fiche entière reste dans le cadre, ici le détail lisible. */
function FicheTelephone({ capture }: { capture: TextesRecit['captureMobile'] }) {
  return (
    <figure>
      <Image
        src="/images/lp/crm-hotelier/fiche-client-fil-m.webp"
        alt={capture.alt}
        width={474}
        height={160}
        sizes="92vw"
        className="h-auto w-full rounded-[16px]"
      />
      <figcaption className={cn(LEGENDE, 'mt-3')}>{capture.caption}</figcaption>
    </figure>
  );
}

/** Style de départ des barres du rail (constant : un rendu ne réécrit pas ce que `poserRef` a posé). */
const DEPLIE_0 = { transform: 'scaleX(0)' };

/** Le rail : où on en est dans le séjour, et un saut direct vers une étape. `poserRef` reçoit chaque position, sans rendu. */
function Rail({ recit, label, poserRef, aller, wide }: { recit: Histoire; label: string; poserRef: RefObject<((s: number) => void) | null>; aller: (s: number) => void; wide: boolean }) {
  const cta = recit.blocs[recit.blocs.length - 1].at;
  const debut = recit.rail[0].de;
  const racine = useRef<HTMLDivElement>(null);
  const barres = useRef<(HTMLSpanElement | null)[]>([]);
  const fait = useRef<HTMLDivElement>(null);
  // L'étape active ne change qu'aux frontières : seul ce passage fait un rendu (aria-current et couleur).
  const [actif, setActif] = useState(0);
  useLayoutEffect(() => {
    poserRef.current = (s: number) => {
      const montre = clamp((s - DEPART + 0.1) / 0.2) * (1 - clamp((s - cta + 0.5) / 0.2));
      poserStyle(racine.current, 'opacity', String(montre));
      if (wide) poserStyle(racine.current, 'visibility', montre > 0.02 ? 'visible' : 'hidden');
      let a = 0;
      recit.rail.forEach((step, i) => {
        if (s >= step.de) a = i;
        const suivant = recit.rail[i + 1]?.de ?? cta - 0.4;
        poserStyle(barres.current[i], 'transform', `scaleX(${clamp((s - step.de) / Math.max(1e-6, suivant - step.de))})`);
      });
      poserStyle(fait.current, 'transform', `scaleX(${clamp((s - debut) / Math.max(1e-6, cta - 0.4 - debut))})`);
      setActif(a);
    };
    return () => {
      poserRef.current = null;
    };
  }, [poserRef, recit, cta, debut, wide]);
  if (!wide) {
    return (
      <div ref={racine} aria-hidden className="absolute inset-x-4 top-2 z-30 flex gap-1 opacity-0">
        {recit.rail.map((step, i) => (
          <span key={step.label} className="h-[2px] flex-1 overflow-hidden rounded-full bg-[color:var(--tr,rgb(255_255_255/0.12))]">
            <span
              ref={(el) => {
                barres.current[i] = el;
              }}
              className="block h-full origin-left bg-[color:var(--t2,rgb(204_226_225/0.8))]"
              style={DEPLIE_0}
            />
          </span>
        ))}
      </div>
    );
  }
  return (
    <div ref={racine} className="invisible absolute inset-0 opacity-0">
      {/* Un voile au pied de la scène : les textes qui défilent sortent de dessous, sans croiser le rail. */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[color:var(--fd,#00211F)] via-[color:var(--fd,#00211F)] via-45% to-transparent opacity-95" />
      <nav aria-label={label} className="pointer-events-auto absolute inset-x-0 bottom-4 mx-auto w-[min(620px,70vw)]">
        <div aria-hidden className="h-px bg-[color:var(--tr,rgb(255_255_255/0.14))]">
          <div ref={fait} className="h-px origin-left bg-[color:var(--t2,rgb(204_226_225/0.7))]" style={DEPLIE_0} />
        </div>
        <ol className="mt-1 flex justify-between">
          {recit.rail.map((step, i) => (
            <li key={step.label}>
              <button
                type="button"
                aria-current={i === actif ? 'step' : undefined}
                onClick={() => aller(step.s)}
                className={cn(
                  'cursor-pointer rounded-full px-2 py-2 text-[13px] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#CCE2E1]',
                  i === actif ? CLAIR : 'text-[color:var(--t4,rgb(204_226_225/0.5))] hover:text-[color:var(--t2,rgb(204_226_225/0.9))]',
                )}
              >
                {step.label}
              </button>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}

/**
 * Défilement de la section épinglée : `s` en écrans défilés, l'horloge des fiches, et le passage au clair.
 * `s` vit dans une ref et `ecrire` pose les styles à chaque défilement : React ne se rend qu'au changement de taille.
 */
function useRecit(section: RefObject<HTMLElement | null>, stage: RefObject<HTMLElement | null>, ecrans: number, queue: number, ecrire: RefObject<((s: number) => void) | null>) {
  const { scrollY } = useScroll();
  const [etat, setEtat] = useState({ unit: 0, stageH: 0, stageW: 0 });
  const recit = useRef(0);
  const time: MotionValue<JourneyTime> = useMotionValue(timeOf(CARD));
  const update = () => {
    const el = section.current;
    const st = stage.current;
    if (!el || !st) return;
    const reste = queue * (st.offsetHeight + HEADER);
    const unit = (el.offsetHeight - st.offsetHeight - reste) / ecrans;
    const s = clamp((HEADER - el.getBoundingClientRect().top) / Math.max(1, unit), 0, ecrans);
    recit.current = s;
    time.set(timeOf(at(FICHES, s)));
    setEtat((prev) => (prev.unit === unit && prev.stageW === st.offsetWidth && prev.stageH === st.offsetHeight ? prev : { unit, stageH: st.offsetHeight, stageW: st.offsetWidth }));
    ecrire.current?.(s);
  };
  useMotionValueEvent(scrollY, 'change', update);
  useEffect(() => {
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ecrans, queue]);
  return { ...etat, recit, time };
}

/**
 * three et gsap (le morceau de Scene3D) arrivent en temps mort après le premier affichage, jamais avec le premier
 * écran : le titre du héros reste le plus grand élément affiché, et le premier objet 3D n'apparaît qu'après deux écrans.
 */
function useScene3DPrete(): boolean {
  const [prete, setPrete] = useState(false);
  useEffect(() => {
    let vivant = true;
    const charger = () => {
      void import('./Scene3D').then(() => {
        if (vivant) setPrete(true);
      });
    };
    const id = typeof window.requestIdleCallback === 'function' ? window.requestIdleCallback(charger, { timeout: 3000 }) : window.setTimeout(charger, 1200);
    return () => {
      vivant = false;
      if (typeof window.cancelIdleCallback === 'function') window.cancelIdleCallback(id);
      else window.clearTimeout(id);
    };
  }, []);
  return prete;
}

function Animee({ textes, chiffres, logos }: Props) {
  const { hero, story } = textes;
  const wide = useWide();
  const recit = useMemo(() => histoire(story, chiffres, wide, true), [story, chiffres, wide]);
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const holder = useRef<HTMLDivElement>(null);
  const bloc = useRef<HTMLDivElement>(null);
  const gap = useRef<HTMLSpanElement>(null);
  const capture = useRef<HTMLElement>(null);
  const message = useRef<HTMLDivElement>(null);
  const etiquettes = useRef<(HTMLParagraphElement | null)[]>([]);
  const lu = useRef(false);
  const contourne = useRef<(HTMLDivElement | null)[]>([]);
  const trous = useRef<(() => Trou[]) | null>(null);
  const queue = QUEUE;
  const ecrire = useRef<((s: number) => void) | null>(null);
  const { unit, stageH, stageW, recit: instant, time } = useRecit(section, stage, recit.ecrans, queue, ecrire);
  const [visual, side] = useSide();
  const ouverture = useOuvertureImperative(side, { stage, holder, visual, bloc, gap });
  const calqueNuee = useRef<HTMLDivElement>(null);
  const nuit = useRef<HTMLDivElement>(null);
  const iris = useRef<HTMLDivElement>(null);
  const calmes = useRef<(HTMLDivElement | null)[]>([]);
  const epingles = useRef<Record<string, HTMLDivElement | null>>({});
  const rail = useRef<((s: number) => void) | null>(null);
  const etat3d = useRef<EtatScene>({});
  const reveil3d = useRef<(() => void) | null>(null);
  const scene3d = useScene3DPrete();

  const [formes, setFormes] = useState<Record<NomForme, Forme> | null>(null);
  useEffect(() => {
    let vivant = true;
    void import('./formes').then((m) => {
      if (vivant) setFormes(m.formesDe(true));
    });
    return () => {
      vivant = false;
    };
  }, []);

  /** Où la caméra pose la nuée : jamais sur la colonne du texte, avec une marge nette. */
  const cadreDe = useCallback(
    (place: Place, nom: NomForme): Cadre => {
      const u0 = 0.36 * side;
      const base: Cadre = { cx: stageW / 2, cy: wide ? stageH / 2 : 2 + side / 2, u: u0, zoom: 1 };
      if (place === 'ouverture' || !stageW || !stageH) return base;
      if (place === 'lecture') {
        const u = (Math.max(stageW, stageH) * 1.18) / 2.6;
        return { cx: stageW / 2, cy: stageH / 2, u, zoom: u / u0 };
      }
      const b = formes?.[nom].boite ?? BOITE;
      const bw = b.x1 - b.x0 + 0.1;
      const bh = b.y1 - b.y0 + 0.1;
      const dans = (x0: number, y0: number, x1: number, y1: number, max = u0): Cadre => {
        const u = Math.min((x1 - x0) / bw, (y1 - y0) / bh, max);
        return { cx: (x0 + x1) / 2 - ((b.x0 + b.x1) / 2) * u, cy: (y0 + y1) / 2 - ((b.y0 + b.y1) / 2) * u, u, zoom: 1 };
      };
      if (wide) {
        const marge = Math.max(0.05 * stageW, stageW / 2 - 620);
        const col = Math.min(0.42 * stageW, 620);
        const gout = Math.max(56, 0.045 * stageW);
        const bord = Math.max(40, marge * 0.6);
        const haut = 40;
        // Le rail tient le pied de l'écran.
        const bas = stageH - 92;
        if (place === 'droite') return dans(marge + col + gout, haut, stageW - bord, bas);
        if (place === 'gauche') return dans(bord, haut, stageW - marge - col - gout, bas);
        if (place === 'bas') return { cx: stageW / 2, cy: Math.min(stageH - 64, stageH * 0.44 + 236), u: Math.min(stageW * 0.78, 1120) / 2.6, zoom: 1 };
        const demi = Math.min(440, stageW * 0.34);
        const centre = dans(stageW / 2 - demi, haut + 16, stageW / 2 + demi, bas - 8);
        return place === 'fond' ? { ...centre, u: centre.u * 0.9 } : centre;
      }
      if (place === 'bas') return { cx: stageW / 2, cy: Math.min(stageH - 44, stageH * 0.42 + 200), u: (stageW * 1.1) / 2.6, zoom: 1 };
      if (place === 'centre') return dans(10, stageH * 0.1, stageW - 10, stageH * 0.9, u0 * 1.6);
      return dans(18, 16, stageW - 18, hautPanneau(stageH), u0 * 1.3);
    },
    [side, stageW, stageH, wide, formes],
  );

  // Les blocs que les points contournent : les textes qui traversent la nuée, et le message (H).
  useEffect(() => {
    trous.current = () => {
      const st = stage.current;
      if (!st) return [];
      const ref = st.getBoundingClientRect();
      const out: Trou[] = [];
      const ajoute = (el: HTMLElement | null, marge: number) => {
        if (!el) return;
        const box = el.getBoundingClientRect();
        if (box.bottom < ref.top - 140 || box.top > ref.bottom + 140 || box.width < 4) return;
        out.push({ cx: box.left + box.width / 2 - ref.left, cy: box.top + box.height / 2 - ref.top, a: box.width / 2 + marge, b: box.height / 2 + marge });
      };
      for (const el of contourne.current) ajoute(el, 16);
      if (lu.current) ajoute(message.current, 26);
      return out;
    };
  }, []);

  /** À chaque image de la nuée : la capture reste dans le cadre de la fiche, le message sort de l'enveloppe. */
  const surImage = useCallback(
    (sl: number, cam: Cadre) => {
      const cap = capture.current;
      if (cap) {
        const o = presence(recit.cles, 'planning', sl, 0.62, 0.3);
        const m = 0.034 * cam.u;
        cap.style.setProperty('opacity', String(o));
        cap.style.setProperty('visibility', o > 0.01 ? 'visible' : 'hidden');
        cap.style.setProperty('width', `${FICHE.w * cam.u - 2 * m}px`);
        cap.style.setProperty('transform', `translate(${cam.cx + FICHE.x * cam.u + m}px, ${cam.cy + FICHE.y * cam.u + m}px)`);
      }
      // Les libellés des offres suivent les formes que dessine la nuée.
      const place = (el: HTMLParagraphElement | null | undefined, x: number, y: number, o: number) => {
        if (!el) return;
        el.style.setProperty('opacity', String(o));
        el.style.setProperty('visibility', o > 0.01 ? 'visible' : 'hidden');
        el.style.setProperty('transform', `translate(${cam.cx + x * cam.u}px, ${cam.cy + y * cam.u}px) translateX(-50%)`);
      };
      const o1 = presence(recit.cles, 'offres', sl, 0.62, 0.3);
      CENTRES.forEach(([x, y], g) => place(etiquettes.current[g], x, y + OFFRE / 2 + 0.06, o1));
      place(etiquettes.current[3], RECUL[2][0], RECUL[2][1] + OFFRE * 0.75 + 0.06, presence(recit.cles, 'choix', sl, 0.62, 0.3));
      const msg = message.current;
      if (msg) {
        const entre = clamp((sl - recit.h.debut) / (recit.h.lu0 - recit.h.debut));
        const sort = clamp((sl - recit.h.lu1) / (recit.h.fin - recit.h.lu1));
        const o = clamp((entre - 0.3) / 0.45) * (1 - clamp(sort / 0.5));
        const scale = lerp(0.3, 1, 1 - Math.pow(1 - entre, 3)) * lerp(1, 0.7, sort * sort);
        lu.current = o > 0.04;
        msg.style.setProperty('opacity', String(o));
        msg.style.setProperty('visibility', o > 0.01 ? 'visible' : 'hidden');
        msg.style.setProperty('transform', `translate(-50%, -50%) scale(${scale})`);
      }
    },
    [recit],
  );

  const aller = (cible: number) => {
    const el = section.current;
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - HEADER + cible * unit, behavior: 'smooth' });
  };

  // Un objet Three.js prend la main quand la nuée a fini sa forme ; la nuée reste en accompagnement.
  /** Pose l'état de chaque objet 3D pour la position `s` ; rend la présence la plus forte (fondu de la nuée). */
  const poser3d = (s: number): number => {
    let presence3d = 0;
    // Tant que la scène 3D n'est pas chargée, la nuée garde toute sa présence.
    if (!scene3d || !formes || !stageW) return 0;
    const etat: EtatScene = {};
    const cles = recit.cles;
    const k = segment(cles, s);
    const ka = cles[k];
    const kb = cles[k + 1] ?? ka;
    const e = easeInOut(clamp((s - ka.s) / Math.max(1e-6, kb.s - ka.s)));
    const ca = cadreDe(ka.place, ka.forme);
    const cb = cadreDe(kb.place, kb.forme);
    const cadre = { cx: lerp(ca.cx, cb.cx, e), cy: lerp(ca.cy, cb.cy, e), u: lerp(ca.u, cb.u, e) };
    const lisse = (v: number) => v * v * (3 - 2 * v);
    for (const nom of TOUS_3D) {
      const noms = FORMES_3D[nom];
      const i = cles.findIndex((c, n) => n > 0 && noms.includes(c.forme));
      if (i < 1) continue;
      let j = cles.findIndex((c, n) => n > i && !noms.includes(c.forme));
      if (j < 0) j = cles.length - 1;
      const debut = cles[i - 1].s + 0.82 * (cles[i].s - cles[i - 1].s);
      const fin = cles[j - 1].s + 0.3 * (cles[j].s - cles[j - 1].s);
      const p = s < cles[i].s ? lisse(clamp((s - debut) / (cles[i].s - debut))) : s > cles[j - 1].s ? 1 - lisse(clamp((s - cles[j - 1].s) / Math.max(1e-6, fin - cles[j - 1].s))) : 1;
      let detail = 0;
      if (nom === 'carte') detail = clamp((s - recit.blocs.find((b) => b.id === 'paiement')!.at + 0.04) / 0.1);
      if (nom === 'offres') {
        const c = cles.findIndex((x) => x.forme === 'choix');
        detail = easeInOut(clamp((s - cles[c - 1].s) / Math.max(1e-6, cles[c].s - cles[c - 1].s)));
      }
      etat[nom] = { presence: p, avance: clamp((s - debut) / (fin - debut)), detail, cadre };
      presence3d = Math.max(presence3d, p);
    }
    etat3d.current = etat;
    reveil3d.current?.();
    return presence3d;
  };

  const panneau = hautPanneau(stageH);
  // L'iris part du centre de la carte de Camille et couvre toute la scène à l'échelle 1 (partie pleine : 84 % du rayon).
  const iriz = (() => {
    const cx = stageW / 2;
    const cy = wide ? stageH / 2 : 2 + side / 2;
    return { cx, cy, r: Math.hypot(Math.max(cx, stageW - cx), Math.max(cy, stageH - cy)) / 0.84 + 2 };
  })();
  /** Un bloc épinglé dans la scène (téléphone, et l'appel à la démo quand la scène se calme) : il arrive, tient, repart. */
  const pose = (b: Bloc, s: number) => {
    const d = s - b.at;
    const tenu = b.kind === 'cta' ? 0.16 : 0.2;
    const hors = Math.max(0, Math.abs(d) - tenu);
    const reste = b.kind === 'cta' && d > 0;
    const opacity = reste ? 1 : 1 - clamp(hors / 0.12);
    const glisse = reste ? 0 : -Math.sign(d) * (Math.min(Math.abs(d), tenu) * 70 + Math.pow(hors / 0.12, 2) * 46);
    const el = epingles.current[b.id];
    poserStyle(el, 'opacity', String(opacity));
    poserStyle(el, 'visibility', unit && opacity > 0.01 ? 'visible' : 'hidden');
    poserStyle(el, 'transform', `translateY(${glisse}px)`);
    poserStyle(el, 'pointer-events', opacity > 0.6 ? 'auto' : 'none');
  };
  const epingle = (b: Bloc) => (b.kind === 'calm' && !wide) || b.kind === 'cta';

  // À chaque défilement, sans rendu React : ouverture, fondu de la nuée, objets 3D, textes, blocs épinglés, rail.
  const ecrireTout = (s: number) => {
    ouverture(clamp(s / ENTRY));
    const j = jourDe(s);
    poserJour(j);
    poserStyle(iris.current, 'transform', `scale(${j.toFixed(4)})`);
    poserStyle(iris.current, 'visibility', j > 0 && j < 1 ? 'visible' : 'hidden');
    poserStyle(nuit.current, 'visibility', j < 1 ? 'visible' : 'hidden');
    poserStyle(calqueNuee.current, 'opacity', String(1 - 0.7 * poser3d(s)));
    recit.blocs.forEach((b, j) => {
      if (epingle(b)) pose(b, s);
      else if (b.kind === 'calm') poserStyle(calmes.current[j], 'opacity', String(1 - clamp((Math.abs(s - b.at) - 0.2) / 0.13)));
    });
    rail.current?.(s);
  };
  // Après chaque rendu (taille, chargement des formes ou de la 3D) : le défilement prend l'écrivain à jour, les styles repartent de la position courante.
  useEffect(() => retirerJour, []);
  useLayoutEffect(() => {
    ecrire.current = ecrireTout;
    ecrireTout(instant.current);
  });

  return (
    <section
      ref={section}
      className="relative"
      style={{ height: `calc(${recit.ecrans * 100}svh + 100svh - ${HEADER}px + ${queue * 100}svh)`, backgroundColor: 'var(--fd)' }}
    >
      <div ref={stage} className="pointer-events-none sticky top-[61px] z-20 h-[calc(100svh_-_61px)] overflow-hidden" style={{ backgroundColor: PAPIER }}>
        {/* La nuit de l'ouverture ; pendant le dézoom, un iris de papier s'ouvre depuis la carte de Camille (échelle posée
            par `ecrire`, sur le compositeur). Un fondu enchaîné passait par un gris sale à mi-chemin. */}
        <div ref={nuit} aria-hidden className="absolute inset-0" style={{ backgroundColor: NUIT.couleur, backgroundImage: NUIT.image }} />
        <div
          ref={iris}
          aria-hidden
          className="absolute rounded-full will-change-transform"
          style={{ left: iriz.cx - iriz.r, top: iriz.cy - iriz.r, width: 2 * iriz.r, height: 2 * iriz.r, backgroundImage: `radial-gradient(closest-side, ${PAPIER} 84%, transparent 100%)`, transform: 'scale(0)' }}
        />
        <div className="relative flex justify-center pt-[2px] lg:absolute lg:inset-0 lg:items-center lg:pt-0">
          <div ref={holder} className="relative">
            <div ref={visual} className="relative aspect-square w-[min(100vw,42svh)] opacity-0 lg:w-[min(60vw,860px,calc(118svh_-_61px))]">
              <Fiches libelles={story.card} side={side} time={time} />
            </div>
          </div>
        </div>

        <div ref={calqueNuee} className="absolute inset-0">
          {formes && <Nuee cles={recit.cles} formes={formes} recit={instant} cadreDe={cadreDe} rayon={dotRadius(side)} trous={trous} onFrame={surImage} />}
        </div>
        {scene3d && formes && stageW > 0 && <Scene3D etat={etat3d} reveil={reveil3d} boites={boitesDe(formes)} />}

        {/* Les offres : libellés courts, sans prix ; seul le choix de Camille porte le sien. */}
        {[...story.offers, story.chosen].map((label, i) => (
          <p
            key={label}
            ref={(el) => {
              etiquettes.current[i] = el;
            }}
            className={cn('invisible absolute left-0 top-0 z-10 whitespace-nowrap opacity-0', i < 3 ? cn(CORPS, 'text-[13.5px] lg:text-[15px]') : cn(CLAIR, 'text-[15px] font-medium lg:text-[18px]'))}
          >
            {i < 3 ? label : <Montants text={label} />}
          </p>
        ))}

        {/* La vraie fiche client de TriggerFlow, dans le cadre que les points dessinent. */}
        <figure ref={capture} className="invisible absolute left-0 top-0 z-10 opacity-0">
            <Image
              src="/images/lp/crm-hotelier/fiche-client-fil.webp"
              alt={story.capture.alt}
              width={680}
              height={420}
              sizes="(min-width: 1024px) 640px, 60vw"
              className="h-auto w-full rounded-[12px] lg:rounded-[16px]"
            />
            <figcaption className={cn(CORPS, 'mt-3 hidden text-[13px] lg:block')}>{story.capture.caption}</figcaption>
        </figure>

        <div ref={message} className="pointer-events-none invisible absolute left-1/2 top-1/2 z-20 flex flex-col items-center opacity-0">
            <h2
              className={cn(CLAIR, VOILE, 'mb-5 font-medium text-center text-[length:23px] leading-[1.1] tracking-[-0.03em] lg:mb-7 lg:text-[length:34px]')}
            >
              {story.message.title}
            </h2>
            <Message m={story.message} />
        </div>

        {/* Les textes épinglés : sur téléphone ils tiennent sous la nuée ; l'appel à la démo se pose sur la scène calmée. */}
        {recit.blocs.filter(epingle).map((b) => (
          <div
            key={b.id}
            ref={(el) => {
              epingles.current[b.id] = el;
            }}
            className={cn(
              'invisible absolute z-20 opacity-0',
              b.kind === 'cta' ? 'inset-x-0 mx-auto w-[min(88vw,340px)] -translate-y-1/2 text-center sm:w-[480px] lg:w-[520px]' : 'inset-x-5 -translate-y-1/2',
            )}
            style={{ top: b.kind === 'cta' ? (wide ? 0.44 : 0.42) * stageH : panneau + (stageH - panneau) / 2 - 4 }}
          >
            {b.id === 'fiche' ? <FicheTelephone capture={story.captureMobile} /> : <Texte bloc={b} wide={wide} hero={hero} />}
          </div>
        ))}

        {!wide && <Rail recit={recit} label={story.railLabel} poserRef={rail} aller={aller} wide={false} />}

        {/* L'ouverture : le titre s'écarte sur la carte de Camille, puis on plonge dedans. */}
        <div ref={bloc} className="pointer-events-auto absolute inset-0 z-30 flex flex-col items-center justify-center px-4 text-center">
          <Titre lignes={hero} gap={gap} className={cn(CLAIR, 'font-normal tracking-[-0.035em] lg:font-light', 'text-[10.8vw] leading-[1.04] sm:text-[60px] lg:text-[min(6vw,92px)] lg:leading-[1.02]')} />
          <p className={cn(CORPS, 'mx-auto mt-6 max-w-[34ch] text-pretty text-[17px] leading-[1.45] lg:mt-8 lg:max-w-[50ch] lg:text-[21px]')}>{hero.sub}</p>
          <Actions hero={hero} placement="hero" center />
          <div className="absolute inset-x-0 bottom-5 mx-auto max-w-[1240px] px-4 lg:bottom-8 lg:px-8">
            <Logos logos={logos} dark />
          </div>
        </div>
      </div>

      {/* Les textes qui défilent : sur ordinateur ils passent à côté de la nuée (I), ou la traversent (J). */}
      <div className="absolute inset-x-0 top-0">
        {recit.blocs.map((b, j) => {
          if (epingle(b)) return null;
          const cross = b.kind !== 'calm';
          const contour = cross;
          return (
            <div
              key={b.id}
              ref={(el) => {
                contourne.current[j] = contour ? el : null;
                calmes.current[j] = el;
              }}
              className={cn(
                'absolute z-30 -translate-y-1/2',
                cross
                  ? cn(VOILE, 'left-1/2 -translate-x-1/2 text-center', b.kind === 'cta' ? 'w-[min(84vw,320px)] lg:w-[480px]' : 'w-[min(70vw,250px)] lg:w-[400px]')
                  : cn('inset-x-4 lg:inset-x-auto lg:w-[min(42vw,620px)]', b.side === 'right' ? 'lg:right-[max(5vw,calc(50vw_-_620px))]' : 'lg:left-[max(5vw,calc(50vw_-_620px))]'),
              )}
              style={{
                top: b.at * unit + stageH / 2,
                visibility: unit ? 'visible' : 'hidden',
                // Un texte calme s'efface en s'éloignant du milieu (opacité posée par `ecrire`).
              }}
            >
              <Texte bloc={b} wide={wide} hero={hero} />
            </div>
          );
        })}
      </div>

      {/* Le rail reste au pied de l'écran, au-dessus des textes qui défilent. */}
      {wide && (
        <div className="pointer-events-none absolute inset-0 z-40">
          <div className="sticky top-[calc(100svh_-_92px)] h-[92px]">
            <Rail recit={recit} label={story.railLabel} poserRef={rail} aller={aller} wide />
          </div>
        </div>
      )}
    </section>
  );
}

function Fixe({ textes, chiffres, logos }: Props) {
  const { hero, story } = textes;
  const recit = useMemo(() => histoire(story, chiffres), [story, chiffres]);
  const wide = useWide();
  const ouverture = useRef<HTMLDivElement>(null);
  useEffect(() => (ouverture.current ? suivreOuvertureFixe(ouverture.current) : undefined), []);
  return (
    <section style={{ backgroundColor: NUIT.couleur }}>
      <div ref={ouverture} className="mx-auto max-w-[1240px] px-4 pt-12 lg:px-8 lg:pt-20">
        <h1 className={cn(CLAIR, 'max-w-[14ch] text-[42px] font-normal leading-[1.04] tracking-[-0.035em] lg:text-[92px] lg:font-light lg:leading-[1.02]')}>{titreEntier(hero)}</h1>
        <p className={cn(CORPS, 'mt-6 max-w-[50ch] text-[17px] leading-[1.45] lg:text-[21px]')}>{hero.sub}</p>
        <Actions hero={hero} placement="hero" />
        <Logos logos={logos} dark className="mt-12" />
      </div>
      {/* Le récit sur le papier, comme la version animée. */}
      <div className="mt-16 pb-20 pt-16 lg:mt-24 lg:pt-24" style={{ ...varsJour(1), backgroundColor: PAPIER }}>
        <ol className="mx-auto flex max-w-[1240px] flex-col gap-16 px-4 lg:gap-24 lg:px-8">
          {recit.blocs.map((b) => (
            <li key={b.id} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
              <div className={cn(b.side === 'right' && 'lg:order-2', b.kind !== 'calm' && 'lg:col-span-2 lg:mx-auto lg:max-w-[560px] lg:text-center')}>
                <Texte bloc={{ ...b, kind: b.kind === 'cross' ? 'calm' : b.kind }} wide={wide} hero={hero} />
              </div>
              {b.kind === 'calm' && <Figee forme={b.id === 'ventes' ? 'choix' : b.forme} />}
              {b.id === 'pms' && (
                <div className="mt-8 flex flex-col items-start lg:col-span-2 lg:mt-10 lg:items-center">
                  <h2 className={cn(CLAIR, 'mb-5 text-[24px] font-normal tracking-[-0.03em] lg:text-[34px] lg:font-light')}>{story.message.title}</h2>
                  <Message m={story.message} />
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Vrai quand la page montre la version fixe : animations réduites ou écran trop court. */
export function useFixe(): boolean {
  return useStaticMode(HEADER);
}

export function Immersion(props: Props) {
  return useFixe() ? <Fixe {...props} /> : <Animee {...props} />;
}

export { NUIT, QUEUE };
