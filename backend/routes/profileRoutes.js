const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const auth = require('../middleware/auth');

// Use the auth.protect middleware specifically
router.use(auth.protect);

router.route('/me')
 .get(profileController.getMe)
 .patch(profileController.updateMe)
 .delete(profileController.deleteMe);

module.exports = router;