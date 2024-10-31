package controllers

import (
	"backend/config"
	"backend/database"
	"backend/models"
	"context"
	"net/http"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type GetCourseInformationResponse struct {
	Course      models.Course  `json:"course"`
	Groups      []models.Group `json:"groups"`
	JoinedGroup *models.Group  `json:"joinedGroup,omitempty"`
}

// This handler function requires the courseid parameter
func GetCourseInformation(c *gin.Context) {
	courseId := c.Query("courseid")
	if courseId == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "courseid parameter is missing"})
		return
	}
	session := sessions.Default(c)
	email := session.Get(config.SessionFields.Email).(string)
	role := session.Get(config.SessionFields.Role).(string)
	course, err := models.GetCourseFromCourseId(courseId)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			c.JSON(http.StatusNotFound, gin.H{"error": "Class not found."})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to query resource"})
		}
		return
	}

	groups, err := course.GetAllGroups()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not get groups"})
	}
	response := GetCourseInformationResponse{
		Groups: groups,
		Course: *course,
	}
	// requester is a student
	if role == "student" {
		user, err := models.GetUserFromEmail(email)
		group, err := course.GetStudentJoinedGroup(user)
		if err != nil {
			if err == mongo.ErrNoDocuments {
				c.JSON(http.StatusOK, response)
			}
			return
		}
		for idx, g := range groups {
			if g.ID == group.ID {
				response.Groups = append(response.Groups[:idx], response.Groups[idx+1:]...)
				break
			}
		}
		response.JoinedGroup = group
		c.JSON(http.StatusOK, response)
		return
	}

	// requester is a teacher
	c.JSON(http.StatusOK, response)
}

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

	// Check if userCourses is empty and return an empty array if so
	if len(userCourses) == 0 {
		c.JSON(http.StatusOK, []bson.M{}) // Return an empty array
		return
	}

	// Collect course IDs from user courses
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
