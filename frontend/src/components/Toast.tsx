'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  id: string;
  message: string;
  type?: ToastType;
  duration?: number;
  onClose?: (id: string) => void;
}

const typeStyles: Record<ToastType, string> = {
  success: 'bg-success/90 text-white border border-success',
  error: 'bg-error/90 text-white border border-error',
  info: 'bg-info/90 text-white border border-info',
  warning: 'bg-warning/90 text-white border border-warning',
};

const typeIcons: Record<ToastType, string> = {
  success:
    'M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z',
  error: 'M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z',
  info: 'M18 8a6 6 0 016 6v7H0v-7a6 6 0 016-6h12z',
  warning: 'M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z',
};

const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const Toast: React.FC<ToastProps> = ({ id, message, type = 'info', duration = 3000, onClose }) => {
  const reducedMotion = prefersReducedMotion();

  useEffect(() => {
    if (duration === 0) return;

    const timer = setTimeout(() => {
      onClose?.(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  return (
    <motion.div
      className={`rounded-lg shadow-lg px-4 py-3 flex items-center gap-3 ${typeStyles[type]}`}
      initial={{ opacity: 0, x: 400 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 400 }}
      transition={{
        duration: reducedMotion ? 0.01 : 0.3,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d={typeIcons[type]} clipRule="evenodd" />
      </svg>
      <p className="text-sm font-medium">{message}</p>
    </motion.div>
  );
};

Toast.displayName = 'Toast';

/* Toast container for managing multiple toasts */
interface ToastContainerProps {
  toasts: Omit<ToastProps, 'onClose'>[];
  onClose: (id: string) => void;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

const positionStyles: Record<string, string> = {
  'top-right': 'top-4 right-4',
  'top-left': 'top-4 left-4',
  'bottom-right': 'bottom-4 right-4',
  'bottom-left': 'bottom-4 left-4',
};

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onClose, position = 'bottom-right' }) => {
  return (
    <div className={`fixed ${positionStyles[position]} z-toast pointer-events-none`}>
      <AnimatePresence mode="popLayout">
        <div className="flex flex-col gap-2 pointer-events-auto">
          {toasts.map((toast) => (
            <Toast key={toast.id} {...toast} onClose={onClose} />
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
};

ToastContainer.displayName = 'ToastContainer';
