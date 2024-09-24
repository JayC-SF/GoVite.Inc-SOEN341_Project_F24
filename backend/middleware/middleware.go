package middlewares

import (
	"backend/util"

	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
)

// register function for all middlewares of the server
func RegisterAllMiddleWares(r *gin.Engine) {
	// register static serving middleware
	r.Use(static.Serve("/", static.LocalFile(util.FRONTEND_STATIC_FILES, true)))
}
