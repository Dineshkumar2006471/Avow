import React, { useState } from 'react';
import { Copy, Check, Play } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const ApiPlaygroundPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'curl' | 'python'>('curl');
  const [copied, setCopied] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [responseOutput, setResponseOutput] = useState<string | null>(null);

  const curlCode = `curl -X POST https://api.avow.dev/v1/verdict \\
  -H "X-Verdict-Key: $VERDICT_ADMIN_KEY" \\
  -F audio_file=@caller_reply.wav \\
  -F language_hint=hi-IN \\
  -F 'expect=["AMOUNT"]' \\
  -F 'context={"last_agent_prompt":"Aap kitna jama karenge?","business_rules":{"expected_amount_due":12500}}' \\
  -F 'policy={"risk_appetite":60}'`;

  const pythonCode = `import requests

r = requests.post(
    "https://api.avow.dev/v1/verdict",
    headers={"X-Verdict-Key": "YOUR_ADMIN_KEY"},
    files={"audio_file": open("caller_reply.wav", "rb")},
    data={
        "language_hint": "hi-IN",
        "expect": '["AMOUNT"]',
        "context": '{"last_agent_prompt": "Aap kitna jama karenge?", "business_rules": {"expected_amount_due": 12500}}',
        "policy": '{"risk_appetite": 60}'
    },
    timeout=30,
)

verdict = r.json()
print("Decision:", verdict["decision"])  # CONFIRM
print("Adjudicated Amount:", verdict["entities"][0]["consensus"])  # 15000
print("Readback Speech:", verdict["readback"]["text"])`;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeTab === 'curl' ? curlCode : pythonCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulate = () => {
    setIsSimulating(true);
    setResponseOutput(null);
    setTimeout(() => {
      setIsSimulating(false);
      setResponseOutput(
        JSON.stringify(
          {
            verdict_id: 'vd_01JC8920XYZ',
            decision: 'CONFIRM',
            reason: 'witnesses_disagree',
            entities: [
              {
                type: 'AMOUNT',
                consensus: 15000,
                candidates: [
                  { value: 15000, witnesses: ['W1', 'W2', 'W5'] },
                  { value: 50000, witnesses: ['W4'] },
                ],
                risk: 0.62,
                decision: 'CONFIRM',
                evidence: {
                  agreement: 0.75,
                  coverage: 1.0,
                  confusable: true,
                  business_violation: false,
                  snr_proxy_db: 7.1,
                },
              },
            ],
            witnesses: [
              { id: 'W1', model: 'prisma-v3.0', format: 'transcribe', transcript: 'मैडम मैं ₹15,000 जमा कर दूंगा', latency_ms: 640 },
              { id: 'W4', model: 'prisma-v2.5', format: 'transcribe', transcript: 'मैडम मैं 50000 जमा कर दूंगा', latency_ms: 710 },
              { id: 'W2', model: 'prisma-v3.0', format: 'transliterate', transcript: 'madam main pandrah hazaar jama kar dunga', latency_ms: 670 },
            ],
            readback: {
              text: 'मैंने पंद्रह हज़ार रुपये सुना। क्या यह सही है?',
              language: 'hi-IN',
              audio_url: '/v1/readback/vd_01JC8920XYZ/audio',
            },
            cost: { stt_calls: 3, tts_calls: 1, audio_seconds: 4.8 },
            timing_ms: { total: 2020, stage_a: 1350, stage_b: 670 },
            audit: { hash: '9f2c1e7a...', prev_hash: '41ab09d3...' },
          },
          null,
          2
        )
      );
    }, 800);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', maxWidth: '1240px', margin: '0 auto', width: '100%', overflowX: 'hidden', boxSizing: 'border-box' }}>
      {/* Title */}
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
            INTEGRATION SDK &amp; MIDDLEWARE
          </span>
          <span style={{ color: 'var(--text-tertiary)' }}>/</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-secondary)' }}>
            DEVELOPER PLAYGROUND
          </span>
        </div>
        <h1 style={{ fontSize: '32px', fontWeight: 800 }}>API Playground</h1>
        <p style={{ fontSize: '16px', lineHeight: '24px' }}>
          Drop AVOW between your voice telephony ingress and downstream LLM/workflow engine.
          Zero LLM prompt injection — deterministic runtime safety in under 2 seconds.
        </p>
      </div>

      {/* Code Snippet Box */}
      <div
        style={{
          backgroundColor: 'var(--surface-primary)',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-sm)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Tabs Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '10px',
            backgroundColor: 'var(--sky-100)',
            borderBottom: '1px solid var(--border-default)',
            padding: '8px 16px',
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <button
              onClick={() => setActiveTab('curl')}
              style={{
                backgroundColor: activeTab === 'curl' ? 'var(--surface-primary)' : 'transparent',
                color: activeTab === 'curl' ? 'var(--sapphire-700)' : 'var(--text-secondary)',
                border: 'none',
                borderBottom: activeTab === 'curl' ? '2px solid var(--sapphire-500)' : '2px solid transparent',
                padding: '10px 14px',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all var(--dur-fast) var(--ease)',
              }}
            >
              cURL (BASH)
            </button>
            <button
              onClick={() => setActiveTab('python')}
              style={{
                backgroundColor: activeTab === 'python' ? 'var(--surface-primary)' : 'transparent',
                color: activeTab === 'python' ? 'var(--sapphire-700)' : 'var(--text-secondary)',
                border: 'none',
                borderBottom: activeTab === 'python' ? '2px solid var(--sapphire-500)' : '2px solid transparent',
                padding: '10px 14px',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all var(--dur-fast) var(--ease)',
              }}
            >
              PYTHON SDK (REQUESTS)
            </button>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Button size="compact" variant="ghost" onClick={handleCopy} icon={copied ? <Check size={14} /> : <Copy size={14} />}>
              {copied ? 'COPIED' : 'COPY'}
            </Button>
            <Button size="compact" variant="primary" onClick={handleSimulate} disabled={isSimulating} icon={<Play size={14} />}>
              {isSimulating ? 'TRANSMITTING...' : 'TEST INVOCATION'}
            </Button>
          </div>
        </div>

        {/* Code display */}
        <div style={{ padding: '24px', overflowX: 'auto', backgroundColor: '#0B1629' }}>
          <pre
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              lineHeight: '22px',
              color: '#E2E8F0',
              margin: 0,
            }}
          >
            {activeTab === 'curl' ? curlCode : pythonCode}
          </pre>
        </div>
      </div>

      {/* Simulated JSON Response */}
      {responseOutput && (
        <div
          style={{
            backgroundColor: 'var(--surface-primary)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-sm)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            animation: 'fadeInUp 280ms var(--ease)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#10B981',
                  display: 'inline-block',
                }}
              />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700, color: '#065F46' }}>
                HTTP/1.1 200 OK — VERDICT PAYLOAD
              </span>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-tertiary)' }}>
              RESPONSE TIME: 2,020 MS
            </span>
          </div>

          <pre
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              lineHeight: '20px',
              color: '#38BDF8',
              backgroundColor: '#0B1629',
              padding: '18px',
              borderRadius: 'var(--radius-md)',
              overflowX: 'auto',
              maxHeight: '400px',
              margin: 0,
            }}
          >
            {responseOutput}
          </pre>
        </div>
      )}
    </div>
  );
};
