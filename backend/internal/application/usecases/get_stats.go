package usecases

import (
	"fmt"
	"localcode/internal/application/ports"
	"localcode/internal/domain"
	"time"
)

type GetStatsUseCase struct {
	ProblemRepo    ports.ProblemRepository
	SubmissionRepo ports.SubmissionRepository
}

func NewGetStatsUseCase(pr ports.ProblemRepository, sr ports.SubmissionRepository) *GetStatsUseCase {
	return &GetStatsUseCase{
		ProblemRepo:    pr,
		SubmissionRepo: sr,
	}
}

func (uc *GetStatsUseCase) Execute() (*domain.UserStats, error) {
	problems, err := uc.ProblemRepo.FindAll()
	if err != nil {
		return nil, err
	}

	submissions, err := uc.SubmissionRepo.FindAll()
	if err != nil {
		return nil, err
	}

	// 1. Basic stats
	total := len(submissions)
	accepted := 0
	submissionDates := make(map[string]bool)
	solvedProblems := make(map[string]bool)

	for _, sub := range submissions {
		dateStr := sub.SubmittedAt.Format("2006-01-02")
		submissionDates[dateStr] = true

		if sub.Status == "Accepted" {
			accepted++
			solvedProblems[sub.ProblemID] = true
		}
	}

	// 2. Streak calculation
	streak := 0
	var startPoint time.Time
	todayStr := time.Now().Format("2006-01-02")
	yesterdayStr := time.Now().AddDate(0, 0, -1).Format("2006-01-02")

	if submissionDates[todayStr] {
		startPoint = time.Now()
	} else if submissionDates[yesterdayStr] {
		startPoint = time.Now().AddDate(0, 0, -1)
	}

	if !startPoint.IsZero() {
		for {
			dateStr := startPoint.Format("2006-01-02")
			if submissionDates[dateStr] {
				streak++
				startPoint = startPoint.AddDate(0, 0, -1)
			} else {
				break
			}
		}
	}

	// 3. Badges (check completion per week)
	// Group problems by week
	weekProblems := make(map[int][]domain.Problem)
	for _, prob := range problems {
		weekProblems[prob.Week] = append(weekProblems[prob.Week], prob)
	}

	var badges []domain.Badge
	// We want to support week 1 at least, but let's check all weeks found in the problems
	for week, probs := range weekProblems {
		completed := true
		for _, p := range probs {
			if !solvedProblems[p.ID] {
				completed = false
				break
			}
		}

		badges = append(badges, domain.Badge{
			Week:      week,
			Title:     fmt.Sprintf("Semana %d", week),
			Completed: completed,
		})
	}

	return &domain.UserStats{
		Streak:              streak,
		TotalSubmissions:    total,
		AcceptedSubmissions: accepted,
		Badges:              badges,
	}, nil
}
