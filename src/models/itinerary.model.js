const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  time: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true }
});

const daySchema = new mongoose.Schema({
  day: { type: Number, required: true },
  activities: [activitySchema]
});

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tier: {
    type: String,
    enum: ['Budget', 'Mid-Range', 'Luxury'],
    required: true
  },
  pricePerNight: { type: Number, required: true },
  rating: { type: Number, required: true },
  highlight: { type: String, required: true }
});

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cuisine: { type: String, required: true },
  priceRange: { type: String, required: true },
  rating: { type: Number, required: true },
  mapsLink: { type: String, required: true }
});

const budgetSchema = new mongoose.Schema({
  transport: { type: Number, required: true },
  accommodation: { type: Number, required: true },
  food: { type: Number, required: true },
  activities: { type: Number, required: true },
  miscellaneous: { type: Number, required: true },

  total: { type: Number, required: true },

  currency: {
    type: String,
    enum: ['INR', 'USD'],
    required: true
  },

  currencySymbol: {
    type: String,
    required: true
  },

  note: { type: String }
});

const itinerarySchema = new mongoose.Schema({
  tripId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trip',
    required: true,
    unique: true,
    index: true
  },

  days: [daySchema],

  budgetBreakdown: budgetSchema,

  hotels: [hotelSchema],

  restaurants: [restaurantSchema],

  createdAt: {
    type: Date,
    default: Date.now
  },

  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model(
  'Itinerary',
  itinerarySchema
);