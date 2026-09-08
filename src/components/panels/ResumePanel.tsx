import { motion } from 'framer-motion';

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
      <h3>Frontend-focused builder with product instincts</h3>
      <p>
        I ship polished interfaces, mobile experiences, and product-minded web work with a bias toward clarity, execution, and finishing details.
      </p>
      <div className="space-resume-grid">
        <div>
          <span>Core focus</span>
          <strong>React, React Native, TypeScript, product UI</strong>
        </div>
        <div>
          <span>Strengths</span>
          <strong>Frontend craft, mobile UX, shipping mindset</strong>
        </div>
        <div>
          <span>Environment</span>
          <strong>Agency, product, founder-mode, and solo builds</strong>
        </div>
        <div>
          <span>Best fit</span>
          <strong>Teams that want polish, ownership, and practical engineering</strong>
        </div>
      </div>
      <a href="mailto:mriansabado@gmail.com?subject=Resume%20Request" className="space-panel-link">
        Request full resume
      </a>
    </motion.section>
  );
};

export default ResumePanel;
