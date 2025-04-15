// services/airQualityService.js
const axios = require('axios');
const { API_BASE_URL, API_KEY_VALUE } = require('../config');

const getAirQuality = async (lat, lon) => {
  try {
    const response = await axios.get(API_BASE_URL, {
      params: {
        lat,
        lon,
        appid: API_KEY_VALUE, // Use the API key from environment variable
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('An error occurred while querying the API');
  }
};

module.exports = {
  getAirQuality
};
