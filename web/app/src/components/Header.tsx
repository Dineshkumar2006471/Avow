import React from 'react';
import { CreditsMeter } from './CreditsMeter';
import { ShieldCheck } from 'lucide-react';

interface HeaderProps {
  onToggleSidebar?: () => void;
}

export const Header: React.FC<HeaderProps> = () => {
  return (
    <header
      style={{
        height: '48px',
        backgroundColor: 'var(--navy-850)',
        borderBottom: '1px solid var(--navy-300)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      {/* Brand: Logo Glyph + Wordmark */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <a href="#/gauntlet" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Flat geometric A with 2px blue crossbar */}
          <svg width="24" height="24" viewBox="0 0 40 40" fill="none">
            <rect width="40" height="40" fill="#0B1830" />
            <path
              d="M12 32 L20 8 L28 32"
              stroke="#E8EDF5"
              strokeWidth="3.5"
              strokeLinecap="square"
              strokeLinejoin="miter"
            />
            <path
              d="M8 22 L32 22"
              stroke="#5B9BFF"
              strokeWidth="3.5"
              strokeLinecap="square"
            />
          </svg>

          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '16px',
              fontWeight: 600,
              letterSpacing: '0.06em',
              color: 'var(--text-1)',
            }}
          >
            AVOW
          </span>
        </a>

        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--text-3)',
            backgroundColor: 'var(--navy-900)',
            padding: '2px 8px',
            border: '1px solid var(--navy-300)',
            letterSpacing: '0.04em',
          }}
        >
          GNANI TRUST LAYER v1.0
        </span>
      </div>

      {/* Right: Security & Credits Meter */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <ShieldCheck size={16} color="var(--accept)" />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--text-2)',
              letterSpacing: '0.04em',
            }}
          >
            SINGLE-FLIGHT GATE: ACTIVE
          </span>
        </div>

        <CreditsMeter usedRuns={18} maxRuns={150} environment="LIVE" />
      </div>
    </header>
  );
};
