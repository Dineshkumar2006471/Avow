import React from 'react';
import { CheckCircle2, AlertCircle, AlertTriangle, Info } from 'lucide-react';

export type VerdictType = 'ACCEPT' | 'CONFIRM' | 'ESCALATE' | 'INFO';

interface TagProps {
  verdict: VerdictType;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Tag: React.FC<TagProps> = ({ verdict, label, size = 'md' }) => {
  const configs = {
    ACCEPT: {
      color: '#065F46',
      bg: '#ECFDF5',
      border: '1px solid #A7F3D0',
      dotColor: '#10B981',
      Icon: CheckCircle2,
      defaultLabel: 'ACCEPT',
    },
    CONFIRM: {
      color: '#92400E',
      bg: '#FFFBEB',
      border: '1px solid #FDE68A',
      dotColor: '#F59E0B',
      Icon: AlertCircle,
      defaultLabel: 'CONFIRM',
    },
    ESCALATE: {
      color: '#991B1B',
      bg: '#FEF2F2',
      border: '1px solid #FECACA',
      dotColor: '#EF4444',
      Icon: AlertTriangle,
      defaultLabel: 'ESCALATE',
    },
    INFO: {
      color: '#1E40AF',
      bg: '#EFF6FF',
      border: '1px solid #BFDBFE',
      dotColor: '#3B82F6',
      Icon: Info,
      defaultLabel: 'INFO',
    },
  };

  const config = configs[verdict] || configs.INFO;
  const Icon = config.Icon;
  const iconSize = size === 'sm' ? 12 : size === 'lg' ? 16 : 14;

  const heights = {
    sm: '22px',
    md: '26px',
    lg: '30px',
  };

  const paddings = {
    sm: '0 8px',
    md: '0 10px',
    lg: '0 12px',
  };

  const fontSizes = {
    sm: '11px',
    md: '12px',
    lg: '13px',
  };

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        height: heights[size],
        padding: paddings[size],
        backgroundColor: config.bg,
        border: config.border,
        color: config.color,
        borderRadius: 'var(--radius-full)',
        fontFamily: 'var(--font-mono)',
        fontSize: fontSizes[size],
        fontWeight: 600,
        letterSpacing: '0.02em',
        lineHeight: 1,
        whiteSpace: 'nowrap',
      }}
    >
      <span
        style={{
          width: size === 'sm' ? '6px' : '7px',
          height: size === 'sm' ? '6px' : '7px',
          borderRadius: '50%',
          backgroundColor: config.dotColor,
          display: 'inline-block',
        }}
      />
      <Icon size={iconSize} strokeWidth={2} />
      <span>{label || config.defaultLabel}</span>
    </span>
  );
};
