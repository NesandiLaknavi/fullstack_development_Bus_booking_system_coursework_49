import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  userId: String,
  busId: String,
  seatNumber: String,
  date: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Booking = mongoose.model('Booking', bookingSchema);
