import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import MagneticButton from './MagneticButton';

const themes = [
  { id: 'light', label: 'Light', icon: '🌞' },
  { id: 'dark', label: 'Dark', icon: '🌙' },
  { id: 'cyberpunk', label: 'Cyberpunk', icon: '🤖' },
  { id: 'minimal', label: 'Minimal', icon: '⚪' },
  { id: 'hacker', label: 'Hacker', icon: '💻' },
] as const;

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <motion.div 
      className="fixed bottom-4 right-4 bg-white/90 backdrop-blur-md p-2 rounded-lg shadow-lg"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 1 }}
    >
      <div className="flex gap-2">
        {themes.map((t) => (
          <MagneticButton
            key={t.id}
            onClick={() => setTheme(t.id)}
            className={`p-2 rounded-md transition-colors ${
              theme === t.id 
                ? 'bg-polaris-primary text-white' 
                : 'hover:bg-polaris-hover'
            }`}
          >
            <span role="img" aria-label={t.label}>
              {t.icon}
            </span>
          </MagneticButton>
        ))}
      </div>
    </motion.div>
  );
} 