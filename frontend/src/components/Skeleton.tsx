'use client';

import React from 'react';
import { motion } from 'framer-motion';

export type SkeletonVariant = 'text' | 'card' | 'metric' | 'image';

interface SkeletonProps {
  variant?: SkeletonVariant;
  count?: number;
  className?: string;
}

const variantStyles: Record<SkeletonVariant, string> = {
  text: 'h-4 rounded-sm',
  card: 'h-[120px] rounded-lg',
  metric: 'h-[48px] rounded-lg',
  image: 'h-[200px] rounded-lg',
};

const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const Skeleton: React.FC<SkeletonProps> = ({ variant = 'text', count = 1, className = '' }) => {
  const reducedMotion = prefersReducedMotion();
  const baseStyles = `bg-gradient-to-r from-transparent via-white/10 to-transparent bg-[length:200%_100%] ${variantStyles[variant]} ${className}`;

  const skeletonVariants = {
    animate: {
      backgroundPosition: ['200% 0', '-200% 0'],
      transition: {
        duration: reducedMotion ? 0.01 : 2,
        repeat: Infinity,
        ease: 'linear',
      },
    },
  };

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className={baseStyles}
          variants={reducedMotion ? {} : skeletonVariants}
          animate="animate"
          style={{ marginBottom: i < count - 1 ? '12px' : '0' }}
        />
      ))}
    </>
  );
};

Skeleton.displayName = 'Skeleton';
