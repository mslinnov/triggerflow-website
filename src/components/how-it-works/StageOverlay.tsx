'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { motion, type MotionValue } from 'framer-motion';
import { CAMILLE } from '@/data/how-it-works-demo';
import { clamp, easeInOut, fade, lerp, round } from '@/lib/how-it-works/math';
import { RESULTS, camilleAt, camilleRadius, dropProgress, overlayGeometry } from '@/lib/how-it-works/overlay';
import type { JourneyTime } from '@/lib/how-it-works/timeline';
import { STRIP_H } from '@/lib/how-it-works/trace';
import { cn } from '@/lib/utils';
import { BeatLabel, ResultMark, ResultPill } from './StageOverlayParts';
import { useAt } from './useAt';

const ACCENT = '#006F68';
const INK = '#002B28';
const INK3 = '#5B6B69';
const MUTED = '#7E8C89';
const LINE = '#D9E0DE';
/** Rayon du point de Camille au moment où on la choisit ; il sert de base aux mises à l'échelle. */
const CAMILLE_R = 8.5;

const TOOLS = ['pms', 'payment', 'locks', 'reviews', 'messaging'] as const;
const GROUPS = ['couples', 'business', 'families'] as const;
const BEAT_KEYS = ['d3', 'day', 'd1', 'd30'] as const;
const RESULT_KEYS = ['sale', 'review', 'direct'] as const;

interface StageOverlayProps {
  /** Côté du visuel, en pixels CSS. */
  side: number;
  time: MotionValue<JourneyTime>;
}

/**
 * Le calque posé sur la toile : la ligne de séjour de Camille, son point, les libellés et les résultats.
 * Décoratif : le récit est porté par les textes. Chaque valeur animée est dérivée du défilement.
 */
