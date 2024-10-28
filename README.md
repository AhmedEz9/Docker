# My Node.js Docker Project

This project shows how to create a basic Node.js app using Express and run it inside a Docker container. Below, I document each step I followed, the challenges I faced, and how I resolved them.

## Prerequisites

- Docker installed on my computer
- Basic knowledge of Node.js and Docker

## Steps I Followed

### Step 1: Setting Up the Node.js Project

1. I started by creating a new directory for my project:
   ```bash
   mkdir my-node-app
   cd my-node-app
   I initialized the Node.js project with:
   bash
   Copy code
   npm init -y
   This created a package.json file.
   Next, I installed the express package to set up a simple web server:
   bash
   Copy code
   npm install express
   I created a file named index.js with the following content:
   javascript
   Copy code
   const express = require('express');
   const app = express();
   const port = 3000;
   ```

// Basic route for the homepage
app.get('/', (req, res) => {
res.send('Hello, World! This is your Node app.');
});

// Listen on all network interfaces
app.listen(port, '0.0.0.0', () => {
console.log(`App listening at http://localhost:${port}`);
});
Step 2: Dockerizing the Node.js App
I created a Dockerfile in the project folder with the following content:
dockerfile
Copy code

# Use the official Node.js image

FROM node:14

# Set the working directory inside the container

WORKDIR /app

# Copy the package files and install dependencies

COPY package\*.json ./
RUN npm install

# Copy the rest of the project files

COPY . .

# Expose the port the app will run on

EXPOSE 3000

# Command to run the app

CMD ["node", "index.js"]
I also created a .dockerignore file to exclude unnecessary files:
lua
Copy code
node_modules
npm-debug.log
Step 3: Using Docker Compose
I set up a docker-compose.yml file to manage the Docker container:
yaml
Copy code
version: '3'
services:
web:
build: .
ports: - "3000:3000"
volumes: - .:/app
command: npm start
This file allowed me to build and run the container with just one command.
Step 4: Building and Running the App with Docker
First, I built the Docker image:
bash
Copy code
docker compose build
Then, I ran the container:
bash
Copy code
docker compose up --watch
After that, I was able to access the app at http://localhost:3000.
Troubleshooting
Error: "Cannot GET /": I got this error because my index.js file didn't have a route for the root URL (/). I fixed it by adding:
javascript
Copy code
app.get('/', (req, res) => {
res.send('Hello, World! This is your Node app.');
});
Missing Start Script: Initially, I forgot to add a start script in package.json. I fixed it by adding:
json
Copy code
"scripts": {
"start": "node index.js"
}
Useful Docker Commands I Used
Build the Docker image:
bash
Copy code
docker compose build
Run the Docker container:
bash
Copy code
docker compose up --watch
Stop Docker containers:
bash
Copy code
docker compose down
