package controllers

import (
	"backend/config"
	"backend/database"
	"backend/models"
	"context"
	"net/http"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
)

// RatingsController - Add a new rating to MongoDB
func RatingsController(c *gin.Context) {
	var rating models.Rating

	session := sessions.Default(c)
	email, ok1 := session.Get(config.SessionFields.Email).(string)
	if !ok1 {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}

	if err := c.ShouldBindBodyWithJSON(&rating); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid format"})
		return
	}

	rating.RatingStudent = email

	collection := database.GetInstance().Database("RateMyPeersDB").Collection("Ratings")
	_, err := collection.InsertOne(context.TODO(), rating)

	if err != nil {
		c.JSON(http.StatusConflict, gin.H{"error": "Error when inserting new rating to DB!"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "ok"})
}
