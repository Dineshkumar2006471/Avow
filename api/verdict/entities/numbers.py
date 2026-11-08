"""
Indian Language & Hinglish Number Parser.
Implements ITN (Inverse Text Normalisation) extraction and phonetic word-path parsing.
"""

import re
from typing import NamedTuple
from rapidfuzz import process, fuzz

from verdict.entities.lexicon_hi import (
    HINDI_NUMBERS,
    MULTIPLIERS,
    FRACTION_STANDALONE,
    REPEAT_PREFIXES,
)
from verdict.entities.confusables import is_confusable_token


class AmountCandidate(NamedTuple):
    value: int
    raw_span: str
    is_confusable: bool = False
    source: str = "itn"  # "itn" or "word"


class DigitStringCandidate(NamedTuple):
    value: str
    raw_span: str
    is_confusable: bool = False


# Map native Devanagari digits to ASCII
DEVANAGARI_DIGITS = {
    "०": "0", "१": "1", "२": "2", "३": "3", "४": "4",
    "५": "5", "६": "6", "७": "7", "८": "8", "९": "9",
}


def normalize_script_digits(text: str) -> str:
    """Convert native Indic digits (e.g. Devanagari ०-९) to ASCII 0-9."""
    for dev, ascii_digit in DEVANAGARI_DIGITS.items():
        text = text.replace(dev, ascii_digit)
    return text


def parse_itn_amount(text: str) -> list[AmountCandidate]:
    """Parse amounts already formatted with digits by ITN (e.g. ₹15,000, 2.5 lakh, 15000)."""
    candidates: list[AmountCandidate] = []
    text_clean = normalize_script_digits(text)

    # Pattern 1: e.g. "2.5 lakh", "1.5 crore", "10 hazaar"
    mult_pattern = re.compile(
        r"(?:₹|rs\.?|inr)?\s*(\d+(?:\.\d+)?)\s*(lakh|lac|crore|karod|hazaar|hazar|thousand|sau|hundred)",
        re.IGNORECASE,
    )
    for m in mult_pattern.finditer(text_clean):
        base_num = float(m.group(1))
        unit = m.group(2).lower()
        mult = MULTIPLIERS.get(unit, 1)
        val = int(round(base_num * mult))
        candidates.append(AmountCandidate(value=val, raw_span=m.group(0), source="itn"))

    # Pattern 2: e.g. "₹2,50,000", "₹15000", "15,000"
    num_pattern = re.compile(r"(?:₹|rs\.?|inr)?\s*(\d{1,3}(?:,\d{2,3})*(?:\.\d+)?|\d+)", re.IGNORECASE)
    for m in num_pattern.finditer(text_clean):
        # Ignore if part of an already parsed multiplier candidate
        if any(m.group(0) in c.raw_span for c in candidates):
            continue
        cleaned = m.group(1).replace(",", "")
        try:
            val = int(float(cleaned))
            if val > 0:
                candidates.append(AmountCandidate(value=val, raw_span=m.group(0), source="itn"))
        except ValueError:
            pass

    return candidates


