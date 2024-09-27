package middleware

import (
	"backend/config"

	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
)

// return handler for serving ststic files
func ServeFrontendFilesMiddleware() gin.HandlerFunc {
	return static.Serve("/", static.LocalFile(config.Paths.FrontendStaticFiles, true))
}
