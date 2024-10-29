package models

import "go.mongodb.org/mongo-driver/bson/primitive"

// Data definiton for a course object.
type Course struct {
	ID                primitive.ObjectID `bson:"_id" json:"id"`
	Courseid          string             `bson:"courseid" json:"courseid" binding:"required"`
	Coursecode        string             `bson:"coursecode" json:"coursecode" binding:"required"`
	Coursename        string             `bson:"coursename"  json:"coursename" binding:"required"`
	Coursedescription string             `bson:"coursedescription" json:"coursedescription" binding:"required"`
	Coursecredits     int                `bson:"coursecredits" json:"coursecredits" binding:"required"`
	Teacher           string             `bson:"teacher" json:"teacher" binding:"required"`
}