def parse_word_amount(text: str) -> list[AmountCandidate]:
    """Parse spoken Hindi / Hinglish / English amount words into integer value."""
    text_clean = normalize_script_digits(text.lower())
    words = re.findall(r"[\w\u0900-\u097f]+", text_clean)

    if not words:
        return []

    candidates: list[AmountCandidate] = []
    i = 0
    total = 0
    current_unit_val = 0
    has_match = False
    confusable_flag = False

    while i < len(words):
        w = words[i]

        if is_confusable_token(w):
            confusable_flag = True

        # Check standalone fractions: "dedh" (1.5) or "dhai" (2.5)
        if w in FRACTION_STANDALONE:
            frac = FRACTION_STANDALONE[w]
            # Next word could be a multiplier: e.g. "dhai lakh", "dedh hazaar"
            if i + 1 < len(words) and words[i + 1] in MULTIPLIERS:
                mult = MULTIPLIERS[words[i + 1]]
                val = int(round(frac * mult))
                total += val
                has_match = True
                i += 2
                continue
            else:
                current_unit_val += frac
                i += 1
                continue

        # Check modifier fractions: "sava" (+0.25), "sadhe" (+0.5), "paune" (-0.25)
        if w in ("sava", "सवा"):
            # e.g. "sava lakh" -> 1.25 * 100,000 = 125,000
            # or "sava do lakh" -> 2.25 * 100,000 = 225,000
            if i + 1 < len(words) and words[i + 1] in MULTIPLIERS:
                mult = MULTIPLIERS[words[i + 1]]
                val = int(round(1.25 * mult))
                total += val
                has_match = True
                i += 2
                continue
            elif i + 2 < len(words) and words[i + 1] in HINDI_NUMBERS and words[i + 2] in MULTIPLIERS:
                base = HINDI_NUMBERS[words[i + 1]] + 0.25
                mult = MULTIPLIERS[words[i + 2]]
                val = int(round(base * mult))
                total += val
                has_match = True
                i += 3
                continue

        if w in ("sadhe", "साढ़े"):
            # e.g. "sadhe saat hazaar" -> 7.5 * 1,000 = 7,500
            # or "sadhe teen lakh" -> 3.5 * 100,000 = 350,000
            if i + 2 < len(words) and words[i + 1] in HINDI_NUMBERS and words[i + 2] in MULTIPLIERS:
                base = HINDI_NUMBERS[words[i + 1]] + 0.5
                mult = MULTIPLIERS[words[i + 2]]
                val = int(round(base * mult))
                total += val
                has_match = True
                i += 3
                continue

        if w in ("paune", "पौने"):
            # e.g. "paune do lakh" -> 1.75 * 100,000 = 175,000
            if i + 2 < len(words) and words[i + 1] in HINDI_NUMBERS and words[i + 2] in MULTIPLIERS:
                base = HINDI_NUMBERS[words[i + 1]] - 0.25
                mult = MULTIPLIERS[words[i + 2]]
                val = int(round(base * mult))
                total += val
                has_match = True
                i += 3
                continue

        # Check 0-99 numbers
        if w in HINDI_NUMBERS:
            current_unit_val += HINDI_NUMBERS[w]
            has_match = True
            i += 1
            continue

        # Check multipliers: "sau", "hazaar", "lakh", "crore"
        if w in MULTIPLIERS:
            mult = MULTIPLIERS[w]
            if current_unit_val == 0:
                current_unit_val = 1
            total += current_unit_val * mult
            current_unit_val = 0
            has_match = True
            i += 1
            continue

        i += 1

    total += int(current_unit_val)

    if has_match and total > 0:
        candidates.append(
            AmountCandidate(
                value=total,
                raw_span=text,
                is_confusable=confusable_flag,
                source="word",
            )
        )

    return candidates


def parse_amount(text: str, lang: str = "hi") -> list[AmountCandidate]:
    """Unified entry point for Amount extraction. Combines ITN and Word paths."""
    # 1. Try ITN path first if digits are present
    itn_results = parse_itn_amount(text)
    if itn_results:
        return itn_results

    # 2. Try Word path for purely spoken words
    return parse_word_amount(text)


def parse_digit_string(text: str) -> list[DigitStringCandidate]:
    """Parse digit-by-digit utterances with repeat prefixes (double, triple)."""
    text_clean = normalize_script_digits(text.lower())
    words = re.findall(r"[\w\u0900-\u097f]+", text_clean)

    digit_tokens: list[str] = []
    repeat_count = 1
    confusable = False

    for w in words:
        if is_confusable_token(w):
            confusable = True

        if w in REPEAT_PREFIXES:
            repeat_count = REPEAT_PREFIXES[w]
            continue

        # Check if single digit (0-9)
        if w in HINDI_NUMBERS and HINDI_NUMBERS[w] < 10:
            digit_tokens.append(str(HINDI_NUMBERS[w]) * repeat_count)
            repeat_count = 1
            continue
        elif w.isdigit():
            digit_tokens.append(w * repeat_count)
            repeat_count = 1
            continue

    if digit_tokens:
        result_str = "".join(digit_tokens)
        return [DigitStringCandidate(value=result_str, raw_span=text, is_confusable=confusable)]

    return []
