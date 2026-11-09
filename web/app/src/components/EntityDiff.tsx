import React from 'react';
import { GitCompare, CheckCircle2, AlertTriangle } from 'lucide-react';

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
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: '10px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <GitCompare size={16} color="var(--sapphire-600)" />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 700,
              color: 'var(--text-tertiary)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            CROSS-EXAMINATION MATRIX: {entityType}
          </span>
        </div>

        {consensusValue !== undefined && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--text-secondary)',
              }}
            >
              ADJUDICATED:
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '14px',
                fontWeight: 700,
                color: 'var(--sapphire-700)',
                backgroundColor: 'var(--sapphire-50)',
                padding: '2px 8px',
                borderRadius: 'var(--radius-sm)',
              }}
            >
              {consensusValue}
            </span>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {candidates.map((cand, idx) => {
          const isMajority = cand.isMajority;
          const isDisputed = cand.status === 'disputed';

          const borderColor = isMajority ? 'var(--sapphire-500)' : isDisputed ? '#F59E0B' : '#EF4444';
          const bgColor = isMajority ? '#F8FAFF' : isDisputed ? '#FFFDF8' : '#FEF8F8';

          return (
            <div
              key={idx}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: bgColor,
                border: '1px solid var(--border-default)',
                borderLeft: `4px solid ${borderColor}`,
                borderRadius: 'var(--radius-md)',
                padding: '12px 16px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '18px',
                    fontWeight: 700,
                    color: isMajority ? 'var(--text-primary)' : borderColor,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {cand.value}
                </span>

                {isMajority ? (
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      fontWeight: 600,
                      color: 'var(--sapphire-700)',
                      backgroundColor: 'var(--sapphire-100)',
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-full)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <CheckCircle2 size={11} />
                    MAJORITY CONSENSUS
                  </span>
                ) : (
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      fontWeight: 600,
                      color: '#92400E',
                      backgroundColor: '#FEF3C7',
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-full)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <AlertTriangle size={11} />
                    CONTESTED VALUE
                  </span>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: 'var(--text-tertiary)',
                    marginRight: '4px',
                  }}
                >
                  SUPPORTING JURY:
                </span>
                {cand.witnesses.map((wId) => (
                  <span
                    key={wId}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      fontWeight: 600,
                      color: 'var(--text-secondary)',
                      backgroundColor: 'var(--surface-primary)',
                      border: '1px solid var(--border-default)',
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-sm)',
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
