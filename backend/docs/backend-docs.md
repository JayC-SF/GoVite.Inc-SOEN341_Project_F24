# RateMyPeers - Official Gin Go Backend Documentation

## Table of Contents

1. [Project Overview](#project-overview)
2. [Folder Structure](#folder-structure)
3. [Directory Details](#directory-details)
   - [Config](#config)
   - [Controllers](#controllers)
   - [Database](#database)
   - [Middleware](#middleware)
   - [Models](#models)
   - [Routes](#routes)
   - [Util](#util)
   - [Tests](#tests)

---

## Project Overview

This is a **Gin-based Go backend** designed to serve as the backend for a web application for the RateMyPeers peer assessment website. It includes:
- User authentication and session management.
- RESTful API endpoints for managing courses, groups, ratings, and more.
- Integration with MongoDB for database operations.
- Middleware for handling authentication and serving frontend assets.


---

## Directory Details

### **Config**
Contains configuration logic for authentication, paths, and session field management.
- **`authentication.go`**: Handles user authentication settings.
- **`paths.go`**: Manages configurable path settings for the application.
- **`session_fields.go`**: Defines and validates session-specific fields.
- **`*_test.go`**: Unit tests for the corresponding configuration files.

### **Controllers**
Defines the core API endpoint logic.
- **`authentication.go`**: Handles user login and registration.
- **`courses.go`**: Manages course-related endpoints.
- **`groups.go`**: Handles group creation, updates, and deletions.
- **`noroutes.go`**: Default handler for unmatched routes.
- **`ping.go`**: Health check endpoint.
- **`ratings.go`**: Manages student rating operations.
- **`students.go`**: Handles student-specific operations.
- **`teachers.go`**: Manages teacher-related logic.
- **`ping_test.go`**: Tests the health check endpoint.

### **Database**
Handles MongoDB connection and collections.
- **`collection.go`**: Encapsulates logic for interacting with MongoDB collections.
- **`connection.go`**: Manages the connection to the MongoDB instance.

### **Middleware**
Provides reusable middleware for the Gin application.
- **`auth_session.go`**: Middleware for validating user sessions.
- **`serve_frontend.go`**: Middleware for serving the React frontend.

### **Models**
Defines the schema and structure of data used in the application.
- **`course.go`**: Schema for course entities.
- **`criterion.go`**: Defines criteria for ratings.
- **`group.go`**: Represents user groups.
- **`login.go`**: User login data model.
- **`rating.go`**: Structure for storing ratings.
- **`ratings_criteria.go`**: Specifies criteria for student ratings.
- **`user.go`**: Represents a user entity.
- **`user_group.go`**: Handles the relationship between users and groups.

### **Routes**
Defines the application's API routing.
- **`api/api.go`**: Configures API endpoint groups and versions.
- **`routes.go`**: Maps routes to controllers.

### **Util**
Provides utility functions and helper logic.
- **`authentication.go`**: Helper functions for authentication workflows.
- **`util.go`**: General-purpose utility functions.

## Testing

- **Test Framework**: The project uses Go's built-in testing package.
- **Run All Tests**: To execute all unit and integration tests, use:
  ```bash
  go test ./... -v
  ```









