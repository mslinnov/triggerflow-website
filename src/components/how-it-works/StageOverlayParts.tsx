'use client';

import { motion, type MotionValue } from 'framer-motion';
import { clamp, lerp, round } from '@/lib/how-it-works/math';
import { RESULTS, resultAt, type OverlayGeometry } from '@/lib/how-it-works/overlay';
import type { JourneyTime } from '@/lib/how-it-works/timeline';
import { BEATS } from '@/lib/how-it-works/trace';
import { useAt } from './useAt';

const PEACH = '#FFCFA2';
const INK = '#002B28';
const MUTED = '#7E8C89';

interface PartProps {
  g: OverlayGeometry;
  index: number;
  time: MotionValue<JourneyTime>;
}

/** La marque pêche qu'un résultat laisse sur la ligne de séjour, avec une onde à l'arrivée. */
export function ResultMark({ g, index, time }: PartProps) {
  const { mark, radius } = RESULTS[index];
  const [cx, cy] = g.targets[index];
  const wave = (p: number) => clamp((p - mark) / 0.03);
  const shown = useAt(time, (p) => clamp((p - mark) / 0.014));
  const scale = useAt(time, (p) => lerp(3 / radius, 1, clamp((p - mark) / 0.014)));
  const waveScale = useAt(time, (p) => lerp(radius / (radius + 14), 1, wave(p)));
  const waveOpacity = useAt(time, (p) => (wave(p) > 0 && wave(p) < 1 ? 1 - wave(p) : 0));
  return (
    <>
      <motion.circle cx={round(cx)} cy={cy} r={radius + 14} fill="none" stroke={PEACH} strokeWidth="2" style={{ scale: waveScale, opacity: waveOpacity }} />
      <motion.circle cx={round(cx)} cy={cy} r={radius} fill={PEACH} stroke="#fff" strokeWidth="1.5" style={{ scale, opacity: shown }} />
    </>
  );
}

/** La pastille d'un résultat : elle apparaît au centre du pictogramme, puis descend se poser sur la ligne. */
export function ResultPill({ g, index, time, label }: PartProps & { label: string }) {
  const x = useAt(time, (p) => round(resultAt(g, index, p).x));
  const y = useAt(time, (p) => round(resultAt(g, index, p).y));
  const opacity = useAt(time, (p) => resultAt(g, index, p).opacity);
  const scale = useAt(time, (p) => lerp(1, 0.62, resultAt(g, index, p).t));
  // La dernière se pose au bout de la ligne : elle s'ancre à droite pour ne pas sortir de l'écran.
  const shift = useAt(time, (p) => `${round(lerp(-50, index === RESULTS.length - 1 ? -88 : -50, resultAt(g, index, p).t))}%`);
  // Bloc sans largeur : seule la pastille, déjà décalée, compte dans la largeur de la page.
  return (
    <motion.div style={{ x, y, opacity }} className="absolute left-0 top-0 h-0 w-0">
      <motion.span
        style={{ x: shift, scale }}
        className="block w-max -translate-y-1/2 whitespace-nowrap rounded-full bg-peach px-3 py-1.5 font-mono text-[13px] font-medium leading-none text-ink"
      >
        {label}
      </motion.span>
    </motion.div>
  );
}

/** Un repère de la ligne de séjour : il fonce quand Camille l'atteint, et s'épaissit tant qu'elle y est. */
export function BeatLabel({ g, index, time, label, className }: PartProps & { label: string; className: string }) {
  const reached = (i: number, p: number) => g.trace.distAt(p) > g.trace.xAt(BEATS[i]) - g.trace.x0 - 12;
  const fill = useAt(time, (p) => (reached(index, p) ? INK : MUTED));
  const fontWeight = useAt(time, (p) =>
    reached(index, p) && (index === BEATS.length - 1 || !reached(index + 1, p)) ? 600 : 500,
  );
  return (
    <motion.text
      x={round(g.trace.xAt(BEATS[index]))}
      y={g.trace.y + 21}
      textAnchor="middle"
      dominantBaseline="central"
      className={className}
      style={{ fill, fontWeight }}
    >
      {label}
    </motion.text>
  );
}
