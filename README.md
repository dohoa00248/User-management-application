# RESTful API Test Application

## Description

**RESTful API Test Application** is a sample application designed for testing RESTful APIs. It allows you to interact with various API endpoints, manage resources, and validate API responses. The application is set up with multiple configurations for database connections and environment settings.

## Features

- **API Endpoints:** A set of RESTful endpoints for managing resources.
- **Database Connections:** Supports both local and remote MongoDB connections.
- **Configuration Flexibility:** Allows configuration through environment variables.

## Installation

To set up and run the project locally, follow these steps:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yourusername/yourproject.git
   ```
2. **Navigate to the Project Directory:**
   cd yourproject
3. **Install Dependencies:**
   npm install
4. **Set Up Environment Variables: Create a .env file in the root directory based on the .env.example file provided. The .env file should contain the following variables:**

# Environment mode (development or production)

NODE_ENV=development

# Server configuration

PORT=3000
HOST_NAME=localhost

# Database configuration

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=test

# MongoDB configuration

DB_MONGODB_URL=mongodb+srv://admin:npfs7VrY9STafXLO@cluster0.7w5uepz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
DB_MONGODB_URL_HOST=mongodb://localhost:27017
DB_MONGODB_NAME=abc

5. **Run the Application: Use the following command to start the application in development mode:**
   npm run start

## Usage

Testing with Postman
Start the Application: Ensure that the server is running by using the npm run start command.

Open Postman: Launch Postman or any other API testing tool.
