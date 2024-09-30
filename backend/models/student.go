package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Student struct {
	ID        primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
	firstName string             `json:"firstName" bson:"firstName"`
	lastName  string             `json:"lastName" bson:"lastName"`
	email     string             `json:"email" bson:"email"`
	username  string             `json:"username" bson:"username"`
	password  string             `json:"password" bson:"password"`
}
