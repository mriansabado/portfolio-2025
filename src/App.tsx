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
          ? 'linear-gradient(to bottom, #0f172a, #1e293b)' 
          : '#fff9f0' 
      }}
    >
      <NightModeToggle />
      <Background isNightMode={isNightMode} />
      <Feature isNightMode={isNightMode} />
      <Projects isNightMode={isNightMode} />
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