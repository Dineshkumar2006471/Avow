# PRD.md — AVOW

**Every number, avowed.** (AVOW cross-examines every number your voice AI hears.)

| | |
| --- | --- |
| Product | AVOW: a runtime trust layer and benchmark for Indian-language voice agents, built on Gnani Prisma (STT) and Timbre (TTS) |
| Owner | Max (Bingi Dinesh Kumar) |
| Name | **AVOW** (to declare openly and stand behind). Internal code names such as `verdict_id`, `/v1/verdict`, `X-Verdict-Key` and the `verdict/` Python package stay as they are: *verdict* is the name of the decision, AVOW is the product. |
| Contest | Great Indian AI Internship Challenge (Gnani AI) |
| **Hard deadline** | **Tue 10 Nov 2026, 11:59 PM IST. No extensions.** Treat **10 Nov 12:00 noon** as the real deadline. |
| Doc date | Sun 8 Nov 2026 |
| Companion | `DESIGN.md` (locked design system). Read both before writing code. |

Legend used throughout: **[V]** verified from a live source during research. **[A]** assumption; verify on Day 0 (section 18). **[T]** a target/hypothesis to be *measured*, never claimed before it is.

---

## 0. How the coding agent must work (read first)

1. Build in **vertical slices**, each ending green (tests pass, app runs). Commit after each slice with a clear message.
2. **Never fabricate numbers.** Every metric shown in UI, README or posts must come from `data/benchmark.latest.json`, produced by `python -m bench.run`. If the file is missing, the landing build fails.
3. **Never commit secrets.** Keys live in `.env` (local) and Secret Manager (cloud). `.env.example` has placeholders only.
4. **No live Gnani calls in unit tests.** Use recorded fixtures in `api/tests/fixtures/`. One opt-in live smoke test behind `RUN_LIVE=1`.
5. Verify every Gnani API detail against the docs links in section 5 before relying on it. If the docs disagree with this PRD, the docs win; note it in `docs/DECISIONS.md`.
6. Prefer the simpler option when ambiguous. Cut P2 before touching P0 (section 4).
7. After UI work: run Hallmark lint and the accessibility checks in `DESIGN.md` section 12.
8. Synthetic data only. No real phone, account, Aadhaar or PAN numbers anywhere in code, fixtures, screenshots or demo.
9. Keep a running `docs/DECISIONS.md` (date, decision, reason). Keep a `CHANGELOG.md`.

---

## 1. Context and constraints

### 1.1 What the contest actually rewards

Verified facts:

