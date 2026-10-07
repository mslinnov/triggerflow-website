import { isWithinWindow } from '@/data/equiphotel';
import { ShowWhenClient } from './ShowWhenClient';

interface ShowWhenProps {
  from?: string;
  until?: string;
  children: React.ReactNode;
}

// La page est générée au build (SSG) : `initial` fige l'état à la date du build
// pour que l'hydratation corresponde au HTML. Le navigateur réévalue ensuite avec
// l'heure réelle, ce qui bascule "avant / pendant / après le salon" sans redéployer.
export function ShowWhen({ from, until, children }: ShowWhenProps) {
  return (
    <ShowWhenClient from={from} until={until} initial={isWithinWindow(from, until)}>
      {children}
    </ShowWhenClient>
  );
}
