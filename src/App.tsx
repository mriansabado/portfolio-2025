// import Hero from './components/Hero'
import Feature from './components/Feature'
import Projects from './components/Projects'
import Contact from './components/Contact'
import './App.css'
import Background from './components/Background'
import NightModeToggle from './components/NightModeToggle'
import { ThemeProvider, useTheme } from './contexts/ThemeContext'

const AppContent = () => {
  const { isNightMode } = useTheme();
  
  return (
    <div 
      className='min-h-screen transition-colors duration-500' 
      style={{ 
        background: isNightMode 
          ? 'radial-gradient(circle at top, #1e1b4b 0%, #0f172a 45%, #020617 100%)'
          : 'radial-gradient(circle at top, #312e81 0%, #1e293b 35%, #0f172a 100%)'
      }}
    >
      <NightModeToggle />
      <Background isNightMode={isNightMode} />
      <Projects isNightMode={isNightMode} />
      <Feature isNightMode={isNightMode} />
      <Contact isNightMode={isNightMode} />
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App