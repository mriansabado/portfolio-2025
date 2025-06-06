import '../Background.css'
import heroBg from '../assets/dark-gradient-bg.jpg'
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
          padding: "0 1rem"
        }}>
          <h1 className="text-left md:text-center">
            <span className="block md:inline text-8xl md:text-9xl">Ian</span>
            <span className="block md:inline text-8xl md:text-9xl md:ml-4">Sabado</span>
          </h1>
        </div>
      </section>
      <section>
        <div className="relative flex items-center justify-center">
          <p className="medium-description text-center px-4 md:px-16 z-0">
            <span className="normal-description">I'm a software engineer who loves building</span> beautiful, user-friendly interfaces <span className='normal-description'> with clean code behind the scenes</span>
          </p>
        </div>
      </section> 
      <section className="py-16 bg-gradient-to-b from-gray-900 to-black" style={{
        width: "100%",
        position: "relative",
        margin: "0 -1rem",
        padding: "0 1rem"
      }}>
        <div className="container mx-auto px-8 max-w-[1400px]">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-white">
            Tech Stack
          </h2>
          <div className="grid grid-cols-8 gap-16 justify-items-center">
            <div className="flex flex-col items-center justify-center p-6 bg-gray-800 rounded-lg min-w-[140px] text-center">
              <FaHtml5 className="w-12 h-12 mb-4 text-orange-500" />
              <span className="text-lg font-medium text-white">HTML</span>
            </div>
            <div className="flex flex-col items-center justify-center p-6 bg-gray-800 rounded-lg min-w-[140px] text-center">
              <FaCss3Alt className="w-12 h-12 mb-4 text-blue-500" />
              <span className="text-lg font-medium text-white">CSS</span>
            </div>
            <div className="flex flex-col items-center justify-center p-6 bg-gray-800 rounded-lg min-w-[140px] text-center">
              <RiJavascriptLine className="w-12 h-12 mb-4 text-yellow-400" />
              <span className="text-lg font-medium text-white">JavaScript</span>
            </div>
            <div className="flex flex-col items-center justify-center p-6 bg-gray-800 rounded-lg min-w-[140px] text-center">
              <img src={react} alt="React" className="w-12 h-12 mb-4" />
              <span className="text-lg font-medium text-white">React</span>
            </div>
            <div className="flex flex-col items-center justify-center p-6 bg-gray-800 rounded-lg min-w-[140px] text-center">
              <SiReact className="w-12 h-12 mb-4 text-blue-400" />
              <span className="text-lg font-medium text-white">React Native</span>
            </div>
            <div className="flex flex-col items-center justify-center p-6 bg-gray-800 rounded-lg min-w-[140px] text-center">
              <RiVuejsLine className="w-12 h-12 mb-4 text-green-400" />
              <span className="text-lg font-medium text-white">Vue.js</span>
            </div>
            <div className="flex flex-col items-center justify-center p-6 bg-gray-800 rounded-lg min-w-[140px] text-center">
              <TbBrandPython className="w-12 h-12 mb-4 text-blue-500" />
              <span className="text-lg font-medium text-white">Python</span>
            </div>
            <div className="flex flex-col items-center justify-center p-6 bg-gray-800 rounded-lg min-w-[140px] text-center">
              <FaAws className="w-12 h-12 mb-4 text-orange-400" />
              <span className="text-lg font-medium text-white">AWS</span>
            </div>
          </div>
        </div>
      </section>
    </main>
    </>
  )
} 

export default Background;