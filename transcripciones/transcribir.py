#!/usr/bin/env python3
"""
Transcriptor robusto para Windows con CPU (faster-whisper)
- Optimizado para procesamiento rápido en CPU
- Progreso visual en tiempo real con ETA
- Manejo robusto de errores y reintentos
- Recuperación automática ante interrupciones
"""

import os
import sys
import glob
import logging
import json
import time
from datetime import datetime, timedelta
from typing import List, Optional

try:
    from faster_whisper import WhisperModel
except ImportError:
    print("ERROR: faster-whisper no está instalado.")
    print("Instálalo con: pip install faster-whisper")
    sys.exit(1)


# ============================================================================
# CONFIGURACIÓN PARA CPU
# ============================================================================

CONFIG = {
    "model": "medium",              # medium = mejor precisión; small si quieres más velocidad
    "device": "cpu",                # CUDA toolkit no instalado; usar CPU
    "compute_type": "int8",         # int8 = máxima velocidad en CPU
    "cpu_threads": 10,              # Ryzen 5 8600G: 6 cores / 12 threads (reserva 2 para el SO)
    "num_workers": 1,               # chunks en paralelo (1 = estable en CPU con poco RAM extra)
    "beam_size": 3,                 # reducido para más velocidad en CPU (era 5)
    "language": "es",               # español
    "max_retries": 3,
    "retry_delay": 2,
    "chunk_pattern": "chunk_*.mp3",
    "output_file": "transcripcion_final.txt",
    "progress_file": ".transcripcion_progress.json",
    "log_file": "transcripcion.log",
}

# ============================================================================
# LOGGING
# ============================================================================

def setup_logging(log_file: str) -> logging.Logger:
    """Configura logging a archivo y consola."""
    logger = logging.getLogger("transcriptor")
    logger.setLevel(logging.DEBUG)
    
    formatter = logging.Formatter(
        "%(asctime)s [%(levelname)s] %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S"
    )
    
    # Handler de archivo
    file_handler = logging.FileHandler(log_file, encoding="utf-8")
    file_handler.setLevel(logging.DEBUG)
    file_handler.setFormatter(formatter)
    logger.addHandler(file_handler)
    
    # Handler de consola
    console_handler = logging.StreamHandler(sys.stdout)
    console_handler.setLevel(logging.INFO)
    console_handler.setFormatter(formatter)
    logger.addHandler(console_handler)
    
    return logger


# ============================================================================
# PROGRESS MANAGER
# ============================================================================

class ProgressManager:
    """Maneja persistencia de progreso en JSON."""
    
    def __init__(self, progress_file: str):
        self.progress_file = progress_file
        self.data = self._load()
    
    def _load(self) -> dict:
        """Carga progreso previo."""
        if os.path.exists(self.progress_file):
            try:
                with open(self.progress_file, "r", encoding="utf-8") as f:
                    return json.load(f)
            except (json.JSONDecodeError, IOError):
                return {"completed": [], "failed": [], "started_at": None}
        return {"completed": [], "failed": [], "started_at": None}
    
    def save(self):
        """Persiste progreso a disco."""
        try:
            with open(self.progress_file, "w", encoding="utf-8") as f:
                json.dump(self.data, f, indent=2, ensure_ascii=False)
        except IOError as e:
            raise IOError(f"No se pudo guardar progreso: {e}")
    
    def mark_completed(self, chunk: str):
        """Marca un chunk como completado."""
        if chunk not in self.data["completed"]:
            self.data["completed"].append(chunk)
            self.save()
    
    def mark_failed(self, chunk: str, error: str):
        """Marca un chunk como fallido."""
        if chunk not in self.data["failed"]:
            self.data["failed"].append({"file": chunk, "error": error})
            self.save()
    
    def get_pending(self, all_chunks: List[str]) -> List[str]:
        """Retorna chunks pendientes de procesar."""
        completed = set(self.data["completed"])
        return [c for c in all_chunks if c not in completed]
    
    def get_status(self, total: int) -> dict:
        """Retorna estado del progreso."""
        return {
            "total": total,
            "completed": len(self.data["completed"]),
            "failed": len(self.data["failed"]),
            "pending": total - len(self.data["completed"]),
        }


# ============================================================================
# TRANSCRIPTOR CON CPU
# ============================================================================

