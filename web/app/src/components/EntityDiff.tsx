import React from 'react';

export interface CandidateValue {
  value: string | number;
  witnesses: string[]; // e.g. ["W1", "W2", "W5"]
  isMajority?: boolean;
  status: 'consensus' | 'disputed' | 'escalated';
}

interface EntityDiffProps {
  entityType: string; // e.g. "AMOUNT" or "DIGIT_STRING"
  candidates: CandidateValue[];
  consensusValue?: string | number;
}

export const EntityDiff: React.FC<EntityDiffProps> = ({
  entityType,
  candidates,
  consensusValue,
}) => {
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
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid var(--navy-300)',
          paddingBottom: '8px',
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
          CROSS-EXAMINATION: {entityType}
        </span>
        {consensusValue !== undefined && (
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              color: 'var(--navy-400)',
            }}
          >
            ADJUDICATED: <strong style={{ color: 'var(--text-1)' }}>{consensusValue}</strong>
          </span>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {candidates.map((cand, idx) => {
          const barColor =
            cand.isMajority
              ? 'var(--navy-500)'
              : cand.status === 'disputed'
              ? 'var(--confirm)'
              : 'var(--escalate)';

          return (
            <div
              key={idx}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: 'var(--navy-800)',
                borderLeft: `3px solid ${barColor}`,
                padding: '10px 16px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '18px',
                    fontWeight: 600,
                    color: cand.isMajority ? 'var(--text-1)' : barColor,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {cand.value}
                </span>
                {cand.isMajority && (
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: 'var(--navy-400)',
                      backgroundColor: 'rgba(91, 155, 255, 0.1)',
                      padding: '2px 6px',
                    }}
                  >
                    MAJORITY CONSENSUS
                  </span>
                )}
              </div>

              <div style={{ display: 'flex', gap: '6px' }}>
                {cand.witnesses.map((wId) => (
                  <span
                    key={wId}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: 'var(--text-2)',
                      backgroundColor: 'var(--navy-900)',
                      border: '1px solid var(--navy-300)',
                      padding: '2px 8px',
                    }}
                  >
                    {wId}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
