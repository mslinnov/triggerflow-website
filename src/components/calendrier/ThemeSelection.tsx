'use client';

import { createContext, useContext, useState } from 'react';
import type { MjmlTheme } from '@/data/calendrier-marketing';

type ThemeState = [MjmlTheme, (theme: MjmlTheme) => void];

const ThemeSelectionContext = createContext<ThemeState | null>(null);

/**
 * Thème choisi pour un temps fort, partagé entre les pastilles de l'aperçu et le lien
 * « Déjà client : ouvrir dans TriggerFlow », qui peuvent être éloignés dans la page
 * (carte du calendrier, page Activer).
 */
export function ThemeSelectionProvider({ initial, children }: { initial: MjmlTheme; children: React.ReactNode }) {
  const state = useState<MjmlTheme>(initial);
  return <ThemeSelectionContext.Provider value={state}>{children}</ThemeSelectionContext.Provider>;
}

/** Thème partagé s'il y a un fournisseur, sinon un état propre au composant. */
export function useThemeSelection(fallback: MjmlTheme): ThemeState {
  const shared = useContext(ThemeSelectionContext);
  const local = useState<MjmlTheme>(fallback);
  return shared ?? local;
}
