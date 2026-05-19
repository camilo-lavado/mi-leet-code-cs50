package usecases

import (
	"localcode/internal/application/ports"
	"localcode/internal/domain"
)

type FetchHintsUseCase struct {
	HintRepo ports.HintRepository
}

func NewFetchHintsUseCase(hr ports.HintRepository) *FetchHintsUseCase {
	return &FetchHintsUseCase{HintRepo: hr}
}

func (uc *FetchHintsUseCase) Execute(problemId string) ([]domain.Hint, error) {
	return uc.HintRepo.FindByProblemId(problemId)
}
