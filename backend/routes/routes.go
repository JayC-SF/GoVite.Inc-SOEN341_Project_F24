package routes

import (
	"backend/controllers"
	"backend/middleware"
	"backend/routes/api"

	"github.com/gin-gonic/gin"
)

// register function to register all routes of the server
func RegisterAllRoutes(r *gin.Engine) {
	// register static serving middleware
	r.Use(middleware.ServeFrontendFilesMiddleware())
	// register /api route group
	api.RegisterApiRoutes(r)
	// handle no route found case
	r.NoRoute(controllers.NoRouteController)
}
