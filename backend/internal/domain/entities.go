package domain

import "time"

type Problem struct {
	ID          string `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Difficulty  string     `json:"difficulty"`
	Language    string     `json:"language"`
	Week        int        `json:"week"`
	TestCases   []TestCase `json:"test_cases,omitempty"`
}

type Hint struct {
	ID         string `json:"id"`
	ProblemID  string `json:"problem_id"`
	OrderIndex int    `json:"order_index"`
	Question   string `json:"question"`
}

type Flashcard struct {
	ID         string `json:"id"`
	Week       int    `json:"week"`
	Question   string `json:"question"`
	Answer     string `json:"answer"`
	OrderIndex int    `json:"order_index"`
}

type TestCase struct {
	ID             string `json:"id"`
	ProblemID      string `json:"problem_id"`
	InputData      string `json:"input_data"`
	ExpectedOutput string `json:"expected_output"`
	IsHidden       bool   `json:"is_hidden"`
}

type Submission struct {
	ID              string    `json:"id"`
	ProblemID       string    `json:"problem_id"`
	Code            string    `json:"code"`
	Status          string    `json:"status"` // e.g. "Accepted", "Failed", "Pending"
	ExecutionTimeMs int       `json:"execution_time_ms"`
	MemoryKb        int       `json:"memory_kb"`
	SubmittedAt     time.Time `json:"submitted_at"`
}

type CodeSnippet struct {
	Code     string
	Language string
}

type ExecutionResult struct {
	Stdout   string
	Stderr   string
	ExitCode int
	TimeMs   int
	MemoryKb int
}

type Badge struct {
	Week      int    `json:"week"`
	Title     string `json:"title"`
	Completed bool   `json:"completed"`
}

type UserStats struct {
	Streak              int     `json:"streak"`
	TotalSubmissions    int     `json:"total_submissions"`
	AcceptedSubmissions int     `json:"accepted_submissions"`
	Badges              []Badge `json:"badges"`
}
