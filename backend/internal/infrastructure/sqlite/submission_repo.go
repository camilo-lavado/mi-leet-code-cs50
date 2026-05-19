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

func (r *SQLiteSubmissionRepository) FindAll() ([]domain.Submission, error) {
	rows, err := r.db.Query("SELECT id, problem_id, code, status, execution_time_ms, memory_kb, submitted_at FROM submissions ORDER BY submitted_at DESC")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var submissions []domain.Submission
	for rows.Next() {
		var s domain.Submission
		if err := rows.Scan(&s.ID, &s.ProblemID, &s.Code, &s.Status, &s.ExecutionTimeMs, &s.MemoryKb, &s.SubmittedAt); err != nil {
			return nil, err
		}
		submissions = append(submissions, s)
	}
	return submissions, rows.Err()
}
