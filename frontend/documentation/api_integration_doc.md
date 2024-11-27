# API Integration Documentation

This document provides a comprehensive guide on how the frontend integrates with the backend APIs for the **PeerPro - Collaborative Assessment System**. It includes information about API endpoints, request and response structures, and integration practices.

---

## **Table of Contents**

1. [Overview of API Integration](#1-overview-of-api-integration)
2. [Environment Variables](#2-environment-variables)
3. [HTTP Client Setup](#3-http-client-setup)
4. [API Endpoints](#4-api-endpoints)
5. [Error Handling](#5-error-handling)
6. [Best Practices](#6-best-practices)

---

## **1. Overview of API Integration**

The frontend communicates with the backend via RESTful APIs to perform operations such as user authentication, fetching assessment data, and submitting peer reviews.

- The HTTP client library used: **Axios**.
- Base URL for the API is configured in the `.env` file for better flexibility and security.

---

## **2. Environment Variables**

The API base URL is stored in the `.env` file to support different environments (development, staging, production).

Example:

```env
REACT_APP_API_URL=https://api.example.com
```

In the code, the base URL is accessed using:

````javascript
const BASE_URL = process.env.REACT_APP_API_URL;  ```
````

---

## **3. HTTP Client Setup**

All API requests are handled through a centralized Axios instance to simplify request configuration and manage headers, tokens, and error handling.

**API Client File:** `services/apiClient.ts`

```typescript
import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Adding an interceptor for authentication tokens
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
```

---

## **4. API Endpoints**

Below is a list of the primary API endpoints used in the application.

### **Authentication APIs**

1. **Login**

- Method: `POST`

- Endpoint: `/auth/login`

- Request Body:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

- Response:

```json
{
  "token": "jwt-token",
  "user": {
    "id": "123",
    "name": "John Doe"
  }
}
```

2. **Register**

- Method: `POST`

- Endpoint: `/auth/register`

- Request Body:

```json
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "password123"
}
```

- Response:

```json
{
  "message": "Registration successful"
}
```

### **Assessment APIs**

1. **Get Assessments**

- Method: `GET`

- Endpoint: `/assessments
`
- Response:

```json
[
  {
    "id": "1",
    "title": "Peer Review 1",
    "deadline": "2024-12-01T12:00:00Z"
  },
  {
    "id": "2",
    "title": "Project Feedback",
    "deadline": "2024-12-10T12:00:00Z"
  }
]
```

2. **Submit Assessment**

- Method: `POST`

- Endpoint: `/assessments/:id/submit`

- Request Body:

```json
{
  "scores": {
    "peer1": 8,
    "peer2": 9
  },
  "comments": "Great teamwork!"
}
```

- Response:

```json
{
  "message": "Assessment submitted successfully"
}
```

---

## **5. Error Handling**

To handle API errors gracefully:

- All requests are wrapped in a `try-catch` block.

- Errors are logged for debugging, and user-friendly messages are displayed.

```typescript
try {
  const response = await apiClient.get("/assessments");
  console.log(response.data);
} catch (error) {
  if (error.response) {
    console.error("API Error:", error.response.data.message);
  } else {
    console.error("Network Error:", error.message);
  }
}
```

---

## **6. Best Practices**

- **Centralized API Client**: Use a single Axios instance to manage API requests.

- **Environment Variables**: Never hardcode sensitive data like API URLs or keys in the codebase.

- **Error Handling**: Always handle errors gracefully to improve user experience.

- **Token Management**: Store tokens securely (e.g., `localStorage`) and add them to request headers.

- **Data Validation**: Ensure data sent to the server complies with the expected format to avoid API errors.
