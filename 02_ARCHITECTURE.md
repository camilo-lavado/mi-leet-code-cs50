# Arquitectura del Sistema
## Proyecto: LocalCode — CS50 en Español

### 1. Patrón Arquitectónico

**Arquitectura Hexagonal (Puertos y Adaptadores)** combinada con **Domain-Driven Design (DDD)**.

La lógica de negocio (dominio) está completamente aislada de los detalles de infraestructura (base de datos, Docker, HTTP). Esto permite cambiar adaptadores sin tocar el núcleo.

```
┌─────────────────────────────────────────────────────┐
│                   FRONTEND (React)                  │
│         Monaco Editor · React Router · Vite         │
└─────────────────────────┬───────────────────────────┘
                          │ HTTP / REST
┌─────────────────────────▼───────────────────────────┐
│              INPUT ADAPTERS (Driving)               │
│              REST API Handlers (GoLang/Gin)         │
├─────────────────────────────────────────────────────┤
│               APPLICATION LAYER                     │
│        SubmitCodeUseCase · FetchProblemsUseCase      │
│     Ports: ProblemRepository · CodeExecutor         │
├─────────────────────────────────────────────────────┤
│                 DOMAIN LAYER (Core)                 │
│  Entities: Problem · Submission · TestCase          │
│  Value Objects: CodeSnippet · ExecutionResult       │
├─────────────────────────────────────────────────────┤
│             OUTPUT ADAPTERS (Driven)                │
│   SQLiteRepository · DockerExecutor                 │
└──────────┬──────────────────────┬───────────────────┘
           │                      │
    ┌──────▼──────┐        ┌──────▼──────┐
    │   SQLite    │        │   Docker    │
    │   (datos)   │        │  (ejecución)│
    └─────────────┘        └─────────────┘
```

---

### 2. Stack Tecnológico

| Capa | Tecnología | Justificación |
|------|------------|---------------|
| Frontend | React + Vite + TypeScript | Ecosistema maduro, Monaco Editor disponible |
| Editor | `@monaco-editor/react` | Mismo motor que VS Code, soporte C/Python/SQL/JS |
| Backend/API | GoLang + Gin | Alto rendimiento, concurrencia nativa, binario único |
| Base de datos | SQLite | Sin servidor externo, simple, suficiente para mono-usuario |
| Ejecución | Docker Engine API (Go SDK) | Aislamiento seguro de código arbitrario |

---

### 3. Estructura de Directorios (Objetivo)

```
mi-leet-code/
├── backend/                    # GoLang API
│   ├── cmd/server/main.go
│   ├── internal/
│   │   ├── domain/             # Entidades y value objects
│   │   │   ├── problem.go
│   │   │   ├── submission.go
│   │   │   └── testcase.go
│   │   ├── application/        # Casos de uso y puertos
│   │   │   ├── usecases/
│   │   │   └── ports/
│   │   └── infrastructure/     # Adaptadores
│   │       ├── sqlite/
│   │       ├── docker/
│   │       └── http/
│   ├── db/
│   │   ├── schema.sql
│   │   └── seed.sql
│   └── go.mod
│
├── frontend/                   # React + Vite + TypeScript
│   ├── src/
│   │   ├── api/              # Cliente HTTP y funciones API
│   │   │   ├── client.ts
│   │   │   ├── problems.ts
│   │   │   └── submissions.ts
│   │   ├── hooks/            # TanStack Query hooks
│   │   │   ├── useProblems.ts
│   │   │   └── useSubmission.ts
│   │   ├── types/            # Interfaces TypeScript
│   │   │   └── index.ts
│   │   ├── components/
│   │   │   ├── layout/       # Header, Layout
│   │   │   ├── problems/     # ProblemCard, ProblemList, DifficultyBadge
│   │   │   ├── editor/       # CodeEditor (Monaco), LanguageSelector
│   │   │   ├── submission/   # SubmitButton, SubmissionResults
│   │   │   └── ui/           # Spinner
│   │   ├── pages/
│   │   │   ├── CatalogPage.tsx
│   │   │   ├── ProblemPage.tsx
│   │   │   └── NotFoundPage.tsx
│   │   ├── App.tsx           # Router + QueryClientProvider
│   │   └── main.tsx
│   └── vite.config.ts        # Tailwind plugin + proxy /api
│
├── content/                    # Contenido del curso en español
│   ├── semana-0/
│   ├── semana-1/
│   │   ├── lectura.md
│   │   ├── complemento.md
│   │   ├── glosario.md
│   │   └── problemas/
│   │       ├── mario.md
│   │       ├── cash.md
│   │       └── credit.md
│   └── ...
│
└── docs/                       # Documentación del proyecto
    ├── 01_PRD.md
    ├── 02_ARCHITECTURE.md
    └── ...
```

