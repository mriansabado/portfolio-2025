import { motion } from 'framer-motion';
import { contactSummary, socialLinks } from '../../data/content';

interface ContactPanelProps {
  isNightMode: boolean;
}

const ContactPanel = ({ isNightMode }: ContactPanelProps) => {
  return (
    <div className="space-contact-layout">
      <motion.section
        className="space-panel-card"
        style={{
          background: isNightMode
            ? 'linear-gradient(180deg, rgba(15,23,42,0.92), rgba(30,41,59,0.78))'
            : 'linear-gradient(180deg, rgba(49,46,129,0.92), rgba(30,41,59,0.78))'
        }}
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <p className="space-panel-eyebrow">Reach me directly</p>
        <h3>Open to frontend, mobile, and product-focused roles</h3>
        <p>Best fit: teams that care about polished UX, practical engineering, and building software with a high level of care.</p>
        <div className="space-contact-list">
          <a href={`mailto:${contactSummary.email}`}>{contactSummary.email}</a>
          <a href={`tel:${contactSummary.phone.replace(/-/g, '')}`}>{contactSummary.phone}</a>
          <span>{contactSummary.location}</span>
        </div>
      </motion.section>

      <motion.section
        className="space-panel-card"
        style={{
          background: isNightMode
            ? 'linear-gradient(180deg, rgba(15,23,42,0.92), rgba(30,41,59,0.78))'
            : 'linear-gradient(180deg, rgba(49,46,129,0.92), rgba(30,41,59,0.78))'
        }}
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <p className="space-panel-eyebrow">Elsewhere on the internet</p>
        <div className="space-social-list">
          {socialLinks.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="space-panel-link">
              {link.label}
            </a>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default ContactPanel;
