import React, { useState } from 'react';
import { Tag, VerdictType } from '../components/ui/Tag';
import { WitnessCard } from '../components/WitnessCard';
import { RiskMeter } from '../components/RiskMeter';
import { WaveformPlayer } from '../components/WaveformPlayer';
import { Search, X } from 'lucide-react';
import { Button } from '../components/ui/Button';

interface BenchmarkCase {
  id: string;
  utterance: string;
  groundTruth: string;
  condition: string;
  language: string;
  entityType: string;
  w1: string;
  w4: string;
  w2: string;
  w5: string;
  decision: VerdictType;
  risk: number;
  outcome: 'CORRECT_ACCEPT' | 'CAUGHT_ERROR' | 'UNANIMOUS_WRONG' | 'FALSE_CONFIRM';
}

export const CaseFilesPage: React.FC = () => {
  const [filterCondition, setFilterCondition] = useState<string>('ALL');
  const [filterDecision, setFilterDecision] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCase, setSelectedCase] = useState<BenchmarkCase | null>(null);

  const cases: BenchmarkCase[] = [
    {
      id: 'CAS-0101',
      utterance: 'मैडम मैं पंद्रह हज़ार रुपये अगले सोमवार तक दे दूंगा',
      groundTruth: '₹15,000',
      condition: 'PHONE_8K',
      language: 'hi-IN',
      entityType: 'AMOUNT',
      w1: '₹15,000',
      w4: '₹50,000',
      w2: 'pandrah hazaar',
      w5: '₹15,000',
      decision: 'CONFIRM',
      risk: 0.62,
      outcome: 'CAUGHT_ERROR',
    },
    {
      id: 'CAS-0102',
      utterance: 'अरे भाई ढाई लाख का लोन रीपेमेंट कब ड्यू है',
      groundTruth: '₹2,50,000',
      condition: 'CLEAN',
      language: 'hi-IN',
      entityType: 'AMOUNT',
      w1: '₹2,50,000',
      w4: 'ढाई लाख',
      w2: 'dhai lakh',
      w5: '₹2,50,000',
      decision: 'ACCEPT',
      risk: 0.04,
      outcome: 'CORRECT_ACCEPT',
    },
    {
      id: 'CAS-0103',
      utterance: 'Reference number is double nine triple zero one',
      groundTruth: '990001',
      condition: 'TRAFFIC_5',
      language: 'en-IN',
      entityType: 'DIGIT_STRING',
      w1: '990001',
      w4: '99001',
      w2: 'double nine triple zero one',
      w5: '990001',
      decision: 'CONFIRM',
      risk: 0.58,
      outcome: 'CAUGHT_ERROR',
    },
    {
      id: 'CAS-0104',
      utterance: 'सात हज़ार रुपये आज ही ट्रांसफर कर दिए हैं',
      groundTruth: '₹7,000',
      condition: 'PHONE_8K',
      language: 'hi-IN',
      entityType: 'AMOUNT',
      w1: '₹7,000',
      w4: '₹60,000',
      w2: 'saat hazaar',
      w5: '₹7,000',
      decision: 'CONFIRM',
      risk: 0.66,
      outcome: 'CAUGHT_ERROR',
    },
    {
      id: 'CAS-0105',
      utterance: 'Bees hazaar paanch sau rupaye jama ho gaye',
      groundTruth: '₹20,500',
      condition: 'BABBLE_10',
      language: 'hi-IN',
      entityType: 'AMOUNT',
      w1: '₹20,500',
      w4: '₹20,500',
      w2: 'bees hazaar paanch sau',
      w5: '₹20,500',
      decision: 'ACCEPT',
      risk: 0.08,
      outcome: 'CORRECT_ACCEPT',
    },
    {
      id: 'CAS-0106',
      utterance: 'Sava lakh rupaye bache hain sir',
      groundTruth: '₹1,25,000',
      condition: 'PHONE_8K',
      language: 'hi-IN',
      entityType: 'AMOUNT',
      w1: '₹1,25,000',
      w4: 'सवा लाख',
      w2: 'sava lakh',
      w5: '₹1,25,000',
      decision: 'ACCEPT',
      risk: 0.11,
      outcome: 'CORRECT_ACCEPT',
    },
    {
      id: 'CAS-0107',
      utterance: 'Ten crore seventy five lakh rupees pending',
      groundTruth: '₹10,75,00,000',
      condition: 'SPEAKER_REVERB',
      language: 'en-IN',
      entityType: 'AMOUNT',
      w1: '₹1,75,00,000',
      w4: '₹10,75,00,000',
      w2: 'ten crore seventy five lakh',
      w5: '₹10,75,00,000',
      decision: 'CONFIRM',
      risk: 0.74,
      outcome: 'CAUGHT_ERROR',
    },
  ];

  const filteredCases = cases.filter((c) => {
    if (filterCondition !== 'ALL' && c.condition !== filterCondition) return false;
    if (filterDecision !== 'ALL' && c.decision !== filterDecision) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        c.id.toLowerCase().includes(q) ||
        c.utterance.toLowerCase().includes(q) ||
        c.groundTruth.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <span className="label" style={{ color: 'var(--navy-500)' }}>
          RECORDED ADJUDICATIONS · AUDIT REPOSITORY
        </span>
        <h1>Case Files</h1>
        <p>
          Inspect full court records of past utterances, witness transcripts, acoustic conditions, and risk evaluations.
        </p>
      </div>

      {/* Filter Bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          alignItems: 'center',
          backgroundColor: 'var(--navy-850)',
          padding: '12px 16px',
          border: '1px solid var(--navy-300)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: '240px' }}>
          <Search size={16} color="var(--text-3)" />
          <input
            type="text"
            placeholder="Search by Case ID, spoken phrase, or entity..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: 'var(--text-1)',
              fontFamily: 'var(--font-sans)',
              fontSize: '14px',
              width: '100%',
              outline: 'none',
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span className="label" style={{ color: 'var(--text-3)' }}>
            CONDITION:
          </span>
          <select
            value={filterCondition}
            onChange={(e) => setFilterCondition(e.target.value)}
            style={{
              backgroundColor: 'var(--navy-800)',
              color: 'var(--text-1)',
              border: '1px solid var(--navy-300)',
              padding: '6px 10px',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
            }}
          >
            <option value="ALL">ALL CONDITIONS</option>
            <option value="CLEAN">CLEAN</option>
            <option value="PHONE_8K">PHONE_8K</option>
            <option value="TRAFFIC_5">TRAFFIC_5</option>
            <option value="BABBLE_10">BABBLE_10</option>
            <option value="SPEAKER_REVERB">SPEAKER_REVERB</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span className="label" style={{ color: 'var(--text-3)' }}>
            DECISION:
          </span>
          <select
            value={filterDecision}
            onChange={(e) => setFilterDecision(e.target.value)}
            style={{
              backgroundColor: 'var(--navy-800)',
              color: 'var(--text-1)',
              border: '1px solid var(--navy-300)',
              padding: '6px 10px',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
            }}
          >
            <option value="ALL">ALL DECISIONS</option>
            <option value="ACCEPT">ACCEPT</option>
            <option value="CONFIRM">CONFIRM</option>
            <option value="ESCALATE">ESCALATE</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div
        style={{
          backgroundColor: 'var(--navy-850)',
          border: '1px solid var(--navy-300)',
          overflowX: 'auto',
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--navy-800)', borderBottom: '1px solid var(--navy-300)' }}>
              <th className="label" style={{ padding: '12px 16px' }}>CASE ID</th>
              <th className="label" style={{ padding: '12px 16px' }}>SPOKEN UTTERANCE</th>
              <th className="label" style={{ padding: '12px 16px' }}>GROUND TRUTH</th>
              <th className="label" style={{ padding: '12px 16px' }}>CONDITION</th>
              <th className="label" style={{ padding: '12px 16px' }}>W1 (PRISMA 3)</th>
              <th className="label" style={{ padding: '12px 16px' }}>W4 (PRISMA 2.5)</th>
              <th className="label" style={{ padding: '12px 16px' }}>RISK</th>
              <th className="label" style={{ padding: '12px 16px' }}>DECISION</th>
            </tr>
          </thead>
          <tbody>
            {filteredCases.map((c) => {
              const isDisputed = c.w1 !== c.w4;
              return (
                <tr
                  key={c.id}
                  onClick={() => setSelectedCase(c)}
                  style={{
                    borderBottom: '1px solid var(--navy-300)',
                    cursor: 'pointer',
                    transition: 'background-color 110ms var(--ease)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--navy-800)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <td style={{ padding: '14px 16px', fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--navy-400)' }}>
                    {c.id}
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: '14px', color: 'var(--text-1)', maxWidth: '280px' }}>
                    "{c.utterance}"
                  </td>
                  <td style={{ padding: '14px 16px', fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: 600, color: 'var(--text-1)' }}>
                    {c.groundTruth}
                  </td>
                  <td style={{ padding: '14px 16px', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-3)' }}>
                    {c.condition}
                  </td>
                  <td style={{ padding: '14px 16px', fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--text-1)' }}>
                    {c.w1}
                  </td>
                  <td
                    style={{
                      padding: '14px 16px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '13px',
                      color: isDisputed ? 'var(--confirm)' : 'var(--text-1)',
                      fontWeight: isDisputed ? 600 : 400,
                    }}
                  >
                    {c.w4}
                  </td>
                  <td style={{ padding: '14px 16px', fontFamily: 'var(--font-mono)', fontSize: '13px', color: c.risk > 0.5 ? 'var(--confirm)' : 'var(--accept)' }}>
                    {(c.risk * 100).toFixed(0)}%
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <Tag verdict={c.decision} size="sm" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Case Detail Modal / Drawer */}
      {selectedCase && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(7, 15, 31, 0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '20px',
          }}
          onClick={() => setSelectedCase(null)}
        >
          <div
            style={{
              backgroundColor: 'var(--navy-850)',
              border: '1px solid var(--navy-300)',
              width: '100%',
              maxWidth: '800px',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--navy-300)', paddingBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span className="label" style={{ color: 'var(--navy-500)', fontSize: '14px' }}>
                  {selectedCase.id}
                </span>
                <Tag verdict={selectedCase.decision} />
              </div>
              <button
                type="button"
                onClick={() => setSelectedCase(null)}
                style={{ background: 'none', border: 'none', color: 'var(--text-2)', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <div>
              <span className="label" style={{ color: 'var(--text-3)' }}>SPOKEN GROUND TRUTH:</span>
              <h2 style={{ fontSize: '20px', marginTop: '4px' }}>"{selectedCase.utterance}"</h2>
              <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--navy-400)', marginTop: '4px' }}>
                EXPECTED ENTITY: {selectedCase.groundTruth} ({selectedCase.entityType})
              </div>
            </div>

            <WaveformPlayer hasDegradedVersion={selectedCase.condition !== 'CLEAN'} />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
              <WitnessCard
                witness={{
                  id: 'W1',
                  name: 'PRISMA 3.0 · ITN',
                  model: 'prisma-v3.0',
                  transcript: selectedCase.utterance,
                  parsedValue: selectedCase.w1,
                  agreementStatus: selectedCase.w1 === selectedCase.groundTruth ? 'consensus' : 'disputed',
                }}
                index={0}
              />
              <WitnessCard
                witness={{
                  id: 'W4',
                  name: 'PRISMA 2.5 · DECORRELATED',
                  model: 'prisma-v2.5',
                  transcript: selectedCase.utterance,
                  parsedValue: selectedCase.w4,
                  agreementStatus: selectedCase.w4 === selectedCase.groundTruth ? 'consensus' : 'disputed',
                }}
                index={1}
              />
            </div>

            <RiskMeter riskScore={selectedCase.risk} />

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button size="compact" variant="secondary" onClick={() => setSelectedCase(null)}>
                CLOSE CASE FILE
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
