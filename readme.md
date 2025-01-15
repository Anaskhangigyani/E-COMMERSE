# Shopper Management System

This project consists of a **Shopper Management API** backend and a **React frontend** for managing shoppers in an e-commerce system. The system allows you to manage shopper data, including adding new shoppers, updating shopper details, purchasing a shopper, returning a shopper, and more.

## Features

### Backend (Node.js)

- **Shopper Management**
  - Add a new shopper with details such as name, price, and suits.
  - View available shoppers.
  - Purchase shoppers (move them to the sold collection).
  - Return sold shoppers back to the available list.
  - Update shopper details like name and price.
  - Remove shoppers permanently.

### Frontend (React)

- **Shopper Management Interface** for adding, viewing, and updating shoppers.
- **Purchase/Return** shoppers with functionality to move them between available and sold statuses.
- **Delete Shopper** functionality to remove a shopper from the system.

## Setup

### Prerequisites

- Node.js and npm installed.
- MongoDB installed and running locally or using a cloud MongoDB service like MongoDB Atlas.
- React and related tools installed for the frontend.

### Backend Setup

1. Clone the backend repository:

   ```bash
   git clone <repository_url>
   cd <repository_folder>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory of the project and add the following values:

   ```env
   PORT=8000
   MONGO_URL=mongodb://127.0.0.1/my_database
   ```

   - **PORT**: The port on which the backend will run (default is 8000).
   - **MONGO_URL**: The connection string for your MongoDB database.

4. Start the server:

   ```bash
   npm start
   ```

   The backend will run on port `8000` by default.

### Frontend Setup

1. Clone the frontend repository (React app):

   ```bash
   git clone <frontend_repository_url>
   cd <frontend_folder>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root of the frontend project and add the following:

   ```env
   REACT_APP_API_URL=http://localhost:8000/api
   ```

   This points the frontend to the backend API URL.

4. Start the React development server:

   ```bash
   npm start
   ```

   The React app will run on `http://localhost:3000`.

## API Endpoints

### Shopper Management Endpoints

#### 1. **Add Shopper**

- **URL**: `/api/shopper`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "shopperNo": "12345",
    "shopperName": "John Doe",
    "shopperPrice": 100.0,
    "suits": ["Suit 1", "Suit 2"]
  }
  ```

#### 2. **Read Available Shoppers**

- **URL**: `/api/shopper`
- **Method**: `GET`
- **Response**:
  ```json
  {
    "shoppers": [
      {
        "shopperNo": "12345",
        "shopperName": "John Doe",
        "shopperPrice": 100.0,
        "suits": ["Suit 1", "Suit 2"]
      },
      {
        "shopperNo": "12346",
        "shopperName": "Jane Smith",
        "shopperPrice": 120.0,
        "suits": ["Suit A", "Suit B"]
      }
    ],
    "success": true
  }
  ```

#### 3. **Purchase Shopper**

- **URL**: `/api/shopper/purchase/:shopperNo`
- **Method**: `POST`
- **Response**:
  ```json
  {
    "message": "Shopper moved to sold collection and deleted successfully.",
    "success": true
  }
  ```

#### 4. **Read Sold Shoppers**

- **URL**: `/api/sold`
- **Method**: `GET`
- **Response**:
  ```json
  {
    "shoppers": [
      {
        "shopperNo": "67890",
        "shopperName": "Mike Johnson",
        "shopperPrice": 150.0,
        "suits": ["Suit X", "Suit Y"]
      }
    ],
    "success": true
  }
  ```

#### 5. **Return Shopper**

- **URL**: `/api/shopper/return/:shopperNo`
- **Method**: `POST`
- **Response**:
  ```json
  {
    "message": "Shopper successfully returned to the shopper list.",
    "success": true
  }
  ```

#### 6. **Remove Shopper**

- **URL**: `/api/shopper/:shopperNo`
- **Method**: `DELETE`
- **Response**:
  ```json
  {
    "message": "Shopper removed successfully.",
    "success": true
  }
  ```

#### 7. **Update Shopper**

- **URL**: `/api/shopper/:shopperNo`
- **Method**: `PUT`
- **Body**:

  ```json
  {
    "shopperName": "Updated Name",
    "shopperPrice": 150.0
  }
  ```

- **Response**:
  ```json
  {
    "message": "Shopper updated successfully.",
    "success": true,
    "data": { ... }
  }
  ```

#### 8. **Read One Available Shopper**

- **URL**: `/api/shopper/:shopperNo`
- **Method**: `GET`
- **Response**:
  ```json
  {
    "message": "Shopper retrieved successfully.",
    "success": true,
    "data": { ... }
  }
  ```

#### 9. **Read One Sold Shopper**

- **URL**: `/api/sold/:shopperNo`
- **Method**: `GET`
- **Response**:
  ```json
  {
    "message": "Shopper retrieved successfully.",
    "success": true,
    "data": { ... }
  }
  ```

## Running the Application

### Backend:

1. Follow the **Backend Setup** section to get the backend running.
2. Test the API using Postman or your preferred API testing tool.

### Frontend:

1. Follow the **Frontend Setup** section to get the React application running.
2. Access the React app at `http://localhost:3000` in your browser.
