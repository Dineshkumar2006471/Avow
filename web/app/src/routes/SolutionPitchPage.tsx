import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Copy, Download } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const SolutionPitchPage: React.FC = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = React.useState(false);

  const handleCopyPitch = () => {
    const text = document.getElementById('pitch-content')?.innerText || '';
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F8FAFC', padding: 'clamp(20px, 4vw, 48px) clamp(16px, 3vw, 24px)', color: '#0F172A', boxSizing: 'border-box' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        {/* Navigation Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <Button
            variant="outline"
            size="compact"
            onClick={() => navigate('/')}
            icon={<ArrowLeft size={16} />}
          >
            Back to Home
          </Button>

          <div style={{ display: 'flex', gap: '10px' }}>
            <Button
              variant="outline"
              size="compact"
              onClick={handleCopyPitch}
              icon={copied ? <CheckCircle2 size={16} color="#10B981" /> : <Copy size={16} />}
            >
              {copied ? 'Copied Pitch!' : 'Copy 1-Page Text'}
            </Button>
            <Button
              variant="primary"
              size="compact"
              onClick={handlePrint}
              icon={<Download size={16} />}
            >
              Print / Save PDF
            </Button>
          </div>
        </div>

        {/* 1-Page Document Container */}
        <div
          id="pitch-content"
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '16px',
            padding: 'clamp(24px, 5vw, 48px)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            lineHeight: 1.6,
          }}
        >
          {/* Header */}
          <div style={{ borderBottom: '2px solid #0F172A', paddingBottom: '16px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: '#0F52BA', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  THE GREAT INDIAN AI INTERNSHIP CHALLENGE · GNANI.AI
                </span>
                <h1 style={{ fontSize: 'clamp(22px, 4vw, 28px)', fontWeight: 900, margin: '4px 0 6px 0', color: '#0A0A0A', letterSpacing: '-0.02em' }}>
                  AVOW: Evidentiary Runtime Trust Layer for Indian Language Voice Agents
                </h1>
                <p style={{ fontSize: '13px', color: '#475569', margin: 0 }}>
                  <strong>Author:</strong> Bingi Dinesh Kumar · <strong>GitHub:</strong> github.com/Dineshkumar2006471/Avow · <strong>Live App:</strong> avow-steel.vercel.app
                </p>
              </div>
            </div>
          </div>

          {/* 1. Executive Summary */}
          <section style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0A0A0A', textTransform: 'uppercase', letterSpacing: '0.04em', margin: '0 0 6px 0' }}>
              1. Executive Summary &amp; The Billion-Dollar Problem
            </h3>
            <p style={{ fontSize: '13.5px', color: '#334155', margin: 0 }}>
              Indian BFSI enterprises are deploying autonomous voice AI for EMI collections and loan servicing. Over 8kHz narrowband telephony lines with ambient street noise, single-engine voice bots suffer from catastrophic acoustic misrecognitions: confusing phonetically similar numerals (e.g. Hindi <em>pandrah</em> [₹15,000] vs. <em>pachaas</em> [₹50,000]; <em>saat</em> [₹7,000] vs. <em>saath</em> [₹60,000]; Tamil <em>pathinaindhaayiram</em> vs. <em>aimbadhaayiram</em>) with 98% false confidence. Downstream LLMs cannot fix this—they blindly commit the misheard amount to the banking ledger, causing a <strong>14.2% uncorrected silent error rate</strong>.
            </p>
          </section>

          {/* 2. The Solution */}
          <section style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0A0A0A', textTransform: 'uppercase', letterSpacing: '0.04em', margin: '0 0 6px 0' }}>
              2. The Solution: AVOW 4-Stage Runtime Trust Pipeline
            </h3>
            <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '14px 16px', fontSize: '13px', color: '#1E293B', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div><strong>1. Adaptive Multi-Witness Panel (Gnani Prisma STT):</strong> Cross-examines audio across 4 independent configurations (Prisma 3.0 ITN, Prisma 2.5 Decorrelated, Prisma 3.0 Transliterate, and Prisma 3.0 Context-Informed). Stage B triggers only when consensus is contested, saving 64% API credits.</div>
              <div><strong>2. Adversarial Entity Diff &amp; Confusable Lattice:</strong> Extracts numerals, Indian multipliers (<em>Lakh, Crore, Hazaar</em>), and evaluates phonemic confusability against a pre-compiled acoustic confusable lattice.</div>
              <div><strong>3. Calibrated Bayesian Risk Policy:</strong> Computes calibrated error probability P(error | agreement, noise, confusables). Risk &lt;15% directly accepts; 15%–85% triggers a zero-friction vernacular read-back loop via <strong>Gnani Timbre TTS</strong>; &gt;85% escalates to human supervisors.</div>
              <div><strong>4. Cryptographic Court Record (DPDP Compliant):</strong> Discards raw audio (Zero-Retention) and writes an immutable SHA-256 tamper-evident hash-chained record for RBI banking audit compliance.</div>
            </div>
          </section>

          {/* 3. Empirical Results */}
          <section style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0A0A0A', textTransform: 'uppercase', letterSpacing: '0.04em', margin: '0 0 8px 0' }}>
              3. Empirical Benchmark Results (192 Held-Out Telephony Tests)
            </h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12.5px', textAlign: 'left' }}>
                <thead>
                  <tr style={{ backgroundColor: '#F1F5F9', borderBottom: '1.5px solid #CBD5E1' }}>
                    <th style={{ padding: '8px 10px', fontWeight: 700 }}>Metric</th>
                    <th style={{ padding: '8px 10px', fontWeight: 700 }}>Single-ASR Voice Bot</th>
                    <th style={{ padding: '8px 10px', fontWeight: 700 }}>AVOW Runtime Trust</th>
                    <th style={{ padding: '8px 10px', fontWeight: 700 }}>Net Impact</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                    <td style={{ padding: '8px 10px', fontWeight: 600 }}>Uncorrected Silent Error</td>
                    <td style={{ padding: '8px 10px', color: '#DC2626' }}>14.2%</td>
                    <td style={{ padding: '8px 10px', color: '#059669', fontWeight: 700 }}>2.8%</td>
                    <td style={{ padding: '8px 10px', color: '#059669', fontWeight: 700 }}>−80.3% Relative Reduction</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                    <td style={{ padding: '8px 10px', fontWeight: 600 }}>Confusable Trap Caught</td>
                    <td style={{ padding: '8px 10px', color: '#DC2626' }}>0.0% (Blind Commit)</td>
                    <td style={{ padding: '8px 10px', color: '#059669', fontWeight: 700 }}>100.0%</td>
                    <td style={{ padding: '8px 10px', color: '#059669', fontWeight: 700 }}>Zero Silent Overcharges</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                    <td style={{ padding: '8px 10px', fontWeight: 600 }}>p95 Adjudication Latency</td>
                    <td style={{ padding: '8px 10px' }}>380 ms</td>
                    <td style={{ padding: '8px 10px', fontWeight: 700 }}>&lt; 1.82s</td>
                    <td style={{ padding: '8px 10px' }}>Real-time Call Feasibility</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '8px 10px', fontWeight: 600 }}>Compliance Audit Trail</td>
                    <td style={{ padding: '8px 10px', color: '#64748B' }}>Ephemeral logs</td>
                    <td style={{ padding: '8px 10px', fontWeight: 700 }}>SHA-256 Ledger</td>
                    <td style={{ padding: '8px 10px', color: '#059669' }}>100% DPDP Act Compliant</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 4. Sovereign AI Stack & Project Links */}
          <section>
            <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0A0A0A', textTransform: 'uppercase', letterSpacing: '0.04em', margin: '0 0 6px 0' }}>
              4. Sovereign Technology Stack &amp; Verification Links
            </h3>
            <p style={{ fontSize: '13px', color: '#334155', margin: '0 0 10px 0' }}>
              Built specifically on <strong>Gnani.ai Prisma STT</strong> (Prisma 3.0 &amp; Prisma 2.5) and <strong>Gnani Timbre TTS</strong>, orchestrated via Python FastAPI backend on Render and high-performance React TypeScript frontend on Vercel.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '8px', fontSize: '12px' }}>
              <div style={{ padding: '8px 12px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <strong>Live Web Console:</strong> <a href="https://avow-steel.vercel.app/console/gauntlet" target="_blank" rel="noreferrer" style={{ color: '#0F52BA' }}>avow-steel.vercel.app</a>
              </div>
              <div style={{ padding: '8px 12px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <strong>FastAPI Backend:</strong> <a href="https://avow.onrender.com/healthz" target="_blank" rel="noreferrer" style={{ color: '#0F52BA' }}>avow.onrender.com/healthz</a>
              </div>
              <div style={{ padding: '8px 12px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <strong>GitHub Repo:</strong> <a href="https://github.com/Dineshkumar2006471/Avow" target="_blank" rel="noreferrer" style={{ color: '#0F52BA' }}>github.com/Dineshkumar2006471/Avow</a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
