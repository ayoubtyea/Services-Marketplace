// models/Provider.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const ProviderSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  dob: { type: Date, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  zip: { type: String, required: true },
  idPhoto: { type: String },
  selfiePhoto: { type: String },
  profilePhoto: { type: String },
  services: { type: Array, required: true },
  otherSkills: { type: String },
  experience: { type: String, required: true },
  availability: { type: String, required: true },
  serviceAreas: { type: Array, required: true },
  bio: { type: String, required: true },
  terms: { type: Boolean, required: true },
  communications: { type: Boolean, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

// Hash password before saving
ProviderSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('Provider', ProviderSchema);