'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closeOnBackdropClick?: boolean;
}

const sizeStyles: Record<string, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-2xl',
};

const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  closeOnBackdropClick = true,
}) => {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent scrolling when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  const reducedMotion = prefersReducedMotion();
  const backdropDuration = reducedMotion ? 0.01 : 0.2;
  const contentDuration = reducedMotion ? 0.01 : 0.3;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: backdropDuration }}
            className="fixed inset-0 z-modal-backdrop bg-neutral-950/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={handleBackdropClick}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: contentDuration, ease: [0.4, 0, 0.2, 1] }}
            className={`fixed inset-0 z-modal flex items-center justify-center p-4 pointer-events-none`}
          >
            <div
              className={`bg-bg-secondary border border-border-light rounded-lg shadow-2xl w-full ${sizeStyles[size]} max-h-[90vh] overflow-y-auto pointer-events-auto`}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              {/* Header */}
              {title && (
                <div className="flex items-center justify-between px-6 py-4 border-b border-border-light">
                  <h2 id="modal-title" className="text-2xl font-bold text-text-primary">
                    {title}
                  </h2>
                  <motion.button
                    onClick={onClose}
                    className="text-text-tertiary hover:text-text-primary transition-colors duration-fast p-2"
                    aria-label="Close modal"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: reducedMotion ? 0.01 : 0.15 }}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>
              )}

              {/* Body */}
              <div className="px-6 py-4">{children}</div>

              {/* Footer */}
              {footer && <div className="px-6 py-4 border-t border-border-light bg-bg-tertiary rounded-b-lg">{footer}</div>}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

Modal.displayName = 'Modal';
