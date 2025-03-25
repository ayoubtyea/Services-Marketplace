// routes/adminRoutes.js
const express = require('express');
const { checkRole } = require('../middleware/roleCheck');
const router = express.Router();

router.get('/dashboard', checkRole(['admin']), (req, res) => {
  // Admin-only content
});