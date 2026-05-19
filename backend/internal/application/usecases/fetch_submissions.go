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

func (uc *FetchSubmissionsUseCase) Execute() ([]domain.Submission, error) {
	return uc.SubmissionRepo.FindAll()
}
