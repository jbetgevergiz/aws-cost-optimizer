'use client';

import React from 'react';

interface NavItem {
  id: string;
  label: string;
  icon: string;
  isActive: boolean;
  onClick: () => void;
}

interface DashboardSidebarProps {
  navItems: NavItem[];
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ navItems }) => {
  return (
    <aside
      style={{
        width: '250px',
        borderRight: '1px solid var(--color-border-light)',
        backgroundColor: 'var(--color-bg-secondary)',
        padding: '2rem 0',
        height: '100vh',
        overflowY: 'auto',
        position: 'sticky',
        top: 0,
      }}
    >
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={item.onClick}
            style={{
              padding: '1rem 1.5rem',
              border: 'none',
              backgroundColor: item.isActive ? 'var(--color-bg-tertiary)' : 'transparent',
              color: item.isActive ? 'var(--color-primary)' : 'var(--color-text-secondary)',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all var(--transition-normal)',
              fontSize: '1rem',
              fontWeight: item.isActive ? 600 : 500,
              borderLeft: item.isActive ? '3px solid var(--color-primary)' : '3px solid transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}
            onMouseEnter={(e) => {
              if (!item.isActive) {
                (e.target as HTMLButtonElement).style.backgroundColor = 'var(--color-bg-tertiary)';
                (e.target as HTMLButtonElement).style.color = 'var(--color-text-primary)';
              }
            }}
            onMouseLeave={(e) => {
              if (!item.isActive) {
                (e.target as HTMLButtonElement).style.backgroundColor = 'transparent';
                (e.target as HTMLButtonElement).style.color = 'var(--color-text-secondary)';
              }
            }}
          >
            <span style={{ fontSize: '1.25rem' }}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
};
