package http

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"localcode/internal/application/usecases"
)

type Handlers struct {
	FetchProblemsUC    *usecases.FetchProblemsUseCase
	SubmitCodeUC       *usecases.SubmitCodeUseCase
	FetchSubmissionsUC *usecases.FetchSubmissionsUseCase
	FetchHintsUC       *usecases.FetchHintsUseCase
}

func NewHandlers(
	fp *usecases.FetchProblemsUseCase,
	sc *usecases.SubmitCodeUseCase,
	fs *usecases.FetchSubmissionsUseCase,
	fh *usecases.FetchHintsUseCase,
) *Handlers {
	return &Handlers{
		FetchProblemsUC:    fp,
		SubmitCodeUC:       sc,
		FetchSubmissionsUC: fs,
		FetchHintsUC:       fh,
	}
}

func (h *Handlers) GetProblems(c *gin.Context) {
	problems, err := h.FetchProblemsUC.Execute()
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
}

func (h *Handlers) SubmitCode(c *gin.Context) {
	var req SubmitRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	result, err := h.SubmitCodeUC.Execute(req.ProblemID, req.Language, req.Code)
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
	submissions, err := h.FetchSubmissionsUC.Execute()
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
