package middleware

import (
	"log"
	"os"

	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"
)

func RegisterAuthSessionMiddleware(r *gin.Engine) {
	sessionSecretKey, exists := os.LookupEnv(("SESSION_SECRET_KEY"))
	if !exists {
		// print error and exit
		log.Fatal("SESSION_SECRET_KEY environment variable is not defined please create a secret key.")
	}
	store := cookie.NewStore([]byte(sessionSecretKey))
	r.Use(sessions.Sessions("auth_session", store))
}
