package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// Ping test
func Ping(c *gin.Context) {
	c.String(http.StatusOK, "pong")
}
