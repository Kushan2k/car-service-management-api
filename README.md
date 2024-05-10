# Car Service Platform API

This API provides endpoints for managing vehicle registrations and related services in a car service platform. It includes JWT authentication for secure access.

## Getting Started

To get started with this API, follow these steps:

1. Clone this repository:
   ```bash
    git clone https://github.com/your/repository.git
    cd repository-folder
    npm install
   ```

# API Documentation

This API was created using Node.js, Express.js, MySQL, and Prisma ORM. It provides endpoints for user registration and login, as well as admin registration and login.

## Endpoints

## User Registration (`/register`)

### Description

Registers a new user.

### Request

- Method: POST
- URL: `/api/auth/register`
- Body:
  - email (string, required): User's email address.
  - password (string, required): User's password.
  - first_name (string, required): User's first name.
  - last_name (string, required): User's last name.

```json
{
  "email": "example_user@gmail.com",
  "password": "password123",
  "first_name": "example",
  "last_name": "example",
  "contact_no": "0123456789"
}
```

```javascript
fetch("/api/auth/register", {
  email: "example_user@gmail.com",
  password: "password123",
  first_name: "example",
  last_name: "example",
  contact_no: "0123456789",
})
```

### Response

- Status Code: 201
- Body:

---

## Admin Registration (`/register/admin`)

### Description

Registers a new admin.

### Request

- Method: POST
- URL: `/api/auth/register/admin`
- Body:
- secret (string, required): Secret key for admin registration.
- username (string, required): Admin's username.
- password (string, required): Admin's password.

```json
{
  "secret": "your secret",
  "password": "password123",
  "username": "example"
}
```

```javascript
fetch("/api/auth/register", {
  secret: "your secret",
  password: "password123",
  username: "example",
})
```

### Response

- Status Code: 201
- Body:

---

## User Login (`/login`)

### Description

User login endpoint.

### Request

- Method: POST
- URL: `api/auth//login`
- Body:
- email (string, required): User's email address.
- password (string, required): User's password.

```json
{
  "email": "example_user@gmail.com",
  "password": "password123"
}
```

```javascript
fetch("/api/auth/login", {
  email: "example_user@gmail.com",
  password: "password123",
})
```

### Response

- Status Code: 200
- Body:

---

## Admin Login (`/login/admin`)

### Description

Admin login endpoint.

### Request

- Method: POST
- URL: `api/auth/login/admin`
- Body:
- username (string, required): Admin's username.
- password (string, required): Admin's password.

```json
{
  "username": "example_user",
  "password": "password123"
}
```

```javascript
fetch("/api/auth/login", {
  username: "example_user",
  password: "password123",
})
```

### Response

- Status Code: 200
- Body:

<hr/>

## Get Vehicles (`GET /vehicles`)

Retrieves vehicles belonging to a specific user.

## Query Parameters

- `id`: User ID (required)

## Headers

- `Authorization`: Authorization header required.

### Success Response

- **Code:** 200 OK
- **Content:** `[ { ...vehicle data }, { ...vehicle data }, ...]`

### Error Responses

- **Code:** 401 Unauthorized
- **Content:** No user ID provided or invalid user ID.

## Create Vehicle (`POST /vehicles`)

Creates a new vehicle entry.

### Request Body

```json
{
  "userid": "<user id>",
  "model": "Toyota",
  "year": 2022,
  "type": "SUV",
  "number": "ABC1234"
}
```

<hr/>

## Get All Services (`GET /services`)

Retrieves all services with associated users and vehicles.

### Success Response

- **Code:** 200 OK
- **Content:** `[ { ...service data, "user": { ...user data }, "vehicle": { ...vehicle data } }, ...]`

## Get Services by User ID (`GET /services/:id`)

Retrieves services associated with a specific user.

### Path Parameters

- `id`: User ID (required)

### Success Response

- **Code:** 200 OK
- **Content:** `[ { ...service data, "user": { ...user data }, "vehicle": { ...vehicle data } }, ...]`

### Error Responses

- **Code:** 400 Bad Request
- **Content:** `{ "msg": "Unauthorized!" }`

## Update Service Status and Total (`PATCH /services/update`)

Updates the status and total cost of a service.

### Request Body

```json
{
  "sid": "<service id>",
  "status": "<new status>",
  "total": "<new total>"
}
```

# Contribution Message

## Description

This contribution introduces new API routes and enhances the existing ones for better functionality and clarity. It adds routes for managing services, retrieving user-specific data, and updating service statuses. Additionally, it includes improvements in error handling and response messages.

## Changes Made

Added routes for managing services (GET /services, GET /services/:id, PATCH /services/update, POST /services).
Improved error handling and response messages for existing routes.
Updated the README.md file with detailed documentation for the new routes using GitHub-flavored Markdown (GFM).

## How to Test

Clone the repository locally.
Run the application using npm start.
Test each API route using tools like Postman or cURL.
Verify that the new routes function as expected and return the correct responses.
Ensure that error handling works as intended for invalid requests or missing parameters.

## Related Issue

This contribution addresses the issue #[issue_number] by implementing the required functionality and updating the documentation accordingly.

## Screenshots (Optional)

Include screenshots or GIFs demonstrating the usage of the new API routes if applicable.

## Additional Notes

Feel free to provide any additional information or instructions related to this contribution.

## Give this repo a star
