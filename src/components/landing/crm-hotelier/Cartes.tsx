'use client';

/*
 * Les fiches de l'ouverture (reprises de how-it-works/IntroCards, libellés passés par la page) : la fiche de Camille en
 * grand, puis le dézoom où chaque fiche se replie sur sa pastille.
 */

import { useCallback, useEffect, useMemo, useRef } from 'react';
import { motion, useMotionValueEvent, useTransform, type MotionStyle, type MotionValue } from 'framer-motion';
import { CAMILLE, DEMO_FIRST, DEMO_LAST } from '@/data/how-it-works-demo';
import { projector, type Pt } from '@/lib/how-it-works/geometry';
import { cardFactor, introCamera, introTransform, nearCamille } from '@/lib/how-it-works/intro';
import { clamp, mixHex, round } from '@/lib/how-it-works/math';
import type { JourneyTime } from '@/lib/how-it-works/timeline';
import { getScene } from '@/components/how-it-works/draw';

const GREY = '#B2BDBA';
const MID = '#6C7B78';

/** Libellés des fiches (lpCrmHotelier.story.card) : le type de fiche, le séjour de Camille, six séjours pour les autres. */
export interface LibellesCartes {
  kind: string;
  camilleStay: string;
  stays: readonly string[];
}

interface CartesProps {
  libelles: LibellesCartes;
  /** Côté du visuel, en pixels CSS. */
  side: number;
  time: MotionValue<JourneyTime>;
}

/**
 * L'ouverture : la fiche de Camille en grand, puis un dézoom. D'autres fiches entrent dans le champ,
 * rétrécissent, et chacune se replie sur sa pastille : un point, une fiche.
 * Le zoom, l'opacité et l'épaisseur sont mis à jour directement à chaque changement de défilement,
 * sans repasser par React.
 */
export function Cartes({ libelles, side, time }: CartesProps) {
  const zoom = useRef<SVGGElement>(null);
  const bodies = useRef<SVGGElement>(null);
  const initials = useRef<SVGGElement>(null);
  const dots = useRef<SVGGElement>(null);
  const camille = useRef<SVGPathElement>(null);

  const geometry = useMemo(() => {
    const { layout } = getScene();
    const { x, y } = projector(side);
    const units = [...layout.clusters, ...layout.clusterDupes];
    // Arrondis : ces positions sont écrites dans le HTML servi, puis recalculées par le navigateur.
    const points: Pt[] = units.map(([ux, uy]) => [round(x(ux)), round(y(uy))]);
    const factor = cardFactor(side);
    // La fiche de Camille, large de 300 px, est centrée ; sa pastille est à 44 px de son bord gauche.
    const start: Pt = [round(side / 2 - 106 * factor), round(y(-0.02))];
    const home = points[0];
    return { points, home, start, near: nearCamille(units), base: factor / introCamera(0, side, home, start).zoom };
  }, [side]);
  const { points, home, start, near, base } = geometry;

  const camera = useCallback((q: number) => introCamera(q, side, home, start), [side, home, start]);
  const camilleColor = (tau: number) => mixHex(MID, GREY, clamp((tau - 0.55) / 0.4));

  const apply = useCallback(() => {
    const cam = camera(time.get().q);
    zoom.current?.setAttribute('transform', introTransform(cam, home));
    bodies.current?.setAttribute('opacity', String(cam.cardOpacity));
    initials.current?.setAttribute('opacity', String(cam.cardOpacity));
    dots.current?.setAttribute('stroke-width', String(2 * cam.radius));
    camille.current?.setAttribute('stroke-width', String(2 * cam.radius));
    camille.current?.setAttribute('stroke', camilleColor(cam.tau));
  }, [camera, home, time]);

  useEffect(apply, [apply]);
  useMotionValueEvent(time, 'change', apply);

  /** Taille d'une fiche par rapport à l'espace zoomé ; elle diminue encore quand la fiche se replie. */
  const cardScale = useTransform(time, (value) => round(base * camera(value.q).cardScale, 6));

  const who = (i: number) =>
    i === 0
      ? { first: CAMILLE.first, last: CAMILLE.last, stay: libelles.camilleStay }
      : { first: DEMO_FIRST[(i * 7) % 20], last: DEMO_LAST[(i * 13) % 20], stay: libelles.stays[(i * 5) % libelles.stays.length] };
  const place = (i: number) => `translate(${points[i][0]} ${points[i][1]})`;
  const initial = camera(time.get().q);

  return (
    // La variable est portée par un bloc HTML : sur un élément SVG, framer-motion ne l'écrit pas dans le HTML servi,
    // et les fiches seraient dessinées des dizaines de fois trop grandes jusqu'à l'hydratation.
    <motion.div aria-hidden style={{ '--card-scale': cardScale } as MotionStyle} className="pointer-events-none absolute inset-0">
      <svg
        width={side}
        height={side}
        className="absolute inset-0 overflow-hidden [mask-composite:intersect] [mask-image:linear-gradient(to_bottom,transparent,#000_9%,#000_90%,transparent),linear-gradient(to_right,transparent,#000_7%,#000_93%,transparent)]"
      >
        <g ref={zoom} transform={introTransform(initial, home)} fill="none" strokeLinecap="round">
          <g ref={bodies} opacity={round(initial.cardOpacity, 3)}>
            {near.map((i) => {
              const { first, last, stay } = who(i);
              return (
                <g key={i} transform={place(i)}>
                  <g className="[transform:scale(var(--card-scale))]">
                    <rect x="-44" y="-52" width="300" height="104" rx="16" className="fill-paper stroke-line" />
                    <text x="42" y="-20.5" className="fill-ink-3 font-mono text-[10px] uppercase tracking-[0.06em]">{libelles.kind}</text>
                    <text x="42" y="5.5" className="fill-ink text-[19px] font-semibold">{`${first} ${last}`}</text>
                    <text x="42" y="28" className="fill-ink-2 text-[14px]">{stay}</text>
                  </g>
                </g>
              );
            })}
          </g>
          <g ref={dots} stroke={GREY} strokeWidth={round(2 * initial.radius, 3)}>
            {points.slice(1).map(([x, y], i) => (
              <path key={i} d={`M${x} ${y}h0.001`} vectorEffect="non-scaling-stroke" />
            ))}
          </g>
          <path
            ref={camille}
            d={`M${home[0]} ${home[1]}h0.001`}
            vectorEffect="non-scaling-stroke"
            stroke={camilleColor(initial.tau)}
            strokeWidth={round(2 * initial.radius, 3)}
          />
          <g ref={initials} opacity={round(initial.cardOpacity, 3)}>
            {near.map((i) => {
              const { first, last } = who(i);
              return (
                <g key={i} transform={place(i)}>
                  <g className="[transform:scale(var(--card-scale))]">
                    <text y="5.3" textAnchor="middle" className="fill-white text-[15px] font-semibold">{`${first[0]}${last[0]}`}</text>
                  </g>
                </g>
              );
            })}
          </g>
        </g>
      </svg>
    </motion.div>
  );
}
