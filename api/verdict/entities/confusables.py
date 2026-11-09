"""
Phonetically confusable numeral pairs in Indian English and Hinglish telephony.
When an ASR witness produces a token in these pairs, the risk engine flags a confusable risk.
"""

CONFUSABLE_PAIRS: list[tuple[int, int, str, str]] = [
    (15, 50, "pandrah", "pachaas"),
    (16, 60, "solah", "saath"),
    (17, 70, "satrah", "sattar"),
    (18, 80, "atharah", "assi"),
    (13, 30, "terah", "tees"),
    (14, 40, "chaudah", "chaalis"),
    (7, 60, "saat", "saath"),       # saat (7) vs saath (60 / with)
    (15, 50, "fifteen", "fifty"),
    (16, 60, "sixteen", "sixty"),
    (17, 70, "seventeen", "seventy"),
    (18, 80, "eighteen", "eighty"),
    (13, 30, "thirteen", "thirty"),
    (14, 40, "fourteen", "forty"),
]

CONFUSABLE_TOKENS: set[str] = set()
for _, _, w1, w2 in CONFUSABLE_PAIRS:
    CONFUSABLE_TOKENS.add(w1.lower())
    CONFUSABLE_TOKENS.add(w2.lower())


def is_confusable_token(token: str) -> bool:
    """Check if token belongs to any known high-risk confusable pair."""
    return token.lower() in CONFUSABLE_TOKENS


def are_confusable_numbers(n1: int, n2: int) -> bool:
    """Check if two numbers form a confusable acoustic pair."""
    for val1, val2, _, _ in CONFUSABLE_PAIRS:
        if (n1 == val1 and n2 == val2) or (n1 == val2 and n2 == val1):
            return True
    return False

