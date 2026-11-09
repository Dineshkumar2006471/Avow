import asyncio
import os
import subprocess
import edge_tts

OUTPUT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "web", "app", "public", "audio"))
os.makedirs(OUTPUT_DIR, exist_ok=True)

SAMPLES = [
    {
        "filename": "pandrah_clean.mp3",
        "text": "मैडम, मैं पंद्रह हज़ार रुपये अगले सोमवार तक जमा कर दूंगा।",
        "voice": "hi-IN-MadhurNeural",
    },
    {
        "filename": "dhai_lakh.mp3",
        "text": "अरे भाई ढाई लाख का लोन रीपेमेंट कब ड्यू है?",
        "voice": "hi-IN-MadhurNeural",
    },
    {
        "filename": "double_nine.mp3",
        "text": "My reference number is double nine triple zero one two three four.",
        "voice": "en-IN-PrabhatNeural",
    },
    {
        "filename": "saat_saath.mp3",
        "text": "सात हज़ार रुपये आज ही ट्रांसफर कर दिए हैं।",
        "voice": "hi-IN-MadhurNeural",
    },
    {
        "filename": "tamil_15k.mp3",
        "text": "வணக்கம் மேடம், நான் பதினைந்தாயிரம் ரூபாய் நாளைக்கு செலுத்துகிறேன்.",
        "voice": "ta-IN-ValluvarNeural",
    },
    {
        "filename": "readback_hi.mp3",
        "text": "मैंने पंद्रह हज़ार रुपये सुना। क्या यह सही है? हाँ बोलिए, या सही रकम बताइए।",
        "voice": "hi-IN-SwaraNeural",
    },
    {
        "filename": "caller_affirm.mp3",
        "text": "हाँ मैडम, बिल्कुल सही है, पंद्रह हज़ार ही है।",
        "voice": "hi-IN-MadhurNeural",
    },
]

async def synthesize_all():
    print(f"Synthesizing {len(SAMPLES)} audio files into {OUTPUT_DIR}...")
    for s in SAMPLES:
        out_path = os.path.join(OUTPUT_DIR, s["filename"])
        communicate = edge_tts.Communicate(s["text"], s["voice"])
        await communicate.save(out_path)
        print(f"Generated {s['filename']} ({os.path.getsize(out_path)} bytes)")

    # Now create the degraded 8 kHz telephony version of pandrah
    clean_pandrah = os.path.join(OUTPUT_DIR, "pandrah_clean.mp3")
    degraded_pandrah = os.path.join(OUTPUT_DIR, "pandrah_degraded.mp3")
    
    # FFmpeg telephone filter: highpass 300Hz, lowpass 3400Hz, resample 8000Hz, slight compression
    cmd = [
        "ffmpeg", "-y", "-i", clean_pandrah,
        "-af", "highpass=f=300,lowpass=f=3400,volume=1.2",
        "-ar", "8000",
        degraded_pandrah
    ]
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    print(f"Generated degraded telephony sample: pandrah_degraded.mp3 ({os.path.getsize(degraded_pandrah)} bytes)")

if __name__ == "__main__":
    asyncio.run(synthesize_all())

