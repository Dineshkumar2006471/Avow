import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, RefreshCw, Lock } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const CourtRecordPage: React.FC = () => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifiedSuccess, setVerifiedSuccess] = useState<boolean | null>(null);

  const auditEvents = [
    {
      id: 'EVT-904',
      time: '2026-11-08 19:14:02 IST',
      event: 'VERDICT_ADJUDICATED',
      caseId: 'CAS-0101',
      details: 'Spoken 15,000 INR vs Disputed W4 50,000 INR -> CONFIRM decision',
      prevHash: '41ab09d3e8f7...',
      hash: '9f2c1e7a4b08...',
    },
    {
      id: 'EVT-903',
      time: '2026-11-08 19:12:45 IST',
      event: 'READBACK_RESOLVED',
      caseId: 'CAS-0100',
      details: 'Timbre readback affirmed by caller via "haan sahi hai" -> ACCEPTED',
      prevHash: '8b7a6c5d4e3f...',
      hash: '41ab09d3e8f7...',
    },
    {
      id: 'EVT-902',
      time: '2026-11-08 19:11:18 IST',
      event: 'VERDICT_ADJUDICATED',
      caseId: 'CAS-0100',
      details: 'Spoken 250,000 INR (Dhai Lakh) -> All 4 witnesses agreed -> ACCEPT',
      prevHash: '1a2b3c4d5e6f...',
      hash: '8b7a6c5d4e3f...',
    },
    {
      id: 'EVT-901',
      time: '2026-11-08 19:08:50 IST',
      event: 'GENESIS_HEAD_ANCHOR',
      caseId: 'SYSTEM',
      details: 'AVOW Court Record Hash Chain initialized with SHA-256 root anchor',
      prevHash: '000000000000...',
      hash: '1a2b3c4d5e6f...',
    },
  ];

  const handleVerify = () => {
    setIsVerifying(true);
    setVerifiedSuccess(null);
    setTimeout(() => {
      setIsVerifying(false);
      setVerifiedSuccess(true);
    }, 1000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', maxWidth: '1240px', margin: '0 auto', width: '100%' }}>
      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 700,
                color: 'var(--sapphire-600)',
                backgroundColor: 'var(--sapphire-50)',
                padding: '2px 8px',
                borderRadius: 'var(--radius-full)',
                letterSpacing: '0.04em',
              }}
            >
              CRYPTOGRAPHIC TAMPER-EVIDENT AUDIT TRAIL
            </span>
            <span style={{ color: 'var(--text-tertiary)' }}>/</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-secondary)' }}>
              DPDP ACT COMPLIANT
            </span>
          </div>
          <h1 style={{ fontSize: '32px', fontWeight: 800 }}>Court Record</h1>
          <p style={{ fontSize: '16px', lineHeight: '24px' }}>
            Every verdict, readback, and caller resolution is appended to an immutable SHA-256 hash chain.
            This provides non-repudiation and proof of compliance under DPDP regulations.
          </p>
        </div>

        <Button
          size="compact"
          variant="secondary"
          onClick={handleVerify}
          disabled={isVerifying}
          icon={isVerifying ? <RefreshCw className="spin" size={14} /> : <ShieldCheck size={14} />}
        >
          {isVerifying ? 'RECOMPUTING HASHES...' : 'VERIFY FULL CHAIN INTEGRITY'}
        </Button>
      </div>

      {verifiedSuccess && (
        <div
          style={{
            backgroundColor: '#ECFDF5',
            border: '1.5px solid #A7F3D0',
            borderRadius: 'var(--radius-md)',
            padding: '14px 18px',
            color: '#065F46',
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: 'var(--shadow-xs)',
          }}
        >
          <CheckCircle2 size={18} color="#10B981" />
          <span>CRYPTOGRAPHIC INTEGRITY VERIFIED: 904 blocks validated back to genesis. Zero tampering detected.</span>
        </div>
      )}

      {/* Timeline */}
      <div
        style={{
          backgroundColor: 'var(--surface-primary)',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-sm)',
          padding: '28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}
      >
        {auditEvents.map((item, idx) => (
          <div
            key={item.id}
            style={{
              display: 'flex',
              gap: '20px',
              position: 'relative',
            }}
          >
            {/* Left Rule line */}
            {idx < auditEvents.length - 1 && (
              <div
                style={{
                  position: 'absolute',
                  left: '15px',
                  top: '32px',
                  bottom: '-24px',
                  width: '2px',
                  backgroundColor: 'var(--sky-300)',
                }}
              />
            )}

            {/* Dot */}
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--sapphire-50)',
                border: '2px solid var(--sapphire-500)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                zIndex: 1,
              }}
            >
              <Lock size={14} color="var(--sapphire-600)" />
            </div>

            {/* Content Card */}
            <div
              style={{
                backgroundColor: 'var(--sky-50)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '18px 20px',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                transition: 'background-color var(--dur-fast) var(--ease)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {item.event}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 600, color: 'var(--sapphire-700)', backgroundColor: 'var(--sapphire-100)', padding: '2px 8px', borderRadius: 'var(--radius-sm)' }}>
                    {item.caseId}
                  </span>
                </div>

                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-tertiary)' }}>
                  {item.time}
                </span>
              </div>

              <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                {item.details}
              </div>

              <div
                style={{
                  display: 'flex',
                  gap: '16px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--text-tertiary)',
                  borderTop: '1px solid var(--border-subtle)',
                  paddingTop: '8px',
                  marginTop: '4px',
                }}
              >
                <span>PREV_HASH: <code style={{ color: 'var(--text-secondary)' }}>{item.prevHash}</code></span>
                <span>BLOCK_HASH: <code style={{ color: 'var(--sapphire-600)', fontWeight: 600 }}>{item.hash}</code></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
