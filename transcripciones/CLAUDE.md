# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Propósito

Herramientas para transcribir audio del curso CS50 usando `faster-whisper` en CPU (Windows, sin CUDA). El flujo toma `curso_cs50.mp3`, lo divide en chunks y transcribe cada uno con recuperación automática ante interrupciones.

## Dependencia principal

```
pip install faster-whisper
```

## Comandos

```bash
# Verificar si hay GPU disponible (usa CPU si no hay CUDA)
python check.py

# Ejecutar transcripción (reanuda automáticamente si se interrumpe)
python transcribir.py
```

## Arquitectura

- **`transcribir.py`** — Script principal. `ProgressManager` persiste el estado en `.transcripcion_progress.json` por chunk; permite reanudar sin reprocesar. `Transcriptor.run()` itera `chunk_*.mp3` en orden, escribe en modo `append` a `transcripcion_final.txt`.
- **`check.py`** — Diagnóstico de disponibilidad de CUDA/GPU vía PyTorch.
- **Chunks** — `curso_cs50.mp3` dividido en `chunk_000.mp3` … `chunk_025.mp3`. El patrón `chunk_*.mp3` en `CONFIG` los detecta automáticamente.

## Configuración clave (`CONFIG` en `transcribir.py`)

| Parámetro | Valor actual | Notas |
|---|---|---|
| `model` | `medium` | `medium` cabe en 4 GB VRAM; `large` requiere ~6 GB |
| `device` | `cuda` | GTX 1650 disponible; usar `cpu` como fallback |
| `compute_type` | `float16` | Máxima velocidad en GPU NVIDIA |
| `language` | `es` | Español |

## Reiniciar desde cero

Eliminar `.transcripcion_progress.json` y `transcripcion_final.txt` antes de ejecutar.
