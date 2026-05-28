# LocalCode — CS50 en Español

> La primera plataforma self-hosted que traslada el curso completo de Harvard CS50 al español. Diseñada para que cualquier hispanohablante pueda aprender ciencias de la computación sin necesitar inglés.

---

## ¿Qué es esto?

**LocalCode** es una plataforma de aprendizaje interactiva que cubre las 12 semanas del curso **CS50 2026 de Harvard**, con:

- 📖 Contenido completo en español (transcripción + material propio complementario)
- 💻 Editor de código integrado (Monaco Editor)
- ⚙️ Motor de ejecución seguro vía Docker
- ✅ Evaluación automática de soluciones contra casos de prueba
- 📊 Seguimiento de progreso por semana y por problema

---

## Contenido del curso

| Semana | Tema | Lenguaje |
|--------|------|----------|
| 0 | Scratch — Pensamiento computacional | Visual |
| 1 | C — Fundamentos | C |
| 2 | Arreglos | C |
| 3 | Algoritmos | C |
| 4 | Memoria | C |
| 5 | Estructuras de Datos | C |
| 6 | Python | Python |
| 7 | SQL | SQL |
| 8 | HTML, CSS, JavaScript | Web |
| 9 | Flask | Python |
| 10 | Emoji y Unicode | — |
| — | Ciberseguridad | — |

---

## Cómo ejecutarlo en tu computadora

### Requisitos previos

Antes de empezar necesitas tener instalado:

| Herramienta | Para qué sirve | Descarga |
|-------------|----------------|----------|
| **Docker Desktop** | Ejecuta tu código de forma segura y aislada | [docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop/) |
| **Go 1.22+** | Corre el servidor del backend | [go.dev/dl](https://go.dev/dl/) |
| **Node.js 20+** | Corre el servidor del frontend | [nodejs.org](https://nodejs.org/) |

---

### ¿Qué es Docker Desktop y por qué lo necesito?

Cuando resuelves un problema en LocalCode y presionas **Ejecutar**, tu código no corre directamente en tu computadora. En cambio, la plataforma crea una pequeña "caja" aislada (llamada **contenedor**) donde tu código se ejecuta de forma segura, sin riesgo de dañar nada en tu sistema.

Docker Desktop es la aplicación que hace posible crear esas cajas.

**Pasos para instalar Docker Desktop:**

1. Ve a [docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop/) y descarga la versión para tu sistema operativo (Windows, Mac o Linux)
2. Instálalo como cualquier otra aplicación (siguiente → siguiente → instalar)
3. **En Windows:** si el instalador pide activar WSL 2, acepta — es necesario
4. Una vez instalado, ábrelo. Verás una ballena (🐳) en la barra de tareas/menú superior
5. Espera a que el ícono deje de moverse — eso significa que Docker está listo

> **Importante:** Docker Desktop debe estar abierto y corriendo cada vez que uses LocalCode. No necesitas hacer nada más con él, solo que esté activo.

---

### Instalación paso a paso

**1. Clona el repositorio**

```bash
git clone https://github.com/camilo-lavado/mi-leet-code-cs50.git
cd mi-leet-code-cs50
```

**2. Inicia el backend** (en una terminal)

```bash
cd backend
go run ./cmd/server/main.go
```

La primera vez tardará unos segundos en descargar las dependencias de Go. Cuando veas algo como `[GIN-debug] Listening on :8080`, el servidor está listo.

**3. Inicia el frontend** (en otra terminal, sin cerrar la anterior)

```bash
cd frontend
npm install       # solo la primera vez
npm run dev
```

Cuando veas `Local: http://localhost:5173`, abre esa dirección en tu navegador.

**4. Descarga las imágenes de Docker** (solo la primera vez)

La primera vez que ejecutes un problema en C o Python, Docker descargará automáticamente las imágenes necesarias (`gcc:latest` y `python:3.11-alpine`). Esto puede tardar 1-2 minutos dependiendo de tu conexión. Las siguientes ejecuciones serán instantáneas.

---

### Solución de problemas comunes

| Problema | Causa probable | Solución |
|----------|----------------|----------|
| `Error: Cannot connect to Docker daemon` | Docker Desktop no está abierto | Abre Docker Desktop y espera a que el ícono deje de moverse |
| `go: command not found` | Go no está instalado o no está en el PATH | Reinstala Go y reinicia la terminal |
| `npm: command not found` | Node.js no está instalado | Instala Node.js desde nodejs.org |
| La página carga pero los problemas no aparecen | El backend no está corriendo | Verifica que la terminal del backend muestra el mensaje de `:8080` |
| Error al ejecutar código en Windows | WSL 2 no está activado | Abre Docker Desktop → Settings → General → activa "Use WSL 2 based engine" |

---

## Stack Técnico

- **Frontend:** React + Vite + TypeScript + Monaco Editor
- **Backend/API:** GoLang (Gin) — Arquitectura Hexagonal + DDD
- **Base de datos:** SQLite
- **Ejecución de código:** Docker Engine API

---

## Características Destacadas

*   **Pedagogía Activa (Active Recall):** Tarjetas interactivas (Flashcards) por semana para reforzar la teoría antes de escribir código.
*   **Diario Feynman:** Espacio interactivo donde el alumno explica su lógica en lenguaje sencillo antes de enviar, consolidando su propio entendimiento.
*   **Pistas Socráticas Progresivas:** Sugerencias reflexivas guiadas paso a paso sin revelar directamente el código de la solución.
*   **Visor de Clases y Glosario:** Interfaz premium con pestañas para estudiar la transcripción de las clases magistrales en español, materiales complementarios de consola, y conceptos clave.
*   **Gamificación (Rachas y Medallas):** Cálculo automático y dinámico de racha diaria de estudio (🔥) y obtención de medallas al resolver todos los retos de una semana.

---

## Documentación

| Archivo | Descripción |
|---------|-------------|
| [01_PRD.md](./01_PRD.md) | Requerimientos del producto |
| [02_ARCHITECTURE.md](./02_ARCHITECTURE.md) | Arquitectura del sistema |
| [03_DOMAIN_MODEL.md](./03_DOMAIN_MODEL.md) | Modelo de dominio y esquema SQLite |
| [04_EXECUTION_ENGINE.md](./04_EXECUTION_ENGINE.md) | Motor de ejecución Docker |
| [05_API_SPECIFICATION.md](./05_API_SPECIFICATION.md) | Contratos REST API |
| [06_CONTENT_STRATEGY.md](./06_CONTENT_STRATEGY.md) | Estrategia de contenido en español |
| [07_ROADMAP.md](./07_ROADMAP.md) | Plan de desarrollo por fases |
| [08_PHASE_1_PLAN.md](./08_PHASE_1_PLAN.md) | Planificación detallada de la Fase 1 |
| [09_PHASE_2_AND_3_PLAN.md](./09_PHASE_2_AND_3_PLAN.md) | Planificación detallada de la Fase 2 y 3 |

---

## Estado actual

🟢 **Fase 2 MVP Completada e Inicio de Fase 3** — Plataforma completamente funcional. Todos los elementos del Core (Go, SQLite, Docker, Monaco Editor) y las mecánicas pedagógicas (Flashcards, Feynman, Pistas, Visor de Teoría y Gamificación) están listos. Actualmente poblando el contenido y retos de la Semana 1 en C.

---

## Misión

> *"Si yo logro aprender CS50 completamente en español a través de esta plataforma, habrá cumplido su misión."*

Este proyecto nació como experimento personal. Si funciona, es un aporte para todos los hispanohablantes que quieren aprender a programar con el mejor curso gratuito del mundo.
