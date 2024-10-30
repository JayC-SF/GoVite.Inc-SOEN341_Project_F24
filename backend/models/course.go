package models

import (
	"backend/database"
	"context"
	"fmt"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

// Data definiton for a course object.
type Course struct {
	ID                primitive.ObjectID `bson:"_id" json:"id"`
	CourseId          string             `bson:"courseid" json:"courseid" binding:"required"`
	CourseCode        string             `bson:"coursecode" json:"coursecode" binding:"required"`
	CourseName        string             `bson:"coursename"  json:"coursename" binding:"required"`
	CourseDescription string             `bson:"coursedescription" json:"coursedescription" binding:"required"`
	CourseCredits     int                `bson:"coursecredits" json:"coursecredits" binding:"required"`
	Teacher           string             `bson:"teacher" json:"teacher" binding:"required"`
}

// Get a course from an id in the database.
func GetCourseFromCourseId(courseId string) (*Course, error) {
	collection := database.GetInstance().Database("RateMyPeersDB").Collection("Courses")
	filter := bson.M{"courseid": courseId}
	var course Course
	err := collection.FindOne(context.TODO(), filter).Decode(&course)
	if err != nil {
		return nil, err
	}
	return &course, nil
}

func (c *Course) GetAllGroups() ([]Group, error) {
	collection := database.GetInstance().Database("RateMyPeersDB").Collection("Groups")
	filter := bson.M{"courseid": c.CourseId}
	cursor, err := collection.Find(context.TODO(), filter)
	var groups []Group
	if err = cursor.All(context.TODO(), &groups); err != nil {
		fmt.Errorf("%s", err.Error())
		return nil, err
	}
	if groups == nil {
		groups = []Group{}
	}
	return groups, nil
}

func (c *Course) GetStudentJoinedGroup(user *User) (*Group, error) {
	collection := database.GetInstance().Database("RateMyPeersDB").Collection("UsersGroups")
	matchUserEmail := bson.D{
		{Key: "$match", Value: bson.D{
			{Key: "email", Value: user.Email},
		}},
	}
	lookUpGroups := bson.D{
		{Key: "$lookup", Value: bson.D{
			{Key: "from", Value: "Groups"},
			{Key: "localField", Value: "groupid"},
			{Key: "foreignField", Value: "_id"},
			{Key: "as", Value: "groups"},
		}},
	}
	flattenGroups := bson.D{
		{Key: "$unwind", Value: bson.D{
			{Key: "path", Value: "$groups"},
		}},
	}
	newRoot := bson.D{
		{Key: "$replaceRoot", Value: bson.D{
			{Key: "newRoot", Value: "$groups"},
		}},
	}
	matchGroupsWithCourseId := bson.D{
		{Key: "$match", Value: bson.D{
			{Key: "courseid", Value: c.CourseId},
		}},
	}
	pipeline := mongo.Pipeline{
		matchUserEmail,
		lookUpGroups,
		flattenGroups,
		newRoot,
		matchGroupsWithCourseId,
	}
	cursor, err := collection.Aggregate(context.TODO(), pipeline)
	var group Group
	if cursor.Next(context.TODO()) {
		if err = cursor.Decode(&group); err != nil {
			return nil, err
		}
	} else {
		// Handle the case where no documents are found
		fmt.Println("No orders found")
		return nil, mongo.ErrNoDocuments
	}

	// filter := bson.M{"email": user.Email}
	// var userGroup UserGroup
	// err := collection.FindOne(context.TODO(), filter).Decode(&userGroup)
	// if err != nil {
	// 	return nil, err
	// }
	// var group Group
	// collection = database.GetInstance().Database("RateMyPeersDB").Collection("Groups")
	// filter = bson.M{"_id": userGroup.GroupId, "courseid": c.CourseId}
	// err = collection.FindOne(context.TODO(), filter).Decode(&group)
	// if err != nil {
	// 	return nil, err
	//
	// }
	return &group, nil
}
