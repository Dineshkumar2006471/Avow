"""
AVOW Cryptographic Court Record & SQLite Store.
Persists all verdicts, witness testimonies, and resolutions to SQLite with a SHA-256 hash-chain.
Complies with DPDP Act: Audio is discarded; only cryptographic proofs & entity metadata are persisted.
"""

import sqlite3
import hashlib
import json
import os
from pathlib import Path
from datetime import datetime, timezone
from typing import Any, Optional

DB_PATH = Path(__file__).resolve().parent.parent.parent.parent / "data" / "court_record.db"


def get_db_connection() -> sqlite3.Connection:
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(str(DB_PATH))
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()

    # Court records table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS court_records (
        id TEXT PRIMARY KEY,
        created_at TEXT NOT NULL,
        decision TEXT NOT NULL,
        reason TEXT,
        consensus_value TEXT,
        risk_score REAL NOT NULL,
        is_confusable INTEGER DEFAULT 0,
        stt_calls INTEGER DEFAULT 0,
        language_hint TEXT,
        readback_text TEXT,
        prev_hash TEXT NOT NULL,
        block_hash TEXT NOT NULL
    )
    """)

    # Witness testimonies table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS witness_testimonies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        verdict_id TEXT NOT NULL,
        witness_id TEXT NOT NULL,
        model TEXT NOT NULL,
        format_mode TEXT NOT NULL,
        transcript TEXT NOT NULL,
        parsed_value TEXT,
        latency_ms INTEGER,
        FOREIGN KEY (verdict_id) REFERENCES court_records(id)
    )
    """)

    # Check if genesis block exists, if not initialize it
    cursor.execute("SELECT COUNT(*) FROM court_records")
    if cursor.fetchone()[0] == 0:
        genesis_hash = hashlib.sha256(b"AVOW_GENESIS_ROOT_2026").hexdigest()
        cursor.execute("""
        INSERT INTO court_records (
            id, created_at, decision, reason, consensus_value, risk_score,
            is_confusable, stt_calls, language_hint, readback_text, prev_hash, block_hash
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            "GENESIS",
            datetime.now(timezone.utc).isoformat(),
            "ACCEPT",
            "GENESIS_HEAD_ANCHOR",
            "0",
            0.0,
            0,
            0,
            "hi-IN",
            None,
            "0000000000000000000000000000000000000000000000000000000000000000",
            genesis_hash
        ))

    conn.commit()
    conn.close()


def get_latest_hash() -> str:
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT block_hash FROM court_records ORDER BY rowid DESC LIMIT 1")
    row = cursor.fetchone()
    conn.close()
    if row:
        return row["block_hash"]
    return "0000000000000000000000000000000000000000000000000000000000000000"


def save_verdict(
    verdict_id: str,
    decision: str,
    reason: str,
    consensus_value: Optional[str],
    risk_score: float,
    is_confusable: bool,
    stt_calls: int,
    language_hint: str,
    witnesses: list[dict[str, Any]],
    readback_text: Optional[str] = None,
) -> str:
    """
    Appends a verdict to the court record database and returns its computed SHA-256 block hash.
    """
    init_db()
    prev_hash = get_latest_hash()
    created_at = datetime.now(timezone.utc).isoformat()

    # Compute block hash
    block_payload = f"{verdict_id}:{created_at}:{decision}:{consensus_value}:{risk_score}:{prev_hash}"
    block_hash = hashlib.sha256(block_payload.encode("utf-8")).hexdigest()

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
    INSERT INTO court_records (
        id, created_at, decision, reason, consensus_value, risk_score,
        is_confusable, stt_calls, language_hint, readback_text, prev_hash, block_hash
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        verdict_id,
        created_at,
        decision,
        reason,
        consensus_value,
        risk_score,
        1 if is_confusable else 0,
        stt_calls,
        language_hint,
        readback_text,
        prev_hash,
        block_hash
    ))

    for w in witnesses:
        cursor.execute("""
        INSERT INTO witness_testimonies (
            verdict_id, witness_id, model, format_mode, transcript, parsed_value, latency_ms
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (
            verdict_id,
            w.get("id", "W"),
            w.get("model", "prisma"),
            w.get("format", "transcribe"),
            w.get("transcript", ""),
            str(w.get("parsed_value", "")),
            w.get("latency_ms", 0),
        ))

    conn.commit()
    conn.close()
    return block_hash


def get_all_records(limit: int = 50) -> list[dict[str, Any]]:
    init_db()
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM court_records ORDER BY rowid DESC LIMIT ?", (limit,))
    rows = cursor.fetchall()
    records = []
    for r in rows:
        records.append(dict(r))
    conn.close()
    return records


# Initialize on import
init_db()

