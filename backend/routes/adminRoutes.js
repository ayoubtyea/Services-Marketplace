// routes/adminRoutes.js
const express = require('express');
const { checkRole } = require('../middleware/roleCheck');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');


router.get('/dashboard', protect, admin, (req, res) => {
  res.json({ message: 'Admin dashboard data' });
});