package sqlite

import (
	"database/sql"
	"localcode/internal/domain"
)

type SQLiteTestCaseRepository struct {
	db *sql.DB
}

func NewSQLiteTestCaseRepository(db *sql.DB) *SQLiteTestCaseRepository {
	return &SQLiteTestCaseRepository{db: db}
}

func (r *SQLiteTestCaseRepository) FindByProblemId(problemId string) ([]domain.TestCase, error) {
	rows, err := r.db.Query("SELECT id, problem_id, input_data, expected_output, is_hidden FROM test_cases WHERE problem_id = ?", problemId)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var testCases []domain.TestCase
	for rows.Next() {
		var tc domain.TestCase
		if err := rows.Scan(&tc.ID, &tc.ProblemID, &tc.InputData, &tc.ExpectedOutput, &tc.IsHidden); err != nil {
			return nil, err
		}
		testCases = append(testCases, tc)
	}
	return testCases, nil
}
