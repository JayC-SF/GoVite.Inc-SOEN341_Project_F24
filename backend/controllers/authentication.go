package controllers

import (
	"backend/config"
	"backend/database"
	"backend/models"
	"backend/util"
	"context"
	"fmt"
	"net/http"
	"time"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// login controller supports two encoding: json and x-www-form-urlencoded
func LoginController(c *gin.Context) {
	var body models.Login
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

	// Validate hashed password with database
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
	hashedPassword := result["password"].(string)
	ok = util.CompareHashAndPassword(hashedPassword, body.Password)

	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid credentials or format"})
		return
	}
	role := result["role"].(string)
	email := result["email"].(string)
	session := sessions.Default(c)
	session.Set(config.SessionFields.Email, email)
	session.Set(config.SessionFields.Role, role)

	if err := session.Save(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Session could not be saved"})
		return
	}
	c.Redirect(http.StatusFound, "/main")
}

// This function takes care of signing up a user to the database
func SignUpController(c *gin.Context) {
	var user models.User

	// Converts data from form to the values needed for User struct
	invalidFormatResponse := gin.H{"error": "invalid format"}
	switch c.ContentType() {
	case "application/json":
		if err := c.ShouldBindBodyWithJSON(&user); err != nil {
			c.JSON(http.StatusUnauthorized, invalidFormatResponse)
			return
		}

	case "application/x-www-form-urlencoded":
		if err := c.ShouldBind(&user); err != nil {
			c.JSON(http.StatusUnauthorized, invalidFormatResponse)
			return
		}
	}

	// Create user in database and hash password
	if hashedPassword, err := util.HashPassword(user.Password); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error when hashing password!"})
		return
	} else {
		user.Password = hashedPassword
	}

	// Insert the new user
	collection := database.GetInstance().Database("RateMyPeersDB").Collection("Users")

	_, err := collection.InsertOne(context.TODO(), user)
	if err != nil {
		c.JSON(http.StatusConflict, gin.H{"error": "Error when inserting new user to DB!"})
		return
	}

	// once all data is put in db, create session for user
	session := sessions.Default(c)
	session.Set(config.SessionFields.Email, user.Email)
	session.Set(config.SessionFields.Role, user.Role)

	if err := session.Save(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Session could not be saved, try logging in instead"})
		return
	}

	// redirect user to dashboard page
	c.Redirect(http.StatusFound, "/main")
}

// logout controller
func LogoutController(c *gin.Context) {
	session := sessions.Default(c)
	session.Options(sessions.Options{
		MaxAge: -1,
	})

	session.Clear()

	if err := session.Save(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Session could not be cleared"})
		return
	}

	c.Status(http.StatusNoContent)
}

// controller determining if the user is authenticated or not. This controller is to be used with
// the AuthenticationMiddleware in the middleware package
func IsLoggedIn(c *gin.Context) {
	c.Status(http.StatusNoContent)
}

// controller determining if the user is authenticated or not. This controller is to be used with
// the AuthenticationMiddleware in the middleware package
func GetUserInfo(c *gin.Context) {
	session := sessions.Default(c)
	email, ok1 := session.Get(config.SessionFields.Email).(string)
	role, ok2 := session.Get(config.SessionFields.Role).(string)
	if !ok1 || !ok2 {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}

	collection := database.GetInstance().Database("RateMyPeersDB").Collection("Users")
	opts := options.FindOne().SetProjection(bson.M{"firstname": 1, "lastname": 1})
	filter := bson.M{"email": email}
	var user models.User
	collection.FindOne(context.TODO(), filter, opts).Decode(&user)

	c.JSON(http.StatusOK, gin.H{
		"email":     email,
		"role":      role,
		"firstname": user.FirstName,
		"lastname":  user.LastName,
	})
}
