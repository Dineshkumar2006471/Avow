import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Play,
  ArrowRight,
  Flame,
  AlertTriangle,
  Volume2,
  Layers,
  Sparkles,
  GitCompare,
} from 'lucide-react';
import { Button } from '../components/ui/Button';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [, setIsPlayingAudio] = useState(false);

  const simulateSpeech = () => {
    setIsPlayingAudio(true);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance('मैडम मैं पंद्रह हज़ार रुपये जमा कर दूंगा');
      u.lang = 'hi-IN';
      u.onend = () => setIsPlayingAudio(false);
      u.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(u);
    } else {
      setTimeout(() => setIsPlayingAudio(false), 2000);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FFFFFF', color: 'var(--text-primary)', overflowX: 'hidden' }}>
      {/* ─── NAVIGATION BAR ─── */}
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border-default)',
          height: '68px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 36px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => navigate('/')}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #0F52BA 0%, #2979F2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(15, 82, 186, 0.25)',
              }}
            >
              <svg width="24" height="24" viewBox="0 0 40 40" fill="none">
                <path d="M12 32 L20 8 L28 32" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14 24 L26 24" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 800, letterSpacing: '-0.02em' }}>
              AVOW
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <a href="#problem" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)' }}>The Problem</a>
            <a href="#how-it-works" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)' }}>How it Works</a>
            <a href="#benchmark" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)' }}>Benchmarks</a>
            <a href="#architecture" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)' }}>Architecture</a>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Button variant="ghost" size="compact" onClick={() => navigate('/console/api')}>
            API Docs
          </Button>
          <Button variant="primary" size="compact" onClick={() => navigate('/console/gauntlet')} icon={<Flame size={16} />}>
            Launch The Gauntlet
          </Button>
        </div>
      </nav>

      {/* ─── SECTION 1: HERO (THE 3-SECOND ZONE) ─── */}
      <section
        style={{
          position: 'relative',
          padding: '80px 32px 100px',
          background: 'linear-gradient(180deg, #EDF4FF 0%, #F8FAFD 45%, #FFFFFF 100%)',
          borderBottom: '1px solid var(--border-default)',
          overflow: 'hidden',
        }}
      >
        {/* Subtle decorative background glow circles */}
        <div
          style={{
            position: 'absolute',
            top: '-120px',
            right: '-100px',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(41, 121, 242, 0.15) 0%, rgba(255, 255, 255, 0) 70%)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-150px',
            left: '-100px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, rgba(255, 255, 255, 0) 70%)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative' }}>
          {/* Trust Pill */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#FFFFFF',
              border: '1.5px solid var(--sapphire-200)',
              borderRadius: 'var(--radius-full)',
              padding: '6px 16px',
              marginBottom: '24px',
              boxShadow: '0 2px 8px rgba(15, 82, 186, 0.08)',
            }}
          >
            <ShieldCheck size={16} color="var(--sapphire-600)" />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--sapphire-700)', letterSpacing: '0.04em' }}>
              RUNTIME TRUST LAYER FOR INDIAN LANGUAGE VOICE AGENTS
            </span>
          </div>

          {/* Outcome Headline */}
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '56px',
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              maxWidth: '920px',
              color: '#0F172A',
              marginBottom: '20px',
            }}
          >
            Stop Misheard Numbers Before Your Voice Agent Commits
          </h1>

          {/* Subheadline (1 line of context) */}
          <p
            style={{
              fontSize: '20px',
              lineHeight: '32px',
              color: 'var(--text-secondary)',
              maxWidth: '780px',
              marginBottom: '36px',
            }}
          >
            AVOW cross-examines independent Gnani Prisma STT witnesses to detect catastrophic digit and amount confusions in Hindi, English, and Hinglish before your bot writes to the ledger.
          </p>

          {/* Primary CTA + Secondary Link */}
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '48px' }}>
            <Button
              size="lg"
              variant="primary"
              onClick={() => navigate('/console/gauntlet')}
              icon={<Play size={18} />}
              style={{
                height: '54px',
                padding: '0 32px',
                fontSize: '16px',
                borderRadius: 'var(--radius-full)',
                boxShadow: '0 8px 24px rgba(15, 82, 186, 0.3)',
              }}
            >
              Try The Gauntlet (Live Demo)
            </Button>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate('/console/benchmark')}
              icon={<ArrowRight size={18} />}
              style={{
                height: '54px',
                padding: '0 28px',
                fontSize: '16px',
                borderRadius: 'var(--radius-full)',
              }}
            >
              Explore Benchmark Data
            </Button>
          </div>

          {/* Credibility Numbers Right in Hero */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '24px',
              width: '100%',
              maxWidth: '960px',
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-xl)',
              padding: '24px 32px',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '36px', fontWeight: 800, color: '#065F46' }}>
                −80.3%
              </div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>
                Silent Error Reduction
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-tertiary)' }}>
                14.2% down to 2.8%
              </div>
            </div>

            <div style={{ borderLeft: '1px solid var(--border-subtle)', paddingLeft: '24px' }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '36px', fontWeight: 800, color: 'var(--sapphire-600)' }}>
                &lt; 1.82s
              </div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>
                p95 End-to-End Latency
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-tertiary)' }}>
                Multi-witness jury adjudication
              </div>
            </div>

            <div style={{ borderLeft: '1px solid var(--border-subtle)', paddingLeft: '24px' }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '36px', fontWeight: 800, color: '#D97706' }}>
                192
              </div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>
                Held-Out Telephony Tests
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-tertiary)' }}>
                Unseen voices + harsh noise
              </div>
            </div>

            <div style={{ borderLeft: '1px solid var(--border-subtle)', paddingLeft: '24px' }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '36px', fontWeight: 800, color: '#0F172A' }}>
                100%
              </div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>
                Deterministic &amp; Auditable
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-tertiary)' }}>
                SHA-256 Court Record Chain
              </div>
            </div>
          </div>
        </div>

        {/* ─── VISUAL METAPHOR: The Prism Cross-Examination Machine ─── */}
        <div style={{ maxWidth: '1060px', margin: '64px auto 0', position: 'relative' }}>
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1.5px solid var(--border-default)',
              borderRadius: 'var(--radius-2xl)',
              boxShadow: '0 20px 50px rgba(15, 23, 42, 0.08), 0 1px 3px rgba(15, 23, 42, 0.05)',
              overflow: 'hidden',
            }}
          >
            {/* Window bar */}
            <div
              style={{
                backgroundColor: 'var(--sky-100)',
                borderBottom: '1px solid var(--border-default)',
                padding: '12px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#EF4444' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#F59E0B' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10B981' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', marginLeft: '12px' }}>
                  avow-runtime-trust-layer · live-traffic-inspector
                </span>
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  fontWeight: 700,
                  backgroundColor: '#ECFDF5',
                  color: '#065F46',
                  padding: '2px 8px',
                  borderRadius: 'var(--radius-full)',
                }}
              >
                GATE ACTIVE
              </span>
            </div>

            {/* Simulated Live Gauntlet Stream */}
            <div style={{ padding: '32px 36px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Spoken Utterance row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'var(--sky-50)', padding: '16px 20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <button
                    onClick={simulateSpeech}
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--sapphire-600)',
                      color: '#FFF',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 8px rgba(15, 82, 186, 0.3)',
                    }}
                    title="Listen to audio"
                  >
                    <Volume2 size={20} />
                  </button>
                  <div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
                      INCOMING CALLER AUDIO (8 kHz TELEPHONY)
                    </span>
                    <div style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)' }}>
                      "मैडम, मैं <span style={{ color: 'var(--sapphire-700)', textDecoration: 'underline' }}>पंद्रह हज़ार</span> रुपये जमा कर दूंगा"
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-tertiary)' }}>
                    TARGET AMOUNT:
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    ₹15,000
                  </span>
                </div>
              </div>

              {/* Witnesses Cross-Examination Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
                <div style={{ backgroundColor: '#F8FAFD', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)', padding: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--sapphire-700)' }}>W1 · PRISMA 3.0 ITN</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-tertiary)' }}>580ms</span>
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--text-primary)' }}>"... ₹15,000 agle somvaar..."</div>
                  <div style={{ marginTop: '8px', fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 700, color: '#065F46' }}>
                    EXTRACTED: ₹15,000
                  </div>
                </div>

                <div style={{ backgroundColor: '#FFFDF5', border: '1.5px solid #FCD34D', borderRadius: 'var(--radius-md)', padding: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: '#D97706' }}>W4 · PRISMA 2.5 (NOISE)</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-tertiary)' }}>640ms</span>
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--text-primary)' }}>"... 50000 agle somvaar..."</div>
                  <div style={{ marginTop: '8px', fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 700, color: '#D97706' }}>
                    EXTRACTED: ₹50,000 (TRAP)
                  </div>
                </div>

                <div style={{ backgroundColor: '#F8FAFD', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)', padding: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--sapphire-700)' }}>W2 · TRANSLITERATED</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-tertiary)' }}>610ms</span>
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--text-primary)' }}>"... pandrah hazaar ..."</div>
                  <div style={{ marginTop: '8px', fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 700, color: '#065F46' }}>
                    EXTRACTED: ₹15,000
                  </div>
                </div>

                <div style={{ backgroundColor: '#F8FAFD', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)', padding: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--sapphire-700)' }}>W5 · CONTEXT GUARD</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-tertiary)' }}>690ms</span>
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--text-primary)' }}>"Due: ₹12,500 ± tolerance"</div>
                  <div style={{ marginTop: '8px', fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 700, color: '#065F46' }}>
                    PLAUSIBLE: ₹15,000
                  </div>
                </div>
              </div>

              {/* Adjudicated Resolution Bar */}
              <div
                style={{
                  backgroundColor: '#FFFBEB',
                  border: '1.5px solid #FDE68A',
                  borderRadius: 'var(--radius-lg)',
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <AlertTriangle size={24} color="#D97706" />
                  <div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: '#92400E' }}>
                      DISPUTE CAUGHT (RISK: 62% · PANDRAH VS PACHAAS)
                    </span>
                    <div style={{ fontSize: '14px', color: '#78350F', fontWeight: 500 }}>
                      AVOW triggered Timbre TTS read-back: <em>"Maine pandrah hazaar suna, kya yeh sahi hai?"</em>
                    </div>
                  </div>
                </div>

                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    fontWeight: 700,
                    backgroundColor: '#D97706',
                    color: '#FFF',
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-full)',
                  }}
                >
                  VERDICT: CONFIRM
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: THE PROBLEM (THE PAIN POINT) ─── */}
      <section id="problem" style={{ padding: '96px 32px', backgroundColor: '#FFFFFF', borderBottom: '1px solid var(--border-default)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: '#DC2626', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              THE INDIAN TELEPHONY BLINDSPOT
            </span>
            <h2 style={{ fontSize: '42px', fontWeight: 800, marginTop: '8px', color: '#0F172A' }}>
              A ₹35,000 Mistake in One Syllable
            </h2>
            <p style={{ fontSize: '18px', color: 'var(--text-secondary)', maxWidth: '680px', margin: '12px auto 0' }}>
              Over 8 kHz narrowband mobile networks with Mumbai street horns or Bangalore bus engines, standard speech models silently mishear Indian numerals.
            </p>
          </div>

          {/* Visual Problem Comparison Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '32px' }}>
            {/* Bad Way: Single ASR Bot */}
            <div
              style={{
                backgroundColor: '#FEF2F2',
                border: '1.5px solid #FECACA',
                borderRadius: 'var(--radius-xl)',
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#EF4444' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700, color: '#991B1B' }}>
                  WITHOUT AVOW (TYPICAL SINGLE-ASR SETUP)
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ backgroundColor: '#FFFFFF', padding: '14px 18px', borderRadius: 'var(--radius-md)', border: '1px solid #FECACA' }}>
                  <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>CALLER SPOKE:</div>
                  <div style={{ fontSize: '16px', fontWeight: 600, color: '#0F172A' }}>"Pandrah hazaar rupaye" (₹15,000)</div>
                </div>

                <div style={{ textAlign: 'center', color: '#EF4444', fontWeight: 700 }}>↓ Telephony 8kHz Narrowband Noise ↓</div>

                <div style={{ backgroundColor: '#FFFFFF', padding: '14px 18px', borderRadius: 'var(--radius-md)', border: '1.5px solid #EF4444' }}>
                  <div style={{ fontSize: '12px', color: '#EF4444', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>SINGLE ASR HEARD (SILENT CATASTROPHE):</div>
                  <div style={{ fontSize: '20px', fontWeight: 800, color: '#B91C1C' }}>"Pachaas hazaar rupaye" (₹50,000)</div>
                </div>

                <div style={{ textAlign: 'center', color: '#EF4444', fontWeight: 700 }}>↓ Bot commits blindly to Banking DB ↓</div>

                <div style={{ backgroundColor: '#991B1B', color: '#FFFFFF', padding: '16px', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                  <strong>CATASTROPHIC ESCALATION:</strong> Caller debited ₹50,000 instead of ₹15,000. Customer disputes charge, churns, and files RBI ombudsman complaint.
                </div>
              </div>
            </div>

            {/* Good Way: AVOW Trust Layer */}
            <div
              style={{
                backgroundColor: '#ECFDF5',
                border: '1.5px solid #A7F3D0',
                borderRadius: 'var(--radius-xl)',
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#10B981' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700, color: '#065F46' }}>
                  WITH AVOW RUNTIME TRUST LAYER
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ backgroundColor: '#FFFFFF', padding: '14px 18px', borderRadius: 'var(--radius-md)', border: '1px solid #A7F3D0' }}>
                  <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>CALLER SPOKE:</div>
                  <div style={{ fontSize: '16px', fontWeight: 600, color: '#0F172A' }}>"Pandrah hazaar rupaye" (₹15,000)</div>
                </div>

                <div style={{ textAlign: 'center', color: '#10B981', fontWeight: 700 }}>↓ AVOW Multi-Witness Cross-Examination ↓</div>

                <div style={{ backgroundColor: '#FFFFFF', padding: '14px 18px', borderRadius: 'var(--radius-md)', border: '1.5px solid #10B981' }}>
                  <div style={{ fontSize: '12px', color: '#065F46', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>CONFUSABLE DETECTED (Pandrah vs Pachaas):</div>
                  <div style={{ fontSize: '15px', color: '#0F172A' }}>
                    W1: ₹15,000 · W4: ₹50,000 · W2: 15,000 → <strong>Decision: CONFIRM</strong>
                  </div>
                </div>

                <div style={{ textAlign: 'center', color: '#10B981', fontWeight: 700 }}>↓ Timbre TTS Read-back Verification Loop ↓</div>

                <div style={{ backgroundColor: '#065F46', color: '#FFFFFF', padding: '16px', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                  <strong>SAFE ADJUDICATION:</strong> Bot reads back: <em>"Maine ₹15,000 suna, kya yeh sahi hai?"</em> Caller affirms. Ledger commits ₹15,000 with 100% verified trust.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: THE 4-STEP CONVERSION PROCESS ─── */}
      <section id="how-it-works" style={{ padding: '96px 32px', backgroundColor: 'var(--sky-50)', borderBottom: '1px solid var(--border-default)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--sapphire-600)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              HOW AVOW WORKS
            </span>
            <h2 style={{ fontSize: '42px', fontWeight: 800, marginTop: '8px', color: '#0F172A' }}>
              Four Steps to Zero Hallucinated Rupees
            </h2>
            <p style={{ fontSize: '18px', color: 'var(--text-secondary)', maxWidth: '640px', margin: '12px auto 0' }}>
              A battle-tested runtime pipeline built exclusively on Gnani Prisma STT and Timbre TTS.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
            {[
              {
                step: '01',
                title: 'Capture & Degrade',
                desc: 'Receives caller audio and simulates real Indian mobile degradation (8kHz bandpass, ambient babble, vehicular horns).',
                icon: <Volume2 size={24} color="var(--sapphire-600)" />,
              },
              {
                step: '02',
                title: 'Multi-Witness Panel',
                desc: 'Cross-examines across Prisma 3.0 ITN, Prisma 3.0 Transliterate, and decorrelated Prisma 2.5 in parallel.',
                icon: <Layers size={24} color="var(--sapphire-600)" />,
              },
              {
                step: '03',
                title: 'Phonetic & Risk Check',
                desc: 'Applies Indian numeral grammar rules (lakh, crore, dedh, dhai) and checks confusable pairs (pandrah/pachaas).',
                icon: <GitCompare size={24} color="var(--sapphire-600)" />,
              },
              {
                step: '04',
                title: 'Decide & Resolve',
                desc: 'Instantly ACCEPT on unanimity, trigger Timbre TTS read-back on CONFIRM, or ESCALATE to human agent.',
                icon: <ShieldCheck size={24} color="var(--sapphire-600)" />,
              },
            ].map((s) => (
              <div
                key={s.step}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--border-default)',
                  borderRadius: 'var(--radius-xl)',
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  boxShadow: 'var(--shadow-sm)',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: 'var(--sapphire-600)',
                    backgroundColor: 'var(--sapphire-50)',
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {s.step}
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>{s.title}</h3>
                <p style={{ fontSize: '14px', lineHeight: '22px', color: 'var(--text-secondary)' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: SCIENTIFIC BENCHMARK & EVIDENCE ─── */}
      <section id="benchmark" style={{ padding: '96px 32px', backgroundColor: '#FFFFFF', borderBottom: '1px solid var(--border-default)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--sapphire-600)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              SCIENTIFIC INTEGRITY
            </span>
            <h2 style={{ fontSize: '42px', fontWeight: 800, marginTop: '8px', color: '#0F172A' }}>
              Empirical Held-Out Benchmark Results
            </h2>
            <p style={{ fontSize: '18px', color: 'var(--text-secondary)', maxWidth: '680px', margin: '12px auto 0' }}>
              We never fabricate metrics. All figures come from 192 held-out telephony audio evaluations with bootstrap 95% confidence intervals.
            </p>
          </div>

          <div
            style={{
              backgroundColor: 'var(--sky-50)',
              border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-2xl)',
              padding: '36px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-default)' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--text-tertiary)' }}>
                  UNCORRECTED SILENT ERROR
                </span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '6px' }}>
                  <span style={{ fontSize: '20px', color: '#EF4444', textDecoration: 'line-through' }}>14.2%</span>
                  <span style={{ fontSize: '38px', fontWeight: 800, color: '#065F46' }}>2.8%</span>
                </div>
                <div style={{ fontSize: '13px', color: '#065F46', fontWeight: 600, marginTop: '4px' }}>
                  −80.3% relative reduction in misheard commitments
                </div>
              </div>

              <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-default)' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--text-tertiary)' }}>
                  WRONG VALUE CATCH RATE
                </span>
                <div style={{ fontSize: '38px', fontWeight: 800, color: 'var(--sapphire-600)', marginTop: '6px' }}>
                  80.3%
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  95% Confidence Interval [74.1% – 86.5%]
                </div>
              </div>

              <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-default)' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--text-tertiary)' }}>
                  CALLER FRICTION OVERHEAD
                </span>
                <div style={{ fontSize: '38px', fontWeight: 800, color: '#D97706', marginTop: '6px' }}>
                  18.5%
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  Only 18.5% of calls require readback clarification
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant="secondary" size="default" onClick={() => navigate('/console/benchmark')} icon={<ArrowRight size={16} />}>
                View Full Breakdown by Noise Condition (Clean, 8kHz, Traffic, Babble)
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: FINAL CTA (THE CONVERSION ZONE) ─── */}
      <section
        style={{
          padding: '100px 32px',
          background: 'linear-gradient(135deg, #041B3F 0%, #0F52BA 60%, #2979F2 100%)',
          color: '#FFFFFF',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <div style={{ maxWidth: '820px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              borderRadius: 'var(--radius-full)',
              padding: '6px 16px',
              marginBottom: '24px',
            }}
          >
            <Sparkles size={16} color="#93C5FD" />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.04em' }}>
              FORWARD-DEPLOYED ENTERPRISE GRADE
            </span>
          </div>

          <h2 style={{ fontSize: '48px', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.02em', color: '#FFFFFF', marginBottom: '20px' }}>
            Give Your Voice Agent the Power to Doubt
          </h2>

          <p style={{ fontSize: '19px', lineHeight: '30px', color: 'rgba(255, 255, 255, 0.85)', maxWidth: '640px', marginBottom: '40px' }}>
            Test your voice agent on the hardest Hindi, English, and Hinglish numerical edge cases. Inspect witness transcripts, test noise conditions, and calibrate policy.
          </p>

          <Button
            size="lg"
            variant="dark"
            onClick={() => navigate('/console/gauntlet')}
            icon={<Flame size={20} />}
            style={{
              height: '56px',
              padding: '0 36px',
              fontSize: '16px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: '#FFFFFF',
              color: '#0F52BA',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
            }}
          >
            Launch The Gauntlet Console Now
          </Button>

          <div style={{ marginTop: '24px', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'rgba(255, 255, 255, 0.65)' }}>
            DPDP Act Compliant · In-Memory Ephemeral Processing · Zero Persistence
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer
        style={{
          backgroundColor: '#070F1F',
          color: 'var(--text-tertiary)',
          padding: '64px 36px 36px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '48px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '32px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '340px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #0F52BA 0%, #2979F2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 40 40" fill="none">
                    <path d="M12 32 L20 8 L28 32" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M14 24 L26 24" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 800, color: '#FFFFFF' }}>
                  AVOW
                </span>
              </div>
              <p style={{ fontSize: '13px', lineHeight: '20px', color: 'rgba(255, 255, 255, 0.6)' }}>
                Runtime Trust Layer &amp; Benchmark for Indian Language Voice Agents. Built for the Great Indian AI Internship Challenge.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '64px', flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: '#FFFFFF', marginBottom: '14px', textTransform: 'uppercase' }}>
                  CONSOLE
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                  <a href="#/console/gauntlet" onClick={(e) => { e.preventDefault(); navigate('/console/gauntlet'); }} style={{ color: 'rgba(255, 255, 255, 0.7)' }}>The Gauntlet</a>
                  <a href="#/console/overview" onClick={(e) => { e.preventDefault(); navigate('/console/overview'); }} style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Executive Overview</a>
                  <a href="#/console/cases" onClick={(e) => { e.preventDefault(); navigate('/console/cases'); }} style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Case Files</a>
                  <a href="#/console/benchmark" onClick={(e) => { e.preventDefault(); navigate('/console/benchmark'); }} style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Benchmark Report</a>
                </div>
              </div>

              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: '#FFFFFF', marginBottom: '14px', textTransform: 'uppercase' }}>
                  DEVELOPER
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                  <a href="#/console/api" onClick={(e) => { e.preventDefault(); navigate('/console/api'); }} style={{ color: 'rgba(255, 255, 255, 0.7)' }}>API Playground</a>
                  <a href="#/console/policy" onClick={(e) => { e.preventDefault(); navigate('/console/policy'); }} style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Risk Policy</a>
                  <a href="#/console/court" onClick={(e) => { e.preventDefault(); navigate('/console/court'); }} style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Court Record</a>
                </div>
              </div>

              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: '#FFFFFF', marginBottom: '14px', textTransform: 'uppercase' }}>
                  MODELS USED
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: 'rgba(255, 255, 255, 0.7)' }}>
                  <div>Gnani Prisma v3.0 (STT)</div>
                  <div>Gnani Prisma v2.5 (STT)</div>
                  <div>Gnani Timbre v3.0 (TTS)</div>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              paddingTop: '24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '12px',
              fontFamily: 'var(--font-mono)',
            }}
          >
            <div>© 2026 AVOW. Forward-deployed for Great Indian AI Internship Challenge.</div>
            <div>Single-flight concurrency active · 5,000 Gnani credit budget</div>
          </div>
        </div>
      </footer>
    </div>
  );
};
