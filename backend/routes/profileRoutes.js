const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware.protect);

router.route('/me')
  .get(profileController.getMe)
  .patch(profileController.updateMe)
  .delete(profileController.deleteMe);

module.exports = router;