'use client';

import React from 'react';
import { motion } from 'framer-motion';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-text-inverse shadow-md',
  secondary: 'bg-secondary text-text-inverse shadow-md',
  outline: 'border-2 border-primary text-primary',
  ghost: 'text-primary',
  danger: 'bg-error text-text-inverse shadow-md',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-2 text-sm font-medium rounded-sm',
  md: 'px-4 py-2 text-base font-medium rounded-base',
  lg: 'px-6 py-3 text-lg font-semibold rounded-md',
};

const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

const animationDuration = prefersReducedMotion() ? 0.01 : 0.2;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      fullWidth = false,
      disabled = false,
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium disabled:opacity-50 disabled:cursor-not-allowed';
    const widthStyle = fullWidth ? 'w-full' : '';
    const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`;

    return (
      <motion.button
        ref={ref}
        disabled={disabled || isLoading}
        className={combinedClassName}
        whileHover={!disabled && !isLoading ? { scale: 1.05, boxShadow: '0 12px 48px rgba(212, 175, 55, 0.2)' } : {}}
        whileTap={!disabled && !isLoading ? { scale: 0.95 } : {}}
        transition={{ duration: animationDuration, ease: [0.4, 0, 0.2, 1] }}
        {...props}
      >
        {isLoading ? (
          <>
            <motion.svg
              className="-ml-1 mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </motion.svg>
            Loading...
          </>
        ) : (
          children
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
