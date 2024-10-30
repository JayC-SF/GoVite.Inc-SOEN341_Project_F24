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

	// // Create user in database and hash password
	// if hashedPassword, err := util.HashPassword(user.Password); err != nil {
	// 	c.JSON(http.StatusInternalServerError, gin.H{"error": "Error when hashing password!"})
	// 	return
	// } else {
	// 	user.Password = hashedPassword
	// }

	// // Insert the new user
	// collection := database.GetInstance().Database("RateMyPeersDB").Collection("Users")

	// _, err := collection.InsertOne(context.TODO(), user)
	// if err != nil {
	// 	c.JSON(http.StatusConflict, gin.H{"error": "Error when inserting new user to DB!"})
	// 	return
	// }

	// // once all data is put in db, create session for user
	// session := sessions.Default(c)
	// session.Set(config.SessionFields.Email, user.Email)
	// session.Set(config.SessionFields.Role, user.Role)

	// if err := session.Save(); err != nil {
	// 	c.JSON(http.StatusInternalServerError, gin.H{"error": "Session could not be saved, try logging in instead"})
	// 	return
	// }

	// // redirect user to dashboard page
	// c.Redirect(http.StatusFound, "/main")
}
