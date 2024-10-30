package controllers

import (
	"backend/database"
	"backend/models"
	"context"
	"net/http"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// GET /students - Get all students
func RatingsController(c *gin.Context) {
	var rating models.Rating
	groupID, err := primitive.ObjectIDFromHex("67211117efa57b840254b949")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid GroupId format!"})
		return
	}

	rating = models.Rating{
		RatingStudent: "test",
		RatedStudent:  "JayC",
		Rating:        3,
		GroupId:       groupID,
	}

	collection := database.GetInstance().Database("RateMyPeersDB").Collection("Ratings")
	_, err = collection.InsertOne(context.TODO(), rating)

	if err != nil {
		c.JSON(http.StatusConflict, gin.H{"error": "Error when inserting new rating to DB!"})
		return
	}

	// redirect user to dashboard page
	c.Redirect(http.StatusFound, "/main")
}
