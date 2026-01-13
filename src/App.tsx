// import Hero from './components/Hero'
import Feature from './components/Feature'
import Projects from './components/Projects'
import Contact from './components/Contact'
import './App.css'
import Background from './components/Background'
function App() {
  return (
    <div className='min-h-screen' style={{ background: '#fff9f0' }}>
      <Background />
      <Feature />
      <Projects />
      <Contact />
    </div>
  )
}

export default App