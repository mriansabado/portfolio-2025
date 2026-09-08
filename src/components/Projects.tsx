import { motion } from 'framer-motion';
import type { ReactElement } from 'react';
import postachio from '../assets/postachio.png';
import pocketsay from '../assets/pocketsay.png';
import pocketsayLogo from '../assets/pocketsay-logo.png';
import tasqlyLogo from '../assets/tasqly-logo.png';
import { FaAws, FaReact } from 'react-icons/fa';
import { SiExpo, SiVercel, SiVuedotjs } from 'react-icons/si';
import { projects as sharedProjects } from '../data/content';

interface ProjectsProps {
  isNightMode?: boolean;
}

interface Project {
  title: string;
  type: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  liveUrl: string;
  ctaLabel: string;
  placeholderTint?: string;
}

const projects: Project[] = sharedProjects.map((project) => ({
  ...project,
  imageUrl:
    project.title === 'PocketSay' ? pocketsay : project.title === 'Postachio' ? postachio : undefined,
  placeholderTint: project.title === 'Tasqly' ? '#0f766e' : undefined
}));

const techIconMap: Record<string, ReactElement> = {
  React: <FaReact className="h-4 w-4" />,
  Vue: <SiVuedotjs className="h-4 w-4" />,
  AWS: <FaAws className="h-4 w-4" />,
  Vercel: <SiVercel className="h-4 w-4" />,
  'React Native': <FaReact className="h-4 w-4" />,
  Expo: <SiExpo className="h-4 w-4" />
};

const projectLogoMap: Record<string, string> = {
  PocketSay: pocketsayLogo,
  Tasqly: tasqlyLogo
};

