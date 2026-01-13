import { motion } from 'framer-motion';
import intime from '../assets/intime.png';
import barblendGuru from '../assets/jamscribe.png';
import zenscan from '../assets/zenscan.png';
import pepTalkAI from '../assets/peptalk.png';
import postachio from '../assets/postachio.png';
import pocketsay from '../assets/pocketsay.png';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  liveUrl: string;
}

interface ProjectsProps {
  isNightMode?: boolean;
}

const projects: Project[] = [
  {
    title: "Postachio",
    description: "AI-powered social media content creation platform solving content creator challenges with writer's block and algorithm optimization. Features real-time AI content generation using Anthropic Claude API.",
    technologies: ["React", "TypeScript", "Firebase", "Anthropic Claude API", "Stripe", "Tailwind CSS"],
    imageUrl: postachio,
    liveUrl: "https://postachio.app/"
  },
  {
    title: "PocketSay",
    description: "React Native communication app built to solve a real need: silent communication during baby's sleep. Features theme-adaptive Lottie animations and demonstrates single-codebase native app delivery.",
    technologies: ["React Native", "TypeScript", "Lottie Animations", "iOS", "Android"],
    imageUrl: pocketsay,
    liveUrl: "https://pocket-say-support.vercel.app/"
  },
  {
    title: "PepTalk AI",
    description: "Serverless AI application delivering personalized encouragement and motivation. Architecture optimizes cost efficiency while maintaining fast response times through AWS Lambda and API Gateway.",
    technologies: ["AWS Lambda", "API Gateway", "Anthropic Claude API", "React", "TypeScript", "Material-UI"],
    imageUrl: pepTalkAI,
    liveUrl: "https://main.d138p9067mvylk.amplifyapp.com/"
  },
  {
    title: "JamScribe",
    description: "Web app that transcribes YouTube videos into synchronized guitar chords and lyrics using OpenAI Whisper API and Essentia.js for chord detection. Addressing gaps in existing music transcription tools.",
    technologies: ["React", "TypeScript", "OpenAI Whisper API", "Essentia.js", "YouTube API"],
    imageUrl: barblendGuru,
    liveUrl: "#"
  },
  {
    title: "InTime",
    description: "Musician-focused metronome built for Apple Watch. Features intuitive tap-to-set tempo functionality, allowing musicians to set their beat by tapping rather than scrolling through values.",
    technologies: ["Swift", "SwiftUI", "watchOS"],
    imageUrl: intime,
    liveUrl: "#"
  },
  {
    title: "ZenScan",
    description: "Mobile app streamlining e-commerce inventory management across Wix, Shopify, and WordPress. Users capture product photos, input details and SKUs, then export platform-specific CSV files for bulk upload.",
    technologies: ["React Native", "Camera API", "CSV Generation", "Platform Integration"],
    imageUrl: zenscan,
    liveUrl: "#"
  }
];

