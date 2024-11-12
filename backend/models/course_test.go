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

// TestCourseBinding tests the required fields and binding behavior of the Course model
func TestCourseBinding(t *testing.T) {
	// Set Gin to test mode
	gin.SetMode(gin.TestMode)

	// Define a sample ObjectID for the Course ID
	courseID := primitive.NewObjectID()

	// Define test cases
	testCases := []struct {
		name       string
		payload    string
		shouldBind bool
	}{
		{
			name:       "Valid payload",
			payload:    `{"id":"` + courseID.Hex() + `","courseid":"soen-341","coursecode":"SOEN 341","coursename":"Software Process and Practices","coursedescription":"This course covers the following topics: basic principles of software engineering; introduction to software process, including activities, phases, organization, roles, teamwork, and conflict resolution; notations used in software engineering; software development practices, including documentation, modern version control, review, testing, agile, and continuous integration.","coursecredits":4,"teacher":"joumana.dargham@concordia.ca"}`,
			shouldBind: true,
		},
		{
			name:       "Missing courseid",
			payload:    `{"id":"` + courseID.Hex() + `","coursecode":"soen-341","coursename":"Software Process and Practices","coursedescription":"This course covers the following topics: basic principles of software engineering; introduction to software process, including activities, phases, organization, roles, teamwork, and conflict resolution; notations used in software engineering; software development practices, including documentation, modern version control, review, testing, agile, and continuous integration.","coursecredits":4,"teacher":"joumana.dargham@concordia.ca"}`,
			shouldBind: false,
		},
		{
			name:       "Missing coursecode",
			payload:    `{"id":"` + courseID.Hex() + `","courseid":"soen-341","coursename":"Software Process and Practices","coursedescription":"This course covers the following topics: basic principles of software engineering; introduction to software process, including activities, phases, organization, roles, teamwork, and conflict resolution; notations used in software engineering; software development practices, including documentation, modern version control, review, testing, agile, and continuous integration.","coursecredits":4,"teacher":"joumana.dargham@concordia.ca"}`,
			shouldBind: false,
		},
		{
			name:       "Missing coursename",
			payload:    `{"id":"` + courseID.Hex() + `","courseid":"soen-341","coursecode":"SOEN 341","coursedescription":"This course covers the following topics: basic principles of software engineering; introduction to software process, including activities, phases, organization, roles, teamwork, and conflict resolution; notations used in software engineering; software development practices, including documentation, modern version control, review, testing, agile, and continuous integration.","coursecredits":4,"teacher":"joumana.dargham@concordia.ca"}`,
			shouldBind: false,
		},
		{
			name:       "Missing coursedescription",
			payload:    `{"id":"` + courseID.Hex() + `","courseid":"soen-341","coursecode":"SOEN 341","coursename":"Software Process and Practices","coursecredits":4,"teacher":"joumana.dargham@concordia.ca"}`,
			shouldBind: false,
		},
		{
			name:       "Missing coursecredits",
			payload:    `{"id":"` + courseID.Hex() + `","courseid":"soen-341","coursecode":"SOEN341","coursename":"Software Process and Practices","coursedescription":"This course covers the following topics: basic principles of software engineering; introduction to software process, including activities, phases, organization, roles, teamwork, and conflict resolution; notations used in software engineering; software development practices, including documentation, modern version control, review, testing, agile, and continuous integration.","teacher":"joumana.dargham@concordia.ca"}`,
			shouldBind: false,
		},
		{
			name:       "Missing teacher",
			payload:    `{"id":"` + courseID.Hex() + `","courseid":"soen-341","coursecode":"SOEN341","coursename":"Software Process and Practices","coursedescription":"This course covers the following topics: basic principles of software engineering; introduction to software process, including activities, phases, organization, roles, teamwork, and conflict resolution; notations used in software engineering; software development practices, including documentation, modern version control, review, testing, agile, and continuous integration.","coursecredits":4}`,
			shouldBind: false,
		},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			// Create a mock HTTP request with the payload
			req := httptest.NewRequest(http.MethodPost, "/courses", bytes.NewBufferString(tc.payload))
			req.Header.Set("Content-Type", "application/json")

			// Create a test context and recorder
			w := httptest.NewRecorder()
			c, _ := gin.CreateTestContext(w)
			c.Request = req

			// Bind the request body to the Course struct
			var course Course
			err := c.ShouldBindJSON(&course)

			// Verify if the binding result is as expected
			if tc.shouldBind {
				assert.NoError(t, err, "Expected binding to succeed but it failed")
			} else {
				assert.Error(t, err, "Expected binding to fail but it succeeded")
			}
		})
	}
}
