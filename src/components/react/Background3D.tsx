import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useThemeStore } from '../../context/ThemeContext';
import type { ThemeState } from '../../context/ThemeContext';

const Background3D = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const theme = useThemeStore((state: ThemeState) => state.theme);
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    // Enhanced scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Create interactive particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 3000; // More particles
    const posArray = new Float32Array(particlesCount * 3);
    const velocityArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Create a sphere of particles
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = Math.random() * 3;

      posArray[i] = radius * Math.sin(phi) * Math.cos(theta);
      posArray[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      posArray[i + 2] = radius * Math.cos(phi);

      // Add velocity for animation
      velocityArray[i] = (Math.random() - 0.5) * 0.01;
      velocityArray[i + 1] = (Math.random() - 0.5) * 0.01;
      velocityArray[i + 2] = (Math.random() - 0.5) * 0.01;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('velocity', new THREE.BufferAttribute(velocityArray, 3));

    // Create glowing particles
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.01,
      color: theme === 'dark' ? '#3DA76D' : '#2E8B57',
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      vertexColors: true
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 4;

    // Mouse interaction
    const onMouseMove = (event: MouseEvent) => {
      mousePosition.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mousePosition.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', onMouseMove);

    // Interactive animation
    const animate = () => {
      requestAnimationFrame(animate);

      const positions = particlesGeometry.attributes.position.array as Float32Array;
      const velocities = particlesGeometry.attributes.velocity.array as Float32Array;

      for (let i = 0; i < positions.length; i += 3) {
        // Update positions based on velocity
        positions[i] += velocities[i];
        positions[i + 1] += velocities[i + 1];
        positions[i + 2] += velocities[i + 2];

        // Mouse interaction - particles follow mouse
        const distance = Math.sqrt(
          Math.pow(positions[i] - mousePosition.current.x, 2) +
          Math.pow(positions[i + 1] - mousePosition.current.y, 2)
        );

        if (distance < 1) {
          positions[i] += (mousePosition.current.x - positions[i]) * 0.02;
          positions[i + 1] += (mousePosition.current.y - positions[i + 1]) * 0.02;
        }

        // Boundary check
        for (let j = 0; j < 3; j++) {
          if (Math.abs(positions[i + j]) > 3) {
            velocities[i + j] *= -1;
          }
        }
      }

      particlesGeometry.attributes.position.needsUpdate = true;
      particlesMesh.rotation.x += 0.0002;
      particlesMesh.rotation.y += 0.0003;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, [theme]);

  return (
    <div 
      ref={containerRef} 
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ 
        background: theme === 'dark' 
          ? 'radial-gradient(circle at center, #1A1A1A 0%, #000000 100%)'
          : 'radial-gradient(circle at center, #F6F7F9 0%, #E2E8F0 100%)'
      }}
    />
  );
};

export default Background3D; 