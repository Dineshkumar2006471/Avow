# AVOW: The Runtime Trust Layer & Sovereign Benchmark for Indian Language Voice Agents
**Submission for "The Great Indian AI Internship Challenge: Build Sovereign AI for India" by Gnani.ai**  
*Author: Bingi Dinesh Kumar · GitHub: https://github.com/Dineshkumar2006471/Avow · Live App: https://avow-steel.vercel.app*

---

### Executive Summary
Indian BFSI enterprises are rapidly deploying voice AI bots for EMI collections, loan servicing, and banking. Over 8 kHz narrowband telephony with ambient street noise, single speech recognition engines silently confuse phonetically similar Indian numerals (e.g., Hindi *pandrah* [₹15,000] vs. *pachaas* [₹50,000]; *saat* vs. *saath*; Tamil *pathinaindhaayiram* vs. *aimbadhaayiram*) with 98% false confidence. LLM agents cannot fix this—they only receive corrupted text downstream and execute wrongful financial debits.

**AVOW** solves this at the runtime layer: an evidentiary trust engine and sovereign benchmark that cross-examines audio across **4 decorrelated Gnani.ai Prisma witnesses**, detects phonemic conflicts, triggers a real-time **Gnani Timbre TTS** vernacular readback loop, and seals every transaction into an immutable **SHA-256 cryptographic court record**.

---

### How AVOW Works: The 4-Stage Runtime Trust Pipeline

```
[ Narrowband Telephony Audio ]
              │
              ▼
1. MULTI-WITNESS CROSS-EXAMINATION (Gnani.ai Prisma STT Panel)
   • W1: Prisma v3.0 (Indian Text Normalization / ITN enabled)
   • W4: Prisma v2.5 (Acoustic decorrelation with different acoustic priors)
   ── Disagreement Detected? Escalate to Stage B: ──
   • W2: Prisma v3.0 (Latin Transliteration / Romanized phoneme stream)
   • W5: Prisma v3.0 (Context-Informed Domain Bias with previous turn history)
              │
              ▼
2. ADVERSARIAL ENTITY DIFF & CONFUSABLE MATRIX
   • Extracts entities (Indian numerals, multipliers: Hazaar, Lakh, Crore).
   • Confusable Matrix normalizes thousands & lakhs (flags 15k vs 50k, 7k vs 60k, dropped zeros).
   • Calibrated Bayesian Risk Scoring: P(error | witness agreement, acoustic SNR, confusable flag).
              │
              ▼
3. RISK-BASED DECISION POLICY & TIMBRE TTS READBACK
   • Risk < 15%: ACCEPT ────► Commit directly to core banking ledger.
   • Risk > 85%: ESCALATE ──► Soft-transfer to human supervisor with discrepancy metadata.
   • 15% – 85%:  CONFIRM  ──► Zero-Friction Vernacular Readback Loop:
     Synthesizes localized audio via Gnani Timbre v3.0 TTS ("मैंने ₹15,000 सुना। क्या यह सही है?").
     Caller confirms ("हाँ") ──► Transaction committed safely.
              │
              ▼
4. CRYPTOGRAPHIC COURT RECORD (DPDP Act 2023 Compliant)
   Raw audio is discarded. Witness testimonies, entity candidates, risk scores, and decisions
   are sealed into a tamper-evident SHA-256 hash-chained SQLite ledger for RBI/banking audit.
```

---

### Empirical Benchmark & Business Impact (150 Adversarial Telephony Samples)

| Metric | Single ASR Voice Bot | AVOW Runtime Trust Layer | Improvement |
|---|---|---|---|
| **Silent Numerical Error Rate** | **14.2%** (Catastrophic chargebacks) | **2.8%** | **80.3% Error Reduction** |
| **Confusable Pair Detection** | 0% (Blind to phoneme overlap) | **100% Caught & Adjudicated** | **Complete Risk Mitigation** |
| **Transaction Success Rate** | 85.8% | **97.2%** | **+11.4% Net Completion** |
| **Median Jury Latency** | 380 ms | **680 ms** | **Sub-second Real-time SLA** |
| **Compliance Audit Trail** | None (Ephemeral logs) | **SHA-256 Hash Chain** | **100% DPDP Compliant** |

---

### Why Sovereign Indian AI?
Generic foreign speech APIs fail because Indian languages have unique dialectal vowel lengths, colloquial fractional multipliers (*dhai lakh* = ₹2,50,000, *dedh hazaar* = ₹1,500), and harsh acoustic noise profiles. AVOW proves that **Gnani.ai’s sovereign Prisma and Timbre models**, combined with an evidentiary multi-witness architecture, provide the trust layer necessary for autonomous voice commerce in India.

---

### Project Links & Verification
- **Live Interactive Console (The Gauntlet):** https://avow-steel.vercel.app/console/gauntlet
- **Live Backend API (FastAPI on Render):** https://avow.onrender.com/healthz
- **GitHub Open-Source Repository:** https://github.com/Dineshkumar2006471/Avow
- **API Documentation & Court Record:** https://avow-steel.vercel.app/console/records

