package sqlite

import (
	"database/sql"
	"localcode/internal/domain"
)

type SQLiteProgressRepository struct {
	db *sql.DB
}

func NewSQLiteProgressRepository(db *sql.DB) *SQLiteProgressRepository {
	return &SQLiteProgressRepository{db: db}
}

func (r *SQLiteProgressRepository) Upsert(progress *domain.Progress) error {
	_, err := r.db.Exec(`
		INSERT INTO progress (problem_id, status, last_attempt_at)
		VALUES (?, ?, ?)
		ON CONFLICT(problem_id) DO UPDATE SET
			status = excluded.status,
			last_attempt_at = excluded.last_attempt_at
	`, progress.ProblemID, progress.Status, progress.LastAttemptAt)
	return err
}

func (r *SQLiteProgressRepository) FindAll() ([]domain.Progress, error) {
	rows, err := r.db.Query("SELECT problem_id, status, last_attempt_at FROM progress")
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var progress []domain.Progress
	for rows.Next() {
		var p domain.Progress
		if err := rows.Scan(&p.ProblemID, &p.Status, &p.LastAttemptAt); err != nil {
			return nil, err
		}
		progress = append(progress, p)
	}
	return progress, nil
}
