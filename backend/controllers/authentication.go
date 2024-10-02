package controllers

import (
	"backend/config"
	"net/http"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
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
	// ok := util.CompareHashAndPassword(body.Password, <hashed_password>)
	if body.Email != "user@hotmail.com" || body.Password != "password" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid credentials or format"})
		return
	}

	session := sessions.Default(c)
	session.Set(config.SessionFields.Email, body.Email)
	// TODO: REMOVE DUMMY ROLE IN THE FUTURE
	session.Set(config.SessionFields.Role, "instructor")

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
