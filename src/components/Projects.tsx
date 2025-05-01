import React from 'react';

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
  return (
    <section className='py-20 bg-black'>
      <div className='container mx-auto px-4'>
        <h2 className='text-4xl md:text-5xl font-bold text-white tracking-tighter mb-4 text-center'>
          Featured Projects
        </h2>
        <p className='text-gray-400 text-center mb-12 max-w-2xl mx-auto'>
          Here are some of my recent projects that showcase my skills and experience in web development.
        </p>
        
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {projects.map((project, index) => (
            <div 
              key={index}
              className='group relative bg-gray-900 rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl'
            >
              <div className='relative h-48 overflow-hidden'>
                <img 
                  src={project.imageUrl} 
                  alt={project.title}
                  className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-110'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
              </div>
              
              <div className='p-6'>
                <h3 className='text-xl font-bold text-white mb-2'>{project.title}</h3>
                <p className='text-gray-400 mb-4'>{project.description}</p>
                
                <div className='flex flex-wrap gap-2 mb-6'>
                  {project.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className='px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm'
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className='flex gap-4'>
                  <a 
                    href={project.githubUrl}
                    className='flex-1 text-center bg-white text-black px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition'
                  >
                    GitHub
                  </a>
                  <a 
                    href={project.liveUrl}
                    className='flex-1 text-center border border-white text-white px-4 py-2 rounded-lg font-semibold hover:bg-white hover:text-black transition'
                  >
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects; 