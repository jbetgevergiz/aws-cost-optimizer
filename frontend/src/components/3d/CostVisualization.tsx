'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface CostData {
  service: string;
  cost: number;
}

interface CostVisualizationProps {
  data?: CostData[];
  height?: number;
}

export const CostVisualization: React.FC<CostVisualizationProps> = ({
  data = [
    { service: 'EC2', cost: 5200 },
    { service: 'RDS', cost: 3100 },
    { service: 'S3', cost: 2400 },
    { service: 'Lambda', cost: 1800 },
    { service: 'CloudFront', cost: 1500 },
    { service: 'DynamoDB', cost: 1200 },
    { service: 'ElastiCache', cost: 900 },
    { service: 'NAT Gateway', cost: 800 },
    { service: 'Route53', cost: 450 },
    { service: 'CloudWatch', cost: 350 },
  ],
  height = 500,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const barsRef = useRef<THREE.Mesh[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / height,
      0.1,
      1000
    );
    camera.position.set(15, 10, 15);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, height);
    renderer.setClearColor(0x0a0e27, 0.1);
    renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 20, 10);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const accentLight = new THREE.PointLight(0xd4af37, 0.5, 100);
    accentLight.position.set(-15, 15, 15);
    scene.add(accentLight);

    // Create bars
    const maxCost = Math.max(...data.map(d => d.cost));
    const cols = 4;
    const gap = 3;

    const getCostColor = (cost: number, max: number) => {
      const ratio = cost / max;
      if (ratio < 0.3) return 0x10b981; // Green
      if (ratio < 0.6) return 0x06b6d4; // Cyan
      if (ratio < 0.8) return 0xd4af37; // Gold
      return 0xff6b6b; // Red
    };

    data.forEach((item, idx) => {
      const row = Math.floor(idx / cols);
      const col = idx % cols;
      const x = (col - cols / 2) * gap;
      const z = (row - Math.ceil(data.length / cols) / 2) * gap;
      const barHeight = (item.cost / maxCost) * 10;
      const color = getCostColor(item.cost, maxCost);

      const geometry = new THREE.BoxGeometry(1.8, barHeight, 1.8);
      const material = new THREE.MeshStandardMaterial({
        color,
        metalness: 0.3,
        roughness: 0.4,
        emissive: color,
        emissiveIntensity: 0.2,
      });

      const bar = new THREE.Mesh(geometry, material);
      bar.castShadow = true;
      bar.receiveShadow = true;
      bar.position.set(x, barHeight / 2, z);
      bar.userData = { service: item.service, cost: item.cost };

      scene.add(bar);
      barsRef.current.push(bar);
    });

    // Grid
    const gridHelper = new THREE.GridHelper(20, 10, 0x444466, 0x222233);
    gridHelper.position.y = -0.5;
    scene.add(gridHelper);

    // Animation loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Subtle rotation
      barsRef.current.forEach((bar) => {
        bar.rotation.y += 0.0005;
      });

      scene.rotation.y += 0.0001;
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
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
  }, [data, height]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: `${height}px`,
        borderRadius: '0.75rem',
        overflow: 'hidden',
      }}
    />
  );
};
