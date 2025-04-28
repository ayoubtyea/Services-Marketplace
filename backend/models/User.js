const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Remove any duplicate schema declaration and use this single schema definition:
const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true,
    lowercase: true
  },
  password: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    enum: ['client', 'provider', 'admin'], 
    required: true,
    default: 'client'
  },
  fullName: {
    type: String,
    required: function() {
      return this.role !== 'admin'; // Admins might not need fullName
    }
  },
  phoneNumber: {
    type: String,
    required: function() {
      return this.role === 'client' || this.role === 'provider';
    }
  },
  // Common fields for all roles
  isVerified: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { 
  discriminatorKey: 'role',
  timestamps: true 
});

// Password hashing middleware
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;