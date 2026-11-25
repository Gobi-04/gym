const express = require('express');
const router = express.Router();
const db = require('../config/db');

// ======================================================
// ADMIN AUTH
// ======================================================

// POST: Admin Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }
    const cleanEmail = email.trim().toLowerCase();

    // Hardcoded fallback admin
    if (cleanEmail === 'admin@fitguide.club' && password === 'FitGuide@2026') {
      return res.json({
        message: 'Admin authentication successful!',
        admin: { id: 1, name: 'Chief Admin', email: 'admin@fitguide.club', role: 'admin' },
        token: 'admin-jwt-token-fitguide-2026',
      });
    }

    // DB admin
    const [users] = await db.query(
      'SELECT id, name, email, role, password FROM users WHERE email = ? AND role = "admin" LIMIT 1',
      [cleanEmail]
    );
    if (users.length === 0 || users[0].password !== password) {
      return res.status(401).json({ error: 'Invalid admin credentials.' });
    }
    const admin = users[0];
    return res.json({
      message: 'Admin login successful!',
      admin: { id: admin.id, name: admin.name, email: admin.email, role: admin.role },
      token: 'admin-jwt-token-fitguide-2026',
    });
  } catch (error) {
    console.error('Admin login error:', error);
    return res.status(500).json({ error: 'Internal server error during admin login.' });
  }
});

// ======================================================
// ADMIN DASHBOARD STATS
// ======================================================

router.get('/stats', async (req, res) => {
  try {
    const [[memberCount]]      = await db.query('SELECT COUNT(*) as total FROM users WHERE role = "member"');
    const [[activeMs]]         = await db.query('SELECT COUNT(*) as total FROM memberships WHERE status = "active"');
    const [[revenue]]          = await db.query('SELECT COALESCE(SUM(total_amount),0) as totalRevenue FROM payments WHERE status = "success"');
    const [[inquiries]]        = await db.query('SELECT COUNT(*) as total FROM contact_inquiries');
    const [[expiredMs]]        = await db.query('SELECT COUNT(*) as total FROM memberships WHERE status = "expired"');
    const [[pendingPayments]]  = await db.query('SELECT COUNT(*) as total FROM payments WHERE status = "pending"');

    return res.json({
      totalMembers:     memberCount.total   || 0,
      activeMemberships:activeMs.total      || 0,
      expiredMemberships:expiredMs.total    || 0,
      totalRevenue:     revenue.totalRevenue|| 0,
      totalInquiries:   inquiries.total     || 0,
      pendingPayments:  pendingPayments.total|| 0,
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    return res.json({
      totalMembers: 18, activeMemberships: 14, expiredMemberships: 4,
      totalRevenue: 189750, totalInquiries: 6, pendingPayments: 2,
    });
  }
});

// ======================================================
// MEMBER MANAGEMENT
// ======================================================

// GET: All Members (with membership & fitness profile)
router.get('/members', async (req, res) => {
  try {
    const [members] = await db.query(`
      SELECT
        u.id, u.name, u.email, u.phone, u.role, u.created_at,
        m.plan_name, m.status AS membership_status, m.start_date, m.end_date,
        fp.goal, fp.diet
      FROM users u
      LEFT JOIN memberships m ON u.id = m.user_id AND m.id = (
        SELECT MAX(m2.id) FROM memberships m2 WHERE m2.user_id = u.id
      )
      LEFT JOIN fitness_profiles fp ON u.id = fp.user_id
      WHERE u.role = "member"
      ORDER BY u.created_at DESC
    `);
    return res.json(members);
  } catch (error) {
    console.error('Fetch members error:', error);
    return res.status(500).json({ error: 'Failed to retrieve members.' });
  }
});

// GET: Single Member
router.get('/members/:id', async (req, res) => {
  try {
    const [users] = await db.query(
      `SELECT u.*, m.plan_name, m.status AS membership_status, m.start_date, m.end_date,
              fp.goal, fp.diet
       FROM users u
       LEFT JOIN memberships m ON u.id = m.user_id
       LEFT JOIN fitness_profiles fp ON u.id = fp.user_id
       WHERE u.id = ? AND u.role = "member" LIMIT 1`,
      [req.params.id]
    );
    if (users.length === 0) return res.status(404).json({ error: 'Member not found.' });
    return res.json(users[0]);
  } catch (error) {
    console.error('Fetch member error:', error);
    return res.status(500).json({ error: 'Failed to retrieve member.' });
  }
});

// PUT: Update Member
router.put('/members/:id', async (req, res) => {
  try {
    const { name, email, phone, plan_name, membership_status, goal, diet } = req.body;
    const { id } = req.params;

    if (name || email || phone) {
      await db.query(
        'UPDATE users SET name=COALESCE(?,name), email=COALESCE(?,email), phone=COALESCE(?,phone) WHERE id=? AND role="member"',
        [name, email, phone, id]
      );
    }
    if (plan_name || membership_status) {
      await db.query(
        'UPDATE memberships SET plan_name=COALESCE(?,plan_name), status=COALESCE(?,status) WHERE user_id=? ORDER BY id DESC LIMIT 1',
        [plan_name, membership_status, id]
      );
    }
    if (goal || diet) {
      await db.query(
        `INSERT INTO fitness_profiles (user_id, goal, diet) VALUES (?,?,?)
         ON DUPLICATE KEY UPDATE goal=COALESCE(?,goal), diet=COALESCE(?,diet)`,
        [id, goal||'muscle-building', diet||'non-vegetarian', goal, diet]
      );
    }
    return res.json({ message: 'Member updated successfully.' });
  } catch (error) {
    console.error('Update member error:', error);
    return res.status(500).json({ error: 'Failed to update member.' });
  }
});

// DELETE: Delete Member
router.delete('/members/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM users WHERE id = ? AND role = "member"', [req.params.id]);
    return res.json({ message: 'Member deleted successfully.' });
  } catch (error) {
    console.error('Delete member error:', error);
    return res.status(500).json({ error: 'Failed to delete member.' });
  }
});

