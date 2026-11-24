const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET: All membership plans
router.get('/', async (req, res) => {
  try {
    const [plans] = await db.query('SELECT * FROM plans ORDER BY price ASC');
    return res.json(plans);
  } catch (error) {
    console.error('Error fetching plans:', error);
    return res.status(500).json({ error: 'Failed to fetch membership plans.' });
  }
});

module.exports = router;
