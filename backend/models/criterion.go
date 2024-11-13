package models

import (
	"backend/database"
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Criterion struct {
	ID        primitive.ObjectID `json:"id"`
	Dimension string             `json:"dimension"`
	Criterion string             `json:"criterion"`
}

func GetRatingCriterionFromId(id primitive.ObjectID) (*Criterion, error) {
	collection := database.GetInstance().Database("RateMyPeersDB").Collection("Criteria")
	var rc Criterion
	if err := collection.FindOne(context.TODO(), bson.M{"_id": id}).Decode(&rc); err != nil {
		return nil, err
	}
	return &rc, nil
}
