package models

import "go.mongodb.org/mongo-driver/bson/primitive"

// login body data definition
type Rating struct {
	RatingStudent string             `form:"ratingstudent" json:"ratingstudent"`
	RatedStudent  string             `form:"ratedstudent" json:"ratedstudent"`
	Rating        int64              `form:"rating" json:"rating" binding:"required"`
	GroupId       primitive.ObjectID `json:"groupid" bson:"groupid"`
}