---

### 4. Capa de Dominio

#### Entidades
- **Problem** — Un problema del curso: id, título, descripción, dificultad, semana, lenguaje.
- **TestCase** — Caso de prueba asociado a un problema: input, expected_output, is_hidden.
- **Submission** — Intento de solución: código enviado, estado, métricas, timestamp.
- **ExecutionResult** — Resultado de ejecutar código: stdout, stderr, exit_code, time_ms, memory_kb.

#### Value Objects
- **CodeSnippet** — Código fuente + lenguaje objetivo.
- **ExecutionMetrics** — Tiempo de ejecución y memoria usada.

---

### 5. Capa de Aplicación

#### Casos de Uso
- **SubmitCodeUseCase** — Recibe un CodeSnippet y un Problem, ejecuta contra todos los TestCases, persiste la Submission, retorna el resultado.
- **FetchProblemsUseCase** — Retorna la lista de problemas, opcionalmente filtrados por semana o dificultad.

#### Puertos (Interfaces)
- **ProblemRepository** — `FindAll()`, `FindById()`, `FindBySemana()`.
- **SubmissionRepository** — `Save()`, `FindByProblemId()`.
- **CodeExecutor** — `Execute(snippet CodeSnippet, testCase TestCase) ExecutionResult`.

---

### 6. Decisiones de Diseño

| Decisión | Justificación |
|----------|---------------|
| GoLang para el backend | El `DockerExecutor` necesita manejar concurrencia real. Go es ideal para esto. |
| SQLite sin ORM | La simplicidad del dominio no justifica la complejidad de un ORM. SQL puro es más claro. |
| Monaco Editor en frontend | Es el editor de VS Code. Los estudiantes ya están familiarizados con él visualmente. |
| Contenido en archivos `.md` | Permite editar el contenido del curso fácilmente sin tocar la base de datos. |

---

### 7. Subtareas pendientes de arquitectura

#### Validación de arquitectura hexagonal
- [ ] Auditar `internal/domain/` — verificar que no importa paquetes de infraestructura
- [ ] Auditar `internal/application/` — verificar que los use cases solo dependen de puertos (interfaces)
- [ ] Mover cualquier lógica de negocio que esté en handlers HTTP al application layer

#### Testing
- [ ] Test unitario de `SubmitCodeUseCase` con mock de `CodeExecutor`
- [ ] Test de integración end-to-end: handler HTTP → use case → executor real (Docker)
- [ ] Test del frontend con MSW (Mock Service Worker) simulando la API

#### Escalabilidad pendiente
- [ ] Evaluar concurrencia: ¿qué pasa si se submiten 5 problemas simultáneos?
- [ ] Implementar cola de ejecución si Docker se satura (máx N contenedores simultáneos)
- [ ] Calcular tiempo de arranque en frío de cada imagen Docker y documentarlo

#### Nuevos adaptadores (fuera del MVP pero diseñados)
- [ ] ContentLoader: servicio que lee archivos `.md` del directorio `content/` y los sirve como contenido de semana
- [ ] Exportador de progreso: permite exportar el tracker a JSON para respaldo

#### Deuda técnica
- [ ] Agregar `week` y `memory_kb` al schema de BD (ver 03_DOMAIN_MODEL.md)
- [ ] Documentar cómo agregar un nuevo lenguaje al executor (guía paso a paso)
- [ ] Logging estructurado en backend (reemplazar `fmt.Println` por `log/slog`)