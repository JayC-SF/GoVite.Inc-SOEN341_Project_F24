package models

import (
	"backend/database"
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type UserGroup struct {
	ID      primitive.ObjectID `bson:"id,omitempty" json:"id,omitempty"`
	GroupId primitive.ObjectID `bson:"groupid" json:"groupid"`
	Email   string             `bson:"email" json:"email"`
}

// Save function that saves or creates a new object in db
func (ug *UserGroup) Save() error {
	collection := database.GetInstance().Database("RateMyPeersDB").Collection("UsersGroups")

	filter := bson.M{"_id": ug.ID}
	update := bson.M{"$set": ug}

	opts := options.Update().SetUpsert(true)

	_, err := collection.UpdateOne(context.TODO(), filter, update, opts)
	return err
}
