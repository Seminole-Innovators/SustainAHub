// server.js
require('dotenv').config();  // Load environment variables from .env
const express = require('express');
const axios = require('axios');
const app = express();
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Middleware to parse JSON requests
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// route to handle frontend requests
app.post('/airquality', async (req, res) => {
    try {
        const { lat, lon } = req.body;

        if (!lat || !lon) {
            return res.status(400).json({ error: 'Missing required parameters' });
        }

        // Make the API request using Axios, cool library to help make api calls
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

/*
 ==========================

 Construction zone! 

 
 Proceed with Caution 

 ==========================
*/

// Get data from supabase hopefully 
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// route to handle frontend requests
app.get('/fetchLocations', async (req, res) => {
    try {
      // Query data from Supabase (replace with your table and fields)
      const { data, error } = await supabase
        .from('locations')  
        .select('*'); 
  
      if (error) {
        return res.status(500).json({ error: error.message });
      }
  
      // Send the data as JSON to the client
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get('/fetchParks', async (req, res) => {
    try {
      // Query data from Supabase (replace with your table and fields)
      const { data, error } = await supabase
        .from('parks')  
        .select('*'); 
  
      if (error) {
        return res.status(500).json({ error: error.message });
      }
  
      // Send the data as JSON to the client
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
/*
 ==========================
 
 End construction zone! 

 ==========================
*/

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});