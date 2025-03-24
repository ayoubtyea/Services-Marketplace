const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


const router = express.Router();

// POST route for signing up a new user
router.post('/signup', async (req, res) => {
  const { fullName, email, phoneNumber, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    await newUser.save();

    // Create a JWT token
    const token = jwt.sign({ userId: newUser._id }, 'your_jwt_secret', {
      expiresIn: '1h',
    });

    // Respond with the token and user data
    res.status(201).json({ token, user: newUser });
  } catch (err) {
    console.error("Error signing up user:", err);
    res.status(500).json({ message: 'Error signing up user', error: err.message });
  }
});

module.exports = router;
