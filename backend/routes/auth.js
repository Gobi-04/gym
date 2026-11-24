const express = require('express');
const router = express.Router();
const db = require('../config/db');

// POST: Sign Up (Register + Optional Plan Payment)
router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, password, plan, amount, paymentMethod } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({ error: 'Name, email, phone, and password are required.' });
    }

    const cleanName = typeof name === "string" ? name.trim() : "";

    if (!cleanName || /\p{Nd}/u.test(cleanName)) {
      return res.status(400).json({
        error: "Enter a full name without digits.",
  });
}

    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phone.trim();

    // Check if email or phone already exists
    const [existing] = await db.query(
      'SELECT id FROM users WHERE email = ? OR phone = ? LIMIT 1',
      [cleanEmail, cleanPhone]
    );

    if (existing.length > 0) {
      return res.status(409).json({ error: 'This email or phone number is already registered.' });
    }

    // Insert user
    const [userResult] = await db.query(
      'INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)',
      [name.trim(), cleanEmail, cleanPhone, password]
    );

    const userId = userResult.insertId;

    // If plan is provided, insert membership and payment record
    if (plan) {
      const startDate = new Date();
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + 1); // Default 1 month

      await db.query(
        'INSERT INTO memberships (user_id, plan_name, start_date, end_date, status) VALUES (?, ?, ?, ?, ?)',
        [userId, plan, startDate, endDate, 'active']
      );

      await db.query(
        'INSERT INTO payments (user_id, plan_name, amount, payment_method, status) VALUES (?, ?, ?, ?, ?)',
        [userId, plan, amount || 1499.00, paymentMethod || 'UPI', 'success']
      );
    }

    // Initialize fitness profile
    await db.query(
      'INSERT IGNORE INTO fitness_profiles (user_id, goal, diet) VALUES (?, ?, ?)',
      [userId, 'muscle-building', '']
    );

    return res.status(201).json({
      message: 'User registered successfully!',
      user: {
        id: userId,
        name: name.trim(),
        email: cleanEmail,
        phone: cleanPhone,
        plan: plan || null
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ error: 'Database error occurred during registration.' });
  }
});

// POST: Login
router.post('/login', async (req, res) => {
  try {
    const { login, password } = req.body;

    if (!login || !password) {
      return res.status(400).json({ error: 'Email/Phone and password are required.' });
    }

    const cleanLogin = login.trim().toLowerCase();

    // Find user by email or phone
    const [users] = await db.query(
      'SELECT id, name, email, phone, password, role FROM users WHERE email = ? OR phone = ? LIMIT 1',
      [cleanLogin, cleanLogin]
    );

    if (users.length === 0) {
      return res.status(404).json({ error: 'No account found with this email or mobile number.' });
    }

    const user = users[0];

    // Check password
    if (user.password !== password) {
      return res.status(401).json({ error: 'Incorrect password. Please try again.' });
    }

    // Get latest active membership
    const [memberships] = await db.query(
      'SELECT plan_name, status, start_date, end_date FROM memberships WHERE user_id = ? ORDER BY id DESC LIMIT 1',
      [user.id]
    );

    // Get fitness profile
    const [profiles] = await db.query(
      'SELECT goal, diet FROM fitness_profiles WHERE user_id = ? LIMIT 1',
      [user.id]
    );

    return res.json({
      message: 'Login successful!',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        plan: memberships.length > 0 ? memberships[0].plan_name : null,
        membership: memberships[0] || null,
        fitnessProfile: profiles[0] || null
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Database error occurred during login.' });
  }
});

// GET: Current user details
router.get('/user/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const [users] = await db.query(
      'SELECT id, name, email, phone, role, created_at FROM users WHERE id = ?',
      [userId]
    );

    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = users[0];
    const [memberships] = await db.query('SELECT * FROM memberships WHERE user_id = ? ORDER BY id DESC', [userId]);
    const [payments] = await db.query('SELECT * FROM payments WHERE user_id = ? ORDER BY id DESC', [userId]);
    const [profile] = await db.query('SELECT * FROM fitness_profiles WHERE user_id = ? LIMIT 1', [userId]);

    return res.json({
      ...user,
      memberships,
      payments,
      fitnessProfile: profile[0] || null
    });
  } catch (error) {
    console.error('Fetch user error:', error);
    return res.status(500).json({ error: 'Database error fetching user details.' });
  }
});

module.exports = router;
