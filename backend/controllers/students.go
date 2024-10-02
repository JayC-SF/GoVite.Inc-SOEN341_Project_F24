package controllers

import (
	"backend/database"
	"context"
	"net/http"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
)

// GET /students - Get all students
func GetStudents(c *gin.Context) {
	// Find students
	cursor, err := database.GetInstance().Database("RateMyPeersDB").Collection("Students").Find(context.TODO(), bson.D{{}})
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

// func RegisterStudent(c *gin.Context) {
// 	var student models.Student

// 	// Bind JSON request body to the student struct
// 	if err := c.ShouldBindJSON(&student); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
// 		return
// 	}

// 	// Insert student data into the MongoDB collection
// 	collection := database.GetInstance().Database("RateMyPeersDB").Collection("Students")

// 	student.ID = primitive.NewObjectID()
// 	_, err := collection.InsertOne(ctx, student)
// 	if err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not register student"})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"message": "Student registered successfully", "student": student})
// }
