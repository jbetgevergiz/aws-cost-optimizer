'use client';

import React from 'react';
import { motion } from 'framer-motion';

export type CardVariant = 'default' | 'glass' | 'elevated' | 'hover';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  children: React.ReactNode;
}

const variantStyles: Record<CardVariant, string> = {
  default: 'bg-bg-secondary border border-border-light shadow-sm',
  glass: 'bg-glass-light backdrop-blur-glass border border-glass-medium shadow-glass',
  elevated: 'bg-bg-secondary border border-border-medium shadow-md',
  hover: 'bg-bg-secondary border border-border-light shadow-sm',
};

const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', className = '', children, ...props }, ref) => {
    const reducedMotion = prefersReducedMotion();
    const baseStyles = 'rounded-lg';
    const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`;

    const hoverVariant = variant === 'hover' || variant === 'default';

    return (
      <motion.div
        ref={ref}
        className={combinedClassName}
        whileHover={
          hoverVariant && !reducedMotion
            ? {
                y: -2,
                borderColor: 'rgba(212, 175, 55, 0.4)',
                boxShadow: '0 16px 48px rgba(212, 175, 55, 0.15)',
              }
            : {}
        }
        transition={{ duration: reducedMotion ? 0.01 : 0.25, ease: [0.4, 0, 0.2, 1] }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';

/* Card child components for composition */
export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = '', ...props }, ref) => (
    <div ref={ref} className={`px-6 py-4 border-b border-border-light ${className}`} {...props} />
  )
);
CardHeader.displayName = 'CardHeader';

export const CardBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = '', ...props }, ref) => (
    <div ref={ref} className={`px-6 py-4 ${className}`} {...props} />
  )
);
CardBody.displayName = 'CardBody';

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = '', ...props }, ref) => (
    <div ref={ref} className={`px-6 py-4 border-t border-border-light bg-bg-tertiary rounded-b-lg ${className}`} {...props} />
  )
);
CardFooter.displayName = 'CardFooter';
