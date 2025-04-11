const express = require('express');
const router = express.Router();
const { clientSignup, login, providerSignup, adminLogin, adminSignup } = require('../controllers/auth');
const { validateLogin, validateClientSignup, validateProviderSignup } = require('../middleware/validation');

// POST /api/auth/client/signup
router.post('/client/signup', validateClientSignup, clientSignup);

// POST /api/auth/provider/signup
router.post('/provider/signup', validateProviderSignup, providerSignup);

// POST /api/auth/login (for all users)
router.post('/login', validateLogin, login);

// POST /api/auth/admin/signup (for admin)
router.post('/admin/signup', adminSignup);

// POST /api/auth/admin/login (specific for admin)
router.post('/admin/login', validateLogin, adminLogin);

module.exports = router;
