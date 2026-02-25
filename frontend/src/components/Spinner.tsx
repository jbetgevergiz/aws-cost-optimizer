'use client';

import React from 'react';
import { motion } from 'framer-motion';

export type SpinnerSize = 'sm' | 'md' | 'lg';

interface SpinnerProps {
  size?: SpinnerSize;
  color?: string;
  className?: string;
}

const sizeMap: Record<SpinnerSize, { container: number; borderWidth: number }> = {
  sm: { container: 24, borderWidth: 2 },
  md: { container: 40, borderWidth: 3 },
  lg: { container: 56, borderWidth: 4 },
};

const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const Spinner: React.FC<SpinnerProps> = ({ size = 'md', color = '#d4af37', className = '' }) => {
  const { container, borderWidth } = sizeMap[size];
  const reducedMotion = prefersReducedMotion();

  return (
    <motion.div
      className={className}
      style={{
        width: container,
        height: container,
        borderRadius: '50%',
        border: `${borderWidth}px solid rgba(212, 175, 55, 0.3)`,
        borderTopColor: color,
        display: 'inline-block',
      }}
      animate={{ rotate: 360 }}
      transition={{
        duration: reducedMotion ? 0.01 : 1,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  );
};

Spinner.displayName = 'Spinner';

/* Dot Spinner variant */
interface DotSpinnerProps {
  dotSize?: SpinnerSize;
  color?: string;
  className?: string;
}

export const DotSpinner: React.FC<DotSpinnerProps> = ({ dotSize = 'md', color = '#d4af37', className = '' }) => {
  const dotMap: Record<SpinnerSize, number> = { sm: 6, md: 8, lg: 10 };
  const dotDimensionMap: Record<SpinnerSize, string> = { sm: 'gap-1', md: 'gap-2', lg: 'gap-3' };
  const reducedMotion = prefersReducedMotion();

  const dimension = dotMap[dotSize];

  return (
    <div className={`flex items-center ${dotDimensionMap[dotSize]} ${className}`}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          style={{
            width: dimension,
            height: dimension,
            borderRadius: '50%',
            backgroundColor: color,
          }}
          animate={{ scale: [0.8, 1, 0.8] }}
          transition={{
            duration: reducedMotion ? 0.01 : 1.2,
            repeat: Infinity,
            delay: reducedMotion ? 0 : i * 0.15,
          }}
        />
      ))}
    </div>
  );
};

DotSpinner.displayName = 'DotSpinner';
