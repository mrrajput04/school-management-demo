# School Management API

This repository contains a complete Node.js API implementation for managing school data, including adding new schools and retrieving schools sorted by proximity to a specified location.

## Features

- **Add School API**: Add new schools with name, address, latitude, and longitude
- **List Schools API**: Retrieve schools sorted by proximity to a user's location
- **Input Validation**: Comprehensive validation for all API inputs
- **Distance Calculation**: Uses the Haversine formula to calculate distances between coordinates

## Requirements

- Node.js (v14+)
- MySQL (v5.7+)

## Project Structure

```
school-management-api/
├── server.js       # Main application file
├── db.js           # Database connection
├── routes.js       # API routes
├── controllers.js  # Business logic
├── validators.js   # Input validation
├── utils.js        # Utility functions
├── package.json    # Dependencies and scripts
└── .env            # Environment variables (create from .env.example)
```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/school-management-api.git
   cd school-management-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a MySQL database:
   ```sql
   CREATE DATABASE school_management;
   ```

4. Configure environment variables:
   ```bash
   cp .env.example .env
   ```
   Edit the `.env` file with your MySQL credentials and other settings.

## Running the API

Start the development server:
```bash
npm run dev
```

For production:
```bash
npm start
```

The API will be available at `http://localhost:3000` (or your configured PORT).

## Deployment Options

### Option 1: Traditional Hosting

1. Set up a server with Node.js and MySQL installed
2. Clone the repository to your server
3. Install dependencies: `npm install --production`
4. Configure environment variables in `.env`
5. Start the application: `npm start`
6. Use a process manager like PM2 to keep the application running:
   ```bash
   npm install -g pm2
   pm2 start server.js --name "school-api"
   pm2 save
   pm2 startup
   ```

### Option 2: Docker Deployment

1. Create a `Dockerfile` in the project root:
   ```dockerfile
   FROM node:16-alpine

   WORKDIR /app

   COPY package*.json ./
   RUN npm install --production

   COPY . .

   EXPOSE 3000

   CMD ["node", "server.js"]
   ```

2. Create a `docker-compose.yml` file:
   ```yaml
   version: '3'
   services:
     app:
       build: .
       ports:
         - "3000:3000"
       environment:
         - NODE_ENV=production
         - PORT=3000
         - DB_HOST=db
         - DB_USER=root
         - DB_PASSWORD=password
         - DB_NAME=school_management
       depends_on:
         - db
     db:
       image: mysql:8.0
       environment:
         - MYSQL_ROOT_PASSWORD=password
         - MYSQL_DATABASE=school_management
       volumes:
         - db_data:/var/lib/mysql
   volumes:
     db_data:
   ```

3. Build and start the containers:
   ```bash
   docker-compose up -d
   ```

### Option 3: Cloud Platform Deployment

#### Heroku

1. Install Heroku CLI and log in
2. In your project directory:
   ```bash
   heroku create school-management-api
   heroku addons:create jawsdb:kitefin
   git push heroku main
   ```

3. Get the MySQL connection string:
   ```bash
   heroku config:get JAWSDB_URL
   ```

4. Set environment variables:
   ```bash
   heroku config:set NODE_ENV=production
   ```

#### AWS Elastic Beanstalk

1. Install AWS EB CLI and configure credentials
2. Initialize EB:
   ```bash
   eb init
   ```

3. Create the environment:
   ```bash
   eb create school-api-production
   ```

4. Configure RDS in the AWS Console or via EB CLI
5. Set environment variables through the EB Console

## API Documentation

### Add School

**Endpoint:** `POST /api/addSchool`

**Request Body:**
```json
{
  "name": "Main Street Elementary",
  "address": "123 Main St, Anytown, USA",
  "latitude": 37.7749,
  "longitude": -122.4194
}
```

**Successful Response (201 Created):**
```json
{
  "success": true,
  "message": "School added successfully",
  "data": {
    "id": 1,
    "name": "Main Street Elementary",
    "address": "123 Main St, Anytown, USA",
    "latitude": 37.7749,
    "longitude": -122.4194
  }
}
```

### List Schools

**Endpoint:** `GET /api/listSchools?latitude=37.7749&longitude=-122.4194`

**Query Parameters:**
- `latitude`: User's latitude (required)
- `longitude`: User's longitude (required)

**Successful Response (200 OK):**
```json
{
  "success": true,
  "message": "Schools retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "Main Street Elementary",
      "address": "123 Main St, Anytown, USA",
      "latitude": 37.7749,
      "longitude": -122.4194,
      "distance": 0
    },
    {
      "id": 2,
      "name": "Oak Avenue Middle School",
      "address": "456 Oak Ave, Anytown, USA",
      "latitude": 37.7848,
      "longitude": -122.4294,
      "distance": 1.2347
    }
  ]
}
```

## Testing with Postman

1. Import the included Postman collection (`School_Management_API.postman_collection.json`)
2. Set the `base_url` variable to your API endpoint (default: `http://localhost:3000`)
3. Execute the requests to test the API endpoints

## License

MIT