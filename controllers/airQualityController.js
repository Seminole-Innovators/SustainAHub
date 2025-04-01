// controllers/airQualityController.js

const axios = require('axios');

async function getAirQuality(req, res) {
    try {
        const { lat, lon } = req.body;

        // Check if lat and lon are provided
        if (!lat || !lon) {
            return res.status(400).json({ error: 'Missing required parameters' });
        }

        // Make the API request using Axios
        const response = await axios.get(`${process.env.API_BASE_URL}`, {
            params: {
                lat,
                lon,
                appid: process.env.API_KEY_VALUE // Use the API key from environment variable
            }
        });

        // Send the API response to the frontend
        res.json(response.data);

    } catch (error) {
        console.error('Error:', error);

        // Handle different types of errors
        if (error.response) {
            // Server responded with a status code outside the 2xx range
            res.status(error.response.status).json({ error: error.response.data });
        } else if (error.request) {
            // No response was received
            res.status(500).json({ error: 'No response received from API' });
        } else {
            // Other errors like invalid config or Axios internal issues
            res.status(500).json({ error: 'An error occurred while querying the API' });
        }
    }
}

module.exports = { getAirQuality };
