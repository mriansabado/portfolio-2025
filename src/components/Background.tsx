import '../Background.css'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import heroDesktop from '../assets/updated-desktop.png'
import heroMobile from '../assets/updated-mobile.png'
import heroDesktopNight from '../assets/night-desktop.png'
import heroMobileNight from '../assets/night-mobile.png'
import react from '../assets/react.svg'
import { FaHtml5, FaCss3Alt, FaAws } from "react-icons/fa";
import { RiJavascriptLine, RiVuejsLine } from "react-icons/ri";
import { TbBrandPython } from "react-icons/tb";
import { SiReact } from "react-icons/si";

interface BackgroundProps {
  isNightMode?: boolean;
}

const Background = ({ isNightMode = false }: BackgroundProps) => {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95])

  return (
    <>
    <main>
      <motion.section 
        ref={heroRef}
        className="hero-section relative overflow-hidden"
        style={{
          width: "100vw",
          minHeight: "100vh",
          position: "relative",
          left: "50%",
          right: "50%",
          marginLeft: "-50vw",
          marginRight: "-50vw"
        }}
      >
        {/* Hero Image with parallax */}
        <motion.div
          style={{ y, opacity, scale }}
          className="absolute inset-0 w-full h-full"
        >
          <picture>
            <source media="(min-width: 768px)" srcSet={isNightMode ? heroDesktopNight : heroDesktop} />
            <img 
              src={isNightMode ? heroMobileNight : heroMobile} 
              alt="Ian Sabado Software Developer"
              className="w-full h-full object-cover"
              style={{
                filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))'
              }}
            />
          </picture>
        </motion.div>

        {/* Decorative floating elements with 3D effect */}
        <motion.div
          className="absolute top-20 right-10 w-20 h-20 md:w-32 md:h-32 opacity-20"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            filter: 'drop-shadow(0 10px 20px rgba(255,165,0,0.4))',
            transformStyle: 'preserve-3d',
            transform: 'perspective(1000px) rotateX(5deg)'
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full blur-xl" />
        </motion.div>

        <motion.div
          className="absolute bottom-20 left-10 w-16 h-16 md:w-24 md:h-24 opacity-20"
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
          style={{
            filter: 'drop-shadow(0 10px 20px rgba(34,197,94,0.4))',
            transformStyle: 'preserve-3d',
            transform: 'perspective(1000px) rotateX(-5deg)'
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-green-400 to-emerald-500 rounded-full blur-xl" />
        </motion.div>
      </motion.section>
      <motion.section 
        className="relative overflow-hidden w-screen"
        style={{
          width: "100vw",
          minHeight: "50vh",
          position: "relative",
          left: "50%",
          right: "50%",
          marginLeft: "-50vw",
          marginRight: "-50vw",
          background: isNightMode
            ? 'linear-gradient(to bottom, #1e293b, #0f172a)'
            : 'linear-gradient(to bottom, #fef3e2, #fff9f0)'
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Bright colorful decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-200/30 via-yellow-100/20 to-pink-200/30" />
        <div className="absolute top-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-orange-300/20 rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-pink-300/20 rounded-full filter blur-3xl translate-x-1/2 translate-y-1/2" />
        <div className="relative flex items-center justify-center z-10 py-16 md:py-24">
          <motion.p 
            className="text-center px-4 md:px-16 max-w-4xl"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontSize: 'clamp(1.5rem, 3vw + 1rem, 2.5rem)',
              fontWeight: 600,
              color: isNightMode ? '#f1f5f9' : '#1a1a1a',
              lineHeight: 1.6
            }}
          >
            <span>I'm a Software Developer who specializes in </span> 
            <span style={{ 
              color: isNightMode ? '#60a5fa' : '#ea580c',
              fontWeight: 700,
              textShadow: isNightMode 
                ? '2px 2px 4px rgba(96, 165, 250, 0.3)'
                : '2px 2px 4px rgba(234, 88, 12, 0.2)'
            }}>AI integration</span>
            <span> and building AI-powered applications. I keep up with the latest tools and have shipped AI features that automate workflows and reduce manual effort.</span>
          </motion.p>
        </div>
      </motion.section> 
      <motion.section 
        className="py-1 sm:py-8 min-h-[400px] sm:min-h-[500px] relative"
        style={{
          background: isNightMode
            ? 'linear-gradient(to bottom, #0f172a, #1e293b)'
            : 'linear-gradient(to bottom, #fff9f0, #fef3e2)'
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 max-w-[1400px]">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-center mb-8 md:mb-12"
            style={{ 
              color: isNightMode ? '#f1f5f9' : '#1a1a1a',
              textShadow: isNightMode 
                ? '2px 2px 4px rgba(0,0,0,0.5)' 
                : '2px 2px 4px rgba(0,0,0,0.1)'
            }}
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Tech Stack
          </motion.h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 md:gap-8 lg:gap-16 justify-items-center">
            {[
              { Icon: FaHtml5, name: "HTML", color: "text-orange-500" },
              { Icon: FaCss3Alt, name: "CSS", color: "text-blue-500" },
              { Icon: RiJavascriptLine, name: "JavaScript", color: "text-yellow-400" },
              { icon: react, name: "React", color: "", isImg: true },
              { Icon: SiReact, name: "React Native", color: "text-blue-400" },
              { Icon: RiVuejsLine, name: "Vue.js", color: "text-green-400" },
              { Icon: TbBrandPython, name: "Python", color: "text-blue-500" },
              { Icon: FaAws, name: "AWS", color: "text-orange-400" },
            ].map((tech, index) => (
              <motion.div
                key={tech.name}
                className="flex flex-col items-center justify-center p-4 md:p-6 rounded-xl w-[140px] text-center"
                  style={{
                    background: isNightMode ? '#1e293b' : 'white',
                    boxShadow: isNightMode
                      ? '0 8px 24px rgba(0,0,0,0.4), 0 4px 8px rgba(0,0,0,0.2)'
                      : '0 8px 24px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.08)',
                    transformStyle: 'preserve-3d',
                    transition: 'all 0.3s ease',
                    border: isNightMode ? '1px solid rgba(148, 163, 184, 0.2)' : 'none'
                  }}
                initial={{ opacity: 0, y: 30, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{
                  scale: 1.1,
                  rotateY: 5,
                  rotateX: 5,
                  z: 20,
                  boxShadow: '0 16px 48px rgba(0,0,0,0.2), 0 8px 16px rgba(0,0,0,0.15)'
                }}
              >
                {tech.isImg && tech.icon ? (
                  <img src={tech.icon} alt={tech.name} className="w-10 h-10 md:w-12 md:h-12 mb-3 md:mb-4" />
                ) : !tech.isImg && tech.Icon ? (
                  <tech.Icon className={`w-10 h-10 md:w-12 md:h-12 mb-3 md:mb-4 ${tech.color}`} />
                ) : null}
                <span className="text-base md:text-lg font-semibold" style={{ color: isNightMode ? '#f1f5f9' : '#1a1a1a' }}>{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* AWS Certification Section */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.div 
            className="inline-flex items-center justify-center p-6 md:p-8 rounded-2xl"
            style={{
              background: isNightMode
                ? 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
                : 'linear-gradient(135deg, #fff 0%, #fff5e6 100%)',
              boxShadow: isNightMode
                ? '0 12px 32px rgba(0,0,0,0.4), 0 4px 12px rgba(0,0,0,0.2)'
                : '0 12px 32px rgba(234, 88, 12, 0.25), 0 4px 12px rgba(0,0,0,0.1)',
              border: isNightMode
                ? '2px solid rgba(148, 163, 184, 0.2)'
                : '2px solid rgba(234, 88, 12, 0.2)',
              transformStyle: 'preserve-3d'
            }}
            whileHover={{
              scale: 1.05,
              rotateY: 2,
              boxShadow: '0 16px 48px rgba(234, 88, 12, 0.35), 0 8px 16px rgba(0,0,0,0.15)'
            }}
          >
            <div className="flex items-center space-x-4 md:space-x-6">
              <div className="flex-shrink-0">
                <FaAws className="w-16 h-16 md:w-20 md:h-20 text-orange-500" />
              </div>
              <div className="text-left">
                <h3 className="text-xl md:text-2xl font-bold mb-2" style={{ color: isNightMode ? '#f1f5f9' : '#1a1a1a' }}>
                  AWS Cloud Practitioner Certified
                </h3>
                <p className="text-sm md:text-base" style={{ color: isNightMode ? '#60a5fa' : '#ea580c' }}>
                  Certified cloud professional with foundational AWS knowledge
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
        
      </motion.section>
    </main>
    </>
  )
} 

export default Background;