const Projects = ({ isNightMode = false }: ProjectsProps) => {
  // Animation variants for container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2 // Stagger children animations by 0.2s
      }
    }
  };

  // Animation variants for each project card
  const projectVariants = {
    hidden: { 
      opacity: 0,
      y: 50
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8
      }
    }
  };


  return (
    <motion.section 
      className='py-12 sm:py-16 md:py-20 relative overflow-hidden'
      style={{
        background: isNightMode
          ? 'linear-gradient(to bottom, #0f172a, #1e293b)'
          : 'linear-gradient(to bottom, #fef3e2, #fff9f0)',
        paddingTop: '2rem'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Decorative background elements */}
      {isNightMode ? (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/5 to-indigo-900/10" />
          <div className="absolute top-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-blue-800/10 rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-purple-800/10 rounded-full filter blur-3xl translate-x-1/2 translate-y-1/2" />
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-orange-200/20 via-yellow-100/15 to-pink-200/20" />
          <div className="absolute top-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-orange-300/15 rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-pink-300/15 rounded-full filter blur-3xl translate-x-1/2 translate-y-1/2" />
        </>
      )}
      <div className='container mx-auto px-4 sm:px-6 relative z-10'>
        <motion.h2 
          className='text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter mb-3 sm:mb-4 text-center'
          style={{ 
            color: isNightMode ? '#f1f5f9' : '#1a1a1a',
            textShadow: isNightMode 
              ? '2px 2px 4px rgba(0,0,0,0.5)' 
              : '2px 2px 4px rgba(0,0,0,0.1)'
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Featured Projects
        </motion.h2>
        <motion.p 
          className='text-sm sm:text-base text-gray-400 text-center mb-8 sm:mb-12 max-w-2xl mx-auto px-4'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
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
              className='relative rounded-lg sm:rounded-xl overflow-hidden'
              style={{
                background: isNightMode ? '#1e293b' : 'white',
                boxShadow: isNightMode
                  ? '0 8px 24px rgba(0,0,0,0.4), 0 4px 8px rgba(0,0,0,0.2)'
                  : '0 8px 24px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.08)',
                transformStyle: 'preserve-3d',
                border: isNightMode ? '1px solid rgba(148, 163, 184, 0.2)' : 'none'
              }}
              variants={projectVariants}
              whileHover={{
                scale: 1.05,
                rotateY: 5,
                rotateX: 2,
                z: 30,
                boxShadow: '0 20px 48px rgba(0,0,0,0.2), 0 8px 16px rgba(0,0,0,0.15)',
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div 
                className='relative h-40 sm:h-48 overflow-hidden'
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src={project.imageUrl} 
                  alt={project.title}
                  className={`w-full h-full object-cover ${
                    project.title === 'Postachio' ? 'object-top' : ''
                  }`}
                />
                <motion.div 
                  className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent'
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
              
              <div className='p-4 sm:p-6'>
                <h3 className='text-base sm:text-lg md:text-xl font-bold mb-2' style={{ color: isNightMode ? '#f1f5f9' : '#1a1a1a' }}>{project.title}</h3>
                <p className='text-xs sm:text-sm md:text-base mb-3 sm:mb-4' style={{ color: isNightMode ? '#cbd5e1' : '#4a4a4a' }}>{project.description}</p>
                
                <div className='flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4'>
                  {project.technologies.map((tech, techIndex) => (
                    <motion.span 
                      key={techIndex}
                      className='px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium'
                      style={{
                        background: isNightMode
                          ? 'linear-gradient(135deg, #334155 0%, #475569 100%)'
                          : 'linear-gradient(135deg, #fff5e6 0%, #ffe4cc 100%)',
                        color: isNightMode ? '#94a3b8' : '#ea580c',
                        border: isNightMode
                          ? '1px solid rgba(148, 163, 184, 0.3)'
                          : '1px solid rgba(234, 88, 12, 0.2)',
                        boxShadow: isNightMode
                          ? '0 2px 4px rgba(0,0,0,0.3)'
                          : '0 2px 4px rgba(234, 88, 12, 0.1)'
                      }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * techIndex }}
                      whileHover={{ 
                        scale: 1.1, 
                        background: isNightMode
                          ? 'linear-gradient(135deg, #475569 0%, #64748b 100%)'
                          : 'linear-gradient(135deg, #ffe4cc 0%, #ffd4a3 100%)',
                        boxShadow: isNightMode
                          ? '0 4px 8px rgba(0,0,0,0.4)'
                          : '0 4px 8px rgba(234, 88, 12, 0.2)'
                      }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
                
                <div className='flex gap-4'>
                  {project.liveUrl !== "#" ? (
                    <motion.a 
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className='flex-1 text-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base font-semibold transition'
                      style={{
                        background: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)',
                        color: 'white',
                        boxShadow: '0 4px 12px rgba(234, 88, 12, 0.3)',
                        border: 'none'
                      }}
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: '0 6px 20px rgba(234, 88, 12, 0.4)'
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Live Demo
                    </motion.a>
                  ) : (
                    <motion.div 
                      className='flex-1 text-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base font-semibold cursor-not-allowed'
                      style={{
                        background: '#f3f4f6',
                        color: '#9ca3af',
                        border: '1px solid #e5e7eb'
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