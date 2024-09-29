package controllers

import (
	"backend/config"
	"strings"

	"github.com/gin-gonic/gin"
)

// handler for no route found. This function returns the index.html if no route was found
func NoRouteController(context *gin.Context) {
	if !strings.HasPrefix(context.Request.RequestURI, "/api") && context.Request.Method == "GET" {
		context.File(config.Paths.FrontEndIndexHTML)
	}
	//default 404 page not found
}
