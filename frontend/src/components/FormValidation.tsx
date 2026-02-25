'use client';

import React from 'react';

interface ValidationErrorProps {
  message: string;
  className?: string;
}

export const ValidationError: React.FC<ValidationErrorProps> = ({ message, className = '' }) => {
  return (
    <div className={`text-error text-sm flex items-center gap-2 ${className}`}>
      <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M18.101 12.93a1 1 0 00-1.414-1.414L10 17.172l-6.687-6.687a1 1 0 00-1.414 1.414l7.778 7.778a1.414 1.414 0 002.828 0l8.596-8.596z"
          clipRule="evenodd"
        />
      </svg>
      {message}
    </div>
  );
};

ValidationError.displayName = 'ValidationError';

/* Success message component */
interface SuccessMessageProps {
  message: string;
  icon?: React.ReactNode;
  className?: string;
}

export const SuccessMessage: React.FC<SuccessMessageProps> = ({ message, icon, className = '' }) => {
  return (
    <div className={`text-success text-sm flex items-center gap-2 ${className}`}>
      {icon ? (
        icon
      ) : (
        <svg
          className="w-4 h-4 flex-shrink-0"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      )}
      {message}
    </div>
  );
};

SuccessMessage.displayName = 'SuccessMessage';

/* Form field wrapper with error shake */
interface ValidatedFieldProps {
  children: React.ReactNode;
  error?: string;
  className?: string;
}

export const ValidatedField: React.FC<ValidatedFieldProps> = ({ children, error, className = '' }) => {
  return (
    <div className={className}>
      {children}
      {error && <ValidationError message={error} className="mt-2" />}
    </div>
  );
};

ValidatedField.displayName = 'ValidatedField';
