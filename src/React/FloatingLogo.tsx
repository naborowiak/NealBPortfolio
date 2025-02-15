import React, { useEffect, useRef } from 'react';

const FloatingLogo = () => {
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const logo = logoRef.current;
    if (!logo) return;

    let rotation = 0;
    let height = 0;
    let animationFrame: number;

    const animate = () => {
      rotation += 0.5;
      height = Math.sin(Date.now() / 1000) * 10;
      
      logo.style.transform = `
        rotateY(${rotation}deg) 
        translateY(${height}px)
      `;

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div 
      ref={logoRef}
      className="fixed top-20 right-20 w-20 h-20 opacity-30"
      style={{ 
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
    >
      <img 
        src="/servicenow-logo.png" 
        alt="ServiceNow Logo"
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default FloatingLogo; 