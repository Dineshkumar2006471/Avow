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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
      {/* Title */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <span className="label" style={{ color: 'var(--navy-500)' }}>
          INTEGRATION SDK &amp; MIDDLEWARE
        </span>
        <h1>API Playground</h1>
        <p>
          Drop AVOW between your voice telephony ingress and downstream LLM/workflow engine.
          Zero LLM prompt injection — deterministic runtime safety in under 2 seconds.
        </p>
      </div>

      {/* Code Snippet Box */}
      <div
        style={{
          backgroundColor: 'var(--navy-850)',
          border: '1px solid var(--navy-300)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Tabs */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'var(--navy-900)',
            borderBottom: '1px solid var(--navy-300)',
            padding: '0 16px',
          }}
        >
          <div style={{ display: 'flex' }}>
            <button
              onClick={() => setActiveTab('curl')}
              style={{
                backgroundColor: activeTab === 'curl' ? 'var(--navy-850)' : 'transparent',
                color: activeTab === 'curl' ? 'var(--text-1)' : 'var(--text-3)',
                borderLeft: '1px solid var(--navy-300)',
                borderRight: '1px solid var(--navy-300)',
                borderTop: activeTab === 'curl' ? '2px solid var(--navy-500)' : 'none',
                borderBottom: 'none',
                padding: '12px 20px',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                cursor: 'pointer',
              }}
            >
              cURL (BASH)
            </button>
            <button
              onClick={() => setActiveTab('python')}
              style={{
                backgroundColor: activeTab === 'python' ? 'var(--navy-850)' : 'transparent',
                color: activeTab === 'python' ? 'var(--text-1)' : 'var(--text-3)',
                borderRight: '1px solid var(--navy-300)',
                borderTop: activeTab === 'python' ? '2px solid var(--navy-500)' : 'none',
                borderBottom: 'none',
                padding: '12px 20px',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                cursor: 'pointer',
              }}
            >
              PYTHON SDK / REQUESTS
            </button>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <Button size="compact" variant="ghost" onClick={handleCopy} icon={copied ? <Check size={14} /> : <Copy size={14} />}>
              {copied ? 'COPIED TO CLIPBOARD' : 'COPY'}
            </Button>
            <Button size="compact" variant="primary" onClick={handleSimulate} disabled={isSimulating} icon={<Play size={14} />}>
              {isSimulating ? 'TRANSMITTING...' : 'TEST INVOCATION'}
            </Button>
          </div>
        </div>

        {/* Code display */}
        <div style={{ padding: '20px', overflowX: 'auto', backgroundColor: 'var(--navy-950)' }}>
          <pre
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              lineHeight: '22px',
              color: 'var(--text-1)',
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
            backgroundColor: 'var(--navy-850)',
            border: '1px solid var(--navy-300)',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            animation: 'fadeInUp 280ms var(--ease)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--navy-300)', paddingBottom: '8px' }}>
            <span className="label" style={{ color: 'var(--accept)' }}>
              HTTP/1.1 200 OK — VERDICT PAYLOAD
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-3)' }}>
              RESPONSE TIME: 2,020 MS
            </span>
          </div>

          <pre
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              lineHeight: '20px',
              color: 'var(--navy-400)',
              backgroundColor: 'var(--navy-950)',
              padding: '16px',
              border: '1px solid var(--navy-300)',
              overflowX: 'auto',
              maxHeight: '400px',
            }}
          >
            {responseOutput}
          </pre>
        </div>
      )}
    </div>
  );
};
