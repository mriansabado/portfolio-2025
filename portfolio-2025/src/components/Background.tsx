import '../Background.css'
import devIcon from '../assets/window.png'
import codeIcon from '../assets/emoji-bg.png'
import heroBg from '../assets/dark-gradient-bg.jpg'
import passedIcon from '../assets/seo-icon-pack.png'
import leftLeaf from '../assets/3d-left-leaf.png'
import rightLeaf from '../assets/3d-right-leaf.png'


const Background = () => {
  return (
    <>
    <main>
      <section style={{
        background: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100vw",
        marginLeft: "50%",
        transform: "translateX(-50%)",
        position: "relative"
      }}>
        <h1>Ian Sabado</h1>
        <div className="bleed-canvas">
          <img className="chopsticks" src={passedIcon} alt="" />
          <img className="bento" src={devIcon} alt="" />
          {/* <img className="veribear" src={codeIcon} alt="" /> */}
        </div>
      </section>
     <section>
        <div className="relative flex items-center justify-center">
          <p className="medium-description text-center px-16 z-0">
            <span className="normal-description">I'm a Software Engineer who crafts</span> beautiful front-end experiences <span className='normal-description'> powered by </span> clean, efficient code
          </p>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <img src={leftLeaf} alt="Left Leaf" className="w-auto h-100 z-10 -mr-32 leaf-animation-left" />
            <img src={rightLeaf} alt="Right Leaf" className="w-auto h-100 z-10 -ml-32 leaf-animation-right" />
          </div>
        </div>
      </section> 
      <section>
      </section>
      <section>
        <div className="spacing-box"></div>
        <div className="box">
          <div className="box__content">
            <p className="mobile-description">
            Crafting <span className='medium-description'>web solutions built to last</span> – from React to AWS and everything in between
            </p>
          </div>
        </div>
        <div className="sticky">
          <img src="https://assets.codepen.io/605876/phone-chat-mockup.png" alt="" />
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