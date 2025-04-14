// use tomtom 
const axios = require('axios');
require('dotenv').config();
const geocode = async (address) => {
    try {
        const response = await axios.get(`https://api.tomtom.com/search/2/geocode/${encodeURIComponent(address)}.json`, {
            params: {
                key: process.env.TOMTOM_KEY_VALUE
            }
        });

        return response.data.results[0].position; 
    } catch (error) {
        console.error('Error fetching coordinates:', error.response?.data || error.message);
        throw error;
    }
}

module.exports = {
    geocode
}