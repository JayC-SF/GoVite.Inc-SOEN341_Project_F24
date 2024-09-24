package routes

import (
	"backend/controllers"
	"backend/routes/api"

	"github.com/gin-gonic/gin"
)

// register function to register all routes of the server
func RegisterAllRoutes(router *gin.Engine) {
	// register /api route group
	api.RegisterApiRoutes(router)
	// handle no route found case
	router.NoRoute(controllers.NoRouteController)
}
