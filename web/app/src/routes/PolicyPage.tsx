import React, { useState, useEffect } from 'react';
import { Check, RotateCcw } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const PolicyPage: React.FC = () => {
  // Policy State (persisted in localStorage)
  const [riskAppetite, setRiskAppetite] = useState<number>(() => {
    const saved = localStorage.getItem('avow_risk_appetite');
    return saved ? Number(saved) : 60;
  });

  const [maxLoanAmount, setMaxLoanAmount] = useState<number>(() => {
    const saved = localStorage.getItem('avow_max_amount');
    return saved ? Number(saved) : 2000000;
  });

  const [defaultExpectedAmount, setDefaultExpectedAmount] = useState<number>(() => {
    const saved = localStorage.getItem('avow_expected_amount');
    return saved ? Number(saved) : 12500;
  });

  const [savedNotice, setSavedNotice] = useState(false);

  // Autosave to localStorage
  useEffect(() => {
    localStorage.setItem('avow_risk_appetite', String(riskAppetite));
    localStorage.setItem('avow_max_amount', String(maxLoanAmount));
    localStorage.setItem('avow_expected_amount', String(defaultExpectedAmount));
    setSavedNotice(true);
    const timer = setTimeout(() => setSavedNotice(false), 2000);
    return () => clearTimeout(timer);
  }, [riskAppetite, maxLoanAmount, defaultExpectedAmount]);

  // Derived projections based on Risk Appetite (0 to 100)
  const projectedConfirmRate = (28 - (riskAppetite / 100) * 16).toFixed(1);
  const projectedSilentError = (1.2 + (riskAppetite / 100) * 2.8).toFixed(1);
  const acceptThreshold = (0.05 + (riskAppetite / 100) * 0.25).toFixed(2);
  const escalateThreshold = (0.75 + (riskAppetite / 100) * 0.15).toFixed(2);

  const handleReset = () => {
    setRiskAppetite(60);
    setMaxLoanAmount(2000000);
    setDefaultExpectedAmount(12500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', maxWidth: '1240px', margin: '0 auto', width: '100%' }}>
      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#D97706', display: 'inline-block' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: '#0A0A0A', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              RISK GOVERNANCE
            </span>
          </div>
          <h1 style={{ fontSize: '32px', fontWeight: 900, fontFamily: 'var(--font-heading)', color: '#0A0A0A', textTransform: 'uppercase', letterSpacing: '-0.02em', margin: 0 }}>
            Risk Appetite &amp; Business Rules
          </h1>
          <p style={{ fontSize: '15px', color: '#4A5568', marginTop: '6px' }}>
            Set operating thresholds between automated acceptance and caller confirmation.
          </p>
        </div>

        {savedNotice && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 600,
              color: '#065F46',
              backgroundColor: '#ECFDF5',
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid #A7F3D0',
            }}
          >
            <Check size={14} />
            <span>AUTOSAVED LOCALLY</span>
          </div>
        )}
      </div>

      {/* Main Operating Point Slider Card */}
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: 700 }}>Risk Appetite Operating Point</h3>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '2px' }}>
              0 = Zero Tolerance (read-back aggressively) · 100 = Maximum Automation (read-back only on severe conflicts)
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '44px',
                fontWeight: 800,
                color: 'var(--sapphire-600)',
                fontVariantNumeric: 'tabular-nums',
                letterSpacing: '-0.02em',
              }}
            >
              {riskAppetite}
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--text-tertiary)' }}>
              / 100
            </span>
          </div>
        </div>

        <input
          type="range"
          min={0}
          max={100}
          step={5}
          value={riskAppetite}
          onChange={(e) => setRiskAppetite(Number(e.target.value))}
          style={{ width: '100%', accentColor: 'var(--sapphire-600)', height: '8px', cursor: 'pointer' }}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-tertiary)' }}>
          <span>CONSERVATIVE (BFSI / PAYMENTS)</span>
          <span>BALANCED (COLLECTIONS)</span>
          <span>AGGRESSIVE (LOW-VALUE SURVEYS)</span>
        </div>

        {/* Dynamic Impact Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px',
            backgroundColor: 'var(--sky-50)',
            padding: '20px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
              PROJECTED CONFIRM RATE
            </span>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', fontWeight: 800, color: '#D97706', marginTop: '4px' }}>
              {projectedConfirmRate}%
            </div>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              Will trigger Timbre read-back
            </span>
          </div>

          <div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
              RESIDUAL SILENT ERROR RATE
            </span>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', fontWeight: 800, color: '#065F46', marginTop: '4px' }}>
              {projectedSilentError}%
            </div>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              Expected misheard commitments
            </span>
          </div>

          <div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
              CALIBRATED THRESHOLDS
            </span>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--text-primary)', marginTop: '8px' }}>
              τ_accept = <strong>{acceptThreshold}</strong> · τ_escalate = <strong>{escalateThreshold}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Business Rules Context Guardrails */}
      <div
        style={{
          backgroundColor: 'var(--surface-primary)',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-sm)',
          padding: '28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>
            Forward-Deployed Business Guardrails
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
            AUTO-ESCALATION LOGIC
          </span>
        </div>

        <p style={{ fontSize: '14px', lineHeight: '22px' }}>
          Even if all speech witnesses agree unanimously on a number, if it violates physical business reality (e.g. 10x the loan due), AVOW will override and doubt the number.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--text-tertiary)' }}>
              MAXIMUM ALLOWABLE AMOUNT (₹ INR)
            </label>
            <input
              type="number"
              value={maxLoanAmount}
              onChange={(e) => setMaxLoanAmount(Number(e.target.value))}
              style={{
                backgroundColor: 'var(--sky-50)',
                border: '1.5px solid var(--border-default)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-primary)',
                padding: '12px 14px',
                fontFamily: 'var(--font-mono)',
                fontSize: '16px',
                fontWeight: 600,
              }}
            />
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              Any single commitment above this automatically ESCALATES to human supervisor.
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--text-tertiary)' }}>
              DEFAULT EXPECTED AMOUNT DUE (₹ INR)
            </label>
            <input
              type="number"
              value={defaultExpectedAmount}
              onChange={(e) => setDefaultExpectedAmount(Number(e.target.value))}
              style={{
                backgroundColor: 'var(--sky-50)',
                border: '1.5px solid var(--border-default)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-primary)',
                padding: '12px 14px',
                fontFamily: 'var(--font-mono)',
                fontSize: '16px',
                fontWeight: 600,
              }}
            />
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              Spoken values deviating &gt;10× or &lt;0.1× trigger business violation penalty.
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '8px' }}>
          <Button size="compact" variant="ghost" onClick={handleReset} icon={<RotateCcw size={14} />}>
            RESET TO RECOMMENDED DEFAULTS
          </Button>
        </div>
      </div>
    </div>
  );
};