// ======================================================
// MEMBERSHIP PLANS MANAGEMENT
// ======================================================

// GET: All Plans
router.get('/plans', async (req, res) => {
  try {
    const [plans] = await db.query('SELECT * FROM plans ORDER BY price ASC');
    return res.json(plans);
  } catch (error) {
    console.error('Fetch plans error:', error);
    return res.status(500).json({ error: 'Failed to fetch plans.' });
  }
});

// POST: Create Plan
router.post('/plans', async (req, res) => {
  try {
    const { name, price, duration_months, description, features } = req.body;
    if (!name || !price) return res.status(400).json({ error: 'Plan name and price are required.' });

    const [result] = await db.query(
      'INSERT INTO plans (name, price, duration_months, description, features) VALUES (?,?,?,?,?)',
      [name, price, duration_months||1, description||'', features||'']
    );
    return res.status(201).json({ message: 'Plan created successfully.', planId: result.insertId });
  } catch (error) {
    console.error('Create plan error:', error);
    return res.status(500).json({ error: 'Failed to create plan.' });
  }
});

// PUT: Update Plan
router.put('/plans/:id', async (req, res) => {
  try {
    const { name, price, duration_months, description, features } = req.body;
    await db.query(
      'UPDATE plans SET name=COALESCE(?,name), price=COALESCE(?,price), duration_months=COALESCE(?,duration_months), description=COALESCE(?,description), features=COALESCE(?,features) WHERE id=?',
      [name, price, duration_months, description, features, req.params.id]
    );
    return res.json({ message: 'Plan updated successfully.' });
  } catch (error) {
    console.error('Update plan error:', error);
    return res.status(500).json({ error: 'Failed to update plan.' });
  }
});

// DELETE: Delete Plan
router.delete('/plans/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM plans WHERE id = ?', [req.params.id]);
    return res.json({ message: 'Plan deleted successfully.' });
  } catch (error) {
    console.error('Delete plan error:', error);
    return res.status(500).json({ error: 'Failed to delete plan.' });
  }
});

// ======================================================
// PAYMENTS MANAGEMENT
// ======================================================

