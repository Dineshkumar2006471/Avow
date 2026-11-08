import React from 'react';

export type DegradationCondition =
  | 'CLEAN'
  | 'PHONE_8K'
  | 'BABBLE_10'
  | 'TRAFFIC_5'
  | 'TRAIN_5'
  | 'SPEAKER_REVERB'
  | 'PACKET_LOSS';

interface NoiseDialProps {
  condition: DegradationCondition;
  onConditionChange: (cond: DegradationCondition) => void;
  snrDb: number;
  onSnrChange: (snr: number) => void;
}

export const NoiseDial: React.FC<NoiseDialProps> = ({
  condition,
  onConditionChange,
  snrDb,
  onSnrChange,
}) => {
  const conditions: { id: DegradationCondition; label: string; desc: string }[] = [
    { id: 'CLEAN', label: 'CLEAN STUDIO', desc: '16 kHz Studio Fidelity' },
    { id: 'PHONE_8K', label: '8 KHZ TELEPHONY', desc: 'μ-law Bandpass (300-3400Hz)' },
    { id: 'BABBLE_10', label: 'OFFICE BABBLE', desc: 'Multi-speaker Ambient Noise' },
    { id: 'TRAFFIC_5', label: 'INDIAN TRAFFIC', desc: 'Engine Rumble + Auto Horns' },
    { id: 'SPEAKER_REVERB', label: 'SPEAKERPHONE', desc: 'Room Reverb (RT60 ~0.5s)' },
    { id: 'PACKET_LOSS', label: 'VOIP JITTER', desc: '20-120ms Random Dropouts' },
  ];

  return (
    <div
      style={{
        backgroundColor: 'var(--navy-850)',
        border: '1px solid var(--navy-300)',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
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
          ACOUSTIC ENVIRONMENT / THE GAUNTLET
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            color: 'var(--navy-400)',
          }}
        >
          PROCEDURAL NOISE
        </span>
      </div>

      {/* Environment Grid Buttons */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '8px',
        }}
      >
        {conditions.map((c) => {
          const isSelected = condition === c.id;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => onConditionChange(c.id)}
              style={{
                backgroundColor: isSelected ? 'var(--navy-700)' : 'var(--navy-800)',
                border: isSelected ? '1px solid var(--navy-500)' : '1px solid var(--navy-300)',
                color: isSelected ? 'var(--text-1)' : 'var(--text-2)',
                padding: '10px 12px',
                textAlign: 'left',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                transition: 'background-color 110ms var(--ease)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  fontWeight: 500,
                  letterSpacing: '0.04em',
                  color: isSelected ? '#FFFFFF' : 'var(--text-1)',
                }}
              >
                {c.label}
              </span>
              <span
                style={{
                  fontSize: '11px',
                  color: isSelected ? 'var(--navy-400)' : 'var(--text-3)',
                  lineHeight: 1.2,
                }}
              >
                {c.desc}
              </span>
            </button>
          );
        })}
      </div>

      {/* SNR Dial Slider (Only relevant if not CLEAN) */}
      {condition !== 'CLEAN' && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            backgroundColor: 'var(--navy-900)',
            padding: '12px 16px',
            border: '1px solid var(--navy-300)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--text-2)',
                textTransform: 'uppercase',
              }}
            >
              SIGNAL-TO-NOISE RATIO (SNR)
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '15px',
                fontWeight: 600,
                color: 'var(--navy-400)',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {snrDb} DB ({snrDb > 15 ? 'MILD' : snrDb > 7 ? 'HARSH' : 'EXTREME'})
            </span>
          </div>

          <input
            type="range"
            min={0}
            max={25}
            step={1}
            value={snrDb}
            onChange={(e) => onSnrChange(Number(e.target.value))}
            style={{
              width: '100%',
              accentColor: 'var(--navy-500)',
              cursor: 'pointer',
            }}
          />

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: 'var(--text-3)',
            }}
          >
            <span>0 DB (EXTREME NOISE)</span>
            <span>12 DB (TYPICAL CALL)</span>
            <span>25 DB (QUIET ROOM)</span>
          </div>
        </div>
      )}
    </div>
  );
};