const Projects = ({ isNightMode = false }: ProjectsProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.16
      }
    }
  };

  const projectVariants = {
    hidden: { 
      opacity: 0,
      y: 40
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.25,
        duration: 0.7
      }
    }
  };


  return (
    <motion.section 
      className='py-12 sm:py-16 md:py-20 relative overflow-hidden'
      style={{
        background: isNightMode
          ? 'linear-gradient(to bottom, rgba(15,23,42,0.2), rgba(17,24,39,0.82))'
          : 'linear-gradient(to bottom, rgba(49,46,129,0.16), rgba(15,23,42,0.8))',
        paddingTop: '2rem'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.05)_1px,transparent_1px)] bg-[size:54px_54px] opacity-20" />
      <div className="absolute top-10 right-[8%] h-24 w-24 rounded-full border border-amber-200/15" />
      <div className="absolute bottom-16 left-[10%] h-16 w-40 rounded-full border border-rose-200/10" />
      <div className='container mx-auto px-4 sm:px-6 relative z-10'>
        <motion.p
          className='text-sm font-semibold uppercase tracking-[0.2em] mb-3 text-center'
          style={{ color: '#fcd34d' }}
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.16 }}
        >
          Selected work
        </motion.p>
        <motion.h2 
          className='text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter mb-3 sm:mb-4 text-center'
          style={{ color: '#f8fafc' }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          A few things I&apos;ve shipped
        </motion.h2>
        <motion.p 
          className='text-sm sm:text-base text-center mb-8 sm:mb-12 max-w-2xl mx-auto px-4 leading-relaxed'
          style={{ color: '#cbd5e1' }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          A mix of mobile and web products shaped by real users, real constraints, and a steady preference for software that feels useful and approachable.
        </motion.p>
        
        <motion.div 
          className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full'
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              className='stack-card relative p-3 sm:p-4'
              style={{
                background: isNightMode
                  ? 'linear-gradient(180deg, rgba(15,23,42,0.92), rgba(30,41,59,0.72))'
                  : 'linear-gradient(180deg, rgba(30,27,75,0.92), rgba(30,41,59,0.74))'
              }}
              variants={projectVariants}
              whileHover={{
                y: -6,
                rotate: index % 2 === 0 ? -0.4 : 0.4,
                boxShadow: '0 26px 50px rgba(2,6,23,0.35)',
                transition: {
                  type: "spring",
                  stiffness: 260,
                  damping: 22
                }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div 
                className='relative h-44 sm:h-52 overflow-hidden rounded-[1.35rem]'
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {project.imageUrl ? (
                <img 
                  src={project.imageUrl} 
                  alt={project.title}
                  className={`w-full h-full object-cover ${
                    project.title === 'Postachio' ? 'object-top' : ''
                  }`}
                />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center text-white text-4xl sm:text-5xl font-bold tracking-tight"
                    style={{
                      background: project.placeholderTint
                        ? `linear-gradient(135deg, ${project.placeholderTint}, #134e4a)`
                        : 'linear-gradient(135deg, #312e81, #0f172a)'
                    }}
                    aria-hidden
                  >
                    {project.title.slice(0, 1)}
                  </div>
                )}
                <div className="absolute left-4 top-4 rounded-full bg-slate-950/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-200">
                  {project.type}
                </div>
              </motion.div>
              
              <div className='p-4 sm:p-6'>
                <div className='flex items-start justify-between gap-3 mb-3'>
                  <div>
                    <p className='text-xs uppercase tracking-[0.16em] mb-2' style={{ color: '#94a3b8' }}>
                      {index === 0 ? 'Built for independent workers' : index === 1 ? 'Live on the App Store' : 'Built from the product side'}
                    </p>
                    <div className="flex items-center gap-3">
                      {projectLogoMap[project.title] ? (
                        <img
                          src={projectLogoMap[project.title]}
                          alt={`${project.title} logo`}
                          className="h-10 w-10 rounded-2xl border border-slate-400/15 bg-white/5 object-cover p-1"
                        />
                      ) : null}
                      <h3 className='text-xl sm:text-2xl font-bold' style={{ color: '#f8fafc' }}>{project.title}</h3>
                    </div>
                  </div>
                  <div
                    className="rounded-2xl px-3 py-2 text-xs font-semibold"
                    style={{
                      background: 'rgba(251, 191, 36, 0.08)',
                      color: '#fde68a',
                      border: '1px solid rgba(251, 191, 36, 0.16)'
                    }}
                  >
                    {project.technologies[0]}
                  </div>
                </div>
                <p className='text-sm sm:text-base md:text-lg mb-4 sm:mb-5 leading-relaxed' style={{ color: '#e2e8f0' }}>{project.description}</p>
                
                <div className='flex flex-wrap gap-2 mb-4 sm:mb-5'>
                  {project.technologies.map((tech, techIndex) => (
                    <motion.span 
                      key={techIndex}
                      className='px-3 py-1 rounded-full text-xs sm:text-sm font-medium inline-flex items-center gap-2'
                      style={{
                        background: 'rgba(15, 23, 42, 0.45)',
                        color: '#cbd5e1',
                        border: '1px solid rgba(148, 163, 184, 0.16)'
                      }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * techIndex }}
                      whileHover={{ 
                        scale: 1.05
                      }}
                    >
                      {techIconMap[tech] ?? null}
                      {tech}
                    </motion.span>
                  ))}
                </div>
                
                <div className='flex gap-4'>
                  {project.liveUrl !== '#' ? (
                    <motion.a 
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className='flex-1 text-center px-4 py-3 rounded-2xl text-sm sm:text-base font-semibold transition'
                      style={{
                        background: 'linear-gradient(135deg, #fcd34d 0%, #fb7185 52%, #c4b5fd 100%)',
                        color: '#0f172a',
                        boxShadow: '0 10px 22px rgba(251,113,133,0.18)',
                        border: 'none'
                      }}
                      whileHover={{ 
                        scale: 1.02,
                        y: -1
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {project.ctaLabel}
                    </motion.a>
                  ) : (
                    <motion.div 
                      className='flex-1 text-center px-4 py-3 rounded-2xl text-sm sm:text-base font-semibold cursor-not-allowed'
                      style={{
                        background: 'rgba(15,23,42,0.5)',
                        color: '#94a3b8',
                        border: '1px solid rgba(148,163,184,0.2)'
                      }}
                    >
                      In Development
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Projects;