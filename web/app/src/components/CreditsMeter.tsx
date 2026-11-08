import React from 'react';

interface CreditsMeterProps {
  usedRuns?: number;
  maxRuns?: number;
  environment?: 'LIVE' | 'REPLAY';
}

export const CreditsMeter: React.FC<CreditsMeterProps> = ({
  usedRuns = 42,
  maxRuns = 150,
  environment = 'LIVE',
}) => {
  const percentage = Math.min(100, Math.round((usedRuns / maxRuns) * 100));
  const isHigh = percentage >= 80;

  const barColor = isHigh ? 'var(--confirm)' : 'var(--navy-500)';

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        backgroundColor: 'var(--navy-900)',
        border: '1px solid var(--navy-300)',
        padding: '4px 12px',
        height: '32px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span
          style={{
            width: '6px',
            height: '6px',
            backgroundColor: environment === 'LIVE' ? 'var(--accept)' : 'var(--confirm)',
            display: 'inline-block',
          }}
        />
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            fontWeight: 500,
            color: 'var(--text-1)',
            letterSpacing: '0.04em',
          }}
        >
          {environment}
        </span>
      </div>

      <div style={{ width: '1px', height: '14px', backgroundColor: 'var(--navy-300)' }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--text-3)',
            letterSpacing: '0.04em',
          }}
        >
          LIVE RUNS TODAY:
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: isHigh ? 'var(--confirm)' : 'var(--text-1)',
            fontWeight: 500,
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {usedRuns}/{maxRuns}
        </span>
      </div>

      {/* Mini Progress Bar */}
      <div
        style={{
          width: '48px',
          height: '6px',
          backgroundColor: 'var(--navy-800)',
          display: 'flex',
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: '100%',
            backgroundColor: barColor,
            transition: 'width 280ms var(--ease)',
          }}
        />
      </div>
    </div>
  );
};
