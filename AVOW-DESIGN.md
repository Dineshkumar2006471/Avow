# DESIGN.md — AVOW

> Locked design system. Read this fully before writing any UI. If a value is not here, ask; do not invent.
> Companion to `PRD.md`. Hallmark (`github.com/Nutlope/hallmark`) reads this file as the project's locked `design.md`.

## 0. Provenance of every value (honesty tiers)

| Tier | Meaning | Used for |
| --- | --- | --- |
| **Specified** | A design decision made for this product. Not copied from any site. | All colours, type scale, spacing, components below |
| **Verified (docs)** | Read from a live source during research | Hallmark's anti-slop rules (README, usehallmark repo); font families chosen by the owner |
| **Unverified** | Recalled from memory, not re-checked | Carbon breakpoints and easing curve (marked `[unverified]`) |

Gnani's own brand colours were **not** extracted: the page fetch returned rendered text, not raw CSS. Avow deliberately uses its own navy identity. If you want to match Gnani exactly, paste ColorZilla / CSS Peeper readings from gnani.ai and treat those as ground truth.

All contrast ratios in section 2 were computed (WCAG 2.x relative luminance), not eyeballed.

---

## 1. Design intent

AVOW is **infrastructure for people who cannot afford a wrong number**: a bank's voice-agent team, a forward-deployed engineer on a customer call. The interface should feel like a **flight data recorder crossed with a court record**: precise, calm, dense, audit-friendly. Not a "friendly AI assistant".

Three words: **Precise. Sober. Evidentiary.**

Signature idea (the one thing people remember): **the Witness Panel**. Several transcripts of the same audio sit side by side, the disputed number is highlighted in each, and a single verdict stamp resolves them. Every screen is built around showing *disagreement becoming a decision*.

Not allowed: chat-bubble UI, sparkle icons, gradient blobs, glassmorphism, robot/brain imagery, "AI-powered" copy, floating avatars.

---

## 2. Colour

Two surface modes sharing one navy identity. Console and Gauntlet = **Dark Navy**. Landing alternates **Navy Hero bands** and **Paper sections**.

### 2.1 Navy scale (Specified)

| Token | Hex | Role |
| --- | --- | --- |
| `--navy-950` | `#070F1F` | Console canvas |
| `--navy-900` | `#0A1A33` | Hero band, ink on paper |
| `--navy-850` | `#0B1830` | Surface 1 (panels) |
| `--navy-800` | `#12274D` | Surface 2 (raised / hover rows / inputs) |
| `--navy-700` | `#163F8A` | Primary button fill on paper |
| `--navy-600` | `#2A63C8` | Primary button fill on dark |
| `--navy-500` | `#5B9BFF` | Accent text / links / focus / chart primary on dark |
| `--navy-400` | `#8EB8FF` | Accent hover on dark |
| `--navy-300` | `#27406F` | Subtle border on dark |
| `--navy-250` | `#4A6AA3` | Strong border / input outline on dark (UI 3:1) |

### 2.2 Neutrals

| Token | Hex | Role |
| --- | --- | --- |
| `--text-1` | `#E8EDF5` | Primary text on dark |
| `--text-2` | `#A9B7CF` | Secondary text on dark |
| `--text-3` | `#8496B5` | Tertiary / placeholder on dark |
| `--paper` | `#F4F6FA` | Light section background |
| `--paper-2` | `#FFFFFF` | Light raised surface |
| `--ink-1` | `#0A1A33` | Primary text on paper |
| `--ink-2` | `#44546F` | Secondary text on paper |
| `--ink-3` | `#5E6C86` | Tertiary text on paper |
| `--line-paper` | `#D5DCE8` | Borders on paper |

### 2.3 Verdict semantics (always paired with icon + text label; never colour alone)

| Verdict | Dark UI | Paper UI | Glyph |
| --- | --- | --- | --- |
| ACCEPT | `#3DD68C` | `#0E7A4B` | check in square |
| CONFIRM | `#F5B942` | `#8A5A00` | question in square |
| ESCALATE | `#FF7A7A` | `#B3261E` | cross in square |

### 2.4 Measured contrast (computed)

| Pair | Ratio | Passes |
| --- | --- | --- |
| text-1 on canvas / surface-1 / surface-2 | 16.28 / 15.04 / 12.55 | AAA |
| text-2 on surface-1 / surface-2 | 8.72 / 7.28 | AAA |
| text-3 on surface-1 / surface-2 | 5.90 / 4.93 | AA |
| accent `#5B9BFF` on surface-1 / canvas | 6.38 / 6.91 | AA |
| white on `--navy-600` fill (`#2A63C8`) | 5.65 | AA |
| white on `--navy-700` fill | 9.94 | AAA |
| ACCEPT / CONFIRM / ESCALATE on surface-1 | 9.43 / 10.02 / 7.00 | AAA |
| `--navy-250` border on surface-1 | 3.27 | AA non-text (3:1) |
| ink-1 on paper | 16.06 | AAA |
| ink-2 / ink-3 on paper | 7.07 / 4.89 | AAA / AA |
| link `#1F55C4` on paper | 6.15 | AA |
| ACCEPT / CONFIRM / ESCALATE on paper | 4.97 / 5.48 / 6.04 | AA |

