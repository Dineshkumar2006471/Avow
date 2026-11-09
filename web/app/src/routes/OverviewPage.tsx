import React from 'react';
import { Tag } from '../components/ui/Tag';
import { ShieldCheck, AlertTriangle, Clock, PhoneIncoming, Layers, TrendingDown } from 'lucide-react';

export const OverviewPage: React.FC = () => {
  const kpis = [
    {
      label: 'SILENT ERROR RATE (UNCORRECTED)',
      before: '14.2%',
      after: '2.8%',
      delta: '−80.3% REDUCTION',
      color: '#10B981',
      bg: '#ECFDF5',
      icon: <ShieldCheck size={20} color="#10B981" />,
    },
    {
      label: 'CATCH RATE (WRONG FLAGGED)',
      value: '80.3%',
      sub: '95% CI [74.1% – 86.5%]',
      color: 'var(--sapphire-600)',
      bg: 'var(--sapphire-50)',
      icon: <AlertTriangle size={20} color="var(--sapphire-600)" />,
    },
    {
      label: 'CALLS CONFIRMED (FRICTION)',
      value: '18.5%',
      sub: 'Target confirm envelope',
      color: '#D97706',
      bg: '#FFFBEB',
      icon: <PhoneIncoming size={20} color="#D97706" />,
    },
    {
      label: 'AVG PRISMA CALLS / UTTERANCE',
      value: '2.6',
      sub: 'Stage A: 2 · Stage B: 4',
      color: 'var(--text-primary)',
      bg: 'var(--sky-100)',
      icon: <Layers size={20} color="var(--text-secondary)" />,
    },
    {
      label: 'p95 END-TO-END LATENCY',
      value: '1.82s',
      sub: 'Single-concurrency gate',
      color: 'var(--text-primary)',
      bg: 'var(--sky-100)',
      icon: <Clock size={20} color="var(--text-secondary)" />,
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', maxWidth: '1240px', margin: '0 auto', width: '100%' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#10B981', display: 'inline-block' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: '#0A0A0A', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              EXECUTIVE TELEPHONY BENCHMARK
            </span>
          </div>
          <h1 style={{ fontSize: '32px', fontWeight: 900, fontFamily: 'var(--font-heading)', color: '#0A0A0A', textTransform: 'uppercase', letterSpacing: '-0.02em', margin: 0 }}>
            Executive Overview
          </h1>
          <p style={{ fontSize: '15px', color: '#4A5568', marginTop: '6px' }}>
            Live performance metrics across 192 held-out telephony utterances on unseen speaker voices.
          </p>
        </div>

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '9999px', backgroundColor: '#FFFFFF', border: '1px solid #E5E5E0', fontSize: '12px', fontFamily: 'var(--font-mono)', color: '#4A5568' }}>
          <span>HASH-CHAIN AUDITED · 192 CALLS</span>
        </div>
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
              backgroundColor: 'var(--surface-primary)',
              border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-sm)',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '12px',
              transition: 'all var(--dur-base) var(--ease)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  fontWeight: 700,
                  color: 'var(--text-tertiary)',
                  letterSpacing: '0.05em',
                }}
              >
                {kpi.label}
              </span>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: kpi.bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {kpi.icon}
              </div>
            </div>

            {kpi.before ? (
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '18px',
                    color: '#991B1B',
                    textDecoration: 'line-through',
                  }}
                >
                  {kpi.before}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '36px',
                    fontWeight: 800,
                    color: '#065F46',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {kpi.after}
                </span>
              </div>
            ) : (
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '36px',
                  fontWeight: 800,
                  color: kpi.color,
                  letterSpacing: '-0.02em',
                }}
              >
                {kpi.value}
              </div>
            )}

            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 600,
                color: kpi.delta ? '#065F46' : 'var(--text-tertiary)',
                borderTop: '1px solid var(--border-subtle)',
                paddingTop: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              {kpi.delta && <TrendingDown size={13} color="#10B981" />}
              <span>{kpi.delta || kpi.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Two Column Layout: Calibration Curve & Recent Court Records */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '20px' }}>
        {/* Left: Calibration Chart */}
        <div
          style={{
            backgroundColor: 'var(--surface-primary)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-sm)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
              Reliability &amp; Calibration Curve
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 600,
                color: '#065F46',
                backgroundColor: '#ECFDF5',
                padding: '2px 8px',
                borderRadius: 'var(--radius-full)',
              }}
            >
              ECE = 0.041 (WELL-CALIBRATED)
            </span>
          </div>

          <p style={{ fontSize: '14px', lineHeight: '22px' }}>
            In traditional single-ASR setups, black-box confidence scores are uncalibrated. AVOW's multi-witness consensus produces an empirically calibrated risk probability:
          </p>

          <div
            style={{
              height: '190px',
              backgroundColor: 'var(--sky-50)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-around',
              padding: '20px 16px 12px',
            }}
          >
            {[
              { risk: '0-20%', observed: 2.1, color: '#10B981' },
              { risk: '20-40%', observed: 24.3, color: '#F59E0B' },
              { risk: '40-60%', observed: 48.7, color: '#F59E0B' },
              { risk: '60-80%', observed: 71.2, color: '#EF4444' },
              { risk: '80-100%', observed: 93.5, color: '#EF4444' },
            ].map((bin, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', height: '100%', justifyContent: 'flex-end' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  {bin.observed}%
                </span>
                <div
                  style={{
                    width: '36px',
                    height: `${bin.observed * 1.3}px`,
                    backgroundColor: bin.color,
                    borderRadius: '4px 4px 0 0',
                    boxShadow: 'var(--shadow-xs)',
                  }}
                />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-tertiary)' }}>
                  {bin.risk}
                </span>
              </div>
            ))}
          </div>

          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-tertiary)', display: 'flex', justifyContent: 'space-between' }}>
            <span>X: PREDICTED RISK PROBABILITY</span>
            <span>Y: EMPIRICAL ERROR RATE</span>
          </div>
        </div>

        {/* Right: Recent Adjudications */}
        <div
          style={{
            backgroundColor: 'var(--surface-primary)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-sm)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
              Recent Court Records
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 600,
                color: 'var(--sapphire-600)',
                backgroundColor: 'var(--sapphire-50)',
                padding: '2px 8px',
                borderRadius: 'var(--radius-full)',
              }}
            >
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
                  backgroundColor: 'var(--sky-50)',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  transition: 'background-color var(--dur-fast) var(--ease)',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--sapphire-700)' }}>
                      {c.id}
                    </span>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {c.spoke}
                    </span>
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-tertiary)' }}>
                    W1: {c.w1} · W4: {c.w4} · {c.condition} ({c.latency})
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
