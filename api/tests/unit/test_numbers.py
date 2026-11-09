"""
Unit tests for Indic number parsing against all 26 golden cases in PRD §7.2.
"""

import pytest
from verdict.entities.numbers import parse_amount, parse_digit_string


@pytest.mark.parametrize(
    "spoken,expected",
    [
        ("paanch hazaar", 5000),
        ("pandrah hazaar", 15000),
        ("pachaas hazaar", 50000),
        ("unchaas hazaar", 49000),
        ("dedh hazaar", 1500),
        ("dhai hazaar", 2500),
        ("sadhe saat hazaar", 7500),
        ("dhai lakh", 250000),
        ("sava lakh", 125000),
        ("sadhe teen lakh", 350000),
        ("paune do lakh", 175000),
        ("ek crore", 10000000),
        ("bees hazaar paanch sau", 20500),
        ("teen hazaar paanch sau pachaas", 3550),
        ("two lakh fifty thousand", 250000),
        ("2.5 lakh", 250000),
        ("₹2,50,000", 250000),
        ("१५,०००", 15000),
    ],
)
def test_golden_amounts(spoken: str, expected: int):
    candidates = parse_amount(spoken, lang="hi")
    assert candidates, f"Failed to parse any candidate from: '{spoken}'"
    assert candidates[0].value == expected, f"Expected {expected}, got {candidates[0].value} for '{spoken}'"


def test_digit_mode_repeat_prefixes():
    res = parse_digit_string("double nine triple zero")
    assert res, "Failed to parse digit string"
    assert res[0].value == "99000"


def test_confusable_flagging():
    res_15 = parse_amount("pandrah hazaar")
    assert res_15[0].is_confusable is True

    res_50 = parse_amount("pachaas hazaar")
    assert res_50[0].is_confusable is True


def test_are_confusable_numbers_multipliers():
    from verdict.entities.confusables import are_confusable_numbers

    # Raw base pairs
    assert are_confusable_numbers(15, 50) is True
    assert are_confusable_numbers(50, 15) is True
    assert are_confusable_numbers(7, 60) is True
    assert are_confusable_numbers(60, 7) is True

    # Thousands pairs
    assert are_confusable_numbers(15000, 50000) is True
    assert are_confusable_numbers(50000, 15000) is True
    assert are_confusable_numbers(7000, 60000) is True

    # Hundreds and lakhs pairs
    assert are_confusable_numbers(1500, 5000) is True
    assert are_confusable_numbers(1500000, 5000000) is True

    # Non-confusable pairs
    assert are_confusable_numbers(15000, 15000) is False
    assert are_confusable_numbers(10000, 20000) is False