Do not use `--navy-300` as a *required* control boundary (1.73:1). It is for decorative dividers only.

### 2.5 Colour rules

- One accent (`--navy-500`). Semantic colours only for verdicts and data status.
- Charts: series 1 `--navy-500`, series 2 `--text-2`, series 3 dashed `--navy-250`. Never rainbow.
- No gradients except a flat 1-step hero band (`--navy-900` → `--navy-950` vertical at ≤ 6% delta). No glow, no blur.
- No pure black (`#000`), no pure white text on dark (use `--text-1`).

---

## 3. Typography

Owner-mandated pairing: **IBM Plex Mono (uppercase labels)** + **Inter (everything else)**.

### 3.1 Families and loading

```css
--font-sans: "Inter", "Noto Sans Devanagari", "Noto Sans Tamil", "Noto Sans Telugu",
  "Noto Sans Kannada", "Noto Sans Bengali", "Noto Sans Gujarati", "Noto Sans Gurmukhi",
  "Noto Sans Malayalam", system-ui, sans-serif;
--font-mono: "IBM Plex Mono", ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace;
```

- Self-host via `@fontsource-variable/inter` and `@fontsource/ibm-plex-mono` (weights 400, 500, 600) and `@fontsource/noto-sans-*` for each script. **No Google Fonts request** (privacy + CSP).
- `font-display: swap`; preload Inter and Plex Mono 500 Latin subsets only. Indic scripts load on demand via `unicode-range`.
- **Inter and Plex Mono have no Indic glyphs.** Transcripts in Devanagari, Tamil, etc. render through the Noto fallbacks above. Never put Indic text in a Mono-uppercase style (uppercase is meaningless there and forces the wrong fallback).

### 3.2 Roles

| Role | Family | Weight | Case | Letter-spacing |
| --- | --- | --- | --- | --- |
| Headings, body, buttons' secondary text, transcripts | Inter | 400 / 500 / 600 | Sentence case | 0 (display: -0.02em) |
| **Labels** (column headers, metric names, chips, axis titles, nav items, button text, field labels) | IBM Plex Mono | 500 | **UPPERCASE** | `0.04em` max |
| **Data values** (IDs, digit strings, amounts, timestamps, latency, code) | IBM Plex Mono | 400 | As-is (mixed case) | 0, `font-variant-numeric: tabular-nums` |

### 3.3 Scale (px / line-height). 4px grid.

| Token | Size / LH | Family | Weight | Use |
| --- | --- | --- | --- | --- |
| `display` | 56 / 60 (mobile 36 / 40) | Inter | 600 | Landing H1 only, ≤ 12 words |
| `h1` | 40 / 48 (mobile 28 / 36) | Inter | 600 | Page titles |
| `h2` | 28 / 36 (mobile 22 / 28) | Inter | 600 | Section titles |
| `h3` | 20 / 28 | Inter | 600 | Panel titles |
| `body-lg` | 18 / 28 | Inter | 400 | Landing lede |
| `body` | 16 / 24 | Inter | 400 | Default |
| `body-sm` | 14 / 20 | Inter | 400 | Dense UI |
| `transcript` | 18 / 28 | Inter + Noto | 400 | Witness transcripts (Indic needs air) |
| `label-lg` | 14 / 20 | Plex Mono | 500 UC | Buttons, nav |
| `label` | 12 / 16 | Plex Mono | 500 UC | Chips, table headers, axis |
| `value-xl` | 48 / 52 | Plex Mono | 400 | Hero metrics |
| `value-lg` | 28 / 32 | Plex Mono | 400 | KPI tiles |
| `value` | 14 / 20 | Plex Mono | 400 | Table cells, IDs |

Minimum rendered text size: 12px. Max line length: 68ch for prose; 80ch for transcripts.

### 3.4 Hallmark overrule, on the record

Hallmark flags "tracked-capital labels" and "an eyebrow above every heading" as machine-made tells. The owner's brand requires Plex Mono capitals. Resolution:

1. Mono capitals are used **functionally** (labels attached to data, buttons, chips, nav). Tracking capped at `0.04em`. Not wide-tracked.
2. **No eyebrow above headings. No numbered section kickers ("01 / HOW IT WORKS").** Headings stand alone.
3. **No single coloured word in a headline.**
4. Record this in the first CSS comment of every generated page: `/* hallmark-overrule: tracked-caps-labels — brand typography; functional use only */`.

