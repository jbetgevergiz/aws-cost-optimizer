'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export type InputType = 'text' | 'email' | 'password' | 'number' | 'search' | 'url';
export type InputSize = 'sm' | 'md' | 'lg';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  inputSize?: InputSize;
  icon?: React.ReactNode;
  helperText?: string;
}

const sizeStyles: Record<InputSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      inputSize = 'md',
      icon,
      helperText,
      disabled = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(!!props.defaultValue);
    const reducedMotion = prefersReducedMotion();

    const baseStyles = 'w-full rounded-base border-2 bg-bg-secondary text-text-primary placeholder-text-tertiary';
    const borderStyle = error
      ? 'border-error focus:border-error focus:outline-none'
      : 'border-border-light focus:border-primary focus:outline-none focus:shadow-md';
    const disabledStyle = disabled ? 'opacity-50 cursor-not-allowed bg-bg-tertiary' : '';
    const iconPadding = icon ? 'pl-10' : '';

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      props.onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      setHasValue(!!e.target.value);
      props.onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(!!e.target.value);
      props.onChange?.(e);
    };

    return (
      <div className="w-full">
        {label && (
          <motion.label
            className="block text-sm font-medium text-text-primary mb-2"
            animate={{ color: isFocused ? '#d4af37' : '#ffffff' }}
            transition={{ duration: reducedMotion ? 0.01 : 0.15 }}
          >
            {label}
            {props.required && <span className="text-error ml-1">*</span>}
          </motion.label>
        )}
        <div className="relative">
          {icon && <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-tertiary">{icon}</div>}
          <input
            ref={ref}
            disabled={disabled}
            className={`${baseStyles} ${borderStyle} ${disabledStyle} ${iconPadding} ${sizeStyles[inputSize]} ${className}`}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            {...props}
          />
        </div>
        {error && (
          <motion.p
            className="text-error text-sm mt-1"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: reducedMotion ? 0.01 : 0.2 }}
          >
            {error}
          </motion.p>
        )}
        {helperText && !error && (
          <motion.p
            className="text-text-tertiary text-sm mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reducedMotion ? 0.01 : 0.3 }}
          >
            {helperText}
          </motion.p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

/* Textarea component using same design system */
interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  label?: string;
  error?: string;
  inputSize?: InputSize;
  helperText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      inputSize = 'md',
      helperText,
      disabled = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const reducedMotion = prefersReducedMotion();

    const baseStyles = 'w-full rounded-base border-2 bg-bg-secondary text-text-primary placeholder-text-tertiary resize-none';
    const borderStyle = error
      ? 'border-error focus:border-error focus:outline-none'
      : 'border-border-light focus:border-primary focus:outline-none focus:shadow-md';
    const disabledStyle = disabled ? 'opacity-50 cursor-not-allowed bg-bg-tertiary' : '';

    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(true);
      props.onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(false);
      props.onBlur?.(e);
    };

    return (
      <div className="w-full">
        {label && (
          <motion.label
            className="block text-sm font-medium text-text-primary mb-2"
            animate={{ color: isFocused ? '#d4af37' : '#ffffff' }}
            transition={{ duration: reducedMotion ? 0.01 : 0.15 }}
          >
            {label}
            {props.required && <span className="text-error ml-1">*</span>}
          </motion.label>
        )}
        <textarea
          ref={ref}
          disabled={disabled}
          className={`${baseStyles} ${borderStyle} ${disabledStyle} ${sizeStyles[inputSize]} ${className}`}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        {error && (
          <motion.p
            className="text-error text-sm mt-1"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: reducedMotion ? 0.01 : 0.2 }}
          >
            {error}
          </motion.p>
        )}
        {helperText && !error && (
          <motion.p
            className="text-text-tertiary text-sm mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reducedMotion ? 0.01 : 0.3 }}
          >
            {helperText}
          </motion.p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
