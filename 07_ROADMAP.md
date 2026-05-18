# Roadmap de Desarrollo
## Proyecto: LocalCode — CS50 en Español

---

## Fase 1 — MVP Core (Backend + Motor de Ejecución)

**Objetivo:** Que un problema de C pueda ejecutarse y evaluarse.

### Tareas

#### Backend (GoLang)
- [x] Inicializar proyecto Go con estructura hexagonal
- [x] Implementar entidades del dominio: `Problem`, `TestCase`, `Submission`, `ExecutionResult`
- [x] Implementar `ProblemRepository` con SQLite
- [x] Implementar `SubmissionRepository` con SQLite
- [x] Implementar `DockerExecutor` (CodeExecutor port)
- [x] Implementar `SubmitCodeUseCase`
- [x] Implementar `FetchProblemsUseCase`
- [x] Exponer endpoints REST:
  - `GET /api/v1/problems`
  - `GET /api/v1/problems/:id`
  - `POST /api/v1/submissions`
- [x] Crear script de migración SQLite
- [x] Crear seed con primeros 3 problemas de la Semana 1

#### Docker Executor
- [x] Configurar imagen para C (`gcc:latest`)
- [x] Configurar imagen para Python (`python:3.11-alpine`)
- [x] Implementar límites de seguridad (NetworkMode: none, Memory: 128MB, Timeout: 5s)
- [x] Tests de integración del executor

**Entregable:** `curl POST /api/v1/submissions` con código C retorna `Aceptado` o `Fallido`.

---

## Fase 2 — Frontend MVP

**Objetivo:** Interfaz funcional en español con editor y evaluador.

### Tareas

#### Setup
- [x] Inicializar proyecto React + Vite + TypeScript
- [x] Instalar y configurar `@monaco-editor/react`
- [x] Configurar cliente HTTP (fetch nativo)
- [x] Configurar React Router + TanStack Query

#### Vistas
- [x] **Catálogo de Problemas** — Lista navegable con filtro por dificultad
- [x] **Vista de Problema** — Descripción, editor Monaco, selector de lenguaje, resultados
- [ ] **Dashboard** — Sidebar con semanas, vista de progreso global
- [ ] **Vista de Semana** — Contenido de la semana + lista de problemas
- [ ] **Tracker de Progreso** — Estado por problema y por semana

#### UX & Pedagogía (Active Recall & Feynman)
- [x] Tema oscuro/claro con Tailwind CSS (Glassmorphism UI Premium)
- [x] Indicadores de dificultad: Fácil / Media / Difícil
- [x] Feedback visual al ejecutar/enviar (loading, success, error)
- [ ] Estados visuales: Sin intentar / En progreso / Resuelto
- [ ] **Módulo Active Recall**: Tarjetas de repaso (Flashcards) integradas en la vista de la semana antes de desbloquear los problemas.
- [ ] **Módulo Técnica Feynman**: Campo de texto tipo "Diario de aprendizaje" donde el alumno debe explicar su solución paso a paso antes de que el botón "Ejecutar" permita enviar una solución oficial.

**Entregable:** Plataforma funcional end-to-end con Semana 1 completa.

---

## Fase 3 — Contenido Semanas 0–5 (C)

**Objetivo:** Cubrir la mitad del curso con contenido y problemas.

### Subtareas detalladas

#### Infraestructura de contenido
- [ ] Crear directorio `content/` con subdirectorios `semana-0/` a `semana-5/`
- [ ] Implementar `ContentLoader` en backend que lea archivos `.md` y los sirva via API
- [ ] Agregar endpoint `GET /api/v1/content/:week` que retorne `{ lectura, complemento, glosario }`
- [ ] Actualizar frontend con vista de semana que renderice markdown

#### Semana 0 — Scratch (contenido teórico, sin executor)
- [ ] `lectura.md` — Transcripción traducida de la clase de Scratch
- [ ] `complemento.md` — ¿Qué es un algoritmo? Ejemplos cotidianos
- [ ] `glosario.md` — Términos: algoritmo, función, variable, evento, bucle

#### Semana 1 — C: Fundamentos
- [ ] `lectura.md` — Clase de C traducida (compilación, tipos, printf, condicionales)
- [ ] `complemento.md` — Cómo funciona un compilador
- [ ] `glosario.md`
- [ ] `problemas/mario.md` + seed SQL con 3+ test cases
- [ ] `problemas/cash.md` + seed SQL con 3+ test cases
- [ ] `problemas/credit.md` + seed SQL con 3+ test cases

#### Semana 2 — Arreglos
- [ ] `lectura.md` + `complemento.md` + `glosario.md`
- [ ] 4 problemas con test cases: Scrabble, Readability, Caesar, Substitution

