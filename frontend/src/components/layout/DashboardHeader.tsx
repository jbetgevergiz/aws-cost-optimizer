'use client';

import React from 'react';

interface DashboardHeaderProps {
  title?: string;
  onLogout?: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title = 'Dashboard',
  onLogout = () => {},
}) => {
  return (
    <header
      style={{
        padding: '1rem 2rem',
        borderBottom: '1px solid var(--color-border-light)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'var(--color-bg-secondary)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div
          style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            color: 'var(--color-primary)',
          }}
        >
          💰
        </div>
        <h1 style={{ fontSize: '1.5rem', color: 'var(--color-text-primary)', margin: 0 }}>
          {title}
        </h1>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <button
          onClick={onLogout}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: 'transparent',
            border: '1px solid var(--color-border-light)',
            borderRadius: '0.75rem',
            color: 'var(--color-text-primary)',
            cursor: 'pointer',
            transition: 'all var(--transition-normal)',
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLButtonElement).style.borderColor = 'var(--color-primary)';
            (e.target as HTMLButtonElement).style.color = 'var(--color-primary)';
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLButtonElement).style.borderColor = 'var(--color-border-light)';
            (e.target as HTMLButtonElement).style.color = 'var(--color-text-primary)';
          }}
        >
          Logout
        </button>
      </div>
    </header>
  );
};
