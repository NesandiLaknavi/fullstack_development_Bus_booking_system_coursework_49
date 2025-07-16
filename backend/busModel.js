import mongoose from 'mongoose';

const busSchema = new mongoose.Schema({
  busNumber: String,
  route: String,
  capacity: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Bus = mongoose.model('Bus', busSchema);
