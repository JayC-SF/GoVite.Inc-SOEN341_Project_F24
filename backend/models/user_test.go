package models

import (
	"bytes"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// TestUserBinding tests the structure and field parsing of the User model
func TestUserBinding(t *testing.T) {
	// Set Gin to test mode
	gin.SetMode(gin.TestMode)

	// Define a sample ObjectID for testing
	userID := primitive.NewObjectID()

	// Define test cases
	testCases := []struct {
		name       string
		payload    string
		shouldBind bool
	}{
		{
			name:       "Complete payload",
			payload:    `{"id":"` + userID.Hex() + `","firstname":"Daniel","lastname":"Lam","username":"den1al","email":"la_dani@live.concordia.ca","password":"password123","role":"student"}`,
			shouldBind: true,
		},
		{
			name:       "Missing FirstName",
			payload:    `{"id":"` + userID.Hex() + `","lastname":"Lam","username":"den1al","email":"la_dani@live.concordia.ca","password":"password123","role":"student"}`,
			shouldBind: false,
		},
		{
			name:       "Missing LastName",
			payload:    `{"id":"` + userID.Hex() + `","firstname":"Daniel","username":"den1al","email":"la_dani@live.concordia.ca","password":"password123","role":"student"}`,
			shouldBind: false,
		},
		{
			name:       "Missing Username",
			payload:    `{"id":"` + userID.Hex() + `","firstname":"Daniel","lastname":"Lam","email":"la_dani@live.concordia.ca","password":"password123","role":"student"}`,
			shouldBind: false,
		},
		{
			name:       "Missing Email",
			payload:    `{"id":"` + userID.Hex() + `","firstname":"Daniel","lastname":"Lam","username":"den1al","password":"password123","role":"student"}`,
			shouldBind: false,
		},
		{
			name:       "Missing Password",
			payload:    `{"id":"` + userID.Hex() + `","firstname":"Daniel","lastname":"Lam","username":"den1al","email":"la_dani@live.concordia.ca","role":"student"}`,
			shouldBind: false,
		},
		{
			name:       "Missing Role",
			payload:    `{"id":"` + userID.Hex() + `","firstname":"Daniel","lastname":"Lam","username":"den1al","email":"la_dani@live.concordia.ca","password":"password123"}`,
			shouldBind: false,
		},
		{
			name:       "Empty Payload",
			payload:    `{}`,
			shouldBind: false,
		},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			// Create a mock HTTP request with the payload
			req := httptest.NewRequest(http.MethodPost, "/users", bytes.NewBufferString(tc.payload))
			req.Header.Set("Content-Type", "application/json")

			// Create a test context and recorder
			w := httptest.NewRecorder()
			c, _ := gin.CreateTestContext(w)
			c.Request = req

			// Bind the request body to the User struct
			var user User
			err := c.ShouldBindJSON(&user)

			// Verify if the binding result is as expected
			if tc.shouldBind {
				assert.NoError(t, err, "Expected binding to succeed but it failed")
			} else {
				assert.Error(t, err, "Expected binding to fail but it succeeded")
			}
		})
	}
}
