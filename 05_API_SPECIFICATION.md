Markdown
# RESTful API Contracts

### GET /api/v1/problems

#### Response
```json
{
  "data": [
    {
      "id": "c85b5e67-1234-4b56-a789-abcdef123456",
      "title": "Mario",
      "difficulty": "Easy",
      "language": "C"
    }
  ]
}
GET /api/v1/problems/{id}
Response
JSON
{
  "id": "c85b5e67-1234-4b56-a789-abcdef123456",
  "title": "Mario",
  "description": "Implement a program that prints out a half-pyramid of a specified height.",
  "language": "C",
  "test_cases": [
    {
      "id": "d96c6f78-1234-4b56-a789-abcdef123456",
      "input_data": "4",
      "is_hidden": false
    }
  ]
}
POST /api/v1/submissions
Request
JSON
{
  "problem_id": "c85b5e67-1234-4b56-a789-abcdef123456",
  "language": "c",
  "code": "#include <stdio.h>\nint main() {\nprintf(\"hello, world\\n\");\nreturn 0;\n}"
}
Response
JSON
{
  "submission_id": "e07d7g89-1234-4b56-a789-abcdef123456",
  "status": "Accepted",
  "passed_tests": 5,
  "total_tests": 5,
  "metrics": {
    "time_ms": 12,
    "memory_kb": 1024
  }
}

---

### Endpoints pendientes (MVP)

#### GET /api/v1/problems?week=1&difficulty=Easy
Filtra problemas por semana y/o dificultad.

#### GET /api/v1/submissions?problem_id={id}
Historial de submissions para un problema.

Response:
```json
{
  "data": [
    {
      "submission_id": "...",
      "status": "Accepted",
      "passed_tests": 5,
      "total_tests": 5,
      "metrics": { "time_ms": 12, "memory_kb": 1024 },
      "submitted_at": "2026-05-18T10:30:00Z"
    }
  ]
}
```

#### GET /api/v1/progress
Tracker de progreso global.

Response:
```json
{
  "data": [
    {
      "problem_id": "...",
      "status": "solved",
      "last_attempt_at": "2026-05-18T10:30:00Z"
    }
  ],
  "summary": {
    "total": 30,
    "solved": 3,
    "in_progress": 1,
    "not_attempted": 26
  }
}
```

---

### Subtareas pendientes de API

#### Endpoints nuevos
- [ ] Implementar `GET /api/v1/problems?week=X&difficulty=Y` con query params
- [ ] Implementar `GET /api/v1/submissions?problem_id=X` para historial
- [ ] Implementar `GET /api/v1/progress` para tracker
- [ ] Implementar `POST /api/v1/progress` (upsert) al resolver un problema

#### Robustez
- [ ] Validar body en `POST /api/v1/submissions`: campos requeridos, `code` no vacío, max 100KB
- [ ] Manejar errores con códigos HTTP correctos: 400 (bad request), 404 (not found), 500 (internal), 503 (Docker unavailable)
- [ ] Rate limiting: máximo 10 submissions por minuto (proteger el executor)
- [ ] Timeout de 30s en handlers HTTP que llaman al executor

#### Frontend
- [ ] Conectar `ProblemPage` al endpoint con filtro de semana
- [ ] Conectar historial de submissions en `ProblemPage`
- [ ] Crear página/hook para consumir `GET /api/v1/progress`
- [ ] Agregar `week` y `difficulty` a los query params en `useProblems`