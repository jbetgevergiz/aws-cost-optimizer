'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';

interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  primaryCTA?: {
    text: string;
    onClick: () => void;
    isLoading?: boolean;
  };
  secondaryCTA?: {
    text: string;
    onClick: () => void;
  };
  backgroundImage?: string;
  backgroundColor?: string;
  children?: React.ReactNode;
  align?: 'left' | 'center' | 'right';
  minHeight?: string;
}

const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

export const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  description,
  primaryCTA,
  secondaryCTA,
  backgroundImage,
  backgroundColor = 'bg-gradient-to-b from-bg-secondary to-bg-primary',
  children,
  align = 'center',
  minHeight = 'min-h-[500px] md:min-h-[600px]',
}) => {
  const alignmentStyles = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  const containerAlignment = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  };

  const reducedMotion = prefersReducedMotion();

  return (
    <section
      className={`relative w-full ${minHeight} overflow-hidden ${backgroundColor} flex items-center`}
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
    >
      {/* Overlay for text readability if background image */}
      {backgroundImage && <div className="absolute inset-0 bg-neutral-950/60 z-0" />}

      {/* Content Container */}
      <motion.div
        className={`relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col ${alignmentStyles[align]} ${containerAlignment[align]}`}
        variants={reducedMotion ? {} : containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Subtitle/Badge */}
        {subtitle && (
          <motion.div className="inline-block mb-4" variants={itemVariants}>
            <span className="px-4 py-2 rounded-full bg-glass-medium border border-glass-light text-primary text-sm font-semibold">
              {subtitle}
            </span>
          </motion.div>
        )}

        {/* Main Title */}
        <motion.h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-extrabold text-text-primary mb-6 leading-tight max-w-4xl" variants={itemVariants}>
          {title}
        </motion.h1>

        {/* Description */}
        {description && (
          <motion.p className="text-lg sm:text-xl text-text-secondary mb-8 max-w-2xl leading-relaxed" variants={itemVariants}>
            {description}
          </motion.p>
        )}

        {/* CTAs */}
        {(primaryCTA || secondaryCTA) && (
          <motion.div className={`flex flex-col sm:flex-row gap-4 ${align === 'center' ? 'justify-center' : align === 'right' ? 'justify-end' : ''}`} variants={itemVariants}>
            {primaryCTA && (
              <Button variant="primary" size="lg" onClick={primaryCTA.onClick} isLoading={primaryCTA.isLoading} className="w-full sm:w-auto">
                {primaryCTA.text}
              </Button>
            )}
            {secondaryCTA && (
              <Button variant="outline" size="lg" onClick={secondaryCTA.onClick} className="w-full sm:w-auto">
                {secondaryCTA.text}
              </Button>
            )}
          </motion.div>
        )}

        {/* Custom Children */}
        {children && (
          <motion.div className="mt-12" variants={itemVariants}>
            {children}
          </motion.div>
        )}
      </motion.div>

      {/* Gradient Overlay for visual enhancement */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg-primary to-transparent z-0" />
    </section>
  );
};

Hero.displayName = 'Hero';
