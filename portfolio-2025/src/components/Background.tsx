import '../Background.css'
import devIcon from '../assets/cloud-tech.png'
import codeIcon from '../assets/code-icon.png'
import passedIcon from '../assets/edge-compute.png'


const Background = () => {
  return (
    <>
    <main>
      <section>
        <h1>Ian Sabado</h1>
        <div className="bleed-canvas">
          <img className="chopsticks" src={passedIcon} alt="" />
          <img className="bento" src={devIcon} alt="" />
          {/* <img className="veribear" src={codeIcon} alt="" /> */}
        </div>
      </section>
      <section>
        <p className="medium-description">
        <span className="normal-description">I'm a Software Engineer who crafts</span> beautiful front-end experiences <span className='normal-description'> powered by </span> clean, efficient code
        </p>
      </section>
      <section>
      </section>
      <section>
        <div className="spacing-box"></div>
        <div className="box">
          <div className="box__content">
            <p className="mobile-description">
            Crafting <span className='medium-description'>web solutions that just work</span> – from React to AWS and everything in between
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