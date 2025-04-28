const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define a schema for services provided by the provider
const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: String, required: true },
  description: { type: String, required: true },
  serviceAreas: { type: [String], required: true },
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected'], 
    default: 'pending' 
  }
}, { _id: true });

const providerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  dob: { type: Date, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  zip: { type: String, required: true },
  idPhoto: { type: String, required: true },
  selfiePhoto: { type: String, required: true },
  profilePhoto: { type: String, required: true },
  services: { type: [String], required: true },
  otherSkills: String,
  experience: { type: String, required: true },
  availability: { type: String, required: true },
  serviceAreas: { type: [String], required: true },
  bio: { type: String, required: true },
  terms: { type: Boolean, required: true, default: false },
  communications: { type: Boolean, required: true, default: false },
  status: { 
    type: String, 
    required: true, 
    enum: ['pending', 'approved', 'rejected'], 
    default: 'pending' 
  },
  backgroundCheck: { type: Boolean, required: true, default: false },
  rating: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 },
  passwordChangedAt: Date,
  createdAt: { type: Date, default: Date.now }
});

// Password hashing middleware
providerSchema.pre('save', async function(next) {
  // Only run this function if password was modified
  if (!this.isModified('password')) return next();
  
  try {
    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);
    
    // Update passwordChangedAt field
    this.passwordChangedAt = Date.now() - 1000;
    
    next();
  } catch (err) {
    next(err);
  }
});

// Method to check if password is correct
providerSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to check if password was changed after a token was issued
providerSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return JWTTimestamp < changedTimestamp;
  }
  // False means NOT changed
  return false;
};

const Provider = mongoose.model('Provider', providerSchema);

module.exports = Provider;