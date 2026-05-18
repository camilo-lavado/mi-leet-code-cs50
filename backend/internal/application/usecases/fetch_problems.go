package usecases

import (
	"localcode/internal/application/ports"
	"localcode/internal/domain"
)

type FetchProblemsUseCase struct {
	ProblemRepo  ports.ProblemRepository
	TestCaseRepo ports.TestCaseRepository
}

func NewFetchProblemsUseCase(pr ports.ProblemRepository, tr ports.TestCaseRepository) *FetchProblemsUseCase {
	return &FetchProblemsUseCase{
		ProblemRepo:  pr,
		TestCaseRepo: tr,
	}
}

func (uc *FetchProblemsUseCase) Execute() ([]domain.Problem, error) {
	return uc.ProblemRepo.FindAll()
}

func (uc *FetchProblemsUseCase) ExecuteById(id string) (*domain.Problem, error) {
	problem, err := uc.ProblemRepo.FindById(id)
	if err != nil || problem == nil {
		return problem, err
	}
	
	testCases, err := uc.TestCaseRepo.FindByProblemId(id)
	if err == nil {
		problem.TestCases = testCases
	}
	
	return problem, nil
}
