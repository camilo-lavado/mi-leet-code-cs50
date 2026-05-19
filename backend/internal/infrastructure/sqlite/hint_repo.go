package sqlite

import (
	"database/sql"
	"localcode/internal/domain"
)

type SQLiteHintRepository struct {
	db *sql.DB
}

func NewSQLiteHintRepository(db *sql.DB) *SQLiteHintRepository {
	return &SQLiteHintRepository{db: db}
}

func (r *SQLiteHintRepository) FindByProblemId(problemId string) ([]domain.Hint, error) {
	rows, err := r.db.Query(
		"SELECT id, problem_id, order_index, question FROM hints WHERE problem_id = ? ORDER BY order_index ASC",
		problemId,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var hints []domain.Hint
	for rows.Next() {
		var h domain.Hint
		if err := rows.Scan(&h.ID, &h.ProblemID, &h.OrderIndex, &h.Question); err != nil {
			return nil, err
		}
		hints = append(hints, h)
	}
	return hints, rows.Err()
}
