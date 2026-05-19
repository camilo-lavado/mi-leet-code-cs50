package sqlite

import (
	"database/sql"
	"localcode/internal/domain"
)

type SQLiteFlashcardRepository struct {
	db *sql.DB
}

func NewSQLiteFlashcardRepository(db *sql.DB) *SQLiteFlashcardRepository {
	return &SQLiteFlashcardRepository{db: db}
}

func (r *SQLiteFlashcardRepository) FindByWeek(week int) ([]domain.Flashcard, error) {
	rows, err := r.db.Query(
		"SELECT id, week, question, answer, order_index FROM flashcards WHERE week = ? ORDER BY order_index ASC",
		week,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var cards []domain.Flashcard
	for rows.Next() {
		var fc domain.Flashcard
		if err := rows.Scan(&fc.ID, &fc.Week, &fc.Question, &fc.Answer, &fc.OrderIndex); err != nil {
			return nil, err
		}
		cards = append(cards, fc)
	}
	return cards, rows.Err()
}