---

## 4. Spacing, grid, layout

### 4.1 Spacing scale (Specified; 4px base, Carbon-like 2× progression)

`--s-1: 4px · --s-2: 8px · --s-3: 12px · --s-4: 16px · --s-5: 24px · --s-6: 32px · --s-7: 40px · --s-8: 48px · --s-9: 64px · --s-10: 80px · --s-11: 96px · --s-12: 128px`

Rules: component internal padding uses `s-3`–`s-5`; gaps between panels `s-4` (dense) or `s-5`; landing section vertical padding `s-11` desktop / `s-9` mobile. Never use a value off this scale.

### 4.2 Grid

- 16-column fluid grid, `gutter: 16px` (mobile 8px column gap with 16px page margin).
- Max content width: **1584px** console, **1200px** landing text/diagram container.
- Breakpoints `[unverified, Carbon]`: `sm 320 · md 672 · lg 1056 · xlg 1312 · max 1584`.
- **Mobile-first for `/` and `/app/gauntlet`.** Most LinkedIn clicks arrive on a phone at ~375px. Test at 375, 390, 768, 1024, 1440.

### 4.3 Console shell

- Top bar: 48px, `--navy-850`, bottom border 1px `--navy-300`. Left: wordmark. Right: credits meter, environment tag (`LIVE` / `REPLAY`).
- Left rail: 256px (collapses to 48px icon rail < 1056px; bottom tab bar < 672px).
- Content: padding `s-5` (mobile `s-4`); page title block height 96px.
- Panels: `--navy-850` fill, 1px `--navy-300` border, **0 radius**, padding `s-5`.
- Elevation = layer colour, not shadow. Raised layer = `--navy-800`.

---

## 5. Shape, borders, motion

- **Radius: 0 everywhere.** (Owner preference: zero-radius components.) Exceptions: none. Round avatars and pill chips are not used.
- Borders: 1px. Focus: 2px solid `--navy-500`, offset 2px, rectangular. Never remove outlines.
- Shadows: none. Overlays (modal, toast) use a 1px `--navy-250` border and a `rgba(7,15,31,0.72)` scrim.
- Dividers: 1px `--navy-300` (dark) / `--line-paper` (paper).

### Motion

| Token | Duration | Easing |
| --- | --- | --- |
| `--dur-fast` | 110ms | `cubic-bezier(0.2, 0, 0.38, 0.9)` `[unverified, Carbon productive]` |
| `--dur-base` | 180ms | same |
| `--dur-slow` | 280ms | `cubic-bezier(0, 0, 0.3, 1)` |

Allowed motion (all of it):
1. Witness cards reveal in sequence, 80ms stagger, 8px translate + fade.
2. Verdict stamp lands with a 180ms scale 0.96 → 1 and a 2px border flash.
3. Waveform playhead and noise-level scrub (user-driven, no autoplay).
4. Risk bar fills left-to-right in 280ms.

`prefers-reduced-motion: reduce` → all of the above become instant. No parallax, no looping decorative animation, no autoplaying audio or video.

---

## 6. Components

All components: 0 radius, 1px border, tokens only (no inline hex), keyboard operable, visible focus, `aria-*` correct. Build primitives on Radix (Dialog, Tabs, Tooltip, Slider, Select, Switch); style them yourself. No component library skin.

### Button
| Variant | Fill | Text | Border | Height |
| --- | --- | --- | --- | --- |
| Primary | `--navy-600` (dark) / `--navy-700` (paper) | white | none | 48 (default), 40 (compact), 32 (xs) |
| Secondary | transparent | `--navy-500` | 1px `--navy-500` | same |
| Ghost | transparent | `--text-1` | none | same |
| Danger | `#B3261E` | white | none | same |
Padding: `0 s-5`; label-lg style (Plex Mono UC 14). Icon + label gap `s-2`. Hover (primary on dark): fill `#2F6FDB`, white text (4.75:1, computed). Hover (primary on paper): fill `--navy-900`. Active: fill `--navy-700`. Disabled: `--navy-800` fill, `--text-3` text, `cursor: not-allowed`. Danger fill `#B3261E` with white text is 6.54:1.

### Tag (verdict chip)
Height 24, padding `0 s-2`, label style, 1px border in semantic colour, 12% semantic tint fill, glyph left. Variants: ACCEPT, CONFIRM, ESCALATE, plus neutral `INFO`.

### Input / Select / Slider
Height 40 (48 on landing/mobile). Fill `--navy-800`, bottom border 1px `--navy-250` (Carbon style), full border on focus (2px `--navy-500`). Field label above: label style. Helper text below: body-sm `--text-2`. Error: 1px `#FF7A7A` + message with glyph.

