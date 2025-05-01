import React from 'react'
import styles from './Hero.module.css'
// Remove the background image import since we won't need it
// import heroBG from '../assets/hero-bg.jpg'

const Hero = () => {
  return (
   <>
   <section className={`flex items-center justify-center min-h-screen ${styles['animate-gradient']} bg-gradient-to-r from-blue-700 via-orange-600 to-white`}>
      <div className='container mx-auto px-4 py-16 text-center'>
        <h1 className='text-6xl md:text-8xl font-bold text-white tracking-tighter mb-8'>
          Ian Sabado
        </h1>
        <h2 className='text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto mb-8'>
          Software Engineer crafting beautiful front-end experiences powered by clean, efficient code
        </h2>
        <div className='flex gap-4 justify-center'>
          <button className='bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition'>
            View Projects
          </button>
          <button className='border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition'>
            Contact Me
          </button>
        </div>
      </div>
    </section>
   </>
  )
}

export default Hero 