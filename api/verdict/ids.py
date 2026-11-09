"""
ID generation utilities for AVOW.
Generates sorted, collision-resistant prefixed identifiers (e.g. vd_01JC...).
"""

import time
import secrets


def generate_id(prefix: str = "vd") -> str:
    """Generate a time-sortable hex identifier with the given prefix."""
    timestamp_ms = int(time.time() * 1000)
    random_suffix = secrets.token_hex(6)
    return f"{prefix}_{timestamp_ms:x}{random_suffix}"

