import React, { useState } from 'react';
import { Mic, MicOff, Play, ShieldCheck, RefreshCw } from 'lucide-react';
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

  // Mock / Benchmark Sample presets
  const sampleSentences: { id: string; label: string; text: string; entity: string }[] = [
    {
      id: 'pandrah_hazaar',
      label: '15,000 vs 50,000 (Pandrah vs Pachaas - Classic BFSI Trap)',
      text: 'मैडम, मैं पंद्रह हज़ार रुपये अगले सोमवार तक जमा कर दूंगा।',
      entity: '15000',
    },
    {
      id: 'dhai_lakh',
      label: '2.5 Lakh (Dhai Lakh Fractional Entity)',
      text: 'अरे भाई ढाई लाख का लोन रीपेमेंट कब ड्यू है?',
      entity: '250000',
    },
    {
      id: 'double_nine',
      label: 'Digit String: 990001234 (Double Nine Triple Zero)',
      text: 'My reference number is double nine triple zero one two three four.',
      entity: '990001234',
    },
    {
      id: 'saat_saath',
      label: '7,000 vs 60,000 (Saat vs Saath Confusable)',
      text: 'सात हज़ार रुपये आज ही ट्रांसफर कर दिए हैं।',
      entity: '7000',
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
        // Degraded 8kHz telephony condition: W4 mishears 50,000!
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
      {/* Title & One-Liner */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="label" style={{ color: 'var(--navy-500)' }}>
            EVIDENTIARY RUNTIME HARNESS
          </span>
          <span style={{ color: 'var(--text-3)' }}>/</span>
          <span className="label" style={{ color: 'var(--text-2)' }}>
            TESTING SUITE
          </span>
        </div>
        <h1>The Gauntlet</h1>
        <p style={{ fontSize: '18px', lineHeight: '28px' }}>
          Cross-examine multiple independent Gnani Prisma witnesses against synthetic telephony noise.
          Catch silent digit confusions before your voice bot commits.
        </p>
      </div>

      {/* DPDP Privacy Consent Checkbox Banner */}
      <div
        style={{
          backgroundColor: 'var(--navy-900)',
          border: '1px solid var(--navy-300)',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
        }}
      >
        <input
          type="checkbox"
          id="consent-check"
          checked={hasConsent}
          onChange={(e) => setHasConsent(e.target.checked)}
          style={{ width: '18px', height: '18px', marginTop: '3px', cursor: 'pointer', accentColor: 'var(--navy-500)' }}
        />
        <label htmlFor="consent-check" style={{ fontSize: '13px', lineHeight: '20px', color: 'var(--text-2)', cursor: 'pointer' }}>
          <strong style={{ color: 'var(--text-1)' }}>DPDP Act Compliance &amp; Ephemeral Processing:</strong> I consent to processing this voice sample via Gnani Prisma STT and Timbre TTS in memory. No audio is stored. No real Aadhaar, PAN, phone or bank numbers should be spoken.
        </label>
      </div>

      {/* Grid: Audio Input & Acoustic Environment */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
        {/* Panel 1: Spoken Audio Sample */}
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
            <span className="label">1. CHOOSE LANGUAGE &amp; TEST UTTERANCE</span>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value as any)}
              style={{
                backgroundColor: 'var(--navy-800)',
                color: 'var(--text-1)',
                border: '1px solid var(--navy-300)',
                padding: '4px 8px',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
              }}
            >
              <option value="hi-IN">HINDI (hi-IN)</option>
              <option value="en-IN">ENGLISH (en-IN)</option>
              <option value="ta-IN">TAMIL (ta-IN)</option>
              <option value="te-IN">TELUGU (te-IN)</option>
            </select>
          </div>

          {/* Preset Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {sampleSentences.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSelectedPrompt(s.id)}
                style={{
                  textAlign: 'left',
                  padding: '10px 12px',
                  backgroundColor: selectedPrompt === s.id ? 'var(--navy-800)' : 'transparent',
                  border: selectedPrompt === s.id ? '1px solid var(--navy-500)' : '1px solid var(--navy-300)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: selectedPrompt === s.id ? '#FFF' : 'var(--text-2)' }}>
                  {s.label}
                </span>
                <span style={{ fontSize: '14px', color: 'var(--text-1)' }}>
                  "{s.text}"
                </span>
              </button>
            ))}
          </div>

          {/* Record button alternative */}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', paddingTop: '8px' }}>
            <Button
              size="compact"
              variant={isRecording ? 'danger' : 'secondary'}
              onClick={toggleRecording}
              icon={isRecording ? <MicOff size={16} /> : <Mic size={16} />}
            >
              {isRecording ? `RECORDING (${recordingSeconds}s / 12s)` : 'RECORD WITH MIC (12s)'}
            </Button>
            <span style={{ fontSize: '12px', color: 'var(--text-3)' }}>
              or select preset above
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
      <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0' }}>
        <Button
          size="default"
          variant="primary"
          onClick={handleRunGauntlet}
          disabled={isRunning || !hasConsent}
          icon={isRunning ? <RefreshCw className="spin" size={18} /> : <Play size={18} />}
          style={{ minWidth: '280px', height: '54px', fontSize: '16px' }}
        >
          {isRunning ? 'CROSS-EXAMINING PRISMA WITNESSES...' : 'RUN THE GAUNTLET'}
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
              backgroundColor: 'var(--navy-850)',
              border: '1px solid var(--navy-300)',
              padding: '20px 24px',
              gap: '16px',
            }}
          >
            <div>
              <span className="label" style={{ color: 'var(--text-3)', display: 'block', marginBottom: '4px' }}>
                ADJUDICATED VERDICT
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

            <div style={{ minWidth: '320px', flex: 1, maxWidth: '480px' }}>
              <RiskMeter riskScore={currentRisk} />
            </div>
          </div>

          {/* Waveform Player */}
          <WaveformPlayer hasDegradedVersion={condition !== 'CLEAN'} />

          {/* The 4 Independent Witnesses Cards */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span className="label" style={{ color: 'var(--text-1)' }}>
                INDEPENDENT WITNESS TESTIMONY ({witnesses.length} RECEPTORS)
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-3)' }}>
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span className="label" style={{ color: 'var(--confirm)' }}>
                AUTONOMOUS RESOLUTION LOOP (TIMBRE v3.0 CLOSED-LOOP)
              </span>
              <ReadbackBubble
                text="मैंने पंद्रह हज़ार रुपये सुना। क्या यह सही है? हाँ बोलिए, या सही रकम बताइए।"
                language="hi-IN"
                onRecordReply={handleRecordReply}
                isResolving={isResolving}
              />

              {resolvedDecision && (
                <div
                  style={{
                    backgroundColor: 'rgba(61, 214, 140, 0.1)',
                    border: '1px solid var(--accept)',
                    padding: '12px 16px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '13px',
                    color: 'var(--accept)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <ShieldCheck size={18} />
                  <span>{resolvedDecision} — STATUS CHANGED TO: ACCEPTED</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
