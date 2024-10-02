package models

// Signup body data definition
type User struct {
	FirstName string `form:"firstname" json:"firstname" bson:"firstname" binding:"required"`
	LastName  string `form:"lastname" json:"lastname" bson:"lastname" binding:"required"`
	Username  string `form:"username" json:"username" bson:"username" binding:"required"`
	Email     string `form:"email" json:"email" bson:"email" binding:"required"`
	Password  string `form:"password" json:"password" bson:"password" binding:"required"`
	Role      string `form:"role" json:"role" bson:"role" binding:"required"`
}
