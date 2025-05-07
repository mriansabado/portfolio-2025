import React from 'react';
import { motion } from 'framer-motion';
import projectsBg from '../assets/projects-bg.jpg';
interface Project {
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  githubUrl: string;
  liveUrl: string;
}

const projects: Project[] = [
  {
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution with real-time inventory management and secure payment processing.",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    imageUrl: "https://placehold.co/600x400",
    githubUrl: "#",
    liveUrl: "#"
  },
  {
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates and team features.",
    technologies: ["React", "Firebase", "Material-UI"],
    imageUrl: "https://placehold.co/600x400",
    githubUrl: "#",
    liveUrl: "#"
  },
  {
    title: "Portfolio Website",
    description: "A responsive portfolio website showcasing my work and skills.",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    imageUrl: "https://placehold.co/600x400",
    githubUrl: "#",
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
      className='py-20 bg-black relative'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className='absolute inset-0 bg-[url("/projects-bg.jpg")] bg-cover bg-center bg-no-repeat opacity-20'></div>
      <div className='container mx-auto px-4 relative z-10'>
        <motion.h2 
          className='text-4xl md:text-5xl font-bold text-white tracking-tighter mb-4 text-center'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Featured Projects
        </motion.h2>
        <motion.p 
          className='text-gray-400 text-center mb-12 max-w-2xl mx-auto'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Here are some of my recent projects that showcase my skills and experience in web development.
        </motion.p>
        
        <motion.div 
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              className='relative bg-gray-900 rounded-xl overflow-hidden'
              variants={projectVariants}
              whileHover={hoverVariants.hover}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div 
                className='relative h-48 overflow-hidden'
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
              
              <div className='p-4 md:p-6'>
                <h3 className='text-lg md:text-xl font-bold text-white mb-2'>{project.title}</h3>
                <p className='text-sm md:text-base text-gray-400 mb-4'>{project.description}</p>
                
                <div className='flex flex-wrap gap-2 mb-4 md:mb-6'>
                  {project.technologies.map((tech, techIndex) => (
                    <motion.span 
                      key={techIndex}
                      className='px-2 md:px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-xs md:text-sm'
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
                    href={project.githubUrl}
                    className='flex-1 text-center bg-white text-black px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition'
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    GitHub
                  </motion.a>
                  <motion.a 
                    href={project.liveUrl}
                    className='flex-1 text-center border border-white text-white px-4 py-2 rounded-lg font-semibold hover:bg-white hover:text-black transition'
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