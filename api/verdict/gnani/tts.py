"""
Gnani Timbre Text-to-Speech (TTS) Client.
Interfaces with POST https://api.vachana.ai/api/v1/tts/inference through GnaniGate.
"""

import httpx
import structlog
from verdict.config import settings
from verdict.gnani.gate import gate

logger = structlog.get_logger(__name__)


async def synthesize_speech(
    text: str,
    voice: str = "Avinash",
    model: str = "timbre-v3.0",
    language: str = "hi-IN",
    speed: float = 1.0,
    request_id: str | None = None,
) -> bytes:
    """Synthesize speech audio (WAV) using Gnani Timbre TTS via the single-flight gate."""
    cache_key = gate.get_cache_key(
        "tts",
        text.encode("utf-8"),
        voice=voice,
        model=model,
        lang=language,
        speed=speed,
    )

    async def _call() -> bytes:
        url = f"{settings.GNANI_BASE_URL.rstrip('/')}/api/v1/tts/inference"
        headers = {
            "X-API-Key-ID": settings.GNANI_API_KEY,
            "Content-Type": "application/json",
        }
        if request_id:
            headers["X-API-Request-ID"] = request_id

        payload = {
            "text": text,
            "voice": voice,
            "model": model,
            "language": language,
            "speed": speed,
            "audio_config": {
                "sample_rate": 16000,
                "num_channels": 1,
                "sample_width": 2,
                "encoding": "linear_pcm",
                "container": "wav",
            },
        }

        async with httpx.AsyncClient(timeout=15.0) as client:
            resp = await client.post(url, headers=headers, json=payload)

            if resp.status_code != 200:
                logger.error(
                    "gnani_tts_error_response",
                    status_code=resp.status_code,
                    body=resp.text,
                )
                resp.raise_for_status()

            return resp.content  # Binary WAV audio

    return await gate.execute(_call, call_type="tts", cache_key=cache_key)

