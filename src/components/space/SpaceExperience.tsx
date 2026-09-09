import { useEffect, useMemo, useState, type MouseEvent, type PointerEvent, type ReactNode } from 'react';
import AboutPanel from '../panels/AboutPanel';
import ContactPanel from '../panels/ContactPanel';
import ProjectsPanel from '../panels/ProjectsPanel';
import ResumePanel from '../panels/ResumePanel';
import SpaceScene from './SpaceScene';
import PlanetPanel from './PlanetPanel';
import {
  isSpaceAudioMuted,
  playSpaceSound,
  setSpaceAudioMuted,
  setThrusterLevel,
  unlockSpaceAudio
} from './spaceAudio';
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
  const [fireSignal, setFireSignal] = useState(0);
  const [lastClosedPlanetId, setLastClosedPlanetId] = useState<PlanetId | null>(null);
  const [lastClosedPlanetKey, setLastClosedPlanetKey] = useState(0);
  const [introActive, setIntroActive] = useState(true);
  const [showWelcomeCard, setShowWelcomeCard] = useState(true);
  const [audioMuted, setAudioMuted] = useState(() => isSpaceAudioMuted());

  const dismissIntro = () => {
    void unlockSpaceAudio();
    setIntroActive(false);
    setShowWelcomeCard(false);
  };

  const triggerFire = () => {
    dismissIntro();
    setFireSignal((current) => current + 1);
  };

  const selectPlanet = (planetId: PlanetId) => {
    void unlockSpaceAudio();
    if (planetId !== selectedPlanetId) {
      playSpaceSound('select');
    }
    setSelectedPlanetId(planetId);
  };

  const toggleAudio = () => {
    void unlockSpaceAudio();
    const next = !audioMuted;
    setSpaceAudioMuted(next);
    setAudioMuted(next);
    if (!next) {
      playSpaceSound('ui');
    } else {
      setThrusterLevel(0);
    }
  };

  useEffect(() => {
    const welcomeTimer = window.setTimeout(() => {
      setShowWelcomeCard(false);
    }, 10000);

    const handleKeyDown = (event: KeyboardEvent) => {
      void unlockSpaceAudio();

      if (event.key === 'Escape') {
        setSelectedPlanetId((current) => {
          if (current) {
            playSpaceSound('ui');
          }
          return null;
        });
        return;
      }

      if (event.key === ' ') {
        event.preventDefault();
        if (!event.repeat) {
          triggerFire();
        }
        return;
      }

      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
        dismissIntro();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(welcomeTimer);
      window.removeEventListener('keydown', handleKeyDown);
      setThrusterLevel(0);
    };
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
      dismissIntro();
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
        introActive={introActive}
        panelOpen={selectedPlanetId !== null}
        selectedPlanetId={selectedPlanetId}
        lastClosedPlanetId={lastClosedPlanetId}
        lastClosedPlanetKey={lastClosedPlanetKey}
        fireSignal={fireSignal}
        touchControls={touchControls}
        onNearestPlanetChange={setNearestPlanetId}
        onPlanetSelect={selectPlanet}
      />

      <div className="space-hud">
        <div className="space-hud-top">
          {showWelcomeCard ? (
            <div className="space-welcome-card">
              <p>Aloha aboard</p>
              <strong>Explore Ian&apos;s portfolio in flight mode</strong>
              <span>Fly around to explore the site, or jump to classic view if you&apos;d rather browse the warm and grounded version.</span>
            </div>
          ) : null}
          <div className="space-status-card">
            <p>Flight status</p>
            <strong>{nearestPlanet ? `Near ${nearestPlanet.title}` : 'Exploring deep space'}</strong>
            <span>{nearestPlanet ? 'Fly into the planet to open its destination panel' : 'Hold and drag to look around, or single click a planet to open it'}</span>
            <div className="space-status-keys">
              <DirectionalKeyDisplay />
            </div>
            <div className="space-fire-hint">
              <span>Fire</span>
              <kbd className="space-keycap">Space</kbd>
            </div>
            <div className="space-mobile-gesture-guide">
              <span>Use the D-pad below to move</span>
              <span>Tap a planet to open it</span>
            </div>
          </div>
          <div className="space-hud-actions">
            <button type="button" className="space-ghost-button" onClick={toggleAudio} aria-pressed={audioMuted}>
              {audioMuted ? 'Sound off' : 'Sound on'}
            </button>
            <button type="button" className="space-ghost-button" onClick={() => {
              setThrusterLevel(0);
              setShowClassicView(true);
            }}>
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

        <div className="space-mobile-fire-wrap">
          <button
            type="button"
            className="space-touch-button space-fire-button"
            onPointerDown={(event) => {
              event.preventDefault();
              triggerFire();
            }}
            onContextMenu={(event) => event.preventDefault()}
          >
            Fire
          </button>
        </div>

        <div className="space-planet-strip">
          {planets.map((planet) => (
            <button
              key={planet.id}
              type="button"
              className={`space-planet-chip ${nearestPlanetId === planet.id || selectedPlanetId === planet.id ? 'is-active' : ''}`}
              onClick={() => selectPlanet(planet.id)}
            >
              <span className="space-planet-dot" style={{ background: planet.accent }} />
              {planet.title}
            </button>
          ))}
        </div>
      </div>

      <PlanetPanel
        planetId={selectedPlanetId}
        isNightMode={isNightMode}
        onClose={() => {
          playSpaceSound('ui');
          if (selectedPlanetId) {
            setLastClosedPlanetId(selectedPlanetId);
            setLastClosedPlanetKey((current) => current + 1);
          }
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
