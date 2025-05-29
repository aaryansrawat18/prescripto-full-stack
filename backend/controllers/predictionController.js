import Prediction from '../models/predictionModel.js';
import expressAsyncHandler from 'express-async-handler';

// @desc    Save a new prediction
// @route   POST /api/predictions
// @access  Private
const savePrediction = expressAsyncHandler(async (req, res) => {
  const { predictionType, result, formData } = req.body;

  if (!predictionType || !result || !formData) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }

  const prediction = await Prediction.create({
    userId: req.body.userId,
    predictionType,
    result,
    formData,
  });

  if (prediction) {
    res.status(201).json(prediction);
  } else {
    res.status(400);
    throw new Error('Invalid prediction data');
  }
});

// @desc    Get all predictions for a user
// @route   GET /api/predictions
// @access  Private
const getPredictions = expressAsyncHandler(async (req, res) => {
  const predictions = await Prediction.find({ userId: req.body.userId })
    .sort({ createdAt: -1 });

  res.status(200).json(predictions);
});

// @desc    Get a specific prediction by ID
// @route   GET /api/predictions/:id
// @access  Private
const getPredictionById = expressAsyncHandler(async (req, res) => {
  const prediction = await Prediction.findById(req.params.id);

  if (!prediction) {
    res.status(404);
    throw new Error('Prediction not found');
  }

  // Check if the prediction belongs to the logged-in user
  if (prediction.userId.toString() !== req.body.userId.toString()) {
    res.status(401);
    throw new Error('Not authorized to access this prediction');
  }

  res.status(200).json(prediction);
});

// @desc    Delete a prediction
// @route   DELETE /api/predictions/:id
// @access  Private
const deletePrediction = expressAsyncHandler(async (req, res) => {
  const prediction = await Prediction.findById(req.params.id);

  if (!prediction) {
    res.status(404);
    throw new Error('Prediction not found');
  }

  // Check if the prediction belongs to the logged-in user
  if (prediction.userId.toString() !== req.body.userId.toString()) {
    res.status(401);
    throw new Error('Not authorized to delete this prediction');
  }

  await prediction.deleteOne();
  res.status(200).json({ id: req.params.id });
});

// @desc    Delete all predictions for a user
// @route   DELETE /api/predictions
// @access  Private
const deleteAllPredictions = expressAsyncHandler(async (req, res) => {
  await Prediction.deleteMany({ userId: req.body.userId });
  res.status(200).json({ message: 'All predictions deleted' });
});

export {
  savePrediction,
  getPredictions,
  getPredictionById,
  deletePrediction,
  deleteAllPredictions,
};
