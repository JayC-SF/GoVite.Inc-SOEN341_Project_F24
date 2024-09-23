package controllers

import (
	"backend/util"
	"path/filepath"
	"strings"

	"github.com/gin-gonic/gin"
)

// handler for no route found. This function returns the index.html if no route was found
func NoRouteController(context *gin.Context) {
	if !strings.HasPrefix(context.Request.RequestURI, "/api") && context.Request.Method == "GET" {
		context.File(filepath.Join(util.FRONTEND_STATIC_FILES, "index.html"))
	}
	//default 404 page not found
}
