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
  Lock,
  Cpu,
  Server,
  Zap,
} from 'lucide-react';
import { Button } from '../components/ui/Button';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

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
      {/* ─── NAVIGATION BAR (CENTERED BUTTONS + OFFICIAL LOGO) ─── */}
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border-default)',
          height: '70px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 clamp(16px, 4vw, 40px)',
        }}
      >
        {/* Top-Left: Official AVOW Logo Adjusted for Light Background */}
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          <img
            src="/avow-logo-dark.png"
            alt="AVOW Official Logo"
            style={{
              height: '32px',
              width: 'auto',
              display: 'block',
              objectFit: 'contain',
            }}
          />
          <span
            className="desktop-only"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              fontWeight: 700,
              color: 'var(--sapphire-700)',
              backgroundColor: 'var(--sapphire-50)',
              padding: '3px 8px',
              borderRadius: 'var(--radius-full)',
              letterSpacing: '0.04em',
              border: '1px solid var(--sapphire-100)',
            }}
          >
            TRUST LAYER v1.0
          </span>
        </div>

        {/* Center-Middle: Navigation Items Strictly Centered */}
        <div
          className="desktop-only"
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
          }}
        >
          <a
            href="#hero"
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: 'var(--text-secondary)',
              transition: 'color var(--dur-fast) var(--ease)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--sapphire-700)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
          >
            Overview
          </a>
          <a
            href="#problem"
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: 'var(--text-secondary)',
              transition: 'color var(--dur-fast) var(--ease)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--sapphire-700)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
          >
            The Problem
          </a>
          <a
            href="#how-it-works"
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: 'var(--text-secondary)',
              transition: 'color var(--dur-fast) var(--ease)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--sapphire-700)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
          >
            How it Works
          </a>
          <a
            href="#benchmark"
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: 'var(--text-secondary)',
              transition: 'color var(--dur-fast) var(--ease)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--sapphire-700)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
          >
            Benchmarks
          </a>
          <a
            href="#architecture"
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: 'var(--text-secondary)',
              transition: 'color var(--dur-fast) var(--ease)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--sapphire-700)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
          >
            Architecture
          </a>
        </div>

        {/* Top-Right: CTAs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Button variant="ghost" size="compact" className="desktop-only" onClick={() => navigate('/console/api')}>
            API Docs
          </Button>
          <Button
            variant="primary"
            size="compact"
            onClick={() => navigate('/console/gauntlet')}
            icon={<Flame size={16} />}
            style={{
              borderRadius: 'var(--radius-full)',
              padding: '0 clamp(12px, 3vw, 18px)',
              whiteSpace: 'nowrap',
            }}
          >
            Launch Gauntlet
          </Button>
        </div>
      </nav>

      {/* ─── SECTION 1: HERO (THE 3-SECOND ZONE) ─── */}
      <section
        id="hero"
        style={{
          position: 'relative',
          padding: 'clamp(48px, 8vw, 80px) clamp(16px, 4vw, 32px) clamp(60px, 10vw, 100px)',
          background: 'linear-gradient(180deg, #EDF4FF 0%, #F8FAFD 45%, #FFFFFF 100%)',
          borderBottom: '1px solid var(--border-default)',
          overflow: 'hidden',
        }}
      >
        {/* Subtle decorative glow circles */}
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
              padding: '6px 18px',
              marginBottom: '20px',
              boxShadow: '0 2px 8px rgba(15, 82, 186, 0.08)',
              maxWidth: '100%',
            }}
          >
            <ShieldCheck size={16} color="var(--sapphire-600)" style={{ flexShrink: 0 }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--sapphire-700)', letterSpacing: '0.04em' }}>
              RUNTIME TRUST LAYER FOR VOICE AGENTS
            </span>
          </div>

          {/* Outcome Headline */}
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(28px, 6vw, 56px)',
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              maxWidth: '940px',
              color: '#0F172A',
              marginBottom: '20px',
            }}
          >
            Stop Misheard Numbers Before Your Voice Agent Commits
          </h1>

          {/* Subheadline (1 line of context) */}
          <p
            style={{
              fontSize: 'clamp(15px, 2.5vw, 20px)',
              lineHeight: 'clamp(22px, 3.5vw, 32px)',
              color: 'var(--text-secondary)',
              maxWidth: '780px',
              marginBottom: '36px',
            }}
          >
            AVOW cross-examines independent Gnani Prisma STT witnesses to detect catastrophic digit and amount confusions in Hindi, English, and Hinglish before your bot writes to the ledger.
          </p>

          {/* Primary CTA + Secondary Link */}
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '48px', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
            <Button
              size="lg"
              variant="primary"
              onClick={() => navigate('/console/gauntlet')}
              icon={<Play size={18} />}
              style={{
                height: '52px',
                padding: '0 28px',
                fontSize: '15px',
                borderRadius: 'var(--radius-full)',
                boxShadow: '0 8px 24px rgba(15, 82, 186, 0.3)',
                maxWidth: '100%',
              }}
            >
              Try The Gauntlet (Live Console)
            </Button>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate('/console/benchmark')}
              icon={<ArrowRight size={18} />}
              style={{
                height: '52px',
                padding: '0 24px',
                fontSize: '15px',
                borderRadius: 'var(--radius-full)',
                maxWidth: '100%',
              }}
            >
              Explore Benchmark Data
            </Button>
          </div>

          {/* Credibility Numbers Right in Hero */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))',
              gap: '20px',
              width: '100%',
              maxWidth: '980px',
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-xl)',
              padding: 'clamp(18px, 4vw, 32px)',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px, 5vw, 38px)', fontWeight: 800, color: '#065F46' }}>
                −80.3%
              </div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
                Silent Error Reduction
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-tertiary)' }}>
                14.2% down to 2.8%
              </div>
            </div>

            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px, 5vw, 38px)', fontWeight: 800, color: 'var(--sapphire-600)' }}>
                &lt; 1.82s
              </div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
                p95 Adjudication Latency
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-tertiary)' }}>
                Multi-witness jury adjudication
              </div>
            </div>

            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px, 5vw, 38px)', fontWeight: 800, color: '#D97706' }}>
                192
              </div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
                Held-Out Telephony Tests
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-tertiary)' }}>
                Unseen voices + harsh noise
              </div>
            </div>

            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px, 5vw, 38px)', fontWeight: 800, color: '#0F172A' }}>
                100%
              </div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
                Deterministic &amp; Auditable
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-tertiary)' }}>
                SHA-256 Court Record Chain
              </div>
            </div>
          </div>
        </div>

        {/* ─── VISUAL METAPHOR: The Prism Cross-Examination Machine ─── */}
        <div style={{ maxWidth: '1080px', margin: '64px auto 0', position: 'relative' }}>
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
                GATE ACTIVE · SEMAPHORE 1
              </span>
            </div>

            {/* Simulated Live Gauntlet Stream */}
            <div style={{ padding: 'clamp(16px, 4vw, 36px)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Spoken Utterance row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px', backgroundColor: 'var(--sky-50)', padding: '16px 20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <button
                    onClick={simulateSpeech}
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      backgroundColor: isPlayingAudio ? '#10B981' : 'var(--sapphire-600)',
                      color: '#FFF',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: isPlayingAudio ? '0 0 16px rgba(16, 185, 129, 0.6)' : '0 2px 8px rgba(15, 82, 186, 0.3)',
                      transition: 'all var(--dur-fast) var(--ease)',
                      flexShrink: 0,
                    }}
                    title="Click to hear speech synthesis"
                  >
                    <Volume2 size={20} className={isPlayingAudio ? 'spin' : ''} />
                  </button>
                  <div style={{ textAlign: 'left' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
                      INCOMING CALLER AUDIO (8 kHz TELEPHONY)
                    </span>
                    <div style={{ fontSize: 'clamp(15px, 3vw, 18px)', fontWeight: 600, color: 'var(--text-primary)' }}>
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
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '14px' }}>
                <div style={{ backgroundColor: '#F8FAFD', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)', padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--sapphire-700)' }}>W1 · PRISMA 3.0 ITN</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-tertiary)' }}>580ms</span>
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--text-primary)' }}>"... ₹15,000 agle somvaar..."</div>
                  <div style={{ marginTop: '8px', fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 700, color: '#065F46' }}>
                    EXTRACTED: ₹15,000
                  </div>
                </div>

                <div style={{ backgroundColor: '#FFFDF5', border: '1.5px solid #FCD34D', borderRadius: 'var(--radius-md)', padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: '#D97706' }}>W4 · PRISMA 2.5 (NOISE)</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-tertiary)' }}>640ms</span>
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--text-primary)' }}>"... 50000 agle somvaar..."</div>
                  <div style={{ marginTop: '8px', fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 700, color: '#D97706' }}>
                    EXTRACTED: ₹50,000 (TRAP)
                  </div>
                </div>

                <div style={{ backgroundColor: '#F8FAFD', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)', padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--sapphire-700)' }}>W2 · TRANSLITERATED</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-tertiary)' }}>610ms</span>
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--text-primary)' }}>"... pandrah hazaar ..."</div>
                  <div style={{ marginTop: '8px', fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 700, color: '#065F46' }}>
                    EXTRACTED: ₹15,000
                  </div>
                </div>

                <div style={{ backgroundColor: '#F8FAFD', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)', padding: '16px' }}>
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
                  flexWrap: 'wrap',
                  gap: '12px',
                  boxShadow: '0 2px 8px rgba(245, 158, 11, 0.08)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', textAlign: 'left' }}>
                  <AlertTriangle size={24} color="#D97706" style={{ flexShrink: 0 }} />
                  <div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: '#92400E' }}>
                      DISPUTE CAUGHT (RISK: 62% · PANDRAH VS PACHAAS CONFUSABLE)
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
                    padding: '6px 16px',
                    borderRadius: 'var(--radius-full)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  VERDICT: CONFIRM
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: THE PROBLEM (STORYTELLING VECTOR DIAGRAM) ─── */}
      <section id="problem" style={{ padding: 'clamp(48px, 8vw, 100px) clamp(16px, 4vw, 32px)', backgroundColor: '#FFFFFF', borderBottom: '1px solid var(--border-default)' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(36px, 6vw, 64px)' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: '#DC2626', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              THE INDIAN TELEPHONY BLINDSPOT
            </span>
            <h2 style={{ fontSize: 'clamp(26px, 5vw, 42px)', fontWeight: 800, marginTop: '8px', color: '#0F172A' }}>
              A ₹35,000 Mistake in One Syllable
            </h2>
            <p style={{ fontSize: 'clamp(15px, 2.5vw, 18px)', color: 'var(--text-secondary)', maxWidth: '720px', margin: '12px auto 0' }}>
              Over 8 kHz narrowband telephony lines with Mumbai traffic or ambient chatter, single speech recognition engines silently confuse Indian numerals.
            </p>
          </div>

          {/* Visual Problem Narrative Diagram */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
              gap: '20px',
              backgroundColor: 'var(--sky-50)',
              border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-2xl)',
              padding: 'clamp(16px, 4vw, 36px)',
              marginBottom: '36px',
            }}
          >
            {/* Step 1: Spoken Voice */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--sapphire-600)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700 }}>
                  1
                </span>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 700 }}>
                  Caller Speaks in Hindi
                </span>
              </div>
              <div style={{ backgroundColor: '#FFFFFF', padding: '18px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-default)' }}>
                <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>ORIGINAL INTENT:</div>
                <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--sapphire-700)', marginTop: '4px' }}>
                  "पंद्रह हज़ार रुपये" (₹15,000)
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  A borrower agreeing to an EMI payment schedule.
                </div>
              </div>
            </div>

            {/* Step 2: Telephony Corruption */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#EF4444', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700 }}>
                  2
                </span>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 700 }}>
                  Acoustic Distortion (8 kHz)
                </span>
              </div>
              <div style={{ backgroundColor: '#FEF2F2', padding: '18px', borderRadius: 'var(--radius-lg)', border: '1px solid #FECACA' }}>
                <div style={{ fontSize: '12px', color: '#991B1B', fontFamily: 'var(--font-mono)' }}>HARSH AMBIENCE:</div>
                <div style={{ fontSize: '16px', fontWeight: 700, color: '#991B1B', marginTop: '4px' }}>
                  Bandpass Filter + Auto Horns
                </div>
                <div style={{ fontSize: '12px', color: '#7F1D1D', marginTop: '4px' }}>
                  The phonemes /p-n-d-r-h/ and /p-ch-a-s/ lose high-frequency distinction.
                </div>
              </div>
            </div>

            {/* Step 3: Single Bot Hallucination */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#DC2626', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700 }}>
                  3
                </span>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 700 }}>
                  Single ASR Commits Error
                </span>
              </div>
              <div style={{ backgroundColor: '#FEF2F2', padding: '18px', borderRadius: 'var(--radius-lg)', border: '1.5px solid #FCA5A5' }}>
                <div style={{ fontSize: '12px', color: '#DC2626', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>SILENT RECOGNITION:</div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#B91C1C', marginTop: '4px' }}>
                  Bot hears "₹50,000"
                </div>
                <div style={{ fontSize: '12px', color: '#991B1B', marginTop: '4px' }}>
                  Single engine reports 98% false confidence, blind to phoneme overlap.
                </div>
              </div>
            </div>

            {/* Step 4: Irreversible Ledger Disaster */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#991B1B', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700 }}>
                  4
                </span>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 700 }}>
                  Irreversible Financial Debit
                </span>
              </div>
              <div style={{ backgroundColor: '#FEF2F2', padding: '18px', borderRadius: 'var(--radius-lg)', border: '1.5px solid #EF4444' }}>
                <div style={{ fontSize: '12px', color: '#EF4444', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>DISASTER:</div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#991B1B', marginTop: '4px' }}>
                  ₹50,000 debited instead!
                </div>
                <div style={{ fontSize: '12px', color: '#7F1D1D', marginTop: '4px' }}>
                  ₹35,000 discrepancy causes chargebacks, RBI disputes, and customer churn.
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Toggle: Compare Before vs After */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '20px' }}>
            <div style={{ backgroundColor: '#FEF2F2', border: '1.5px solid #FECACA', borderRadius: 'var(--radius-xl)', padding: 'clamp(18px, 4vw, 28px)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#EF4444' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700, color: '#991B1B' }}>
                  WITHOUT AVOW: UNPROTECTED BOT
                </span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', color: '#7F1D1D' }}>
                <li>❌ Relies on a single black-box speech-to-text engine.</li>
                <li>❌ 0 confidence calibration: cannot differentiate 15 from 50.</li>
                <li>❌ Either interrogates every caller or makes silent financial mistakes.</li>
                <li>❌ 14.2% uncorrected error rate in real telephony conditions.</li>
              </ul>
            </div>

            <div style={{ backgroundColor: '#ECFDF5', border: '1.5px solid #A7F3D0', borderRadius: 'var(--radius-xl)', padding: 'clamp(18px, 4vw, 28px)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10B981' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700, color: '#065F46' }}>
                  WITH AVOW: EVIDENTIARY TRUST LAYER
                </span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', color: '#065F46' }}>
                <li>✓ Multi-witness cross-examination across Prisma 3.0 &amp; 2.5.</li>
                <li>✓ Calibrated risk formula: triggers read-back only when ambiguous.</li>
                <li>✓ Timbre TTS closed-loop read-back safely verifies disputed amounts.</li>
                <li>✓ Drops silent error down to 2.8% (−80.3% reduction).</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: THE 4-STEP PROCESS (HOW IT WORKS) ─── */}
      <section id="how-it-works" style={{ padding: 'clamp(48px, 6vw, 100px) clamp(16px, 4vw, 32px)', backgroundColor: 'var(--sky-50)', borderBottom: '1px solid var(--border-default)', overflowX: 'hidden' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto', width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(36px, 5vw, 64px)' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--sapphire-600)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              HOW AVOW WORKS
            </span>
            <h2 style={{ fontSize: 'clamp(26px, 5vw, 42px)', fontWeight: 800, marginTop: '8px', color: '#0F172A' }}>
              Four Steps to Zero Hallucinated Rupees
            </h2>
            <p style={{ fontSize: 'clamp(15px, 2.5vw, 18px)', color: 'var(--text-secondary)', maxWidth: '640px', margin: '12px auto 0' }}>
              A battle-tested runtime pipeline built exclusively on Gnani Prisma STT and Timbre TTS.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '20px', width: '100%' }}>
            {[
              {
                step: '01',
                title: 'Capture & Degrade',
                desc: 'Receives caller audio and tests against realistic Indian mobile noise (8kHz μ-law bandpass, traffic, babble).',
                icon: <Volume2 size={24} color="var(--sapphire-600)" />,
              },
              {
                step: '02',
                title: 'Multi-Witness Jury',
                desc: 'Dispatches audio across Prisma 3.0 ITN, Prisma 3.0 Transliterate, and decorrelated Prisma 2.5 simultaneously.',
                icon: <Layers size={24} color="var(--sapphire-600)" />,
              },
              {
                step: '03',
                title: 'Phonetic & Risk Check',
                desc: 'Applies Indic numeral rules (lakh, crore, dedh, dhai) and checks confusable pairs (pandrah/pachaas).',
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
                  padding: '32px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
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
                    width: '38px',
                    height: '38px',
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

      {/* ─── SECTION 4: ARCHITECTURE & REQUEST FLOW (NARRATIVE DEEP DIVE) ─── */}
      <section id="architecture" style={{ padding: 'clamp(48px, 6vw, 100px) clamp(16px, 4vw, 32px)', backgroundColor: '#FFFFFF', borderBottom: '1px solid var(--border-default)', overflowX: 'hidden' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto', width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(36px, 5vw, 64px)' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--sapphire-600)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              TECHNICAL SPECIFICATION
            </span>
            <h2 style={{ fontSize: 'clamp(26px, 5vw, 42px)', fontWeight: 800, marginTop: '8px', color: '#0F172A' }}>
              System Architecture &amp; Data Pipeline
            </h2>
            <p style={{ fontSize: 'clamp(15px, 2.5vw, 18px)', color: 'var(--text-secondary)', maxWidth: '680px', margin: '12px auto 0' }}>
              How AVOW delivers deterministic runtime safety without generative LLM hallucination risks.
            </p>
          </div>

          {/* Interactive Pipeline Visual */}
          <div
            style={{
              backgroundColor: '#0B1629',
              borderRadius: 'var(--radius-2xl)',
              padding: 'clamp(16px, 3.5vw, 36px)',
              color: '#FFFFFF',
              boxShadow: 'var(--shadow-xl)',
              width: '100%',
              maxWidth: '100%',
              boxSizing: 'border-box',
              overflow: 'hidden',
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 210px), 1fr))', gap: '16px', width: '100%' }}>
              {/* Box 1 */}
              <div style={{ backgroundColor: '#111D33', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 'var(--radius-lg)', padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#38BDF8' }}>
                  <Server size={18} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700 }}>
                    1. INGRESS API
                  </span>
                </div>
                <div style={{ fontSize: '13px', color: '#CBD5E1', lineHeight: '20px' }}>
                  FastAPI endpoint <code>/v1/verdict</code> accepts multipart audio, language hint, and context.
                </div>
              </div>

              {/* Box 2 */}
              <div style={{ backgroundColor: '#111D33', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 'var(--radius-lg)', padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#34D399' }}>
                  <Zap size={18} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700 }}>
                    2. GNANI GATE
                  </span>
                </div>
                <div style={{ fontSize: '13px', color: '#CBD5E1', lineHeight: '20px' }}>
                  Single-concurrency semaphore (1 flight at a time) protects your 5,000 credit allocation.
                </div>
              </div>

              {/* Box 3 */}
              <div style={{ backgroundColor: '#111D33', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 'var(--radius-lg)', padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#FBBF24' }}>
                  <Cpu size={18} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700 }}>
                    3. ADAPTIVE JURY
                  </span>
                </div>
                <div style={{ fontSize: '13px', color: '#CBD5E1', lineHeight: '20px' }}>
                  Stage A: Prisma 3.0 ITN + Prisma 2.5. Stage B triggered only if consensus is contested.
                </div>
              </div>

              {/* Box 4 */}
              <div style={{ backgroundColor: '#111D33', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 'var(--radius-lg)', padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#A78BFA' }}>
                  <Lock size={18} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700 }}>
                    4. COURT RECORD
                  </span>
                </div>
                <div style={{ fontSize: '13px', color: '#CBD5E1', lineHeight: '20px' }}>
                  Every verdict and caller response appended to an immutable SHA-256 tamper-evident chain.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: BENCHMARKS ─── */}
      <section id="benchmark" style={{ padding: 'clamp(48px, 6vw, 100px) clamp(16px, 4vw, 32px)', backgroundColor: 'var(--sky-50)', borderBottom: '1px solid var(--border-default)', overflowX: 'hidden' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto', width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(36px, 5vw, 64px)' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--sapphire-600)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              SCIENTIFIC INTEGRITY
            </span>
            <h2 style={{ fontSize: 'clamp(26px, 5vw, 42px)', fontWeight: 800, marginTop: '8px', color: '#0F172A' }}>
              Empirical Held-Out Benchmark Results
            </h2>
            <p style={{ fontSize: 'clamp(15px, 2.5vw, 18px)', color: 'var(--text-secondary)', maxWidth: '680px', margin: '12px auto 0' }}>
              Zero fabricated metrics. All figures come from 192 held-out telephony audio evaluations with bootstrap 95% confidence intervals.
            </p>
          </div>

          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-2xl)',
              padding: 'clamp(16px, 3.5vw, 36px)',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              boxShadow: 'var(--shadow-sm)',
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '16px', width: '100%' }}>
              <div style={{ backgroundColor: 'var(--sky-50)', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }}>
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

              <div style={{ backgroundColor: 'var(--sky-50)', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }}>
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

              <div style={{ backgroundColor: 'var(--sky-50)', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }}>
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

              <div style={{ backgroundColor: 'var(--sky-50)', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--text-tertiary)' }}>
                  AVERAGE JURY LATENCY
                </span>
                <div style={{ fontSize: '38px', fontWeight: 800, color: '#0F172A', marginTop: '6px' }}>
                  1.82s
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  p95 multi-witness consensus across 2.6 calls/utt
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '12px' }}>
              <Button variant="secondary" size="default" onClick={() => navigate('/console/benchmark')} icon={<ArrowRight size={16} />}>
                View Full Breakdown by Noise Condition (Clean, 8kHz, Traffic, Babble)
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 6: FINAL CTA (THE CONVERSION ZONE) ─── */}
      <section
        style={{
          padding: 'clamp(48px, 6vw, 100px) clamp(16px, 4vw, 32px)',
          background: 'linear-gradient(135deg, #041B3F 0%, #0F52BA 60%, #2979F2 100%)',
          color: '#FFFFFF',
          textAlign: 'center',
          position: 'relative',
          overflowX: 'hidden',
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

      {/* ─── FOOTER (OFFICIAL WHITE LOGO ON DARK BACKGROUND) ─── */}
      <footer
        style={{
          backgroundColor: '#070F1F',
          color: 'var(--text-tertiary)',
          padding: 'clamp(40px, 6vw, 64px) clamp(16px, 4vw, 40px) 36px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          overflowX: 'hidden',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '48px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '32px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '340px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {/* Official Logo with white typography on dark footer */}
                <img
                  src="/avow-logo.png"
                  alt="AVOW Logo"
                  style={{
                    height: '36px',
                    width: 'auto',
                    objectFit: 'contain',
                    display: 'block',
                  }}
                />
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
              flexWrap: 'wrap',
              gap: '12px',
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
