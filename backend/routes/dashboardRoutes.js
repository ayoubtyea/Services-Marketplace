const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { protect } = require('../middleware/auth');
const checkRole = require('../middleware/roleCheck');

// Protect all dashboard routes
router.use(protect);

// Get dashboard data for the logged-in user (any role)
router.get('/', dashboardController.getDashboardData);

// Role-specific routes if needed
router.get('/admin', checkRole(['admin']), (req, res) => {
  // Redirect to the main dashboard endpoint for now
  dashboardController.getDashboardData(req, res);
});

router.get('/provider', checkRole(['provider']), (req, res) => {
  // Redirect to the main dashboard endpoint for now
  dashboardController.getDashboardData(req, res);
});

router.get('/client', checkRole(['client']), (req, res) => {
  // Redirect to the main dashboard endpoint for now
  dashboardController.getDashboardData(req, res);
});

module.exports = router;