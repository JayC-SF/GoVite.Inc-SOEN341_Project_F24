package controllers

import (
	"backend/config"
	"backend/models"
	"net/http"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
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
