package main

import (
	"database/sql"
	"fmt"
	"io/ioutil"
	"log/slog"
	"os"

	_ "modernc.org/sqlite"

	"localcode/internal/application/usecases"
	"localcode/internal/infrastructure/docker"
	httpAdapter "localcode/internal/infrastructure/http"
	"localcode/internal/infrastructure/sqlite"
)

func main() {
	// 1. Conectar a SQLite
	db, err := sql.Open("sqlite", "./localcode.db")
	if err != nil {
		slog.Error(fmt.Sprintf("Error opening database: %v", err))
		os.Exit(1)
	}
	defer db.Close()

	// 2. Inicializar schema y seed
	initDatabase(db)

	// 3. Inicializar repositorios
	problemRepo := sqlite.NewSQLiteProblemRepository(db)
	testCaseRepo := sqlite.NewSQLiteTestCaseRepository(db)
	submissionRepo := sqlite.NewSQLiteSubmissionRepository(db)
	hintRepo := sqlite.NewSQLiteHintRepository(db)
	flashcardRepo := sqlite.NewSQLiteFlashcardRepository(db)

	// 4. Inicializar executor
	executor, err := docker.NewDockerExecutor()
	if err != nil {
		slog.Error(fmt.Sprintf("Error initializing docker executor: %v", err))
		os.Exit(1)
	}

	if err := executor.Ping(); err != nil {
		slog.Warn("Docker daemon not reachable", "error", err)
		slog.Warn("Code execution will fail until Docker is available")
	} else {
		slog.Info("Docker daemon reachable")
	}

	// 5. Inicializar Casos de Uso
	progressRepo := sqlite.NewSQLiteProgressRepository(db)
	fetchProgressUC := usecases.NewFetchProgressUseCase(progressRepo, problemRepo)
	fetchProblemsUC := usecases.NewFetchProblemsUseCase(problemRepo, testCaseRepo)
	submitCodeUC := usecases.NewSubmitCodeUseCase(problemRepo, testCaseRepo, submissionRepo, executor, progressRepo)
	fetchSubmissionsUC := usecases.NewFetchSubmissionsUseCase(submissionRepo)
	fetchHintsUC := usecases.NewFetchHintsUseCase(hintRepo)
	fetchFlashcardsUC := usecases.NewFetchFlashcardsUseCase(flashcardRepo)
	getStatsUC := usecases.NewGetStatsUseCase(problemRepo, submissionRepo)
	fetchContentUC := usecases.NewFetchContentUseCase("content")

	// 6. Inicializar Handlers y Router
	handlers := httpAdapter.NewHandlers(fetchProblemsUC, submitCodeUC, fetchSubmissionsUC, fetchHintsUC, fetchFlashcardsUC, getStatsUC, fetchContentUC, fetchProgressUC)
	router := httpAdapter.SetupRouter(handlers)

	// 7. Iniciar Servidor
	slog.Info("Server running on :8080")
	if err := router.Run(":8080"); err != nil {
		slog.Error(fmt.Sprintf("Error starting server: %v", err))
		os.Exit(1)
	}
}

func initDatabase(db *sql.DB) {
	schema, err := ioutil.ReadFile("db/schema.sql")
	if err != nil {
		slog.Error(fmt.Sprintf("Error reading schema.sql: %v", err))
		os.Exit(1)
	}
	if _, err := db.Exec(string(schema)); err != nil {
		slog.Error(fmt.Sprintf("Error executing schema.sql: %v", err))
		os.Exit(1)
	}

	seed, err := ioutil.ReadFile("db/seed.sql")
	if err != nil {
		slog.Error(fmt.Sprintf("Error reading seed.sql: %v", err))
		os.Exit(1)
	}
	if _, err := db.Exec(string(seed)); err != nil {
		slog.Error(fmt.Sprintf("Error executing seed.sql: %v", err))
		os.Exit(1)
	}
	slog.Info("Database initialized and seeded")
}
