import '../Background.css'
import heroBg from '../assets/dark-gradient-bg.jpg'
import leftLeaf from '../assets/3d-left-leaf.png'
import rightLeaf from '../assets/3d-right-leaf.png'
import iphone from '../assets/ux-img.png'
import react from '../assets/react.svg'
import { FaHtml5, FaCss3Alt, FaAws } from "react-icons/fa";
import { RiJavascriptLine, RiVuejsLine } from "react-icons/ri";
import { TbBrandPython } from "react-icons/tb";



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
        <h1>Ian Sabado</h1>
        <div className="bleed-canvas">
          {/* <img className="chopsticks" src={passedIcon} alt="" />
          <img className="bento" src={devIcon} alt="" /> */}
          {/* <img className="veribear" src={codeIcon} alt="" /> */}
        </div>
      </section>
     <section>
        <div className="relative flex items-center justify-center">
          <p className="medium-description text-center px-4 md:px-16 z-0">
            <span className="normal-description">I'm a software engineer who loves building</span> beautiful, user-friendly interfaces <span className='normal-description'> with clean code behind the scenes</span>
          </p>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <img src={leftLeaf} alt="Left Leaf" className="w-auto h-50 md:h-100 z-10 -mr-16 md:-mr-32 leaf-animation-left" />
            <img src={rightLeaf} alt="Right Leaf" className="w-auto h-50 md:h-100 z-10 -ml-16 md:-ml-32 leaf-animation-right" />
          </div>
        </div>
      </section> 
      <section>
      </section>
      <section>
        <div className="spacing-box"></div>
        <div className="box">
          <div className="box__content">
            <p className="mobile-description text-2xl md:text-3xl font-medium">
            Crafting <span className='medium-description text-3xl md:text-4xl'>modern web solutions</span> with
            <div className="mt-8 flex flex-wrap justify-center gap-8 items-center">
              <span className="tech-item group flex flex-col items-center hover:scale-105 transition-all duration-300">
                <FaHtml5 className="w-10 h-10 mb-3 fill:white text-white group-hover:text-orange-500 transition-colors duration-300" />
                <span className="block text-lg font-light tracking-wide text-white group-hover:text-orange-500 transition-colors duration-300">HTML</span>
              </span>
              <span className="tech-item group flex flex-col items-center hover:scale-105 transition-all duration-300">
                <FaCss3Alt className="w-10 h-10 mb-3 text-white group-hover:text-blue-500 transition-colors duration-300" />
                <span className="block text-lg font-light tracking-wide text-white group-hover:text-blue-500 transition-colors duration-300">CSS</span>
              </span>
              <span className="tech-item group flex flex-col items-center hover:scale-105 transition-all duration-300">
                <RiJavascriptLine className="w-10 h-10 mb-3 text-white group-hover:text-yellow-400 transition-colors duration-300" />
                <span className="block text-lg font-light tracking-wide text-white group-hover:text-yellow-400 transition-colors duration-300">JavaScript</span>
              </span>
              <span className="tech-item group flex flex-col items-center hover:scale-105 transition-all duration-300">
                <img src={react} alt="React" className="w-10 h-10 mb-3 group-hover:scale-110 transition-transform duration-300" />
                <span className="block text-lg font-light tracking-wide text-white group-hover:text-cyan-400 transition-colors duration-300">React</span>
              </span>
              <span className="tech-item group flex flex-col items-center hover:scale-105 transition-all duration-300">
                <RiVuejsLine className="w-10 h-10 mb-3 text-white group-hover:text-green-400 transition-colors duration-300" />
                <span className="block text-lg font-light tracking-wide text-white group-hover:text-green-400 transition-colors duration-300">Vue.js</span>
              </span>
              <span className="tech-item group flex flex-col items-center hover:scale-105 transition-all duration-300">
                <TbBrandPython className="w-10 h-10 mb-3 text-white group-hover:text-blue-500 transition-colors duration-300" />
                <span className="block text-lg font-light tracking-wide text-white group-hover:text-blue-500 transition-colors duration-300">Python</span>
              </span>
              <span className="tech-item group flex flex-col items-center hover:scale-105 transition-all duration-300">
                <FaAws className="w-10 h-10 mb-3 text-white group-hover:text-orange-400 transition-colors duration-300" />
                <span className="block text-lg font-light tracking-wide text-white group-hover:text-orange-400 transition-colors duration-300">AWS</span>
              </span>
            </div>
            </p>
          </div>
        </div>
        <div className="sticky">
          <img src={iphone} alt="" />
        </div>
        <div className="box box--two">
          <div className="box__content">
            <p>
              <span className="logo"></span>
              <span>Hey Friend 👋 </span>
              <span>lets code something amazing together</span>
            </p>
          </div>
        </div>
      </section>
      
    </main>
    </>
  )
} 

export default Background;