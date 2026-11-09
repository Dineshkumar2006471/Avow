<div align="center">

<img src="web/app/public/avow-logo-dark.png" alt="AVOW Logo" width="340" />

### Evidentiary Runtime Trust Layer & Benchmark for Indian Language Voice Agents

*Built for the Great Indian AI Internship Challenge · Powered by Gnani Prisma STT & Timbre TTS*

[![CI Pipeline](https://github.com/Dineshkumar2006471/Avow/actions/workflows/ci.yml/badge.svg)](https://github.com/Dineshkumar2006471/Avow/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-0F52BA.svg)](LICENSE)
[![Python 3.12](https://img.shields.io/badge/Python-3.12%2B-0F52BA.svg?logo=python&logoColor=white)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-059669.svg?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![React 18](https://img.shields.io/badge/React-18-0F52BA.svg?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-6.0-D97706.svg?logo=vite&logoColor=white)](https://vitejs.dev)
[![DPDP Act](https://img.shields.io/badge/Compliance-DPDP%20Act%202023-059669.svg)](#security-privacy--dpdp-compliance)
[![Error Reduction](https://img.shields.io/badge/Silent%20Error%20Reduction-80.3%25-059669.svg)](#empirical-benchmark-results)

**[Explore Live Demo](https://avow-steel.vercel.app)** · **[The Gauntlet](https://avow-steel.vercel.app/console/gauntlet)** · **[1-Page Solution Pitch](SOLUTION_PITCH.md)** · **[Benchmark Report](https://avow-steel.vercel.app/console/benchmark)** · **[API Playground](https://avow-steel.vercel.app/console/api)**

</div>

---

## 📑 Table of Contents

- [The Billion-Dollar Problem](#-the-billion-dollar-problem)
- [What is AVOW?](#-what-is-avow)
- [System Architecture](#-system-architecture)
- [Empirical Benchmark Results](#-empirical-benchmark-results)
- [Core Innovation & Technology Stack](#-core-innovation--technology-stack)
- [Repository Structure](#-repository-structure)
- [Quickstart: Run Locally](#-quickstart-run-locally)
- [Testing & Validation](#-testing--validation)
- [Security, Privacy & DPDP Compliance](#-security-privacy--dpdp-compliance)
- [Deployment Guide](#-deployment-guide)
- [Author & Acknowledgments](#-author--acknowledgments)

---

## 🚨 The Billion-Dollar Problem

Indian banks, fintechs, and NBFCs are rapidly deploying autonomous voice AI agents for payment collections, EMI reminders, and customer service. However, in real-world Indian telephony, **single-engine voice bots suffer from catastrophic acoustic misrecognitions**:

1. **8 kHz Telephony Narrowband:** Telecom networks compress audio to 8,000 samples/sec, stripping all frequencies above 3,400 Hz. In Hindi and regional languages, acoustic differences between critical numbers live in these high frequencies.
2. **The Confusable Pair Trap:** A customer says *"मैडम, मैं पंद्रह हज़ार (15,000) रुपये जमा कर दूंगा"*, but over narrowband telephone lines with street traffic noise, *"pandrah"* (15) and *"pachaas"* (50) produce almost identical acoustic waveforms. The bot mishears **₹50,000** and commits an accidental **₹35,000 overcharge** to the banking ledger.
3. **The LLM Blindspot:** Traditional LLM voice wrappers cannot fix this. An LLM receives the text `"50,000"` from the speech engine—it has zero access to the underlying acoustic waveform and blindly commits the hallucinated amount.

> Single-ASR voice bots over 8 kHz Indian telephony lines have a **14.2% uncorrected silent misheard rate**.

---

## 🛡️ What is AVOW?

**AVOW** (*to declare openly and solemnly under oath*) is an **evidentiary runtime trust layer** that sits between incoming telephone audio and downstream banking ledgers. It gives voice bots the **power to doubt** before committing financial transactions.

```
Caller Voice (8 kHz Phone Audio)
            │
            ▼
┌─────────────────────────────────────────────────────────────────┐
│ 1. MULTI-WITNESS JURY (Gnani Prisma STT)                        │
│    • Witness 1 (Prisma 3.0 ITN):       "₹15,000"                │
│    • Witness 2 (Transliterated Latin): "pandrah hazaar"         │
│    • Witness 4 (Prisma 2.5 Noise):     "50000" (TRAP!)          │
└────────────────────────────────┬────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│ 2. DETERMINISTIC INDIC NUMERAL PARSER (<2ms)                    │
│    Normalizes lakh, crore, dedh, dhai, sava, Devanagari digits  │
│    "pandrah hazaar" ➔ 15000 | "50000" ➔ 50000                   │
└────────────────────────────────┬────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│ 3. CALIBRATED RISK MODEL & CONFUSABLE SHIELD                    │
│    Flags Confusable Pair: [15,000 vs 50,000 detected]           │
│    Risk Score: 62.0% ➔ Verdict: CONFIRM (READ-BACK REQUIRED)    │
└────────────────────────────────┬────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│ 4. CLOSED-LOOP TIMBRE TTS READ-BACK                             │
│    Bot: "मैंने पंद्रह हज़ार रुपये सुना। क्या यह सही है?"        │
│    Caller: "हाँ, सही है!" (Affirmed)                            │
│    Action: Commit ₹15,000 to Immutable SHA-256 Court Record     │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🏗️ System Architecture

```mermaid
flowchart TD
    subgraph INGRESS["1. Telephony Ingress"]
        Audio[Caller 8 kHz Audio] --> Decompress[WAV / WebM Stream]
        Decompress --> RAM[Ephemeral RAM Buffer]
    end

    subgraph JURY["2. Multi-Witness Jury Panel"]
        RAM --> W1["Witness 1: Prisma v3.0 (Native ITN)"]
        RAM --> W2["Witness 2: Prisma v3.0 (Transliterate Latin)"]
        RAM --> W4["Witness 4: Prisma v2.5 (Acoustic Decorrelated)"]
        RAM --> W5["Witness 5: Prisma v3.0 (Domain Primed)"]
    end

    subgraph ENGINE["3. Evidentiary Adjudication Engine"]
        W1 & W2 & W4 & W5 --> ITN["Indic Numeral Parser (Deterministic <2ms)"]
        ITN --> PairShield["Confusable Pair Matrix (Pandrah/Pachaas)"]
        PairShield --> Risk["Calibrated Logistic Risk Model"]
    end

    subgraph DECISION["4. Runtime Verdict"]
        Risk -->|<15% Risk| Accept["ACCEPT (Silent Commit)"]
        Risk -->|15% - 85% Risk| Confirm["CONFIRM (Timbre Closed-Loop)"]
        Risk -->|>85% Risk| Escalate["ESCALATE (Human Supervisor)"]
    end

    subgraph CONFIRM_LOOP["5. Closed-Loop Read-Back"]
        Confirm --> Timbre["Gnani Timbre TTS (hi-IN / regional)"]
        Timbre --> CallerAffirm["Caller Verification: 'हाँ, सही है'"]
        CallerAffirm --> Accept
    end

    subgraph AUDIT["6. Compliance & Persistence"]
        Accept --> Hash["SHA-256 Cryptographic Block Hash"]
        Hash --> SQLite[(Local SQLite Court Record)]
        RAM -.->|DPDP Compliant| Discard["Audio Discarded Immediately"]
    end
```

---

## 📊 Empirical Benchmark Results

Evaluated across a **held-out 192 telephony utterance suite** tested on unseen speaker voices and procedural acoustic degradation (narrowband 8 kHz $\mu$-law bandpass, Indian street traffic at 5 dB SNR, office babble at 10 dB SNR):

| Performance Metric | Single-ASR Baseline (B0) | AVOW Runtime Trust Layer | Impact / Improvement |
| :--- | :---: | :---: | :---: |
| **Silent Error Rate (Uncorrected)** | `14.2%` | **`2.8%`** | **`-80.3% Error Reduction`** |
| **Catch Rate (Wrong Flagged)** | `0.0%` | **`80.3%`** | **`95% CI [74.1% – 86.5%]`** |
| **Customer Friction Envelope** | `0.0%` | **`18.5%`** | *Only interrupts caller when ambiguous* |
| **Average STT Calls / Utterance** | `1.0` | **`2.6`** | **`~40% Credit Savings (Adaptive Cascade)`** |
| **p95 End-to-End Latency** | `0.85s` | **`1.82s`** | *Synchronous real-time conversational budget* |
| **Hallucination Rate** | High (LLM dependent) | **`0.0%`** | *Pure deterministic mathematical parsing* |

---

## ⚙️ Core Innovation & Technology Stack

| Component | Technology | Rationale & Purpose |
| :--- | :--- | :--- |
| **Speech-to-Text (Hearing)** | **Gnani Prisma STT v3.0 & v2.5** | Multi-engine diverse decoding parameters across native Indic scripts and transliterated Latin phonetics. |
| **Text-to-Speech (Speaking)** | **Gnani Timbre TTS v3.0** | Synthesizes closed-loop verification prompts in native regional accents. |
| **Credit Gate** | **Python `asyncio.Semaphore(1)`** | Single-flight concurrency limiter preventing API exhaustion and 402 errors. |
| **Indic Numeral Parser** | **Pure Python (`numbers.py`)** | Deterministic tokenizer for lakhs, crores, fractions (*dedh*, *dhai*, *sava*, *sadhe*, *paune*), and digit repeats (*double nine*). Runs in **<2ms** with zero LLM cost. |
| **Acoustic Stress Engine** | **FFmpeg + Scipy** | Procedural 8 kHz telephone bandpass filtering and acoustic noise mixing for live stress tests. |
| **Audit Trail** | **SQLite + SHA-256 Hash Chain** | Immutable cryptographic record of all transcripts, entity diffs, and verdicts for bank auditability. |
| **Web Console** | **React 18 + Vite + TypeScript** | Warm editorial design system (`#FAF9F5` warm ivory, `#0A0A0A` black, `#0F52BA` sapphire) crafted for clarity. |

---

## 📁 Repository Structure

```
AVOW/
├── api/                            # Backend REST Service (FastAPI)
│   ├── pyproject.toml              # Python package metadata & dependencies
│   ├── tests/
│   │   └── unit/
│   │       └── test_numbers.py     # 20/20 unit tests for Indic numeral parser
│   └── verdict/
│       ├── main.py                 # FastAPI endpoints (/v1/verdict, /v1/resolve, /v1/records)
│       ├── config.py               # Pydantic settings & environment configuration
│       ├── ids.py                  # Case ID and deterministic UUID generators
│       ├── entities/
│       │   ├── numbers.py          # Deterministic Indic ITN parser (Lakhs, Crores, fractions)
│       │   ├── confusables.py      # Phonetic ambiguity matrix (pandrah/pachaas, saat/saath)
│       │   └── lexicon_hi.py       # Hindi numeral token lexicon & multipliers
│       ├── gnani/
│       │   ├── gate.py             # Single-flight concurrency & credit protection semaphore
│       │   ├── stt.py              # Gnani Prisma STT client (v3.0, v2.5, Latin)
│       │   └── tts.py              # Gnani Timbre TTS client (closed-loop synthesis)
│       ├── panel/
│       │   └── orchestrator.py     # Multi-witness jury parallel execution harness
│       └── store/
│           └── sqlite.py           # Tamper-evident SHA-256 hash chain & SQLite persistence
│
├── web/app/                        # Frontend Web Console (React + Vite + TypeScript)
│   ├── package.json                # Frontend dependencies
│   ├── vite.config.ts              # Vite bundler configuration
│   ├── public/
│   │   ├── avow-logo-dark.png      # Official AVOW mark (high-contrast dark grotesque)
│   │   ├── audio/                  # Pre-recorded neural audio samples & 8 kHz telephony clips
│   │   │   ├── pandrah_clean.mp3   # Studio 16 kHz reference
│   │   │   ├── pandrah_degraded.mp3# Narrowband 8 kHz telephony noise clip
│   │   │   ├── dhai_lakh.mp3       # Fractional Indian multiplier utterance
│   │   │   ├── double_nine.mp3     # Indian English repeat digit string
│   │   │   ├── saat_saath.mp3      # Sibilant confusable utterance
│   │   │   ├── readback_hi.mp3     # Timbre TTS closed-loop readback prompt
│   │   │   └── caller_affirm.mp3   # Caller affirmation audio clip
│   │   └── illustrations/          # Hand-crafted vector storytelling art
│   │       ├── hero-medallion.svg  # Circular trust & soundwave medallion
│   │       └── problem-confusion.svg# Telephony confusion editorial illustration
│   └── src/
│       ├── components/             # Reusable UI components
│       │   ├── Header.tsx          # Enterprise top navigation & credits meter
│       │   ├── Sidebar.tsx         # Deal Forge style solid pill navigation
│       │   ├── WaveformPlayer.tsx  # Dual-mode audio replay (Clean vs Degraded)
│       │   ├── WitnessCard.tsx     # Independent receptor testimony cards
│       │   ├── EntityDiff.tsx      # Cross-examination matrix & consensus resolution
│       │   ├── RiskMeter.tsx       # Calibrated risk probability gauge
│       │   └── ReadbackBubble.tsx  # Closed-loop Timbre confirmation box
│       ├── routes/                 # Application views
│       │   ├── LandingPage.tsx     # Editorial conversion landing page
│       │   ├── GauntletPage.tsx    # Interactive jury testbench with real audio
│       │   ├── OverviewPage.tsx    # Executive KPI benchmark tiles & calibration curve
│       │   ├── CaseFilesPage.tsx   # Filterable court records audit repository
│       │   ├── BenchmarkPage.tsx   # Condition × Language matrix & ablation study
│       │   ├── PolicyPage.tsx      # Risk appetite dial & business rule guardrails
│       │   ├── CourtRecordPage.tsx # Cryptographic hash-chain integrity verification
│       │   └── ApiPlaygroundPage.tsx# Runnable cURL & Python SDK snippets
│       └── styles/
│           ├── tokens.css          # Design tokens (Warm ivory, Charcoal black, Sapphire, Amber)
│           └── global.css          # Global typography & layout rules
│
├── scripts/
│   └── generate_audio.py           # Neural Indian speech synthesis & FFmpeg audio generator
├── .github/
│   └── workflows/
│       └── ci.yml                  # GitHub Actions CI/CD pipeline (Backend + Frontend)
├── Dockerfile                      # Production Docker container definition
├── render.yaml                     # One-click Render deployment blueprint
├── vercel.json                     # Vercel SPA deployment configuration
├── EXPLAIN.md                      # Plain-English founder dossier & testing manual
└── README.md                       # Comprehensive open-source documentation
```

---

## 🚀 Quickstart: Run Locally

### Prerequisites
- **Python 3.12+**
- **Node.js 20+** and **npm**
- **FFmpeg** (installed and added to `PATH`)

### 1. Clone the Repository
```bash
git clone https://github.com/Dineshkumar2006471/Avow.git
cd Avow
```

### 2. Configure Backend Environment
Create a `.env` file inside the project root:
```ini
GNANI_API_KEY=your_gnani_api_key_here
ENVIRONMENT=development
DATA_DIR=data
```

### 3. Run the FastAPI Backend
```bash
cd api
python -m pip install -e .
python -m uvicorn verdict.main:app --host 0.0.0.0 --port 8000 --reload
```
*Backend runs live at `http://localhost:8000` (Healthcheck: `http://localhost:8000/healthz`).*

### 4. Run the React Frontend
In a new terminal:
```bash
cd web/app
npm install
npm run dev -- --host 0.0.0.0 --port 5173
```
*Frontend runs live at `http://localhost:5173`.*

---

## 🧪 Testing & Validation

### Run Unit Tests (Deterministic Indic Parser)
```bash
cd api
python -m pytest tests/unit/test_numbers.py -v
```
```
tests/unit/test_numbers.py::test_basic_hindi_numbers PASSED               [  5%]
tests/unit/test_numbers.py::test_lakh_crore_multipliers PASSED            [ 10%]
tests/unit/test_numbers.py::test_fractional_dhai_dedh PASSED              [ 15%]
tests/unit/test_numbers.py::test_confusable_pairs_detected PASSED         [ 20%]
...
============================= 20 passed in 0.18s ==============================
```

### Inspect Local SQLite Court Records
```bash
curl -X GET http://localhost:8000/v1/records
```
Returns genesis root block and cryptographic hash-chain linked verdicts.

---

## 🔒 Security, Privacy & DPDP Compliance

AVOW is architected from the ground up for strict compliance with India's **Digital Personal Data Protection (DPDP) Act 2023**:

1. **Zero Caller Audio Retention:** Incoming customer audio is streamed into ephemeral RAM for transcription and **immediately discarded**. No raw audio is ever persisted to local disks or cloud object storage.
2. **Deterministic Mathematical Parsing:** Entity extraction uses rule-based parsers without transmitting transcripts to third-party generative LLMs.
3. **Cryptographic Non-Repudiation:** Every verdict, witness transcript, and caller confirmation is hashed into an immutable **SHA-256 hash chain** stored in the local SQLite court record.

---

## 🌐 Deployment Guide

### Deploy Frontend (Vercel)
The root `vercel.json` automatically configures Vite builds:
```bash
vercel --prod
```

### Deploy Backend (Render / Railway)
The repository includes a production `Dockerfile` with embedded FFmpeg:
```bash
docker build -t avow-api .
docker run -p 8000:8000 -e GNANI_API_KEY=your_key avow-api
```
Or push to GitHub and link to [Render](https://render.com) using `render.yaml`.

---

## 👤 Author & Acknowledgments

* **Dinesh Kumar Bingi** — Forward-Deployed AI Engineer & Architect
* Built for the **Great Indian AI Internship Challenge**
* Powered by **Gnani.ai Prisma STT** & **Timbre TTS**

---

<div align="center">
<sub>Built with precision for mission-critical Indian language voice AI. © 2026 AVOW.</sub>
</div>

