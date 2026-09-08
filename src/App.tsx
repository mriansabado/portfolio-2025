import Feature from './components/Feature'
import Projects from './components/Projects'
import Contact from './components/Contact'
import './App.css'
import Background from './components/Background'
import NightModeToggle from './components/NightModeToggle'
import SpaceExperience from './components/space/SpaceExperience'
import { ThemeProvider, useTheme } from './contexts/ThemeContext'

const AppContent = () => {
  const { isNightMode } = useTheme();
  
  const classicPortfolio = (
    <>
      <Background isNightMode={isNightMode} />
      <Projects isNightMode={isNightMode} />
      <Feature isNightMode={isNightMode} />
      <Contact isNightMode={isNightMode} />
    </>
  );

  return (
    <div
      className='min-h-screen transition-colors'
      style={{
        transitionDuration: '2000ms',
        background: isNightMode
          ? 'radial-gradient(circle at top, #1e1b4b 0%, #0f172a 45%, #020617 100%)'
          : 'radial-gradient(circle at top, #312e81 0%, #1e293b 35%, #0f172a 100%)'
      }}
    >
      <NightModeToggle />
      <SpaceExperience isNightMode={isNightMode} classicPortfolio={classicPortfolio} />
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