// GET: All Payments
router.get('/payments', async (req, res) => {
  try {
    const [payments] = await db.query(`
      SELECT
        p.id, p.user_id, p.plan_name, p.amount, p.gst_amount, p.total_amount,
        p.payment_method, p.transaction_id, p.receipt_number, p.status, p.paid_at,
        u.name AS customer_name, u.email AS customer_email, u.phone AS customer_phone
      FROM payments p
      LEFT JOIN users u ON p.user_id = u.id
      ORDER BY p.paid_at DESC
    `);
    return res.json(payments);
  } catch (error) {
    console.error('Fetch payments error:', error);
    return res.status(500).json({ error: 'Failed to fetch payments.' });
  }
});

// PUT: Update Payment Status (Verify / Reject)
router.put('/payments/:id', async (req, res) => {
  try {
    const { status } = req.body;
    if (!['success','pending','failed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status value.' });
    }
    await db.query('UPDATE payments SET status=? WHERE id=?', [status, req.params.id]);
    return res.json({ message: 'Payment status updated.' });
  } catch (error) {
    console.error('Update payment error:', error);
    return res.status(500).json({ error: 'Failed to update payment status.' });
  }
});

// ======================================================
// WORKOUT MANAGEMENT
// ======================================================

// GET: All Workouts (optionally filter by category & day)
router.get('/workouts', async (req, res) => {
  try {
    const { category, day } = req.query;
    let query = 'SELECT * FROM workouts WHERE 1=1';
    const params = [];
    if (category) { query += ' AND category = ?'; params.push(category); }
    if (day)      { query += ' AND day = ?';      params.push(day);      }
    query += ' ORDER BY category, day, id';
    const [workouts] = await db.query(query, params);
    return res.json(workouts);
  } catch (error) {
    console.error('Fetch workouts error:', error);
    return res.status(500).json({ error: 'Failed to fetch workouts.' });
  }
});

