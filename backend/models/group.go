package models

import (
	"backend/database"
	"context"
	"fmt"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type Group struct {
	ID        primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	GroupName string             `bson:"groupname"  json:"groupname,omitempty"`
	CourseId  string             `bson:"courseid" json:"courseid,omitempty"`
}

func GetGroupFromId(groupId string) (*Group, error) {
	collection := database.GetInstance().Database("RateMyPeersDB").Collection("Groups")
	id, err := primitive.ObjectIDFromHex(groupId)
	if err != nil {
		return nil, err
	}
	filter := bson.M{"_id": id}
	var group Group
	err = collection.FindOne(context.TODO(), filter).Decode(&group)
	if err != nil {
		return nil, err
	}
	return &group, nil
}

func (g *Group) GetStudents() ([]User, error) {
	collection := database.GetInstance().Database("RateMyPeersDB").Collection("UsersGroups")

	pipeline := mongo.Pipeline{
		bson.D{
			{Key: "$match", Value: bson.D{
				{Key: "groupid", Value: g.ID},
			}},
		},
		bson.D{
			{Key: "$lookup", Value: bson.D{
				{Key: "from", Value: "Users"},
				{Key: "localField", Value: "email"},
				{Key: "foreignField", Value: "email"},
				{Key: "as", Value: "users"},
			}},
		},
		bson.D{
			{Key: "$unwind", Value: bson.D{
				{Key: "path", Value: "$users"},
			}},
		},
		bson.D{
			{Key: "$replaceRoot", Value: bson.D{
				{Key: "newRoot", Value: "$users"},
			}},
		},
		bson.D{
			{Key: "$project", Value: bson.D{
				{Key: "password", Value: 0},
			}},
		},
	}
	cursor, err := collection.Aggregate(context.TODO(), pipeline)
	if err != nil {
		return nil, err
	}
	var users []User
	cursor.All(context.TODO(), &users)
	if users == nil {
		users = []User{}
	}
	return users, nil
}

// gets the list of students in the same class as the group, but do not have a group.
func (g *Group) GetPotentialStudents() ([]User, error) {

	collection := database.GetInstance().Database("RateMyPeersDB").Collection("UsersCourses")

	pipeline := mongo.Pipeline{
		bson.D{
			{Key: "$match", Value: bson.D{
				{Key: "courseid", Value: g.CourseId},
			}},
		},
		bson.D{
			{Key: "$lookup", Value: bson.D{
				{Key: "from", Value: "Users"},
				{Key: "localField", Value: "email"},
				{Key: "foreignField", Value: "email"},
				{Key: "as", Value: "users"},
			}},
		},
		bson.D{
			{Key: "$unwind", Value: bson.D{
				{Key: "path", Value: "$users"},
			}},
		},
		bson.D{
			{Key: "$replaceRoot", Value: bson.D{
				{Key: "newRoot", Value: "$users"},
			}},
		},
		bson.D{
			{Key: "$lookup", Value: bson.D{
				{Key: "from", Value: "UsersGroups"},
				{Key: "localField", Value: "email"},
				{Key: "foreignField", Value: "email"},
				{Key: "as", Value: "usersgroups"},
			}},
		},
		// bson.D{
		// 	{Key: "$unwind", Value: bson.D{
		// 		{Key: "path", Value: "$usersgroups"},
		// 	}},
		// },
		// bson.D{
		// 	{Key: "$match", Value: bson.D{
		// 		{Key: "usersgroups", Value: g.CourseId},
		// 	}},
		// },
		bson.D{
			{Key: "$project", Value: bson.D{
				// {Key: "usersgroups", Value: 0},
				{Key: "password", Value: 0},
			}},
		},
	}
	cursor, err := collection.Aggregate(context.TODO(), pipeline)
	if err != nil {
		fmt.Println(err.Error())
		return nil, err
	}
	var users []User
	cursor.All(context.TODO(), &users)
	if users == nil {
		users = []User{}
	}
	return users, nil
}
