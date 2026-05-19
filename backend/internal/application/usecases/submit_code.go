package usecases

import (
	"errors"
	"log/slog"
	"strings"
	"time"

	"github.com/google/uuid"
	"localcode/internal/application/ports"
	"localcode/internal/domain"
)

type SubmitCodeUseCase struct {
	ProblemRepo    ports.ProblemRepository
	TestCaseRepo   ports.TestCaseRepository
	SubmissionRepo ports.SubmissionRepository
	Executor       ports.CodeExecutor
	ProgressRepo   ports.ProgressRepository
}

func NewSubmitCodeUseCase(
	pr ports.ProblemRepository,
	tr ports.TestCaseRepository,
	sr ports.SubmissionRepository,
	ex ports.CodeExecutor,
	pgr ports.ProgressRepository,
) *SubmitCodeUseCase {
	return &SubmitCodeUseCase{
		ProblemRepo:    pr,
		TestCaseRepo:   tr,
		SubmissionRepo: sr,
		Executor:       ex,
		ProgressRepo:   pgr,
	}
}

type SubmissionResultDTO struct {
	SubmissionID string `json:"submissionId"`
	Status       string `json:"status"`
	Passed       int    `json:"passed"`
	Total        int    `json:"total"`
	TimeMs       int    `json:"timeMs"`
	MemoryKb     int    `json:"memoryKb"`
}

func (uc *SubmitCodeUseCase) Execute(problemId string, language string, code string, mode string) (*SubmissionResultDTO, error) {
	problem, err := uc.ProblemRepo.FindById(problemId)
	if err != nil {
		return nil, err
	}
	if problem == nil {
		return nil, errors.New("problem not found")
	}

	testCases, err := uc.TestCaseRepo.FindByProblemId(problemId)
	if err != nil {
		return nil, err
	}

	snippet := domain.CodeSnippet{
		Code:     code,
		Language: language,
	}

	passedCount := 0
	totalCount := 0
	overallStatus := "Accepted"
	totalTimeMs := 0
	maxMemoryKb := 0

	isRun := mode == "run"

	for _, tc := range testCases {
		if isRun && tc.IsHidden {
			continue
		}
		totalCount++

		res := uc.Executor.Execute(snippet, tc)
		
		totalTimeMs += res.TimeMs
		if res.MemoryKb > maxMemoryKb {
			maxMemoryKb = res.MemoryKb
		}

		if res.ExitCode != 0 {
			overallStatus = "Failed (Compilation/Runtime Error)"
			break
		}

		actualOutput := strings.TrimSpace(strings.ReplaceAll(res.Stdout, "\r\n", "\n"))
		
		expectedNormalized := strings.ReplaceAll(tc.ExpectedOutput, "\\n", "\n")
		expectedOutput := strings.TrimSpace(strings.ReplaceAll(expectedNormalized, "\r\n", "\n"))

		if actualOutput != expectedOutput {
			slog.Info("Test case failed", "testCaseId", tc.ID, "expected", expectedOutput, "actual", actualOutput)
			overallStatus = "Failed (Wrong Answer)"
			break
		}
		
		passedCount++
	}

	allPassed := overallStatus == "Accepted"

	if !isRun {
		sub := &domain.Submission{
			ID:              uuid.New().String(),
			ProblemID:       problemId,
			Code:            code,
			Status:          overallStatus,
			ExecutionTimeMs: totalTimeMs,
			MemoryKb:        maxMemoryKb,
			SubmittedAt:     time.Now(),
		}

		err = uc.SubmissionRepo.Save(sub)
		if err != nil {
			return nil, err
		}

		if allPassed {
			now := time.Now()
			uc.ProgressRepo.Upsert(&domain.Progress{
				ProblemID:     problemId,
				Status:        "solved",
				LastAttemptAt: &now,
			})
		}

		return &SubmissionResultDTO{
			SubmissionID: sub.ID,
			Status:       overallStatus,
			Passed:       passedCount,
			Total:        totalCount,
			TimeMs:       totalTimeMs,
			MemoryKb:     maxMemoryKb,
		}, nil
	}

	return &SubmissionResultDTO{
		SubmissionID: "",
		Status:       overallStatus,
		Passed:       passedCount,
		Total:        totalCount,
		TimeMs:       totalTimeMs,
		MemoryKb:     maxMemoryKb,
	}, nil
}
