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

// Function constructs a middleware that configures session for receiving requests
func SessionMiddleware() gin.HandlerFunc {
	// get the secret key for the cookie store
	sessionSecretKey, exists := os.LookupEnv(("SESSION_SECRET_KEY"))
	if !exists {
		// print error and exit
		log.Fatal("SESSION_SECRET_KEY environment variable is not defined please create a secret key.")
	}
	// create a cookie store
	store := cookie.NewStore([]byte(sessionSecretKey))
	// set the configurations for the session store
	store.Options(config.SessionConfig)
	// create the auth session middleware associated with this cookie store
	return sessions.Sessions("session", store)
}

// Function constructs a middleware that requires a user to be authenticated
func AuthenticationMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		session := sessions.Default(c)
		username := session.Get(config.SessionFields.Username)
		if username == nil {
			c.Redirect(http.StatusFound, "/login")
			c.Abort()
			return
		}
		c.Next()
	}
}
