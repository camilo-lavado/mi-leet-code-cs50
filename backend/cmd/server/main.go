package main

import (
	"database/sql"
	"io/ioutil"
	"log"

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
		log.Fatalf("Error opening database: %v", err)
	}
	defer db.Close()

	// 2. Inicializar schema y seed
	initDatabase(db)

	// 3. Inicializar repositorios
	problemRepo := sqlite.NewSQLiteProblemRepository(db)
	testCaseRepo := sqlite.NewSQLiteTestCaseRepository(db)
	submissionRepo := sqlite.NewSQLiteSubmissionRepository(db)

	// 4. Inicializar executor
	executor, err := docker.NewDockerExecutor()
	if err != nil {
		log.Fatalf("Error initializing docker executor: %v", err)
	}

	// 5. Inicializar Casos de Uso
	fetchProblemsUC := usecases.NewFetchProblemsUseCase(problemRepo, testCaseRepo)
	submitCodeUC := usecases.NewSubmitCodeUseCase(problemRepo, testCaseRepo, submissionRepo, executor)
	fetchSubmissionsUC := usecases.NewFetchSubmissionsUseCase(submissionRepo)

	// 6. Inicializar Handlers y Router
	handlers := httpAdapter.NewHandlers(fetchProblemsUC, submitCodeUC, fetchSubmissionsUC)
	router := httpAdapter.SetupRouter(handlers)

	// 7. Iniciar Servidor
	log.Println("Server running on :8080")
	if err := router.Run(":8080"); err != nil {
		log.Fatalf("Error starting server: %v", err)
	}
}

func initDatabase(db *sql.DB) {
	schema, err := ioutil.ReadFile("db/schema.sql")
	if err != nil {
		log.Fatalf("Error reading schema.sql: %v", err)
	}
	if _, err := db.Exec(string(schema)); err != nil {
		log.Fatalf("Error executing schema.sql: %v", err)
	}

	seed, err := ioutil.ReadFile("db/seed.sql")
	if err != nil {
		log.Fatalf("Error reading seed.sql: %v", err)
	}
	if _, err := db.Exec(string(seed)); err != nil {
		log.Fatalf("Error executing seed.sql: %v", err)
	}
	log.Println("Database initialized and seeded")
}
