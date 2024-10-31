package controllers

import (
	"backend/database"
	"backend/models"
	"context"
	"net/http"

	"github.com/gin-gonic/gin"
)

// RatingsController - Add a new rating to MongoDB
func GroupsController(c *gin.Context) {
	var group models.Group

	if err := c.ShouldBindBodyWithJSON(&group); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid format"})
		return
	}

	// insert new rating into db
	collection := database.GetInstance().Database("RateMyPeersDB").Collection("Groups")
	_, err := collection.InsertOne(context.TODO(), group)

	if err != nil {
		c.JSON(http.StatusConflict, gin.H{"error": "Error when inserting new rating to DB!"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "ok"})
}