### Data table
Row height 48 (default) / 40 (compact) / 32 (xs). Header: label style, `--navy-800` fill. Zebra none; row hover `--navy-800`. Numeric columns right-aligned, tabular figures. Sticky header. On mobile (< 672) rows convert to key-value cards.

### Tile / Panel
Surface-1 + 1px border + `s-5` padding. Title is `h3`. Optional right-aligned action. Never nest more than two levels.

### Toast, Modal, Tooltip
Modal max-width 560, scrim as above, focus trapped, `Esc` closes. Toast bottom-left, 4s, `role="status"`. Tooltip: 200ms open delay, `body-sm` text (not the mono-caps label style), max-width 280.

### Product-specific components

| Component | Spec |
| --- | --- |
| **WitnessCard** | Surface-2 panel. Header: witness name in Plex Mono UC (`W1 · PRISMA 3.0 · ITN`), latency right-aligned (`620 MS`). Body: transcript (Inter+Noto 18/28) with the entity span underlined 2px in `--navy-500` and a 12% tint. Footer: parsed value in Plex Mono (`₹15,000`) and a tiny agreement dot row. Width: equal columns ≥ 1056; horizontal snap-scroll carousel < 1056 (peek 24px). |
| **EntityDiff** | Aligns the candidate values from all witnesses in a vertical list; the majority value gets a left 2px `--navy-500` bar; outliers get a 2px semantic left bar. Digit-strings show per-position diffs (mismatching digit in `CONFIRM` colour). |
| **RiskMeter** | Segmented horizontal bar, 20 segments, 12px tall, no radius; filled segments take semantic colour of the *decision zone* they fall in; accept/confirm/escalate thresholds drawn as 2px ticks with labels. Numeric risk in `value-lg`. |
| **VerdictStamp** | Rectangular, 2px border in semantic colour, Plex Mono UC 20 with glyph, rotated 0° (no tilt gimmick). Lands once per verdict. `role="status"`. |
| **WaveformPlayer** | Canvas/SVG, 64px tall, `--navy-250` baseline, played region `--navy-500`. Buttons: play, restart. Shows `CLEAN` vs `DEGRADED` toggle. Keyboard: Space toggles, ←/→ seek 1s. |
| **NoiseDial** | Slider (SNR 25 → 0 dB, labelled `QUIET` → `HARSH`) + environment segmented control. Shows the actual dB number in Plex Mono. |
| **ReadbackBubble** | **Not a chat bubble.** A rectangular strip with the Timbre read-back text, a play button and the target language tag. |
| **ReliabilityChart** | SVG. x = predicted risk, y = observed error rate, diagonal reference dashed `--navy-250`, series `--navy-500`, point size = bin count. Axis labels Plex Mono UC 12. Table alternative toggle for a11y. |
| **TradeoffCurve** | x = confirm rate, y = silent error rate. Draggable operating-point marker bound to the `RiskAppetite` slider; readout below in `value-lg`. |
| **CourtRecord** | Vertical audit timeline: timestamp (Plex Mono), event, hash prefix (first 8 chars of the chained SHA-256). 1px left rule `--navy-300`. |
| **CreditsMeter** | Top-bar mini bar showing `LIVE RUNS TODAY 37/150` (Plex Mono UC); turns `CONFIRM` colour at 80%. |

---

## 7. Page specs

### 7.1 Landing `/` (static HTML/CSS, generated and linted with Hallmark)

Adapted from the owner's conversion-centered landing-page framework (see `docs/DECISIONS.md` for what was adopted, adapted, dropped).

**Pre-design checklist (one sentence each, locked):**
1. ONE action: **Run the Gauntlet** (try to fool it with your own voice).
2. ONE outcome: a voice agent that does not act on a misheard amount without checking.
3. ONE trust builder: a **held-out benchmark with confidence intervals, and the failure rate we cannot fix, shown in public.**

**3-second test.** At 375×667 a stranger must be able to answer: what does it do, who is it for, why trust it? Test this on one real person before launch.

Job of the page: get a visitor to run the Gauntlet within 10 seconds, then show the evidence. **No email capture, no newsletter, no logo wall, no invented numbers, no invented testimonials.**

Structure, in order:

1. **Hero (fits one screen at 375×667 and 1440×900).**
   - H1 (`display`, outcome formula "what it does + result"): **"Catch misheard amounts before your voice agent acts on them."**
   - Sub (`body-lg`, one line): "Avow cross-checks several Prisma transcripts of the same call audio, then tells your agent to accept, confirm or escalate."
   - **One** primary CTA: `RUN THE GAUNTLET`. **No secondary CTA in the hero.**
   - Visual metaphor (read before any text): the **Witness Panel** from a real stored benchmark case, three transcripts with the disputed number underlined (2px `--navy-500`): ₹15,000 vs ₹50,000.
   - Directly under the hero, one row of real numbers from `benchmark.latest.json`, phrased as an average with its sample: "Across {N} held-out utterances: silent errors {x}% → {y}% (95% CI …), {z}% confirmed." Never a best case.
