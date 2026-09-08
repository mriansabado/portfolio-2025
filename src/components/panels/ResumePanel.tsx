import { motion } from 'framer-motion';
import { FaAws, FaReact } from 'react-icons/fa';
import { SiVercel, SiVuedotjs } from 'react-icons/si';
import profilePhoto from '../../assets/profile-photo.jpg';
import { resumeFocusAreas, resumeQuickFacts, resumeRequestHref, resumeSummary } from '../../data/resume';

interface ResumePanelProps {
  isNightMode: boolean;
}

const ResumePanel = ({ isNightMode }: ResumePanelProps) => {
  const logoIcons = [FaReact, SiVuedotjs, FaAws, SiVercel];

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
      <div className="space-resume-focus-list">
        {resumeQuickFacts.map((fact) => (
          <div key={fact}>
            <strong>{fact}</strong>
          </div>
        ))}
      </div>
      <h3>{resumeSummary.headline}</h3>
      <p>{resumeSummary.intro}</p>
      <div className="space-resume-profile">
        <img src={profilePhoto} alt="Ian Sabado" className="space-resume-photo" />
        <div className="space-resume-stack">
          <span>Often working with</span>
          <div className="space-resume-logo-row">
            {logoIcons.map((Icon, index) => (
              <div key={index} className="space-resume-logo-chip" aria-hidden>
                <Icon />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="space-resume-focus-list">
        {resumeFocusAreas.map((area) => (
          <div key={area}>
            <strong>{area}</strong>
          </div>
        ))}
      </div>
      <div className="space-resume-grid">
        {resumeSummary.highlights.map((item) => (
          <div key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </div>
        ))}
      </div>
      <a href={resumeRequestHref} className="space-panel-link">
        Request full resume
      </a>
    </motion.section>
  );
};

export default ResumePanel;
