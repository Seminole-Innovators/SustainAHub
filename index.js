// server.js
require('dotenv').config();  // Load environment variables from .env
const express = require('express');
const axios = require('axios');
const app = express();
const { JSDOM } = require('jsdom');
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
// Hopefully scaping 

/**
 * Scrapes the webpage and returns an array of text content from elements with the given class.
 * @param {string} url - The URL of the page to scrape.
 * @param {string} className - The class name to search for.
 * @returns {Promise<Array<string>>} - A promise that resolves to an array of text content.(, link, time, location)
 */
async function scrapePage(url, title, linkParent, date, county) {
  const { JSDOM } = require('jsdom');
  const axios = require('axios');
  try {
    // Fetch the HTML content of the page using axios
    const response = await axios.get(url);

    // Create a JSDOM instance from the HTML content
    const dom = new JSDOM(response.data);

    // Normalize URL !!!! This may need tweaking in the future
    const parsedUrl = new URL(url);
    const baseURL =  parsedUrl.origin;

    // Use DOM querying to get all elements with the specific class name
    const titles = dom.window.document.querySelectorAll(`.${title}`);
    const anchors = dom.window.document.querySelectorAll(`.${linkParent} a`);
    const dates  = dom.window.document.querySelectorAll(`.${date}`);
    const counties  = dom.window.document.querySelectorAll(`.${county}`);
    const elementsList = [];

    // Iterate over the elements and log them (or handle them as needed)

    for (let i = 0; i < titles.length; i++) {
      elementsList.push({
        "title": titles[i].innerHTML.trim(),
        "link": `${baseURL}${anchors[i].href}`, 
        "date": dates[i].innerHTML.trim(),
        "county": counties[i].innerHTML.trim()
      });
    }
    console.log(elementsList);
    return elementsList;
  } catch (error) {
    console.error('Error scraping the website:', error);
  }

}

// Route to fetch basic events

app.get('/fetchEvents', async (req, res) => {

  try {
    // Scrape the page for the given class
    const events = await scrapePage('https://floridadep.gov/events-list/month?field_county_tid=36&field_is_a_public_notice_value=All', 'views-field-title', 'field-content', 'views-field-field-events-date', 'views-field-field-county');
    
    // Send the extracted text data as a response
    res.json({ events });
  } catch (error) {
    res.status(500).json({ error: 'Failed to scrape the page.' });
  }
});

// scrapePage('https://floridadep.gov/events-list/month?field_county_tid=36&field_is_a_public_notice_value=All', 'views-field-title', 'field-content', 'views-field-field-events-date', 'views-field-field-county');

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
