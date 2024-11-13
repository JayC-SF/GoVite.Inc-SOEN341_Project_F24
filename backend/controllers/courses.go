package controllers

import (
	"backend/config"
	"backend/database"
	"backend/models"
	"context"
	"fmt"
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

	role := session.Get(config.SessionFields.Role).(string)

	email, ok := session.Get(config.SessionFields.Email).(string)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	if role == "student" {

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

	} else if role == "teacher" {
		// Query UsersCourses collection to get course IDs for this user
		userCoursesCursor, err := database.GetInstance().
			Database("RateMyPeersDB").
			Collection("Courses").
			Find(context.TODO(), bson.M{"teacher": email})

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		defer userCoursesCursor.Close(context.TODO()) // Ensure the cursor is closed

		var courses []bson.M // Use bson.M to hold the results dynamically

		// Iterate through the cursor and decode the results into the courses slice
		for userCoursesCursor.Next(context.TODO()) {
			var course bson.M
			if err := userCoursesCursor.Decode(&course); err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
			courses = append(courses, course)
		}

		// Check for any errors that occurred during iteration
		if err := userCoursesCursor.Err(); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		// Respond with the courses data
		c.JSON(http.StatusOK, gin.H{"courses": courses})
	}
}

// prepare the struct types for the response
type Rating struct {
	Cooperation float64 `json:"cooperation"`
	Conceptual  float64 `json:"conceptual"`
	Practical   float64 `json:"practical"`
	WorkEthic   float64 `json:"workethic"`
}
type Rater struct {
	FirstName string  `json:"firstname"`
	LastName  string  `json:"lastname"`
	Email     string  `json:"email"`
	Ratings   Rating  `json:"ratings"`
	Average   float64 `json:"average"`
	Comment   string  `json:"comment"`
}
type Student struct {
	FirstName     string   `json:"firstname"`
	LastName      string   `json:"lastname"`
	Email         string   `json:"email"`
	AverageRating *float64 `json:"averagerating"`
	Ratedby       []Rater  `json:"ratedby"`
}
type Team struct {
	TeamName string    `json:"teamname"`
	Students []Student `json:"students"`
}
type Response struct {
	Teams []Team `json:"teams"`
}

func GetDetailedCourseInfo(c *gin.Context) {
	courseId := c.Query("courseid")
	if courseId == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing courseId parameter in the path"})
		return
	}
	session := sessions.Default(c)
	if role, ok := session.Get(config.SessionFields.Role).(string); !ok || role != "teacher" {
		c.JSON(http.StatusForbidden, gin.H{"error": "Lacking privileges to get information"})
		return
	}
	response := Response{}
	course, err := models.GetCourseFromCourseId(courseId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error while fetching course"})
		return
	}
	groups, err := course.GetAllGroups()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error while fetching groups"})
		return
	}
	for _, group := range groups {
		team, err := GetTeamInfo(&group)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not get team info for group"})
			return
		}
		response.Teams = append(response.Teams, *team)
	}
	c.JSON(http.StatusOK, response)
}

func GetTeamInfo(group *models.Group) (*Team, error) {
	team := Team{
		TeamName: group.GroupName,
		Students: []Student{},
	}
	students, err := group.GetStudents()
	if err != nil {
		fmt.Println("error getting students", err)
		return nil, err
	}
	for _, student := range students {
		studentResponse, err := GetStudentsInfo(group, &student)
		if err != nil {
			fmt.Println("error getting student info", student, err)
			return nil, err
		}
		// add student to the current team
		team.Students = append(team.Students, *studentResponse)
	}
	return &team, nil
}

func GetStudentsInfo(group *models.Group, user *models.User) (*Student, error) {
	student := Student{
		FirstName: user.FirstName,
		LastName:  user.LastName,
		Email:     user.Email,
		Ratedby:   []Rater{},
	}
	avgRate, err := user.GetRatingScore(group.ID.Hex())
	if err != nil {
		student.AverageRating = nil
	} else {
		student.AverageRating = &avgRate
		raters, err := user.GetRaters(group.ID.Hex())
		if err != nil {
			fmt.Println("Error getting raters", user, group.ID.Hex())
			return nil, err
		}
		for _, rater := range raters {
			ratedByInfo, err := GetRaterInfo(group, user, &rater)
			if err != nil {
				fmt.Println("Error getting ratedByInfo", group, user, rater)
				return nil, err
			}
			student.Ratedby = append(student.Ratedby, *ratedByInfo)
		}
	}
	return &student, nil
}

func GetRaterInfo(group *models.Group, ratedStudent *models.User, ratingStudent *models.User) (*Rater, error) {
	rating, err := models.GetRating(ratingStudent.Email, ratedStudent.Email, group.ID)
	if err != nil {
		fmt.Println("Error getting rating from user", ratingStudent.Email, ratedStudent.Email, group.ID)
		return nil, err
	}
	ratingCriteria, err := rating.GetRatingCriteria()
	if err != nil {
		return nil, err
	}
	ratingAverages := Rating{}

	for _, rc := range ratingCriteria {
		criterion, err := models.GetRatingCriterionFromId(rc.CriterionId)
		if err != nil {
			fmt.Println("Error getting criterion from ID", rc.CriterionId)
			return nil, err
		}
		switch criterion.Dimension {
		case "cooperation":
			ratingAverages.Cooperation += float64(rc.Grade)
		case "conceptual contribution":
			ratingAverages.Conceptual += float64(rc.Grade)
		case "work ethic":
			ratingAverages.WorkEthic += float64(rc.Grade)
		case "practical contribution":
			ratingAverages.Practical += float64(rc.Grade)
		}
	}

	ratingAverages.Cooperation /= 5
	ratingAverages.Conceptual /= 5
	ratingAverages.WorkEthic /= 5
	ratingAverages.Practical /= 5

	raterResponse := &Rater{
		FirstName: ratingStudent.FirstName,
		LastName:  ratingStudent.LastName,
		Email:     ratingStudent.Email,
		Ratings:   ratingAverages,
		Comment:   rating.Comment,
	}

	return raterResponse, nil
}
