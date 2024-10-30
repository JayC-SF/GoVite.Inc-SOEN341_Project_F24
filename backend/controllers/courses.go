package controllers

import (
	"backend/config"
	"backend/database"
	"context"

	"net/http"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
)

// GET /courses - Get all courses for the logged-in user with descriptions
func Courses(c *gin.Context) {
	// UsersCourses query - Find all courses for the logged-in user
	session := sessions.Default(c)
	email, ok := session.Get(config.SessionFields.Email).(string)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	// Query UsersCourses collection to get course IDs for this user
	userCoursesCursor, err := database.GetInstance().
		Database("RateMyPeersDB").
		Collection("UsersCourses").
		Find(context.TODO(), bson.M{"email": email})

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Extract course IDs from user courses
	var userCourses []bson.M
	if err := userCoursesCursor.All(context.TODO(), &userCourses); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	var courseIDs []interface{}
	for _, course := range userCourses {
		if id, ok := course["courseid"]; ok {
			courseIDs = append(courseIDs, id)
		}
	}

	// Query the Courses collection to get course details
	coursesCursor, err := database.GetInstance().
		Database("RateMyPeersDB").
		Collection("Courses").
		Find(context.TODO(), bson.M{"courseid": bson.M{"$in": courseIDs}})

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Map course details into a slice of BSON documents
	var courseDetails []bson.M
	if err = coursesCursor.All(context.TODO(), &courseDetails); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Send the course details back to the client as JSON
	c.JSON(http.StatusOK, courseDetails)
}
