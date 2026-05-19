# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**mi-leet-code** is a local LeetCode-style platform for learning C and Python programming through CS50-inspired problem sets. It features a Monaco code editor, Docker-based sandboxed code execution, Socratic hints, flashcards, and a gamification/stats system.

## Repository Structure

```
backend/   # Go API server (Gin + SQLite + Docker executor)
frontend/  # React + TypeScript + Vite SPA
```

## Commands

### Backend (from `backend/`)

```bash
go run ./cmd/server/main.go   # Start server on :8080
go build ./cmd/server/...     # Build binary
go vet ./...                   # Lint
```

> **Requires Docker running** — the code executor spins up `gcc:latest` and `python:3.11-alpine` containers.

### Frontend (from `frontend/`)

```bash
npm run dev      # Dev server (proxies /api/v1 to backend :8080)
npm run build    # TypeScript check + Vite production build
npm run lint     # ESLint
npm run preview  # Preview production build
```

## Architecture

### Backend — Clean Architecture in Go

The backend follows strict layer separation:

- **`domain/entities.go`** — Pure Go structs: `Problem`, `TestCase`, `Submission`, `Hint`, `Flashcard`, `UserStats`. No dependencies.
- **`application/ports/ports.go`** — Repository and executor interfaces (`ProblemRepository`, `CodeExecutor`, etc.).
- **`application/usecases/`** — One file per use case. Each use case depends only on port interfaces.
- **`infrastructure/sqlite/`** — SQLite implementations of all repository interfaces.
- **`infrastructure/docker/executor.go`** — `CodeExecutor` implementation: creates an isolated Docker container per submission, copies code + `input.txt` + common assets (`assets/common/`) and per-problem assets (`assets/problems/<problem_id>/`) via tar, runs with 5s timeout and 128MB RAM limit, no network.
- **`infrastructure/http/`** — Gin router + handlers wiring use cases to HTTP.
- **`cmd/server/main.go`** — Composition root: opens DB, runs `schema.sql` + `seed.sql` on every start, wires everything together.

### Database

SQLite file at `backend/localcode.db`. Schema and seed are re-applied on every server start (`CREATE TABLE IF NOT EXISTS` is idempotent). To reset data, delete `localcode.db` and restart.

Content for `TheoryPage` is read from markdown files in `backend/content/semana-<N>/` (not from the DB).

### Frontend — React SPA

- **Routing**: `App.tsx` defines three routes: `/` (CatalogPage), `/problems/:id` (ProblemPage), `/weeks/:weekStr` (TheoryPage).
- **Data fetching**: All server state via `@tanstack/react-query`. Custom hooks in `src/hooks/` wrap API calls from `src/api/` (which all hit `/api/v1`).
- **API client**: `src/api/client.ts` — thin `fetch` wrapper. No auth, no interceptors.
- **ProblemPage layout**: Split panel — left (40%) shows problem description + visible test cases + hint button; right (60%) has Monaco editor with Feynman technique textarea, language selector, submit button, and execution console.

### Supported Languages

Only `c` (compiled with `gcc` inside `gcc:latest`, with `cs50.h`/`cs50.c` available) and `python` (run with `python:3.11-alpine`) are supported. Language support is hardcoded in `infrastructure/docker/executor.go`.

## Adding Content

- **New problems**: Insert into `db/seed.sql` (`problems`, `test_cases`, `hints`, `flashcards` tables). IDs are plain text slugs.
- **Problem-specific assets** (e.g., `.bmp` files): Place in `backend/assets/problems/<problem_id>/` — they are auto-copied into the container.
- **Theory content**: Add markdown files under `backend/content/semana-<N>/lectura.md`, `complemento.md`, `glosario.md`.
