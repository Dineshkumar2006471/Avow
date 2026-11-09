import React from 'react';
import { CheckCircle2, AlertCircle, AlertTriangle, ShieldCheck } from 'lucide-react';
import { VerdictType } from './ui/Tag';

interface VerdictStampProps {
  verdict: VerdictType;
  reason?: string;
}

export const VerdictStamp: React.FC<VerdictStampProps> = ({ verdict, reason }) => {
  const configs = {
    ACCEPT: {
      color: '#065F46',
      bg: '#ECFDF5',
      border: '1.5px solid #A7F3D0',
      shadow: '0 4px 12px rgba(16, 185, 129, 0.12)',
      Icon: CheckCircle2,
      title: 'ACCEPT',
      badgeText: 'VERIFIED TRUST',
      desc: 'All independent Prisma witnesses reach unanimous consensus. Safe to commit transaction.',
    },
    CONFIRM: {
      color: '#92400E',
      bg: '#FFFBEB',
      border: '1.5px solid #FDE68A',
      shadow: '0 4px 12px rgba(245, 158, 11, 0.12)',
      Icon: AlertCircle,
      title: 'CONFIRM',
      badgeText: 'READ-BACK REQUIRED',
      desc: reason || 'Witnesses disagree on numerical entity. Timbre TTS verification loop triggered.',
    },
    ESCALATE: {
      color: '#991B1B',
      bg: '#FEF2F2',
      border: '1.5px solid #FECACA',
      shadow: '0 4px 12px rgba(239, 68, 68, 0.12)',
      Icon: AlertTriangle,
      title: 'ESCALATE',
      badgeText: 'HUMAN INTERVENTION',
      desc: reason || 'Severe phonetic conflict or confusable entity pair detected. Route to human agent.',
    },
    INFO: {
      color: '#1E40AF',
      bg: '#EFF6FF',
      border: '1.5px solid #BFDBFE',
      shadow: '0 4px 12px rgba(59, 130, 246, 0.12)',
      Icon: ShieldCheck,
      title: 'PENDING',
      badgeText: 'INSPECTING',
      desc: 'Awaiting witness examination.',
    },
  };

  const config = configs[verdict] || configs.INFO;
  const Icon = config.Icon;

  return (
    <div
      role="status"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '16px',
        padding: '16px 20px',
        backgroundColor: config.bg,
        border: config.border,
        borderRadius: 'var(--radius-lg)',
        boxShadow: config.shadow,
        color: config.color,
        transition: 'all var(--dur-base) var(--ease)',
      }}
    >
      <div
        style={{
          width: '44px',
          height: '44px',
          borderRadius: 'var(--radius-md)',
          backgroundColor: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'var(--shadow-xs)',
          flexShrink: 0,
        }}
      >
        <Icon size={26} color={config.color} strokeWidth={2.2} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '20px',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}
          >
            {config.title}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              fontWeight: 700,
              backgroundColor: '#FFFFFF',
              padding: '2px 8px',
              borderRadius: 'var(--radius-full)',
              letterSpacing: '0.04em',
            }}
          >
            {config.badgeText}
          </span>
        </div>
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '13px',
            color: 'var(--text-secondary)',
            lineHeight: 1.35,
            maxWidth: '480px',
          }}
        >
          {config.desc}
        </span>
      </div>
    </div>
  );
};
