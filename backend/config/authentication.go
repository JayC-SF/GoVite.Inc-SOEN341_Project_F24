package config

import "github.com/gin-contrib/sessions"

// Session configurations regarding age, and security
var SessionConfig = sessions.Options{
	MaxAge:   3600, // 1h session
	HttpOnly: true, // prevents XSS attacks
}
