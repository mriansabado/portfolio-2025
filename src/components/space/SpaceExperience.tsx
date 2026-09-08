import { useEffect, useMemo, useState, type MouseEvent, type PointerEvent, type ReactNode } from 'react';
import AboutPanel from '../panels/AboutPanel';
import ContactPanel from '../panels/ContactPanel';
import ProjectsPanel from '../panels/ProjectsPanel';
import ResumePanel from '../panels/ResumePanel';
import SpaceScene from './SpaceScene';
import PlanetPanel from './PlanetPanel';
import { planets, type PlanetId } from '../../data/planets';
import { type RocketControlsState } from './useRocketControls';
import '../../space.css';

interface SpaceExperienceProps {
  isNightMode: boolean;
  classicPortfolio: ReactNode;
}

const DirectionalKeyDisplay = () => {
  return (
    <div className="space-key-cross-wrap">
      <div className="space-key-cross">
        <span className="space-key-cross-empty" />
        <div className="space-key-cross-cell">
          <span className="space-key-action">Thrust</span>
          <kbd className="space-keycap">Up</kbd>
        </div>
        <span className="space-key-cross-empty" />

        <div className="space-key-cross-cell">
          <kbd className="space-keycap">Left</kbd>
          <span className="space-key-action">Steer</span>
        </div>
        <span className="space-key-cross-center" />
        <div className="space-key-cross-cell">
          <kbd className="space-keycap">Right</kbd>
          <span className="space-key-action">Steer</span>
        </div>

        <span className="space-key-cross-empty" />
        <div className="space-key-cross-cell">
          <kbd className="space-keycap">Down</kbd>
          <span className="space-key-action">Reverse</span>
        </div>
        <span className="space-key-cross-empty" />
      </div>
    </div>
  );
};

const initialTouchControls: RocketControlsState = {
  forward: false,
  backward: false,
  left: false,
  right: false
};

const SpaceExperience = ({ isNightMode, classicPortfolio }: SpaceExperienceProps) => {
  const [selectedPlanetId, setSelectedPlanetId] = useState<PlanetId | null>(null);
  const [nearestPlanetId, setNearestPlanetId] = useState<PlanetId | null>(null);
  const [showClassicView, setShowClassicView] = useState(false);
  const [touchControls, setTouchControls] = useState<RocketControlsState>(initialTouchControls);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedPlanetId(null);
        return;
      }

    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const panelContent = useMemo(() => {
    switch (selectedPlanetId) {
      case 'projects':
        return <ProjectsPanel isNightMode={isNightMode} />;
      case 'about':
        return <AboutPanel isNightMode={isNightMode} />;
      case 'resume':
        return <ResumePanel isNightMode={isNightMode} />;
      case 'contact':
        return <ContactPanel isNightMode={isNightMode} />;
      default:
        return null;
    }
  }, [isNightMode, selectedPlanetId]);

  const nearestPlanet = planets.find((planet) => planet.id === nearestPlanetId) ?? null;
  const bindTouchControl = (control: keyof RocketControlsState) => ({
    onPointerDown: (event: PointerEvent<HTMLButtonElement>) => {
      event.preventDefault();
      setTouchControls((current) => ({ ...current, [control]: true }));
    },
    onPointerUp: () => setTouchControls((current) => ({ ...current, [control]: false })),
    onPointerLeave: () => setTouchControls((current) => ({ ...current, [control]: false })),
    onPointerCancel: () => setTouchControls((current) => ({ ...current, [control]: false })),
    onContextMenu: (event: MouseEvent<HTMLButtonElement>) => event.preventDefault()
  });

  if (showClassicView) {
    return (
      <div className="space-classic-wrapper">
        <div className="space-return-bar">
          <button type="button" className="space-ghost-button" onClick={() => setShowClassicView(false)}>
            Return to flight mode
          </button>
        </div>
        {classicPortfolio}
      </div>
    );
  }

  return (
    <section className="space-experience-shell">
      <SpaceScene
        isNightMode={isNightMode}
        panelOpen={selectedPlanetId !== null}
        selectedPlanetId={selectedPlanetId}
        touchControls={touchControls}
        onNearestPlanetChange={setNearestPlanetId}
        onPlanetSelect={setSelectedPlanetId}
      />

      <div className="space-hud">
        <div className="space-hud-top">
          <div className="space-status-card">
            <p>Flight status</p>
            <strong>{nearestPlanet ? `Near ${nearestPlanet.title}` : 'Exploring deep space'}</strong>
            <span>{nearestPlanet ? 'Fly into the planet to open its destination panel' : 'Hold and drag to look around, or single click a planet to open it'}</span>
            <div className="space-status-keys">
              <DirectionalKeyDisplay />
            </div>
            <div className="space-mobile-gesture-guide">
              <span>Use the D-pad below to move</span>
              <span>Tap a planet to open it</span>
            </div>
          </div>
          <div className="space-hud-actions">
            <button type="button" className="space-ghost-button" onClick={() => setShowClassicView(true)}>
              Skip to classic view
            </button>
          </div>
        </div>

        <div className="space-mobile-controls" aria-label="Touch flight controls">
          <div className="space-mobile-dpad">
            <span className="space-mobile-dpad-empty" />
            <button type="button" className="space-touch-button" {...bindTouchControl('backward')}>
              Up
            </button>
            <span className="space-mobile-dpad-empty" />

            <button type="button" className="space-touch-button" {...bindTouchControl('left')}>
              Left
            </button>
            <span className="space-mobile-dpad-center" />
            <button type="button" className="space-touch-button" {...bindTouchControl('right')}>
              Right
            </button>

            <span className="space-mobile-dpad-empty" />
            <button type="button" className="space-touch-button" {...bindTouchControl('forward')}>
              Down
            </button>
            <span className="space-mobile-dpad-empty" />
          </div>
        </div>

        <div className="space-planet-strip">
          {planets.map((planet) => (
            <button
              key={planet.id}
              type="button"
              className={`space-planet-chip ${nearestPlanetId === planet.id || selectedPlanetId === planet.id ? 'is-active' : ''}`}
              onClick={() => setSelectedPlanetId(planet.id)}
            >
              <span className="space-planet-dot" style={{ background: planet.color }} />
              {planet.title}
            </button>
          ))}
        </div>
      </div>

      <PlanetPanel
        planetId={selectedPlanetId}
        isNightMode={isNightMode}
        onClose={() => {
          setSelectedPlanetId(null);
          setTouchControls(initialTouchControls);
        }}
      >
        {panelContent}
      </PlanetPanel>
    </section>
  );
};

export default SpaceExperience;
