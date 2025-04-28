const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  customerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  serviceId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Service", 
    required: true 
  },
  providerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Provider", 
    required: true 
  },
  serviceName: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  date: { 
    type: Date, 
    required: true 
  },
  time: {
    type: String,
    required: true
  },
  duration: {
    type: Number, // in minutes
    required: true
  },
  location: {
    address: String,
    city: String,
    zip: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  notes: {
    type: String
  },
  status: { 
    type: String, 
    enum: ["pending", "confirmed", "completed", "cancelled", "rejected"], 
    default: "pending" 
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "refunded", "failed"],
    default: "pending"
  },
  completedAt: {
    type: Date
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Set completedAt when status changes to completed
BookingSchema.pre('findOneAndUpdate', async function(next) {
  const update = this.getUpdate();
  if (update && update.status === 'completed') {
    this.set({ completedAt: new Date() });
  }
  next();
});

// Ensure bookings can be populated with related data
BookingSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'customerId',
    select: 'fullName email phoneNumber'
  });
  
  // Only populate service if requested in query options
  if (this._mongooseOptions.populateService) {
    this.populate({
      path: 'serviceId',
      select: 'title description price category'
    });
  }
  
  // Only populate provider if requested in query options
  if (this._mongooseOptions.populateProvider) {
    this.populate({
      path: 'providerId',
      select: 'firstName lastName email phone profilePhoto'
    });
  }
  
  next();
});

module.exports = mongoose.model("Booking", BookingSchema);