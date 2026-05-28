"""
=============================================================================
PRUEBA RÁPIDA — GPU (transcribe solo chunk_007.mp3)
=============================================================================

Sirve para verificar que CUDA y faster-whisper funcionan correctamente
antes de lanzar la transcripción completa con transcribir_gpu.py.

INSTALACIÓN:
    pip install faster-whisper nvidia-cublas-cu12

CÓMO EJECUTAR:
    python transcribir_uno_gpu.py

RESULTADO:
    chunk_007_transcripcion_gpu.txt  — con timestamps por segmento
=============================================================================
"""

import os
import sys
import time
from datetime import timedelta

# ---------------------------------------------------------------------------
# Inyectar cublas en PATH automáticamente (evita el error cublas64_12.dll)
# ---------------------------------------------------------------------------
def _patch_cublas_path():
    import site
    candidates = [site.getusersitepackages()] + site.getsitepackages()
    for base in candidates:
        p = os.path.join(base, "nvidia", "cublas", "bin")
        if os.path.isdir(p):
            os.environ["PATH"] = p + os.pathsep + os.environ.get("PATH", "")
            return p
    return None

_cublas_path = _patch_cublas_path()

# ---------------------------------------------------------------------------

try:
    from faster_whisper import WhisperModel
except ImportError:
    print("ERROR: faster-whisper no está instalado.")
    print("       pip install faster-whisper")
    sys.exit(1)

ARCHIVO      = "chunk_007.mp3"
SALIDA       = "chunk_007_transcripcion_gpu.txt"
MODEL        = "medium"
DEVICE       = "cuda"
COMPUTE_TYPE = "float16"
LANGUAGE     = "en"
BEAM_SIZE    = 5

def fmt_duration(seconds):
    return str(timedelta(seconds=int(seconds)))

print("=" * 58)
print("  Prueba GPU — faster-whisper", MODEL)
print("=" * 58)
print(f"  Archivo : {ARCHIVO}")
print(f"  Modelo  : {MODEL}  |  {DEVICE.upper()}  |  {COMPUTE_TYPE}")
print(f"  Idioma  : {LANGUAGE}")
if _cublas_path:
    print(f"  cublas  : {_cublas_path}")
else:
    print("  ADVERTENCIA: cublas no encontrado — puede fallar")
print()

if not os.path.exists(ARCHIVO):
    print(f"ERROR: No se encontró {ARCHIVO} en esta carpeta.")
    sys.exit(1)

print("Cargando modelo (puede tardar ~10s si ya está en caché)...")
t0 = time.time()
try:
    model = WhisperModel(MODEL, device=DEVICE, compute_type=COMPUTE_TYPE)
except Exception as e:
    print(f"\nERROR al cargar el modelo: {e}")
    print("Verifica con: nvidia-smi")
    sys.exit(1)
print(f"Modelo listo en {time.time() - t0:.1f}s\n")

print("Transcribiendo...")
t1 = time.time()

try:
    segments, info = model.transcribe(
        ARCHIVO,
        language=LANGUAGE,
        beam_size=BEAM_SIZE,
        vad_filter=True,
        vad_parameters={"min_silence_duration_ms": 500},
    )
except Exception as e:
    print(f"ERROR durante transcripción: {e}")
    sys.exit(1)

lines = []
for seg in segments:
    ts = fmt_duration(seg.start)
    linea = f"[{ts}]  {seg.text.strip()}"
    print(f"  {linea}")
    lines.append(linea)

elapsed = time.time() - t1
audio_duration = info.duration
ratio = audio_duration / elapsed if elapsed > 0 else 0

with open(SALIDA, "w", encoding="utf-8") as f:
    f.write(f"# Transcripción: {ARCHIVO}\n")
    f.write(f"# Modelo: {MODEL} | Duración audio: {fmt_duration(audio_duration)}\n\n")
    f.write("\n".join(lines) + "\n")

print()
print(f"Segmentos    : {len(lines)}")
print(f"Audio        : {fmt_duration(audio_duration)}")
print(f"Proceso      : {fmt_duration(elapsed)}")
print(f"Velocidad    : {ratio:.1f}x tiempo real")
print(f"Guardado en  : {SALIDA}")
