import { motion } from 'framer-motion';
import { resumeSummary } from '../../data/resume';

interface ResumePanelProps {
  isNightMode: boolean;
}

const ResumePanel = ({ isNightMode }: ResumePanelProps) => {
  return (
    <motion.section
      className="space-panel-card space-resume-panel"
      style={{
        background: isNightMode
          ? 'linear-gradient(180deg, rgba(15,23,42,0.92), rgba(30,41,59,0.78))'
          : 'linear-gradient(180deg, rgba(49,46,129,0.92), rgba(30,41,59,0.78))'
      }}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <p className="space-panel-eyebrow">Resume snapshot</p>
      <h3>{resumeSummary.headline}</h3>
      <p>{resumeSummary.intro}</p>
      <div className="space-resume-grid">
        {resumeSummary.highlights.map((item) => (
          <div key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </div>
        ))}
      </div>
      <a href="mailto:mriansabado@gmail.com?subject=Resume%20Request" className="space-panel-link">
        Request full resume
      </a>
    </motion.section>
  );
};

export default ResumePanel;
