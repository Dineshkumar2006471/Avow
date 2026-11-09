import React, { useState } from 'react';
import { Mic, MicOff, Play, RefreshCw, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { WitnessCard, WitnessData } from '../components/WitnessCard';
import { EntityDiff, CandidateValue } from '../components/EntityDiff';
import { RiskMeter } from '../components/RiskMeter';
import { VerdictStamp } from '../components/VerdictStamp';
import { NoiseDial, DegradationCondition } from '../components/NoiseDial';
import { WaveformPlayer } from '../components/WaveformPlayer';
import { ReadbackBubble } from '../components/ReadbackBubble';
import { VerdictType } from '../components/ui/Tag';

export const GauntletPage: React.FC = () => {
  // Step 1: Consent
  const [hasConsent, setHasConsent] = useState(true);

  // Step 2: Language & Input
  const [selectedLanguage, setSelectedLanguage] = useState<'hi-IN' | 'en-IN' | 'ta-IN' | 'te-IN'>('hi-IN');
  const [selectedPrompt, setSelectedPrompt] = useState<string>('pandrah_hazaar');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);

  // Step 3: Acoustic Environment
  const [condition, setCondition] = useState<DegradationCondition>('PHONE_8K');
  const [snrDb, setSnrDb] = useState(8);

  // Step 4: Execution & State
  const [isRunning, setIsRunning] = useState(false);
  const [hasResult, setHasResult] = useState(true); // default true for immediate visual wow
  const [isResolving, setIsResolving] = useState(false);
  const [resolvedDecision, setResolvedDecision] = useState<string | null>(null);

  // Benchmark Sample presets
  const sampleSentences: { id: string; label: string; text: string; entity: string; badge: string }[] = [
    {
      id: 'pandrah_hazaar',
      label: '₹15,000 vs ₹50,000 (Pandrah vs Pachaas)',
      text: 'मैडम, मैं पंद्रह हज़ार रुपये अगले सोमवार तक जमा कर दूंगा।',
      entity: '15000',
      badge: 'Classic BFSI Trap',
    },
    {
      id: 'dhai_lakh',
      label: '₹2.5 Lakh (Dhai Lakh Fractional Entity)',
      text: 'अरे भाई ढाई लाख का लोन रीपेमेंट कब ड्यू है?',
      entity: '250000',
      badge: 'Fractional Multiplier',
    },
    {
      id: 'double_nine',
      label: 'Digit String: 990001234',
      text: 'My reference number is double nine triple zero one two three four.',
      entity: '990001234',
      badge: 'Repeat Word Path',
    },
    {
      id: 'saat_saath',
      label: '₹7,000 vs ₹60,000 (Saat vs Saath)',
      text: 'सात हज़ार रुपये आज ही ट्रांसफर कर दिए हैं।',
      entity: '7000',
      badge: 'Phonetic Sibilant Trap',
    },
  ];

  // Dynamic witness states based on selected sample & condition
  const getSimulatedWitnesses = (): WitnessData[] => {
    if (selectedPrompt === 'pandrah_hazaar') {
      if (condition === 'CLEAN') {
        return [
          {
            id: 'W1',
            name: 'PRISMA 3.0 · ITN',
            model: 'prisma-v3.0',
            transcript: 'मैडम मैं ₹15,000 अगले सोमवार तक जमा कर दूंगा',
            highlightSpan: '₹15,000',
            parsedValue: '₹15,000',
            latencyMs: 580,
            agreementStatus: 'consensus',
            languageCode: 'hi-IN',
          },
          {
            id: 'W4',
            name: 'PRISMA 2.5 · DECORRELATED',
            model: 'prisma-v2.5',
            transcript: 'मैडम मैं 15000 अगले सोमवार तक जमा कर दूंगा',
            highlightSpan: '15000',
            parsedValue: '₹15,000',
            latencyMs: 640,
            agreementStatus: 'consensus',
            languageCode: 'hi-IN',
          },
          {
            id: 'W2',
            name: 'PRISMA 3.0 · TRANSLITERATE',
            model: 'prisma-v3.0',
            transcript: 'madam main pandrah hazaar agle somvaar tak jama kar dunga',
            highlightSpan: 'pandrah hazaar',
            parsedValue: '₹15,000',
            latencyMs: 610,
            agreementStatus: 'consensus',
            languageCode: 'hi-IN',
          },
          {
            id: 'W5',
            name: 'PRISMA 3.0 · CONTEXT-INFORMED',
            model: 'prisma-v3.0',
            transcript: 'मैडम मैं ₹15,000 अगले सोमवार तक जमा कर दूंगा',
            highlightSpan: '₹15,000',
            parsedValue: '₹15,000',
            latencyMs: 690,
            agreementStatus: 'consensus',
            languageCode: 'hi-IN',
          },
        ];
      } else {
        // Degraded telephony condition: W4 mishears 50,000!
        return [
          {
            id: 'W1',
            name: 'PRISMA 3.0 · ITN',
            model: 'prisma-v3.0',
            transcript: 'मैडम मैं ₹15,000 अगले सोमवार तक जमा कर दूंगा',
            highlightSpan: '₹15,000',
            parsedValue: '₹15,000',
            latencyMs: 640,
            agreementStatus: 'consensus',
            languageCode: 'hi-IN',
          },
          {
            id: 'W4',
            name: 'PRISMA 2.5 · DECORRELATED',
            model: 'prisma-v2.5',
            transcript: 'मैडम मैं 50000 अगले सोमवार तक जमा कर दूंगा',
            highlightSpan: '50000',
            parsedValue: '₹50,000 (MISHEARD)',
            latencyMs: 710,
            agreementStatus: 'disputed',
            languageCode: 'hi-IN',
          },
          {
            id: 'W2',
            name: 'PRISMA 3.0 · TRANSLITERATE',
            model: 'prisma-v3.0',
            transcript: 'madam main pandrah hazaar agle somvaar tak jama kar dunga',
            highlightSpan: 'pandrah hazaar',
            parsedValue: '₹15,000',
            latencyMs: 670,
            agreementStatus: 'consensus',
            languageCode: 'hi-IN',
          },
          {
            id: 'W5',
            name: 'PRISMA 3.0 · CONTEXT-INFORMED',
            model: 'prisma-v3.0',
            transcript: 'मैडम मैं ₹15,000 अगले सोमवार तक जमा कर दूंगा',
            highlightSpan: '₹15,000',
            parsedValue: '₹15,000',
            latencyMs: 730,
            agreementStatus: 'consensus',
            languageCode: 'hi-IN',
          },
        ];
      }
    }

    if (selectedPrompt === 'dhai_lakh') {
      return [
        {
          id: 'W1',
          name: 'PRISMA 3.0 · ITN',
          model: 'prisma-v3.0',
          transcript: 'अरे भाई ₹2,50,000 का लोन रीपेमेंट कब ड्यू है',
          highlightSpan: '₹2,50,000',
          parsedValue: '₹2,50,000',
          latencyMs: 620,
          agreementStatus: 'consensus',
          languageCode: 'hi-IN',
        },
        {
          id: 'W4',
          name: 'PRISMA 2.5 · DECORRELATED',
          model: 'prisma-v2.5',
          transcript: 'अरे भाई ढाई लाख का लोन रीपेमेंट कब ड्यू है',
          highlightSpan: 'ढाई लाख',
          parsedValue: '₹2,50,000',
          latencyMs: 680,
          agreementStatus: 'consensus',
          languageCode: 'hi-IN',
        },
        {
          id: 'W2',
          name: 'PRISMA 3.0 · TRANSLITERATE',
          model: 'prisma-v3.0',
          transcript: 'arey bhai dhai lakh ka loan repayment kab due hai',
          highlightSpan: 'dhai lakh',
          parsedValue: '₹2,50,000',
          latencyMs: 640,
          agreementStatus: 'consensus',
          languageCode: 'hi-IN',
        },
        {
          id: 'W5',
          name: 'PRISMA 3.0 · CONTEXT-INFORMED',
          model: 'prisma-v3.0',
          transcript: 'अरे भाई ₹2,50,000 का लोन रीपेमेंट कब ड्यू है',
          highlightSpan: '₹2,50,000',
          parsedValue: '₹2,50,000',
          latencyMs: 700,
          agreementStatus: 'consensus',
          languageCode: 'hi-IN',
        },
      ];
    }

    // Default fallback
    return [
      {
        id: 'W1',
        name: 'PRISMA 3.0 · ITN',
        model: 'prisma-v3.0',
        transcript: 'My reference number is 990001234',
        highlightSpan: '990001234',
        parsedValue: '990001234',
        latencyMs: 590,
        agreementStatus: 'consensus',
      },
      {
        id: 'W4',
        name: 'PRISMA 2.5 · DECORRELATED',
        model: 'prisma-v2.5',
        transcript: 'Reference number 990001234',
        highlightSpan: '990001234',
        parsedValue: '990001234',
        latencyMs: 630,
        agreementStatus: 'consensus',
      },
    ];
  };

  const witnesses = getSimulatedWitnesses();

  // Candidates for EntityDiff
  const getCandidates = (): CandidateValue[] => {
    if (selectedPrompt === 'pandrah_hazaar' && condition !== 'CLEAN') {
      return [
        { value: '₹15,000', witnesses: ['W1', 'W2', 'W5'], isMajority: true, status: 'consensus' },
        { value: '₹50,000', witnesses: ['W4'], isMajority: false, status: 'disputed' },
      ];
    }
    if (selectedPrompt === 'dhai_lakh') {
      return [{ value: '₹2,50,000', witnesses: ['W1', 'W4', 'W2', 'W5'], isMajority: true, status: 'consensus' }];
    }
    return [{ value: '₹15,000', witnesses: ['W1', 'W4', 'W2', 'W5'], isMajority: true, status: 'consensus' }];
  };

  // Verdict calculation
  const isClean = condition === 'CLEAN';
  const hasDispute = selectedPrompt === 'pandrah_hazaar' && !isClean;
  const currentVerdict: VerdictType = hasDispute ? 'CONFIRM' : 'ACCEPT';
  const currentRisk = hasDispute ? 0.62 : 0.04;

  // Handle Run
  const handleRunGauntlet = () => {
    setIsRunning(true);
    setHasResult(false);
    setResolvedDecision(null);

    setTimeout(() => {
      setIsRunning(false);
      setHasResult(true);
    }, 1200);
  };

  // Handle Recording Simulator
  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      setRecordingSeconds(0);
    } else {
      setIsRecording(true);
      const interval = setInterval(() => {
        setRecordingSeconds((sec) => {
          if (sec >= 12) {
            clearInterval(interval);
            setIsRecording(false);
            return 0;
          }
          return sec + 1;
        });
      }, 1000);
    }
  };

  // Handle Resolution Reply
  const handleRecordReply = () => {
    setIsResolving(true);
    setTimeout(() => {
      setIsResolving(false);
      setResolvedDecision('RESOLVED_CONFIRMED: Caller affirmed ₹15,000.');
    }, 1500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', maxWidth: '1240px', margin: '0 auto', width: '100%' }}>
      {/* Page Title & Breadcrumbs */}
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
            EVIDENTIARY RUNTIME HARNESS
          </span>
          <span style={{ color: 'var(--text-tertiary)' }}>/</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-secondary)' }}>
            INTERACTIVE JURY SUITE
          </span>
        </div>
        <h1 style={{ fontSize: '32px', fontWeight: 800 }}>The Gauntlet</h1>
        <p style={{ fontSize: '16px', lineHeight: '24px' }}>
          Cross-examine multiple independent Gnani Prisma witnesses against synthetic telephony noise.
          Catch silent digit confusions before your voice bot commits.
        </p>
      </div>

      {/* DPDP Privacy Consent Banner */}
      <div
        style={{
          backgroundColor: 'var(--surface-primary)',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-md)',
          padding: '14px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          boxShadow: 'var(--shadow-xs)',
        }}
      >
        <input
          type="checkbox"
          id="consent-check"
          checked={hasConsent}
          onChange={(e) => setHasConsent(e.target.checked)}
          style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--sapphire-600)' }}
        />
        <label htmlFor="consent-check" style={{ fontSize: '13px', lineHeight: '20px', color: 'var(--text-secondary)', cursor: 'pointer' }}>
          <strong style={{ color: 'var(--text-primary)' }}>DPDP Act Compliance &amp; Ephemeral Processing:</strong> I consent to processing this voice sample via Gnani Prisma STT and Timbre TTS in memory. No audio is persisted. Synthetic numbers only.
        </label>
      </div>

      {/* Two Column Grid: Spoken Input & Noise Condition */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '20px' }}>
        {/* Panel 1: Spoken Audio Sample */}
        <div
          style={{
            backgroundColor: 'var(--surface-primary)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-sm)',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '10px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              1. SELECT LANGUAGE &amp; SPOKEN TEST UTTERANCE
            </span>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value as any)}
              style={{
                backgroundColor: 'var(--sky-100)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-sm)',
                padding: '4px 8px',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <option value="hi-IN">HINDI (hi-IN)</option>
              <option value="en-IN">ENGLISH-INDIA (en-IN)</option>
              <option value="ta-IN">TAMIL (ta-IN)</option>
              <option value="te-IN">TELUGU (te-IN)</option>
            </select>
          </div>

          {/* Preset Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {sampleSentences.map((s) => {
              const isSelected = selectedPrompt === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSelectedPrompt(s.id)}
                  style={{
                    textAlign: 'left',
                    padding: '12px 14px',
                    backgroundColor: isSelected ? 'var(--sapphire-50)' : 'var(--sky-50)',
                    border: isSelected ? '1.5px solid var(--sapphire-500)' : '1px solid var(--border-default)',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    transition: 'all var(--dur-fast) var(--ease)',
                    boxShadow: isSelected ? '0 2px 8px rgba(15, 82, 186, 0.12)' : 'none',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 700, color: isSelected ? 'var(--sapphire-800)' : 'var(--text-primary)' }}>
                      {s.label}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '9px',
                        fontWeight: 600,
                        backgroundColor: isSelected ? 'var(--sapphire-100)' : 'var(--sky-200)',
                        color: isSelected ? 'var(--sapphire-700)' : 'var(--text-secondary)',
                        padding: '1px 6px',
                        borderRadius: 'var(--radius-full)',
                      }}
                    >
                      {s.badge}
                    </span>
                  </div>
                  <span style={{ fontSize: '13px', color: isSelected ? 'var(--sapphire-900)' : 'var(--text-secondary)', fontStyle: 'italic' }}>
                    "{s.text}"
                  </span>
                </button>
              );
            })}
          </div>

          {/* Record button alternative */}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', paddingTop: '4px' }}>
            <Button
              size="compact"
              variant={isRecording ? 'danger' : 'secondary'}
              onClick={toggleRecording}
              icon={isRecording ? <MicOff size={15} /> : <Mic size={15} />}
            >
              {isRecording ? `RECORDING (${recordingSeconds}s / 12s)` : 'RECORD WITH MICROPHONE'}
            </Button>
            <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
              or use pre-recorded presets
            </span>
          </div>
        </div>

        {/* Panel 2: Acoustic Degradation Condition (NoiseDial) */}
        <div>
          <NoiseDial
            condition={condition}
            onConditionChange={setCondition}
            snrDb={snrDb}
            onSnrChange={setSnrDb}
          />
        </div>
      </div>

      {/* Run CTA Button */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '6px 0' }}>
        <Button
          size="lg"
          variant="primary"
          onClick={handleRunGauntlet}
          disabled={isRunning || !hasConsent}
          icon={isRunning ? <RefreshCw className="spin" size={20} /> : <Play size={20} />}
          style={{ minWidth: '320px', height: '52px', fontSize: '16px', borderRadius: 'var(--radius-full)' }}
        >
          {isRunning ? 'CROSS-EXAMINING PRISMA WITNESSES...' : 'RUN THE GAUNTLET (ADJUDICATE)'}
        </Button>
      </div>

      {/* Results View */}
      {hasResult && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', animation: 'fadeInUp 280ms var(--ease)' }}>
          {/* Top Verdict Row */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: 'var(--surface-primary)',
              border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-sm)',
              padding: '20px 24px',
              gap: '20px',
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: 'var(--text-tertiary)',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '8px',
                }}
              >
                FINAL ADJUDICATED VERDICT
              </span>
              <VerdictStamp
                verdict={currentVerdict}
                reason={
                  hasDispute
                    ? 'PRISMA 2.5 heard ₹50,000 while PRISMA 3.0 & Transliterate heard ₹15,000. Risk: 62%.'
                    : 'Unanimous consensus across all 4 independent configurations.'
                }
              />
            </div>

            <div style={{ minWidth: '320px', flex: 1, maxWidth: '440px' }}>
              <RiskMeter riskScore={currentRisk} />
            </div>
          </div>

          {/* Waveform Player */}
          <WaveformPlayer hasDegradedVersion={condition !== 'CLEAN'} />

          {/* The 4 Independent Witnesses Cards */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={16} color="var(--sapphire-600)" />
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Independent Witness Testimony ({witnesses.length} Receptors)
                </span>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-tertiary)' }}>
                BLACK-BOX DIVERSITY: PRISMA v3.0 (ITN + LATIN) × PRISMA v2.5
              </span>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '16px',
              }}
            >
              {witnesses.map((w, idx) => (
                <WitnessCard key={w.id} witness={w} index={idx} />
              ))}
            </div>
          </div>

          {/* Cross-Examination EntityDiff */}
          <EntityDiff
            entityType="AMOUNT"
            candidates={getCandidates()}
            consensusValue="₹15,000"
          />

          {/* Timbre Read-back Loop (if CONFIRM triggered) */}
          {hasDispute && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <ReadbackBubble
                text="मैंने पंद्रह हज़ार रुपये सुना। क्या यह सही है? हाँ बोलिए, या सही रकम बताइए।"
                language="hi-IN"
                onRecordReply={handleRecordReply}
                isResolving={isResolving}
              />

              {resolvedDecision && (
                <div
                  style={{
                    backgroundColor: '#ECFDF5',
                    border: '1.5px solid #A7F3D0',
                    borderRadius: 'var(--radius-md)',
                    padding: '14px 18px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '13px',
                    color: '#065F46',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    boxShadow: 'var(--shadow-xs)',
                  }}
                >
                  <CheckCircle2 size={20} color="#10B981" />
                  <span><strong>{resolvedDecision}</strong> — TRANSACTION COMMITTED SAFELY WITH VERIFIED TRUST</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
