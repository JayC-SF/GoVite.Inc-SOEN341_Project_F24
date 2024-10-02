package api

import (
	"backend/controllers"
	"backend/middleware"

	"github.com/gin-gonic/gin"
)

// register function for all controllers under the /api route
func RegisterApiRoutes(r *gin.Engine) {
	// only apply session middleware for login and signup
	api := r.Group("/api", middleware.SessionMiddleware())
	// register a test ping function /api/login and /api/signup
	// both login and sign up pages do not require the requests to be authenticated.
	api.POST("/login", controllers.LoginController)
	api.POST("/sign-up", controllers.SignUpController)

	// apply session and auth for the following registered requests
	api = r.Group("/api", middleware.SessionMiddleware(), middleware.AuthenticationMiddleware())
	api.POST("/api", controllers.LogoutController)
	api.GET("/ping", controllers.Ping)

	// GET Endpoint for Students
	// localhost:8080/api/students
	api.GET("/students", controllers.GetStudents)

	// GET Endpoint for Students
	// localhost:8080/api/students
	api.GET("/teachers", controllers.GetTeachers)
}
