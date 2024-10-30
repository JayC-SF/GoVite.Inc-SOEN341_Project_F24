package models

import (
	"backend/database"
	"context"
	"fmt"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// Signup body data definition
type User struct {
	ID        primitive.ObjectID `form:"id" json:"id,omitempty" bson:"_id"`
	FirstName string             `form:"firstname" json:"firstname" bson:"firstname" binding:"required"`
	LastName  string             `form:"lastname" json:"lastname" bson:"lastname" binding:"required"`
	Username  string             `form:"username" json:"username" bson:"username" binding:"required"`
	Email     string             `form:"email" json:"email" bson:"email" binding:"required"`
	Password  string             `form:"password" json:"password" bson:"password" binding:"required"`
	Role      string             `form:"role" json:"role" bson:"role" binding:"required"`
}

func GetUserFromEmail(email string) (*User, error) {
	return GetUserFromEmailWithProjection(email, nil)
}

// get user information with only loaded specific fields.
func GetUserFromEmailWithProjection(email string, projection bson.M) (*User, error) {

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	filter := bson.M{"email": email}
	collection := database.GetInstance().Database("RateMyPeersDB").Collection("Users")
	var opts *options.FindOneOptions

	if projection == nil {
		opts = nil
	} else {
		opts = options.FindOne().SetProjection(projection)
	}

	var result User
	if err := collection.FindOne(ctx, filter, opts).Decode(&result); err != nil {
		fmt.Errorf("%s", err.Error())
		return nil, err
	}
	return &result, nil
}
