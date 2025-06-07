import { motion } from 'framer-motion';
import barblendGuru from '../assets/barblend-guru.png';
import gamehub from '../assets/gamehub.png';
import pixelBuilder from '../assets/pixel-builder.png';
import fontastic from '../assets/fontastic.png';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  liveUrl: string;
}

const projects: Project[] = [
  {
    title: "GameHub",
    description: "An interactive gaming platform that connects players and provides real-time game statistics and social features.",
    technologies: ["React", "Typescript", "Chakra", "RESTAPI", "Vercel"],
    imageUrl: gamehub,
    liveUrl: "https://game-hub-beige-omega.vercel.app/"
  },
  {
    title: "Fontastic",
    description: "Fontastic is a React Native app that transforms text into animated displays with customizable themes and animations. To preview it, scan the QR code and follow the instructions",
    technologies: ["React Native", "Expo", "Lottie Animations", "React Navigation", "iOS/Android/Web"],
    imageUrl: fontastic,
    liveUrl: "https://expo.dev/preview/update?message=Publishing%20to%20Expo%20Go&updateRuntimeVersion=1.0.0&createdAt=2025-06-06T01%3A51%3A28.953Z&slug=exp&projectId=46bb1139-8352-4631-b16b-7e1ec8b80edb&group=6f651b28-4c75-4498-82d0-63686fe98a71"
  },
  {
    title: "BarBlend Guru",
    description: "A modern cocktail recipe app that helps users discover and create amazing drinks with detailed instructions and ingredient tracking.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "RESTAPI", "Vercel"],
    imageUrl: barblendGuru,
    liveUrl: "https://barblend-guru-app.vercel.app/"
  },
  {
    title: "Pixel Builder",
    description: "Online tool to make custom tracking pixels for Facebook and Instagram",
    technologies: ["Vue JS", "Bulma", "Bootstrap", "Vercel"],
    imageUrl: pixelBuilder,
    liveUrl: "https://tracking-pixel-builder.vercel.app/"
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
          Here are some of my recent projects that showcase my skills and experience in web development.
        </motion.p>
        
        <motion.div 
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8'
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
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src={project.imageUrl} 
                  alt={project.title}
                  className='w-full h-full object-cover'
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