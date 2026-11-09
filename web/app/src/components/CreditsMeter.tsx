import React from 'react';
import { Zap } from 'lucide-react';

interface CreditsMeterProps {
  usedRuns?: number;
  maxRuns?: number;
  environment?: 'LIVE' | 'REPLAY';
}

export const CreditsMeter: React.FC<CreditsMeterProps> = ({
  usedRuns = 18,
  maxRuns = 150,
  environment = 'LIVE',
}) => {
  const percentage = Math.min(100, Math.round((usedRuns / maxRuns) * 100));
  const isHigh = percentage >= 80;

  const barColor = isHigh ? 'var(--confirm)' : 'var(--sapphire-500)';

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        backgroundColor: 'var(--sky-100)',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-full)',
        padding: '4px 14px',
        height: '34px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span
          style={{
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            backgroundColor: environment === 'LIVE' ? 'var(--accept)' : 'var(--confirm)',
            display: 'inline-block',
            boxShadow: environment === 'LIVE' ? '0 0 8px rgba(16, 185, 129, 0.5)' : 'none',
          }}
        />
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            fontWeight: 700,
            color: 'var(--text-primary)',
            letterSpacing: '0.04em',
          }}
        >
          {environment}
        </span>
      </div>

      <div style={{ width: '1px', height: '14px', backgroundColor: 'var(--border-strong)' }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <Zap size={13} style={{ color: 'var(--sapphire-600)' }} />
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--text-secondary)',
          }}
        >
          RUNS:
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            color: isHigh ? 'var(--confirm)' : 'var(--text-primary)',
            fontWeight: 700,
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {usedRuns}/{maxRuns}
        </span>
      </div>

      {/* Mini Progress Bar */}
      <div
        style={{
          width: '52px',
          height: '6px',
          backgroundColor: 'var(--sky-300)',
          borderRadius: 'var(--radius-full)',
          overflow: 'hidden',
          display: 'flex',
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: '100%',
            backgroundColor: barColor,
            borderRadius: 'var(--radius-full)',
            transition: 'width 280ms var(--ease)',
          }}
        />
      </div>
    </div>
  );
};
