'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface SavingsAnimationProps {
  amount?: number;
  height?: number;
}

export const SavingsAnimation: React.FC<SavingsAnimationProps> = ({
  amount = 3720,
  height = 300,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLParagraphElement>(null);
  const [displayAmount, setDisplayAmount] = useState(0);

  useEffect(() => {
    // Animate counter from 0 to amount
    let startTime: number | null = null;
    const duration = 2000; // 2 seconds

    const animateCounter = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const newAmount = Math.floor(amount * progress);
      setDisplayAmount(newAmount);

      if (progress < 1) {
        requestAnimationFrame(animateCounter);
      }
    };

    requestAnimationFrame(animateCounter);
  }, [amount]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Three.js scene for particles
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / height,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(containerRef.current.clientWidth, height);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    // Lighting
    const light = new THREE.PointLight(0xd4af37, 1, 100);
    light.position.set(0, 0, 3);
    scene.add(light);

    // Particle system
    const particleCount = 100;
    const positions = new Float32Array(particleCount * 3);
    const velocities: Array<{ x: number; y: number; z: number }> = [];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = 0;

      velocities.push({
        x: (Math.random() - 0.5) * 0.05,
        y: Math.random() * 0.08 + 0.02,
        z: 0,
      });
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0xd4af37,
      size: 0.05,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.8,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Animation loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      for (let i = 0; i < positions.length / 3; i++) {
        const vel = velocities[i];
        positions[i * 3] += vel.x;
        positions[i * 3 + 1] += vel.y;
        positions[i * 3 + 2] += vel.z;

        if (positions[i * 3 + 1] > 5) {
          positions[i * 3] = (Math.random() - 0.5) * 10;
          positions[i * 3 + 1] = -5;
          positions[i * 3 + 2] = 0;
        }
      }

      geometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [height]);

  return (
    <div className="savings-section">
      <div
        ref={containerRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: `${height}px`,
          pointerEvents: 'none',
          borderRadius: '0.75rem',
          overflow: 'hidden',
        }}
      />
      <div
        className="savings-text"
        style={{
          position: 'relative',
          zIndex: 2,
          padding: '2.5rem',
          textAlign: 'center',
        }}
      >
        <h3 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)' }}>
          Monthly Savings
        </h3>
        <p
          ref={counterRef}
          style={{
            fontSize: '2.25rem',
            color: '#10b981',
            fontWeight: 700,
            margin: '0.5rem 0',
          }}
        >
          ${displayAmount.toLocaleString()}
        </p>
        <p
          style={{
            fontSize: '0.875rem',
            color: 'var(--color-text-secondary)',
            margin: 0,
          }}
        >
          And growing...
        </p>
      </div>
    </div>
  );
};
