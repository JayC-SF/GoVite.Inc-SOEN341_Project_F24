package controllers

import (
	"backend/config"
	"backend/database"
	"context"
	"fmt"
	"net/http"
	"time"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
)

// login body data definiton
type Login struct {
	Email      string `form:"email" json:"email" binding:"required"`
	Password   string `form:"password" json:"password" binding:"required"`
	RememberMe bool   `form:"remember-me" json:"remember-me"`
}

// login controller supports two encoding: json and x-www-form-urlencoded
func LoginController(c *gin.Context) {
	var body Login
	invalidFormatResponse := gin.H{"error": "invalid format"}
	switch c.ContentType() {
	case "application/json":
		if err := c.ShouldBindBodyWithJSON(&body); err != nil {
			c.JSON(http.StatusUnauthorized, invalidFormatResponse)
			return
		}

	case "application/x-www-form-urlencoded":
		if err := c.ShouldBind(&body); err != nil {
			c.JSON(http.StatusUnauthorized, invalidFormatResponse)
			return
		}
	}

	// TODO: REMOVE DUMMY ASSESSMENT AND VALIDATE HASHED PASSWORD WITH DATABASE
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	filter := bson.M{"email": body.Email}
	collection := database.GetInstance().Database("RateMyPeersDB").Collection("Users")

	var result bson.M
	err := collection.FindOne(ctx, filter).Decode(&result)
	if err != nil {
		fmt.Println("Cannot find user!")
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not found in DB!"})
		return
	}

	var ok bool
	password := result["password"].(string)
	if body.Password == password {
		ok = true
	}
	// ok := util.CompareHashAndPassword(body.Password, password)
	// fmt.Println(util.HashPassword(body.Password))
	// if body.Email != "user@hotmail.com" || body.Password != "password" {
	// 	c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid credentials or format"})
	// 	return
	// }

	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid credentials or format"})
		return
	}

	session := sessions.Default(c)
	session.Set(config.SessionFields.Email, body.Email)
	// TODO: REMOVE DUMMY ROLE IN THE FUTURE
	session.Set(config.SessionFields.Role, "student")

	if err := session.Save(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Session could not be saved"})
		return
	}
	c.Redirect(http.StatusFound, "/dashboard")
}

// Signup body data definition
type SignUp struct {
	Username string `form:"username" json:"username" binding:"required"`
	Email    string `form:"email" json:"email" binding:"required"`
	Password string `form:"password" json:"password" binding:"required"`
	Role     string `form:"role" json:"role" binding:"required"`
}

// This function takes care of signing up a user to the database
func SignUpController(c *gin.Context) {
	var body SignUp
	invalidFormatResponse := gin.H{"error": "invalid format"}
	switch c.ContentType() {
	case "application/json":
		if err := c.ShouldBindBodyWithJSON(&body); err != nil {
			c.JSON(http.StatusUnauthorized, invalidFormatResponse)
			return
		}

	case "application/x-www-form-urlencoded":
		if err := c.ShouldBind(&body); err != nil {
			c.JSON(http.StatusUnauthorized, invalidFormatResponse)
			return
		}
	}

	// TODO: CREATE USER IN DATABASE AND HASH PASSWORD

	// hashedPassword, err := util.HashPassword(body.Password)

	// once all data is put in db, create session for user
	session := sessions.Default(c)
	session.Set(config.SessionFields.Email, body.Email)
	session.Set(config.SessionFields.Role, body.Role)

	if err := session.Save(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Session could not be saved, try logging in instead"})
		return
	}

	// redirect user to dashboard page
	c.Redirect(http.StatusFound, "/dashboard")
}
