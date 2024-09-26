package controllers

import (
	"backend/database"
	"context"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
)

// GET /students - Get all students
func GetStudents(c *gin.Context) {
	// Find students
	cursor, err := database.GetInstance().Database("RateMyPeersDB").Collection("Students").Find(context.TODO(), bson.D{{}})
	if err != nil {
		log.Println("fault 1")
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Map results
	var students []bson.M
	if err = cursor.All(context.TODO(), &students); err != nil {
		log.Println("fault 2")
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Return students
	c.JSON(http.StatusOK, students)
}
