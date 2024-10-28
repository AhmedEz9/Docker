# My Node.js Docker Project

This project demonstrates how to set up a basic Node.js application using Express and Docker.

## Steps I Followed

### Step 1: Setting Up the Node.js Project

1. Created a new directory for the project:
   ```bash
   mkdir my-node-app
   cd my-node-app
   ```
2. Initialized the Node.js project:
   ```bash
   npm init -y
   ```
3. Installed the Express library:
   ```bash
   npm install express
   ```
4. Created an `index.js` file with the following content:

   ```javascript
   const express = require("express");
   const app = express();
   const port = 3000;

   // Basic route for the homepage
   app.get("/", (req, res) => {
     res.send("Hello! This is your Node app.");
   });

   // Listen on all network interfaces
   app.listen(port, "0.0.0.0", () => {
     console.log(`App listening at http://localhost:${port}`);
   });
   ```

### Step 2: Dockerizing the Node.js App

1. Created a `Dockerfile` in the project folder with the following content:

   ```dockerfile
   # Use the official Node.js image
   FROM node:14

   # Set the working directory inside the container
   WORKDIR /app

   # Copy the package files and install dependencies
   COPY package*.json ./
   RUN npm install

   # Copy the rest of the project files
   COPY . .

   # Expose the port the app will run on
   EXPOSE 3000

   # Command to run the app
   CMD ["node", "index.js"]
   ```

2. Added a `.dockerignore` file to exclude unnecessary files:
   ```
   node_modules
   npm-debug.log
   ```

### Step 3: Using Docker Compose

1. Created a `docker-compose.yml` file to manage the Docker container:
   ```yaml
   version: "3"
   services:
     web:
       build: .
       ports:
         - "3000:3000"
       volumes:
         - .:/app
       command: npm start
   ```
2. This file allowed me to build and run the container with a single command.

### Step 4: Building and Running the App with Docker

1. Built the Docker image using Docker Compose:
   ```bash
   docker compose build
   ```
2. Ran the Docker container:
   ```bash
   docker compose up --watch
   ```
3. Accessed the app in a web browser at `http://localhost:3000`.

## Troubleshooting

- **Error: "Cannot GET /"**: I encountered this issue because there was no route set up for the root URL (`/`). I fixed it by adding:
  ```javascript
  app.get("/", (req, res) => {
    res.send("Hello, World....");
  });
  ```
- **Missing Start Script**: Initially, the `package.json` file was missing a start script. I added:
  ```json
  "scripts": {
    "start": "node index.js"
  }
  ```

## Useful Docker Commands I Used

- **Build the Docker image**:
  ```bash
  docker compose build
  ```
- **Run the Docker container**:
  ```bash
  docker compose up --watch
  ```
- **Stop Docker containers**:
  ```bash
  docker compose down
  ```
