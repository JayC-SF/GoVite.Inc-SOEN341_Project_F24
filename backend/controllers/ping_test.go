package controllers

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/assert/v2"
)

func TestPingRoute(t *testing.T) {
	// Initialize the Gin router in test mode
	gin.SetMode(gin.TestMode)
	router := gin.New()

	// Register the Ping route
	router.GET("/ping", Ping)

	// Create a request to send to the above route
	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/ping", nil)

	// Serve the HTTP request
	router.ServeHTTP(w, req)

	// Assertions to check if the status code and response body are as expected
	assert.Equal(t, http.StatusOK, w.Code)
	assert.Equal(t, "pong", w.Body.String())
}
