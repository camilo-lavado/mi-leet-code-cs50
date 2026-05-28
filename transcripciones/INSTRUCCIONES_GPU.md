# Transcriptor CS50 con GPU — Guía de instalación

Guía paso a paso para transcribir el audio del curso CS50 usando tu GPU NVIDIA.
Probado en **GTX 1650 (4 GB VRAM)** con Windows 11.

---

## Requisitos previos

- Windows 10 u 11
- GPU NVIDIA (cualquier modelo con CUDA, GTX 10xx o superior)
- Drivers NVIDIA actualizados
- Python instalado (ver paso 1)

---

## Paso 1 — Verificar Python

Abre una terminal (PowerShell o CMD) y ejecuta:

```
python --version
```

Necesitas **Python 3.9 a 3.12**. Si tienes Python 3.13 o 3.14, desinstálalo e instala la versión 3.12 desde:

```
https://www.python.org/downloads/release/python-3128/
```

> Durante la instalación, marca la casilla **"Add Python to PATH"**.

---

## Paso 2 — Verificar que tu GPU es compatible

```
nvidia-smi
```

Debes ver algo como esto:

```
NVIDIA GeForce GTX 1650    Driver Version: 595.xx    CUDA Version: 12.x
```

Si el comando no existe o da error, actualiza los drivers NVIDIA desde:
`https://www.nvidia.com/drivers`

---

## Paso 3 — Instalar dependencias

```
pip install faster-whisper nvidia-cublas-cu12
```

Esto descarga e instala todo lo necesario (~500 MB). Solo se hace una vez.

---

## Paso 4 — Preparar los archivos

Copia en **una misma carpeta** los siguientes archivos:

```
📁 tu-carpeta/
├── transcribir_uno_gpu.py     ← prueba rápida (un solo chunk)
├── transcribir_gpu.py         ← transcripción completa (26 chunks)
├── chunk_000.mp3
├── chunk_001.mp3
├── ...
└── chunk_025.mp3
```

---

## Paso 5 — Prueba rápida (recomendado antes de todo)

Antes de lanzar los 26 chunks, verifica que todo funciona con un solo archivo:

```
python transcribir_uno_gpu.py
```

Deberías ver algo como:

```
========================================================
  Prueba GPU — faster-whisper medium
========================================================
  Archivo : chunk_000.mp3
  Modelo  : medium  |  CUDA  |  float16
  cublas  : C:\Users\...\nvidia\cublas\bin

Cargando modelo (puede tardar ~10s si ya está en caché)...
Modelo listo en 6.2s

Transcribiendo...
  [0:00:00]  This is a Harvard University course...
  [0:00:08]  Throughout a series of lectures...
  ...

Segmentos    : 1272
Audio        : 1:00:00
Proceso      : 0:25:42
Velocidad    : 2.3x tiempo real
Guardado en  : chunk_000_transcripcion_gpu.txt
```

La primera vez descarga el modelo (~1.5 GB). Las siguientes veces lo carga desde caché.

---

## Paso 6 — Transcripción completa

Si la prueba fue exitosa:

```
python transcribir_gpu.py
```

El script:
- Procesa los 26 chunks en orden
- Guarda el progreso en `.progreso_gpu.json` después de cada chunk
- **Si se interrumpe, reanuda desde donde quedó** — no reprocesa chunks ya completados
- El resultado final se guarda en `transcripcion_gpu.txt`

Ejemplo de output durante la ejecución:

```
[1/26] chunk_000.mp3  |  ETA: calculando...
  OK — 1272 segmentos | audio 1:00:00 | proceso 0:25:42 | velocidad 2.3x

[2/26] chunk_001.mp3  |  ETA: 10:27:00
  OK — 1089 segmentos | audio 0:58:30 | proceso 0:24:10 | velocidad 2.4x
...
```

---

## Tiempo estimado

| GPU | VRAM | Tiempo por chunk (~60 min audio) | Total (26 chunks) |
|---|---|---|---|
| GTX 1650 | 4 GB | medium | ~25 min | ~10-11 horas |
| RTX 3060 | 8 GB | large-v3 | ~8 min | ~3-4 horas |
| RTX 4060 | 8 GB | large-v3 | ~5 min | ~2 horas |
| **RTX 5060** | **16 GB** | **large-v3** | **~3-4 min** | **~1-2 horas** |

> Con 16 GB de VRAM el modelo `large-v3` corre holgado. No necesitas cerrar otras aplicaciones.

---

## Modelos disponibles

El script usa `medium` por defecto, pero con **16 GB de VRAM** puedes usar el modelo más potente disponible.

**Cambia el modelo a `large-v3`** abriendo `transcribir_gpu.py` con el Bloc de notas y editando la línea:

```python
MODEL = "large-v3"   # recomendado para 16 GB de VRAM
```

Y lo mismo en `transcribir_uno_gpu.py` si quieres hacer la prueba rápida con el mismo modelo.

| Modelo | VRAM mínima | Calidad |
|---|---|---|
| `medium` | 4 GB | Buena |
| `large-v2` | 6 GB | Muy buena |
| `large-v3` | 6 GB | Excelente ← usa este |

---

## Solución de problemas

### Error: `cublas64_12.dll is not found`

```
pip install nvidia-cublas-cu12
```

El script lo detecta automáticamente después de instalarlo.

---

### Error: `CUDA out of memory`

Tu GPU no tiene suficiente VRAM libre. Soluciones:
1. Cierra el navegador y otras aplicaciones antes de correr el script
2. Cambia el modelo a `small` en el script (menos preciso pero más liviano)

---

### El script falló en el chunk X y se saltó

El chunk queda anotado en `.progreso_gpu.json` como error. Puedes editarlo manualmente para quitarlo de la lista de errores y volver a intentarlo:

1. Abre `.progreso_gpu.json` con el Bloc de notas
2. En `"errors"`, elimina la línea del chunk que quieres reintentar
3. En `"completed"`, elimina también ese chunk si aparece
4. Corre el script de nuevo

---

### Reiniciar desde cero

Elimina estos dos archivos y corre el script de nuevo:

```
.progreso_gpu.json
transcripcion_gpu.txt
```

---

## Resultado final

`transcripcion_gpu.txt` contendrá la transcripción completa con timestamps:

```
### chunk_000.mp3 ###
[0:00:00]  This is a Harvard University course...
[0:00:08]  Throughout a series of lectures...

### chunk_001.mp3 ###
[0:00:00]  ...
```
