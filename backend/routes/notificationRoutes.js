const express = require('express');
const notificationController = require('../controllers/notificationController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Protect all routes after this middleware
router.use(authMiddleware.protect);  // Changed from authController to authMiddleware

router.route('/')
  .get(notificationController.getAllNotifications);

router.route('/read/:id')
  .patch(notificationController.markAsRead);

router.route('/read-all')
  .patch(notificationController.markAllAsRead);

module.exports = router;