"""
Gnani Prisma Speech-to-Text (STT) Client.
Interfaces with POST https://api.vachana.ai/stt/v3 through GnaniGate.
"""

from typing import Any
import httpx
import structlog
from pydantic import BaseModel

from verdict.config import settings
from verdict.gnani.gate import gate

logger = structlog.get_logger(__name__)


class SttResponse(BaseModel):
    success: bool
    transcript: str
    detected_language_code: str | None = None
    model: str | None = None
    processing_time: float | None = None
    end_to_end_latency: float | None = None
    request_id: str | None = None
    truncated: bool = False


def _detect_audio_meta(audio_bytes: bytes) -> tuple[str, str]:
    """Detect filename and MIME type from audio magic bytes."""
    if audio_bytes.startswith(b"ID3") or (len(audio_bytes) > 2 and audio_bytes[:2] in (b"\xff\xfb", b"\xff\xf3", b"\xff\xf2")):
        return "audio.mp3", "audio/mpeg"
    if audio_bytes.startswith(b"RIFF"):
        return "audio.wav", "audio/wav"
    if audio_bytes.startswith(b"\x1a\x45\xdf\xa3"):
        return "audio.webm", "audio/webm"
    if audio_bytes.startswith(b"OggS"):
        return "audio.ogg", "audio/ogg"
    return "audio.wav", "audio/wav"


async def transcribe(
    audio_bytes: bytes,
    language_code: str = "hi-IN",
    model: str = "prisma-v3.0",
    format_mode: str = "transcribe",
    topic: str | None = None,
    keyterms: list[str] | None = None,
    previous_text: str | None = None,
    request_id: str | None = None,
) -> SttResponse:
    """Transcribe audio using Gnani Prisma STT via the single-flight gate."""
    cache_key = gate.get_cache_key(
        "stt",
        audio_bytes,
        model=model,
        lang=language_code,
        fmt=format_mode,
        topic=topic,
    )

    async def _call() -> SttResponse:
        url = f"{settings.GNANI_BASE_URL.rstrip('/')}/stt/v3"
        headers = {
            "X-API-Key-ID": settings.GNANI_API_KEY,
        }
        if request_id:
            headers["X-API-Request-ID"] = request_id

        data: dict[str, Any] = {
            "language_code": language_code,
            "format": format_mode,
        }

        # In Prisma API, omit 'model' for v2.5; pass "prisma-v3.0" for v3.0
        if model and "v3" in model.lower():
            data["model"] = "prisma-v3.0"

        if topic:
            data["topic"] = topic[:1600]
        if previous_text:
            data["previous_text"] = previous_text[:600]
        if keyterms:
            data["keyterms"] = ",".join(keyterms[:200])

        filename, mime = _detect_audio_meta(audio_bytes)
        files = {
            "audio_file": (filename, audio_bytes, mime),
        }

        async with httpx.AsyncClient(timeout=10.0) as client:
            resp = await client.post(url, headers=headers, data=data, files=files)

            if resp.status_code != 200:
                logger.error(
                    "gnani_stt_error_response",
                    status_code=resp.status_code,
                    body=resp.text,
                )
                resp.raise_for_status()

            payload = resp.json()
            return SttResponse(
                success=payload.get("success", True),
                transcript=payload.get("transcript", ""),
                detected_language_code=payload.get("detected_language_code"),
                model=payload.get("model", model),
                processing_time=payload.get("processing_time"),
                end_to_end_latency=payload.get("end_to_end_latency"),
                request_id=payload.get("request_id"),
                truncated=payload.get("truncated", False),
            )

    return await gate.execute(_call, call_type="stt", cache_key=cache_key)

