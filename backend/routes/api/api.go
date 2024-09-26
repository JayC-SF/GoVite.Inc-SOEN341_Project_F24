package api

import (
	"backend/controllers"

	"github.com/gin-gonic/gin"
)

// register function for all controllers under the /api route
func RegisterApiRoutes(router *gin.Engine) {
	// set /api as base path
	api := router.Group("/api")

	// register a test ping function
	api.GET("/ping", controllers.Ping)

	// GET Endpoint for Students
	// localhost:8080/api/students
	api.GET("/students", controllers.GetStudents)
}
