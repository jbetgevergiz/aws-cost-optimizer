import React from 'react';

interface MetricCardProps {
  title: string;
  value: string;
  change?: string;
  icon?: string;
  trend?: 'up' | 'down' | 'neutral';
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  icon,
  trend = 'neutral',
}) => {
  const getTrendColor = () => {
    if (trend === 'up') return '#10b981';
    if (trend === 'down') return '#ef4444';
    return '#06b6d4';
  };

  return (
    <div
      style={{
        position: 'relative',
        background: 'rgba(26, 31, 58, 0.7)',
        backdropFilter: 'blur(20px)',
        border: '2px solid',
        borderColor: 'rgba(212, 175, 55, 0.3)',
        borderRadius: '1rem',
        padding: '1.5rem',
        overflow: 'hidden',
        transition: 'all var(--transition-normal)',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = 'rgba(212, 175, 55, 0.6)';
        el.style.boxShadow = '0 8px 32px rgba(212, 175, 55, 0.1)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = 'rgba(212, 175, 55, 0.3)';
        el.style.boxShadow = 'none';
      }}
    >
      {/* Glow effect */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background:
            'radial-gradient(circle at 0% 0%, rgba(212, 175, 55, 0.1), transparent)',
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '1rem',
          }}
        >
          <h4
            style={{
              fontSize: '0.875rem',
              color: 'var(--color-text-secondary)',
              margin: 0,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              fontWeight: 500,
            }}
          >
            {title}
          </h4>
          {icon && <span style={{ fontSize: '1.5rem' }}>{icon}</span>}
        </div>

        <p
          style={{
            fontSize: '1.875rem',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            margin: '0.5rem 0',
          }}
        >
          {value}
        </p>

        {change && (
          <p
            style={{
              fontSize: '0.875rem',
              color: getTrendColor(),
              margin: 0,
              fontWeight: 500,
            }}
          >
            {change}
          </p>
        )}
      </div>
    </div>
  );
};
