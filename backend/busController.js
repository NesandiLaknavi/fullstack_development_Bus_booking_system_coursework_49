import { Bus } from './busModel.js';

export const getBusData = async (req, res) => {
  try {
    const data = await Bus.find({});
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addBusData = async (req, res) => {
  try {
    const bus = new Bus(req.body);
    const result = await bus.save();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateBusData = async (req, res) => {
  try {
    const result = await Bus.findByIdAndUpdate(
      req.body.busId,
      req.body,
      { new: true }
    );
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteBusData = async (req, res) => {
  try {
    const result = await Bus.findByIdAndDelete(req.body.busId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
