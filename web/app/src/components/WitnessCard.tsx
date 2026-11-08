import React from 'react';

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
  index: number;
}

export const WitnessCard: React.FC<WitnessCardProps> = ({ witness, index }) => {
  // Split transcript around the highlightSpan if provided
  const renderTranscript = () => {
    if (!witness.highlightSpan || !witness.transcript.includes(witness.highlightSpan)) {
      return <span>{witness.transcript}</span>;
    }

    const parts = witness.transcript.split(witness.highlightSpan);
    const spanClass =
      witness.agreementStatus === 'disputed'
        ? 'entity-disputed'
        : witness.agreementStatus === 'alone'
        ? 'entity-escalated'
        : 'entity-underline';

    return (
      <>
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
      </>
    );
  };

  const agreementColor =
    witness.agreementStatus === 'consensus'
      ? 'var(--accept)'
      : witness.agreementStatus === 'disputed'
      ? 'var(--confirm)'
      : 'var(--escalate)';

  return (
    <div
      style={{
        backgroundColor: 'var(--navy-800)',
        border: '1px solid var(--navy-300)',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '180px',
        animation: `fadeInUp 280ms cubic-bezier(0.2, 0, 0.38, 0.9) ${index * 80}ms forwards`,
        opacity: 0,
        transform: 'translateY(8px)',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid var(--navy-300)',
          paddingBottom: '8px',
          marginBottom: '12px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            fontWeight: 500,
            color: 'var(--text-1)',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}
        >
          {witness.id} · {witness.name}
        </span>
        {witness.latencyMs && (
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              color: 'var(--text-3)',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {witness.latencyMs} MS
          </span>
        )}
      </div>

      {/* Transcript Body */}
      <div
        style={{
          fontSize: '17px',
          lineHeight: '26px',
          color: 'var(--text-1)',
          marginBottom: '16px',
          flex: 1,
        }}
      >
        "{renderTranscript()}"
      </div>

      {/* Footer: Parsed Value + Agreement Status Dot */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid var(--navy-300)',
          paddingTop: '10px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              width: '8px',
              height: '8px',
              backgroundColor: agreementColor,
              display: 'inline-block',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--text-2)',
              textTransform: 'uppercase',
            }}
          >
            PARSED:
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '15px',
              fontWeight: 500,
              color: 'var(--text-1)',
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
              fontSize: '11px',
              color: 'var(--text-3)',
              backgroundColor: 'var(--navy-850)',
              padding: '2px 6px',
              border: '1px solid var(--navy-300)',
            }}
          >
            {witness.languageCode}
          </span>
        )}
      </div>
    </div>
  );
};
