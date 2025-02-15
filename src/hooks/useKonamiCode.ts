import { useEffect, useState } from 'react';

const konamiCode = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a'
];

export function useKonamiCode() {
  const [isKonamiCodeActive, setIsKonamiCodeActive] = useState(false);
  const [keySequence, setKeySequence] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const newSequence = [...keySequence, event.key.toLowerCase()];
      
      if (newSequence.length > konamiCode.length) {
        newSequence.shift();
      }
      
      setKeySequence(newSequence);

      if (
        newSequence.length === konamiCode.length &&
        newSequence.every((key, i) => key === konamiCode[i].toLowerCase())
      ) {
        setIsKonamiCodeActive(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [keySequence]);

  return isKonamiCodeActive;
} 