const express = require('express');
const router = express.Router();
const db = require('../config/db');

// POST or PUT: Update fitness onboarding data (goal, diet)
router.post('/onboarding', async (req, res) => {
  try {
    const { userId, goal, diet } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required.' });
    }

    await db.query(
      `INSERT INTO fitness_profiles (user_id, goal, diet)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE goal = VALUES(goal), diet = VALUES(diet)`,
      [userId, goal || 'muscle-building', diet || '']
    );

    return res.json({ message: 'Fitness profile updated successfully!' });
  } catch (error) {
    console.error('Fitness onboarding error:', error);
    return res.status(500).json({ error: 'Failed to update fitness profile.' });
  }
});

// GET: Fitness profile by user ID
router.get('/:userId', async (req, res) => {
  try {
    const [profiles] = await db.query(
      'SELECT * FROM fitness_profiles WHERE user_id = ? LIMIT 1',
      [req.params.userId]
    );

    if (profiles.length === 0) {
      return res.json({ goal: 'muscle-building', diet: '' });
    }

    return res.json(profiles[0]);
  } catch (error) {
    console.error('Error fetching profile:', error);
    return res.status(500).json({ error: 'Failed to fetch fitness profile.' });
  }
});

module.exports = router;
