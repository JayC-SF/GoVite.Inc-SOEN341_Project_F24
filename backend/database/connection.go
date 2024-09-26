package database

import (
	"context"
	"log"
	"os"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// Exported MongoDB client variable so it can be accessed in other files
var mongoClient *mongo.Client
var uri string

func GetInstance() *mongo.Client {
	if mongoClient == nil && connectToDatabase() != nil {
		log.Fatal("Connection to database failed.!")
	} else {
		log.Println("Connected to database!")
	}
	return mongoClient

}

// Our implementation logic for connecting to MongoDB
func connectToDatabase() error {

	uri = os.Getenv("URI")
	serverAPI := options.ServerAPI(options.ServerAPIVersion1)
	opts := options.Client().ApplyURI(uri).SetServerAPIOptions(serverAPI)

	client, err := mongo.Connect(context.TODO(), opts)
	if err != nil {
		panic(err)
	}
	err = client.Ping(context.TODO(), nil)
	mongoClient = client
	return err
}
