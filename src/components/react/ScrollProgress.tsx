import { motion, useScroll, useSpring } from 'framer-motion';
import { useThemeStore } from '../../stores/themeStore';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const theme = useThemeStore(state => state.theme);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-polaris-primary dark:bg-polaris-primary-dark z-50"
      style={{
        scaleX: scrollYProgress,
        transformOrigin: "0%"
      }}
    />
  );
} 