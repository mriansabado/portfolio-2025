import '../Background.css'
import heroBg from '../assets/3d-podium.jpg'
import react from '../assets/react.svg'
import { FaHtml5, FaCss3Alt, FaAws } from "react-icons/fa";
import { RiJavascriptLine, RiVuejsLine } from "react-icons/ri";
import { TbBrandPython } from "react-icons/tb";
import { SiReact } from "react-icons/si";

const Background = () => {
  return (
    <>
    <main>
      <section style={{
        background: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100vw",
        minHeight: "100vh",
        position: "relative",
        left: "50%",
        right: "50%",
        marginLeft: "-50vw",
        marginRight: "-50vw"
      }}>
        <div style={{
          display: "grid",
          placeItems: "center",
          height: "100vh",
          width: "100%",
          padding: "0 1rem",
          paddingTop: "10vh"
        }}>
          <div className="bg-black/60 backdrop-sm p-5 rounded-lg">
            <h1 className="text-center text-white">
              <span className="block md:inline text-8xl md:text-9xl">Ian</span>
              <span className="block md:inline text-8xl md:text-9xl md:ml-4">Sabado</span>
            </h1>
            <h2 className="text-3xl md:text-5xl font-medium mt-4 text-center max-w-4xl">
              <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent hover:from-pink-300 hover:via-purple-300 hover:to-cyan-300 transition-all duration-300">
                Software Developer
              </span>
            </h2>
          </div>
        </div>
      </section>
      <section className="relative overflow-hidden bg-black w-screen" style={{
        width: "100vw",
        height: "50vh", // Adjusted height to prevent overlap
        position: "relative",
        left: "50%",
        right: "50%",
        marginLeft: "-50vw",
        marginRight: "-50vw"
      }}>
        {/* Decorative background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20" />
        <div className="absolute top-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-blue-500/10 rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-purple-500/10 rounded-full filter blur-3xl translate-x-1/2 translate-y-1/2" />
        <div className="relative flex items-center justify-center z-10">
          <p className="medium-description text-center px-4 md:px-16">
            <span className="normal-description">I'm a Software Developer who loves building </span> 
            web applications 
            <span className="normal-description"> and </span>
             cloud solutions
          </p>
        </div>
      </section> 
      <section className="py-1 sm:py-8 bg-gradient-to-b from-gray-900 to-black min-h-[400px] sm:min-h-[500px]">
        <div className="container mx-auto px-4 max-w-[1400px]">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-2 text-white">
            Tech Stack
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 md:gap-8 lg:gap-16 justify-items-center">
            <div className="flex flex-col items-center justify-center p-4 md:p-6 bg-gray-800/90 backdrop-blur-sm rounded-lg w-[140px] text-center">
              <FaHtml5 className="w-10 h-10 md:w-12 md:h-12 mb-3 md:mb-4 text-orange-500" />
              <span className="text-base md:text-lg font-medium text-white">HTML</span>
            </div>
            <div className="flex flex-col items-center justify-center p-4 md:p-6 bg-gray-800/90 backdrop-blur-sm rounded-lg w-[140px] text-center">
              <FaCss3Alt className="w-10 h-10 md:w-12 md:h-12 mb-3 md:mb-4 text-blue-500" />
              <span className="text-base md:text-lg font-medium text-white">CSS</span>
            </div>
            <div className="flex flex-col items-center justify-center p-4 md:p-6 bg-gray-800/90 backdrop-blur-sm rounded-lg w-[140px] text-center">
              <RiJavascriptLine className="w-10 h-10 md:w-12 md:h-12 mb-3 md:mb-4 text-yellow-400" />
              <span className="text-base md:text-lg font-medium text-white">JavaScript</span>
            </div>
            <div className="flex flex-col items-center justify-center p-4 md:p-6 bg-gray-800/90 backdrop-blur-sm rounded-lg w-[140px] text-center">
              <img src={react} alt="React" className="w-10 h-10 md:w-12 md:h-12 mb-3 md:mb-4" />
              <span className="text-base md:text-lg font-medium text-white">React</span>
            </div>
            <div className="flex flex-col items-center justify-center p-4 md:p-6 bg-gray-800/90 backdrop-blur-sm rounded-lg w-[140px] text-center">
              <SiReact className="w-10 h-10 md:w-12 md:h-12 mb-3 md:mb-4 text-blue-400" />
              <span className="text-base md:text-lg font-medium text-white">React Native</span>
            </div>
            <div className="flex flex-col items-center justify-center p-4 md:p-6 bg-gray-800/90 backdrop-blur-sm rounded-lg w-[140px] text-center">
              <RiVuejsLine className="w-10 h-10 md:w-12 md:h-12 mb-3 md:mb-4 text-green-400" />
              <span className="text-base md:text-lg font-medium text-white">Vue.js</span>
            </div>
            <div className="flex flex-col items-center justify-center p-4 md:p-6 bg-gray-800/90 backdrop-blur-sm rounded-lg w-[140px] text-center">
              <TbBrandPython className="w-10 h-10 md:w-12 md:h-12 mb-3 md:mb-4 text-blue-500" />
              <span className="text-base md:text-lg font-medium text-white">Python</span>
            </div>
            <div className="flex flex-col items-center justify-center p-4 md:p-6 bg-gray-800/90 backdrop-blur-sm rounded-lg w-[140px] text-center">
              <FaAws className="w-10 h-10 md:w-12 md:h-12 mb-3 md:mb-4 text-orange-400" />
              <span className="text-base md:text-lg font-medium text-white">AWS</span>
            </div>
          </div>
        </div>
        
        {/* AWS Certification Section */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center justify-center p-6 md:p-8 bg-gradient-to-r from-orange-500/20 to-orange-600/20 backdrop-blur-sm rounded-2xl border border-orange-400/30">
            <div className="flex items-center space-x-4 md:space-x-6">
              <div className="flex-shrink-0">
                <FaAws className="w-16 h-16 md:w-20 md:h-20 text-orange-400" />
              </div>
              <div className="text-left">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                  AWS Cloud Practitioner Certified
                </h3>
                <p className="text-orange-200 text-sm md:text-base">
                  Certified cloud professional with foundational AWS knowledge
                </p>
              </div>
            </div>
          </div>
        </div>
        
      </section>
    </main>
    </>
  )
} 

export default Background;