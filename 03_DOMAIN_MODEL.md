# Domain Model and Persistence Schema (SQLite)

### 1. Relational Schema

```sql
-- AGREGAR en próxima migración:
-- ALTER TABLE problems ADD COLUMN week INTEGER NOT NULL DEFAULT 1;

CREATE TABLE problems (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    difficulty TEXT NOT NULL,
    language TEXT NOT NULL,
    week INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE test_cases (
    id TEXT PRIMARY KEY,
    problem_id TEXT NOT NULL,
    input_data TEXT,
    expected_output TEXT NOT NULL,
    is_hidden INTEGER DEFAULT 0,
    FOREIGN KEY (problem_id) REFERENCES problems(id) ON DELETE CASCADE
);

-- AGREGAR en próxima migración:
-- ALTER TABLE submissions ADD COLUMN memory_kb INTEGER;

CREATE TABLE submissions (
    id TEXT PRIMARY KEY,
    problem_id TEXT NOT NULL,
    code TEXT NOT NULL,
    status TEXT NOT NULL,
    execution_time_ms INTEGER,
    memory_kb INTEGER,
    submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (problem_id) REFERENCES problems(id) ON DELETE CASCADE
);

-- NUEVA tabla para tracker de progreso
CREATE TABLE progress (
    problem_id TEXT PRIMARY KEY,
    status TEXT NOT NULL DEFAULT 'not_attempted',  -- 'not_attempted' | 'in_progress' | 'solved'
    last_attempt_at DATETIME,
    FOREIGN KEY (problem_id) REFERENCES problems(id) ON DELETE CASCADE
);
```

---

### 2. Subtareas pendientes del modelo

#### Migraciones de schema
- [ ] Crear archivo `backend/db/migrations/002_add_week_and_progress.sql`
  - `ALTER TABLE problems ADD COLUMN week INTEGER NOT NULL DEFAULT 1`
  - `ALTER TABLE submissions ADD COLUMN memory_kb INTEGER`
  - `CREATE TABLE progress (...)`
- [ ] Ejecutar migración sin perder datos existentes (backup previo de `localcode.db`)

#### Actualizar capa de dominio (Go)
- [ ] Agregar campo `Week` al struct `Problem` en `internal/domain/problem.go`
- [ ] Agregar campo `MemoryKb` al struct `Submission` en `internal/domain/submission.go`
- [ ] Crear struct `Progress` en `internal/domain/progress.go`

#### Actualizar repositorios (Go)
- [ ] `SQLiteProblemRepository`: agregar `FindByWeek(week int)` y filtro en queries
- [ ] `SQLiteSubmissionRepository`: leer/escribir campo `memory_kb`
- [ ] Crear `SQLiteProgressRepository`: `Upsert()`, `FindAll()`, `FindByWeek()`

#### Actualizar frontend (TypeScript)
- [ ] Agregar `week: number` a interfaz `Problem` en `src/types/index.ts`
- [ ] Agregar `memory_kb?: number` a `SubmissionResult.metrics`
- [ ] Crear interfaz `Progress` para el tracker

#### Seed de datos
- [ ] Actualizar `db/seed.sql` con campo `week` para los 3 problemas existentes
- [ ] Agregar seed para tabla `progress` (todos en `not_attempted`)
