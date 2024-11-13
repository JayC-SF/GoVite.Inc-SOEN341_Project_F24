package models

import (
	"backend/database"
	"context"
	"errors"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// login body data definition
type Rating struct {
	ID            primitive.ObjectID `json:"id" bson:"_id"`
	RatingStudent string             `form:"ratingstudent" json:"ratingstudent"`
	RatedStudent  string             `form:"ratedstudent" json:"ratedstudent"`
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

func (r *Rating) GetAverageGrade() (float64, error) {
	ratingCriteria, err := r.GetRatingCriteria()
	if err != nil {
		return 0, err
	}
	if len(ratingCriteria) <= 0 {
		return 0, errors.New("No rating criteria found for this rating.")
	}
	var score float64 = 0
	for _, ratingCriterion := range ratingCriteria {
		score += float64(ratingCriterion.Grade)
	}
	return score / float64(len(ratingCriteria)), nil
}

func GetRating(ratingStudentEmail, ratedStudentEmail string, groupId primitive.ObjectID) (*Rating, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	collection := database.GetInstance().Database("RateMyPeersDB").Collection("Ratings")
	filter := bson.M{
		"ratingstudent": ratingStudentEmail,
		"ratedstudent":  ratedStudentEmail,
		"groupid":       groupId,
	}
	var rating Rating
	if err := collection.FindOne(ctx, filter).Decode(&rating); err != nil {
		return nil, err
	}
	return &rating, nil
}

func (r *Rating) GetRatingCriteria() ([]RatingCriterion, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	collection := database.GetInstance().Database("RateMyPeersDB").Collection("RatingsCriteria")
	filter := bson.M{
		"ratingid": r.ID,
	}
	cursor, err := collection.Find(ctx, filter)
	if err != nil {
		return nil, err
	}
	var ratingCriteria []RatingCriterion
	if err := cursor.All(ctx, &ratingCriteria); err != nil {
		return nil, err
	}
	return ratingCriteria, nil
}
