package models

import (
	"backend/database"
	"context"
	"errors"
	"fmt"
	"log"
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
	Password  string             `form:"password" json:"password,omitempty" bson:"password" binding:"required"`
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

func (user *User) GetRatingScore(groupId string) (float64, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	collection := database.GetInstance().Database("RateMyPeersDB").Collection("Ratings")
	mongoGroupId, err := primitive.ObjectIDFromHex(groupId)
	if err != nil {
		return 0, err
	}
	fmt.Println(user.Email, mongoGroupId)
	filter := bson.M{
		"ratedstudent": user.Email,
		"groupid":      mongoGroupId,
	}
	cursor, err := collection.Find(ctx, filter)
	if err != nil {
		return 0, err
	}
	var ratings []Rating
	if err := cursor.All(ctx, &ratings); err != nil {
		return 0, err
	}
	if ratings == nil {
		ratings = []Rating{}
	}
	if len(ratings) == 0 {
		return 0, errors.New("NA rating score")
	}
	score := float64(0)
	total := 0
	for _, rating := range ratings {
		avgScore, err := rating.GetAverageGrade()
		// omit rating if error occurs getting avg grade for a rating
		if err != nil {
			log.Println("Error getting rate average, skipping: ", err)
			continue
		}
		total += 1
		score += avgScore
	}
	if total == 0 {
		return 0, errors.New("NA rating score")
	}

	return score / float64(total), nil
}