2. **Problem, shown not told (about 70% visual).** Waveform + two values: *Caller said ₹15,000 → Agent heard ₹50,000*, with a real playable case. At most 20 words of text.
3. **Evidence (replaces client case studies).** Three real benchmark cases in the format `Case ID + condition + what happened + measured outcome`, then the benchmark chart (reliability + tradeoff) and ablation table. Real files only.
4. **Four steps.** Witnesses → Normalise → Agree → Decide. Five to seven words each, Lucide icons (24px, 1.5 stroke), one style. Inline SVG.
5. **Plug it in.** Tabs `CURL` / `PYTHON`, one request, one response. Copy button.
6. **Trust (replaces testimonials).** There are no customers yet, so there are **no testimonials**. Show: honest limits (unanimous-wrong rate, synthetic-noise caveat), what is stored (public audio: nothing), open repo link, "Built on Gnani Prisma and Timbre". A plain accordion **"Questions engineers ask"** (5 items, e.g. "Can it be fooled?" "What does it cost in extra calls?"). If real people (Gnani Discord testers, mentors) give a quote **with written permission and their real name**, one quote may be added; otherwise leave the slot out.
7. **Final CTA band.** The same `RUN THE GAUNTLET` button, plus one low-friction line: "No sign-up. A 12-second clip." Footer: GitHub, contest hashtags as plain text, licence.

**Brand continuity device (the "strokes" idea).** The 2px `--navy-500` underline under the disputed number is the recurring mark: hero panel, problem section, evidence cases, step diagram highlight, every `WitnessCard` in the console, and the demo video. One mark, repeated, so people remember it.

**Motion on the landing.** Only the Witness reveal and the verdict stamp (section 5). Each ≤ 2 s and every sequence ends on a static state. Nothing animates to compete with the CTA.

Macrostructure guidance for Hallmark: *demo-led with evidence*. Use `custom` (no theme catalog). Invoke with the brief in `PRD.md` Appendix B.

### 7.2 Gauntlet `/app/gauntlet` (public, mobile-first)

Flow: **Consent → Choose language + sample sentence (or record) → Choose environment + noise → Run → Result.**

- Sentence suggestions are synthetic ("Main teen hazaar paanch sau rupaye kal tak jama kar dungi"). A caution line: *"Please don't say real account, Aadhaar, PAN or phone numbers."*
- Recorder: MediaRecorder, max 12s, visible countdown, level meter. Fallback upload button.
- Result: WaveformPlayer (clean vs degraded) → WitnessCards → EntityDiff → RiskMeter → VerdictStamp → ReadbackBubble (play Timbre read-back) → `SHARE RESULT` (generates a 1200×630 OG card server-side: waveform, verdict, disputed number, AVOW wordmark; no user audio).
- Empty / loading / error / rate-limited / cap-reached states are all designed (see 8).

### 7.3 Console `/app`

Left rail: `OVERVIEW`, `GAUNTLET`, `CASE FILES`, `BENCHMARK`, `POLICY`, `COURT RECORD`, `API`. 

| Page | Contents |
| --- | --- |
| Overview | KPI row (silent error rate before/after, catch rate, confirm rate, calls per utterance, p95 latency) from the latest benchmark; reliability chart; recent case files |
| Case Files | Table of benchmark utterances filterable by condition, language, entity type, outcome. Row → Case detail (WitnessCards, EntityDiff, RiskMeter, audio) |
| Benchmark | Run metadata (date, suite, seed, commit hash), condition × language heatmap (table-based, number in cell, no colour-only), ablation table ("which witness earns its credits"), calibration (ECE) |
| Policy | `RiskAppetite` slider bound to the TradeoffCurve; business rules (max amount, expected due) editor; "simulate on benchmark" button (client-side recompute from stored features, no API calls) |
| Court Record | Hash-chained audit log, verify-chain button |
| API | Playground (upload audio, set context, see JSON + verdict), key hint, rate-limit info |

Heatmap cells: show the number; background tint is a redundant encoding only.

---

## 8. States (every view must define all of these)

