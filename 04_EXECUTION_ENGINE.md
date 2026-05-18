### `04_EXECUTION_ENGINE.md` (Isolated Runner Specs)

```markdown
# Execution Engine Adapter Specification

### 1. Responsibility
The DockerExecutor fulfills the CodeExecutor port. It takes a CodeSnippet and a TestCase, runs it in an isolated Docker container via the Docker SDK for Go, and returns an ExecutionResult.

### 2. Execution Flow
1. Receive code string and language target.
2. Create a temporary directory in the host OS.
3. Write the code string to a file inside the temp directory.
4. Mount the directory as a read-only volume inside an ephemeral Docker container.
5. Execute the compilation/interpretation command.
6. Capture stdout, stderr, and exit codes.
7. Destroy the container and remove temporary files automatically.

### 3. Container Constraints (Security limits via Docker SDK)
- NetworkMode: "none"
- Memory: 128MB
- Timeout: 5000ms hard kill

### 4. Environments
#### C Environment
- Image: gcc:latest
- Run Command: sh -c "gcc -O3 -o solution code.c && ./solution < input.txt"

#### Python Environment
- Image: python:3.11-alpine
- Run Command: sh -c "python solution.py < input.txt"

---

### 5. Subtareas pendientes del executor

#### Nuevos lenguajes
- [ ] **SQL:** Configurar imagen `sqlite:alpine`, ejecutar `.read solution.sql` contra test case
- [ ] **JavaScript:** Configurar imagen `node:alpine`, ejecutar `node solution.js < input.txt`
- [ ] Documentar plantilla para agregar un nuevo lenguaje (guía en `backend/internal/infrastructure/docker/README.md`)

#### Robustez
- [ ] Implementar timeout con `context.WithTimeout` en Go (no solo flag de Docker)
- [ ] Verificar que contenedores huérfanos se limpian (test: matar proceso Go mientras corre un container)
- [ ] Agregar límite de tamaño de código (max 100KB) para evitar ataques de compresión
- [ ] Capturar y retornar `stderr` en la respuesta de la API (para debugging del usuario)
- [ ] Agregar healthcheck al iniciar el servidor: verificar que Docker daemon responde

#### Métricas
- [ ] Leer memoria real usada por el contenedor (no solo el límite), exponerla en `ExecutionMetrics`
- [ ] Agregar contador de submissions y tiempo promedio de ejecución (métricas internas)

#### Testing
- [ ] Test: código C que compila pero hace `while(1)` → debe terminar por timeout
- [ ] Test: código Python que intenta `import os; os.system('rm -rf /')` → debe fallar por seguridad
- [ ] Test: 5 submissions concurrentes → todas deben completar sin deadlock