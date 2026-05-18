# Plan de Implementación: Fase 1 — MVP Core (Backend + Motor de Ejecución)
## Proyecto: LocalCode — CS50 en Español

**Estado:** ✅ COMPLETADA
**Objetivo:** Desarrollar el core del backend en Go y el motor de ejecución aislado usando Docker.

### 1. Inicialización del Proyecto
- [x] Crear directorio `backend`.
- [x] Inicializar módulo Go: `go mod init localcode`.
- [x] Instalar dependencias base:
  - Framework web: `github.com/gin-gonic/gin`
  - Base de datos: `github.com/mattn/go-sqlite3`
  - Docker SDK: `github.com/docker/docker/client`

### 2. Base de Datos (SQLite)
- [x] Crear directorio `db`.
- [x] Escribir `db/schema.sql` con las tablas: `problems`, `test_cases`, `submissions`.
- [x] Escribir `db/seed.sql` con datos de prueba (por ejemplo, el problema "Mario" de la Semana 1 en C).

### 3. Capa de Dominio (`internal/domain`)
- [x] Definir entidad `Problem` (ID, Title, Description, Difficulty, Language, Week).
- [x] Definir entidad `TestCase` (ID, ProblemID, InputData, ExpectedOutput, IsHidden).
- [x] Definir entidad `Submission` (ID, ProblemID, Code, Status, ExecutionTimeMs, MemoryKb, SubmittedAt).
- [x] Definir `ExecutionResult` (Stdout, Stderr, ExitCode, TimeMs, MemoryKb).
- [x] Definir `CodeSnippet` (Code, Language).

### 4. Capa de Aplicación (`internal/application`)
- [x] Definir interfaces (ports):
  - `ProblemRepository`: `FindAll()`, `FindById()`
  - `SubmissionRepository`: `Save()`
  - `TestCaseRepository`: `FindByProblemId()`
  - `CodeExecutor`: `Execute(snippet CodeSnippet, testCase TestCase) ExecutionResult`
- [x] Implementar Casos de Uso (`internal/application/usecases`):
  - `FetchProblemsUseCase`: Obtiene problemas del repositorio.
  - `SubmitCodeUseCase`: Coordina buscar test cases, ejecutar el código usando `CodeExecutor` para cada test case, evaluar el resultado, y guardar la submission.

### 5. Capa de Infraestructura (`internal/infrastructure`)
- [x] Implementar repositorios SQLite (`internal/infrastructure/sqlite`):
  - `SQLiteProblemRepository`
  - `SQLiteTestCaseRepository`
  - `SQLiteSubmissionRepository`
- [x] Implementar adaptador HTTP (`internal/infrastructure/http`):
  - Handlers para los endpoints usando Gin.
  - `GET /api/v1/problems`
  - `GET /api/v1/problems/:id`
  - `POST /api/v1/submissions`
- [x] Implementar Motor de Ejecución Docker (`internal/infrastructure/docker`):
  - `DockerExecutor` que utilice el SDK de Docker para crear contenedores efímeros (`gcc:latest`, `python:3.11-alpine`), montar volúmenes, capturar logs y retornar resultados.

### 6. Integración (`cmd/server`)
- [x] Configurar `main.go` para inyectar dependencias:
  - Conectar a SQLite.
  - Inicializar cliente Docker.
  - Inicializar repositorios y casos de uso.
  - Inicializar handlers HTTP.
  - Levantar el servidor en el puerto 8080.

### Criterios de Aceptación
- [x] La base de datos se inicializa automáticamente si no existe.
- [x] Se puede hacer un `GET /api/v1/problems` y obtener la lista inicial.
- [x] Se puede hacer un `POST /api/v1/submissions` con código en C válido y obtener status `Accepted`.
- [x] Se puede hacer un `POST /api/v1/submissions` con código en C inválido y obtener status `Failed` (compilation error o wrong output).
