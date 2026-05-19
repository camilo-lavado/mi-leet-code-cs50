package usecases

import (
	"localcode/internal/application/ports"
	"localcode/internal/domain"
)

type FetchFlashcardsUseCase struct {
	FlashcardRepo ports.FlashcardRepository
}

func NewFetchFlashcardsUseCase(fr ports.FlashcardRepository) *FetchFlashcardsUseCase {
	return &FetchFlashcardsUseCase{FlashcardRepo: fr}
}

func (uc *FetchFlashcardsUseCase) Execute(week int) ([]domain.Flashcard, error) {
	return uc.FlashcardRepo.FindByWeek(week)
}
