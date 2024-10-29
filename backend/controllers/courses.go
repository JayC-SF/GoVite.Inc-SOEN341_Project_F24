package controllers

import (
	"backend/database"
	"backend/models"
	"context"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

// This handler function requires the courseid parameter
func GetCourseDescription(c *gin.Context) {
	courseId := c.Param("id")
	fmt.Println(courseId)
	collection := database.GetInstance().Database("RateMyPeersDB").Collection("Courses")
	filter := bson.M{"courseid": courseId}
	var course models.Course
	err := collection.FindOne(context.TODO(), filter).Decode(&course)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			c.JSON(http.StatusNotFound, gin.H{"error": "Class not found."})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to query resource"})
		}
		return
	}
	c.JSON(http.StatusOK, course)
}
