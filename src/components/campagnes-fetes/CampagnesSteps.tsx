'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CopyModeleModal, type ModaleCampagne, type ModaleLabels } from './CopyModeleModal';
import { MailPreview } from './MailPreview';

export interface EtapeCampagne {
  code: string;
  nom: string;
  periode: string;
  objet: string;
  pourquoi: string;
  activateUrl: string;
  /** Aperçu (iframe) ; null tant que l'export du modèle manque. */
  previewUrl: string | null;
  modale: ModaleCampagne;
}

export interface EtapesLabels {
  subject: string;
  from: string;
  activate: string;
  copy: string;
  seeFull: string;
  previewTitle: string;
  previewLabel: string;
  fallbackTitle: string;
  modal: ModaleLabels;
}

interface CampagnesStepsProps {
  etapes: EtapeCampagne[];
  labels: EtapesLabels;
  /** Étiquette posée sur chaque étape (modèles exclusifs à la page). */
  badge?: string;
}

/**
 * Les campagnes sur un rail (les 7, puis les 3 exclusifs dans une seconde instance) : l'étape lue passe en tête, l'aperçu collant de droite change avec elle
 * (ordinateur) ou chaque étape porte le sien (téléphone). Le défilement agit sur le DOM sans rendu React.
 */
export function CampagnesSteps({ etapes, labels, badge }: CampagnesStepsProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [ouverte, setOuverte] = useState<ModaleCampagne | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    root.classList.remove('cf-nojs');
    gsap.registerPlugin(ScrollTrigger);

    const steps = Array.from(root.querySelectorAll<HTMLElement>('.cf-step'));
    const wins = Array.from(root.querySelectorAll<HTMLElement>('.cf-win'));
    const liens = Array.from(root.querySelectorAll<HTMLElement>('.cf-stage-lien'));
    const fill = root.querySelector<HTMLElement>('.cf-rail-fill');
    const mm = gsap.matchMedia();
    let courant = -1;

    const activer = (i: number) => {
      if (i === courant) return;
      courant = i;
      steps.forEach((s, k) => {
        s.classList.toggle('on', k === i);
        s.classList.toggle('passe', k < i);
      });
      wins.forEach((w, k) => w.classList.toggle('on', k === i));
      liens.forEach((l, k) => l.classList.toggle('on', k === i));
    };

    const suivre = (debut: string, fin: string) =>
      steps.forEach((s, i) =>
        ScrollTrigger.create({
          trigger: s,
          start: debut,
          end: fin,
          onToggle: (self) => self.isActive && activer(i),
          // Remonté au-dessus de la première étape : retour à la première, plutôt que de garder la dernière lue.
          onLeaveBack: i === 0 ? () => activer(0) : undefined,
        }),
      );

    mm.add('(min-width: 900px)', () => {
      activer(0);
      suivre('top 55%', 'bottom 55%');
    });
    mm.add('(max-width: 899px)', () => {
      steps.forEach((s, i) =>
        ScrollTrigger.create({
          trigger: s,
          start: 'top 60%',
          end: 'bottom 60%',
          onToggle: (self) => (self.isActive ? activer(i) : s.classList.remove('on')),
          onLeaveBack: i === 0 ? () => activer(0) : undefined,
        }),
      );
    });
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      if (!fill) return;
      gsap.fromTo(
        fill,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: { trigger: root.querySelector('.cf-steps'), start: 'top 60%', end: 'bottom 55%', scrub: true },
        },
      );
    });

    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return () => mm.revert();
  }, []);

  const fallback = (e: EtapeCampagne) => ({ title: labels.fallbackTitle, objet: e.objet, periode: e.periode });

  return (
    <div className="cf-sept-g" ref={rootRef}>
      <div className="cf-steps cf-nojs">
        <div className="cf-rail" aria-hidden="true">
          <div className="cf-rail-fill" />
        </div>
        {etapes.map((e, i) => (
          <article key={e.code} id={e.code} className={`cf-step${i === 0 ? ' on' : ''}`}>
            <i className="cf-dot" aria-hidden="true" />
            <div className="cf-step-in">
              <div className="cf-step-mail">
                <MailPreview src={e.previewUrl} title={labels.previewTitle.replace('{name}', e.nom)} fallback={fallback(e)} />
              </div>
              {badge && <span className="cf-excl-badge">{badge}</span>}
              <span className="cf-periode">{e.periode}</span>
              <h3>{e.nom}</h3>
              <p className="cf-objet">
                <b>{labels.subject}</b>
                {e.objet}
              </p>
              <p className="cf-pourquoi">{e.pourquoi}</p>
              <div className="cf-acts">
                <a className="cf-btn cf-btn-peche" href={e.activateUrl} target="_blank" rel="noopener noreferrer">
                  {labels.activate}
                </a>
                {e.previewUrl && (
                  <button type="button" className="cf-lien" onClick={() => setOuverte(e.modale)}>
                    {labels.copy}
                    <span className="sr-only"> : {e.nom}</span>
                  </button>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
      <aside className="cf-stage" aria-label={labels.previewLabel}>
        {etapes.map((e, i) => (
          <div key={e.code} className={`cf-win${i === 0 ? ' on' : ''}`}>
            <div className="cf-win-tete">
              <span className="de">{labels.from}</span>
              <span className="obj">{e.objet}</span>
            </div>
            <MailPreview src={e.previewUrl} title={labels.previewTitle.replace('{name}', e.nom)} fallback={fallback(e)} />
          </div>
        ))}
        {etapes.map(
          (e, i) =>
            e.previewUrl && (
              <div key={e.code} className={`cf-stage-lien${i === 0 ? ' on' : ''}`}>
                <a className="cf-lien" href={e.previewUrl} target="_blank" rel="noopener noreferrer">
                  {labels.seeFull}
                </a>
              </div>
            ),
        )}
      </aside>
      <CopyModeleModal campagne={ouverte} labels={labels.modal} onClose={() => setOuverte(null)} />
    </div>
  );
}