export function StageOverlay({ side, time }: StageOverlayProps) {
  const t = useTranslations('howItWorksPage.labels');
  const g = useMemo(() => overlayGeometry(side), [side]);
  // Sur un petit téléphone, « J+30 » et « Retour » se touchent : les libellés rétrécissent d'un cran.
  const label = cn(
    'font-mono uppercase tracking-[0.06em]',
    side > 440 ? 'text-[11.5px]' : side >= 350 ? 'text-[10px]' : 'text-[9px] tracking-[0.02em]',
  );
  const anchored = { textAnchor: 'middle', dominantBaseline: 'central' } as const;

  const chosen = (p: number) => clamp((p - 0.298) / 0.018);
  const settle = (p: number) => easeInOut((p - 0.365) / 0.022);

  const toolsOpacity = useAt(time, (p, q) => clamp((q - 0.86) / 0.14) * (1 - clamp((p - 0.035) / 0.05)));
  const dupesOpacity = useAt(time, (p) => fade(p, 0.11, 0.19, 0.015));
  const groupsOpacity = useAt(time, (p) => fade(p, 0.2, 0.39, 0.015));
  const couplesFill = useAt(time, (p) => (p > 0.283 ? ACCENT : INK3));
  const couplesWeight = useAt(time, (p) => (p > 0.283 ? 600 : 500));
  const frameOpacity = useAt(time, (p) => fade(p, 0.278, 0.345, 0.018) * 0.8);

  const lineOpacity = useAt(time, (p, q) => (clamp((p - 0.24) / 0.05) * 0.85 + 0.15) * clamp((q - 0.86) / 0.14));
  const beatsOpacity = useAt(time, (p) => clamp((p - 0.27) / 0.04));
  const backFill = useAt(time, (p) => (p > 0.985 ? INK : MUTED));
  const backWeight = useAt(time, (p) => (p > 0.985 ? 600 : 500));
  const dropLength = useAt(time, dropProgress);
  const dropOpacity = useAt(time, (p) => (dropProgress(p) > 0 ? 1 - clamp((p - 0.385) / 0.035) : 0));
  const traceLength = useAt(time, (p) => g.trace.distAt(p) / g.trace.length);
  const traceOpacity = useAt(time, (p) => (g.trace.distAt(p) > 0 ? 1 : 0));

  const camilleX = useAt(time, (p) => round(camilleAt(g, p)[0]));
  const camilleY = useAt(time, (p) => round(camilleAt(g, p)[1]));
  const camilleScale = useAt(time, (p) => camilleRadius(p) / CAMILLE_R);
  const camilleOpacity = useAt(time, chosen);
  const haloOpacity = useAt(time, (p) => chosen(p) * 0.16);
  // Son prénom la suit, puis se range sous le début de sa ligne.
  const nameX = useAt(time, (p) => round(lerp(camilleAt(g, p)[0] + 14, g.trace.x0 - 2, settle(p))));
  const nameY = useAt(time, (p) => round(lerp(camilleAt(g, p)[1] - 7, g.trace.y + 13, settle(p))));

  return (
    <div aria-hidden className="pointer-events-none absolute left-0 top-0">
      <svg width={side} height={side + STRIP_H} className="absolute left-0 top-0 overflow-visible">
        <motion.g style={{ opacity: toolsOpacity }} fill={INK}>
          {TOOLS.map((key, i) => (
            <text key={key} x={round(g.toolX[i])} y={round(g.toolY)} {...anchored} className={label}>{t(`tools.${key}`)}</text>
          ))}
        </motion.g>
        <motion.text x={side / 2} y={round(g.groupY)} {...anchored} fill={INK3} className={label} style={{ opacity: dupesOpacity }}>
          {t('duplicates')}
        </motion.text>
        <motion.g style={{ opacity: groupsOpacity }} fill={INK3}>
          {GROUPS.map((key, i) =>
            i === 0 ? (
              <motion.text key={key} x={round(g.groupX[i])} y={round(g.groupY)} {...anchored} className={label} style={{ fill: couplesFill, fontWeight: couplesWeight }}>{t(`groups.${key}`)}</motion.text>
            ) : (
              <text key={key} x={round(g.groupX[i])} y={round(g.groupY)} {...anchored} className={label}>{t(`groups.${key}`)}</text>
            ),
          )}
        </motion.g>
        <motion.rect
          x={round(g.frame.x)}
          y={round(g.frame.y)}
          width={round(g.frame.width)}
          height={round(g.frame.height)}
          rx="10"
          fill="none"
          stroke={ACCENT}
          strokeWidth="2"
          style={{ opacity: frameOpacity }}
        />

        {/* La ligne de séjour : d'abord en attente, puis tracée par Camille. */}
        <motion.path d={g.trace.d} fill="none" stroke={LINE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: lineOpacity }} />
        <motion.g style={{ opacity: beatsOpacity }}>
          {BEAT_KEYS.map((key, i) => (
            <BeatLabel key={key} g={g} index={i} time={time} label={t(`beats.${key}`)} className={label} />
          ))}
          <motion.text x={g.trace.x1 + 2} y={g.trace.y + 21} textAnchor="end" dominantBaseline="central" className={label} style={{ fill: backFill, fontWeight: backWeight }}>
            {t('beats.back')}
          </motion.text>
        </motion.g>
        <motion.path d={g.dropPath} fill="none" stroke={ACCENT} strokeWidth="2.4" strokeLinecap="round" style={{ pathLength: dropLength, opacity: dropOpacity }} />
        <motion.path d={g.trace.d} fill="none" stroke={ACCENT} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ pathLength: traceLength, opacity: traceOpacity }} />
        {RESULTS.map((_, i) => (
          <ResultMark key={i} g={g} index={i} time={time} />
        ))}
        <motion.g style={{ x: camilleX, y: camilleY }}>
          <motion.circle r={CAMILLE_R * 2.4} fill={ACCENT} style={{ scale: camilleScale, opacity: haloOpacity }} />
          <motion.circle r={CAMILLE_R} fill={ACCENT} stroke="#fff" strokeWidth="1.5" style={{ scale: camilleScale, opacity: camilleOpacity }} />
        </motion.g>
      </svg>
      <motion.span
        style={{ x: nameX, y: nameY, opacity: camilleOpacity }}
        className={cn('absolute left-0 top-0 whitespace-nowrap font-semibold leading-none text-accent', side > 440 ? 'text-[14px]' : 'text-[13px]')}
      >
        {CAMILLE.first}
      </motion.span>
      {RESULT_KEYS.map((key, i) => (
        <ResultPill key={key} g={g} index={i} time={time} label={t(`results.${key}`)} />
      ))}
    </div>
  );
}
