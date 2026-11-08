import React from 'react';

interface RiskMeterProps {
  riskScore: number; // 0.0 to 1.0
  acceptThreshold?: number; // default 0.15
  escalateThreshold?: number; // default 0.85
}

export const RiskMeter: React.FC<RiskMeterProps> = ({
  riskScore,
  acceptThreshold = 0.15,
  escalateThreshold = 0.85,
}) => {
  const TOTAL_SEGMENTS = 20;
  const activeSegments = Math.round(riskScore * TOTAL_SEGMENTS);

  // Determine current decision zone
  const getZoneColor = (val: number) => {
    if (val < acceptThreshold) return 'var(--accept)';
    if (val < escalateThreshold) return 'var(--confirm)';
    return 'var(--escalate)';
  };

  const currentColor = getZoneColor(riskScore);

  return (
    <div
      style={{
        backgroundColor: 'var(--navy-850)',
        border: '1px solid var(--navy-300)',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      {/* Header with numeric value */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            color: 'var(--text-3)',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
          }}
        >
          CALIBRATED RISK PROBABILITY
        </span>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '28px',
              fontWeight: 600,
              color: currentColor,
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {(riskScore * 100).toFixed(1)}%
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              color: 'var(--text-3)',
            }}
          >
            RISK INDEX
          </span>
        </div>
      </div>

      {/* 20 Segments Bar */}
      <div
        style={{
          display: 'flex',
          gap: '3px',
          height: '14px',
          backgroundColor: 'var(--navy-900)',
          padding: '2px',
          border: '1px solid var(--navy-300)',
        }}
      >
        {Array.from({ length: TOTAL_SEGMENTS }).map((_, i) => {
          const segVal = (i + 1) / TOTAL_SEGMENTS;
          const isFilled = i < activeSegments;
          const segColor = getZoneColor(segVal);

          return (
            <div
              key={i}
              style={{
                flex: 1,
                backgroundColor: isFilled ? segColor : 'var(--navy-800)',
                transition: 'background-color 280ms cubic-bezier(0, 0, 0.3, 1)',
              }}
            />
          );
        })}
      </div>

      {/* Threshold markers */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          color: 'var(--text-3)',
          paddingTop: '2px',
        }}
      >
        <span style={{ color: 'var(--accept)' }}>
          ACCEPT &lt; {acceptThreshold * 100}%
        </span>
        <span style={{ color: 'var(--confirm)' }}>
          CONFIRM ({acceptThreshold * 100}%–{escalateThreshold * 100}%)
        </span>
        <span style={{ color: 'var(--escalate)' }}>
          ESCALATE &gt; {escalateThreshold * 100}%
        </span>
      </div>
    </div>
  );
};
