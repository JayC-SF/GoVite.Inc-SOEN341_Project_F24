package main

import (
	"backend/routes"

	"github.com/gin-gonic/gin"

	"github.com/joho/godotenv"
)

// The init function will run before our main function to establish a connection to MongoDB. If it cannot connect it will fail and the program will exit.
func init() {
	godotenv.Load()
}

func main() {

	// create gin engine object
	r := gin.Default()

	// register all routes for the server
	routes.RegisterAllRoutes(r)

	// Listen and Server in 0.0.0.0:8080
	r.Run(":8080")
}
