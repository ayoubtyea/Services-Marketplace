const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const { validateLogin, validateClientSignup, validateProviderSignup } = require('../middleware/validation');

// POST /api/auth/client/signup
router.post('/client/signup', validateClientSignup, authController.clientSignup);

// POST /api/auth/login (for all users)
router.post('/login', validateLogin, authController.login);

// POST /api/auth/admin/signup (for admin)
router.post('/admin/signup', authController.adminSignup);

// Don't use the providerSignup route from auth controller
// Use the dedicated provider registration endpoint instead
router.post('/provider/register', (req, res) => {
  res.status(307).redirect('/api/provider/register');
});

// Instead of using a potentially undefined adminLogin function, 
// let's use the general login function which handles all user types
router.post('/admin/login', validateLogin, authController.login);

module.exports = router;