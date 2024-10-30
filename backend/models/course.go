package models

// course body data definiton
type Course struct {
	CourseId          string `json:"courseid" bson:"courseid" binding:"required"`
	CourseCode        string `json:"coursecode" bson:"coursecode" binding:"required"`
	CourseName        string `json:"coursename" bson:"coursename" binding:"required"`
	CourseDescription string `json:"coursedescription" bson:"coursedescription" binding:"required"`
	CourseCredits     int    `json:"coursecredits" bson:"coursecredits" binding:"required"`
	CourseTeacher     string `json:"teacher" bson:"teacher" binding:"required"`
}
