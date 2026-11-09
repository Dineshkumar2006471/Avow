"""
GnaniGate: Process-wide single-flight gate and rate-limiting wrapper for Gnani API calls.
Protects the 5,000 credit budget and enforces the 1-concurrency constraint.
"""

import asyncio
import hashlib
import random
from typing import Any, Callable, Coroutine
import structlog
from verdict.config import settings

logger = structlog.get_logger(__name__)


class GnaniGate:
    def __init__(self, concurrency: int = 1):
        self._semaphore = asyncio.Semaphore(concurrency)
        self.credits_exhausted: bool = False
        self.total_stt_calls: int = 0
        self.total_tts_calls: int = 0
        self._cache: dict[str, Any] = {}

    def get_cache_key(self, prefix: str, data: bytes, **params: Any) -> str:
        """Compute SHA-256 fingerprint of audio and request parameters."""
        hasher = hashlib.sha256()
        hasher.update(data)
        for k, v in sorted(params.items()):
            if v is not None:
                hasher.update(f"{k}:{v}".encode("utf-8"))
        return f"{prefix}:{hasher.hexdigest()}"

    def get_cached(self, cache_key: str) -> Any | None:
        return self._cache.get(cache_key)

    def set_cached(self, cache_key: str, result: Any) -> None:
        self._cache[cache_key] = result

    async def execute(
        self,
        call_fn: Callable[[], Coroutine[Any, Any, Any]],
        call_type: str = "stt",
        cache_key: str | None = None,
    ) -> Any:
        """Execute a Gnani API request under the single-flight gate with exponential backoff."""
        if self.credits_exhausted:
            logger.error("gnani_credits_exhausted", message="Credits exhausted, call blocked")
            raise RuntimeError("CREDITS_EXHAUSTED: Gnani AI programme credits have been exhausted.")

        # Check in-memory cache first
        if cache_key:
            cached = self.get_cached(cache_key)
            if cached is not None:
                logger.info("gnani_cache_hit", key=cache_key)
                return cached

        max_attempts = 3
        backoffs = [0.5, 1.5, 3.5]

        async with self._semaphore:
            for attempt in range(max_attempts):
                try:
                    res = await call_fn()

                    # Accounting
                    if call_type == "stt":
                        self.total_stt_calls += 1
                    else:
                        self.total_tts_calls += 1

                    # Cache successful result
                    if cache_key:
                        self.set_cached(cache_key, res)

                    return res

                except Exception as exc:
                    err_str = str(exc)
                    # Check for credit exhaustion (HTTP 402)
                    if "402" in err_str or "INSUFFICIENT_CREDITS" in err_str:
                        self.credits_exhausted = True
                        logger.critical("gnani_402_insufficient_credits", error=err_str)
                        raise

                    # Check client validation errors (HTTP 400, 401, 403, 422) - DO NOT RETRY
                    if any(c in err_str for c in ("400", "401", "403", "422")):
                        logger.error("gnani_client_error", error=err_str)
                        raise

                    # Check rate limits (429) or upstream errors (500, 503, 504) -> Backoff & retry
                    if attempt < max_attempts - 1:
                        sleep_time = backoffs[attempt] + random.uniform(-0.15, 0.15)
                        logger.warning(
                            "gnani_retry_backoff",
                            attempt=attempt + 1,
                            sleep=sleep_time,
                            error=err_str,
                        )
                        await asyncio.sleep(sleep_time)
                    else:
                        logger.error("gnani_max_retries_exceeded", error=err_str)
                        raise


# Process-wide singleton gate
gate = GnaniGate(concurrency=settings.GNANI_MAX_CONCURRENCY)

