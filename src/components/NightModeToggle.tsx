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
          ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.94) 0%, rgba(2, 6, 23, 0.96) 100%)'
          : 'linear-gradient(135deg, rgba(67, 56, 202, 0.92) 0%, rgba(15, 23, 42, 0.96) 100%)',
        border: `1px solid ${isNightMode ? 'rgba(251, 191, 36, 0.22)' : 'rgba(251, 191, 36, 0.3)'}`,
        boxShadow: isNightMode
          ? '0 10px 24px rgba(0,0,0,0.35)'
          : '0 10px 24px rgba(0,0,0,0.35)',
        color: '#f8fafc',
        backdropFilter: 'blur(14px)'
      }}
      whileHover={{ scale: 1.06, rotate: 8 }}
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
