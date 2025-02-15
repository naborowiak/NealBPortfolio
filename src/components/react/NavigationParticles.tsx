import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useThemeStore } from '../../context/ThemeContext';
import type { ThemeState } from '../../context/ThemeContext';

interface NavParticle {
  position: THREE.Vector3;
  target: THREE.Vector3;
  text: string;
  href: string;
}

const NavigationParticles = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const theme = useThemeStore((state: ThemeState) => state.theme);
  const activeSection = useRef<string>('home');

  const navItems: NavParticle[] = [
    { position: new THREE.Vector3(-2, 1, 0), target: new THREE.Vector3(-2, 1, 0), text: 'Home', href: '#' },
    { position: new THREE.Vector3(0, 1, 0), target: new THREE.Vector3(0, 1, 0), text: 'Projects', href: '#projects' },
    { position: new THREE.Vector3(2, 1, 0), target: new THREE.Vector3(2, 1, 0), text: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 200, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, 200);
    containerRef.current.appendChild(renderer.domElement);

    // Create text sprites for each nav item
    const sprites = navItems.map(item => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (!context) return null;

      canvas.width = 256;
      canvas.height = 64;

      context.font = 'bold 32px Inter';
      context.textAlign = 'center';
      context.fillStyle = theme === 'dark' ? '#E1E1E1' : '#2C3E50';
      context.fillText(item.text, 128, 40);

      const texture = new THREE.CanvasTexture(canvas);
      const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
      const sprite = new THREE.Sprite(material);
      sprite.position.copy(item.position);
      sprite.scale.set(1, 0.25, 1);
      
      return sprite;
    });

    sprites.forEach(sprite => sprite && scene.add(sprite));

    camera.position.z = 5;

    // Handle hover and click
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / 200) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children);

      scene.children.forEach((child) => {
        if (child instanceof THREE.Sprite) {
          child.scale.set(1, 0.25, 1);
        }
      });

      if (intersects.length > 0) {
        const sprite = intersects[0].object;
        if (sprite instanceof THREE.Sprite) {
          sprite.scale.set(1.2, 0.3, 1.2);
        }
      }
    };

    const onClick = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / 200) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children);

      if (intersects.length > 0) {
        const index = scene.children.indexOf(intersects[0].object);
        const href = navItems[index].href;
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onClick);

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onClick);
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, [theme]);

  return (
    <div 
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-[200px] z-50"
      style={{
        background: theme === 'dark'
          ? 'linear-gradient(to bottom, rgba(26,26,26,0.9) 0%, rgba(26,26,26,0) 100%)'
          : 'linear-gradient(to bottom, rgba(246,247,249,0.9) 0%, rgba(246,247,249,0) 100%)'
      }}
    />
  );
};

export default NavigationParticles; 