| State | Treatment |
| --- | --- |
| Loading | Skeleton rows/blocks in `--navy-800`, no shimmer; text `LOADING` label |
| Empty | One-sentence explanation + primary action. No illustration |
| Error | Inline panel: what failed, what to do, `RETRY`. Show `request_id` in Plex Mono |
| Rate limited (429) | "The speech service is busy. Retrying in n s." with visible countdown. Auto-retry ×2 |
| Daily cap reached | Switch to `REPLAY` mode: curated case files, labelled clearly. Never pretend a replay is live |
| Insufficient credit (402) | Operator-only message in console; public sees the cap-reached state |
| Mic denied | Explain, offer file upload |
| Offline | Banner at top, disable run |

Honesty rule: every screen that shows a result labels it `LIVE` or `REPLAY` and `SYNTHETIC` or `YOUR RECORDING`.

---

## 9. Copy and voice

- Plain, specific, calm. Short sentences. Sentence-case headings. No exclamation marks, no emoji in product UI, no "supercharge", "seamless", "unlock", "revolutionary", "AI-powered", "next-gen".
- Numbers are always real and traceable to `benchmark.latest.json`. If a metric isn't measured, don't show it.
- Indic text is shown in its native script alongside Latin transliteration where space allows.
- Error copy owns the failure ("The speech service didn't answer in time"), never "Oops".
- Cinematic naming (Witnesses, Verdict, Court Record, The Gauntlet) is used in marketing surfaces and nav labels. API field names stay technical (`witnesses`, `decision`, `audit`).

---

## 10. Accessibility (WCAG 2.2 AA minimum)

- All text pairs per section 2.4. Verdicts always carry glyph + word.
- Full keyboard path for record → run → result. Focus order follows visual order. Skip link.
- Live regions: `role="status"` on progress and verdict; `aria-live="polite"`.
- Audio never autoplays. Transcripts accompany all audio.
- Target size ≥ 40×40 for touch controls (48 on mobile primary actions).
- Charts have a table toggle and descriptive `aria-label`.
- Language attributes: wrap transcripts in `<span lang="hi">`, `lang="ta"`, etc.
- Respect `prefers-reduced-motion` and `prefers-color-scheme` is **not** used to switch to light in the console (console is dark by design); landing paper sections remain paper.

---

## 11. Tokens (copy into `web/src/styles/tokens.css`)

```css
:root {
  /* navy */
  --navy-950:#070F1F; --navy-900:#0A1A33; --navy-850:#0B1830; --navy-800:#12274D;
  --navy-700:#163F8A; --navy-600:#2A63C8; --navy-500:#5B9BFF; --navy-400:#8EB8FF;
  --navy-300:#27406F; --navy-250:#4A6AA3;
  /* neutrals */
  --text-1:#E8EDF5; --text-2:#A9B7CF; --text-3:#8496B5;
  --paper:#F4F6FA; --paper-2:#FFFFFF; --ink-1:#0A1A33; --ink-2:#44546F; --ink-3:#5E6C86; --line-paper:#D5DCE8;
  /* verdicts (dark) */
  --accept:#3DD68C; --confirm:#F5B942; --escalate:#FF7A7A;
  /* verdicts (paper) */
  --accept-paper:#0E7A4B; --confirm-paper:#8A5A00; --escalate-paper:#B3261E;
  /* spacing */
  --s-1:4px; --s-2:8px; --s-3:12px; --s-4:16px; --s-5:24px; --s-6:32px;
  --s-7:40px; --s-8:48px; --s-9:64px; --s-10:80px; --s-11:96px; --s-12:128px;
  /* shape + motion */
  --radius:0; --border:1px;
  --dur-fast:110ms; --dur-base:180ms; --dur-slow:280ms;
  --ease:cubic-bezier(0.2,0,0.38,0.9); --ease-out:cubic-bezier(0,0,0.3,1);
  /* type */
  --font-sans:"Inter","Noto Sans Devanagari","Noto Sans Tamil","Noto Sans Telugu","Noto Sans Kannada","Noto Sans Bengali","Noto Sans Gujarati","Noto Sans Gurmukhi","Noto Sans Malayalam",system-ui,sans-serif;
  --font-mono:"IBM Plex Mono",ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;
}
.label{font:500 12px/16px var(--font-mono);text-transform:uppercase;letter-spacing:.04em}
.label-lg{font:500 14px/20px var(--font-mono);text-transform:uppercase;letter-spacing:.04em}
.value{font:400 14px/20px var(--font-mono);font-variant-numeric:tabular-nums}
@media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}
```

---

## 12. Hallmark anti-slop checklist (design acceptance)

Source: Hallmark README. Tiers: **Floor** never ships; **Reflex** may be overruled on the record; **Finish** is craft.

**Floor (blockers)**
- [ ] Contrast per section 2.4; visible focus; reduced motion honoured.
- [ ] No invented facts, metrics, customers, logos or testimonials.
- [ ] No broken phone layout at 375px; no horizontal scroll.
- [ ] No form that says "thanks" without actually sending/doing something. (Every button does its job or is absent.)