class Transcriptor:
    """Gestor principal de transcripción."""
    
    def __init__(self, config: dict, logger: logging.Logger):
        self.config = config
        self.logger = logger
        self.model = None
        self.progress = ProgressManager(config["progress_file"])
        self.start_time = None
    
    def init_model(self) -> bool:
        """Inicializa el modelo de Whisper."""
        try:
            self.logger.info(
                f"Cargando modelo '{self.config['model']}' "
                f"(device={self.config['device'].upper()}, compute_type={self.config['compute_type']})..."
            )
            
            self.model = WhisperModel(
                self.config["model"],
                device=self.config["device"],
                compute_type=self.config["compute_type"],
                cpu_threads=self.config.get("cpu_threads", 4),
                num_workers=self.config.get("num_workers", 1),
            )
            self.logger.info("✓ Modelo cargado correctamente")
            return True
        
        except Exception as e:
            self.logger.error(f"✗ Error al cargar modelo: {e}")
            return False
    
    def validate_chunks(self, chunks: List[str]) -> List[str]:
        """Valida que los chunks existan y sean legibles."""
        valid = []
        for chunk in chunks:
            if not os.path.exists(chunk):
                self.logger.warning(f"Archivo no existe: {chunk}")
                continue
            if not os.path.isfile(chunk):
                self.logger.warning(f"No es un archivo: {chunk}")
                continue
            size = os.path.getsize(chunk)
            if size == 0:
                self.logger.warning(f"Archivo vacío: {chunk}")
                continue
            valid.append(chunk)
        return valid
    
    def transcribe_chunk(self, chunk: str, retries: int = 0) -> Optional[str]:
        """Transcribe un chunk con reintentos."""
        try:
            segments, info = self.model.transcribe(
                chunk,
                beam_size=self.config["beam_size"],
                language=self.config["language"]
            )
            
            text = "".join(segment.text for segment in segments)
            
            if not text.strip():
                self.logger.warning(f"Chunk vacío (sin audio detectado): {chunk}")
                return ""
            
            return text
        
        except Exception as e:
            if retries < self.config["max_retries"]:
                self.logger.warning(
                    f"Reintentando {chunk} (intento {retries + 1}/{self.config['max_retries']}): {e}"
                )
                time.sleep(self.config["retry_delay"])
                return self.transcribe_chunk(chunk, retries + 1)
            else:
                self.logger.error(f"✗ Fallo permanente en {chunk}: {e}")
                return None
    
    def format_time(self, seconds: float) -> str:
        """Convierte segundos a formato HH:MM:SS."""
        return str(timedelta(seconds=int(seconds)))
    
    def estimate_remaining(self, processed: int, total: int, elapsed: float) -> str:
        """Estima tiempo restante."""
        if processed == 0:
            return "calculando..."
        rate = elapsed / processed
        remaining = (total - processed) * rate
        return self.format_time(remaining)
    
    def run(self, chunk_pattern: str) -> bool:
        """Ejecuta el proceso de transcripción."""
        self.start_time = time.time()
        
        # Inicializar modelo
        if not self.init_model():
            return False
        
        # Buscar chunks
        chunks = sorted(glob.glob(chunk_pattern))
        if not chunks:
            self.logger.error(f"No se encontraron archivos que coincidan con '{chunk_pattern}'")
            return False
        
        self.logger.info(f"Encontrados {len(chunks)} chunks")
        
        # Validar chunks
        chunks = self.validate_chunks(chunks)
        if not chunks:
            self.logger.error("No hay chunks válidos para procesar")
            return False
        
        self.logger.info(f"Chunks válidos: {len(chunks)}")
        
        # Obtener pendientes
        pending = self.progress.get_pending(chunks)
        self.logger.info(f"Chunks pendientes: {len(pending)}")
        
        if not pending:
            self.logger.info("✓ Todos los chunks ya han sido procesados")
            status = self.progress.get_status(len(chunks))
            self.logger.info(f"Estado: {status['completed']}/{status['total']} completados")
            return True
        
        # Procesar chunks
        self.logger.info("Iniciando transcripción...")
        self.logger.info("=" * 80)
        
        output_file = self.config["output_file"]
        
        with open(output_file, "a", encoding="utf-8") as f_out:
            for idx, chunk in enumerate(pending, 1):
                elapsed = time.time() - self.start_time
                remaining = self.estimate_remaining(idx - 1, len(pending), elapsed)
                
                status = self.progress.get_status(len(chunks))
                self.logger.info(
                    f"[{idx:2d}/{len(pending)}] {chunk:20s} | "
                    f"Total: {status['completed']:2d}/{status['total']:2d} | "
                    f"⏱️  {remaining} restante"
                )
                
                text = self.transcribe_chunk(chunk)
                
                if text is None:
                    # Fallo permanente
                    self.progress.mark_failed(chunk, "Max retries exceeded")
                    self.logger.info("            ✗ Omitido por errores")
                    continue
                
                # Escribir salida
                if text.strip():
                    f_out.write(text.strip() + "\n")
                    f_out.flush()
                
                # Marcar como completado
                self.progress.mark_completed(chunk)
                self.logger.info("            ✓ Completado")
        
        self.logger.info("=" * 80)
        
        # Reporte final
        total_time = time.time() - self.start_time
        final_status = self.progress.get_status(len(chunks))
        
        self.logger.info(f"")
        self.logger.info(f"✓ PROCESO TERMINADO")
        self.logger.info(f"  - Completados: {final_status['completed']}")
        self.logger.info(f"  - Fallidos: {final_status['failed']}")
        self.logger.info(f"  - Pendientes: {final_status['pending']}")
        self.logger.info(f"  - Tiempo total: {self.format_time(total_time)}")
        self.logger.info(f"  - Velocidad promedio: {len(pending) / (total_time / 3600):.2f} chunks/hora")
        self.logger.info(f"  - Salida: {output_file}")
        self.logger.info(f"")
        
        return final_status["failed"] == 0


# ============================================================================
# MAIN
# ============================================================================

def main():
    """Punto de entrada."""
    logger = setup_logging(CONFIG["log_file"])
    
    logger.info("=" * 80)
    logger.info("Transcriptor Whisper para Windows (CPU + faster-whisper)")
    logger.info("=" * 80)
    logger.info(f"Configuración: model={CONFIG['model']}, device={CONFIG['device'].upper()}, compute_type={CONFIG['compute_type']}")
    logger.info(f"Estimado: ~3-5 horas para 25 horas de audio en Ryzen 5 8600G (10 threads, int8)")
    logger.info("")
    
    try:
        transcriptor = Transcriptor(CONFIG, logger)
        success = transcriptor.run(CONFIG["chunk_pattern"])
        
        sys.exit(0 if success else 1)
    
    except KeyboardInterrupt:
        logger.warning("\n¡Interrumpido por usuario! El progreso se ha guardado.")
        logger.info("Ejecuta de nuevo para continuar desde donde se paró.")
        sys.exit(130)
    
    except Exception as e:
        logger.critical(f"Error crítico: {e}", exc_info=True)
        sys.exit(1)


if __name__ == "__main__":
    main()