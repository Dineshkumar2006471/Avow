import React from 'react';
import { Radio, Sliders } from 'lucide-react';

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
  const conditions: { id: DegradationCondition; label: string; desc: string; icon: string }[] = [
    { id: 'CLEAN', label: 'Clean Studio', desc: '16 kHz Studio Studio Reference', icon: '🎙️' },
    { id: 'PHONE_8K', label: '8 kHz Telephony', desc: 'μ-law Bandpass (300-3400Hz)', icon: '📞' },
    { id: 'BABBLE_10', label: 'Office Babble', desc: 'Multi-speaker Ambient Crowds', icon: '👥' },
    { id: 'TRAFFIC_5', label: 'Indian Traffic', desc: 'Engine Rumble + Auto Horns', icon: '🛺' },
    { id: 'SPEAKER_REVERB', label: 'Speakerphone', desc: 'Room Reverb (RT60 ~0.5s)', icon: '🔊' },
    { id: 'PACKET_LOSS', label: 'VoIP Jitter', desc: '20-120ms Random Packet Dropouts', icon: '📶' },
  ];

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
        gap: '16px',
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
          <Radio size={16} color="var(--sapphire-600)" />
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
            2. ACOUSTIC STRESS TEST (THE GAUNTLET)
          </span>
        </div>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--sapphire-600)',
            backgroundColor: 'var(--sapphire-50)',
            padding: '2px 8px',
            borderRadius: 'var(--radius-full)',
            fontWeight: 600,
          }}
        >
          PROCEDURAL NOISE
        </span>
      </div>

      {/* Environment Grid Buttons */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
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
                backgroundColor: isSelected ? 'var(--sapphire-50)' : 'var(--sky-50)',
                border: isSelected ? '1.5px solid var(--sapphire-500)' : '1px solid var(--border-default)',
                color: isSelected ? 'var(--sapphire-900)' : 'var(--text-secondary)',
                borderRadius: 'var(--radius-md)',
                padding: '12px 14px',
                textAlign: 'left',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: '3px',
                transition: 'all var(--dur-fast) var(--ease)',
                boxShadow: isSelected ? '0 2px 8px rgba(15, 82, 186, 0.12)' : 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '14px' }}>{c.icon}</span>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: isSelected ? 'var(--sapphire-700)' : 'var(--text-primary)',
                  }}
                >
                  {c.label}
                </span>
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  color: isSelected ? 'var(--sapphire-600)' : 'var(--text-tertiary)',
                  lineHeight: 1.25,
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
            gap: '10px',
            backgroundColor: 'var(--sky-100)',
            padding: '14px 16px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sliders size={14} color="var(--sapphire-600)" />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                  textTransform: 'uppercase',
                }}
              >
                SIGNAL-TO-NOISE RATIO (SNR)
              </span>
            </div>

            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                fontWeight: 700,
                color: 'var(--sapphire-700)',
                backgroundColor: 'var(--surface-primary)',
                padding: '2px 8px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-default)',
              }}
            >
              {snrDb} dB · {snrDb > 15 ? 'MILD NOISE' : snrDb > 7 ? 'HARSH REAL-WORLD' : 'EXTREME INTERFERENCE'}
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
              accentColor: 'var(--sapphire-600)',
              cursor: 'pointer',
            }}
          />

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: 'var(--text-tertiary)',
            }}
          >
            <span>0 dB (Extreme Indian Traffic)</span>
            <span>8 dB (Noisy Bus/Market)</span>
            <span>25 dB (Quiet Room)</span>
          </div>
        </div>
      )}
    </div>
  );
};
