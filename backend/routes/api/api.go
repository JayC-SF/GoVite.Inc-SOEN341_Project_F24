package api

import (
	"backend/controllers"
	"backend/middleware"

	"github.com/gin-gonic/gin"
)

// register function for all controllers under the /api route
func RegisterApiRoutes(r *gin.Engine) {
	// group route /api where a session cookie store is applied.
	// users does not need to be authenticated
	api_session := r.Group("/api", middleware.SessionMiddleware())

	// group route from api_session where applies an extra middleware
	// requiring the user to be authenticated. Route of the group is still /api
	api_session_auth := api_session.Group("/", middleware.AuthenticationMiddleware())

	// authentication controllers
	api_session.POST("/login", controllers.LoginController)
	api_session.POST("/sign-up", controllers.SignUpController)
	api_session_auth.POST("/logout", controllers.LogoutController)
	api_session_auth.GET("/isloggedin", controllers.IsLoggedIn)

	// GET Endpoint for Students
	// localhost:8080/api/students
	api_session_auth.GET("/students", controllers.GetStudents)
	// GET Endpoint for Students
	// localhost:8080/api/students
	api_session_auth.GET("/teachers", controllers.GetTeachers)
	api_session_auth.GET("/userinfo", controllers.GetUserInfo)

	// GET Endpoint for Courses
	// localhost:8080/api/courses
	api_session_auth.GET("/courses", controllers.Courses)

	// register a test ping function /api/login
	api_session_auth.GET("/ping", controllers.Ping)

	// courses endpoint
	api_session_auth.GET("/courses/courseinfo", controllers.GetCourseInformation)
	api_session_auth.GET("/courses/details", controllers.GetDetailedCourseInfo)
	// create a new Rating POST Request: /api/submitRating
	api_session_auth.POST("/submitRating", controllers.RatingsController)

	// GROUPS endpoint
	// create a new Group POST Request: /api/addgroup
	api_session_auth.POST("/addgroup", controllers.GroupsController)
	api_session_auth.GET("/groups/groupinfo", controllers.GetGroupInfo)
	api_session_auth.GET("/groups/studentswithoutgroup", controllers.GetStudentsWithoutGroups)
	api_session_auth.POST("/groups/newstudentingroup", controllers.PostNewUsersGroups)
}
