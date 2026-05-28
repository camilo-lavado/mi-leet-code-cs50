"""
=============================================================================
TRANSCRIPTOR CS50 — GPU NVIDIA (GTX 1650 / RTX series)
=============================================================================

INSTALACIÓN (ejecutar una sola vez):
    pip install faster-whisper nvidia-cublas-cu12

CÓMO EJECUTAR:
    python transcribir_gpu.py

    Reanuda automáticamente si se interrumpe.
    Para reiniciar desde cero: eliminar .progreso_gpu.json y transcripcion_gpu.txt

RESULTADO:
    transcripcion_gpu.txt — transcripción completa con timestamps
=============================================================================
"""

import os
import sys
import glob
import json
import time
from datetime import timedelta

# ---------------------------------------------------------------------------
# Inyectar cublas en PATH automáticamente (evita el error cublas64_12.dll)
# ---------------------------------------------------------------------------
def _patch_cublas_path():
    import site
    candidates = []
    for base in site.getusersitepackages(), *site.getsitepackages():
        p = os.path.join(base, "nvidia", "cublas", "bin")
        candidates.append(p)
    for p in candidates:
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

# =============================================================================
# CONFIGURACIÓN  —  ajusta MODEL si tu GPU tiene más VRAM
#   GTX 1650 (4 GB): medium
#   RTX 3060+ (8 GB): large-v3
# =============================================================================

MODEL         = "medium"
DEVICE        = "cuda"
COMPUTE_TYPE  = "float16"
LANGUAGE      = "en"
BEAM_SIZE     = 5
OUTPUT_FILE   = "transcripcion_gpu.txt"
PROGRESS_FILE = ".progreso_gpu.json"
MAX_RETRIES   = 3       # reintentos por chunk ante errores transitorios

# =============================================================================

