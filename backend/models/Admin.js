// /backend/models/Admin.js
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'admin',
  },
  isVerified: {
    type: Boolean,
    default: true, // Admins are typically verified by default
  }
}, { timestamps: true });

module.exports = mongoose.model('Admin', adminSchema);
