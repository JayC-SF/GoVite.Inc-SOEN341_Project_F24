package models

import (
	"backend/database"
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// login body data definition
type Rating struct {
	ID            primitive.ObjectID `json:"id" bson:"_id"`
	RatingStudent string             `form:"ratingstudent" json:"ratingstudent"`
	RatedStudent  string             `form:"ratedstudent" json:"ratedstudent"`
	Rating        int64              `form:"rating" json:"rating" binding:"required"`
	GroupId       primitive.ObjectID `json:"groupid" bson:"groupid"`
	Comment       string             `json:"comment" bson:"comment"`
}

func (r *Rating) Save() error {
	collection := database.GetInstance().Database("RateMyPeersDB").Collection("Ratings")

	filter := bson.M{"_id": r.ID}
	update := bson.M{"$set": r}

	opts := options.Update().SetUpsert(true)

	_, err := collection.UpdateOne(context.TODO(), filter, update, opts)
	return err
}
