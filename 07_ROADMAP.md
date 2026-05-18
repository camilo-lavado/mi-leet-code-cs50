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

#### UX
- [x] Tema oscuro/claro con Tailwind CSS
- [x] Indicadores de dificultad: Fácil / Media / Difícil
- [x] Feedback visual al ejecutar/enviar (loading, success, error)
- [ ] Estados visuales: Sin intentar / En progreso / Resuelto

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

### Tareas

- [ ] Soporte de lenguaje SQL en el executor
- [ ] Soporte de lenguaje JavaScript en el executor
- [ ] Semana 6 — Python
- [ ] Semana 7 — SQL
- [ ] Semana 8 — HTML, CSS, JavaScript (evaluación adaptada)
- [ ] Semana 9 — Flask (evaluación adaptada)
- [ ] Semana 10 — Emoji/Unicode (teórico)
- [ ] Módulo Ciberseguridad (teórico + ejercicios conceptuales)

**Entregable:** Plataforma con el CS50 completo en español.

---

## Fase 5 — Pulido y Validación

**Objetivo:** Verificar que la plataforma funciona como herramienta de aprendizaje real.

### Tareas

- [ ] El autor completa las 12 semanas usando la plataforma
- [ ] Ajustes de contenido basados en la experiencia de uso
- [ ] Optimización de performance del executor
- [ ] Revisión de todos los textos en español (claridad, tono)
- [ ] Documentación de instalación para que otros puedan usarla

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
