package controllers

import (
	"backend/database"
	"backend/models"
	"context"
	"net/http"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

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

type StudentResponse struct {
	models.User
	Score float64 `json:"score"`
}
type GetGroupInfoResponse struct {
	Group    models.Group      `json:"group"`
	Students []StudentResponse `json:"students"`
}

func GetGroupInfo(c *gin.Context) {
	groupId := c.Query("groupid")
	if groupId == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Expecting a groupid as query param."})
		return
	}
	group, err := models.GetGroupFromId(groupId)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			c.JSON(http.StatusNotFound, gin.H{"error": "No group can be found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Error getting the group"})
		}
		return
	}
	users, err := group.GetStudents()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error getting students"})
		return
	}
	students := []StudentResponse{}
	for _, user := range users {
		score, err := user.GetRatingScore(groupId)
		if err != nil {
			score = -1
		}
		students = append(students, StudentResponse{user, score})
	}
	c.JSON(http.StatusOK, GetGroupInfoResponse{
		Group:    *group,
		Students: students,
	})
}

func GetStudentsWithoutGroups(c *gin.Context) {
	groupId := c.Query("groupid")
	if groupId == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Expecting a groupid as query param."})
		return
	}
	group, err := models.GetGroupFromId(groupId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error getting group"})
		return
	}
	students, err := group.GetPotentialStudents()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error getting potential students"})
		return
	}
	studentsInGroup, err := group.GetStudents()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error getting students in group"})
		return
	}
	potentialStudents := []models.User{}
	for _, s := range students {
		exists := false
		for _, s2 := range studentsInGroup {
			if s.Email == s2.Email {
				exists = true
				break
			}
		}
		if !exists {
			potentialStudents = append(potentialStudents, s)
		}
	}
	c.JSON(http.StatusOK, potentialStudents)
}

func PostNewUsersGroups(c *gin.Context) {

	var newStudent models.UserGroup
	if err := c.ShouldBindBodyWithJSON(&newStudent); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid format"})
		return
	}
	// make new student a new id
	newStudent.ID = primitive.NewObjectID()

	err := newStudent.Save()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not save new user in db"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Success"})
}
