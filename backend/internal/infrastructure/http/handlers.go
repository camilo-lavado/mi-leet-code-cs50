package http

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"localcode/internal/application/usecases"
)

type Handlers struct {
	FetchProblemsUC *usecases.FetchProblemsUseCase
	SubmitCodeUC    *usecases.SubmitCodeUseCase
}

func NewHandlers(fp *usecases.FetchProblemsUseCase, sc *usecases.SubmitCodeUseCase) *Handlers {
	return &Handlers{
		FetchProblemsUC: fp,
		SubmitCodeUC:    sc,
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