#### Semana 3 — Algoritmos
- [ ] `lectura.md` + `complemento.md` (visualización Big-O) + `glosario.md`
- [ ] 3 problemas: Plurality, Runoff, Tideman

#### Semana 4 — Memoria
- [ ] `lectura.md` + `complemento.md` (heap vs stack) + `glosario.md`
- [ ] 2 problemas: Volume, Filter

#### Semana 5 — Estructuras de Datos
- [ ] `lectura.md` + `complemento.md` (trade-offs de estructuras) + `glosario.md`
- [ ] 1 problema: Speller

**Entregable:** 6 semanas completas, ~18 problemas funcionales.

---

## Fase 4 — Contenido Semanas 6–10 + Ciberseguridad

**Objetivo:** Completar el curso.

### Subtareas detalladas

#### Expansión del executor (prerrequisito)
- [ ] Agregar soporte SQL (`sqlite:alpine`) al `DockerExecutor`
- [ ] Agregar soporte JavaScript (`node:alpine`) al `DockerExecutor`
- [ ] Agregar selector de lenguaje SQL y JS en el frontend (Monaco ya los soporta)

#### Semana 6 — Python
- [ ] `lectura.md` + `complemento.md` (Python vs C) + `glosario.md`
- [ ] 4 problemas: Mario, Cash, Readability (versiones Python) + DNA

#### Semana 7 — SQL
- [ ] `lectura.md` + `complemento.md` (cómo piensa una BD) + `glosario.md`
- [ ] 3 problemas: Songs, Movies, Fiftyville (con evaluación SQL)

#### Semana 8 — HTML, CSS, JavaScript
- [ ] `lectura.md` + `complemento.md` (el navegador como runtime) + `glosario.md`
- [ ] 2 problemas: Trivia (quiz JS), Homepage (evaluación manual)

#### Semana 9 — Flask
- [ ] `lectura.md` + `complemento.md` (flujo HTTP completo) + `glosario.md`
- [ ] 2 problemas: Birthdays (CRUD), Finance (simulador bolsa)
- [ ] ⚠️ Evaluación adaptada: no se puede ejecutar Flask en Docker de forma trivial

#### Semana 10 — Emoji/Unicode
- [ ] `lectura.md` + `complemento.md` + `glosario.md`
- [ ] Sin problemas de código (contenido teórico)

#### Ciberseguridad
- [ ] `lectura.md` + `complemento.md` (amenazas reales en español)
- [ ] Ejercicios conceptuales (no requieren executor)

**Entregable:** Plataforma con el CS50 completo en español.

---

## Fase 5 — Pulido y Validación

**Objetivo:** Verificar que la plataforma funciona como herramienta de aprendizaje real.

### Subtareas detalladas

#### Validación funcional
- [ ] Ejecutar y verificar los ~30 problemas uno por uno con la solución correcta
- [ ] Verificar que cada problema rechaza soluciones incorrectas comunes
- [ ] Probar la plataforma sin conexión a internet (offline mode)

#### Experiencia de aprendizaje
- [ ] El autor completa las 12 semanas del CS50 usando exclusivamente la plataforma
- [ ] Tomar notas de fricciones: ¿algo confuso?, ¿falta contexto?, ¿error en test case?
- [ ] Ajustar contenido donde la experiencia de aprendizaje fue débil

#### Performance
- [ ] Optimizar tiempo de arranque de contenedores (pre-pull imágenes, cache)
- [ ] Benchmark: ≤2s para ejecutar y evaluar un problema típico de C
- [ ] Revisar queries SQLite con `EXPLAIN QUERY PLAN` para queries frecuentes

#### Calidad de contenido
- [ ] Revisión completa de ortografía y gramática en español
- [ ] Verificar consistencia de tono (tuteo) en todo el contenido
- [ ] Validar que glosarios cubren todos los términos técnicos usados

#### Documentación para terceros
- [ ] Escribir `INSTALL.md`: requisitos (Docker, Go, Node), pasos de instalación
- [ ] Escribir `CONTRIBUTING.md`: cómo agregar un problema nuevo, un lenguaje nuevo
- [ ] Agregar `docker-compose.yml` para levantar todo con un comando

---

## Hitos Clave

| Hito | Descripción | Estado |
|------|-------------|--------|
| M1 | Arquitectura y documentación definidas | ✅ Completo |
| M2 | Backend + Docker executor funcional | ✅ Completo |
| M3 | Frontend MVP con Semana 1 funcional | ✅ Completo |
| M4 | Semanas 0–5 con contenido completo | 🔲 Pendiente |
| M5 | Semanas 6–10 + Ciberseguridad | 🔲 Pendiente |
| M6 | Autor completa el CS50 en la plataforma | 🔲 Pendiente |