**Reflex (defaults to avoid)**
- [ ] No eyebrow above every heading; no numbered kickers.
- [ ] No single coloured word in a headline.
- [ ] No page made of empty frames or only photographs; no stock photography at all.
- [ ] Hero fits its screen; no email sign-up at the end of the page.
- [ ] No three-identical-cards-with-icons feature grid. Use the Witness Panel, the diagram and real data instead.
- [ ] Mono-caps overrule recorded (section 3.4).

**Finish**
- [ ] Every number on the page is tabular Plex Mono; digits align in columns.
- [ ] Empty/loading/error/cap states exist for every data view.
- [ ] Copy has been read aloud once for filler.

**Run it**

```bash
npx skills add nutlope/hallmark -g
# Codex CLI invocation (from README): $hallmark custom <brief from PRD Appendix B>
node ~/.agents/skills/hallmark/scripts/sloplint.mjs ./web/landing --render
# browser checks need: npm i -g puppeteer-core  and Chrome installed
```

Fix every Floor failure. Log every Reflex overrule in the CSS header comment. Run `audit` (read-only) on `/app` pages built in React before release.

---

## 12b. UX patterns (from the owner's "20 UX Patterns Every SaaS Needs")

AVOW is a trust tool for a public demo plus an operator console, not a multi-tenant SaaS. Each pattern is **adopted**, **adapted** or **skipped** with a reason. Priorities: **P0** ships, **P1** if ahead, **P2** cut first.

| # | Pattern | Call | How it applies to AVOW | Pri |
| --- | --- | --- | --- | --- |
| 1 | Optimistic UI | **ADAPT (with a hard limit)** | **Never optimistic on a verdict.** Showing ACCEPT before the evidence is in contradicts the product. Allowed only for non-evidential UI: filter chips, policy-slider projections (client-side from stored curve), "recording saved" state, toast on copy | P0 |
| 2 | Skeleton loaders | **ADOPT** | One skeleton `WitnessCard` per witness expected; each fills as its result lands. Table skeleton rows. No shimmer | P0 |
| 3 | Loading and empty states | **ADOPT** | Already in section 8. Empty = one sentence + action. **No illustrations** (keeps the sober tone) | P0 |
| 4 | Autosave | **ADAPT** | Autosave **Policy** edits (risk appetite, business rules) and playground `context` JSON to `localStorage` in our own app. **Never autosave audio** (privacy: public audio is not stored). Show `SAVED LOCALLY` tag | P1 |
| 5 | Debouncing | **ADOPT** | 200 ms on Case Files search and playground JSON validation; 120 ms on the policy-slider recompute. No debounced API calls exist | P0 |
| 6 | Throttling | **ADOPT** | Run button is single-flight: disabled while a run is in flight, 2 s cooldown after. Chart resize via `ResizeObserver` + `requestAnimationFrame`. Server-side per-IP limits already in PRD 12 | P0 |
| 7 | Command palette | **ADAPT** | `Cmd/Ctrl+K` via `cmdk`: jump to page, open case by ID, toggle compact table. Nice for the "enterprise feel" but not core | P2 (≈1 h) |
| 8 | Persistent sidebar | **ADOPT** | Left rail in the console (section 4.3). **Not** on landing or the public Gauntlet | P0 |
| 9 | Keyboard shortcuts | **ADOPT (small set)** | `Space` play/pause, `R` record/stop, `Enter` run, `←` `→` previous/next case, `G` then `C` go to Case Files, `?` opens the list. Shown in a modal. Disabled while typing in inputs | P1 (Space and Enter are P0) |
| 10 | Bulk actions | **ADAPT** | Multi-select cases → **export CSV/JSON** (evidence for an FDE). **No bulk delete**: the benchmark is immutable evidence and the audit log is hash-chained | P1 |
| 11 | Smart form validation | **ADOPT** | Inline validation in the API playground mirroring Gnani's limits (`keyterms` ≤ 200 items, `topic` ≤ 1,600 chars, audio ≤ 30 s / 12 s public) **before** sending; consent checkbox blocks Run with a visible reason | P0 |
| 12 | Reusable data table | **ADOPT** | One `DataTable` component for Case Files, Ablation, Court Record, Usage. Sort, filter, paginate (client-side; N is small). Row heights per section 6 | P0 |
| 13 | Advanced filtering | **ADOPT** | Case Files: condition, language, entity type, outcome (correct accept / caught / silent error), decision. **Filters live in the URL** so a case list is shareable | P0 |
| 14 | Onboarding data capture | **SKIP (principle kept)** | There are no accounts or sign-up. The Gauntlet is the onboarding: **three short steps** (consent, choose, record). We collect nothing else | n/a |
| 15 | Referral / affiliate pages | **SKIP** | The contest bans manufactured engagement; reward-for-share mechanics would look like it. Keep one honest `SHARE RESULT` button instead | n/a |
| 16 | Tier-based indicators | **ADAPT** | Same idea, different axis: `LIVE` / `REPLAY`, `SYNTHETIC` / `YOUR RECORDING`, `PUBLIC` / `OPERATOR` tags in the top bar and on every result. No plans or tiers | P0 |
| 17 | Mobile-optimised layouts | **ADOPT** | Landing and Gauntlet are mobile-first (375px). Console: rail → bottom tabs, tables → key-value cards (sections 4 and 6) | P0 |
| 18 | Custom 404 | **ADOPT** | Branded `404.html` on Hosting and an in-app `NotFound` route: one sentence, links to `RUN THE GAUNTLET` and `CASE FILES`. Same type and tokens | P0 (≈30 min) |
| 19 | Destructive action protection | **ADAPT** | We have almost nothing destructive. The real "destructive" thing is **spending credits**: any action that makes more than 5 live Gnani calls (re-running a suite, bulk playground) shows a confirm modal with the estimated call count and remaining daily budget. Also confirm "Discard recording" and "Reset policy to defaults" | P0 |
| 20 | Graceful error recovery | **ADOPT** | Route-level error boundary; every API error code maps to plain copy and a `RETRY` (table below). Always show `request_id` | P0 |

