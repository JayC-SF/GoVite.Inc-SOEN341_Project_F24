package main

import (
	"backend/database"
	"backend/middlewares"
	"backend/routes"
	"context"
	"net/http"
	"path/filepath"

	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"

	// Add the MongoDB driver packages

	// Add required Go packages

	"github.com/joho/godotenv"
)

// ----------- GLOBAL VARIABLES -----------
var db = make(map[string]string)

// // Your MongoDB Atlas Connection String
// var dbPassword = os.Getenv("DB_PASSWORD")

// // var uri = fmt.Sprintf("mongodb+srv://LamDaniel1:%s@govitecluster.tw1m0.mongodb.net/?retryWrites=true&w=majority&appName=GoViteCluster", dbPassword)
// const uri = "mongodb+srv://LamDaniel1:LPXpxNZBVYXtktZS@govitecluster.tw1m0.mongodb.net/?retryWrites=true&w=majority&appName=GoViteCluster"

// // A global variable that will hold a reference to the MongoDB client
// var mongoClient *mongo.Client

// ----------------------------------------

// keep this function as reference for future api requests to do
func setupRouter() *gin.Engine {
	// Disable Console Color
	// gin.DisableConsoleColor()
	r := gin.Default()
	r.Use(static.Serve("/", static.LocalFile(filepath.Join("..", "frontend", "dist"), true)))

	// Get user value
	r.GET("/user/:name", func(c *gin.Context) {
		user := c.Params.ByName("name")
		value, ok := db[user]
		if ok {
			c.JSON(http.StatusOK, gin.H{"user": user, "value": value})
		} else {
			c.JSON(http.StatusOK, gin.H{"user": user, "status": "no value"})
		}
	})

	// Authorized group (uses gin.BasicAuth() middleware)
	// Same than:
	// authorized := r.Group("/")
	// authorized.Use(gin.BasicAuth(gin.Credentials{
	//	  "foo":  "bar",
	//	  "manu": "123",
	//}))
	authorized := r.Group("/", gin.BasicAuth(gin.Accounts{
		"foo":  "bar", // user:foo password:bar
		"manu": "123", // user:manu password:123
	}))

	/* example curl for /admin with basicauth header
	   Zm9vOmJhcg== is base64("foo:bar")

		curl -X POST \
	  	http://localhost:8080/admin \
	  	-H 'authorization: Basic Zm9vOmJhcg==' \
	  	-H 'content-type: application/json' \
	  	-d '{"value":"bar"}'
	*/
	authorized.POST("admin", func(c *gin.Context) {
		user := c.MustGet(gin.AuthUserKey).(string)

		// Parse JSON
		var json struct {
			Value string `json:"value" binding:"required"`
		}

		if c.Bind(&json) == nil {
			db[user] = json.Value
			c.JSON(http.StatusOK, gin.H{"status": "ok"})
		}
	})

	return r
}

// Our implementation logic for connecting to MongoDB
// func connectToDatabase() error {
// 	serverAPI := options.ServerAPI(options.ServerAPIVersion1)
// 	opts := options.Client().ApplyURI(uri).SetServerAPIOptions(serverAPI)

// 	client, err := mongo.Connect(context.TODO(), opts)
// 	if err != nil {
// 		panic(err)
// 	}
// 	err = client.Ping(context.TODO(), nil)
// 	mongoClient = client
// 	return err
// }

// The init function will run before our main function to establish a connection to MongoDB. If it cannot connect it will fail and the program will exit.
func init() {
	godotenv.Load()
}

// GET /movies - Get all movies
func getStudents(c *gin.Context) {
	// Find movies
	cursor, err := database.GetInstance().Database("RateMyPeersDB").Collection("Students").Find(context.TODO(), bson.D{{}})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Map results
	var movies []bson.M
	if err = cursor.All(context.TODO(), &movies); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Return movies
	c.JSON(http.StatusOK, movies)
}

func main() {

	// create gin engine object
	r := gin.Default()

	// register all middlewares of the server
	middlewares.RegisterAllMiddleWares(r)

	// register all routes for the server
	routes.RegisterAllRoutes(r)

	r.GET("/students", getStudents)

	// Listen and Server in 0.0.0.0:8080
	r.Run(":8080")
}
