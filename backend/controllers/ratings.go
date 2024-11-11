package controllers

import (
	"backend/config"
	"backend/models"
	"backend/util"
	"net/http"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type RatingCriterionBody struct {
	CriterionId primitive.ObjectID `json:"criterionid"`
	Grade       int                `json:"grade"`
}
type AddNewRatingBody struct {
	RatedStudent string                `json:"ratedstudent"`
	GroupId      primitive.ObjectID    `json:"groupid"`
	Comment      string                `json:"comment"`
	Criteria     []RatingCriterionBody `json:"criteria"`
}

// RatingsController - Add a new rating to MongoDB
func RatingsController(c *gin.Context) {
	var reqBody AddNewRatingBody

	// Retrieve session to retrieve email of student that's currently logged in
	session := sessions.Default(c)
	email, ok1 := session.Get(config.SessionFields.Email).(string)
	role, ok2 := session.Get(config.SessionFields.Role).(string)
	if !ok1 || !ok2 {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}
	if role != "student" {
		c.JSON(http.StatusForbidden, gin.H{"error": "Not allowed to rate"})
		return
	}

	// Set email to RatingStudent field
	if err := c.ShouldBindBodyWithJSON(&reqBody); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid format"})
		return
	}

	// insert new reqBody into db
	var rating models.Rating
	// copy the matching fields
	if err := util.CopyFields(reqBody, &rating); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "error copying values " + err.Error()})
		return
	}
	rating.ID = primitive.NewObjectID()
	rating.RatingStudent = email

	if err := rating.Save(); err != nil {
		c.JSON(http.StatusConflict, gin.H{"error": "Error when inserting new rating to DB!"})
		return
	}

	criteria := models.RatingCriteriaSlice{}
	for _, reqCriterion := range reqBody.Criteria {
		criterion := models.NewRatingCriterion(
			primitive.NewObjectID(),
			rating.ID,
			reqCriterion.CriterionId,
			reqCriterion.Grade)

		criteria = append(criteria, *criterion)
	}

	if err := criteria.Save(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "problem occurred while saving criteria"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "ok"})
}
