// app.js
require('dotenv').config();
const express = require('express');
const path = require('path');
const limiter = require('./utils/rateLimiter');
const airQualityRoute = require('./routes/airQuality');
const fetchLocationsRoute = require('./routes/fetchLocations');
const fetchParksRoute = require('./routes/fetchParks');

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Apply rate limiting to specific routes
app.use('/airquality', limiter);
app.use('/fetchLocations', limiter);
app.use('/fetchParks', limiter);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Use routes
app.use('/airquality', airQualityRoute);
app.use('/fetchLocations', fetchLocationsRoute);
app.use('/fetchParks', fetchParksRoute);

// Start the server
const { PORT } = require('./config');
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
