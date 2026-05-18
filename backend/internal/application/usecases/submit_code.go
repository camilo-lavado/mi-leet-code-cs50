package usecases

import (
	"errors"
	"log"
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
}

func NewSubmitCodeUseCase(
	pr ports.ProblemRepository,
	tr ports.TestCaseRepository,
	sr ports.SubmissionRepository,
	ex ports.CodeExecutor,
) *SubmitCodeUseCase {
	return &SubmitCodeUseCase{
		ProblemRepo:    pr,
		TestCaseRepo:   tr,
		SubmissionRepo: sr,
		Executor:       ex,
	}
}

type SubmissionResultDTO struct {
	SubmissionID string
	Status       string
	Passed       int
	Total        int
	TimeMs       int
	MemoryKb     int
}

func (uc *SubmitCodeUseCase) Execute(problemId string, language string, code string) (*SubmissionResultDTO, error) {
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
	overallStatus := "Accepted"
	totalTimeMs := 0
	maxMemoryKb := 0

	for _, tc := range testCases {
		res := uc.Executor.Execute(snippet, tc)
		
		totalTimeMs += res.TimeMs
		if res.MemoryKb > maxMemoryKb {
			maxMemoryKb = res.MemoryKb
		}

		if res.ExitCode != 0 {
			overallStatus = "Failed (Compilation/Runtime Error)"
			break
		}

		// Normalizar saltos de línea y espacios finales para evitar falsos negativos
		actualOutput := strings.TrimSpace(strings.ReplaceAll(res.Stdout, "\r\n", "\n"))
		
		// Reemplazar saltos de línea literales (\n) del JSON/SQL a saltos reales
		expectedNormalized := strings.ReplaceAll(tc.ExpectedOutput, "\\n", "\n")
		expectedOutput := strings.TrimSpace(strings.ReplaceAll(expectedNormalized, "\r\n", "\n"))

		if actualOutput != expectedOutput {
			log.Printf("Test Case %s Failed.\nExpected:\n%q\nActual:\n%q\n", tc.ID, expectedOutput, actualOutput)
			overallStatus = "Failed (Wrong Answer)"
			break
		}
		
		passedCount++
	}

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

	return &SubmissionResultDTO{
		SubmissionID: sub.ID,
		Status:       overallStatus,
		Passed:       passedCount,
		Total:        len(testCases),
		TimeMs:       totalTimeMs,
		MemoryKb:     maxMemoryKb,
	}, nil
}
