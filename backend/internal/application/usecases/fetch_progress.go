package usecases

import (
	"localcode/internal/application/ports"
	"localcode/internal/domain"
	"time"
)

type FetchProgressUseCase struct {
	ProgressRepo ports.ProgressRepository
	ProblemRepo  ports.ProblemRepository
}

func NewFetchProgressUseCase(pr ports.ProgressRepository, probRepo ports.ProblemRepository) *FetchProgressUseCase {
	return &FetchProgressUseCase{
		ProgressRepo: pr,
		ProblemRepo:  probRepo,
	}
}

func (uc *FetchProgressUseCase) GetProgress() ([]domain.Progress, error) {
	return uc.ProgressRepo.FindAll()
}

func (uc *FetchProgressUseCase) MarkSolved(problemID string) error {
	now := time.Now()
	return uc.ProgressRepo.Upsert(&domain.Progress{
		ProblemID:     problemID,
		Status:        "solved",
		LastAttemptAt: &now,
	})
}

type ProgressSummary struct {
	Progress []domain.Progress `json:"progress"`
	Summary  map[string]int    `json:"summary"`
}

func (uc *FetchProgressUseCase) GetSummary() (*ProgressSummary, error) {
	progress, err := uc.ProgressRepo.FindAll()
	if err != nil {
		return nil, err
	}

	problems, err := uc.ProblemRepo.FindAll()
	if err != nil {
		return nil, err
	}

	solved := 0
	inProgress := 0
	notAttempted := len(problems)

	solvedMap := make(map[string]bool)
	for _, p := range progress {
		if p.Status == "solved" {
			solvedMap[p.ProblemID] = true
		}
	}

	for _, p := range problems {
		if solvedMap[p.ID] {
			solved++
		}
	}
	inProgress = len(progress) - solved
	notAttempted = len(problems) - len(progress)

	return &ProgressSummary{
		Progress: progress,
		Summary: map[string]int{
			"total":         len(problems),
			"solved":        solved,
			"in_progress":   inProgress,
			"not_attempted": notAttempted,
		},
	}, nil
}
