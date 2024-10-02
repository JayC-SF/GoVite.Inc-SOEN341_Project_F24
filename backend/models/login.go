package models

// login body data definiton
type Login struct {
	Email      string `form:"email" json:"email" binding:"required"`
	Password   string `form:"password" json:"password" binding:"required"`
	RememberMe bool   `form:"remember-me" json:"remember-me"`
}
