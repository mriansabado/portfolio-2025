import { motion, AnimatePresence } from 'framer-motion';
import type { ReactNode } from 'react';
import { planets, type PlanetId } from '../../data/planets';

interface PlanetPanelProps {
  planetId: PlanetId | null;
  isNightMode: boolean;
  onClose: () => void;
  children: ReactNode;
}

const PlanetPanel = ({ planetId, isNightMode, onClose, children }: PlanetPanelProps) => {
  const planet = planets.find((entry) => entry.id === planetId);

  return (
    <AnimatePresence>
      {planet ? (
        <motion.div
          className="space-panel-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="space-panel-shell"
            style={{
              background: isNightMode
                ? 'linear-gradient(180deg, rgba(2,6,23,0.94), rgba(15,23,42,0.96))'
                : 'linear-gradient(180deg, rgba(30,27,75,0.94), rgba(15,23,42,0.96))',
              borderColor: `${planet.accent}33`
            }}
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.25 }}
          >
            <div className="space-panel-header">
              <div className="space-panel-heading-copy">
                <p className="space-panel-kicker" style={{ color: planet.accent }}>
                  {planet.subtitle}
                </p>
                <h2>{planet.title}</h2>
                <p>{planet.description}</p>
              </div>
              <button type="button" onClick={onClose} className="space-close-button">
                Close
              </button>
            </div>
            <div className="space-panel-content">{children}</div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default PlanetPanel;
