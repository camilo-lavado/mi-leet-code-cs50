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

CREATE TABLE submissions (
    id TEXT PRIMARY KEY,
    problem_id TEXT NOT NULL,
    code TEXT NOT NULL,
    status TEXT NOT NULL,
    execution_time_ms INTEGER,
    submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (problem_id) REFERENCES problems(id) ON DELETE CASCADE
);