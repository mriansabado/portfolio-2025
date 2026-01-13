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

const Projects = () => {
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

  // Hover animation for project cards
  const hoverVariants = {
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <motion.section 
      className='py-12 sm:py-16 md:py-20 bg-black relative overflow-hidden'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20" />
      <div className="absolute top-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-blue-500/10 rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-purple-500/10 rounded-full filter blur-3xl translate-x-1/2 translate-y-1/2" />
      <div className='container mx-auto px-4 sm:px-6 relative z-10'>
        <motion.h2 
          className='text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tighter mb-3 sm:mb-4 text-center'
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
              className='relative bg-gray-900 rounded-lg sm:rounded-xl overflow-hidden'
              variants={projectVariants}
              whileHover={hoverVariants.hover}
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
                  className='absolute inset-0 bg-gradient-to-t from-black/80 to-transparent'
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
              
              <div className='p-4 sm:p-6'>
                <h3 className='text-base sm:text-lg md:text-xl font-bold text-white mb-2'>{project.title}</h3>
                <p className='text-xs sm:text-sm md:text-base text-gray-400 mb-3 sm:mb-4'>{project.description}</p>
                
                <div className='flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4'>
                  {project.technologies.map((tech, techIndex) => (
                    <motion.span 
                      key={techIndex}
                      className='px-2 py-0.5 sm:px-3 sm:py-1 bg-gray-800 text-gray-300 rounded-full text-xs sm:text-sm'
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * techIndex }}
                      whileHover={{ scale: 1.1, backgroundColor: "#374151" }}
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
                      className='flex-1 text-center border border-white text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base font-semibold hover:bg-white hover:text-black transition'
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Live Demo
                    </motion.a>
                  ) : (
                    <motion.div 
                      className='flex-1 text-center border border-gray-600 text-gray-500 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base font-semibold cursor-not-allowed'
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