- **Closes 10 Nov 2026, 11:59 PM IST**; interviews after close for shortlisted participants; internships start 1 Jan 2027. **[V: your email; successcds guide]**
- Registrants get **5,000 programme credits** and **3 free API keys**. Credits go to the primary registrant if a team of two. **[V: email]**
- Every entry must use Gnani models/APIs and **name each one**. **[V]**
- Selection steps: public demo on LinkedIn or X → **Gnani verifies engagement on nominated posts** → Gnani reviews and shortlists → individual interviews → written offers. Posts must carry **#GnaniAI** and **#GreatIndianAIInternshipChallenge**. **[V: email]**
- Rules that cause disqualification: **synthetic data only** (voice counts as personal data under India's DPDP Act; you may record yourself or a consenting teammate), **no bought engagement** (bots, paid promotion, like-for-like groups), **no faked demos**. Organisers say they prefer an honest limitation to a faked result. **[V: successcds summary of the official page; re-read the official terms yourself]**
- Ten awards of ₹50,000 each, judged separately from the internship shortlist, one award per person: *Main Character* (regional language), *Mixed Vibes* (code-mixed), *Real Deal* (real-world impact), *Noise Canceller* (noisy telephony), *Two-Person Army*, *Solo Ninja*, *Jugaad Genius* (creative use), *Small Town, Big Build* (Tier 2/3), *Demo Day Drop* (best 60-second demo), *Crowd Favourite* (public engagement). **[V]**
- No scoring rubric is published. **[V]** So: selection is *engagement first, then review, then interview*. This project must win **two audiences**: the public (a shareable 60-second demo) and Gnani engineers (depth and honesty).

### 1.2 Time reality

~52 hours remain. A big platform will not finish. **A narrow, deep, measurable slice will.** Everything below is sized for one person. The plan in section 18 has a cut list.

### 1.3 What Gnani sells (and therefore cares about)

Gnani builds voice AI for enterprises: collections, lead qualification, support, in BFSI, insurance, telecom, healthcare. Its pitch is accuracy on **8 kHz telephony audio, code-switching, regional accents and India-specific vocabulary** (amounts, PAN, Aadhaar, policy numbers). **[V: gnani.ai/speech-to-text-api]** Its own solution list includes **Collections**. A collections call where "fifteen thousand" is heard as "fifty thousand" is a customer-facing and compliance incident. That is the pain this project targets.

---

## 2. Hiring-manager lens (what "top 1%" looks like here)

This is my inference, not Gnani's published rubric.

| Signal | How AVOW shows it |
| --- | --- |
| Understands the customer's real pain | Targets *silent entity errors* in collections/BFSI, not "a nicer chatbot" |
| Goes deep on the vendor's stack | Uses Prisma v3.0 *and* v2.5, `indic-auto`, `format` modes (transcribe / codemix / transliterate), `keyterms`, `topic`, `previous_text`, substitution, Timbre v3.0 voices and audio tags |
| Engineers around real constraints | One-request-at-a-time rate limit, 30 s audio cap, 5,000 credits, no per-word confidence → queue, cache, adaptive escalation, budget guard |
| Measures instead of claiming | Held-out benchmark, baselines, bootstrap confidence intervals, calibration plot, ablations |
| Honest about limits | "Unanimous-wrong" rate and synthetic-noise caveat are shown on the landing page |
| Forward-deployed-engineer instinct | Policy page: the customer sets risk appetite and business rules; the tool shows the cost of each setting |
| Product sense | One user, one job, one metric: **silent error rate at a given confirm rate** |
| Ships | Public repo, live URL, 60-second demo, README with architecture and numbers |
| Gives Gnani something back | A concrete API request: per-word confidence / n-best. AVOW is the black-box workaround. See section 19.4 |

---

## 3. Product

### 3.1 One-liner

Avow sits between audio and an agent's logic and decides, per spoken number, whether to **accept it, read it back, or escalate**, by cross-examining several independent Prisma "witnesses" of the same audio.

### 3.2 The problem

Voice agents in India constantly capture *entities*: amounts, dates, digit strings. Hinglish numbers are notoriously confusable (*pandrah* 15 vs *pachaas* 50, *saath* 60 vs *saat* 7), amounts use lakh/crore, speakers say "dhai lakh" (2.5 lakh), "sava lakh" (1.25 lakh), "double nine triple zero". On noisy 8 kHz lines, one wrong entity can book the wrong payment promise.

Prisma's REST response carries a transcript, detected language, timing and an optional `truncated` flag. **There is no per-word confidence.** **[V: docs.gnani.ai/api/STT/speech-to-text.md]** So downstream logic cannot tell a risky transcript from a safe one. Teams choose between:

- **Trust everything** → silent errors reach the customer.
- **Confirm everything** → long, irritating calls and wasted telephony minutes.

### 3.3 The solution

For each utterance AVOW runs an **adaptive panel of witnesses** (different Prisma configurations whose errors are partly independent), normalises each witness's entities into canonical values, measures **agreement**, adds **acoustic and business-rule evidence**, converts that into a **calibrated risk**, and returns a **decision**:

| Decision | Meaning | What happens |
| --- | --- | --- |
| `ACCEPT` | Witnesses agree and evidence is clean | Agent proceeds |
| `CONFIRM` | Disagreement or risky evidence | AVOW generates a Timbre read-back in the caller's language ("I heard fifteen thousand rupees. Is that correct?"), listens to the reply, resolves |
| `ESCALATE` | Still unresolved after two attempts, or implausible vs business rules | Hand to a human, with the evidence |

The customer chooses **risk appetite**; the benchmark shows exactly what each setting costs in extra confirmations.

### 3.4 Not a chatbot

There is no LLM conversation. AVOW is an **API + SDK-style middleware + console + benchmark**. The demo "agent" is a deterministic state machine. No LLM is required anywhere in P0.

### 3.5 Users and jobs

| User | Job |
| --- | --- |
| Voice-agent engineer / FDE at an enterprise | "Stop mishearing amounts without making every call longer" |
| QA / compliance lead | "Show me an audit trail of what was heard, what was doubted, what was confirmed" |
| Gnani evaluator / public visitor | "Let me break it and see why it's useful" (the Gauntlet) |

### 3.6 Differentiation, stated honestly

Voice-agent *testing* platforms already exist globally (simulated callers, noise presets, accent profiles, go-live verdicts), for example NovaSynth, TestMu AI, LangWatch and vendor tooling. **AVOW does not claim to be the first voice-agent tester, and nobody can honestly promise that nothing similar exists anywhere.** The defensible wedge, to the best of my research:

1. **Runtime, not just pre-production:** it protects live calls per utterance.
2. **Confidence from disagreement:** turns a black-box ASR with no confidence output into a calibrated risk using multi-configuration agreement + acoustic + business-rule evidence.
3. **Indic entity grammar:** lakh/crore, *dedh/dhai/sava/sadhe/paune*, *double/triple*, native numerals, Hinglish romanisation via Prisma's `transliterate` format.
4. **Closed loop in the caller's language** using Timbre (read-back + resolution), with adaptive cost control under a one-request-at-a-time limit.
5. **Measured trade-off curve**, not a vibe: silent error rate vs confirm rate on a held-out benchmark.

In public copy, use "to my knowledge" or avoid superlatives. Never write "first in the world".

---

## 4. Scope

### P0: must ship (the contest entry)

1. **Panel engine**: Stage A/B adaptive witnesses (section 7.1) with queue, cache, retries.
2. **Entity layer** for **AMOUNT**, **DIGIT_STRING** (loan/ref no., OTP, PIN), **DATE** in Hindi, Hinglish, English; digits/ITN-based support for Tamil, Telugu, Marathi, Bengali, Kannada, Gujarati.
3. **Agreement + risk + decision** (rules v0, then fitted logistic model v1).
4. **Read-back + resolution loop** with Timbre (hi, en at minimum).
5. **Gauntlet engine**: audio degradation conditions + synthetic caller generation (Timbre v3.0).
6. **Benchmark CLI** (`lite` suite), baselines, held-out evaluation, bootstrap CIs, ablation → `benchmark.latest.json`.
7. **Public Gauntlet page** (mobile-first), **Landing**, **Console**: Overview, Case Files, Benchmark, Policy.
8. **Hash-chained Court Record** + verify endpoint.
9. Security/privacy baseline (section 12). Deployed on GCP. Public GitHub repo. README.
10. **60-second demo video + LinkedIn/X posts.**

### P1: if time allows

- PHONE and TIME entities; NAME fuzzy match via `transliterate`.
- Tamil/Telugu/Marathi number-word lexicons (for *Main Character*).
- Realtime streaming mode over `wss://api.vachana.ai/stt/v3/stream` for the live demo.
- OG share-card generator. Firebase App Check.
- `full` benchmark suite if credits allow.

### P2: cut first

- Voice cloning callers, Evon explanations, SDK packaging, multi-tenant auth, dark/light toggle, webhooks, Terraform.

### Non-goals

Replacing Prisma; building an agent; handling real customer data; claiming carrier-grade codec fidelity; any claim of "AI-powered".

---

## 5. Gnani API contract (integration facts)

Base URL: `https://api.vachana.ai` **[V]**. Auth header: `X-API-Key-ID: <key>`. Optional `X-API-Request-ID` is echoed as `request_id`. **[V]**

Docs the agent must read before coding (all verified to exist):

- Quick start: `https://docs.gnani.ai/api/introduction/quick-start.md`
- STT REST: `https://docs.gnani.ai/api/STT/speech-to-text.md`
- STT Realtime: `https://docs.gnani.ai/api/STT/stt-websocket.md`
- Prisma v3.0 model page: `https://docs.gnani.ai/api/STT/models/prisma-v3.md`
- TTS REST / SSE / Realtime: `https://docs.gnani.ai/api/TTS/tts-inference.md`, `tts-sse.md`, `tts-websocket.md`
- Voices: `https://docs.gnani.ai/api/TTS/available-voices.md`
- Errors: `https://docs.gnani.ai/api/introduction/errors.md`

### 5.1 STT REST `POST /stt/v3` (multipart) **[V]**

| Item | Detail |
| --- | --- |
| `audio_file` | WAV, MP3, OGG, FLAC, AAC, M4A. **≤ 30 s.** Server converts to 16 kHz mono. Browser `webm` is **not** listed → always transcode with ffmpeg first. |
| `model` | omit → **Prisma v2.5** (response reports `gnani-prisma-v2.5`). `prisma-v3.0` → Prisma v3.0 |
| `language_code` | **Required.** v2.5: one code. v3.0: one code, `indic-auto`, or a list of 1–4 (`hi-IN,en-IN`). Optional only with `format=transliterate` on v3.0. Codes: `bn-IN en-IN gu-IN hi-IN kn-IN ml-IN mr-IN pa-IN ta-IN te-IN` |
| `format` | `verbatim`; `transcribe` (ITN: digits, ₹, dates; Indian grouping); `codemix` (v3.0: English words stay Latin); `transliterate` (v3.0: whole transcript in Latin letters, numbers spelled out as words; no `detected_language_code`) |
| v3.0 context | `keyterms` (≤ 200, JSON array or CSV), `topic` (≤ 1,600 chars), `previous_text` (last 600 chars kept), `speaker_names` (1–4). Violations → `400 INVALID_CONTEXT`. **Docs warn context can lower accuracy: test with and without.** |
| v2.5 extras | `bias_list` (≤ 100 single-word letters-only entries) + `bias_score` ∈ {0, .5, 1, 1.5, 2}; `itn_native_numerals` |
| Both | `enable_substitution` + `substitution_map` (≤ 10 rules) |
| Response | `success, request_id, transcript, model, detected_language_code (v3.0), processing_time, end_to_end_latency, truncated (only when true)`; v2.5 adds `output.literal`. **No confidence field.** Empty transcript is not an error. |

Errors **[V]**: envelope `{"success":false,"error":{"type","message"}}` for validation (`INVALID_LANGUAGE_CODE`, `MODEL_UNSUPPORTED_LANGUAGE`, `INVALID_FORMAT`, `INVALID_CONTEXT`, `EMPTY_AUDIO`, `UNSUPPORTED_AUDIO_FORMAT`, `AUDIO_CONVERSION_ERROR`, `MAX_AUDIO_DURATION_EXCEEDED`, `TRANSCRIPTION_FAILED`, `INTERNAL_SERVER_ERROR`); `422 {"detail":[...]}` for missing fields; `504 UPSTREAM_TIMEOUT` (5 s transcription bound, v3.0); gateway shape `{"detail":{"error_code","message","status_code"}}` for `401 MISSING_API_KEY/INVALID_API_KEY`, `402` insufficient credit, `403 SCOPE_NOT_ALLOWED`, **`429 RATE_LIMITED` ("Only 1 active request is allowed at a time")**.

> **Critical design constraint:** some accounts allow **one active request at a time**. All Gnani traffic goes through a single-flight gate (section 6.3).

### 5.2 STT Realtime (P1) **[V]**

`wss://api.vachana.ai/stt/v3/stream`. Upgrade headers: `x-api-key-id`, `model` (`prisma-v3.0`; omit for v2.5), `language_code` (code, `indic-auto`, or list), `x-sample-rate`. Send **binary PCM frames only**: 16-bit mono, 8 or 16 kHz, 1,024 bytes per frame; send `{"type":"commit"}` to finish. Receive `{"type":"transcript","text","segment_id","latency"}` and `{"type":"error","message"}`.

### 5.3 TTS **[V]**

- REST `POST /api/v1/tts/inference` (binary audio), SSE `POST /api/v1/tts/sse`, WebSocket `wss://api.vachana.ai/api/v1/tts`. Header `X-API-Key-ID`.
- Body: `text`, `voice`, `model` (`timbre-v3.0` or `timbre-v2.5`; **v2.5 is documented as recommended, v3.0 has 13 voices that all speak all 10 languages and supports audio tags**), `language` (or `auto`), `speed`, `audio_config {sample_rate, num_channels, sample_width, encoding:"linear_pcm", container:"wav"}`.
- **Voices are not interchangeable between models** (mismatch → 400).
- **Timbre v3.0 voices:** female Shivani, Lakshmi, Kalpana, Chetana, Vasudha, Riyaa, Tarika; male Avinash, Shubham, Prakash, Devansh, Yashraj, Harshad. Personas for BFSI: Avinash, Prakash, Harshad (professional, collections); Tarika, Kalpana (banking/insurance care); Shivani (inbound support).
- **Audio tags (v3.0 only):** `<coughs> <excited> <exhales> <giggle> <laugh> <pauses> <shouting> <sigh> <slow> <sniffles> <whispers> <yawns> <clears throat>`. Use `<slow>` / `<pauses>` for digit read-backs; use `<whispers>`, `<shouting>`, `<coughs>` to make **adversarial synthetic callers**.
- **Timbre v2.5 preferred-voice-per-language catalogue** exists (e.g. Hindi: Nalini, Bhavna, Deepak…; Hinglish: Poorvi). Use only as fallback.

### 5.4 Model facts and decisions

- Prisma v2.5 and v3.0 both exist on the API; v3.0 adds auto language detection, output styles, context hints **[V]**. Different model generations give **partly decorrelated errors** (the premise of the panel; verify empirically in the ablation).
- **Evon v3.3** (30B parameters, ~3.5B active per token, 128K context, 11 Indian languages, Apache 2.0) is **open-weights via Hugging Face and is not on the API platform** **[V: successcds]**. **Decision: Evon is not used in the MVP** (needs GPU, adds risk, not needed for the thesis). Mention as future work: Evon as the "counsel" that explains a verdict in plain language.
- **Credits:** 5,000. Cost per STT/TTS call is **not documented in what I read [A]**. Day 0 measures it (section 18).

---

## 6. System architecture

### 6.1 Overview

```
 Browser (Landing static HTML · React app)            Operator / API client
        │  HTTPS                                             │ X-Verdict-Key
        ▼                                                    ▼
 Firebase Hosting ── /api/** rewrite ──►  Cloud Run: FastAPI "verdict-api"  (max-instances=1)
                                           │
   ┌───────────────────────────────────────┼──────────────────────────────────────────┐
   │ routes/ (verdict, gauntlet, readback, benchmark, health)                          │
   │   security: validate → rate-limit → daily cap → budget guard                      │
   │                                                                                   │
   │ audio/  convert (ffmpeg) · degrade (conditions) · features (snr proxy, bandwidth) │
   │ panel/  orchestrator (Stage A→B) · witnesses · agreement                          │
   │ entities/ lexicons · number parser · extractors · confusables                     │
   │ risk/   features · model (rules v0 / logistic v1 JSON) · policy (thresholds)      │
   │ readback/ templates · Timbre speak · resolve (yes/no/correction)                  │
   │ audit/  hash chain                                                                │
   │ gnani/  GnaniGate (single-flight queue) · stt · tts · cache · errors              │
   └──────────────┬───────────────────────────────┬────────────────────────────────────┘
                  │                               │
          Firestore (verdicts, usage,      Secret Manager (GNANI_API_KEY, ADMIN_KEY)
          cache, audit head)               Cloud Storage (synthetic assets, benchmark JSON)
                  │
                  ▼
        api.vachana.ai  (Prisma STT · Timbre TTS)

 Offline (your laptop, .env): `python -m bench.run` → generates synthetic callers (Timbre),
 degrades, runs panel, scores, writes data/benchmark.latest.json → committed + uploaded.
```

### 6.2 Stack (matches owner preferences)

- **Backend:** Python 3.12, FastAPI, Uvicorn, httpx (async), Pydantic v2, numpy, scipy, soundfile, rapidfuzz, jiwer (secondary WER only), ffmpeg (in Docker image), structlog. Risk model runs in **pure Python/numpy from a JSON of coefficients** (scikit-learn only in the offline benchmark env).
- **Frontend:** React + Vite + TypeScript for `/app`; **Landing is static HTML/CSS** produced and linted with Hallmark. Radix primitives, Lucide icons, d3-scale/d3-shape for charts, no UI library skin. Tokens from `DESIGN.md`.
- **Cloud (GCP only):** Cloud Run (API), Firebase Hosting (web + `/api` rewrite), Firestore (Native), Cloud Storage, Secret Manager, Cloud Logging. Region `asia-south1` (Mumbai) for latency to India **[A: choose closest to api.vachana.ai; measure]**.
- **CI:** GitHub Actions: ruff, mypy (light), pytest, web typecheck, `npm run build`, Hallmark static lint, secret scan (gitleaks).

### 6.3 GnaniGate (most important infrastructure piece)

A process-wide gate used by *every* Gnani call:

- `asyncio.Semaphore(GNANI_MAX_CONCURRENCY)`, default **1** **[V: one-active-request accounts]**; raise via env if your key allows more.
- Cloud Run **`--max-instances=1`** so the global concurrency really is 1. (If scaling later, move to Cloud Tasks with `maxConcurrentDispatches=1`.) Document this in `docs/DECISIONS.md`.
- Retry policy: on `429`, `500`, `503`, `504`, network timeout → backoff 0.5 s, 1.5 s, 3.5 s with ±25 % jitter, max 3 attempts. **No retry** on `400/401/402/403/422`. `402` flips a global `credits_exhausted` flag (stop all live runs, switch UI to REPLAY).
- Timeouts: STT 8 s connect+read (server bounds transcription at 5 s); TTS 15 s.
- **Cache:** key = `sha256(audio_bytes) + model + canonical_params`. Store in Firestore `cache/` (TTL 7 days) and in-process LRU. Gnani notes identical audio can differ by a borderline word, so caching also gives **stable demo output**.
- **Accounting:** increment `usage/{yyyy-mm-dd}` (`stt_calls`, `tts_calls`, `audio_seconds`, `tts_chars`). Estimated credits = calls × `EST_CREDITS_PER_STT_CALL` + chars × `EST_CREDITS_PER_TTS_CHAR` (set after Day-0 burn test). Hard stop at `GLOBAL_CREDIT_BUDGET`.
- Every outbound call sets `X-API-Request-ID = {verdict_id}.{witness_id}` for traceability.

---

## 7. Core algorithms

### 7.1 Witness panel (adaptive)

Witnesses (params shown for a Hindi/Hinglish utterance; replace `hi-IN` with the hint):

| ID | Model | `language_code` | `format` | Extra | Role |
| --- | --- | --- | --- | --- | --- |
| **W1** | `prisma-v3.0` | hint list e.g. `hi-IN,en-IN` (or `indic-auto`) | `transcribe` | none | Primary; ITN digits |
| **W4** | `prisma-v2.5` (omit `model`) | single code (`hi-IN` default) | `transcribe` | `bias_list` of domain single words (e.g. `EMI`) + `bias_score=1.0` | Decorrelated model generation |
| **W2** | `prisma-v3.0` | hint list | `transliterate` | none | Latin number *words* → independent parse path |
| **W5** | `prisma-v3.0` | hint list | `transcribe` | `topic` (what the agent just asked), `keyterms`, `previous_text` (agent's last prompt) | "Informed witness" |
| W3 | `prisma-v3.0` | hint list | `codemix` | none | **Ablation only**: kept only if it earns its credits |

**Stage A:** run **W1 and W4** (sequentially under concurrency 1; concurrently if the key allows).
- If both parse to the same canonical value for every expected entity **and** pre-risk is low (no confusable pair, plausible magnitude, clean audio features) → finish at **2 calls**.
- Else **Stage B:** run **W2 and W5** (max **4 calls** per utterance). Never exceed `MAX_WITNESSES_PER_UTTERANCE` (default 4).

Latency budget **[T]**: Stage A p50 ≤ 1.6 s, Stage B p95 ≤ 4.5 s end-to-end at concurrency 1 (each call ≈ 0.6–0.7 s per docs examples **[V]**). If these are missed, report actual numbers.

### 7.2 Entity extraction and normalisation

Canonical forms: `AMOUNT` → integer rupees (support paise as decimal later); `DIGIT_STRING` → string of digits; `DATE` → ISO `YYYY-MM-DD` (year defaults to current/next occurrence with an explicit `reference_date` parameter).

Sources per witness:
1. **ITN path (W1, W4, W5):** regex over normalised text for `₹?\d[\d,]*(\.\d+)?`, `\d+(\.\d+)?\s*(lakh|लाख|crore|करोड़|thousand|hazaar|हज़ार)`, native digits (०–९, ௦–௯, etc. → ASCII), date patterns.
2. **Word path (all witnesses incl. W2):** number-word parser over Latin (romanised, from W2) and Devanagari tokens.
   - Lexicon: Hindi numerals 0–99 (full irregular table), English 0–99, multipliers `sau/hundred`, `hazaar/hazar/thousand`, `lakh/lac`, `crore/karod`.
   - Fractions: **dedh** 1.5, **dhai** 2.5, **sava** +0.25, **sadhe** +0.5, **paune** −0.25 (applies to the next unit).
   - Digit-by-digit mode with **double/triple/dabal/tripal** repeat prefixes.
   - **Fuzzy matching** (rapidfuzz, ratio ≥ 85) over romanisation variants (paanch/panch/paach; hazaar/hazar/hajar).
3. **Reconcile:** if ITN-digit and word-parse of the *same witness* disagree, keep both as candidates and mark `intra_witness_conflict=true` (raises risk).

**Confusable pairs (feature, not a replacement):** teens vs tens in English; Hindi *pandrah/pachaas* (15/50), *solah/saath* (16/60), *satrah/sattar* (17/70), *atharah/assi* (18/80), *terah/tees* (13/30), *chaudah/chaalis* (14/40), *saat/saath* (7/60). If any candidate token in a witness is in a confusable pair → `confusable=true`.

**Golden tests (the Hindi speaker, i.e. you, must review these):**

| Spoken / written | Canonical |
| --- | --- |
| paanch hazaar | 5000 |
| pandrah hazaar | 15000 |
| pachaas hazaar | 50000 |
| unchaas hazaar | 49000 |
| dedh hazaar | 1500 |
| dhai hazaar | 2500 |
| sadhe saat hazaar | 7500 |
| dhai lakh | 250000 |
| sava lakh | 125000 |
| sadhe teen lakh | 350000 |
| paune do lakh | 175000 |
| ek crore | 10000000 |
| bees hazaar paanch sau | 20500 |
| teen hazaar paanch sau pachaas | 3550 |
| two lakh fifty thousand | 250000 |
| 2.5 lakh | 250000 |
| ₹2,50,000 | 250000 |
| १५,००० | 15000 |
| double nine triple zero (digit mode) | `99000` |
| "saat" vs "saath" in digit mode | `7` vs `60`, flagged confusable |

### 7.3 Agreement

For each expected entity type, collect candidates `{value, supporting_witnesses[]}`.

- `agreement = Σ weight(w) for witnesses supporting the modal value / Σ weight(w) of witnesses that produced a parse`. Weights start equal; the benchmark may fit them (P1).
- `coverage = parsed_witnesses / run_witnesses` (a witness that produced no parse counts against).
- `family_agreement = 1` if v2.5 and v3.0 families both support the modal value.
- Digit strings: also `min_pairwise_edit_distance` and per-position agreement (UI shows the disputed digit).

### 7.4 Risk

Per entity, features:

`agreement, coverage, family_agreement, n_witnesses, n_distinct_values, confusable, intra_witness_conflict, entity_type, log10(value) for AMOUNT, digit_length, lang_switch (detected ≠ hint), truncated_any, empty_any, snr_proxy_db, bandwidth_proxy_hz, business_violation (see 7.5), utterance_seconds`.

- **v0 (rules, ship first):** `risk = clip(1 − agreement·coverage + 0.15·confusable + 0.2·intra_conflict + 0.25·business_violation + 0.1·(snr_proxy_db < 8) , 0, 1)`.
- **v1 (fit offline):** logistic regression on benchmark *training* split, label = entity wrong vs ground truth; isotonic calibration on *validation*; export `api/verdict/risk/model_v1.json` (coefficients, scaler, calibration knots). Runtime is pure Python.
- Report **Expected Calibration Error** and a reliability diagram **on the held-out test split only**.

**SNR/bandwidth proxies** (no reference signal exists in production): frame RMS in 20 ms frames; `snr_proxy_db = 10·log10(P90 / P10 of frame energy)`; `bandwidth_proxy_hz` = 95 % spectral rolloff of speech frames. Label them *proxies* everywhere.

### 7.5 Business rules ("The Record")

Request may include `context.business_rules`, e.g. `{"expected_amount_due": 12500, "max_amount": 200000, "allowed_dates": {"min":"2026-11-09","max":"2026-12-31"}}`. A candidate violating rules or being ≥ 10× or ≤ 0.1× the expected value sets `business_violation=true`. This is the forward-deployed-engineer lever: *unanimous witnesses that agree on an implausible number still get doubted.*

### 7.6 Decision policy

Per entity: `risk < τ_accept` → ACCEPT; `τ_accept ≤ risk < τ_escalate` → CONFIRM; `risk ≥ τ_escalate` → ESCALATE. Utterance decision = worst entity decision. Defaults `τ_accept = 0.15`, `τ_escalate = 0.85` **[A: tune on validation]**. **Risk appetite** (0–100 slider) maps to `τ_accept` by choosing the point on the **validation tradeoff curve** that matches the target confirm rate; the mapping table is exported in `benchmark.latest.json`.

### 7.7 Read-back and resolution

- Template per language (P0: `hi`, `en`; P1: `ta`, `te`, `mr`, `bn`, `kn`): *"I heard {amount in words}. Is that correct? Say yes, or tell me the right amount."* Devanagari for Hindi: `मैंने {amount_words} रुपये सुना। क्या यह सही है? हाँ बोलिए, या सही रकम बताइए।`
- Amount words: implement `amount_to_words(value, lang)` for `hi` and `en` using the Indian system (hazaar, lakh, crore). **Do not rely on a library for Hindi**; use the lexicon from 7.2 and cover it with the golden tests.
- Digit strings: grouped speech with pauses: `<slow>` + commas in v3.0 ("9, 0, 0 … ").
- TTS call: `model=timbre-v3.0`, voice by persona (default `Avinash` male / `Tarika` female; configurable), `language` = detected or hint. Fallback to `timbre-v2.5` with a preferred voice if v3.0 is rejected on the key **[A]**.
- **Resolve:** caller's reply audio → Stage-A single witness (W1) → classify: `YES` set (haan, ha, ji haan, theek hai, sahi hai, yes, correct), `NO` set (nahi, na, galat, no, wrong) → `NO` + a parsable entity = **correction** (re-enter section 7.3 with that value as a single witness plus read-back-confirm once more). Max **2** read-back rounds, then ESCALATE.

### 7.8 Failure semantics

- Gnani down / timeout / 5xx after retries → decision `ESCALATE` with `reason: "asr_unavailable"`; never `ACCEPT`.
- Empty transcript from all witnesses → `RE_ASK` (agent should prompt again), counts as no entity.
- `truncated: true` from any witness → risk +; suggest shorter audio.
- Audio > 30 s → reject with a helpful error (split client-side).

---

## 8. Gauntlet and benchmark

### 8.1 Synthetic callers

- **Scenario grammar** (YAML in `api/bench/grammar/`): 6 BFSI-style templates, each with slots. Example (Hinglish): *"{greeting}, main {amount_phrase} {date_phrase} tak jama kar dungi"*. Entity sampler draws amounts (hundreds → crores, including *dedh/dhai/sava/sadhe/paune* forms), 6–10 digit strings (loan reference prefix `LN`), and dates.
- **Languages (Lite):** ~36 Hindi/Hinglish/English-India base utterances + ~12 digit-string utterances in Tamil/Telugu/Marathi/Bengali (digits only).
- **Voices:** rotate ≥ 4 Timbre v3.0 voices (two male, two female) for train/val; hold out **one voice entirely** for test. Use audio tags for adversarial variants (`<whispers>`, `<shouting>`, `<coughs>`, `<slow>`, `<excited>`).
- **Phone-number fixtures:** never generate real-looking mobile numbers. Use 10-digit strings **starting with 5** (not a valid Indian mobile prefix) or use loan-reference strings. No Aadhaar/PAN-format strings.
- Ground truth is known by construction (no human labelling).

### 8.2 Degradation conditions (procedural, seeded, deterministic)

All implemented with numpy/scipy/ffmpeg. **No downloaded noise recordings** (no licensing risk). Label as *synthetic approximations*.

| Condition ID | Recipe |
| --- | --- |
| `CLEAN` | Timbre output as is, resampled to 16 kHz |
| `PHONE_8K` | Resample to 8 kHz; band-pass 300–3400 Hz; μ-law companding; low-bitrate re-encode via ffmpeg; mild clipping |
| `BABBLE_10` / `BABBLE_5` | Mix 4–6 *other* Timbre voices speaking unrelated neutral sentences (same gain, slight delay) at SNR 10 / 5 dB |
| `TRAFFIC_5` | Brown noise + band-limited engine rumble (60–200 Hz) + synthetic horn partials, SNR 5 dB |
| `TRAIN_5` | Periodic low-frequency impulse train (≈ 3 Hz) + filtered noise, SNR 5 dB |
| `SPEAKER_REVERB` | Convolve with synthetic exponential-decay impulse response (RT60 ≈ 0.5 s) + low-pass 4 kHz |
| `PACKET_LOSS` | Zero 20–120 ms gaps, 2–5 % of duration |
| `LOW_VOLUME` | −24 dB gain + noise floor |

SNR mixing: `noise *= sqrt(P_sig / (P_noise · 10^(snr/10)))`, computed on speech-active frames. Each condition takes `seed` and parameters; output is reproducible and hashed.

**Combined conditions** (e.g. `PHONE_8K + BABBLE_10`) are allowed; the Lite suite uses: `CLEAN`, `PHONE_8K`, `PHONE_8K+BABBLE_10`, `TRAFFIC_5`.

Add **one real-room recording** of you (consenting) reading 5 synthetic sentences in your actual room for the demo. Label it `YOUR RECORDING` in the UI. It is not in the benchmark.

### 8.3 Suites

| Suite | Base utts | Conditions | ≈ STT calls (avg 2.7 per sample) | When |
| --- | --- | --- | --- | --- |
| `smoke` | 8 | 2 | ~45 | Day 0 and CI (recorded fixtures) |
| **`lite`** | **48** | **4** (192 samples) | **~520** | **Default; run first** |
| `full` | 160 | 6 (960 samples) | ~2,600 | Only if credit burn test allows |

Plus ~48 TTS syntheses (cached by utterance+voice+model). **Size the suite after the Day-0 credit test.** The runner supports `--max-calls` and resumes from cache.

### 8.4 Splits (prevents leakage)

Split by **voice** and **template**, not by random row: train = voices {A,B} × templates {1–4}; validation = voice {B,C} × template {5}; **test = held-out voice D × templates {5,6}** (adjust counts to fit). Report test only. State N prominently.

### 8.5 Baselines and metrics

| System | Description |
| --- | --- |
| B0 `single` | W1 only, accept always |
| B1 `confirm_all` | Always CONFIRM (friction ceiling) |
| B2 `naive_equal` | W1+W4; accept if equal else CONFIRM |
| **AVOW** | Section 7 (rules v0 and fitted v1) |

Metrics (per system, per condition, per language group, per entity type), all with **bootstrap 95 % CI** (1,000 resamples over utterances):

- **Silent error rate** = entity wrong **and** decision ACCEPT, as % of utterances. *The headline.*
- **Catch rate** = wrong entities flagged (CONFIRM or ESCALATE) / all wrong entities.
- **Confirm rate** = CONFIRM+ESCALATE / all utterances (friction).
- **Unanimous-wrong rate** = all witnesses agree on a wrong value (the honest limit).
- **Calls per utterance**, **p50/p95 latency**, estimated credits.
- **ECE** and reliability bins; **AUROC** of risk for error detection.
- **Ablation:** drop each witness (W1, W4, W2, W5, W3) and re-score; report ΔSilent error and Δcalls ("which witness earns its credits").
- Secondary: entity-level and word-level error vs ground truth (jiwer), only for context.

**Targets [T]** (publish whatever is measured): AVOW silent error rate ≤ 40 % of B0's at confirm rate ≤ 30 % on the held-out test; calls per utterance ≤ 3.0. If the result is weaker, say so; the honesty is part of the pitch.

### 8.6 Output artifact

`data/benchmark.latest.json` with: `meta` (date, suite, seed, git commit, models, voices, N per split), `systems`, `by_condition`, `by_language`, `ablation`, `calibration` (bins, ECE), `tradeoff_curve` (points: τ, confirm_rate, silent_error_rate, CI), `risk_appetite_map`, `cases[]` (id, audio path, ground truth, witnesses, verdicts), `limits[]` (strings shown in UI). Copy `cases/` audio (synthetic only, small, mono 16 kHz) into `data/audio/`.

---

## 9. API specification

All JSON unless noted. Auth: public routes use origin + rate limits; operator routes require `X-Verdict-Key` (from Secret Manager).

### 9.1 `POST /v1/verdict` (operator) — multipart

Fields: `audio_file` (required), `language_hint` (`hi-IN` | `en-IN` | … | `indic-auto`), `expect` (JSON array of entity types, e.g. `["AMOUNT","DATE"]`), `context` (JSON: `last_agent_prompt`, `topic`, `keyterms[]`, `business_rules{}`, `reference_date`), `policy` (JSON: `risk_appetite` 0–100 or explicit thresholds), `mode` (`fast` = Stage A only | `adaptive` default).

Response `200`:

```json
{
  "verdict_id": "vd_01JC...",
  "decision": "CONFIRM",
  "reason": "witnesses_disagree",
  "entities": [{
    "type": "AMOUNT",
    "consensus": 15000,
    "candidates": [
      {"value": 15000, "witnesses": ["W1","W2"]},
      {"value": 50000, "witnesses": ["W4"]}
    ],
    "risk": 0.62,
    "decision": "CONFIRM",
    "evidence": {"agreement": 0.67, "coverage": 1.0, "confusable": true, "business_violation": false, "snr_proxy_db": 7.1}
  }],
  "witnesses": [{"id":"W1","model":"prisma-v3.0","format":"transcribe","transcript":"...","detected_language_code":"hi-IN","latency_ms":640,"status":"ok","cached":false}],
  "readback": {"text":"मैंने पंद्रह हज़ार रुपये सुना। क्या यह सही है?","language":"hi-IN","audio_url":"/v1/readback/vd_01JC.../audio"},
  "cost": {"stt_calls": 4, "tts_calls": 1, "audio_seconds": 6.2},
  "timing_ms": {"total": 3120, "stage_a": 1290, "stage_b": 1650},
  "audit": {"hash": "9f2c1e7a...", "prev_hash": "41ab09d3..."}
}
```

Errors: `{"error": {"code": "...", "message": "...", "request_id": "..."}}` with codes `invalid_audio`, `audio_too_long`, `rate_limited`, `daily_cap_reached`, `credits_exhausted`, `asr_unavailable`, `unauthorized`.

### 9.2 `POST /v1/resolve` (operator and public)

Body (multipart): `verdict_id`, `audio_file` (the caller's reply). Returns `{resolution: "CONFIRMED" | "CORRECTED" | "UNCLEAR", entity: {...}, decision, round: 1|2, audit}`.

### 9.3 `GET /v1/readback/{verdict_id}/audio` → `audio/wav` (Timbre output; cached).

### 9.4 `POST /v1/gauntlet/run` (public)

Multipart: `audio_file`, `consent=true` (required), `condition` (id from 8.2), `snr_db` (0–25), `language_hint`. Applies degradation **in memory**, runs the panel, returns a verdict body plus `degraded_audio_b64` (≤ 400 KB, discarded server-side). Rate-limited and capped (section 12).

### 9.5 `GET /v1/benchmark/latest` → `benchmark.latest.json` (static from GCS/Hosting; cacheable).

### 9.6 `GET /v1/audit/verify` → `{ok: bool, checked: n, head: "..."}`. `GET /v1/audit/recent?limit=50` (operator).

### 9.7 `GET /healthz`, `GET /readyz` (readyz checks Firestore and a 1-byte Gnani key check **without** spending credits: only validates presence/format of the key).

### 9.8 Streaming (P1)

`WS /v1/stream` → relays PCM to `wss://api.vachana.ai/stt/v3/stream`, emits partial transcripts, then a final verdict message.

---

## 10. Data model

Firestore (Native):

- `verdicts/{verdict_id}`: `created_at, source ("api"|"gauntlet"|"bench"), language_hint, audio_sha256, audio_seconds, condition, snr_db, witnesses[], entities[], decision, cost{}, timing_ms{}, prev_hash, hash`. **No raw audio. No raw public transcripts beyond what the user chose to share.**
- `usage/{yyyy-mm-dd}`: `stt_calls, tts_calls, audio_seconds, tts_chars, public_runs, est_credits`.
- `cache/{key}`: `result, expires_at` (TTL policy 7 days).
- `meta/audit_head`: `{hash, count}` (updated in a transaction with each verdict write).

Hash chain: `hash = sha256(prev_hash || canonical_json(record_without_hash))` with sorted keys and UTF-8. `verify` recomputes from the first record. This is a **tamper-evident log**, not a blockchain; say so.

Cloud Storage: `verdict-assets` (synthetic demo audio, benchmark JSON, OG templates). Public Gauntlet audio is **never written to storage**.

Log hygiene: structured JSON, digits in transcripts masked as `#` in logs; request IDs everywhere.

---

## 11. Frontend (see `DESIGN.md` for every visual rule)

### 11.1 Information architecture

- `/` Landing (static), per `DESIGN.md` 7.1: hero (one CTA) → problem shown visually → evidence (real cases + benchmark) → four steps → plug it in → trust (limits, privacy, FAQ; no testimonials) → final CTA.
- `/app/gauntlet` Public. `/app` Console: Overview, Case Files, Benchmark, Policy, Court Record, API.
- Routing: React Router; deep link every case: `/app/cases/:id`.

### 11.2 Key interactions

1. **Gauntlet:** consent → language + sample or record (≤ 12 s) → environment + `NoiseDial` → run → results appear with the staggered Witness reveal, `VerdictStamp`, read-back player. If `CONFIRM`: user can record a reply and watch resolution.
2. **Policy:** `RiskAppetite` slider updates `TradeoffCurve` and projected confirm rate client-side from `risk_appetite_map` (no API calls).
3. **Case Files:** filter by condition/language/entity/outcome; open a case; play clean vs degraded audio.

### 11.3 Client rules

- Audio capture: `MediaRecorder` (webm/opus on Chrome/Android, mp4/aac on iOS Safari). Upload as-is; **server transcodes** (ffmpeg → 16 kHz mono WAV) and validates duration.
- UX patterns follow `DESIGN.md` section 12b (adopt/adapt/skip table, error-code copy, confirm-before-spend, **no optimistic verdicts**).
- Never expose any key in the browser. The browser talks only to `/api/**` on the same origin.
- State: TanStack Query for server state; minimal local state. All views implement the states table in `DESIGN.md` section 8.
- Performance budget [T]: landing LCP < 2.0 s on 4G mid-phone; JS for `/` = 0 KB framework (static); `/app` initial JS ≤ 250 KB gz; Lighthouse Accessibility ≥ 95.

---

## 12. Security, privacy, compliance

### 12.1 Threat model (abridged)

| Threat | Control |
| --- | --- |
| API key theft | Key only in Secret Manager / `.env`; never in client bundle, logs, errors, or git; gitleaks in CI; rotate if ever exposed |
| **Credit drain by the public** (the most likely abuse) | Per-IP limits (6 runs/hour, 20/day), **global daily cap** `PUBLIC_DAILY_RUN_CAP` (default 150), `GLOBAL_CREDIT_BUDGET` hard stop, honeypot field, origin check, optional Firebase App Check (P1). On cap → REPLAY mode, clearly labelled |
| Malicious/huge uploads | 2 MB limit, magic-byte sniff, `ffprobe` duration ≤ 30 s (12 s public), ffmpeg invoked with **argument arrays** (no shell), 10 s subprocess timeout, temp files in a private dir, always deleted |
| Audio decompression bombs | Duration and sample-rate checks before decode; memory cap |
| Injection | No SQL; Pydantic validation for every input; `context` JSON schema-validated with size limits (e.g. `keyterms` ≤ 200 items each ≤ 64 chars) to avoid forwarding garbage to Gnani |
| XSS | React escaping; CSP `default-src 'self'; img-src 'self' data:; media-src 'self' blob: data:; connect-src 'self'; frame-ancestors 'none'`; no inline scripts on `/app` (nonce on landing) |
| CSRF / CORS | Same-origin `/api` via Hosting rewrite; strict CORS allow-list for operator tools; no cookies for auth |
| Transport | HTTPS only, HSTS, secure headers (`X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy: microphone=(self)`) |
| Supply chain | Pin dependency versions, `pip-audit` and `npm audit` in CI |
| Insider/audit | Hash-chained records; verify endpoint |

### 12.2 Privacy (DPDP-aligned practice)

- Voice is personal data **[V: contest page, via successcds]**. Public Gauntlet requires an **explicit consent checkbox** stating purpose (transcribing your clip with Gnani Prisma to show the result), that the clip is **processed in memory and not stored**, and that results shown may be shared by you only if you click share.
- Do not ask for or accept real identifiers. UI warns users.
- Benchmark and demos use **only synthetic voices** and your own consenting recordings.
- Retention: public audio 0; verdict metadata 30 days (`purge` job via Cloud Scheduler → authenticated internal route); cache 7 days; benchmark artefacts indefinite (synthetic).
- A plain-language `/privacy` page (≤ 250 words) matching exactly what the code does.

### 12.3 Ownership/IP caution

The contest page says ownership is covered by the programme terms **[V: via successcds]**. **Read those terms before you publish the repo or keep developing after the contest.** Day-0 checklist item.

---

## 13. Reliability, performance, error handling

| Failure | Behaviour |
| --- | --- |
| 429 from Gnani | Gate backoff + retry; UI shows "speech service busy, retrying" countdown |
| 402 / credits exhausted | Stop live runs globally, UI → REPLAY with banner; operator alert in logs |
| 504 UPSTREAM_TIMEOUT | Retry once; then witness `status: timeout`; verdict continues with remaining witnesses, risk penalised |
| Firestore unavailable | Verdict still returned; audit write queued in memory (max 100) and flushed; `/readyz` degrades |
| ffmpeg failure | `invalid_audio` with hint |
| Browser mic denied | Offer upload |
| Cold start | min-instances=1 from 9 Nov evening to 12 Nov (cost small) **[A: verify cost in console]** |

Cloud Run: concurrency 8 (I/O-bound), CPU 1, memory 1 GiB, timeout 30 s, `--max-instances=1`.

---

## 14. Testing and quality

- **Unit:** number parser golden tests (7.2), confusables, agreement math, risk v0, hash chain, degradation determinism (same seed → same SHA-256), SNR mixing accuracy (±0.5 dB), gate semantics (never > N concurrent), retry/backoff, cache keys.
- **Contract:** recorded Gnani fixtures for success and each error shape in 5.1; schema tests for our API responses.
- **Property tests (Hypothesis):** `parse(words(n)) == n` for generated amounts in Hindi/English within supported range.
- **Integration:** panel orchestrator with a fake Gnani server (FastAPI stub) simulating 429, timeouts, disagreement.
- **E2E (Playwright):** record (fake media stream) → run → verdict visible; REPLAY mode on cap; mobile viewport 375.
- **Live smoke (`RUN_LIVE=1`):** one STT, one TTS call.
- **Design QA:** Hallmark `sloplint --render` on landing; axe-core on app pages; manual screen-reader pass on Gauntlet.
- **Benchmark integrity:** CI test that fails if README/landing numbers differ from `benchmark.latest.json`.

---

## 15. Project structure

```
avow/
├─ README.md   PRD.md   DESIGN.md   LICENSE (MIT)   CHANGELOG.md
├─ .env.example   .gitignore   .gitleaks.toml
├─ docs/  DECISIONS.md  ARCHITECTURE.md  PRIVACY.md  BENCHMARK.md
├─ api/
│  ├─ pyproject.toml   Dockerfile   ruff.toml
│  ├─ verdict/
│  │  ├─ main.py  config.py  deps.py  logging.py  ids.py
│  │  ├─ gnani/    gate.py  stt.py  tts.py  cache.py  errors.py  models.py
│  │  ├─ audio/    convert.py  features.py  degrade.py  conditions.py  babble.py
│  │  ├─ entities/ lexicon_hi.py  lexicon_en.py  numbers.py  extract.py  confusables.py
│  │  ├─ panel/    witnesses.py  orchestrator.py  agreement.py
│  │  ├─ risk/     features.py  model.py  model_v1.json  policy.py
│  │  ├─ readback/ templates.py  words.py  speak.py  resolve.py
│  │  ├─ audit/    chain.py
│  │  ├─ security/ validate.py  limits.py  headers.py
│  │  ├─ store/    firestore.py  gcs.py
│  │  └─ routes/   verdict.py  resolve.py  gauntlet.py  readback.py  benchmark.py  audit.py  health.py
│  ├─ bench/       grammar/*.yaml  scenarios.py  generate.py  run.py  score.py  fit_risk.py  report.py
│  └─ tests/       unit/  contract/  integration/  fixtures/
├─ web/
│  ├─ landing/     index.html  styles.css  (Hallmark-built, linted)  build.mjs (injects benchmark numbers)
│  └─ app/         package.json  vite.config.ts  src/{main.tsx, routes/, components/, lib/api.ts, styles/tokens.css}
├─ data/           benchmark.latest.json   audio/ (synthetic, small)   cases/
├─ infra/          cloudrun.sh  firebase.json  firestore.rules  firestore.indexes.json  scheduler.sh
└─ .github/workflows/ci.yml
```

`firestore.rules`: deny all client access (`allow read, write: if false;`). Only the API's service account reads/writes.

---

## 16. Environment variables (`.env.example`)

```bash
# --- Gnani (create keys at app.gnani.ai/voice; 3 free keys) ---
GNANI_API_KEY=replace_me
GNANI_BASE_URL=https://api.vachana.ai
GNANI_MAX_CONCURRENCY=1
STT_DEFAULT_MODEL=prisma-v3.0
TTS_MODEL=timbre-v3.0
TTS_VOICE_MALE=Avinash
TTS_VOICE_FEMALE=Tarika
MAX_WITNESSES_PER_UTTERANCE=4

# --- Budget guards (set after the Day-0 credit burn test) ---
EST_CREDITS_PER_STT_CALL=0
EST_CREDITS_PER_TTS_CHAR=0
GLOBAL_CREDIT_BUDGET=4000
PUBLIC_DAILY_RUN_CAP=150
PUBLIC_RUNS_PER_IP_PER_HOUR=6
PUBLIC_RUNS_PER_IP_PER_DAY=20

# --- Service ---
VERDICT_ADMIN_KEY=replace_me_long_random
ALLOWED_ORIGINS=https://YOUR-SITE.web.app
ENV=local
LOG_LEVEL=INFO

# --- GCP ---
GCP_PROJECT=replace_me
GCP_REGION=asia-south1
FIRESTORE_DATABASE=(default)
ASSETS_BUCKET=verdict-assets-replace_me
```

---

## 17. Deployment (GCP)

```bash
# one-time
gcloud config set project $GCP_PROJECT
gcloud services enable run.googleapis.com firestore.googleapis.com secretmanager.googleapis.com \
  artifactregistry.googleapis.com cloudscheduler.googleapis.com firebase.googleapis.com
gcloud firestore databases create --location=asia-south1
printf "%s" "$GNANI_API_KEY" | gcloud secrets create gnani-api-key --data-file=-
printf "%s" "$VERDICT_ADMIN_KEY" | gcloud secrets create verdict-admin-key --data-file=-

# deploy API
gcloud run deploy verdict-api --source ./api --region asia-south1 \
  --max-instances=1 --min-instances=0 --concurrency=8 --cpu=1 --memory=1Gi --timeout=30 \
  --set-secrets=GNANI_API_KEY=gnani-api-key:latest,VERDICT_ADMIN_KEY=verdict-admin-key:latest \
  --set-env-vars=ENV=prod,GNANI_MAX_CONCURRENCY=1,GCP_REGION=asia-south1 \
  --allow-unauthenticated   # public Gauntlet; operator routes enforce X-Verdict-Key

# web
cd web/app && npm ci && npm run build && cd ../..
firebase deploy --only hosting,firestore:rules
```

`firebase.json`: serve `web/landing` at `/`, `web/app/dist` under `/app/**` (SPA fallback), rewrite `/api/**` → Cloud Run `verdict-api`. From 9 Nov evening set `--min-instances=1`.

---

## 18. Phase plan (≈ 52 h; Sunday 8 Nov → Tuesday 10 Nov)

Hours are focused work blocks, not wall-clock. **Feature freeze: Tue 10 Nov 08:00. Submit by 12:00. 23:59 is a trap, not a plan.**

### Block 0 — Day 0: de-risk (2 h) — *Sun evening*
- [ ] Read the **official** programme terms (ownership, repo publication, submission fields). Join Gnani Discord.
- [ ] Create GCP project, repo, `.env`. Install Hallmark: `npx skills add nutlope/hallmark -g`.
- [ ] **Credit burn test:** 10 STT calls (≈ 5 s each, mixed v2.5/v3.0) and 5 TTS calls (100 chars). Read the dashboard before/after. Fill `EST_CREDITS_*`. Compute how many `lite` runs you can afford.
- [ ] **Concurrency test:** fire 2 requests at once; confirm whether `429` appears. Set `GNANI_MAX_CONCURRENCY`.
- [ ] Confirm `prisma-v3.0`, `timbre-v3.0`, `indic-auto` all work on **your** key (scope errors → ask on Discord now).
- [ ] Record the real latency per call and per region (Mumbai vs default).
- [ ] **Go/no-go:** if credits/limits make the plan impossible, shrink to `smoke`+narrow demo (cut list below), but keep the thesis.

### Block 1 — Core engine (8 h) — *Sun night → Mon morning*
Slice 1.1 GnaniGate + stt/tts clients + cache + fixtures (2 h) → 1.2 numbers/lexicon + golden tests (3 h) → 1.3 panel orchestrator + agreement (1.5 h) → 1.4 risk v0 + policy (0.5 h) → 1.5 CLI `python -m verdict.cli verdict file.wav` end-to-end (1 h).
**Done when:** CLI prints a correct verdict on 5 hand-recorded sentences; all golden tests pass.

### Block 2 — Gauntlet engine and benchmark (7 h) — *Mon*
2.1 Scenario grammar + generator + Timbre synthesis with cache (2 h) → 2.2 degrade module + determinism tests (2 h) → 2.3 runner/scorer/baselines/bootstrap (2 h) → 2.4 **start the `lite` run in the background** (1 h to wire resume/budget). While it runs (≈ 20–40 min wall-clock at 1 concurrency), build the UI.
**Done when:** `benchmark.latest.json` exists and is sane; risk v1 fit script runs on train split.

### Block 3 — API + read-back loop (4 h) — *Mon midday*
Routes, validation, limits, audit chain, readback/resolve, Firestore. **Done when:** curl flow `verdict → readback → resolve` works.

### Block 4 — UI (9 h) — *Mon afternoon → night*
4.1 tokens + shell + Gauntlet page (mobile-first) (4 h) → 4.2 Landing via Hallmark with DESIGN.md locked + lint (2.5 h) → 4.3 Console: Overview, Case Files, Benchmark, Policy (2.5 h).
**Done when:** Gauntlet works on a real phone; landing passes Hallmark Floor.

### Block 5 — Harden and deploy (4 h) — *Mon night*
Fit risk v1 and re-run test split; fill `benchmark.latest.json`; CI green; deploy; cap/REPLAY mode verified by forcing the cap; secret scan; privacy page.

### Block 6 — Demo, README, launch (6 h) — *Tue morning* (**posting must not wait for the end**)
- **Teaser post tonight or Mon morning** (see 19.2) to start earning real engagement early.
- Record demo (section 19.1), edit, captions. Write README (problem, architecture diagram, benchmark table with CIs, limits, how to run). Public repo.
- Main post **Mon evening or Tue by 09:00**. Submit form when it opens. **Nominate** the posts.

### Block 7 — Buffer and polish (remaining) — *Tue*
Fix what the phone test and a friend's test reveal. Reply to every comment.

### Cut list (apply in this order if behind)
1. OG share card. 2. Tamil/Telugu lexicons (digits-only stays). 3. Realtime streaming. 4. Console Court Record UI (keep API). 5. `full` suite. 6. Risk v1 (ship v0 and say so). 7. Console pages other than Benchmark and Case Files. **Never cut:** engine, benchmark with baselines, mobile Gauntlet, honest limits, demo video.

### Risk register

| Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- |
| Credits run out | Med | High | Day-0 burn test, cache, `--max-calls`, REPLAY mode |
| 1-concurrency makes UI slow | High | Med | Stage A only for first paint, staggered reveals, honest latency numbers |
| Witnesses' errors are correlated (panel adds little) | Med | High | Ablation + report unanimous-wrong; business rules add independent evidence; still a valid, honest finding |
| Synthetic noise unrealistic | High | Med | Label as synthetic; add your real-room recording; discuss in interview |
| Timbre v3.0 unavailable on key | Low | Med | Fallback to v2.5 voices |
| Hindi number parser bugs | Med | High | Golden tests reviewed by you; property tests |
| Public abuse drains credits | Med | High | Caps, per-IP limits, REPLAY |
| Last-day deploy failure | Med | High | Deploy a skeleton on Monday midday, not Tuesday night |
| Hallmark can't run (no Chrome/Node) | Low | Low | Static checks still run; do manual DESIGN.md checklist |

---

## 19. Demo, launch and submission

### 19.1 The 60-second demo (storyboard)

| Sec | Visual | Voice/text on screen |
| --- | --- | --- |
| 0–5 | Phone UI, noisy line. Waveform. Caller says the amount. A voice agent's screen shows **₹50,000** | "This voice AI just heard ₹50,000. The caller said ₹15,000." |
| 5–15 | Cut to **AVOW**. Same audio. Four witness cards appear; W4 disagrees; the disputed number highlights | "AVOW asks several Prisma configurations the same question and watches where they disagree." |
| 15–30 | Risk meter fills → `CONFIRM`. Timbre read-back plays in Hindi. Caller says "nahi, pandrah hazaar" | "It doubts the number, reads it back in the caller's language, and fixes it." |
| 30–45 | Benchmark chart: silent error rate before/after, with the confirm-rate cost; **real numbers** | "On a held-out benchmark: silent errors {measured} → {measured}, with {measured}% of calls confirmed." |
| 45–55 | Policy slider moves; curve updates. Quick honest-limits line | "You choose the risk. It shows the price. It can still be fooled when every witness is wrong together." |
| 55–60 | URL + hashtags + "Built solo in Mathura on Gnani Prisma and Timbre" | `#GnaniAI #GreatIndianAIInternshipChallenge` |

Rules (from the owner's motion-reveal guidance, adapted): captions on; first 3 seconds must work muted; every transition ≤ 2 s and fast; **the final shot is a real phone mockup running the Gauntlet, then a static end frame with the single CTA and URL**; vertical (9:16) and square (1:1) exports; a low ambient/electronic track only on the intro and outro, **never under speech**; show a real phone run at least once.

### 19.2 Posting plan (all genuine; **no engagement purchases, pods or bots**)

- **Teaser (now / Mon AM):** a short build-in-public post: the problem in one sentence + a screenshot of the Witness Panel. Tag Gnani AI. Include both hashtags.
- **Main post (Mon evening / Tue early):** the 60-second video, 3-line story, link to live URL and repo, both hashtags. Pin to your profile.
- **X thread:** 6 tweets with the benchmark chart, the failure cases, and the honest limits.
- **Results post (Tue evening):** what the numbers said, including what failed.
- Share in your college and GSA communities and with people who will actually try the Gauntlet. Reply to every comment within the hour. Use your own `linkedin-caption-writer` skill for the narrative voice.
- Nominate the exact post URLs in the submission form when it opens.

### 19.3 Award fit (one award per person; submit a project that fits several)

| Award | Why AVOW fits |
| --- | --- |
| Real Deal | Silent amount errors in collections/BFSI |
| Noise Canceller | Whole benchmark is noisy 8 kHz telephony conditions |
| Mixed Vibes | Hinglish numerals, code-mixed witnesses, `codemix`/`transliterate` formats |
| Jugaad Genius | Confidence from disagreement because the API has no confidence |
| Demo Day Drop | The 60-second storyboard above |
| Small Town, Big Build | Built from Mathura **[verify the contest's Tier 2/3 definition]** |
| Solo Ninja | If you submit solo |
| Main Character | Only if P1 regional lexicons land |
| Crowd Favourite | The Gauntlet is shareable ("try to fool it") |

### 19.4 Interview ammo

Prepare crisp answers (2 minutes each):

1. **Why disagreement as confidence?** Black-box API gives no per-word score; agreement across decorrelated configurations is a calibrated proxy; here's the reliability plot and ECE.
2. **What if all witnesses are wrong together?** Unanimous-wrong rate is reported; business rules and acoustic evidence add independent signal; limit is stated.
3. **Cost?** Adaptive cascade: ~2 calls when easy; ablation shows which witness earns its credits.
4. **Latency under one-request-at-a-time?** Stage A first, p95 numbers, what changes with higher concurrency or the streaming API.
5. **How would you validate with real data?** Partner-side shadow mode on consented calls; same metrics; no raw audio retention.
6. **Why not train a confidence head?** No model access. **The ask to Gnani:** expose per-word confidence or n-best hypotheses; AVOW's features would improve immediately and the extra calls would disappear.
7. **Biggest bug you hit?** Prepare a real one (e.g. a number-word parsing edge case).
8. **Which common UX pattern did you refuse, and why?** Optimistic UI for verdicts: showing ACCEPT before evidence arrives would defeat a product whose job is to doubt. Also: no referral mechanics (engagement rules), confirm-before-spend instead of confirm-before-delete.
9. **What would you build next at Gnani?** Entity-level eval harness per customer deployment; per-customer `keyterms` auto-tuning.

---

## 20. Definition of done

- [ ] Public URL works on a real phone; Gauntlet runs end to end (live or clearly labelled REPLAY).
- [ ] `benchmark.latest.json` generated by the CLI, with held-out test, baselines, CIs, ablation, calibration, limits.
- [ ] Every number in README, landing and posts traces to that file.
- [ ] No secrets in git history (gitleaks clean). `.env.example` present.
- [ ] Hallmark Floor gates pass on the landing; axe has no serious violations on app pages.
- [ ] Public repo with README (problem, architecture, how to run, benchmark, limits, models used by name: **Prisma v2.5, Prisma v3.0, Timbre v3.0 (and v2.5 fallback)**).
- [ ] Demo video + teaser + main post live with both hashtags; posts nominated; submission form complete before 12:00 on 10 Nov.

---

## Appendix A — Kickoff prompt for Codex / Antigravity

```text
You are the lead engineer building AVOW from the attached PRD.md and DESIGN.md.
Operate under PRD section 0 (agent rules). Start with Block 0 scripts only:
1) scaffold the repo exactly as PRD section 15; 2) write api/verdict/gnani/gate.py, stt.py, tts.py
with the semantics in PRD 5 and 6.3 and recorded-fixture contract tests; 3) write
entities/numbers.py with every golden case in PRD 7.2 as pytest tests FIRST, then make them pass;
4) write scripts/credit_burn_test.py that measures calls and prints a table I can compare with
the Gnani dashboard. Do not build UI yet. Do not invent API behaviour: read the docs URLs in
PRD section 5. Commit after each slice. When a slice is green, stop and summarise what is done,
what is risky, and what you need from me.
```

## Appendix B — Hallmark brief for the landing page

```text
$hallmark custom — landing page for AVOW, a runtime trust layer for Indian-language voice agents
that cross-checks several speech-recognition transcripts of the same audio and tells the agent to
accept, read back, or escalate a spoken amount, date or digit string.
Audience: voice-agent engineers and forward-deployed engineers at Indian BFSI/insurance/telecom
teams; secondary: Gnani AI evaluators arriving from LinkedIn on a phone.
Follow DESIGN.md section 7.1 exactly: pre-design checklist, 3-second test, hero with ONE CTA
(RUN THE GAUNTLET) and no secondary CTA, outcome headline "Catch misheard amounts before your voice
agent acts on them.", problem shown visually, evidence section, four steps, plug-it-in, trust section
(honest limits, no testimonials), final CTA.
Use the locked DESIGN.md (navy palette, Inter + IBM Plex Mono uppercase labels, zero radius).
No stock photos, no invented metrics (read numbers from data/benchmark.latest.json at build time and
fail the build if missing), no testimonials, no logo wall, no email capture, no eyebrow above headings,
no coloured word in the headline. Hero must fit 375x667 and 1440x900. Record the tracked-caps overrule
in the first CSS comment. Run sloplint --render and fix all Floor failures.
```

## Appendix C — Minimal request examples (for README)

```bash
curl -X POST https://YOUR-SITE.web.app/api/v1/verdict \
  -H "X-Verdict-Key: $VERDICT_ADMIN_KEY" \
  -F audio_file=@caller_reply.wav \
  -F language_hint=hi-IN \
  -F 'expect=["AMOUNT"]' \
  -F 'context={"last_agent_prompt":"Aap kitna jama karenge?","business_rules":{"expected_amount_due":12500}}' \
  -F 'policy={"risk_appetite":60}'
```

```python
import requests
r = requests.post(
    "https://YOUR-SITE.web.app/api/v1/verdict",
    headers={"X-Verdict-Key": "<key>"},
    files={"audio_file": open("caller_reply.wav", "rb")},
    data={"language_hint": "hi-IN", "expect": '["AMOUNT"]'},
    timeout=30,
)
print(r.json()["decision"], r.json()["entities"][0]["consensus"])
```
