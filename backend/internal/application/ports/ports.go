package ports

import (
	"localcode/internal/domain"
)

type ProblemRepository interface {
	FindAll() ([]domain.Problem, error)
	FindById(id string) (*domain.Problem, error)
}

type TestCaseRepository interface {
	FindByProblemId(problemId string) ([]domain.TestCase, error)
}

type SubmissionRepository interface {
	Save(submission *domain.Submission) error
}

type CodeExecutor interface {
	Execute(snippet domain.CodeSnippet, testCase domain.TestCase) domain.ExecutionResult
}
