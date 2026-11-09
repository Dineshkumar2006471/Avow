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
  const TOTAL_SEGMENTS = 24;
  const activeSegments = Math.round(riskScore * TOTAL_SEGMENTS);

  // Determine current decision zone
  const getZoneColor = (val: number) => {
    if (val < acceptThreshold) return '#10B981';
    if (val < escalateThreshold) return '#F59E0B';
    return '#EF4444';
  };

  const currentColor = getZoneColor(riskScore);
  const zoneLabel = riskScore < acceptThreshold ? 'LOW RISK' : riskScore < escalateThreshold ? 'MODERATE RISK (READ-BACK)' : 'HIGH RISK (ESCALATE)';

  return (
    <div
      style={{
        backgroundColor: 'var(--surface-primary)',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-sm)',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
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
        <div>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 600,
              color: 'var(--text-tertiary)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              display: 'block',
              marginBottom: '2px',
            }}
          >
            CALIBRATED RISK PROBABILITY
          </span>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '12px',
              fontWeight: 600,
              color: currentColor,
            }}
          >
            {zoneLabel}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '32px',
              fontWeight: 800,
              color: currentColor,
              fontVariantNumeric: 'tabular-nums',
              letterSpacing: '-0.02em',
            }}
          >
            {(riskScore * 100).toFixed(1)}%
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--text-tertiary)',
            }}
          >
            RISK
          </span>
        </div>
      </div>

      {/* Segments Bar */}
      <div
        style={{
          display: 'flex',
          gap: '3px',
          height: '14px',
          backgroundColor: 'var(--sky-100)',
          padding: '3px',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border-subtle)',
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
                borderRadius: '2px',
                backgroundColor: isFilled ? segColor : 'var(--sky-200)',
                transition: 'background-color 200ms ease',
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
          fontSize: '10px',
          color: 'var(--text-tertiary)',
        }}
      >
        <span style={{ color: '#065F46', fontWeight: 600 }}>
          ACCEPT &lt; {acceptThreshold * 100}%
        </span>
        <span style={{ color: '#92400E', fontWeight: 600 }}>
          CONFIRM ({acceptThreshold * 100}%–{escalateThreshold * 100}%)
        </span>
        <span style={{ color: '#991B1B', fontWeight: 600 }}>
          ESCALATE &gt; {escalateThreshold * 100}%
        </span>
      </div>
    </div>
  );
};
