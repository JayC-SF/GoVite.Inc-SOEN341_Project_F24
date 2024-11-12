package controllers

import (
	"backend/database"
	"context"
	"net/http"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
)

// Declare a variable to hold the collection (either real or mock)
var userCollection database.Collection

// SetCollection allows for injection of a mock collection during testing
func SetCollection(collection database.Collection) {
	userCollection = collection
}

// GET /students - Get all students
func GetStudents(c *gin.Context) {
	// Find students
	cursor, err := database.GetInstance().Database("RateMyPeersDB").Collection("Users").Find(context.TODO(), bson.M{"role": "student"})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Map results
	var students []bson.M
	if err = cursor.All(context.TODO(), &students); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Return students
	c.JSON(http.StatusOK, students)
}
