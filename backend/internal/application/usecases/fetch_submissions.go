package usecases

import (
	"localcode/internal/application/ports"
	"localcode/internal/domain"
)

type FetchSubmissionsUseCase struct {
	SubmissionRepo ports.SubmissionRepository
}

func NewFetchSubmissionsUseCase(sr ports.SubmissionRepository) *FetchSubmissionsUseCase {
	return &FetchSubmissionsUseCase{
		SubmissionRepo: sr,
	}
}

func (uc *FetchSubmissionsUseCase) Execute(problemID string) ([]domain.Submission, error) {
	if problemID != "" {
		return uc.SubmissionRepo.FindByProblemId(problemID)
	}
	return uc.SubmissionRepo.FindAll()
}
