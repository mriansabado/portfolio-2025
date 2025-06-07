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
          <div className="bg-black/30 backdrop-sm p-8 rounded-lg">
            <h1 className="text-center text-white">
              <span className="block md:inline text-8xl md:text-9xl">Ian</span>
              <span className="block md:inline text-8xl md:text-9xl md:ml-4">Sabado</span>
            </h1>
            <h2 className="text-3xl md:text-5xl font-medium mt-4 text-center max-w-4xl">
              <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent hover:from-pink-300 hover:via-purple-300 hover:to-cyan-300 transition-all duration-300">
                Full-Stack Developer
              </span>
            </h2>
          </div>
        </div>
      </section>
      <section>
        <div className="relative flex items-center justify-center">
          <p className="medium-description text-center px-4 md:px-16 z-0">
            <span className="normal-description">I'm a Full-Stack Engineer who loves building</span> beautiful, user-friendly interfaces <span className='normal-description'> with clean code behind the scenes</span>
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
      </section>
    </main>
    </>
  )
} 

export default Background;