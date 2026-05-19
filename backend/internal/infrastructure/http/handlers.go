package http

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"localcode/internal/application/usecases"
)

type Handlers struct {
	FetchProblemsUC    *usecases.FetchProblemsUseCase
	SubmitCodeUC       *usecases.SubmitCodeUseCase
	FetchSubmissionsUC *usecases.FetchSubmissionsUseCase
	FetchHintsUC       *usecases.FetchHintsUseCase
	FetchFlashcardsUC  *usecases.FetchFlashcardsUseCase
	GetStatsUC         *usecases.GetStatsUseCase
	FetchContentUC     *usecases.FetchContentUseCase
	FetchProgressUC    *usecases.FetchProgressUseCase
}

func NewHandlers(
	fp *usecases.FetchProblemsUseCase,
	sc *usecases.SubmitCodeUseCase,
	fs *usecases.FetchSubmissionsUseCase,
	fh *usecases.FetchHintsUseCase,
	ff *usecases.FetchFlashcardsUseCase,
	gs *usecases.GetStatsUseCase,
	fc *usecases.FetchContentUseCase,
	fpr *usecases.FetchProgressUseCase,
) *Handlers {
	return &Handlers{
		FetchProblemsUC:    fp,
		SubmitCodeUC:       sc,
		FetchSubmissionsUC: fs,
		FetchHintsUC:       fh,
		FetchFlashcardsUC:  ff,
		GetStatsUC:         gs,
		FetchContentUC:     fc,
		FetchProgressUC:    fpr,
	}
}

func (h *Handlers) GetProblems(c *gin.Context) {
	var week *int
	if w := c.Query("week"); w != "" {
		if wInt, err := strconv.Atoi(w); err == nil {
			week = &wInt
		}
	}
	var difficulty *string
	if d := c.Query("difficulty"); d != "" {
		difficulty = &d
	}

	problems, err := h.FetchProblemsUC.ExecuteFiltered(week, difficulty)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": problems})
}

func (h *Handlers) GetProblem(c *gin.Context) {
	id := c.Param("id")
	problem, err := h.FetchProblemsUC.ExecuteById(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	if problem == nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "problem not found"})
		return
	}
	c.JSON(http.StatusOK, problem)
}

type SubmitRequest struct {
	ProblemID string `json:"problem_id" binding:"required"`
	Language  string `json:"language" binding:"required"`
	Code      string `json:"code" binding:"required"`
	Mode      string `json:"mode"` // "run" or "submit" (default "submit")
}

func (h *Handlers) SubmitCode(c *gin.Context) {
	var req SubmitRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if len(req.Code) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "code cannot be empty"})
		return
	}
	if len(req.Code) > 100*1024 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "code exceeds maximum length of 100KB"})
		return
	}
	if req.Language != "c" && req.Language != "python" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "unsupported language. Supported: c, python"})
		return
	}

	result, err := h.SubmitCodeUC.Execute(req.ProblemID, req.Language, req.Code, req.Mode)
	if err != nil {
		if err.Error() == "problem not found" {
			c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, result)
}

func (h *Handlers) GetSubmissions(c *gin.Context) {
	problemID := c.Query("problem_id")
	submissions, err := h.FetchSubmissionsUC.Execute(problemID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": submissions})
}

func (h *Handlers) GetHints(c *gin.Context) {
	problemId := c.Param("id")
	hints, err := h.FetchHintsUC.Execute(problemId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	if len(hints) == 0 {
		c.JSON(http.StatusOK, gin.H{"data": []string{}})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": hints})
}

func (h *Handlers) GetFlashcards(c *gin.Context) {
	weekStr := c.Param("week")
	week, err := strconv.Atoi(weekStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid week number"})
		return
	}
	cards, err := h.FetchFlashcardsUC.Execute(week)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	if len(cards) == 0 {
		c.JSON(http.StatusOK, gin.H{"data": []string{}})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": cards})
}

func (h *Handlers) GetStats(c *gin.Context) {
	stats, err := h.GetStatsUC.Execute()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": stats})
}

func (h *Handlers) GetProgress(c *gin.Context) {
	summary, err := h.FetchProgressUC.GetSummary()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": summary})
}

func (h *Handlers) GetContent(c *gin.Context) {
	weekStr := c.Param("week")
	week, err := strconv.Atoi(weekStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid week parameter"})
		return
	}

	content, err := h.FetchContentUC.Execute(week)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": content})
}
