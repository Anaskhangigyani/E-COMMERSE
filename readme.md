# Shopper Management System

This project consists of a **Shopper Management API** backend and a **React frontend** for managing shoppers in an e-commerce system. The system allows you to manage shopper data, including adding new shoppers, updating shopper details, purchasing a shopper, returning a shopper, and more.

## Table of Contents

- [Overview](#overview)
- [Setup](#setup)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
  - [Add Shopper](#add-shopper)
  - [Read Available Shoppers](#read-available-shoppers)
  - [Purchase Shopper](#purchase-shopper)
  - [Read Sold Shoppers](#read-sold-shoppers)
  - [Return Shopper](#return-shopper)
  - [Remove Shopper](#remove-shopper)
  - [Update Shopper](#update-shopper)
  - [Read One Available Shopper](#read-one-available-shopper)
  - [Read One Sold Shopper](#read-one-sold-shopper)
- [Running the Application](#running-the-application)

## Overview

This system consists of:

- **Backend (API)**: Manages shopper data, provides endpoints for CRUD operations on shoppers (using MongoDB as a database).
- **Frontend (React app)**: Provides a user interface to interact with the shopper management system.

### Features:

- Add new shoppers.
- View available shoppers.
- Purchase shoppers (move them to the sold collection).
- Return a sold shopper to the available list.
- Remove shoppers.
- Update shopper details.

The data is stored in a MongoDB database.

## Setup

### Backend Setup

1. **Clone the repository**:

   ```bash
   git clone <repository_url>
   cd <repository_folder>
   Install backend dependencies:
   ```

After cloning the repository, install the required backend dependencies:

bash
Copy code
npm install
Set up environment variables:

Create a .env file in the root directory of the project and add the following values:

env
Copy code
PORT=8000
MONGO_URL=mongodb://127.0.0.1/my_database
PORT: The port on which the application will run (default is 8000).
MONGO_URL: The connection string for your MongoDB database. Example: mongodb://127.0.0.1/my_database.
Start the backend server:

Start the backend server by running:

bash
Copy code
npm start
This will start the backend application on the specified port (default is 8000).

Frontend Setup
Clone the frontend repository:

If you have a separate repository for the frontend, clone it into a different folder. If it’s in the same repository, navigate to the frontend folder:

bash
Copy code
git clone <frontend_repository_url>
cd <frontend_folder>
Install frontend dependencies:

Install the required frontend dependencies:

bash
Copy code
npm install
Start the frontend server:

Start the frontend React application by running:

bash
Copy code
npm start
This will start the frontend application on a default port, typically 3000. Make sure it can connect to the backend API at http://localhost:8000.

Environment Variables
The following environment variables are required for the backend:

PORT: The port on which the backend server will listen (default is 8000).

MONGO_URL: The MongoDB connection string. Example:

env
Copy code
mongodb://127.0.0.1/my_database
Ensure MongoDB is installed and running locally or modify the connection string to use a cloud-based MongoDB service like MongoDB Atlas.

For the frontend, you may need to update the API URL to match your backend’s location (e.g., http://localhost:8000).

API Endpoints
Add Shopper
URL: /api/shopper

Method: POST

Request Body:

json
Copy code
{
"shopperNo": "12345",
"shopperName": "John Doe",
"shopperPrice": 100.00,
"suits": ["Suit 1", "Suit 2"]
}
Response:

json
Copy code
{
"message": "Shopper created successfully.",
"success": true,
"data": { ... }
}
Read Available Shoppers
URL: /api/shopper
Method: GET
Response:
json
Copy code
{
"shoppers": [ ... ],
"success": true
}
Purchase Shopper
URL: /api/shopper/purchase/:shopperNo
Method: POST
Response:
json
Copy code
{
"message": "Shopper moved to sold collection and deleted successfully.",
"success": true
}
Read Sold Shoppers
URL: /api/sold
Method: GET
Response:
json
Copy code
{
"shoppers": [ ... ],
"success": true
}
Return Shopper
URL: /api/shopper/return/:shopperNo
Method: POST
Response:
json
Copy code
{
"message": "Shopper successfully returned to the shopper list.",
"success": true
}
Remove Shopper
URL: /api/shopper/:shopperNo
Method: DELETE
Response:
json
Copy code
{
"message": "Shopper removed successfully.",
"success": true
}
Update Shopper
URL: /api/shopper/:shopperNo

Method: PUT

Request Body:

json
Copy code
{
"shopperName": "Updated Name",
"shopperPrice": 150.00
}
Response:

json
Copy code
{
"message": "Shopper updated successfully.",
"success": true,
"data": { ... }
}
Read One Available Shopper
URL: /api/shopper/:shopperNo
Method: GET
Response:
json
Copy code
{
"message": "Shopper retrieved successfully.",
"success": true,
"data": { ... }
}
Read One Sold Shopper
URL: /api/sold/:shopperNo
Method: GET
Response:
json
Copy code
{
"message": "Shopper retrieved successfully.",
"success": true,
"data": { ... }
}
Running the Application
Backend:
To run the backend application locally:

Install MongoDB locally or use a cloud service like MongoDB Atlas.

Set up the .env file with the correct values for PORT and MONGO_URL.

Start the backend server:

bash
Copy code
npm start
Frontend:
To run the frontend React application:

Install the necessary dependencies by running:

bash
Copy code
npm install
Start the React application:

bash
Copy code
npm start
This will start the frontend on http://localhost:3000, and it should be able to communicate with the backend API running on http://localhost:8000.
