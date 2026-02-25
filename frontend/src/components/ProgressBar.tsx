'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  value?: number;
  isAnimating?: boolean;
  showLabel?: boolean;
  className?: string;
}

const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const ProgressBar: React.FC<ProgressBarProps> = ({ value = 0, isAnimating = false, showLabel = false, className = '' }) => {
  const reducedMotion = prefersReducedMotion();
  const clampedValue = Math.min(Math.max(value, 0), 100);

  return (
    <div className={`w-full ${className}`}>
      <div className="h-1 bg-rgba(255, 255, 255, 0.1) rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary via-cyan-400 to-primary bg-[length:200%_100%] rounded-full"
          style={{ width: `${clampedValue}%` }}
          animate={isAnimating ? { backgroundPosition: ['200% 0', '-200% 0'] } : {}}
          transition={{
            duration: reducedMotion ? 0.01 : 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>
      {showLabel && <p className="text-xs text-text-tertiary mt-1">{clampedValue}% complete</p>}
    </div>
  );
};

ProgressBar.displayName = 'ProgressBar';

/* Indeterminate progress bar */
interface IndeterminateProgressBarProps {
  className?: string;
}

export const IndeterminateProgressBar: React.FC<IndeterminateProgressBarProps> = ({ className = '' }) => {
  const reducedMotion = prefersReducedMotion();

  return (
    <div className={`w-full h-1 bg-rgba(255, 255, 255, 0.1) rounded-full overflow-hidden ${className}`}>
      <motion.div
        className="h-full bg-gradient-to-r from-transparent via-primary to-transparent bg-[length:200%_100%]"
        animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
        transition={{
          duration: reducedMotion ? 0.01 : 2,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{ width: '30%' }}
      />
    </div>
  );
};

IndeterminateProgressBar.displayName = 'IndeterminateProgressBar';
