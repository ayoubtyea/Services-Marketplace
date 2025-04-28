const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { protect } = require('../middleware/auth');
const checkRole = require('../middleware/roleCheck');

// Protect all routes - only admins can access these routes
router.use(protect);
router.use(checkRole(['admin']));

// Provider management routes
router.get('/providers', adminController.getAllProviders);
router.get('/providers/:id', adminController.getProviderDetails);
router.patch('/providers/:id/status', adminController.updateProviderStatus);

// Client management routes
router.get('/clients', adminController.getAllClients);

// Booking management routes
router.get('/bookings', adminController.getAllBookings);

module.exports = router;