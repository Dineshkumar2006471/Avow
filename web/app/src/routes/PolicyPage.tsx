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
  // Higher appetite = lower confirmations, but slightly higher silent error rate
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span className="label" style={{ color: 'var(--navy-500)' }}>
            ENTERPRISE RISK GOVERNANCE
          </span>
          <h1>Risk Appetite &amp; Business Rules</h1>
          <p>
            Tune the operating point of AVOW. The customer chooses their tolerance; the model computes the exact telephony confirmation cost.
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
              color: 'var(--accept)',
              backgroundColor: 'rgba(61, 214, 140, 0.1)',
              padding: '6px 12px',
              border: '1px solid var(--accept)',
            }}
          >
            <Check size={14} />
            <span>AUTOSAVED LOCALLY</span>
          </div>
        )}
      </div>

      {/* Main Operating Point Slider */}
      <div
        style={{
          backgroundColor: 'var(--navy-850)',
          border: '1px solid var(--navy-300)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '18px' }}>Risk Appetite Dial (Operating Point)</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-3)' }}>
              0 = Zero Tolerance (confirm aggressively) · 100 = Maximum Automation (confirm only severe conflicts)
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '36px',
                fontWeight: 600,
                color: 'var(--navy-500)',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {riskAppetite}
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--text-3)' }}>
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
          style={{ width: '100%', accentColor: 'var(--navy-500)', height: '8px', cursor: 'pointer' }}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-3)' }}>
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
            backgroundColor: 'var(--navy-900)',
            padding: '16px',
            border: '1px solid var(--navy-300)',
          }}
        >
          <div>
            <span className="label" style={{ color: 'var(--text-3)', fontSize: '11px' }}>
              PROJECTED CONFIRM RATE
            </span>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '24px', fontWeight: 600, color: 'var(--confirm)' }}>
              {projectedConfirmRate}% of calls
            </div>
            <span style={{ fontSize: '12px', color: 'var(--text-3)' }}>
              Will trigger Timbre read-back
            </span>
          </div>

          <div>
            <span className="label" style={{ color: 'var(--text-3)', fontSize: '11px' }}>
              RESIDUAL SILENT ERROR RATE
            </span>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '24px', fontWeight: 600, color: 'var(--accept)' }}>
              {projectedSilentError}%
            </div>
            <span style={{ fontSize: '12px', color: 'var(--text-3)' }}>
              Expected misheard commitments
            </span>
          </div>

          <div>
            <span className="label" style={{ color: 'var(--text-3)', fontSize: '11px' }}>
              DYNAMIC THRESHOLDS
            </span>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--text-1)', marginTop: '4px' }}>
              τ_accept = <strong>{acceptThreshold}</strong> · τ_escalate = <strong>{escalateThreshold}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Business Rules Context Guardrails */}
      <div
        style={{
          backgroundColor: 'var(--navy-850)',
          border: '1px solid var(--navy-300)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--navy-300)', paddingBottom: '8px' }}>
          <span className="label">FORWARD-DEPLOYED BUSINESS RULES</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--navy-400)' }}>
            OUT-OF-BOUNDS AUTO-ESCALATION
          </span>
        </div>

        <p style={{ fontSize: '14px', lineHeight: '22px' }}>
          Even if all speech witnesses agree unanimously on a number, if it violates physical business reality (e.g. 10x the loan due), AVOW will override and doubt the number.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label className="label">MAXIMUM ALLOWABLE AMOUNT (₹ INR)</label>
            <input
              type="number"
              value={maxLoanAmount}
              onChange={(e) => setMaxLoanAmount(Number(e.target.value))}
              style={{
                backgroundColor: 'var(--navy-800)',
                border: '1px solid var(--navy-300)',
                color: 'var(--text-1)',
                padding: '10px 12px',
                fontFamily: 'var(--font-mono)',
                fontSize: '15px',
              }}
            />
            <span style={{ fontSize: '12px', color: 'var(--text-3)' }}>
              Any single commitment above this automatically ESCALATES to human supervisor.
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label className="label">DEFAULT EXPECTED AMOUNT DUE (₹ INR)</label>
            <input
              type="number"
              value={defaultExpectedAmount}
              onChange={(e) => setDefaultExpectedAmount(Number(e.target.value))}
              style={{
                backgroundColor: 'var(--navy-800)',
                border: '1px solid var(--navy-300)',
                color: 'var(--text-1)',
                padding: '10px 12px',
                fontFamily: 'var(--font-mono)',
                fontSize: '15px',
              }}
            />
            <span style={{ fontSize: '12px', color: 'var(--text-3)' }}>
              Spoken values deviating &gt;10× or &lt;0.1× trigger business violation penalty.
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '12px' }}>
          <Button size="compact" variant="ghost" onClick={handleReset} icon={<RotateCcw size={14} />}>
            RESET TO RECOMMENDED DEFAULTS
          </Button>
        </div>
      </div>
    </div>
  );
};
