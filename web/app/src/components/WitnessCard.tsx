import React from 'react';
import { CheckCircle, AlertTriangle, ShieldAlert } from 'lucide-react';

export interface WitnessData {
  id: string; // e.g. "W1", "W4", "W2", "W5"
  name: string; // e.g. "PRISMA 3.0 · ITN"
  model: string;
  transcript: string;
  highlightSpan?: string; // the entity word in the transcript
  parsedValue?: string | number; // e.g. "₹15,000"
  latencyMs?: number;
  agreementStatus?: 'consensus' | 'disputed' | 'alone';
  languageCode?: string;
  isStageB?: boolean;
}

interface WitnessCardProps {
  witness: WitnessData;
  index?: number;
}

export const WitnessCard: React.FC<WitnessCardProps> = ({ witness, index: _index }) => {
  // Split transcript around highlightSpan
  const renderTranscript = () => {
    if (!witness.highlightSpan || !witness.transcript.includes(witness.highlightSpan)) {
      return <span>"{witness.transcript}"</span>;
    }

    const parts = witness.transcript.split(witness.highlightSpan);
    const spanClass =
      witness.agreementStatus === 'disputed'
        ? 'entity-disputed'
        : witness.agreementStatus === 'alone'
        ? 'entity-escalated'
        : 'entity-accepted';

    return (
      <span>
        "
        {parts.map((part, i) => (
          <React.Fragment key={i}>
            {part}
            {i < parts.length - 1 && (
              <span className={spanClass}>
                {witness.highlightSpan}
              </span>
            )}
          </React.Fragment>
        ))}
        "
      </span>
    );
  };

  const isDisputed = witness.agreementStatus === 'disputed';
  const isAlone = witness.agreementStatus === 'alone';

  const statusBorder = isDisputed
    ? '1.5px solid #FCD34D'
    : isAlone
    ? '1.5px solid #FCA5A5'
    : '1px solid var(--border-default)';

  const cardBg = isDisputed ? '#FFFCF5' : isAlone ? '#FFF8F8' : 'var(--surface-primary)';

  return (
    <div
      style={{
        backgroundColor: cardBg,
        border: statusBorder,
        borderRadius: 'var(--radius-lg)',
        boxShadow: isDisputed ? '0 4px 12px rgba(245, 158, 11, 0.08)' : 'var(--shadow-sm)',
        padding: '18px 20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '190px',
        transition: 'all var(--dur-base) var(--ease)',
      }}
    >
      {/* Card Top: Witness ID, Model, Latency */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: '10px',
          marginBottom: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 700,
              color: 'var(--sapphire-700)',
              backgroundColor: 'var(--sapphire-50)',
              padding: '2px 8px',
              borderRadius: 'var(--radius-full)',
              letterSpacing: '0.04em',
            }}
          >
            {witness.id}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--text-primary)',
            }}
          >
            {witness.name}
          </span>
        </div>

        {witness.latencyMs && (
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--text-tertiary)',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {witness.latencyMs} ms
          </span>
        )}
      </div>

      {/* Transcript Body */}
      <div
        style={{
          fontSize: '15px',
          lineHeight: '24px',
          color: 'var(--text-primary)',
          marginBottom: '16px',
          flex: 1,
          fontFamily: 'var(--font-sans)',
        }}
      >
        {renderTranscript()}
      </div>

      {/* Card Footer: Parsed Value + Status */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '10px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {isDisputed ? (
            <AlertTriangle size={15} color="#F59E0B" />
          ) : isAlone ? (
            <ShieldAlert size={15} color="#EF4444" />
          ) : (
            <CheckCircle size={15} color="#10B981" />
          )}

          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--text-tertiary)',
              textTransform: 'uppercase',
            }}
          >
            EXTRACTED:
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '14px',
              fontWeight: 700,
              color: isDisputed ? '#B45309' : isAlone ? '#B91C1C' : 'var(--text-primary)',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {witness.parsedValue || '—'}
          </span>
        </div>

        {witness.languageCode && (
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              fontWeight: 600,
              color: 'var(--text-secondary)',
              backgroundColor: 'var(--sky-100)',
              padding: '2px 6px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            {witness.languageCode}
          </span>
        )}
      </div>
    </div>
  );
};
