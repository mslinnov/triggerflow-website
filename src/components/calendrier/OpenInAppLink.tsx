'use client';

import { activateInAppName, activateInAppUrl, type MjmlTheme, type TempsFortCode } from '@/data/calendrier-marketing';
import { ActivateLink } from './ActivateLink';
import { useThemeSelection } from './ThemeSelection';

interface OpenInAppLinkProps {
  code: TempsFortCode;
  /** Thèmes livrés pour ce code ; un thème choisi hors de cette liste retombe sur le premier. */
  themes: MjmlTheme[];
  themeNames: Record<MjmlTheme, string>;
  variant?: 'button' | 'link';
  /** Affiche sous le lien le nom du modèle qui sera ouvert (page Activer, loin des pastilles). */
  caption?: string;
  className?: string;
  children: React.ReactNode;
}

/** « Déjà client : ouvrir dans TriggerFlow » : lien profond qui suit la pastille de thème choisie. */
export function OpenInAppLink({ code, themes, themeNames, variant = 'button', caption, className, children }: OpenInAppLinkProps) {
  const [selected] = useThemeSelection(themes[0]);
  const theme = themes.includes(selected) ? selected : themes[0];
  const themeName = themeNames[theme];

  return (
    <div className={className}>
      <ActivateLink href={activateInAppUrl(code, theme, themeName)} tempsFort={code} destination="app" theme={theme} variant={variant}>
        {children}
      </ActivateLink>
      {caption && (
        <p className="mt-2 text-xs text-text-muted">
          {caption} : {activateInAppName(code, themeName)}
        </p>
      )}
    </div>
  );
}
