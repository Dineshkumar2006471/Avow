import React from 'react';
import { CheckSquare, HelpCircle, XSquare } from 'lucide-react';
import { VerdictType } from './ui/Tag';

interface VerdictStampProps {
  verdict: VerdictType;
  reason?: string;
}

export const VerdictStamp: React.FC<VerdictStampProps> = ({ verdict, reason }) => {
  const configs = {
    ACCEPT: {
      color: 'var(--accept)',
      bg: 'rgba(61, 214, 140, 0.08)',
      border: '2px solid var(--accept)',
      Icon: CheckSquare,
      title: 'ACCEPT',
      desc: 'All witnesses agree with high acoustic confidence',
    },
    CONFIRM: {
      color: 'var(--confirm)',
      bg: 'rgba(245, 185, 66, 0.08)',
      border: '2px solid var(--confirm)',
      Icon: HelpCircle,
      title: 'CONFIRM',
      desc: reason || 'Witnesses disagree on numerical entity — readback required',
    },
    ESCALATE: {
      color: 'var(--escalate)',
      bg: 'rgba(255, 122, 122, 0.08)',
      border: '2px solid var(--escalate)',
      Icon: XSquare,
      title: 'ESCALATE',
      desc: reason || 'Unresolvable conflict or business rule violation',
    },
    INFO: {
      color: 'var(--navy-500)',
      bg: 'rgba(91, 155, 255, 0.08)',
      border: '2px solid var(--navy-500)',
      Icon: HelpCircle,
      title: 'PENDING',
      desc: 'Awaiting witness examination',
    },
  };

  const config = configs[verdict];
  const Icon = config.Icon;

  return (
    <div
      role="status"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '16px',
        padding: '16px 24px',
        backgroundColor: config.bg,
        border: config.border,
        color: config.color,
        animation: 'stampLand 180ms cubic-bezier(0.2, 0, 0.38, 0.9) forwards',
      }}
    >
      <Icon size={28} strokeWidth={2} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '22px',
            fontWeight: 600,
            letterSpacing: '0.06em',
            lineHeight: 1.1,
          }}
        >
          {config.title}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '13px',
            color: 'var(--text-2)',
            lineHeight: 1.3,
          }}
        >
          {config.desc}
        </span>
      </div>
    </div>
  );
};
