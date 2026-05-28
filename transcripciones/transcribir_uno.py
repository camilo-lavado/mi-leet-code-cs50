"""Transcribe solo chunk_000.mp3 con modelo small (rápido en CPU)."""
from faster_whisper import WhisperModel

ARCHIVO = "chunk_000.mp3"
SALIDA  = "chunk_000_transcripcion.txt"

print(f"Cargando modelo 'medium' en CPU...")
model = WhisperModel("medium", device="cpu", compute_type="int8", cpu_threads=10)
print("Modelo listo. Transcribiendo...")

segments, info = model.transcribe(ARCHIVO, language="en", beam_size=3)

with open(SALIDA, "w", encoding="utf-8") as f:
    for seg in segments:
        print(f"  [{seg.start:.1f}s] {seg.text.strip()}")
        f.write(seg.text.strip() + "\n")

print(f"\nListo. Resultado guardado en: {SALIDA}")
