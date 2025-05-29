import express from 'express';
const router = express.Router();
import { 
  savePrediction, 
  getPredictions, 
  getPredictionById, 
  deletePrediction, 
  deleteAllPredictions 
} from '../controllers/predictionController.js';
import authUser from '../middleware/authUser.js';

// Apply auth middleware to all routes
router.use(authUser);

// Routes for predictions
router.route('/')
  .post(savePrediction)
  .get(getPredictions)
  .delete(deleteAllPredictions);

router.route('/:id')
  .get(getPredictionById)
  .delete(deletePrediction);

export default router;
