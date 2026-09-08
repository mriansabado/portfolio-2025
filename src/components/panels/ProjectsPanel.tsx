import { motion } from 'framer-motion';
import type { ReactElement } from 'react';
import { FaAws, FaReact } from 'react-icons/fa';
import { SiExpo, SiVercel, SiVuedotjs } from 'react-icons/si';
import { projects } from '../../data/content';

interface ProjectsPanelProps {
  isNightMode: boolean;
}

const ProjectsPanel = ({ isNightMode }: ProjectsPanelProps) => {
  const techIconMap: Record<string, ReactElement> = {
    React: <FaReact />,
    Vue: <SiVuedotjs />,
    AWS: <FaAws />,
    Vercel: <SiVercel />,
    'React Native': <FaReact />,
    Expo: <SiExpo />
  };

  return (
    <div className="space-panel-grid">
      {projects.map((project) => (
        <motion.article
          key={project.title}
          className="space-panel-card"
          style={{
            background: isNightMode
              ? 'linear-gradient(180deg, rgba(15,23,42,0.92), rgba(30,41,59,0.78))'
              : 'linear-gradient(180deg, rgba(49,46,129,0.92), rgba(30,41,59,0.78))'
          }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="space-panel-meta">
            <span>{project.type}</span>
            <span>{project.status}</span>
          </div>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <div className="space-tech-list">
            {project.technologies.map((tech) => (
              <span key={tech} className="inline-flex items-center gap-2">
                {techIconMap[tech] ?? null}
                {tech}
              </span>
            ))}
          </div>
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="space-panel-link">
            {project.ctaLabel}
          </a>
        </motion.article>
      ))}
    </div>
  );
};

export default ProjectsPanel;
