package ports

import (
	"localcode/internal/domain"
)

type ProblemRepository interface {
	FindAll() ([]domain.Problem, error)
	FindById(id string) (*domain.Problem, error)
	FindFiltered(week *int, difficulty *string) ([]domain.Problem, error)
}

type TestCaseRepository interface {
	FindByProblemId(problemId string) ([]domain.TestCase, error)
}

type HintRepository interface {
	FindByProblemId(problemId string) ([]domain.Hint, error)
}

type FlashcardRepository interface {
	FindByWeek(week int) ([]domain.Flashcard, error)
}

type SubmissionRepository interface {
	Save(submission *domain.Submission) error
	FindAll() ([]domain.Submission, error)
	FindByProblemId(problemId string) ([]domain.Submission, error)
}

type ProgressRepository interface {
	Upsert(progress *domain.Progress) error
	FindAll() ([]domain.Progress, error)
}

type CodeExecutor interface {
	Execute(snippet domain.CodeSnippet, testCase domain.TestCase) domain.ExecutionResult
}
