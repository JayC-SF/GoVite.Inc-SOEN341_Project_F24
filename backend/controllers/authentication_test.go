// is_logged_in_test.go
package controllers

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

func TestIsLoggedIn(t *testing.T) {
	// Set Gin to test mode
	gin.SetMode(gin.TestMode)

	// Initialize a Gin router and define the route
	router := gin.New()
	router.GET("/isloggedin", IsLoggedIn)

	// Create a test HTTP request
	req, err := http.NewRequest("GET", "/isloggedin", nil)
	assert.NoError(t, err)

	// Record the response
	w := httptest.NewRecorder()
	router.ServeHTTP(w, req)

	// Assert the response status code is 204 No Content
	assert.Equal(t, http.StatusNoContent, w.Code)
}