### Error-code to UI copy (pattern 20)

| API code | Copy | Action |
| --- | --- | --- |
| `invalid_audio` | "We couldn't read that recording. Try again or upload a WAV or MP3." | `RECORD AGAIN` |
| `audio_too_long` | "That clip is longer than 12 seconds. Try a shorter one." | `RECORD AGAIN` |
| `rate_limited` | "The speech service is busy. Retrying in {n} s." | Auto-retry ×2, then `RETRY` |
| `daily_cap_reached` | "Live runs are used up for today. Showing recorded cases instead." | Switch to `REPLAY` |
| `credits_exhausted` | Public: same as `daily_cap_reached`. Operator: "Programme credits are exhausted." | `REPLAY` |
| `asr_unavailable` | "The speech service didn't answer in time. No number was accepted." | `RETRY` |
| `unauthorized` | "That operator key isn't valid." | Re-enter key |
| network offline | Banner: "You're offline." | Run disabled |

### Patterns the list misses that this product needs

- **Evidence before verdict.** Always render witnesses and the disputed value before the `VerdictStamp`. Never the reverse.
- **Microphone permission priming.** One sentence and a button *before* the browser prompt ("We'll ask to use your microphone. Audio isn't stored."). Handle denied, unavailable and busy-device states.
- **Honest provenance on every result** (`LIVE`/`REPLAY`, `SYNTHETIC`/`YOUR RECORDING`), already in section 8.
- **Audio affordances:** visible level meter while recording, countdown, replay of the degraded clip, transcript beside every audio.

## 13. Asset rules

- **Name:** AVOW. Always set in capitals in the wordmark, "Avow" in running text.
- **Wordmark:** live text, never an image. `AVOW` in IBM Plex Mono SemiBold (600), uppercase, 16px in the top bar (20px on landing), letter-spacing 0.04em, colour `--text-1` on dark and `--ink-1` on paper. Real text keeps it crisp, accessible and spelled correctly.
- **Mark (logo glyph):** a flat geometric **A** built from two straight strokes with sharp, zero-radius terminals. The crossbar is the brand's recurring 2px underline in `--navy-500` (the same mark used under the disputed number). Two colours only: `--text-1` (or `--ink-1` on paper) and `--navy-500`. No gradients, no glow, no 3D, no robot, mic or waveform clichés.
- **Lockups:** (a) mark + wordmark horizontal, mark height = cap height of the wordmark × 1.6, gap = mark width × 0.5; (b) mark alone for favicon/app icon on a `--navy-950` square with 20% padding; (c) wordmark alone.
- **Clear space:** the width of the mark's crossbar on every side. **Minimum size:** mark 16px, lockup 96px wide.
- **Production workflow:** generate the mark with an image model (prompts in the project notes), pick one, **vectorise to SVG** (Vectorizer.ai, Illustrator Image Trace or Inkscape), snap to a 24×24 grid, recolour with the tokens above, and **test at 16px**. Ship only the SVG. Do not ship raw AI raster output.
- Favicon: the mark on `--navy-950`, 32×32 SVG plus 180×180 PNG for Apple touch.
- Icons: Lucide, 1.5px stroke, 16/20/24px, always paired with a text label in primary actions.
- No stock photos, no AI-generated imagery, no 3D renders.
- OG card: generated server-side from SVG template (waveform + verdict), 1200×630, Inter + Plex Mono embedded.