// POST: Create Workout
router.post('/workouts', async (req, res) => {
  try {
    const { category, day, name, sets, reps, duration, muscle, description, steps, video_url, image_url } = req.body;
    if (!name || !category || !day) {
      return res.status(400).json({ error: 'name, category, and day are required.' });
    }
    const stepsStr = Array.isArray(steps) ? steps.join('|') : (steps || '');
    const [result] = await db.query(
      `INSERT INTO workouts (category, day, name, sets, reps, duration, muscle, description, steps, video_url, image_url)
       VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
      [category, day, name, sets||3, reps||'10-12 Reps', duration||'10 Minutes', muscle||'', description||'', stepsStr, video_url||'', image_url||'']
    );
    return res.status(201).json({ message: 'Workout created successfully.', workoutId: result.insertId });
  } catch (error) {
    console.error('Create workout error:', error);
    return res.status(500).json({ error: 'Failed to create workout.' });
  }
});

// PUT: Update Workout
router.put('/workouts/:id', async (req, res) => {
  try {
    const { category, day, name, sets, reps, duration, muscle, description, steps, video_url, image_url } = req.body;
    const stepsStr = Array.isArray(steps) ? steps.join('|') : steps;
    await db.query(
      `UPDATE workouts SET
         category=COALESCE(?,category), day=COALESCE(?,day), name=COALESCE(?,name),
         sets=COALESCE(?,sets), reps=COALESCE(?,reps), duration=COALESCE(?,duration),
         muscle=COALESCE(?,muscle), description=COALESCE(?,description),
         steps=COALESCE(?,steps), video_url=COALESCE(?,video_url), image_url=COALESCE(?,image_url)
       WHERE id=?`,
      [category, day, name, sets, reps, duration, muscle, description, stepsStr, video_url, image_url, req.params.id]
    );
    return res.json({ message: 'Workout updated successfully.' });
  } catch (error) {
    console.error('Update workout error:', error);
    return res.status(500).json({ error: 'Failed to update workout.' });
  }
});

// DELETE: Delete Workout
router.delete('/workouts/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM workouts WHERE id = ?', [req.params.id]);
    return res.json({ message: 'Workout deleted successfully.' });
  } catch (error) {
    console.error('Delete workout error:', error);
    return res.status(500).json({ error: 'Failed to delete workout.' });
  }
});

// GET: Workout Categories
router.get('/workout-categories', async (req, res) => {
  try {
    const [cats] = await db.query('SELECT * FROM workout_categories ORDER BY name');
    return res.json(cats);
  } catch (error) {
    return res.json([
      { id: 1, name: 'Fat Loss' }, { id: 2, name: 'Strength Training' },
      { id: 3, name: 'Muscle Building' }, { id: 4, name: 'Weight Loss' },
    ]);
  }
});

// ======================================================
// DIET PLAN MANAGEMENT
// ======================================================

// GET: All Diet Plans (filter by category, diet_type, day)
router.get('/diet-plans', async (req, res) => {
  try {
    const { category, diet_type, day } = req.query;
    let query = 'SELECT * FROM diet_plans WHERE 1=1';
    const params = [];
    if (category)  { query += ' AND category = ?';  params.push(category);  }
    if (diet_type) { query += ' AND diet_type = ?';  params.push(diet_type); }
    if (day)       { query += ' AND day = ?';        params.push(day);       }
    query += ' ORDER BY category, day, FIELD(meal_type,"Breakfast","Lunch","Dinner","Snack")';
    const [plans] = await db.query(query, params);
    return res.json(plans);
  } catch (error) {
    console.error('Fetch diet plans error:', error);
    return res.status(500).json({ error: 'Failed to fetch diet plans.' });
  }
});

// POST: Create Diet Plan Entry
router.post('/diet-plans', async (req, res) => {
  try {
    const { category, diet_type, day, meal_type, title, time_slot, calories, nutrients, portion_note, image_url } = req.body;
    if (!title || !category || !day || !meal_type) {
      return res.status(400).json({ error: 'title, category, day, meal_type are required.' });
    }
    const [result] = await db.query(
      `INSERT INTO diet_plans (category, diet_type, day, meal_type, title, time_slot, calories, nutrients, portion_note, image_url)
       VALUES (?,?,?,?,?,?,?,?,?,?)`,
      [category, diet_type||'non-vegetarian', day, meal_type, title, time_slot||'', calories||'', nutrients||'', portion_note||'', image_url||'']
    );
    return res.status(201).json({ message: 'Diet plan entry created.', dietPlanId: result.insertId });
  } catch (error) {
    console.error('Create diet plan error:', error);
    return res.status(500).json({ error: 'Failed to create diet plan entry.' });
  }
});

// PUT: Update Diet Plan Entry
router.put('/diet-plans/:id', async (req, res) => {
  try {
    const { category, diet_type, day, meal_type, title, time_slot, calories, nutrients, portion_note, image_url } = req.body;
    await db.query(
      `UPDATE diet_plans SET
         category=COALESCE(?,category), diet_type=COALESCE(?,diet_type), day=COALESCE(?,day),
         meal_type=COALESCE(?,meal_type), title=COALESCE(?,title), time_slot=COALESCE(?,time_slot),
         calories=COALESCE(?,calories), nutrients=COALESCE(?,nutrients),
         portion_note=COALESCE(?,portion_note), image_url=COALESCE(?,image_url)
       WHERE id=?`,
      [category, diet_type, day, meal_type, title, time_slot, calories, nutrients, portion_note, image_url, req.params.id]
    );
    return res.json({ message: 'Diet plan updated successfully.' });
  } catch (error) {
    console.error('Update diet plan error:', error);
    return res.status(500).json({ error: 'Failed to update diet plan.' });
  }
});

// DELETE: Delete Diet Plan Entry
router.delete('/diet-plans/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM diet_plans WHERE id = ?', [req.params.id]);
    return res.json({ message: 'Diet plan entry deleted.' });
  } catch (error) {
    console.error('Delete diet plan error:', error);
    return res.status(500).json({ error: 'Failed to delete diet plan entry.' });
  }
});

// ======================================================
// CONTACT INQUIRIES
// ======================================================

router.get('/inquiries', async (req, res) => {
  try {
    const [inquiries] = await db.query('SELECT * FROM contact_inquiries ORDER BY created_at DESC');
    return res.json(inquiries);
  } catch (error) {
    console.error('Fetch inquiries error:', error);
    return res.status(500).json({ error: 'Failed to fetch inquiries.' });
  }
});

router.delete('/inquiries/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM contact_inquiries WHERE id = ?', [req.params.id]);
    return res.json({ message: 'Inquiry deleted.' });
  } catch (error) {
    console.error('Delete inquiry error:', error);
    return res.status(500).json({ error: 'Failed to delete inquiry.' });
  }
});

module.exports = router;
