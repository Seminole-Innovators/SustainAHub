// routes/airQuality.js

const express = require('express');
const router = express.Router();
const { getAirQuality } = require('../controllers/airQualityController');

// Define the POST route for airquality
router.post('/', getAirQuality);

module.exports = router;
