'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SavingsAnimationProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const SavingsAnimation: React.FC<SavingsAnimationProps> = ({ children, delay = 0, className = '' }) => {
  const reducedMotion = prefersReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        duration: reducedMotion ? 0.01 : 0.3,
        delay: reducedMotion ? 0 : delay,
        type: 'spring',
        stiffness: 100,
        damping: 12,
      }}
    >
      {children}
    </motion.div>
  );
};

SavingsAnimation.displayName = 'SavingsAnimation';

/* Pulse animation for metric cards */
interface PulseAnimationProps {
  children: React.ReactNode;
  className?: string;
}

export const PulseAnimation: React.FC<PulseAnimationProps> = ({ children, className = '' }) => {
  const reducedMotion = prefersReducedMotion();

  return (
    <motion.div
      className={className}
      animate={{ scale: [1, 1.02, 1] }}
      transition={{
        duration: reducedMotion ? 0.01 : 0.4,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
};

PulseAnimation.displayName = 'PulseAnimation';

/* Staggered savings list */
interface StaggeredSavingsListProps {
  items: React.ReactNode[];
  className?: string;
}

export const StaggeredSavingsList: React.FC<StaggeredSavingsListProps> = ({ items, className = '' }) => {
  const reducedMotion = prefersReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reducedMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: reducedMotion ? 0.01 : 0.3,
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {items.map((item, index) => (
        <motion.div key={index} variants={itemVariants}>
          {item}
        </motion.div>
      ))}
    </motion.div>
  );
};

StaggeredSavingsList.displayName = 'StaggeredSavingsList';
