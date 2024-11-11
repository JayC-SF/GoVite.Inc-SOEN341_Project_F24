package models

import (
	"backend/database"
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type RatingCriterion struct {
	ID          primitive.ObjectID `json:"id" bson:"_id"`
	RatingId    primitive.ObjectID `json:"ratingid" bson:"ratingid"`
	CriterionId primitive.ObjectID `json:"criterionid" bson:"criterionid"`
	Grade       int                `json:"grade" bson:"grade"`
}

type RatingCriteriaSlice []RatingCriterion

func (rcs RatingCriteriaSlice) Save() error {
	collection := database.GetInstance().Database("RateMyPeersDB").Collection("RatingsCriteria")
	var operations []mongo.WriteModel
	for _, item := range rcs {
		// Create an upsert operation for each RatingCriteria
		update := bson.M{"$set": item}

		operation := mongo.NewUpdateOneModel().
			SetFilter(bson.M{"_id": item.ID}). // filter by unique identifier (name)
			SetUpdate(update).                 // update to set the value field
			SetUpsert(true)                    // specify upsert behavior

		operations = append(operations, operation)
	}
	_, err := collection.BulkWrite(context.Background(), operations)
	return err
}

func NewRatingCriterion(ID primitive.ObjectID, ratingId primitive.ObjectID, criterionId primitive.ObjectID, grade int) *RatingCriterion {
	return &RatingCriterion{
		ID:          ID,
		RatingId:    ratingId,
		CriterionId: criterionId,
		Grade:       grade,
	}
}
