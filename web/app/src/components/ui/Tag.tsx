import React from 'react';
import { CheckSquare, HelpCircle, XSquare, Info } from 'lucide-react';

export type VerdictType = 'ACCEPT' | 'CONFIRM' | 'ESCALATE' | 'INFO';

interface TagProps {
  verdict: VerdictType;
  label?: string;
  size?: 'sm' | 'md';
}

export const Tag: React.FC<TagProps> = ({ verdict, label, size = 'md' }) => {
  const configs = {
    ACCEPT: {
      color: 'var(--accept)',
      bg: 'rgba(61, 214, 140, 0.12)',
      border: '1px solid var(--accept)',
      Icon: CheckSquare,
      defaultLabel: 'ACCEPT',
    },
    CONFIRM: {
      color: 'var(--confirm)',
      bg: 'rgba(245, 185, 66, 0.12)',
      border: '1px solid var(--confirm)',
      Icon: HelpCircle,
      defaultLabel: 'CONFIRM',
    },
    ESCALATE: {
      color: 'var(--escalate)',
      bg: 'rgba(255, 122, 122, 0.12)',
      border: '1px solid var(--escalate)',
      Icon: XSquare,
      defaultLabel: 'ESCALATE',
    },
    INFO: {
      color: 'var(--navy-500)',
      bg: 'rgba(91, 155, 255, 0.12)',
      border: '1px solid var(--navy-300)',
      Icon: Info,
      defaultLabel: 'INFO',
    },
  };

  const config = configs[verdict];
  const Icon = config.Icon;
  const iconSize = size === 'sm' ? 12 : 14;

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        height: size === 'sm' ? '20px' : '24px',
        padding: '0 8px',
        backgroundColor: config.bg,
        border: config.border,
        color: config.color,
        fontFamily: 'var(--font-mono)',
        fontSize: size === 'sm' ? '11px' : '12px',
        fontWeight: 500,
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
        lineHeight: 1,
        whiteSpace: 'nowrap',
      }}
    >
      <Icon size={iconSize} strokeWidth={1.5} />
      <span>{label || config.defaultLabel}</span>
    </span>
  );
};
