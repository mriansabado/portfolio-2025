import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { FaMoon, FaSun } from 'react-icons/fa';

const NightModeToggle = () => {
  const { isNightMode, toggleNightMode } = useTheme();

  return (
    <motion.button
      onClick={toggleNightMode}
      className="fixed top-6 right-6 z-50 p-3 rounded-full shadow-lg"
      style={{
        background: isNightMode 
          ? 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'
          : 'linear-gradient(135deg, #fff 0%, #fff5e6 100%)',
        border: `2px solid ${isNightMode ? 'rgba(148, 163, 184, 0.3)' : 'rgba(234, 88, 12, 0.3)'}`,
        boxShadow: isNightMode
          ? '0 8px 24px rgba(0,0,0,0.4), 0 4px 8px rgba(0,0,0,0.2)'
          : '0 8px 24px rgba(234, 88, 12, 0.25), 0 4px 8px rgba(0,0,0,0.1)',
        color: isNightMode ? '#f1f5f9' : '#1a1a1a'
      }}
      whileHover={{ scale: 1.1, rotate: 15 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      aria-label="Toggle night mode"
    >
      <motion.div
        animate={{ rotate: isNightMode ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {isNightMode ? (
          <FaSun className="w-5 h-5" />
        ) : (
          <FaMoon className="w-5 h-5" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default NightModeToggle;
