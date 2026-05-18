package http

import (
	"github.com/gin-gonic/gin"
)

func SetupRouter(handlers *Handlers) *gin.Engine {
	r := gin.Default()

	// CORS middleware could be added here if needed

	api := r.Group("/api/v1")
	{
		api.GET("/problems", handlers.GetProblems)
		api.GET("/problems/:id", handlers.GetProblem)
		api.POST("/submissions", handlers.SubmitCode)
	}

	return r
}
