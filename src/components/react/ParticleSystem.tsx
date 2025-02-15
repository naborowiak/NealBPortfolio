import React, { useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useThemeStore } from '../../context/ThemeContext';
import type { Theme } from '../../context/ThemeContext';

interface ParticleSystemProps {
  count?: number;
  size?: number;
  speed?: number;
  interactive?: boolean;
  color?: string;
  darkColor?: string;
  spread?: number;
  mouseForce?: number;
}

const ParticleSystem: React.FC<ParticleSystemProps> = ({
  count = 2000,
  size = 0.01,
  speed = 0.001,
  interactive = true,
  color = '#2E8B57',
  darkColor = '#3DA76D',
  spread = 3,
  mouseForce = 0.02
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const theme = useThemeStore((state) => state.theme);

  const particleData = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i += 3) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = Math.random() * spread;

      positions[i] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = radius * Math.cos(phi);

      velocities[i] = (Math.random() - 0.5) * speed;
      velocities[i + 1] = (Math.random() - 0.5) * speed;
      velocities[i + 2] = (Math.random() - 0.5) * speed;
    }

    return { positions, velocities };
  }, [count, spread, speed]);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(particleData.positions, 3));
    geometry.setAttribute('velocity', new THREE.BufferAttribute(particleData.velocities, 3));

    const material = new THREE.PointsMaterial({
      size,
      color: theme === 'dark' ? darkColor : color,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      vertexColors: true
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    camera.position.z = 4;

    if (interactive) {
      const onMouseMove = (event: MouseEvent) => {
        mousePosition.current.x = (event.clientX / window.innerWidth) * 2 - 1;
        mousePosition.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
      };

      window.addEventListener('mousemove', onMouseMove);
    }

    const animate = () => {
      requestAnimationFrame(animate);

      const positions = geometry.attributes.position.array as Float32Array;
      const velocities = geometry.attributes.velocity.array as Float32Array;

      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += velocities[i];
        positions[i + 1] += velocities[i + 1];
        positions[i + 2] += velocities[i + 2];

        if (interactive) {
          const distance = Math.sqrt(
            Math.pow(positions[i] - mousePosition.current.x, 2) +
            Math.pow(positions[i + 1] - mousePosition.current.y, 2)
          );

          if (distance < 1) {
            positions[i] += (mousePosition.current.x - positions[i]) * mouseForce;
            positions[i + 1] += (mousePosition.current.y - positions[i + 1]) * mouseForce;
          }
        }

        for (let j = 0; j < 3; j++) {
          if (Math.abs(positions[i + j]) > spread) {
            velocities[i + j] *= -1;
          }
        }
      }

      geometry.attributes.position.needsUpdate = true;
      particles.rotation.x += speed * 0.2;
      particles.rotation.y += speed * 0.3;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (interactive) {
        window.removeEventListener('mousemove', onMouseMove);
      }
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, [theme, particleData, size, color, darkColor, interactive, mouseForce]);

  return (
    <div ref={containerRef} className="fixed inset-0 -z-10" />
  );
};

export default ParticleSystem; 