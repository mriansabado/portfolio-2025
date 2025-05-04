// import Hero from './components/Hero'
import Feature from './components/Feature'
import Projects from './components/Projects'
import Contact from './components/Contact'
import './App.css'
import Background from './components/Background'
function App() {
  return (
    <div className='bg-black min-h-screen'>
      <Background />
      <Feature />
      <Projects />
      <Contact />
    </div>
  )
}

export default App