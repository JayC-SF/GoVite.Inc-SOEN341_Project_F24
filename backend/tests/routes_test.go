package main

import (
	"backend/controllers"
	"context"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// MockCollection simulates the MongoDB collection for testing
type MockCollection struct{}

func (m *MockCollection) Find(ctx context.Context, filter interface{}, opts ...*options.FindOptions) (*mongo.Cursor, error) {
	// Mocked student data
	students := []bson.M{
		{"_id": "66fce36a3ff20c3e043ef1e4", "email": "la_dani@live.concordia.ca", "firstname": "Daniel", "lastname": "Lam", "role": "student", "username": "den1al"},
		{"_id": "66fce6f2bf1a60b7c396c5e3", "email": "jc.the.goat@live.concordia.ca", "firstname": "Juan-Carlos", "lastname": "Sreng-Flores", "role": "student", "username": "JayC"},
		{"_id": "66fd912dce8dd72af642386f", "email": "mouhamed.coundoul@live.concordia.ca", "firstname": "Mouhamed", "lastname": "Coundoul", "password": "$2a$10$uFi9bi2GllZR941PvP3NHOpldDZkRjubnrnCioAkCx4PkZxLKflvy", "role": "student", "username": "mcndl13"},
		{"_id": "66fed4ceea7a0362a2e19743", "email": "calvinlee@hotmail.com", "firstname": "Calvin", "lastname": "Lee", "password": "$2a$10$PXVnAqHficGMO0EXj3TIKOD4ZkGfuGjPMG/4zGKJvfr5nzCVHdxTK", "role": "student", "username": "calvinlee"},
		{"_id": "66fefc0cd66a878d0b8273b0", "email": "alex.putin@live.concordia.ca", "firstname": "Alex", "lastname": "Putin", "password": "$2a$10$sdMzvn/eYwibwclFgCHDaelFl45xPNN1t8blyvvCrtaoGU8zEM0S.", "role": "student", "username": "AlexP123"},
		{"_id": "66ff02e025fd62a22918e26c", "email": "john.doe@live.concordia.ca", "firstname": "John", "lastname": "Doe", "password": "$2a$10$vDnzmsR5WEAEC8K9EF5smemZXea2URxyFXTXHD5VIdtB/jBA5o/vW", "role": "student", "username": "johndoe123"},
		{"_id": "670ec89c74ceeeaadbbed54d", "email": "petewinson@live.concordia.ca", "firstname": "Pete", "lastname": "Winson", "password": "$2a$10$wYMowVDvPaItVlQVAZnCE.paOCIKkhI6aZc2aeEyf3ndkXgJiPpa.", "role": "student", "username": "PeteW123"},
		{"_id": "6721a9ef32a71de3d118f43c", "email": "kitty.cat2@live.concordia.ca", "firstname": "Kitty", "lastname": "Cat2", "password": "$2a$10$QVE8a4d/.yn32Vc7ZtfCAeC3.4Q9QqkW8/Rxq9CqwdvvQhtPBxDwu", "role": "student", "username": "KittyCat2"},
		{"_id": "672248f2b7b6e2bc3e12b67b", "email": "chrisanhthien@gmail.com", "firstname": "Anh Thien", "lastname": "Nguyen", "password": "$2a$10$GuHav6W.GrgGoUoeeX/kX.281CR8St7FAvpcrYDRv9z0/9N4QS892", "role": "student", "username": "chrisanhthien"},
		{"_id": "67225436256cf9772785c186", "email": "lillygispy@live.concordia.ca", "firstname": "Lilly", "lastname": "Gispy", "password": "$2a$10$cGgv8zWqrdh.LxI5lPIT/.VDVXr/U49eCCT22chZNSG6rmxMbbwsW", "role": "student", "username": "Lilly123"},
	}

	// Convert students to []interface{}
	documents := make([]interface{}, len(students))
	for i, student := range students {
		documents[i] = student
	}

	// Create a mock cursor from the student data
	cursor, err := mongo.NewCursorFromDocuments(documents, nil, nil)
	return cursor, err
}

func TestPingRoute(t *testing.T) {
	// Initialize the Gin router in test mode
	gin.SetMode(gin.TestMode)
	router := gin.New()

	// Register the Ping route
	router.GET("/ping", controllers.Ping)

	// Create a request to send to the above route
	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/ping", nil)

	// Serve the HTTP request
	router.ServeHTTP(w, req)

	// Assertions to check if the status code and response body are as expected
	assert.Equal(t, http.StatusOK, w.Code)
	assert.Equal(t, "pong", w.Body.String())
}

// func TestGetStudents(t *testing.T) {
// 	// Set Gin to test mode
// 	gin.SetMode(gin.TestMode)
// 	router := gin.New()

// 	// Inject the mock collection
// 	mockDB := &MockCollection{}
// 	controllers.SetCollection(mockDB)

// 	// Register the /students route
// 	router.GET("/students", controllers.GetStudents)

// 	// Create a test HTTP request
// 	w := httptest.NewRecorder()
// 	req, _ := http.NewRequest("GET", "/students", nil)

// 	// Send the request to the route
// 	router.ServeHTTP(w, req)

// 	// Expected response data
// 	expected := `[{"_id":"66fce36a3ff20c3e043ef1e4","email":"la_dani@live.concordia.ca","firstname":"Daniel","lastname":"Lam","role":"student","username":"den1al"},{"_id":"66fce6f2bf1a60b7c396c5e3","email":"jc.the.goat@live.concordia.ca","firstname":"Juan-Carlos","lastname":"Sreng-Flores","role":"student","username":"JayC"}]`

// 	// Assertions
// 	assert.Equal(t, http.StatusOK, w.Code)
// 	assert.JSONEq(t, expected, w.Body.String())
// }
