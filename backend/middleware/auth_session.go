package middleware

import (
	"backend/config"
	"log"
	"net/http"
	"os"

	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"
)

// This function takes care of configuring the secret key and store for the
// session middleware for the server.
// It returns a handler function that is used as a middleware
func SessionMiddleware() gin.HandlerFunc {
	sessionSecretKey, exists := os.LookupEnv(("SESSION_SECRET_KEY"))
	if !exists {
		// print error and exit
		log.Fatal("SESSION_SECRET_KEY environment variable is not defined please create a secret key.")
	}
	store := cookie.NewStore([]byte(sessionSecretKey))

	// create the auth session middleware associated with this cookie store
	return sessions.Sessions("session", store)
}

func AuthenticationMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		session := sessions.Default(c)
		username := session.Get(config.SessionFields.Username)
		if username == nil {
			c.Status(http.StatusUnauthorized)
			c.Abort()
			return
		}
		c.Next()
	}
}
