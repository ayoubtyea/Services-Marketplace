const mongoose = require('mongoose');
const User = require('./User');

const adminSchema = new mongoose.Schema({
  permissions: [String],
  isSuperAdmin: {
    type: Boolean,
    default: false
  }
});

module.exports = User.discriminator('Admin', adminSchema);