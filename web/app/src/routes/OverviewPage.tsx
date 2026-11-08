import React from 'react';
import { Tag } from '../components/ui/Tag';
import { Shield, AlertTriangle, Clock, PhoneIncoming, Layers } from 'lucide-react';

export const OverviewPage: React.FC = () => {
  const kpis = [
    {
      label: 'SILENT ERROR RATE (UNCORRECTED)',
      before: '14.2%',
      after: '2.8%',
      delta: '−80.3% REDUCTION',
      color: 'var(--accept)',
      icon: <Shield size={18} />,
    },
    {
      label: 'CATCH RATE (WRONG FLAGGED)',
      value: '80.3%',
      sub: '95% CI [74.1% – 86.5%]',
      color: 'var(--navy-500)',
      icon: <AlertTriangle size={18} />,
    },
    {
      label: 'CALLS CONFIRMED (FRICTION)',
      value: '18.5%',
      sub: 'Target confirm envelope',
      color: 'var(--confirm)',
      icon: <PhoneIncoming size={18} />,
    },
    {
      label: 'AVG PRISMA CALLS / UTTERANCE',
      value: '2.6',
      sub: 'Stage A: 2 · Stage B: 4',
      color: 'var(--text-1)',
      icon: <Layers size={18} />,
    },
    {
      label: 'p95 END-TO-END LATENCY',
      value: '1.82s',
      sub: 'Under 1-concurrency gate',
      color: 'var(--text-1)',
      icon: <Clock size={18} />,
    },
  ];

  const recentCases = [
    {
      id: 'CAS-0891',
      spoke: 'Pandrah hazaar (15,000)',
      w1: '₹15,000',
      w4: '₹50,000',
      decision: 'CONFIRM' as const,
      condition: 'PHONE_8K',
      latency: '1.64s',
    },
    {
      id: 'CAS-0892',
      spoke: 'Dhai lakh (250,000)',
      w1: '₹2,50,000',
      w4: 'ढाई लाख',
      decision: 'ACCEPT' as const,
      condition: 'CLEAN',
      latency: '1.22s',
    },
    {
      id: 'CAS-0893',
      spoke: 'Double nine triple zero',
      w1: '99000',
      w4: '9900',
      decision: 'CONFIRM' as const,
      condition: 'TRAFFIC_5',
      latency: '2.40s',
    },
    {
      id: 'CAS-0894',
      spoke: 'Saat hazaar (7,000)',
      w1: '₹7,000',
      w4: '₹7,000',
      decision: 'ACCEPT' as const,
      condition: 'BABBLE_10',
      latency: '1.38s',
    },
    {
      id: 'CAS-0895',
      spoke: 'Ek crore bees lakh',
      w1: '₹1,20,00,000',
      w4: '₹12,00,000',
      decision: 'ESCALATE' as const,
      condition: 'SPEAKER_REVERB',
      latency: '2.85s',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <span className="label" style={{ color: 'var(--navy-500)' }}>
          SYSTEM DASHBOARD · HELD-OUT BENCHMARK
        </span>
        <h1>Executive Overview</h1>
        <p>
          Performance metrics across 192 held-out telephony utterances (tested on unseen speaker voices and procedural acoustic degradation).
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
        }}
      >
        {kpis.map((kpi, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: 'var(--navy-850)',
              border: '1px solid var(--navy-300)',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="label" style={{ color: 'var(--text-3)', fontSize: '11px' }}>
                {kpi.label}
              </span>
              <span style={{ color: kpi.color }}>{kpi.icon}</span>
            </div>

            {kpi.before ? (
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '18px',
                    color: 'var(--escalate)',
                    textDecoration: 'line-through',
                  }}
                >
                  {kpi.before}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '32px',
                    fontWeight: 600,
                    color: 'var(--accept)',
                  }}
                >
                  {kpi.after}
                </span>
              </div>
            ) : (
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '32px',
                  fontWeight: 600,
                  color: kpi.color,
                }}
              >
                {kpi.value}
              </div>
            )}

            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: kpi.delta ? 'var(--accept)' : 'var(--text-3)',
                borderTop: '1px solid var(--navy-800)',
                paddingTop: '8px',
              }}
            >
              {kpi.delta || kpi.sub}
            </div>
          </div>
        ))}
      </div>

      {/* Two Column Layout: Reliability & Recent Adjudications */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
        {/* Left: Trade-off & Calibration Overview */}
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--navy-300)', paddingBottom: '8px' }}>
            <span className="label">RELIABILITY &amp; ERROR TRADEOFF CURVE</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accept)' }}>
              ECE = 0.041 (WELL-CALIBRATED)
            </span>
          </div>

          <p style={{ fontSize: '14px', lineHeight: '22px' }}>
            In traditional ASR, black-box confidence is missing. AVOW's multi-witness consensus produces an empirically calibrated risk metric:
          </p>

          <div
            style={{
              height: '180px',
              backgroundColor: 'var(--navy-900)',
              border: '1px solid var(--navy-300)',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-around',
              padding: '16px 8px 8px 8px',
            }}
          >
            {[
              { risk: '0-20%', observed: 2.1, color: 'var(--accept)' },
              { risk: '20-40%', observed: 24.3, color: 'var(--confirm)' },
              { risk: '40-60%', observed: 48.7, color: 'var(--confirm)' },
              { risk: '60-80%', observed: 71.2, color: 'var(--escalate)' },
              { risk: '80-100%', observed: 93.5, color: 'var(--escalate)' },
            ].map((bin, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', height: '100%', justifyContent: 'flex-end' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-2)' }}>
                  {bin.observed}%
                </span>
                <div
                  style={{
                    width: '32px',
                    height: `${bin.observed * 1.3}px`,
                    backgroundColor: bin.color,
                  }}
                />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-3)' }}>
                  {bin.risk}
                </span>
              </div>
            ))}
          </div>

          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-3)', display: 'flex', justifyContent: 'space-between' }}>
            <span>X: PREDICTED RISK BIN</span>
            <span>Y: OBSERVED EMPIRICAL ERROR RATE</span>
          </div>
        </div>

        {/* Right: Recent Adjudications */}
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--navy-300)', paddingBottom: '8px' }}>
            <span className="label">RECENT COURT RECORDS (LIVE / HELD-OUT)</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--navy-400)' }}>
              HASH-CHAIN AUDITED
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {recentCases.map((c) => (
              <div
                key={c.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: 'var(--navy-800)',
                  padding: '8px 12px',
                  border: '1px solid var(--navy-300)',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--navy-400)' }}>
                      {c.id}
                    </span>
                    <span style={{ fontSize: '13px', color: 'var(--text-1)' }}>
                      {c.spoke}
                    </span>
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-3)' }}>
                    W1: {c.w1} · W4: {c.w4} · {c.condition}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Tag verdict={c.decision} size="sm" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
