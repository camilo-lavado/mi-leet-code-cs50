CREATE TABLE IF NOT EXISTS problems (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    difficulty TEXT NOT NULL,
    language TEXT NOT NULL,
    week INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS test_cases (
    id TEXT PRIMARY KEY,
    problem_id TEXT NOT NULL,
    input_data TEXT,
    expected_output TEXT NOT NULL,
    is_hidden INTEGER DEFAULT 0,
    FOREIGN KEY (problem_id) REFERENCES problems(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS submissions (
    id TEXT PRIMARY KEY,
    problem_id TEXT NOT NULL,
    code TEXT NOT NULL,
    status TEXT NOT NULL,
    execution_time_ms INTEGER,
    memory_kb INTEGER,
    submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (problem_id) REFERENCES problems(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS hints (
    id TEXT PRIMARY KEY,
    problem_id TEXT NOT NULL,
    order_index INTEGER NOT NULL,
    question TEXT NOT NULL,
    FOREIGN KEY (problem_id) REFERENCES problems(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS flashcards (
    id TEXT PRIMARY KEY,
    week INTEGER NOT NULL,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    order_index INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS progress (
    problem_id TEXT PRIMARY KEY,
    status TEXT NOT NULL DEFAULT 'not_attempted',
    last_attempt_at DATETIME,
    FOREIGN KEY (problem_id) REFERENCES problems(id) ON DELETE CASCADE
);
