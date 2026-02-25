'use client';

import React, { useEffect, useState } from 'react';

interface CostTickerProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

export const CostTicker: React.FC<CostTickerProps> = ({
  value,
  duration = 2000,
  prefix = '$',
  suffix = '',
  decimals = 0,
  className = '',
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const durationMs = duration;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / durationMs, 1);
      const current = Math.floor(value * progress);
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration]);

  const formatted = displayValue.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
};

CostTicker.displayName = 'CostTicker';

/* Number counter component for generic use */
interface NumberCounterProps {
  value: number;
  duration?: number;
  decimals?: number;
  className?: string;
  format?: (value: number) => string;
}

export const NumberCounter: React.FC<NumberCounterProps> = ({
  value,
  duration = 2000,
  decimals = 0,
  className = '',
  format = (v) =>
    v.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }),
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const durationMs = duration;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / durationMs, 1);
      const current = Math.floor(value * progress);
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration]);

  return <span className={className}>{format(displayValue)}</span>;
};

NumberCounter.displayName = 'NumberCounter';
