package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type UserGroup struct {
	ID       primitive.ObjectID `bson:"id" json:"id"`
	GroupId  primitive.ObjectID `bson:"groupid" json:"groupid"`
	Username string             `bson:"username" json:"username"`
}
