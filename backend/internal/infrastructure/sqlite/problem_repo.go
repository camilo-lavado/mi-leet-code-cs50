package sqlite

import (
	"database/sql"
	"localcode/internal/domain"
)

type SQLiteProblemRepository struct {
	db *sql.DB
}

func NewSQLiteProblemRepository(db *sql.DB) *SQLiteProblemRepository {
	return &SQLiteProblemRepository{db: db}
}

func (r *SQLiteProblemRepository) FindAll() ([]domain.Problem, error) {
	rows, err := r.db.Query("SELECT id, title, description, difficulty, language, week FROM problems")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var problems []domain.Problem
	for rows.Next() {
		var p domain.Problem
		if err := rows.Scan(&p.ID, &p.Title, &p.Description, &p.Difficulty, &p.Language, &p.Week); err != nil {
			return nil, err
		}
		problems = append(problems, p)
	}
	return problems, nil
}

func (r *SQLiteProblemRepository) FindById(id string) (*domain.Problem, error) {
	row := r.db.QueryRow("SELECT id, title, description, difficulty, language, week FROM problems WHERE id = ?", id)
	
	var p domain.Problem
	if err := row.Scan(&p.ID, &p.Title, &p.Description, &p.Difficulty, &p.Language, &p.Week); err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}
	return &p, nil
}
