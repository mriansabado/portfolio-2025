import { motion } from 'framer-motion';
import { strengths } from '../../data/content';

interface AboutPanelProps {
  isNightMode: boolean;
}

const AboutPanel = ({ isNightMode }: AboutPanelProps) => {
  return (
    <div className="space-panel-grid">
      {strengths.map((strength, index) => (
        <motion.article
          key={strength.title}
          className="space-panel-card"
          style={{
            background: isNightMode
              ? 'linear-gradient(180deg, rgba(15,23,42,0.92), rgba(30,41,59,0.78))'
              : 'linear-gradient(180deg, rgba(49,46,129,0.92), rgba(30,41,59,0.78))'
          }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: index * 0.04 }}
        >
          <div className="space-panel-icon">{strength.icon}</div>
          <p className="space-panel-eyebrow">{strength.eyebrow}</p>
          <h3>{strength.title}</h3>
          <p>{strength.description}</p>
          <p className="space-panel-note">{strength.note}</p>
        </motion.article>
      ))}
    </div>
  );
};

export default AboutPanel;
