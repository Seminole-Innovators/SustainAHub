// routes/airQuality.js
const express = require('express');
const { getAirQuality } = require('../services/airQualityService');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { lat, lon } = req.body;

    if (!lat || !lon) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const data = await getAirQuality(lat, lon);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
