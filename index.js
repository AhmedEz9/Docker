// index.js
const express = require('express');
const app = express();
const port = 3000;

// Root route
app.get('/', (req, res) => {
  res.send('Hello, World! This is my app for Docker task.');
});

// Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`App listening at http://localhost:${port}`);
});
