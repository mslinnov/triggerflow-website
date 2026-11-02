'use client';

import type { MjmlTheme } from '@/data/calendrier-marketing';
import { recordCalendarStat } from '@/lib/calendrier-tracking';
import { cn } from '@/lib/utils';
import { useThemeSelection } from './ThemeSelection';

interface ThemePillsProps {
  /** Temps fort de l'aperçu, compté avec le thème choisi (`theme_change`). */
  code: string;
  themes: MjmlTheme[];
  themeNames: Record<MjmlTheme, string>;
  label: string;
  className?: string;
}

/** Pastilles de thème (Élégant, Soirée, Éditorial), masquées tant qu'un seul thème est livré. */
export function ThemePills({ code, themes, themeNames, label, className }: ThemePillsProps) {
  const [selected, setSelected] = useThemeSelection(themes[0]);
  const current = themes.includes(selected) ? selected : themes[0];
  if (themes.length < 2) return null;

  return (
    <div role="group" aria-label={label} className={cn('flex flex-wrap gap-2', className)}>
      {themes.map((value) => (
        <button
          key={value}
          type="button"
          aria-pressed={value === current}
          onClick={() => {
            if (value !== current) recordCalendarStat({ type: 'theme_change', temps_fort: code, theme: value });
            setSelected(value);
          }}
          className={cn(
            'inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2',
            value === current
              ? 'border-brand-primary bg-brand-primary text-white'
              : 'border-border-light bg-white text-text-primary hover:border-brand-primary hover:text-brand-primary',
          )}
        >
          {themeNames[value]}
        </button>
      ))}
    </div>
  );
}
