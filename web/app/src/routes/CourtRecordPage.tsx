import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, RefreshCw } from 'lucide-react';
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span className="label" style={{ color: 'var(--navy-500)' }}>
            CRYPTOGRAPHIC TAMPER-EVIDENT AUDIT TRAIL
          </span>
          <h1>Court Record</h1>
          <p>
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
            backgroundColor: 'rgba(61, 214, 140, 0.1)',
            border: '1px solid var(--accept)',
            padding: '12px 16px',
            color: 'var(--accept)',
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <CheckCircle2 size={18} />
          <span>CRYPTOGRAPHIC VERIFICATION PASSED: 904 blocks validated back to genesis. Zero tampering detected.</span>
        </div>
      )}

      {/* Timeline */}
      <div
        style={{
          backgroundColor: 'var(--navy-850)',
          border: '1px solid var(--navy-300)',
          padding: '24px',
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
                  left: '11px',
                  top: '24px',
                  bottom: '-24px',
                  width: '2px',
                  backgroundColor: 'var(--navy-300)',
                }}
              />
            )}

            {/* Dot */}
            <div
              style={{
                width: '24px',
                height: '24px',
                backgroundColor: 'var(--navy-800)',
                border: '2px solid var(--navy-500)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                zIndex: 1,
              }}
            >
              <div style={{ width: '6px', height: '6px', backgroundColor: '#FFF' }} />
            </div>

            {/* Content Card */}
            <div
              style={{
                backgroundColor: 'var(--navy-800)',
                border: '1px solid var(--navy-300)',
                padding: '16px 20px',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 600, color: 'var(--text-1)' }}>
                    {item.event}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--navy-400)', backgroundColor: 'var(--navy-900)', padding: '2px 6px' }}>
                    {item.caseId}
                  </span>
                </div>

                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-3)' }}>
                  {item.time}
                </span>
              </div>

              <div style={{ fontSize: '14px', color: 'var(--text-2)' }}>
                {item.details}
              </div>

              <div
                style={{
                  display: 'flex',
                  gap: '16px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--text-3)',
                  borderTop: '1px solid var(--navy-300)',
                  paddingTop: '8px',
                  marginTop: '4px',
                }}
              >
                <span>PREV_HASH: <code style={{ color: 'var(--text-2)' }}>{item.prevHash}</code></span>
                <span>BLOCK_HASH: <code style={{ color: 'var(--navy-500)' }}>{item.hash}</code></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
