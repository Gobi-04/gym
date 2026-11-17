const express = require('express');
const router = express.Router();
const db = require('../config/db');

// POST: Save contact inquiry to database
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    const [result] = await db.query(
      'INSERT INTO contact_inquiries (name, email, phone, message) VALUES (?, ?, ?, ?)',
      [name.trim(), email.trim(), phone ? phone.trim() : '', message.trim()]
    );

    return res.status(201).json({
      message: 'Contact inquiry saved successfully!',
      inquiryId: result.insertId
    });
  } catch (error) {
    console.error('Contact inquiry error:', error);
    return res.status(500).json({ error: 'Failed to save contact inquiry to database.' });
  }
});

// GET: All contact inquiries (for admin/monitoring)
router.get('/', async (req, res) => {
  try {
    const [inquiries] = await db.query('SELECT * FROM contact_inquiries ORDER BY created_at DESC');
    return res.json(inquiries);
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    return res.status(500).json({ error: 'Failed to fetch contact inquiries.' });
  }
});

module.exports = router;
