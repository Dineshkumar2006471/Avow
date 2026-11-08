"""
AVOW Panel Orchestrator.
Coordinates the adaptive multi-witness examination (Stage A -> Stage B) of audio,
calculates agreement, features, calibrated risk, and final verdict decisions.
"""

from typing import Any, NamedTuple
import structlog

from verdict.gnani.stt import transcribe, SttResponse
from verdict.entities.numbers import parse_amount, parse_digit_string, AmountCandidate
from verdict.entities.confusables import are_confusable_numbers

logger = structlog.get_logger(__name__)


class WitnessResult(NamedTuple):
    witness_id: str
    model: str
    format_mode: str
    transcript: str
    detected_lang: str | None
    latency_ms: int
    candidates: list[AmountCandidate]


class PanelVerdict(NamedTuple):
    decision: str  # "ACCEPT", "CONFIRM", "ESCALATE"
    reason: str
    risk_score: float
    consensus_value: int | str | None
    witness_results: list[WitnessResult]
    candidate_breakdown: list[dict[str, Any]]
    is_confusable: bool
    stt_calls_count: int


async def run_panel(
    audio_bytes: bytes,
    language_hint: str = "hi-IN",
    expect: list[str] | None = None,
    context: dict[str, Any] | None = None,
    policy: dict[str, Any] | None = None,
    verdict_id: str = "vd_test",
) -> PanelVerdict:
    """Execute adaptive witness panel on audio bytes."""
    context = context or {}
    policy = policy or {}
    accept_threshold = float(policy.get("tau_accept", 0.15))
    escalate_threshold = float(policy.get("tau_escalate", 0.85))

    topic = context.get("topic")
    prev_text = context.get("last_agent_prompt") or context.get("previous_text")
    expected_amount = context.get("business_rules", {}).get("expected_amount_due")
    max_amount = context.get("business_rules", {}).get("max_amount", 5000000)

    witness_results: list[WitnessResult] = []
    stt_calls = 0

    # -------------------------------------------------------------
    # STAGE A: W1 (Prisma v3.0 ITN) and W4 (Prisma v2.5 Decorrelated)
    # -------------------------------------------------------------
    # W1
    w1_resp: SttResponse = await transcribe(
        audio_bytes=audio_bytes,
        language_code=language_hint,
        model="prisma-v3.0",
        format_mode="transcribe",
        request_id=f"{verdict_id}.W1",
    )
    stt_calls += 1
    w1_cand = parse_amount(w1_resp.transcript, lang=language_hint)
    witness_results.append(
        WitnessResult(
            witness_id="W1",
            model="prisma-v3.0",
            format_mode="transcribe",
            transcript=w1_resp.transcript,
            detected_lang=w1_resp.detected_language_code,
            latency_ms=int((w1_resp.processing_time or 0.6) * 1000),
            candidates=w1_cand,
        )
    )

    # W4 (Prisma v2.5)
    w4_resp: SttResponse = await transcribe(
        audio_bytes=audio_bytes,
        language_code=language_hint,
        model="prisma-v2.5",
        format_mode="transcribe",
        request_id=f"{verdict_id}.W4",
    )
    stt_calls += 1
    w4_cand = parse_amount(w4_resp.transcript, lang=language_hint)
    witness_results.append(
        WitnessResult(
            witness_id="W4",
            model="prisma-v2.5",
            format_mode="transcribe",
            transcript=w4_resp.transcript,
            detected_lang=w4_resp.detected_language_code,
            latency_ms=int((w4_resp.processing_time or 0.7) * 1000),
            candidates=w4_cand,
        )
    )

    val_w1 = w1_cand[0].value if w1_cand else None
    val_w4 = w4_cand[0].value if w4_cand else None

    stage_a_agreement = val_w1 is not None and val_w1 == val_w4

    # -------------------------------------------------------------
    # STAGE B: Escalated witnesses if Stage A disagrees or is empty
    # -------------------------------------------------------------
    if not stage_a_agreement:
        # W2: Transliterated Latin word format
        w2_resp: SttResponse = await transcribe(
            audio_bytes=audio_bytes,
            language_code=language_hint,
            model="prisma-v3.0",
            format_mode="transliterate",
            request_id=f"{verdict_id}.W2",
        )
        stt_calls += 1
        w2_cand = parse_amount(w2_resp.transcript, lang=language_hint)
        witness_results.append(
            WitnessResult(
                witness_id="W2",
                model="prisma-v3.0",
                format_mode="transliterate",
                transcript=w2_resp.transcript,
                detected_lang=w2_resp.detected_language_code,
                latency_ms=int((w2_resp.processing_time or 0.65) * 1000),
                candidates=w2_cand,
            )
        )

        # W5: Context-Informed
        w5_resp: SttResponse = await transcribe(
            audio_bytes=audio_bytes,
            language_code=language_hint,
            model="prisma-v3.0",
            format_mode="transcribe",
            topic=topic,
            previous_text=prev_text,
            request_id=f"{verdict_id}.W5",
        )
        stt_calls += 1
        w5_cand = parse_amount(w5_resp.transcript, lang=language_hint)
        witness_results.append(
            WitnessResult(
                witness_id="W5",
                model="prisma-v3.0",
                format_mode="transcribe",
                transcript=w5_resp.transcript,
                detected_lang=w5_resp.detected_language_code,
                latency_ms=int((w5_resp.processing_time or 0.7) * 1000),
                candidates=w5_cand,
            )
        )

    # -------------------------------------------------------------
    # Consensus, Confusable Analysis & Risk Computation
    # -------------------------------------------------------------
    value_votes: dict[int, list[str]] = {}
    any_confusable = False

    for w in witness_results:
        if w.candidates:
            c = w.candidates[0]
            val = c.value
            value_votes.setdefault(val, []).append(w.witness_id)
            if c.is_confusable:
                any_confusable = True

    # Identify majority consensus
    consensus_value = None
    majority_count = 0
    total_parsed = sum(len(v) for v in value_votes.values())

    for val, witnesses in value_votes.items():
        if len(witnesses) > majority_count:
            majority_count = len(witnesses)
            consensus_value = val

    agreement_ratio = (majority_count / total_parsed) if total_parsed > 0 else 0.0
    coverage = len(witness_results) / (len(witness_results))

    # Business rule penalty
    business_violation = False
    if consensus_value is not None:
        if consensus_value > max_amount:
            business_violation = True
        elif expected_amount and (consensus_value > 10 * expected_amount or consensus_value < 0.1 * expected_amount):
            business_violation = True

    # Check confusable pairs between candidates
    distinct_vals = list(value_votes.keys())
    if len(distinct_vals) >= 2:
        if are_confusable_numbers(distinct_vals[0], distinct_vals[1]):
            any_confusable = True

    # Calculate Risk Score (v0 rule formula from PRD §7.4)
    # risk = clip(1 - agreement * coverage + 0.15 * confusable + 0.25 * business_violation, 0, 1)
    base_risk = 1.0 - (agreement_ratio * coverage)
    if any_confusable:
        base_risk += 0.20
    if business_violation:
        base_risk += 0.35
    if len(distinct_vals) > 1:
        base_risk += 0.15

    risk_score = round(max(0.0, min(1.0, base_risk)), 3)

    # Formulate Decision
    if risk_score < accept_threshold and consensus_value is not None:
        decision = "ACCEPT"
        reason = "Unanimous or high-agreement consensus across independent witnesses."
    elif risk_score >= escalate_threshold or business_violation:
        decision = "ESCALATE"
        reason = "Acoustic or business rule violation exceeds escalation threshold."
    else:
        decision = "CONFIRM"
        reason = f"Witnesses disagree ({distinct_vals}). Readback verification required."

    # Build Candidate Breakdown
    breakdown = []
    for val, w_ids in value_votes.items():
        breakdown.append(
            {
                "value": f"₹{val:,}" if isinstance(val, int) else str(val),
                "witnesses": w_ids,
                "isMajority": val == consensus_value,
                "status": "consensus" if val == consensus_value else "disputed",
            }
        )

    return PanelVerdict(
        decision=decision,
        reason=reason,
        risk_score=risk_score,
        consensus_value=consensus_value,
        witness_results=witness_results,
        candidate_breakdown=breakdown,
        is_confusable=any_confusable,
        stt_calls_count=stt_calls,
    )
