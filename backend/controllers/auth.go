package controllers

import (
	"backend/config"
	"log"
	"net/http"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
)

// login body supports
type Login struct {
	Username string `form:"username" json:"username" binding:"required"`
	Password string `form:"password" json:"password" binding:"required"`
}

// login body supports
type SignUp struct {
	Username string `form:"username" json:"username" binding:"required"`
	Email    string `form:"email" json:"email" binding:"required"`
	Password string `form:"password" json:"password" binding:"required"`
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
	log.Println(body)
	// dummy login assessment
	if body.Username != "user" || body.Password != "password" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid credentials or format"})
		return
	}

	session := sessions.Default(c)
	session.Set(config.SessionFields.Username, body.Username)
	// dummy role for now
	session.Set(config.SessionFields.Role, "instructor")

	if err := session.Save(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Session could not be saved"})
		return
	}
	c.Redirect(http.StatusFound, "/dashboard")
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

	session := sessions.Default(c)
	session.Set(config.SessionFields.Username, body.Username)
	// dummy role for now
	session.Set(config.SessionFields.Role, "instructor")
	if err := session.Save(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Session could not be saved"})
		return
	}
	c.Redirect(http.StatusFound, "/dashboard")
}
