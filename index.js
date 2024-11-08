// server.js
require('dotenv').config();  // Load environment variables from .env
const express = require('express');
const axios = require('axios');
const app = express();
const path = require('path');

// Middleware to parse JSON requests
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Example route to handle frontend requests
app.post('/api', async (req, res) => {
    try {
        const { lat, lon } = req.body;

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

        res.json(response.data);  // Send API response to the frontend
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while querying the API' });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
