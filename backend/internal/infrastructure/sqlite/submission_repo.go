package sqlite

import (
	"database/sql"
	"localcode/internal/domain"
)

type SQLiteSubmissionRepository struct {
	db *sql.DB
}

func NewSQLiteSubmissionRepository(db *sql.DB) *SQLiteSubmissionRepository {
	return &SQLiteSubmissionRepository{db: db}
}

func (r *SQLiteSubmissionRepository) Save(submission *domain.Submission) error {
	_, err := r.db.Exec(`
		INSERT INTO submissions (id, problem_id, code, status, execution_time_ms, memory_kb, submitted_at)
		VALUES (?, ?, ?, ?, ?, ?, ?)
	`, submission.ID, submission.ProblemID, submission.Code, submission.Status, submission.ExecutionTimeMs, submission.MemoryKb, submission.SubmittedAt)
	
	return err
}
