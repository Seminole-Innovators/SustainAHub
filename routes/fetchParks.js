// routes/fetchParks.js
const express = require('express');
const supabase = require('../supabaseClient');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('parks')
      .select('*');

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({ error: error.message });
    }

    res.json(data);
  } catch (err) {
    console.error("Unhandled error in fetchParks:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
