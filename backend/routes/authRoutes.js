const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/auth');
const authController = require('../controllers/auth');


router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password/:token', authController.resetPassword);

module.exports = router;