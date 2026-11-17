const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const authRoutes = require('./routes/auth');
const contactRoutes = require('./routes/contact');
const fitnessRoutes = require('./routes/fitness');
const plansRoutes = require('./routes/plans');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/fitness', fitnessRoutes);
app.use('/api/plans', plansRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Gym API backend is running!' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(`🏋️  Gym Backend Server running on port ${PORT}`);
  console.log(`🔗 API Base URL: http://localhost:${PORT}/api`);
  console.log(`=========================================`);
});
