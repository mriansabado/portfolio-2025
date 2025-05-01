import Hero from './components/Hero'
import Feature from './components/Feature'
import Projects from './components/Projects'
import './App.css'

function App() {
  return (
    <div className='bg-black min-h-screen'>
      <Hero />
      <Feature />
      <Projects />
    </div>
  )
}

export default App