def load_progress():
    if os.path.exists(PROGRESS_FILE):
        try:
            with open(PROGRESS_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            pass
    return {"completed": [], "errors": {}}

def save_progress(progress):
    with open(PROGRESS_FILE, "w", encoding="utf-8") as f:
        json.dump(progress, f, indent=2, ensure_ascii=False)

def fmt_duration(seconds):
    return str(timedelta(seconds=int(seconds)))

def fmt_ratio(audio_duration, elapsed):
    if elapsed <= 0:
        return "?"
    ratio = audio_duration / elapsed
    return f"{ratio:.1f}x"

def transcribe_chunk(model, chunk, language, beam_size):
    segments, info = model.transcribe(
        chunk,
        language=language,
        beam_size=beam_size,
        vad_filter=True,          # omite silencios, más rápido
        vad_parameters={"min_silence_duration_ms": 500},
    )
    lines = []
    for seg in segments:
        ts = fmt_duration(seg.start)
        lines.append(f"[{ts}]  {seg.text.strip()}")
    return lines, info.duration

def check_vram():
    try:
        import ctranslate2
        count = ctranslate2.get_cuda_device_count()
        if count == 0:
            return False, "No se detectaron GPUs CUDA"
        return True, f"{count} GPU(s) CUDA disponible(s)"
    except Exception as e:
        return False, str(e)

def main():
    print("=" * 62)
    print("  Transcriptor CS50 — GPU  |  faster-whisper " + MODEL)
    print("=" * 62)

    if _cublas_path:
        print(f"  cublas path : {_cublas_path}")
    else:
        print("  ADVERTENCIA: cublas no encontrado en site-packages.")
        print("               Si falla, ejecuta: pip install nvidia-cublas-cu12")

    # Verificar GPU
    gpu_ok, gpu_msg = check_vram()
    print(f"  GPU         : {gpu_msg}")
    if not gpu_ok:
        print("\nERROR: No hay GPU CUDA disponible. Verifica drivers con nvidia-smi")
        sys.exit(1)

    print()

    # Cargar modelo
    print(f"Cargando modelo '{MODEL}' en {DEVICE.upper()} ({COMPUTE_TYPE})...")
    t_load = time.time()
    try:
        model = WhisperModel(MODEL, device=DEVICE, compute_type=COMPUTE_TYPE)
    except Exception as e:
        print(f"\nERROR al cargar el modelo: {e}")
        print("Verifica que CUDA esté instalado: nvidia-smi")
        sys.exit(1)
    print(f"Modelo listo en {time.time() - t_load:.1f}s\n")

    # Buscar chunks
    chunks = sorted(glob.glob("chunk_*.mp3"))
    if not chunks:
        print("ERROR: No se encontraron archivos chunk_*.mp3 en esta carpeta.")
        sys.exit(1)

    # Progreso
    progress = load_progress()
    completed_set = set(progress.get("completed", []))
    errors = progress.get("errors", {})
    pending = [c for c in chunks if c not in completed_set]

    print(f"Chunks totales  : {len(chunks)}")
    print(f"Ya completados  : {len(completed_set)}")
    print(f"Con errores     : {len(errors)}")
    print(f"Pendientes      : {len(pending)}")

    if not pending:
        print(f"\nTodo ya fue procesado. Resultado en: {OUTPUT_FILE}")
        return

    print()
    print("Iniciando transcripción...")
    print("-" * 62)

    start_total = time.time()
    total_audio = 0.0

    with open(OUTPUT_FILE, "a", encoding="utf-8") as f_out:
        for idx, chunk in enumerate(pending, 1):
            elapsed_total = time.time() - start_total
            if idx > 1:
                rate = elapsed_total / (idx - 1)
                eta = fmt_duration(rate * (len(pending) - idx + 1))
            else:
                eta = "calculando..."

            print(f"\n[{idx:2d}/{len(pending)}] {chunk}  |  ETA: {eta}")

            lines = []
            audio_duration = 0.0
            success = False

            for attempt in range(1, MAX_RETRIES + 1):
                try:
                    t0 = time.time()
                    lines, audio_duration = transcribe_chunk(
                        model, chunk, LANGUAGE, BEAM_SIZE
                    )
                    elapsed_chunk = time.time() - t0
                    success = True
                    break
                except RuntimeError as e:
                    msg = str(e)
                    print(f"  intento {attempt}/{MAX_RETRIES} — RuntimeError: {msg[:80]}")
                    if attempt < MAX_RETRIES:
                        time.sleep(3)
                except Exception as e:
                    print(f"  intento {attempt}/{MAX_RETRIES} — Error: {e}")
                    if attempt < MAX_RETRIES:
                        time.sleep(3)

            if not success:
                print(f"  FALLIDO tras {MAX_RETRIES} intentos — se omite y se anota")
                errors[chunk] = f"Falló {MAX_RETRIES} veces"
                progress["errors"] = errors
                save_progress(progress)
                continue

            # Escribir al archivo con cabecera por chunk
            f_out.write(f"\n\n### {chunk} ###\n")
            for line in lines:
                f_out.write(line + "\n")
            f_out.flush()

            total_audio += audio_duration
            progress["completed"].append(chunk)
            progress["errors"] = errors
            save_progress(progress)

            ratio = fmt_ratio(audio_duration, elapsed_chunk)
            print(f"  OK — {len(lines)} segmentos | audio {fmt_duration(audio_duration)} | "
                  f"proceso {fmt_duration(elapsed_chunk)} | velocidad {ratio}")

    # Resumen final
    total_elapsed = time.time() - start_total
    print("\n" + "=" * 62)
    print("  PROCESO TERMINADO")
    print(f"  Chunks procesados : {len(pending) - len(errors)}/{len(pending)}")
    print(f"  Audio total       : {fmt_duration(total_audio)}")
    print(f"  Tiempo total      : {fmt_duration(total_elapsed)}")
    if total_elapsed > 0:
        print(f"  Velocidad media   : {fmt_ratio(total_audio, total_elapsed)}")
    if errors:
        print(f"  Chunks con error  : {', '.join(errors.keys())}")
    print(f"  Resultado en      : {OUTPUT_FILE}")
    print("=" * 62)

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\nInterrumpido por el usuario.")
        print("Ejecuta de nuevo para continuar desde donde se paró.")
        sys.exit(130)
