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