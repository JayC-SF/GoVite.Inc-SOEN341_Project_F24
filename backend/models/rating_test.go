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

// TestRatingBinding tests the structure and field parsing of the Rating model
func TestRatingBinding(t *testing.T) {
	// Set Gin to test mode
	gin.SetMode(gin.TestMode)

	// Define sample ObjectIDs for testing
	ratingID := primitive.NewObjectID()
	groupID := primitive.NewObjectID()

	// Define test cases
	testCases := []struct {
		name       string
		payload    string
		shouldBind bool
	}{
		{
			name:       "Complete payload",
			payload:    `{"id":"` + ratingID.Hex() + `","ratingstudent":"la_dani@live.concordia.ca","ratedstudent":"jc.the.goat@live.concordia.ca","groupid":"` + groupID.Hex() + `","comment":"Good job!"}`,
			shouldBind: true,
		},
		{
			name:       "Invalid ObjectID format for id",
			payload:    `{"id":"invalidID","ratingstudent":"la_dani@live.concordia.ca","ratedstudent":"jc.the.goat@live.concordia.ca","groupid":"` + groupID.Hex() + `","comment":"Good job!"}`,
			shouldBind: false,
		},
		{
			name:       "Invalid ObjectID format for groupid",
			payload:    `{"id":"` + ratingID.Hex() + `","ratingstudent":"la_dani@live.concordia.ca","ratedstudent":"jc.the.goat@live.concordia.ca","groupid":"invalidGroupID","comment":"Good job!"}`,
			shouldBind: false,
		},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			// Create a mock HTTP request with the payload
			req := httptest.NewRequest(http.MethodPost, "/ratings", bytes.NewBufferString(tc.payload))
			req.Header.Set("Content-Type", "application/json")

			// Create a test context and recorder
			w := httptest.NewRecorder()
			c, _ := gin.CreateTestContext(w)
			c.Request = req

			// Bind the request body to the Rating struct
			var rating Rating
			err := c.ShouldBindJSON(&rating)

			// Verify if the binding result is as expected
			if tc.shouldBind {
				assert.NoError(t, err, "Expected binding to succeed but it failed")
			} else {
				assert.Error(t, err, "Expected binding to fail but it succeeded")
			}
		})
	}
}
