# Shopper Management API

This is a Shopper Management API that allows you to manage shoppers in an e-commerce system. The API provides functionality to add new shoppers, update shopper details, purchase a shopper, return a shopper, and more.

## Table of Contents

- [Overview](#overview)
- [Setup](#setup)
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

This API is designed for managing shoppers in an online store. It allows you to:

- Add new shoppers.
- View available shoppers.
- Purchase (move) shoppers to a sold collection.
- Return a sold shopper to the available list.
- Remove shoppers from the store.
- Update shopper details, including adding new suits to existing shoppers.

The data is stored in a MongoDB database.

## Setup

1. Clone the repository:

   ```bash
   git clone <repository_url>
   cd <repository_folder>
   Install dependencies:
   ```

bash
Copy code
npm install
Set up your environment variables by creating a .env file in the root directory of the project and adding the following values:

plaintext
Copy code
PORT=8000
MONGO_URL=mongodb://127.0.0.1/my_database
PORT: The port on which the application will run (default is 8000).
MONGO_URL: The connection string for your MongoDB database.
Start the server:

bash
Copy code
npm start
Environment Variables
This project requires the following environment variables:

PORT: The port on which the application will listen. Default is 8000.

MONGO_URL: The MongoDB connection string. Example:

plaintext
Copy code
mongodb://127.0.0.1/my_database
Make sure MongoDB is installed and running locally or modify the connection string to use a cloud-based MongoDB service like MongoDB Atlas.

API Endpoints
Add Shopper
POST /api/shopper

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
GET /api/shopper

Response:
json
Copy code
{
"shoppers": [ ... ],
"success": true
}
Purchase Shopper
POST /api/shopper/purchase/:shopperNo

Response:
json
Copy code
{
"message": "Shopper moved to sold collection and deleted successfully.",
"success": true
}
Read Sold Shoppers
GET /api/sold

Response:
json
Copy code
{
"shoppers": [ ... ],
"success": true
}
Return Shopper
POST /api/shopper/return/:shopperNo

Response:
json
Copy code
{
"message": "Shopper successfully returned to the shopper list.",
"success": true
}
Remove Shopper
DELETE /api/shopper/:shopperNo

Response:
json
Copy code
{
"message": "Shopper removed successfully.",
"success": true
}
Update Shopper
PUT /api/shopper/:shopperNo

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
GET /api/shopper/:shopperNo

Response:
json
Copy code
{
"message": "Shopper retrieved successfully.",
"success": true,
"data": { ... }
}
Read One Sold Shopper
GET /api/sold/:shopperNo

Response:
json
Copy code
{
"message": "Shopper retrieved successfully.",
"success": true,
"data": { ... }
}
Running the Application
To run the application locally, follow these steps:

Install MongoDB locally or use a MongoDB cloud service like MongoDB Atlas.

Set up the database by creating a .env file with the correct PORT and MONGO_URL.

Run the server:

bash
Copy code
npm start
This will start the application on the specified port (default 8000). Once the server is running, you can use tools like Postman to test the API endpoints.
