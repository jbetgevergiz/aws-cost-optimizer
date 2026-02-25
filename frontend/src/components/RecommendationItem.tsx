'use client';

import React, { useState } from 'react';

interface RecommendationItemProps {
  title: string;
  description: string;
  savingsPerMonth: number;
  status: 'pending' | 'applied' | 'rolled_back';
  onApply: () => void;
  onRollback?: () => void;
}

export const RecommendationItem: React.FC<RecommendationItemProps> = ({
  title,
  description,
  savingsPerMonth,
  status,
  onApply,
  onRollback,
}) => {
  const [isApplying, setIsApplying] = useState(false);

  const getStatusColor = () => {
    if (status === 'applied') return '#10b981';
    if (status === 'rolled_back') return '#ef4444';
    return '#06b6d4';
  };

  const getStatusLabel = () => {
    if (status === 'applied') return '✓ Applied';
    if (status === 'rolled_back') return '↺ Rolled Back';
    return '○ Pending';
  };

  return (
    <div
      style={{
        borderRadius: '0.75rem',
        padding: '1.5rem',
        border: '1px solid var(--color-border-light)',
        backgroundColor: 'var(--color-bg-secondary)',
        transition: 'all var(--transition-normal)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--color-border-medium)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
        (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--color-border-light)';
      }}
    >
      <div style={{ flex: 1 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '0.5rem',
          }}
        >
          <h5
            style={{
              fontSize: '1rem',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              margin: 0,
            }}
          >
            {title}
          </h5>
          <span
            style={{
              padding: '0.25rem 0.75rem',
              borderRadius: '0.25rem',
              fontSize: '0.75rem',
              fontWeight: 600,
              backgroundColor: `${getStatusColor()}20`,
              color: getStatusColor(),
            }}
          >
            {getStatusLabel()}
          </span>
        </div>

        <p
          style={{
            fontSize: '0.875rem',
            color: 'var(--color-text-secondary)',
            margin: '0.5rem 0 0 0',
          }}
        >
          {description}
        </p>

        <p
          style={{
            fontSize: '1rem',
            fontWeight: 700,
            color: '#10b981',
            margin: '0.75rem 0 0 0',
          }}
        >
          Save ${savingsPerMonth}/month
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          gap: '0.75rem',
          marginLeft: '1.5rem',
          flexShrink: 0,
        }}
      >
        {status === 'pending' && (
          <button
            onClick={() => {
              setIsApplying(true);
              onApply();
              setTimeout(() => setIsApplying(false), 500);
            }}
            disabled={isApplying}
            style={{
              padding: '0.5rem 1.25rem',
              backgroundColor: 'var(--color-primary)',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.875rem',
              transition: 'all var(--transition-normal)',
              opacity: isApplying ? 0.7 : 1,
            }}
            onMouseEnter={(e) => {
              if (!isApplying) {
                (e.target as HTMLButtonElement).style.backgroundColor = 'var(--color-primary-dark)';
              }
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.backgroundColor = 'var(--color-primary)';
            }}
          >
            {isApplying ? 'Applying...' : 'Apply'}
          </button>
        )}

        {status === 'applied' && onRollback && (
          <button
            onClick={onRollback}
            style={{
              padding: '0.5rem 1.25rem',
              backgroundColor: 'var(--color-error)',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.875rem',
              transition: 'all var(--transition-normal)',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.backgroundColor = 'var(--color-error-dark)';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.backgroundColor = 'var(--color-error)';
            }}
          >
            Rollback
          </button>
        )}
      </div>
    </div>
  );
};
