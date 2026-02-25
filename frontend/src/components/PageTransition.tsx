'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -20,
  },
};

export const PageTransition: React.FC<PageTransitionProps> = ({ children, className = '' }) => {
  const reducedMotion = prefersReducedMotion();

  return (
    <motion.div
      className={className}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{
        duration: reducedMotion ? 0.01 : 0.3,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

PageTransition.displayName = 'PageTransition';

/* Fade in only - lighter transition */
interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export const FadeIn: React.FC<FadeInProps> = ({ children, delay = 0, className = '' }) => {
  const reducedMotion = prefersReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: reducedMotion ? 0.01 : 0.3,
        delay: reducedMotion ? 0 : delay,
      }}
    >
      {children}
    </motion.div>
  );
};

FadeIn.displayName = 'FadeIn';

/* Slide in from top */
interface SlideInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export const SlideInFromTop: React.FC<SlideInProps> = ({ children, delay = 0, className = '' }) => {
  const reducedMotion = prefersReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reducedMotion ? 0.01 : 0.3,
        delay: reducedMotion ? 0 : delay,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

SlideInFromTop.displayName = 'SlideInFromTop';

/* Slide in from bottom */
interface SlideInFromBottomProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export const SlideInFromBottom: React.FC<SlideInFromBottomProps> = ({ children, delay = 0, className = '' }) => {
  const reducedMotion = prefersReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reducedMotion ? 0.01 : 0.3,
        delay: reducedMotion ? 0 : delay,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

SlideInFromBottom.displayName = 'SlideInFromBottom';
