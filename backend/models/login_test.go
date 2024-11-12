package models

import (
	"bytes"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

// TestLoginBinding tests the required fields and binding behavior of the Login model
func TestLoginBinding(t *testing.T) {
	// Set Gin to test mode
	gin.SetMode(gin.TestMode)

	// Define test cases
	testCases := []struct {
		name       string
		payload    string
		shouldBind bool
	}{
		{
			name:       "Valid payload",
			payload:    `{"email":"test@example.com","password":"123456","remember-me":true}`,
			shouldBind: true,
		},
		{
			name:       "Missing email",
			payload:    `{"password":"123456","remember-me":false}`,
			shouldBind: false,
		},
		{
			name:       "Missing password",
			payload:    `{"email":"test@example.com","remember-me":true}`,
			shouldBind: false,
		},
		{
			name:       "Missing both email and password",
			payload:    `{"remember-me":false}`,
			shouldBind: false,
		},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			// Create a mock HTTP request with the payload
			req := httptest.NewRequest(http.MethodPost, "/login", bytes.NewBufferString(tc.payload))
			req.Header.Set("Content-Type", "application/json")

			// Create a test context and recorder
			w := httptest.NewRecorder()
			c, _ := gin.CreateTestContext(w)
			c.Request = req

			// Bind the request body to the Login struct
			var login Login
			err := c.ShouldBindJSON(&login)

			// Verify if the binding result is as expected
			if tc.shouldBind {
				assert.NoError(t, err, "Expected binding to succeed but it failed")
			} else {
				assert.Error(t, err, "Expected binding to fail but it succeeded")
			}
		})
	}
}
