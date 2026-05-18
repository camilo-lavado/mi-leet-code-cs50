package usecases

import (
	"localcode/internal/application/ports"
	"localcode/internal/domain"
)

type FetchProblemsUseCase struct {
	ProblemRepo ports.ProblemRepository
}

func NewFetchProblemsUseCase(repo ports.ProblemRepository) *FetchProblemsUseCase {
	return &FetchProblemsUseCase{ProblemRepo: repo}
}

func (uc *FetchProblemsUseCase) Execute() ([]domain.Problem, error) {
	return uc.ProblemRepo.FindAll()
}

func (uc *FetchProblemsUseCase) ExecuteById(id string) (*domain.Problem, error) {
	return uc.ProblemRepo.FindById(id)
}
