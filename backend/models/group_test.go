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

// TestGroupBinding tests the binding and structure validation of the Group model
func TestGroupBinding(t *testing.T) {
	// Set Gin to test mode
	gin.SetMode(gin.TestMode)

	// Define a sample ObjectID for testing
	groupID := primitive.NewObjectID()

	// Define test cases
	testCases := []struct {
		name       string
		payload    string
		shouldBind bool
	}{
		{
			name:       "Complete payload",
			payload:    `{"id":"` + groupID.Hex() + `","groupname":"GoVite Inc.","courseid":"soen-341"}`,
			shouldBind: true,
		},
		{
			name:       "Missing GroupName",
			payload:    `{"id":"` + groupID.Hex() + `","courseid":"soen-341"}`,
			shouldBind: false,
		},
		{
			name:       "Missing CourseId",
			payload:    `{"id":"` + groupID.Hex() + `","groupname":"GoVite Inc."}`,
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
			req := httptest.NewRequest(http.MethodPost, "/group", bytes.NewBufferString(tc.payload))
			req.Header.Set("Content-Type", "application/json")

			// Create a test context and recorder
			w := httptest.NewRecorder()
			c, _ := gin.CreateTestContext(w)
			c.Request = req

			// Bind the request body to the Group struct
			var group Group
			err := c.ShouldBindJSON(&group)

			// Verify if the binding result is as expected
			if tc.shouldBind {
				assert.NoError(t, err, "Expected binding to succeed but it failed")
			} else {
				assert.Error(t, err, "Expected binding to fail but it succeeded")
			}
		})
	}
}
