const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const { protect } = require('../middleware/auth');

console.log('Middleware type:', typeof protect);

router.use(protect); 

router.route('/')
  .get(serviceController.getAllServices)
  .post(serviceController.createService);

module.exports = router;