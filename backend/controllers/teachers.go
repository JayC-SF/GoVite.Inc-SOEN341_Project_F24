package controllers

import (
	"backend/database"
	"context"
	"net/http"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
)

// GET /teachers - Get all teachers
func GetTeachers(c *gin.Context) {
	// Find teachers
	cursor, err := database.GetInstance().Database("RateMyPeersDB").Collection("Teachers").Find(context.TODO(), bson.D{{}})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Map results
	var teachers []bson.M
	if err = cursor.All(context.TODO(), &teachers); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Return teachers
	c.JSON(http.StatusOK, teachers)
}
