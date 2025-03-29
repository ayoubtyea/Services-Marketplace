// backend/routes/profile.js
const express = require('express');
const User = require('../models/User');
const verifyToken = require('../middleware/auth'); // Import the JWT verification middleware

const router = express.Router();

// Protected route to get the user's profile
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId); // Get user data from the decoded token
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user profile', error: err.message });
  }
});

module.exports = router;
