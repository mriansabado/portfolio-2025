import { useEffect, useMemo, useState, type ReactNode } from 'react';
import AboutPanel from '../panels/AboutPanel';
import ContactPanel from '../panels/ContactPanel';
import ProjectsPanel from '../panels/ProjectsPanel';
import ResumePanel from '../panels/ResumePanel';
import SpaceScene from './SpaceScene';
import PlanetPanel from './PlanetPanel';
import { planets, type PlanetId } from '../../data/planets';
import '../../space.css';

interface SpaceExperienceProps {
  isNightMode: boolean;
  classicPortfolio: ReactNode;
}

const IntroPanel = () => {
  return (
    <section className="space-intro-panel">
      <div className="space-intro-copy">
        <p className="space-panel-eyebrow">San Diego based frontend and mobile developer</p>
        <h3>I build products with care and follow-through.</h3>
        <p>
          Fly between planets to explore projects, strengths, resume highlights, and ways to connect. This portfolio is meant to feel a little playful without getting in the way of the actual work.
        </p>
      </div>
      <div className="space-resume-grid">
        <div>
          <span>Mission</span>
          <strong>Find the planets, then dock for the details</strong>
        </div>
        <div>
          <span>Controls</span>
          <strong>Arrow down thrust, arrow up reverse, left and right steer</strong>
        </div>
      </div>
    </section>
  );
};

const SpaceExperience = ({ isNightMode, classicPortfolio }: SpaceExperienceProps) => {
  const [selectedPlanetId, setSelectedPlanetId] = useState<PlanetId | null>(null);
  const [nearestPlanetId, setNearestPlanetId] = useState<PlanetId | null>(null);
  const [showClassicView, setShowClassicView] = useState(false);
  const [showControlsHint, setShowControlsHint] = useState(true);

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

  useEffect(() => {
    if (!showControlsHint) {
      return;
    }

    const timer = window.setTimeout(() => setShowControlsHint(false), 7000);
    return () => window.clearTimeout(timer);
  }, [showControlsHint]);

  const panelContent = useMemo(() => {
    switch (selectedPlanetId) {
      case 'intro':
        return <IntroPanel />;
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
        onNearestPlanetChange={setNearestPlanetId}
        onPlanetSelect={setSelectedPlanetId}
      />

      <div className="space-hud">
        <div className="space-hud-top">
          <div className="space-status-card">
            <p>Flight status</p>
            <strong>{nearestPlanet ? `Near ${nearestPlanet.title}` : 'Exploring deep space'}</strong>
            <span>{nearestPlanet ? 'Fly into the planet to open its destination panel' : 'Cruise toward a beacon planet to open a destination'}</span>
          </div>
          <div className="space-hud-actions">
            <button type="button" className="space-ghost-button" onClick={() => setShowClassicView(true)}>
              Skip to classic view
            </button>
          </div>
        </div>

        {showControlsHint ? (
          <div className="space-controls-hint">
            <strong>Controls</strong>
            <span>Down = thrust</span>
            <span>Up = reverse</span>
            <span>Left/Right = steer</span>
            <span>Touch a planet to open</span>
          </div>
        ) : null}

        <div className="space-planet-strip">
          {planets
            .filter((planet) => planet.id !== 'intro')
            .map((planet) => (
              <button
                key={planet.id}
                type="button"
                className={`space-planet-chip ${nearestPlanetId === planet.id ? 'is-active' : ''}`}
                onClick={() => setSelectedPlanetId(planet.id)}
              >
                <span className="space-planet-dot" style={{ background: planet.color }} />
                {planet.title}
              </button>
            ))}
        </div>
      </div>

      <PlanetPanel planetId={selectedPlanetId} isNightMode={isNightMode} onClose={() => setSelectedPlanetId(null)}>
        {panelContent}
      </PlanetPanel>
    </section>
  );
};

export default SpaceExperience;
