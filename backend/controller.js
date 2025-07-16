import { Booking } from './model.js';

export const getBookingData = async (req, res) => {
  try {
    const data = await Booking.find({});
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addBookingData = async (req, res) => {
  try {
    const booking = new Booking(req.body);
    const result = await booking.save();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateBookingData = async (req, res) => {
  try {
    const result = await Booking.findByIdAndUpdate(
      req.body.bookingId,
      req.body,
      { new: true }
    );
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteBookingData = async (req, res) => {
  try {
    const result = await Booking.findByIdAndDelete(req.body.bookingId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
