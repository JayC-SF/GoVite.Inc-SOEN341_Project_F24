package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Group struct {
	ID        primitive.ObjectID `bson:"_id" json:"id"`
	GroupName string             `bson:"groupname"  json:"groupname,omitempty"`
	CourseId  string             `bson:"courseid" json:"courseid,omitempty"`
}
